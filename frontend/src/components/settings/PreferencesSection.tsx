import { useEffect, useState } from "react";
import { useAuth } from "../../services/AuthContext";
import { updatePreferences } from "../../services/authService";
import type { UpdatePreferencesRequest } from "../../types/auth";

const CURRENCIES = [
    { value: "USD", label: "US Dollar ($)" },
    { value: "EUR", label: "Euro (€)" },
    { value: "GBP", label: "British Pound (£)" },
    { value: "CAD", label: "Canadian Dollar (C$)" },
    { value: "AUD", label: "Australian Dollar (A$)" },
];

export default function PreferencesSection() {
    const { preferences, refreshPreferences } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState<UpdatePreferencesRequest>({
        currency: preferences?.currency || "USD",
        theme: preferences?.theme || "light",
        notificationsEnabled: preferences?.notificationsEnabled ?? true,
    });

    useEffect(() => {
        if (preferences) {
            setFormData({
                currency: preferences.currency,
                theme: preferences.theme,
                notificationsEnabled: preferences.notificationsEnabled,
            });
        }
    }, [preferences]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await updatePreferences(formData);
            await refreshPreferences();
        } catch (err: any) {
            setError(
                err.response?.data?.message || "Failed to update preferences",
            );
        } finally {
            setLoading(false);
        }
    };

    const hasChanges =
        preferences &&
        (formData.currency !== preferences.currency ||
            formData.theme !== preferences.theme ||
            formData.notificationsEnabled !== preferences.notificationsEnabled);

    return (
        <div className="bg-white dark:bg-main-950 rounded-lg border border-main-400 shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Preferences</h2>

            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Currency */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-main-200 mb-2">
                        Currency
                    </label>
                    <select
                        value={formData.currency}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                currency: e.target.value,
                            })
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-main-600 dark:bg-main-800 dark:text-main-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {CURRENCIES.map((currency) => (
                            <option key={currency.value} value={currency.value}>
                                {currency.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Theme */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-main-200 mb-2">
                        Theme
                    </label>
                    <div className="space-y-2">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                value="light"
                                checked={formData.theme === "light"}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        theme: e.target.value,
                                    })
                                }
                                className="mr-2"
                            />
                            Light
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                value="dark"
                                checked={formData.theme === "dark"}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        theme: e.target.value,
                                    })
                                }
                                className="mr-2"
                            />
                            Dark
                        </label>
                    </div>
                </div>

                {/* Notifications */}
                <div>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={formData.notificationsEnabled}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    notificationsEnabled: e.target.checked,
                                })
                            }
                            className="mr-2"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-main-200">
                            Enable notifications for billing start dates
                        </span>
                    </label>
                </div>

                {/* Save Button */}
                {hasChanges && (
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Save Preferences"}
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}
