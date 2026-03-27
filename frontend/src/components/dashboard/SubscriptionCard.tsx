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
    categories?: Category[];
    isSaving?: boolean;
    onSave?: (payload: SavePayload) => Promise<void>;
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
    categories = [],
    isSaving = false,
    onSave,
}: SubscriptionCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [subscription, setSubscription] = useState({
        name,
        cost,
        frequency,
        category,
        categoryId: categoryId ?? null,
        frequencyValue: frequencyValue ?? getFrequencyValue(frequency),
        startDate: startDate ?? new Date().toISOString(),
    });
    const [formState, setFormState] = useState({
        name,
        cost,
        frequency,
        category,
        categoryId: categoryId ?? null as string | null,
        startDate: startDate ?? new Date().toISOString(),
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
        });

        setFormState({
            name,
            cost,
            frequency,
            category,
            categoryId: categoryId ?? null,
            startDate: startDate ?? new Date().toISOString(),
        });
    }, [
        name,
        cost,
        frequency,
        category,
        categoryId,
        frequencyValue,
        startDate,
    ]);

    const openModal = () => {
        setFormState(subscription);
        setIsOpen(true);
    };

    const closeModal = () => {
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
        });

        setIsOpen(false);
    };

    return (
        <>
            <div className="flex flex-col gap-3 bg-main-10 rounded-xl shadow-sm border border-main-400 p-4 lg:px-6 lg:py-5 ">
                <div className="flex flex-row items-center justify-between h-3/4">
                    <div className="flex flex-row items-center justify-between lg:gap-4 md:gap-3">
                        <img
                            src={logo}
                            alt="logo"
                            className="lg:h-9 lg:w-9 md:h-7 md:w-7 rounded"
                        />
                        <div className="flex flex-col">
                            <h1 className="lg:text-xl md:text-lg">
                                {subscription.name}
                            </h1>
                            <p className="text-sm text-gray-400">
                                {subscription.frequency}
                            </p>
                            <p className="text-sm text-gray-400">
                                {subscription.category}
                            </p>
                        </div>
                    </div>

                    <button onClick={openModal} className="cursor-pointer">
                        <IoChevronForwardSharp className="lg:text-2xl text-main-800 md:text-lg" />
                    </button>
                </div>

                <div className="flex flex-row items-center justify-between gap-2 h-1/4 text-main-900">
                    <div className="rounded-4xl bg-main-50 p-2 text-center md:text-sm">
                        {daysLeft} days left
                    </div>

                    <div className="rounded-4xl bg-main-50 p-2 text-center md:text-sm">
                        ${subscription.cost}
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
                        <h2 className="mb-4 text-xl font-semibold">
                            Edit Subscription
                        </h2>
                        <div className="space-y-3">
                            <label className="block">
                                <span className="text-sm font-medium text-main-700">
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
                                    className="mt-1 w-full rounded-lg border border-main-300 px-3 py-2"
                                />
                            </label>

                            <label className="block">
                                <span className="text-sm font-medium text-main-700">
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
                                    className="mt-1 w-full rounded-lg border border-main-300 px-3 py-2"
                                />
                            </label>

                            <label className="block">
                                <span className="text-sm font-medium text-main-700">
                                    Category
                                </span>
                                <select
                                    value={formState.categoryId ?? ""}
                                    onChange={(e) =>
                                        setFormState((prev) => ({
                                            ...prev,
                                            category: categories.find(
                                                (item) => item.id === e.target.value,
                                            )?.name ?? "Uncategorized",
                                            categoryId: e.target.value || null,
                                        }))
                                    }
                                    className="mt-1 w-full rounded-lg border border-main-300 px-3 py-2"
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
                                <span className="text-sm font-medium text-main-700">
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
                                    className="mt-1 w-full rounded-lg border border-main-300 px-3 py-2"
                                >
                                    <option value="Weekly">Weekly</option>
                                    <option value="BiWeekly">BiWeekly</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Quarterly">Quarterly</option>
                                    <option value="Yearly">Yearly</option>
                                </select>
                            </label>
                        </div>
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
