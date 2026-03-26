import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import Widget from "../Widget.tsx";

const dummySpendingData = [
    { category: "Streaming", amount: 120 },
    { category: "Utilities", amount: 260 },
    { category: "Productivity", amount: 80 },
    { category: "Shopping", amount: 180 },
    { category: "Other", amount: 60 },
];

const COLORS = ["#4F46E5", "#14B8A6", "#F59E0B", "#EC4899", "#0EA5E9"];

export default function SpendingBreakdownWidget() {
    const total = dummySpendingData.reduce((sum, item) => sum + item.amount, 0);

    return (
        <Widget title="Spending Breakdown">
            <div className="text-center mb-4">
                <p className="text-sm text-gray-500">This month (dummy data)</p>
                <p className="text-2xl font-semibold text-main-900">
                    ${total.toLocaleString()}
                </p>
            </div>
            <div className="flex flex-col md:flex-row items-start gap-2 h-58 w-full">
                <div className="w-full md:w-1/4 max-w-[220px] p-3 rounded-lg">
                    <div className="space-y-2">
                        {dummySpendingData.map((item, index) => (
                            <div
                                key={item.category}
                                className="flex items-center gap-2"
                            >
                                <span
                                    className="h-3 w-3 rounded-full"
                                    style={{
                                        backgroundColor:
                                            COLORS[index % COLORS.length],
                                    }}
                                />
                                <span className="text-sm text-main-800 truncate">
                                    {item.category}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1 md:w-3/4 h-full min-h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={dummySpendingData}
                                dataKey="amount"
                                nameKey="category"
                                cx="50%"
                                cy="50%"
                                outerRadius={90}
                                innerRadius={45}
                                label
                            >
                                {dummySpendingData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${entry.category}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Widget>
    );
}
