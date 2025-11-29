import { createFileRoute, useParams, useNavigate } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  KanbanBoard,
  KanbanCard,
  KanbanCards,
  KanbanHeader,
  KanbanProvider,
} from '@/components/ui/shadcn-io/kanban';

import { boardApi, columnApi, taskApi, Board, Column, Task } from "@/lib/api";

import { useEffect, useState } from "react";

export const Route = createFileRoute("/boards/$boardsId/")({
  component: BoardPage,
});

function BoardPage() {
  const { boardsId } = useParams({ from: "/boards/$boardsId/" });
  const navigate = useNavigate();

  const [board, setBoard] = useState<Board>();
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [loading, setLoading] = useState(true);
  const columnsToBeRendered = [
    {
      id: "0",
      name: "To Do",
      color: "#FACC15", // yellow
    },
    {
      id: "1",
      name: "Progress",
      color: "#3B82F6", // blue
    },
    {
      id: "2",
      name: "Done",
      color: "#22C55E", // green
    },
  ];


  // TODO: apakah benar?
  const getColumnColor = (name: string) => {
    switch (name.toLowerCase()) {
      case "to do":
        return "#facc15"; // kuning
      case "progress":
        return "#3b82f6"; // biru
      case "done":
        return "#22c55e"; // hijau
      default:
        return "#6b7280"; // default abu
    }
  };



  // TODO
  useEffect(() => {
    (async () => {
      setLoading(true);

      // apakah benar?
      const b = await boardApi.getById(Number(boardsId));
      const cols = await columnApi.getByBoard(Number(boardsId));
      const t = await taskApi.getByColumn(Number(boardsId));

      setBoard(b);
      setColumns(cols);
      setTasks(t);

      setLoading(false);
    })();
  }, [boardsId]);


  // Loading handler
  if (loading) {
    return (
      <Layout>
        <div className="p-6">Loading...</div>
      </Layout>
    );
  }

  // Group tasks per column
  // const tasksByColumn = columns.map((col) => ({
  //   column: col,
  //   tasks: tasks.filter((t) => t.column_id === col.id),
  // }));

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <Layout>
      <div className="p-6">

        {/* Board Title */}
        <div className="flex justify-between items-center mb-6">
          {/* Back button */}
          <Button
            className="px-4 py-2 bg-gray-500 rounded"
            onClick={() => navigate({ to: "/" })}
          >
            Back
          </Button>

          <h1 className="text-2xl font-bold text-white">Board: {board?.name}</h1>
        </div>

        {/* Kanban Board Wrapper */}
        <KanbanProvider
          columns={columnsToBeRendered}
          data={tasks.map((task) => ({
            id: task.id.toString(),
            name: task.title,
            column: task.column_id.toString(),
            description: task.description ?? "",
            dueDate: task.due_date ?? "",
          }))}
        >
          {(column) => (
            <KanbanBoard id={column.id} key={column.id}>
              <KanbanHeader>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: getColumnColor(column.name) }}
                    />
                    <span>{column.name}</span>
                  </div>

                  <Button
                    size="sm"
                    onClick={() =>
                      navigate({
                        to: "/boards/$boardsId/task/new",
                        params: { boardsId },
                        search: { column: column.id }
                      })
                    }
                  >
                    + Add
                  </Button>
                </div>
              </KanbanHeader>

              <KanbanCards id={column.id}>
                {(item) => (
                  <KanbanCard
                  column={column.id}
                  id={item.id}
                  key={item.id}
                  name={item.name}
                  >
                    {/* OPTIMIZE: rendering */}
                    <div className="flex flex-col gap-1">
                      <p className="m-0 flex-1 font-medium text-sm">{item.name}</p>
                      {typeof item.description === "string" && (
                        <p className="m-0 text-muted-foreground text-xs">{item.description}</p>
                      )}
                      {typeof item.dueDate === "string" && (
                        <p className="m-0 text-muted-foreground text-xs">
                          {shortDateFormatter.format(new Date(item.dueDate))}
                        </p>
                      )}
                    </div>
                  </KanbanCard>
                )}
              </KanbanCards>
            </KanbanBoard>
          )}
        </KanbanProvider>

      </div>
    </Layout>
  );
}
