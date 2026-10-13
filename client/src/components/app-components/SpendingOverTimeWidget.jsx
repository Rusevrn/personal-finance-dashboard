import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import DashWidget from "./widgets/DashWidget";

const spendingData = [
  { month: "August", amount: 1240.5 },
  { month: "September", amount: 1085.75 },
  { month: "October", amount: 1320.2 },
];

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
  }).format(value);

const SpendingOverTimeWidget = () => {

  return (
    <DashWidget size='wide'>
      <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">

        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-white">
            Spending over three months
          </h2>
          <p className="mt-1 text-sm text-white/45">
            Compare your monthly expenses
          </p>
        </div>

        <div className="h-30 min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={spendingData}
              margin={{ top: 8, right: 4, bottom: 0, left: 4 }}
            >
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#a1a1aa", fontSize: 12 }}
              />

              <Tooltip
                formatter={(value) => [
                  formatCurrency(Number(value)),
                  "Spent",
                ]}
                cursor={{ fill: "rgba(255,255,255,0.04)" }}
                contentStyle={{
                  backgroundColor: "#252630",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  color: "#fff",
                }}
              />

              <Bar
                dataKey="amount"
                fill="#8B5CF6"
                radius={[8, 8, 0, 0]}
                barSize={28}
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashWidget>
  );
};

export default SpendingOverTimeWidget;