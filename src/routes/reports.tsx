import Layout from "@/components/Layout";
import { taskApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/reports")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["reports-data"],
    queryFn: async () => {
      const allTasksCount = await taskApi.countAlltask();
      const progressCount = await taskApi.countProgressTask();
      const doneCount = await taskApi.countDoneTask();
      const todoCount = await taskApi.countTodoTask();
      return { allTasksCount, progressCount, doneCount, todoCount };
    },
  });

  if (isLoading) {
    return (
      <>
        <Layout>
          <div>Loading...</div>
        </Layout>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Layout>
          <div>Error loading reports data.</div>
        </Layout>
      </>
    );
  }

  const pieData = [
    { name: "Todo", value: data?.todoCount || 0, color: "#ef4444" },
    { name: "In Progress", value: data?.progressCount || 0, color: "#f59e0b" },
    { name: "Done", value: data?.doneCount || 0, color: "#10b981" },
  ];

  return (
    <>
      <Layout>
        <div className="flex flex-cols text-white">
          <div className="flex-1 p-4 m-2 bg-white/10 rounded-lg">
            <h2 className="text-lg font-medium mb-2">Total Tasks</h2>
            <p className="text-3xl font-bold mt-6 mb-2">
              {data?.allTasksCount}
            </p>
          </div>
          <div className="flex-1 p-4 m-2 bg-white/10 rounded-lg">
            <h2 className="text-lg font-medium mb-2">Todo</h2>
            <p className="text-3xl font-bold mt-6 mb-2">{data?.todoCount}</p>
          </div>
          <div className="flex-1 p-4 m-2 bg-white/10 rounded-lg">
            <h2 className="text-lg font-medium mb-2">In Progress</h2>
            <p className="text-3xl font-bold mt-6 mb-2">
              {data?.progressCount}
            </p>
          </div>
          <div className="flex-1 p-4 m-2 bg-white/10 rounded-lg">
            <h2 className="text-lg font-medium mb-2">Done</h2>
            <p className="text-3xl font-bold mt-6 mb-2">{data?.doneCount}</p>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <div className="flex-1 p-4 bg-white/10 rounded-lg">
            <h2 className="text-lg font-medium mb-4 text-white text-center">
              Task Distribution (Pie)
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent ? percent * 100 : 0).toFixed(0)}%`
                  }
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex-1 p-4 bg-white/10 rounded-lg">
            <h2 className="text-lg font-medium mb-4 text-white text-center">
              Task Distribution (Bar)
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={pieData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="name" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Layout>
    </>
  );
}
