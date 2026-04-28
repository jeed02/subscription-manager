import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import NotificationBell from "./NotificationBell";
import Sidebar from "./Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex bg-main-20 dark:bg-main-950 dark:text-white lg:px-16">
            <button
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-main-10 dark:bg-main-800 rounded shadow"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                <IoMenu size={24} />
            </button>

            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <main className="flex-1 min-h-screen lg:py-8 lg:px-24 p-8">
                <div className="flex justify-end mb-4">
                    <NotificationBell />
                </div>
                {children}
            </main>
        </div>
    );
}
