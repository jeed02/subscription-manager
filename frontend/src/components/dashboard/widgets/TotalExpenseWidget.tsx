import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import type { MonthlyExpensePoint } from "../../../types/subscription";
import Widget from "../Widget.tsx";

interface TotalExpenseWidgetProps {
    items: MonthlyExpensePoint[];
    loading: boolean;
    error: string | null;
}

export default function TotalExpenseWidget({
    items,
    loading,
    error,
}: TotalExpenseWidgetProps) {
    const total = items.reduce((sum, item) => sum + item.amount, 0);

    const chartData = items.map((item) => ({
        month: item.label,
        amount: item.amount,
    }));

    return (
        <Widget title="Total Expenses">
            {loading && (
                <p className="text-sm text-gray-500">Loading expenses...</p>
            )}

            {!loading && error && (
                <p className="text-sm text-red-600">Failed to load expenses.</p>
            )}

            {!loading && !error && items.length === 0 && (
                <p className="text-sm text-gray-500">No expense data yet.</p>
            )}

            {!loading && !error && items.length > 0 && (
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
                                data={chartData}
                                margin={{
                                    top: 10,
                                    right: 0,
                                    left: 0,
                                    bottom: 0,
                                }}
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
                                <XAxis
                                    dataKey="month"
                                    tick={{ fontSize: 12 }}
                                />
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
            )}
        </Widget>
    );
}
