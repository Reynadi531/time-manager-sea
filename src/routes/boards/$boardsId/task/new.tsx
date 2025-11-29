import { createFileRoute, useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { taskApi, columnApi } from "@/lib/api";
import Layout from "@/components/Layout";


export const Route = createFileRoute("/boards/$boardsId/task/new")({
    component: CreateTaskModal,
});

function CreateTaskModal() {
    const navigate = useNavigate();
    const { boardsId } = useParams({ from: "/boards/$boardsId/task/new" });
    const search = useSearch({ from: "/boards/$boardsId/task/new" });

    const [columns, setColumns] = useState<any[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("medium");

    const defaultColumnName = search.column ? search.column : "To Do"; // TODO

    // Load existing columns
    useEffect(() => {
        (async () => {
            const cols = await columnApi.getByBoard(Number(boardsId));
            setColumns(cols);
        })();
    }, [boardsId]);

    async function handleCreate() {
        let columnId;

        // cek kalau column ada di DB
        const existingColumn = columns.find(c => c.name.toLowerCase() === defaultColumnName.toLowerCase());

        if (existingColumn) {
            columnId = existingColumn.id;
        } else {
            // buat default columns jika belum ada
            const defaultColumnNames = ["To Do", "Progress", "Done"];
            const createdColumns: any[] = [];

            for (let i = 0; i < defaultColumnNames.length; i++) {
                const name = defaultColumnNames[i];
                const created = await columnApi.create(Number(boardsId), name, columns.length + i);
                createdColumns.push(created);
            }

            columnId = createdColumns[0].id; // pakai To Do
        }

        const parsedDueDate = dueDate ? new Date(dueDate).toISOString() : new Date().toISOString();

        // tentukan posisi task di column
        const tasksInColumn = await taskApi.getByColumn(columnId);
        const position = tasksInColumn.length;

        await taskApi.create(
            columnId,
            title,
            position,
            description,
            priority,
            parsedDueDate
        );

        navigate({ to: `/boards/${boardsId}/` });
    }

    return (
        <Layout>
            <Dialog open onOpenChange={() => navigate({ to: `/boards/${boardsId}/` })}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Task</DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col gap-4 py-2">
                        <Input
                            placeholder="Task title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <Textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <div>
                            <label className="text-sm">Due Date</label>
                            <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                        </div>

                        <div>
                            <label className="text-sm">Priority</label>
                            <select
                                className="w-full rounded border bg-background p-2"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="secondary" onClick={() => navigate({ to: `/boards/${boardsId}/` })}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreate}>Create</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </Layout>
    );
}