export default function Widget({title, children}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="bg-main-10 rounded-xl shadow-sm border border-main-400 p-6">
            <h2 className="text-sm font-semibold text-gray-500 mb-3">
                {title}
            </h2>

            {children}
        </div>
    );
}
