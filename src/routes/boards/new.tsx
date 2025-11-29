import Layout from "@/components/Layout";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { boardApi } from "@/lib/api";


export const Route = createFileRoute("/boards/new")({
    component: NewBoardModal,
});

function NewBoardModal() {
    const navigate = useNavigate();
    const [name, setName] = useState("");

    // Tutup modal saat klik backdrop
    const close = () => navigate({ to: "/" });

    const createBoard = async () => {
        if (!name.trim()) return;
        await boardApi.create(name);
        close();
    };

    return (
        <Layout>
            <div className="absolute inset-0 flex items-center justify-center">
                <div
                    className="absolute inset-0"
                    onClick={close}
                />

                <div className="relative bg-white p-6 w-full max-w-md rounded shadow-xl">
                    <h1 className="text-lg font-bold mb-4">Create New Board</h1>

                    <input
                        className="border p-2 w-full mb-4 rounded"
                        placeholder="Board name..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <div className="flex justify-end gap-2">
                        <button
                            className="px-4 py-2 bg-gray-200 rounded"
                            onClick={close}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                            onClick={createBoard}
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
