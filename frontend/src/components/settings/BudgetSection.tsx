import { useEffect, useState } from "react";
import {
    createBudget,
    deleteBudget,
    getBudgets,
    getBudgetStatuses,
    updateBudget,
} from "../../services/budgetService";
import { getCategories } from "../../services/categoryService";
import type {
    Budget,
    BudgetStatus,
    Category,
    CreateBudgetRequest,
    UpdateBudgetRequest,
} from "../../types/settings";

export default function BudgetSection() {
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [budgetStatuses, setBudgetStatuses] = useState<BudgetStatus[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [createForm, setCreateForm] = useState<CreateBudgetRequest>({
        categoryId: null,
        monthlyLimit: 0,
        alertThreshold: 80,
    });

    const [editForm, setEditForm] = useState<UpdateBudgetRequest>({
        categoryId: null,
        monthlyLimit: 0,
        alertThreshold: 80,
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [budgetsData, statusesData, categoriesData] =
                await Promise.all([
                    getBudgets(),
                    getBudgetStatuses(),
                    getCategories(),
                ]);
            setBudgets(budgetsData);
            setBudgetStatuses(statusesData);
            setCategories(categoriesData);
        } catch (err: any) {
            setError(
                err.response?.data?.message || "Failed to load budget data",
            );
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await createBudget(createForm);
            setCreateForm({
                categoryId: null,
                monthlyLimit: 0,
                alertThreshold: 80,
            });
            setShowCreateForm(false);
            await loadData();
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to create budget");
        }
    };

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingId) return;
        setError("");

        try {
            await updateBudget(editingId, editForm);
            setEditingId(null);
            await loadData();
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to update budget");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this budget?")) return;

        try {
            await deleteBudget(id);
            await loadData();
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to delete budget");
        }
    };

    const startEdit = (budget: Budget) => {
        setEditingId(budget.id);
        setEditForm({
            categoryId: budget.categoryId,
            monthlyLimit: budget.monthlyLimit,
            alertThreshold: budget.alertThreshold,
        });
    };

    const getBudgetStatus = (budget: Budget) => {
        return budgetStatuses.find((s) => s.budget.id === budget.id);
    };

    if (loading) {
        return (
            <div className="bg-white dark:bg-main-950 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Budgets</h2>
                <div className="text-center py-4">Loading...</div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-main-950 rounded-lg border border-main-400 shadow p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Budgets</h2>
                <button
                    onClick={() => setShowCreateForm(true)}
                    className="px-4 py-2 rounded-md border border-main-300 text-main-400 hover:bg-main-100"
                >
                    Add Budget
                </button>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            {/* Create Form */}
            {showCreateForm && (
                <form
                    onSubmit={handleCreate}
                    className="mb-6 p-4 bg-gray-50 dark:bg-main-950 dark:border dark:border-main-600 rounded-lg"
                >
                    <h3 className="font-medium mb-3">Create New Budget</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <select
                            value={createForm.categoryId || ""}
                            onChange={(e) =>
                                setCreateForm({
                                    ...createForm,
                                    categoryId: e.target.value || null,
                                })
                            }
                            className="px-3 py-2 border border-gray-300 dark:border-main-600 dark:bg-main-700 dark:text-main-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Overall Budget</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            placeholder="Monthly limit"
                            value={createForm.monthlyLimit}
                            onChange={(e) =>
                                setCreateForm({
                                    ...createForm,
                                    monthlyLimit:
                                        Number(e.target.valueAsNumber) || 0,
                                })
                            }
                            className="px-3 py-2 border border-gray-300 dark:border-main-600 dark:bg-main-700 dark:text-main-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            min="0"
                            step="0.01"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Alert threshold (%)"
                            value={createForm.alertThreshold}
                            onChange={(e) =>
                                setCreateForm({
                                    ...createForm,
                                    alertThreshold:
                                        Number(e.target.valueAsNumber) || 80,
                                })
                            }
                            className="px-3 py-2 border border-gray-300 dark:border-main-600 dark:bg-main-700 dark:text-main-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            min="0"
                            max="100"
                            required
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                            Create
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowCreateForm(false)}
                            className="px-4 py-2 bg-gray-300 dark:bg-main-700 text-gray-700 dark:text-main-200 rounded-md hover:bg-gray-400 dark:hover:bg-main-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {/* Budgets List */}
            <div className="space-y-4">
                {budgets.length === 0 ? (
                    <p className="text-gray-500 dark:text-main-400 text-center py-4">
                        No budgets set yet. Create your first budget!
                    </p>
                ) : (
                    budgets.map((budget) => {
                        const status = getBudgetStatus(budget);
                        const progressPercent = status
                            ? Math.min(status.percentageUsed, 100)
                            : 0;
                        const isOverLimit = status
                            ? status.currentSpending > budget.monthlyLimit
                            : false;

                        return (
                            <div
                                key={budget.id}
                                className="p-4 border border-gray-200 dark:border-main-700 rounded-lg"
                            >
                                {editingId === budget.id ? (
                                    <form
                                        onSubmit={handleEdit}
                                        className="space-y-3"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            <select
                                                value={
                                                    editForm.categoryId || ""
                                                }
                                                onChange={(e) =>
                                                    setEditForm({
                                                        ...editForm,
                                                        categoryId:
                                                            e.target.value ||
                                                            null,
                                                    })
                                                }
                                                className="px-3 py-2 border border-gray-300 dark:border-main-600 dark:bg-main-700 dark:text-main-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">
                                                    Overall Budget
                                                </option>
                                                {categories.map((category) => (
                                                    <option
                                                        key={category.id}
                                                        value={category.id}
                                                    >
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <input
                                                type="number"
                                                value={editForm.monthlyLimit}
                                                onChange={(e) =>
                                                    setEditForm({
                                                        ...editForm,
                                                        monthlyLimit:
                                                            Number(
                                                                e.target
                                                                    .valueAsNumber,
                                                            ) || 0,
                                                    })
                                                }
                                                className="px-3 py-2 border border-gray-300 dark:border-main-600 dark:bg-main-700 dark:text-main-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                min="0"
                                                step="0.01"
                                                required
                                            />
                                            <input
                                                type="number"
                                                value={editForm.alertThreshold}
                                                onChange={(e) =>
                                                    setEditForm({
                                                        ...editForm,
                                                        alertThreshold:
                                                            Number(
                                                                e.target
                                                                    .valueAsNumber,
                                                            ) || 80,
                                                    })
                                                }
                                                className="px-3 py-2 border border-gray-300 dark:border-main-600 dark:bg-main-700 dark:text-main-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                min="0"
                                                max="100"
                                                required
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                type="submit"
                                                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                                            >
                                                Save
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setEditingId(null)
                                                }
                                                className="px-3 py-1 bg-gray-300 dark:bg-main-700 text-gray-700 dark:text-main-200 rounded hover:bg-gray-400 dark:hover:bg-main-600 text-sm"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <>
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h3 className="font-medium">
                                                    {budget.categoryId
                                                        ? `Budget for ${budget.category?.name || "Category"}`
                                                        : "Overall Budget"}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-main-300">
                                                    Limit: $
                                                    {budget.monthlyLimit.toFixed(
                                                        2,
                                                    )}{" "}
                                                    | Alert at:{" "}
                                                    {budget.alertThreshold}%
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() =>
                                                        startEdit(budget)
                                                    }
                                                    className="px-3 py-1 text-blue-600 hover:text-blue-800 text-sm"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(budget.id)
                                                    }
                                                    className="px-3 py-1 text-red-600 hover:text-red-800 text-sm"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>

                                        {status && (
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span>
                                                        Current spending: $
                                                        {status.currentSpending.toFixed(
                                                            2,
                                                        )}
                                                    </span>
                                                    <span
                                                        className={
                                                            isOverLimit
                                                                ? "text-red-600 font-medium"
                                                                : ""
                                                        }
                                                    >
                                                        {status.percentageUsed.toFixed(
                                                            1,
                                                        )}
                                                        % of budget
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-200 dark:bg-main-700 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full ${isOverLimit ? "bg-red-500" : status.isOverThreshold ? "bg-yellow-500" : "bg-green-500"}`}
                                                        style={{
                                                            width: `${Math.min(progressPercent, 100)}%`,
                                                        }}
                                                    ></div>
                                                </div>
                                                {status.isOverThreshold && (
                                                    <p className="text-sm text-yellow-600">
                                                        ⚠️ You've exceeded your
                                                        alert threshold!
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
