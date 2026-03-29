import SpendingBreakdownWidget from "../components/dashboard/widgets/SpendingBreakdownWidget.tsx";
import SubscriptionCategoryWidget from "../components/dashboard/widgets/SubscriptionCategoryWidget.tsx";
import TotalExpenseWidget from "../components/dashboard/widgets/TotalExpenseWidget.tsx";
import DashboardLayout from "../components/layout/DashboardLayout.tsx";
import { useCategoryBreakdown } from "../hooks/useCategoryBreakdown.ts";

export default function AnalyticsPage() {
    const { categories, loading, error } = useCategoryBreakdown();

    return (
        <DashboardLayout>
            <h1 className="text-3xl mb-4">Analytics</h1>

            <section className="my-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SpendingBreakdownWidget />
                    <TotalExpenseWidget />
                    <SubscriptionCategoryWidget
                        items={categories}
                        loading={loading}
                        error={error}
                    />
                </div>
            </section>
        </DashboardLayout>
    );
}
