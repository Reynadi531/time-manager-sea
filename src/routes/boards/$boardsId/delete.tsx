import Layout from "@/components/Layout";
import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { boardApi } from "@/lib/api";

export const Route = createFileRoute("/boards/$boardsId/delete")({
  component: DeleteBoardModal,
});

function DeleteBoardModal() {
  const { boardsId: boardId } = useParams({ from: "/boards/$boardsId/delete" });
  const navigate = useNavigate();

  const close = () => navigate({ to: "/" });

  const deleteBoard = async () => {
    await boardApi.delete(Number(boardId));
    close();
  };

  return (
    <Layout>

      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="absolute inset-0" onClick={close} />

        <div className="relative bg-white p-6 w-full max-w-md rounded shadow-xl">
          <h1 className="text-lg font-bold mb-4">Delete Board</h1>

          <p className="mb-4">
            Are you sure you want to delete this board?
          </p>

          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 bg-gray-200 rounded"
              onClick={close}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded"
              onClick={deleteBoard}
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
