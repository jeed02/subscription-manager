import { useState } from "react";
import { useAuth } from "../../services/AuthContext";
import { changePassword, updateProfile } from "../../services/authService";
import type {
    ChangePasswordRequest,
    UpdateProfileRequest,
} from "../../types/auth";

export default function ProfileSection() {
    const { user, refreshUser } = useAuth();
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [emailForm, setEmailForm] = useState<UpdateProfileRequest>({
        email: user?.email || "",
    });

    const [passwordForm, setPasswordForm] = useState<ChangePasswordRequest>({
        currentPassword: "",
        newPassword: "",
    });

    const handleUpdateEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await updateProfile(emailForm);
            await refreshUser();
            setIsEditingEmail(false);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to update email");
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await changePassword(passwordForm);
            setIsChangingPassword(false);
            setPasswordForm({ currentPassword: "", newPassword: "" });
        } catch (err: any) {
            setError(
                err.response?.data?.message || "Failed to change password",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-main-950 rounded-lg border border-main-400 shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Profile</h2>

            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            {/* Email Section */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-main-200 mb-2">
                    Email Address
                </label>
                {isEditingEmail ? (
                    <form onSubmit={handleUpdateEmail} className="flex gap-2">
                        <input
                            type="email"
                            value={emailForm.email}
                            onChange={(e) =>
                                setEmailForm({ email: e.target.value })
                            }
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-main-600 dark:bg-main-700 dark:text-main-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsEditingEmail(false)}
                            className="px-4 py-2 bg-gray-300 dark:bg-main-700 text-gray-700 dark:text-main-200 rounded-md hover:bg-gray-400 dark:hover:bg-main-600"
                        >
                            Cancel
                        </button>
                    </form>
                ) : (
                    <div className="flex items-center justify-between">
                        <span className="text-gray-900 dark:text-main-100">
                            {user?.email}
                        </span>
                        <button
                            onClick={() => setIsEditingEmail(true)}
                            className="text-blue-600 hover:text-blue-800"
                        >
                            Edit
                        </button>
                    </div>
                )}
            </div>

            {/* Password Section */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-main-200 mb-2">
                    Password
                </label>
                {isChangingPassword ? (
                    <form onSubmit={handleChangePassword} className="space-y-3">
                        <input
                            type="password"
                            placeholder="Current password"
                            value={passwordForm.currentPassword}
                            onChange={(e) =>
                                setPasswordForm({
                                    ...passwordForm,
                                    currentPassword: e.target.value,
                                })
                            }
                            className="w-full px-3 py-2 border border-gray-300 dark:border-main-600 dark:bg-main-700 dark:text-main-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="password"
                            placeholder="New password"
                            value={passwordForm.newPassword}
                            onChange={(e) =>
                                setPasswordForm({
                                    ...passwordForm,
                                    newPassword: e.target.value,
                                })
                            }
                            className="w-full px-3 py-2 border border-gray-300 dark:border-main-600 dark:bg-main-700 dark:text-main-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                            >
                                {loading ? "Changing..." : "Change Password"}
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsChangingPassword(false)}
                                className="px-4 py-2 bg-gray-300 dark:bg-main-700 text-gray-700 dark:text-main-200 rounded-md hover:bg-gray-400 dark:hover:bg-main-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="flex items-center justify-between">
                        <span className="text-gray-500 dark:text-main-400">
                            ••••••••
                        </span>
                        <button
                            onClick={() => setIsChangingPassword(true)}
                            className="text-blue-600 hover:text-blue-800"
                        >
                            Change
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
