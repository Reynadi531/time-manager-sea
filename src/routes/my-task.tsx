import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { KanbanProvider } from "@/components/ui/shadcn-io/kanban";
import { taskApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Pencil } from "lucide-react";


export const Route = createFileRoute("/my-task")({
  component: RouteComponent,
});

const ColumnsFeature = [
  { id: 0, name: "High", color: "#6B7280" },
  { id: 1, name: "Medium", color: "#F59E0B" },
  { id: 2, name: "Low", color: "#10B981" },
]

function RouteComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["all-tasks"],
    queryFn: async () => {
      return await taskApi.getAllTasks();
    },
  });

  return (
    <>
      <Layout>
        <div className="flex flex-row text-white items-center">
          <div className="flex-1 text-2xl flex flex-row gap-2 items-center">
            <Pencil className="size-6 text-purple-600" />
            <h1 className="font-bold tracking-wider">My Task</h1>
          </div>
          <div className="flex">
            <Button
              variant={"default"}
              className="bg-white text-purple-brand text-sm font-medium hover:bg-white/80"
            >
              + Add Task
            </Button>
          </div>
        </div>
        <div>
          {isLoading && <p>Loading tasks...</p>}
          {error && <p>Error loading tasks: {error.message}</p>}
          {!data && !isLoading && !error && <p>No tasks found.</p>}
          {data && data.map(task => (
            <KanbanProvider
              key={task.id}
              className="h-full"
              columns={ColumnsFeature.map((c) => ({
                id: c.id.toString(),
                name: c.name,
                color: c.color,
              }))}
              data={[{
                id: task.id.toString(),
                name: task.title,
                column: task.priority === 'high' ? '0' : task.priority === 'medium' ? '1' : '2',
              }]}
            >
              {(column) => (
                <div key={column.id} className="mb-4 p-4 border border-gray-300 rounded">
                  <h2 className="text-lg font-semibold mb-2" style={{ color: column.color }}>{column.name} Priority</h2>
                  <div className="p-2 bg-gray-100 rounded">
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-gray-600">{task.description || "No description"}</p>
                    <p className="text-xs text-gray-500">Due: {task.due_date ? new Date(task.due_date).toLocaleDateString() : "No due date"}</p>
                  </div>
                </div>
              )}
            </KanbanProvider>
          ))}
        </div>
      </Layout>
    </>
  );
}
