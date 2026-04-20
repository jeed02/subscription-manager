import { useEffect, useState } from "react";
import { IoChevronForwardSharp } from "react-icons/io5";
import type { Category } from "../../types/settings";
import { getFrequencyValue } from "../../utils/subscriptionMapper";

interface SavePayload {
    name: string;
    cost: number;
    frequency: number;
    categoryId: string | null;
    startDate: string;
    description?: string | null;
}

interface SubscriptionCardProps {
    name: string;
    daysLeft: number;
    cost: number;
    logo: string;
    frequency: string;
    category: string;
    categoryId?: string | null;
    frequencyValue?: number;
    startDate?: string;
    description?: string | null;
    categories?: Category[];
    isSaving?: boolean;
    isDeleting?: boolean;
    onSave?: (payload: SavePayload) => Promise<void>;
    onDelete?: () => Promise<void>;
}

export default function SubscriptionCard({
    name,
    daysLeft,
    cost,
    logo,
    frequency,
    category,
    categoryId,
    frequencyValue,
    startDate,
    description,
    categories = [],
    isSaving = false,
    isDeleting = false,
    onSave,
    onDelete,
}: SubscriptionCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [subscription, setSubscription] = useState({
        name,
        cost,
        frequency,
        category,
        categoryId: categoryId ?? null,
        frequencyValue: frequencyValue ?? getFrequencyValue(frequency),
        startDate: startDate ?? new Date().toISOString(),
        description: description ?? null,
    });
    const [formState, setFormState] = useState({
        name,
        cost,
        frequency,
        category,
        categoryId: categoryId ?? (null as string | null),
        startDate: startDate ?? new Date().toISOString(),
        description: description ?? (null as string | null),
    });

    useEffect(() => {
        setSubscription({
            name,
            cost,
            frequency,
            category,
            categoryId: categoryId ?? null,
            frequencyValue: frequencyValue ?? getFrequencyValue(frequency),
            startDate: startDate ?? new Date().toISOString(),
            description: description ?? null,
        });

        setFormState({
            name,
            cost,
            frequency,
            category,
            categoryId: categoryId ?? null,
            startDate: startDate ?? new Date().toISOString(),
            description: description ?? (null as string | null),
        });
    }, [
        name,
        cost,
        frequency,
        category,
        categoryId,
        frequencyValue,
        startDate,
        description,
    ]);

    const openModal = () => {
        setFormState({
            name: subscription.name,
            cost: subscription.cost,
            frequency: subscription.frequency,
            category: subscription.category,
            categoryId: subscription.categoryId,
            startDate: subscription.startDate,
            description: subscription.description,
        });
        setShowDeleteConfirm(false);
        setIsOpen(true);
    };

    const closeModal = () => {
        setShowDeleteConfirm(false);
        setIsOpen(false);
    };

    const saveChanges = async () => {
        if (!onSave) {
            setSubscription((prev) => ({
                ...prev,
                name: formState.name,
                cost: formState.cost,
                frequency: formState.frequency,
                category: formState.category,
                categoryId: formState.categoryId,
                frequencyValue: getFrequencyValue(formState.frequency),
                description: formState.description || null,
            }));
            setIsOpen(false);
            return;
        }

        await onSave({
            name: formState.name,
            cost: formState.cost,
            frequency: getFrequencyValue(formState.frequency),
            categoryId: formState.categoryId,
            startDate: formState.startDate,
            description: formState.description || null,
        });

        setIsOpen(false);
    };

    const deleteSubscription = async () => {
        if (!onDelete) {
            return;
        }

        await onDelete();
        closeModal();
    };

    return (
        <>
            <div className="flex flex-col gap-3 bg-main-10 dark:bg-main-950 rounded-xl shadow-sm border border-main-400 p-4 lg:px-6 lg:py-5 ">
                <div className="flex flex-row items-center justify-between h-3/4">
                    <div className="flex flex-row items-center justify-between lg:gap-4 md:gap-3">
                        <img
                            src={logo}
                            alt="logo"
                            className="lg:h-9 lg:w-9 md:h-7 md:w-7 rounded"
                        />
                        <div className="flex flex-col">
                            <h1 className="lg:text-xl md:text-lg dark:text-white">
                                {subscription.name}
                            </h1>
                            <p className="text-sm text-gray-400 dark:text-main-400">
                                {subscription.category}
                            </p>
                            {subscription.description ? (
                                <p className="text-sm text-gray-400 dark:text-main-400">
                                    {subscription.description}
                                </p>
                            ) : null}
                        </div>
                    </div>

                    <button onClick={openModal} className="cursor-pointer">
                        <IoChevronForwardSharp className="lg:text-2xl text-main-800 dark:text-main-300 md:text-lg" />
                    </button>
                </div>

                <div className="flex flex-row items-center justify-between gap-2 h-1/4 text-main-900 dark:text-white">
                    <div className="rounded-4xl bg-main-50 dark:bg-main-900 dark:border dark:border-main-700 p-2 text-center md:text-sm">
                        {daysLeft} days left
                    </div>

                    <div className="rounded-4xl bg-main-50 dark:bg-main-900 dark:border dark:border-main-700 p-2 text-center md:text-sm">
                        ${subscription.cost}
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-lg rounded-xl bg-white dark:bg-main-800 p-6 shadow-xl max-h-[90vh] overflow-y-auto">
                        <h2 className="mb-4 text-xl font-semibold dark:text-main-100">
                            Edit Subscription
                        </h2>
                        <div className="space-y-3">
                            <label className="block">
                                <span className="text-sm font-medium text-main-700 dark:text-main-300">
                                    Name
                                </span>
                                <input
                                    type="text"
                                    value={formState.name}
                                    onChange={(e) =>
                                        setFormState((prev) => ({
                                            ...prev,
                                            name: e.target.value,
                                        }))
                                    }
                                    className="mt-1 w-full rounded-lg border border-main-300 dark:border-main-600 dark:bg-main-700 dark:text-main-100 px-3 py-2"
                                />
                            </label>

                            <label className="block">
                                <span className="text-sm font-medium text-main-700 dark:text-main-300">
                                    Cost
                                </span>
                                <input
                                    type="number"
                                    value={formState.cost}
                                    onChange={(e) =>
                                        setFormState((prev) => ({
                                            ...prev,
                                            cost: Number(e.target.value),
                                        }))
                                    }
                                    className="mt-1 w-full rounded-lg border border-main-300 dark:border-main-600 dark:bg-main-700 dark:text-main-100 px-3 py-2"
                                />
                            </label>

                            <label className="block">
                                <span className="text-sm font-medium text-main-700 dark:text-main-300">
                                    Category
                                </span>
                                <select
                                    value={formState.categoryId ?? ""}
                                    onChange={(e) =>
                                        setFormState((prev) => ({
                                            ...prev,
                                            category:
                                                categories.find(
                                                    (item) =>
                                                        item.id ===
                                                        e.target.value,
                                                )?.name ?? "Uncategorized",
                                            categoryId: e.target.value || null,
                                        }))
                                    }
                                    className="mt-1 w-full rounded-lg border border-main-300 dark:border-main-600 dark:bg-main-700 dark:text-main-100 px-3 py-2"
                                >
                                    <option value="">Uncategorized</option>
                                    {categories.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="block">
                                <span className="text-sm font-medium text-main-700 dark:text-main-300">
                                    Frequency
                                </span>
                                <select
                                    value={formState.frequency}
                                    onChange={(e) =>
                                        setFormState((prev) => ({
                                            ...prev,
                                            frequency: e.target.value,
                                        }))
                                    }
                                    className="mt-1 w-full rounded-lg border border-main-300 dark:border-main-600 dark:bg-main-700 dark:text-main-100 px-3 py-2"
                                >
                                    <option value="Weekly">Weekly</option>
                                    <option value="BiWeekly">BiWeekly</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Quarterly">Quarterly</option>
                                    <option value="Yearly">Yearly</option>
                                </select>
                            </label>

                            <label className="block">
                                <span className="text-sm font-medium text-main-700 dark:text-main-300">
                                    Description
                                </span>
                                {formState.description && (
                                    <p className="mt-1 text-sm text-main-800 rounded-lg bg-main-50 border border-main-200 px-3 py-2">
                                        {formState.description}
                                    </p>
                                )}
                                <textarea
                                    value={formState.description ?? ""}
                                    onChange={(e) =>
                                        setFormState((prev) => ({
                                            ...prev,
                                            description: e.target.value,
                                        }))
                                    }
                                    rows={3}
                                    placeholder="Optional description..."
                                    className="mt-1 w-full rounded-lg border border-main-300 dark:border-main-600 dark:bg-main-700 dark:text-main-100 px-3 py-2 resize-none"
                                />
                            </label>
                        </div>

                        {onDelete && (
                            <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3">
                                {!showDeleteConfirm ? (
                                    <button
                                        onClick={() =>
                                            setShowDeleteConfirm(true)
                                        }
                                        className="rounded-lg border border-red-300 px-3 py-2 text-sm text-red-700 hover:bg-red-100"
                                    >
                                        Delete Subscription
                                    </button>
                                ) : (
                                    <div className="space-y-3">
                                        <p className="text-sm text-red-800">
                                            Are you sure you want to delete this
                                            subscription? This action cannot be
                                            undone.
                                        </p>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() =>
                                                    setShowDeleteConfirm(false)
                                                }
                                                className="rounded-lg border border-main-300 px-3 py-2 text-sm text-main-700"
                                            >
                                                Keep Subscription
                                            </button>
                                            <button
                                                onClick={() => {
                                                    deleteSubscription().catch(
                                                        () => undefined,
                                                    );
                                                }}
                                                className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
                                            >
                                                {isDeleting
                                                    ? "Deleting..."
                                                    : "Yes, Delete"}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="mt-5 flex justify-end gap-2">
                            <button
                                onClick={closeModal}
                                className="rounded-lg border border-main-300 px-4 py-2 text-main-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    saveChanges().catch(() => undefined);
                                }}
                                className="rounded-lg bg-main-600 px-4 py-2 text-white hover:bg-main-700"
                            >
                                {isSaving ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
