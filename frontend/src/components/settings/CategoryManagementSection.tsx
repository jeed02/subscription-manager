import { useEffect, useState } from "react";
import {
    createCategory,
    deleteCategory,
    getCategories,
    updateCategory,
} from "../../services/categoryService";
import type {
    Category,
    CreateCategoryRequest,
    UpdateCategoryRequest,
} from "../../types/settings";

export default function CategoryManagementSection() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [createForm, setCreateForm] = useState<CreateCategoryRequest>({
        name: "",
        color: "#3B82F6",
    });

    const [editForm, setEditForm] = useState<UpdateCategoryRequest>({
        name: "",
        color: "#3B82F6",
    });

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (err: any) {
            setError(
                err.response?.data?.message || "Failed to load categories",
            );
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await createCategory(createForm);
            setCreateForm({ name: "", color: "#3B82F6" });
            setShowCreateForm(false);
            await loadCategories();
        } catch (err: any) {
            setError(
                err.response?.data?.message || "Failed to create category",
            );
        }
    };

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingId) return;
        setError("");

        try {
            await updateCategory(editingId, editForm);
            setEditingId(null);
            await loadCategories();
        } catch (err: any) {
            setError(
                err.response?.data?.message || "Failed to update category",
            );
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this category?")) return;

        try {
            await deleteCategory(id);
            await loadCategories();
        } catch (err: any) {
            setError(
                err.response?.data?.message || "Failed to delete category",
            );
        }
    };

    const startEdit = (category: Category) => {
        setEditingId(category.id);
        setEditForm({ name: category.name, color: category.color });
    };

    if (loading) {
        return (
            <div className="bg-white dark:bg-main-800 rounded-lg border border-main-400 shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Categories</h2>
                <div className="text-center py-4">Loading...</div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-main-950 rounded-lg border border-main-400 shadow p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Categories</h2>
                <button
                    onClick={() => setShowCreateForm(true)}
                    className="px-4 py-2 border border-main-300 text-main-400 hover:bg-main-100 rounded-md"
                >
                    Add Category
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
                    className="mb-6 p-4 bg-gray-50 dark:bg-main-700 rounded-lg"
                >
                    <h3 className="font-medium mb-3">Create New Category</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Category name"
                            value={createForm.name}
                            onChange={(e) =>
                                setCreateForm({
                                    ...createForm,
                                    name: e.target.value,
                                })
                            }
                            className="px-3 py-2 border border-gray-300 dark:border-main-600 dark:bg-main-700 dark:text-main-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="color"
                            value={createForm.color}
                            onChange={(e) =>
                                setCreateForm({
                                    ...createForm,
                                    color: e.target.value,
                                })
                            }
                            className="px-3 py-2 border border-gray-300 dark:border-main-600 rounded-md h-10"
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

            {/* Categories List */}
            <div className="space-y-3">
                {categories.length === 0 ? (
                    <p className="text-gray-500 dark:text-main-400 text-center py-4">
                        No categories yet. Create your first category!
                    </p>
                ) : (
                    categories.map((category) => (
                        <div
                            key={category.id}
                            className="flex items-center justify-between p-3 border border-gray-200 dark:border-main-700 rounded-lg"
                        >
                            {editingId === category.id ? (
                                <form
                                    onSubmit={handleEdit}
                                    className="flex-1 flex items-center gap-3"
                                >
                                    <input
                                        type="text"
                                        value={editForm.name}
                                        onChange={(e) =>
                                            setEditForm({
                                                ...editForm,
                                                name: e.target.value,
                                            })
                                        }
                                        className="flex-1 px-3 py-1 border border-gray-300 dark:border-main-600 dark:bg-main-700 dark:text-main-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                    <input
                                        type="color"
                                        value={editForm.color}
                                        onChange={(e) =>
                                            setEditForm({
                                                ...editForm,
                                                color: e.target.value,
                                            })
                                        }
                                        className="w-12 h-8 border border-gray-300 dark:border-main-600 rounded"
                                    />
                                    <button
                                        type="submit"
                                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEditingId(null)}
                                        className="px-3 py-1 bg-gray-300 dark:bg-main-700 text-gray-700 dark:text-main-200 rounded hover:bg-gray-400 dark:hover:bg-main-600 text-sm"
                                    >
                                        Cancel
                                    </button>
                                </form>
                            ) : (
                                <>
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-4 h-4 rounded"
                                            style={{
                                                backgroundColor: category.color,
                                            }}
                                        ></div>
                                        <span className="font-medium">
                                            {category.name}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => startEdit(category)}
                                            className="px-3 py-1 text-blue-600 hover:text-blue-800 text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(category.id)
                                            }
                                            className="px-3 py-1 text-red-600 hover:text-red-800 text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
