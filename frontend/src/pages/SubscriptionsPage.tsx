import { useMemo, useState } from "react";
import SubscriptionCard from "../components/dashboard/SubscriptionCard.tsx";
import DashboardLayout from "../components/layout/DashboardLayout.tsx";
import { useCategories } from "../hooks/useCategories";
import { useSubscriptions } from "../hooks/useSubscriptions";
import type { CreateSubscriptionRequest } from "../types/subscription";
import {
    getFrequencyValue,
    toSubscriptionCardModel,
} from "../utils/subscriptionMapper";

export default function SubscriptionsPage() {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const {
        subscriptions,
        loading,
        mutating,
        error,
        addSubscription,
        editSubscription,
    } = useSubscriptions();
    const { categories } = useCategories();

    const [newSub, setNewSub] = useState({
        name: "",
        cost: 0,
        frequency: "Monthly",
        categoryId: "",
        startDate: new Date().toISOString().slice(0, 10),
    });

    const cardData = useMemo(
        () => subscriptions.map((subscription) => toSubscriptionCardModel(subscription)),
        [subscriptions],
    );

    const openAddModal = () => setIsAddOpen(true);
    const closeAddModal = () => {
        setIsAddOpen(false);
        setNewSub({
            name: "",
            cost: 0,
            frequency: "Monthly",
            categoryId: "",
            startDate: new Date().toISOString().slice(0, 10),
        });
    };

    const submitAddSubscription = async () => {
        if (!newSub.name.trim()) {
            return;
        }

        const payload: CreateSubscriptionRequest = {
            name: newSub.name.trim(),
            cost: Number(newSub.cost),
            startDate: new Date(newSub.startDate).toISOString(),
            frequency: getFrequencyValue(newSub.frequency),
            categoryId: newSub.categoryId || null,
        };

        await addSubscription(payload);
        closeAddModal();
    };

    return (
        <DashboardLayout>
            <h1 className="text-3xl mb-4">Subscriptions</h1>
            {error && (
                <div className="mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700">
                    {error}
                </div>
            )}
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
                    {loading && (
                        <p className="text-sm text-gray-500">Loading subscriptions...</p>
                    )}

                    {!loading && cardData.length === 0 && (
                        <p className="text-sm text-gray-500">No subscriptions yet. Add one to get started.</p>
                    )}

                    {!loading &&
                        cardData.map((subscription) => (
                            <SubscriptionCard
                                key={subscription.id}
                                name={subscription.name}
                                daysLeft={subscription.daysLeft}
                                cost={subscription.cost}
                                logo={subscription.logo}
                                frequency={subscription.frequencyLabel}
                                category={subscription.categoryLabel}
                                categoryId={subscription.categoryId}
                                frequencyValue={subscription.frequencyValue}
                                startDate={subscription.startDate}
                                categories={categories}
                                onSave={async (payload) => {
                                    await editSubscription(subscription.id, {
                                        name: payload.name,
                                        cost: payload.cost,
                                        startDate: payload.startDate,
                                        frequency: payload.frequency,
                                        categoryId: payload.categoryId,
                                    });
                                }}
                                isSaving={mutating}
                            />
                        ))}
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
                                    value={newSub.categoryId}
                                    onChange={(e) =>
                                        setNewSub((prev) => ({
                                            ...prev,
                                            categoryId: e.target.value,
                                        }))
                                    }
                                    className="mt-1 w-full rounded-lg border border-main-300 px-3 py-2"
                                >
                                    <option value="">Uncategorized</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
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
                                    <option value="BiWeekly">BiWeekly</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Quarterly">Quarterly</option>
                                    <option value="Yearly">Yearly</option>
                                </select>
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium text-main-700">
                                    Start Date
                                </span>
                                <input
                                    type="date"
                                    value={newSub.startDate}
                                    onChange={(e) =>
                                        setNewSub((prev) => ({
                                            ...prev,
                                            startDate: e.target.value,
                                        }))
                                    }
                                    className="mt-1 w-full rounded-lg border border-main-300 px-3 py-2"
                                />
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
                                onClick={() => {
                                    submitAddSubscription().catch(() => undefined);
                                }}
                                className="rounded-lg bg-main-600 px-4 py-2 text-white hover:bg-main-700"
                            >
                                {mutating ? "Creating..." : "Create"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
