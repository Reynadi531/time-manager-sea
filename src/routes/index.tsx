import Layout from "@/components/Layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Layout>
        <h1>Hello, Tauri with Vite and React!</h1>
      </Layout>
    </>
  );
}
