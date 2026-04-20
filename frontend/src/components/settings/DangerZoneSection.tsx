import { useState } from "react";
import { useAuth } from "../../services/AuthContext";
import { deleteAccount } from "../../services/authService";

export default function DangerZoneSection() {
    const { logout } = useAuth();
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [confirmText, setConfirmText] = useState("");

    const handleDeleteAccount = async () => {
        if (confirmText !== "DELETE") return;

        setLoading(true);
        setError("");

        try {
            await deleteAccount();
            logout();
            // Redirect to login page or home
            window.location.href = "/login";
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to delete account");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-main-950 rounded-lg shadow p-6 border-l-4  border-red-500">
            <h2 className="text-xl font-semibold mb-4 text-red-600">
                Danger Zone
            </h2>

            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-main-100 mb-2">
                        Delete Account
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-main-300 mb-4">
                        Once you delete your account, there is no going back.
                        This will permanently delete your account and remove all
                        your subscriptions from our servers.
                    </p>
                </div>

                {!showConfirm ? (
                    <button
                        onClick={() => setShowConfirm(true)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Delete Account
                    </button>
                ) : (
                    <div className="space-y-3">
                        <p className="text-sm text-gray-700 dark:text-main-200">
                            Type <strong>DELETE</strong> to confirm:
                        </p>
                        <input
                            type="text"
                            value={confirmText}
                            onChange={(e) => setConfirmText(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-main-600 dark:bg-main-700 dark:text-main-100 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Type DELETE to confirm"
                        />
                        <div className="flex gap-2">
                            <button
                                onClick={handleDeleteAccount}
                                disabled={loading || confirmText !== "DELETE"}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Deleting..." : "Confirm Delete"}
                            </button>
                            <button
                                onClick={() => {
                                    setShowConfirm(false);
                                    setConfirmText("");
                                }}
                                className="px-4 py-2 bg-gray-300 dark:bg-main-700 text-gray-700 dark:text-main-200 rounded-md hover:bg-gray-400 dark:hover:bg-main-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
