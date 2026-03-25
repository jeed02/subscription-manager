import { useState } from "react";
import SubscriptionCard from "../components/dashboard/SubscriptionCard.tsx";
import DashboardLayout from "../components/layout/DashboardLayout.tsx";

export default function SubscriptionsPage() {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [newSub, setNewSub] = useState({
        name: "",
        daysLeft: 0,
        cost: 0,
        logo: "",
        frequency: "Monthly",
        category: "Entertainment",
    });

    const openAddModal = () => setIsAddOpen(true);
    const closeAddModal = () => setIsAddOpen(false);
    const submitAddSubscription = () => {
        // TODO: implement add-subscription submit logic
        closeAddModal();
    };

    return (
        <DashboardLayout>
            <h1 className="text-3xl mb-4">Subscriptions</h1>
            <section className="my-6">
                <div className="flex flex-row items-center justify-between mb-4">
                    <h1 className="text-xl font-medium">
                        Active Subscriptions
                    </h1>
                    <button
                        onClick={openAddModal}
                        className="rounded-lg border border-main-300 px-4 py-2 text-sm text-main-700 hover:bg-main-100"
                    >
                        + Add Subscription
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    <SubscriptionCard
                        name={"Netflix"}
                        daysLeft={9}
                        cost={12}
                        logo={
                            "https://www.google.com/s2/favicons?domain=netflix.com&sz=128"
                        }
                        frequency="Monthly"
                        category="Entertainment"
                    />
                    <SubscriptionCard
                        name={"Netflix"}
                        daysLeft={11}
                        cost={12}
                        logo={
                            "https://www.google.com/s2/favicons?domain=netflix.com&sz=128"
                        }
                        frequency="Monthly"
                        category="Entertainment"
                    />
                    <SubscriptionCard
                        name={"Netflix"}
                        daysLeft={14}
                        cost={12}
                        logo={
                            "https://www.google.com/s2/favicons?domain=netflix.com&sz=128"
                        }
                        frequency="Monthly"
                        category="Entertainment"
                    />
                    <SubscriptionCard
                        name={"Netflix"}
                        daysLeft={20}
                        cost={12}
                        logo={
                            "https://www.google.com/s2/favicons?domain=netflix.com&sz=128"
                        }
                        frequency="Monthly"
                        category="Entertainment"
                    />
                    <SubscriptionCard
                        name={"Netflix"}
                        daysLeft={9}
                        cost={12}
                        logo={
                            "https://www.google.com/s2/favicons?domain=netflix.com&sz=128"
                        }
                        frequency="Monthly"
                        category="Entertainment"
                    />
                    <SubscriptionCard
                        name={"Netflix"}
                        daysLeft={11}
                        cost={12}
                        logo={
                            "https://www.google.com/s2/favicons?domain=netflix.com&sz=128"
                        }
                        frequency="Monthly"
                        category="Entertainment"
                    />
                    <SubscriptionCard
                        name={"Netflix"}
                        daysLeft={14}
                        cost={12}
                        logo={
                            "https://www.google.com/s2/favicons?domain=netflix.com&sz=128"
                        }
                        frequency="Monthly"
                        category="Entertainment"
                    />
                    <SubscriptionCard
                        name={"Netflix"}
                        daysLeft={20}
                        cost={12}
                        logo={
                            "https://www.google.com/s2/favicons?domain=netflix.com&sz=128"
                        }
                        frequency="Monthly"
                        category="Entertainment"
                    />
                </div>
            </section>

            {isAddOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
                        <h2 className="mb-4 text-xl font-semibold">
                            Add Subscription
                        </h2>
                        <div className="space-y-3">
                            <label className="block">
                                <span className="text-sm font-medium text-main-700">
                                    Name
                                </span>
                                <input
                                    type="text"
                                    value={newSub.name}
                                    onChange={(e) =>
                                        setNewSub((prev) => ({
                                            ...prev,
                                            name: e.target.value,
                                        }))
                                    }
                                    className="mt-1 w-full rounded-lg border border-main-300 px-3 py-2"
                                />
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium text-main-700">
                                    Cost
                                </span>
                                <input
                                    type="number"
                                    value={newSub.cost}
                                    onChange={(e) =>
                                        setNewSub((prev) => ({
                                            ...prev,
                                            cost: Number(e.target.value),
                                        }))
                                    }
                                    className="mt-1 w-full rounded-lg border border-main-300 px-3 py-2"
                                />
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium text-main-700">
                                    Category
                                </span>
                                <select
                                    value={newSub.category}
                                    onChange={(e) =>
                                        setNewSub((prev) => ({
                                            ...prev,
                                            category: e.target.value,
                                        }))
                                    }
                                    className="mt-1 w-full rounded-lg border border-main-300 px-3 py-2"
                                >
                                    <option value="Entertainment">
                                        Entertainment
                                    </option>
                                    <option value="Utilities">Utilities</option>
                                    <option value="Productivity">
                                        Productivity
                                    </option>
                                    <option value="Work">Work</option>
                                    <option value="Health">Health</option>
                                    <option value="Other">Other</option>
                                </select>
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium text-main-700">
                                    Frequency
                                </span>
                                <select
                                    value={newSub.frequency}
                                    onChange={(e) =>
                                        setNewSub((prev) => ({
                                            ...prev,
                                            frequency: e.target.value,
                                        }))
                                    }
                                    className="mt-1 w-full rounded-lg border border-main-300 px-3 py-2"
                                >
                                    <option value="Weekly">Weekly</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Quarterly">Quarterly</option>
                                    <option value="Yearly">Yearly</option>
                                </select>
                            </label>
                        </div>
                        <div className="mt-5 flex justify-end gap-2">
                            <button
                                onClick={closeAddModal}
                                className="rounded-lg border border-main-300 px-4 py-2 text-main-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={submitAddSubscription}
                                className="rounded-lg bg-main-600 px-4 py-2 text-white hover:bg-main-700"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
