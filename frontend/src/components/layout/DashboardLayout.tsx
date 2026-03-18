import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import Sidebar from "./Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex bg-main-20 lg:px-16">
            <button
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-main-10 rounded shadow"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                <IoMenu size={24} />
            </button>

            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <main className="flex-1 min-h-screen lg:py-8 lg:px-24 p-8">
                {children}
            </main>
        </div>
    );
}
