import DashWidget from "./widgets/DashWidget";
import { Pie, PieChart, ResponsiveContainer, Tooltip, Sector } from "recharts";


const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
  }).format(value);

const SpendingByCategoryWidget = () => {
  const spendingData = [
    { name: "Groceries", value: 245.8, color: "#8B5CF6" },
    { name: "Housing", value: 180, color: "#6366F1" },
    { name: "Transport", value: 86.5, color: "#06B6D4" },
    { name: "Entertainment", value: 64.99, color: "#F59E0B" },
    { name: "Dining", value: 52.4, color: "#F472B6" },
    { name: "Subscriptions", value: 29.98, color: "#34D399" },
  ];

  const total = spendingData.reduce(
    (sum, category) => sum + category.value,
    0
  );

  return (
    <DashWidget size='large'>
      <h2 className="text-lg font-semibold text-white">
        Spendings by category
      </h2>
      <div className="flex">
        <p className="mb-4 text-sm text-white/45">
          This month's expenses.

        </p>
        <p className="mb-4 text-sm  ml-1 text-white/45 flex gap-1">
          Total: <b className="text-violet-400">€{total}</b>
        </p>
      </div>


      <div className="grid grid-cols-1 items-center gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="h-56 min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={spendingData}
                dataKey="value"
                nameKey="name"
                innerRadius="65%"
                outerRadius="92%"
                cornerRadius={5}
                paddingAngle={4}
                stroke="none"
                isAnimationActive={false}
                shape={(props) => (
                  <Sector
                    {...props}
                    fill={spendingData[props.index]?.color}
                  />
                )}
              >
              </Pie>

              <Tooltip
                formatter={(value, name) => [
                  formatCurrency(Number(value)),
                  name,
                ]}
                contentStyle={{
                  backgroundColor: "#252630",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  color: "#fff",
                }}
                itemStyle={{ color: "#fff" }}
                labelStyle={{ color: "#fff" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex min-w-0 flex-col gap-3">
          {spendingData.map((category) => (
            <div
              key={category.name}
              className="flex min-w-0 items-center gap-3"
            >
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="truncate text-sm text-white/75">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DashWidget>
  );
};

export default SpendingByCategoryWidget;