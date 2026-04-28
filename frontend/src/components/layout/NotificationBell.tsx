import { useEffect, useRef, useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { useNotifications } from "../../hooks/useNotifications";

export default function NotificationBell() {
    const { notifications, loading, dismiss } = useNotifications();
    const [open, setOpen] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                panelRef.current &&
                !panelRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const unreadCount = notifications.length;

    return (
        <div className="relative" ref={panelRef}>
            <button
                aria-label="Notifications"
                className="relative p-2 rounded-full hover:bg-main-100 dark:hover:bg-main-800 transition-colors"
                onClick={() => setOpen((prev) => !prev)}
            >
                <FaRegBell size={22} />
                {unreadCount > 0 && (
                    <span className="absolute top-0.5 right-0.5 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full">
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-main-900 border border-main-200 dark:border-main-700 rounded-xl shadow-lg z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-main-200 dark:border-main-700">
                        <h3 className="text-sm font-semibold text-main-900 dark:text-white">
                            Notifications
                        </h3>
                    </div>

                    {loading ? (
                        <div className="px-4 py-6 text-sm text-center text-main-500 dark:text-main-400">
                            Loading…
                        </div>
                    ) : notifications.length === 0 ? (
                        <div className="px-4 py-6 text-sm text-center text-main-500 dark:text-main-400">
                            No notifications
                        </div>
                    ) : (
                        <ul>
                            {notifications.map((n) => (
                                <li
                                    key={n.subscriptionId}
                                    className="flex items-start justify-between gap-3 px-4 py-3 border-b border-main-100 dark:border-main-800 last:border-0"
                                >
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-main-900 dark:text-white truncate">
                                            {n.subscriptionName}
                                        </p>
                                        <p className="text-xs text-main-500 dark:text-main-400 mt-0.5">
                                            Renews tomorrow &mdash; ${n.cost}
                                        </p>
                                    </div>
                                    <button
                                        aria-label={`Dismiss notification for ${n.subscriptionName}`}
                                        className="shrink-0 text-xs text-main-400 hover:text-main-700 dark:hover:text-main-200 transition-colors mt-0.5"
                                        onClick={() =>
                                            dismiss(n.subscriptionId)
                                        }
                                    >
                                        Dismiss
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}
