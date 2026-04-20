import type { TransactionWidgetItem } from "../../../types/subscription";
import Widget from "../Widget.tsx";

interface LatestTransactionsWidgetProps {
    items: TransactionWidgetItem[];
    loading: boolean;
    error: string | null;
}

const LatestTransactionsWidget = ({
    items,
    loading,
    error,
}: LatestTransactionsWidgetProps) => {
    return (
        <Widget title="Latest">
            {loading && (
                <p className="text-sm text-gray-500 dark:text-main-400">
                    Loading latest transactions...
                </p>
            )}
            {!loading && error && (
                <p className="text-sm text-red-600">
                    Failed to load latest transactions.
                </p>
            )}
            {!loading && !error && items.length === 0 && (
                <p className="text-sm text-gray-500 dark:text-main-400">
                    No latest transactions yet.
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
                                    <span className="text-sm text-gray-400 dark:text-main-400"></span>
                                </div>
                            </div>

                            <span className="text-lg text-red-500">
                                ${sub.cost.toFixed(2)}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </Widget>
    );
};
export default LatestTransactionsWidget;
