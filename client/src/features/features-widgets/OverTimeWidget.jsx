import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import DashWidget from "../../components/app-components/widgets/DashWidget";

const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IE", {
        style: "currency",
        currency: "EUR",
    }).format(value);

const OverTimeWidget = ({ title, description, data, toolTipLabel }) => {

    return (
        <DashWidget size='wide'>
            <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">

                <div className="min-w-0">
                    <h2 className="text-lg font-semibold text-white">
                        {title}
                    </h2>
                    <p className="mt-1 text-sm text-white/45">
                        {description}
                    </p>
                </div>

                <div className="h-30 min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{ top: 8, right: 4, bottom: 0, left: 4 }}
                        >
                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "#a1a1aa", fontSize: 12 }}
                            />

                            <Tooltip
                                formatter={(value) => [formatCurrency(Number(value)), String(toolTipLabel),]}
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
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </DashWidget>
    );
};

export default OverTimeWidget;