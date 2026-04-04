import { useState } from "react";
import { api } from "../../utils/api";

export default function ExportSection() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleExport = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await api.get("/subscription/export/csv", {
                responseType: "blob",
            });

            const blob = response.data as Blob;

            // Create a download link
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "subscriptions.csv";
            document.body.appendChild(a);
            a.click();

            // Clean up
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err: any) {
            setError(
                err.response?.data?.message || "Failed to export subscriptions",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Export Data</h2>

            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Download Subscriptions as CSV
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Export all your subscriptions to a CSV file for backup,
                        analysis, or use in other applications. The file will
                        include subscription name, cost, frequency, start date,
                        renewal date, and category information.
                    </p>
                </div>

                <button
                    onClick={handleExport}
                    disabled={loading}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Exporting..." : "Download CSV"}
                </button>
            </div>
        </div>
    );
}
