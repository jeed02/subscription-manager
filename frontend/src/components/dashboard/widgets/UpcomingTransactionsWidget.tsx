import type { TransactionWidgetItem } from "../../../types/subscription";
import Widget from "../Widget.tsx";

interface UpcomingTransactionsWidgetProps {
    items: TransactionWidgetItem[];
    loading: boolean;
    error: string | null;
}

const UpcomingTransactionsWidget = ({
    items,
    loading,
    error,
}: UpcomingTransactionsWidgetProps) => {
    return (
        <Widget title="Upcoming">
            {loading && (
                <p className="text-sm text-gray-500">
                    Loading upcoming transactions...
                </p>
            )}
            {!loading && error && (
                <p className="text-sm text-red-600">
                    Failed to load upcoming transactions.
                </p>
            )}
            {!loading && !error && items.length === 0 && (
                <p className="text-sm text-gray-500">
                    No upcoming transactions yet.
                </p>
            )}

            {!loading && !error && items.length > 0 && (
                <ul className="space-y-6">
                    {items.map((sub) => (
                        <li
                            key={sub.id}
                            className="flex flex-row justify-between content-center w-full"
                        >
                            <div className="flex flex-row gap-3">
                                <img
                                    src={sub.logo}
                                    alt="logo"
                                    width={40}
                                    height={40}
                                />
                                <div className="flex flex-col">
                                    <span className="text-md">{sub.name}</span>
                                    <span className="text-sm text-gray-400">
                                        {sub.frequencyLabel}
                                    </span>
                                </div>
                            </div>

                            <span className="text-lg text-main-500">
                                ${sub.cost.toFixed(2)}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </Widget>
    );
};
export default UpcomingTransactionsWidget;
