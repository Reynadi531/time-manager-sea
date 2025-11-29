import Layout from "@/components/Layout";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { boardApi, Board } from "@/lib/api";

export const Route = createFileRoute("/")({
  component: BoardsPage,
});

function BoardsPage() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const data = await boardApi.getAll();
        setBoards(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();
  }, []);

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <Layout>
      <div className="p-6 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Boards</h1>
          <a
            href="/boards/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            + New Board
          </a>
        </div>

        {/* Boards List */}
        {boards.length === 0 ? (
          <p className="text-gray-500">You don't have any boards yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {boards.map((board: any) => (
              <div
                key={board.id}
                className="p-4 border rounded-lg bg-white hover:bg-gray-300 transition flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <h2 className="font-semibold">{board.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">{board.description}</p>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <a
                    href={`/boards/${board.id}`}
                    className="text-blue-600 text-sm"
                  >
                    Open →
                  </a>

                  <a
                    href={`/boards/${board.id}/delete`}
                    className="text-red-600 text-sm"
                  >
                    Delete
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </Layout>
  );
}
