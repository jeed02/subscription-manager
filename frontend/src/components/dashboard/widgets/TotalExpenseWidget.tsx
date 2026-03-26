import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import Widget from "../Widget.tsx";

const dummyMonthlyExpenses = [
    { month: "Jan", amount: 120 },
    { month: "Feb", amount: 145 },
    { month: "Mar", amount: 158 },
    { month: "Apr", amount: 130 },
    { month: "May", amount: 175 },
    { month: "Jun", amount: 160 },
    { month: "Jul", amount: 190 },
    { month: "Aug", amount: 185 },
    { month: "Sep", amount: 155 },
    { month: "Oct", amount: 170 },
    { month: "Nov", amount: 165 },
    { month: "Dec", amount: 195 },
];

export default function TotalExpenseWidget() {
    const total = dummyMonthlyExpenses.reduce(
        (sum, item) => sum + item.amount,
        0,
    );

    return (
        <Widget title="Total Expenses">
            <div className="flex flex-col gap-4">
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <div className="text-sm text-gray-500">
                            Last 12 months
                        </div>
                        <div className="text-3xl font-semibold text-main-900">
                            ${total.toLocaleString()}
                        </div>
                    </div>
                </div>

                <div className="h-44 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={dummyMonthlyExpenses}
                            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient
                                    id="colorAmount"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#4F46E5"
                                        stopOpacity={0.4}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#4F46E5"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#E5E7EB"
                            />
                            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="amount"
                                stroke="#4F46E5"
                                fillOpacity={1}
                                fill="url(#colorAmount)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Widget>
    );
}
