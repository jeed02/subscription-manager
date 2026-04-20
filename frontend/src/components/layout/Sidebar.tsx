import { IoIosLogOut } from "react-icons/io";
import {
    IoAnalyticsOutline,
    IoHomeOutline,
    IoSettingsOutline,
} from "react-icons/io5";
import { MdOutlineSubscriptions } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../services/AuthContext.tsx";

export default function Sidebar({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const linkClass =
        "flex items-center gap-2 text-lg px-4 py-1 hover:text-main-500 transition-colors";

    const { logout } = useAuth();

    return (
        <div
            className={`w-64 h-screen bg-main-20 dark:bg-main-950 flex flex-col lg:sticky lg:top-0 ${isOpen ? "fixed top-0 left-0 z-40" : "hidden lg:flex"}`}
        >
            <div className="flex flex-col h-screen bg-main-10 dark:bg-main-950 m-4 rounded border border-gray-200 dark:border-main-700 rounded-4xl drop-shadow-xs">
                {/* Logo */}
                <div className="p-6 text-xl font-bold text-center">
                    SubManager
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-6">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `${linkClass} ${isActive ? "text-main-500 border-r-2 border-main-500" : ""}`
                        }
                        onClick={onClose}
                    >
                        <IoHomeOutline />
                        Home
                    </NavLink>

                    <NavLink
                        to="/subscriptions"
                        className={({ isActive }) =>
                            `${linkClass} ${isActive ? "text-main-500 border-r-2 border-main-500" : ""}`
                        }
                        onClick={onClose}
                    >
                        <MdOutlineSubscriptions />
                        Subscriptions
                    </NavLink>

                    <NavLink
                        to="/analytics"
                        className={({ isActive }) =>
                            `${linkClass} ${isActive ? "text-main-500 border-r-2 border-main-500" : ""}`
                        }
                        onClick={onClose}
                    >
                        <IoAnalyticsOutline />
                        Analytics
                    </NavLink>

                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            `${linkClass} ${isActive ? "text-main-500 border-r-2 border-main-500" : ""}`
                        }
                        onClick={onClose}
                    >
                        <IoSettingsOutline />
                        Settings
                    </NavLink>
                </nav>

                {/* Footer */}
                <div className="p-6 text-sm text-gray-400 dark:text-main-400 flex flex-col">
                    <button
                        onClick={() => {
                            logout();
                            onClose();
                        }}
                        className="flex flex-row gap-2 items-center text-red-400 text-xl py-2 rounded cursor-pointer"
                    >
                        <IoIosLogOut />
                        Logout
                    </button>
                    v1.0
                </div>
            </div>
        </div>
    );
}
