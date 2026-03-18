import Widget from "../Widget.tsx";

const dummyCategoryData = [
    { category: "Work", subscriptions: 3 },
    { category: "Entertainment", subscriptions: 5 },
    { category: "Utilities", subscriptions: 2 },
    { category: "Other", subscriptions: 1 },
];

export default function SubscriptionCategoryWidget() {
    const maxSubscriptions = Math.max(
        ...dummyCategoryData.map((d) => d.subscriptions),
        1,
    );

    return (
        <Widget title="Categories">
            <div className="space-y-4">
                {dummyCategoryData.map((item) => {
                    const widthPercent =
                        (item.subscriptions / maxSubscriptions) * 100;
                    return (
                        <div key={item.category} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-main-900 truncate">
                                    {item.category}
                                </span>
                                <span className="text-sm font-semibold text-main-700">
                                    {item.subscriptions}
                                </span>
                            </div>

                            <div className="h-2 w-full rounded-full bg-main-100 overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-main-600"
                                    style={{ width: `${widthPercent}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </Widget>
    );
}
