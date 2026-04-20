import type { CategoryBreakdownItem } from "../../../types/subscription";
import Widget from "../Widget.tsx";

interface SubscriptionCategoryWidgetProps {
    items: CategoryBreakdownItem[];
    loading: boolean;
    error: string | null;
}

export default function SubscriptionCategoryWidget({
    items,
    loading,
    error,
}: SubscriptionCategoryWidgetProps) {
    const maxSubscriptions = Math.max(
        ...items.map((item) => item.subscriptionCount),
        1,
    );

    return (
        <Widget title="Categories">
            {loading && (
                <p className="text-sm text-gray-500 dark:text-main-400">
                    Loading category breakdown...
                </p>
            )}

            {!loading && error && (
                <p className="text-sm text-red-600">
                    Failed to load category breakdown.
                </p>
            )}

            {!loading && !error && items.length === 0 && (
                <p className="text-sm text-gray-500 dark:text-main-400">
                    No category data yet.
                </p>
            )}

            {!loading && !error && items.length > 0 && (
                <div className="space-y-4">
                    {items.map((item) => {
                        const widthPercent =
                            (item.subscriptionCount / maxSubscriptions) * 100;

                        return (
                            <div
                                key={item.categoryId ?? item.name}
                                className="space-y-2"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex min-w-0 items-center gap-2">
                                        <span
                                            className="h-3 w-3 shrink-0 rounded-full"
                                            style={{
                                                backgroundColor: item.color,
                                            }}
                                        />
                                        <span className="truncate text-sm font-medium text-main-900 dark:text-white">
                                            {item.name}
                                        </span>
                                    </div>
                                    <span className="text-sm font-semibold text-main-700">
                                        {item.subscriptionCount}
                                    </span>
                                </div>

                                <div className="h-2 w-full overflow-hidden rounded-full bg-main-100">
                                    <div
                                        className="h-full rounded-full"
                                        style={{
                                            width: `${widthPercent}%`,
                                            backgroundColor: item.color,
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </Widget>
    );
}
