export default function Widget({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="bg-main-10 dark:bg-main-950 rounded-xl shadow-sm border border-main-400 p-6">
            <h2 className="text-lg font-semibold text-main-900 dark:text-white mb-3 text-center">
                {title}
            </h2>

            {children}
        </div>
    );
}
