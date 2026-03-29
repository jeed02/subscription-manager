import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useSpendingBreakdown } from "../../../hooks/useSpendingBreakdown";
import Widget from "../Widget.tsx";

const COLORS = ["#4F46E5", "#14B8A6", "#F59E0B", "#EC4899", "#0EA5E9"];

export default function SpendingBreakdownWidget() {
    const {
        selectedMonth,
        setSelectedMonth,
        minMonth,
        maxMonth,
        label,
        items,
        loading,
        error,
    } = useSpendingBreakdown();

    const chartData = items.map((item, index) => ({
        category: item.name,
        amount: item.amount,
        fill: item.color || COLORS[index % COLORS.length],
    }));

    const total = chartData.reduce((sum, item) => sum + item.amount, 0);

    return (
        <Widget title="Spending Breakdown">
            <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                    <p className="text-sm text-gray-500">
                        {label || "Selected month"}
                    </p>
                    <p className="text-2xl font-semibold text-main-900">
                        ${total.toLocaleString()}
                    </p>
                </div>
                <input
                    type="month"
                    value={selectedMonth}
                    min={minMonth}
                    max={maxMonth}
                    onChange={(event) => setSelectedMonth(event.target.value)}
                    className="rounded-md border border-main-200 px-2 py-1 text-sm text-main-800"
                    aria-label="Select month"
                />
            </div>

            {loading && (
                <p className="text-sm text-gray-500">
                    Loading spending breakdown...
                </p>
            )}

            {!loading && error && (
                <p className="text-sm text-red-600">
                    Failed to load spending breakdown.
                </p>
            )}

            {!loading && !error && chartData.length === 0 && (
                <p className="text-sm text-gray-500">
                    No spending data for this month.
                </p>
            )}

            {!loading && !error && chartData.length > 0 && (
                <div className="flex h-58 w-full flex-col items-start gap-2 md:flex-row">
                    <div className="w-full rounded-lg p-3 md:w-1/4 md:max-w-55">
                        <div className="space-y-2">
                            {chartData.map((item) => (
                                <div
                                    key={item.category}
                                    className="flex items-center gap-2"
                                >
                                    <span
                                        className="h-3 w-3 rounded-full"
                                        style={{
                                            backgroundColor: item.fill,
                                        }}
                                    />
                                    <span className="truncate text-sm text-main-800">
                                        {item.category}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="h-full min-h-55 flex-1 md:w-3/4">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    dataKey="amount"
                                    nameKey="category"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={90}
                                    innerRadius={45}
                                    label
                                >
                                    {chartData.map((entry) => (
                                        <Cell
                                            key={`cell-${entry.category}`}
                                            fill={entry.fill}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value) =>
                                        `$${Number(value ?? 0).toLocaleString()}`
                                    }
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </Widget>
    );
}
