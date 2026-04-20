import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import SubscriptionCard from "../components/dashboard/SubscriptionCard.tsx";
import LatestTransactionsWidget from "../components/dashboard/widgets/LatestTransactionsWidget.tsx";
import SubscriptionCategoryWidget from "../components/dashboard/widgets/SubscriptionCategoryWidget.tsx";
import TotalExpenseWidget from "../components/dashboard/widgets/TotalExpenseWidget.tsx";
import UpcomingTransactionsWidget from "../components/dashboard/widgets/UpcomingTransactionsWidget.tsx";
import DashboardLayout from "../components/layout/DashboardLayout.tsx";
import { useCategories } from "../hooks/useCategories";
import { useCategoryBreakdown } from "../hooks/useCategoryBreakdown.ts";
import { useMonthlyExpenses } from "../hooks/useMonthlyExpenses";
import { useSubscriptions } from "../hooks/useSubscriptions";
import { useTransactions } from "../hooks/useTransactions";
import { toSubscriptionCardModel } from "../utils/subscriptionMapper";

export default function DashboardPage() {
    const {
        subscriptions,
        loading,
        error,
        mutating,
        editSubscription,
        removeSubscription,
    } = useSubscriptions();
    const {
        latestTransactions,
        upcomingTransactions,
        loading: transactionsLoading,
        error: transactionsError,
    } = useTransactions();
    const {
        categories: categoryBreakdown,
        loading: categoryBreakdownLoading,
        error: categoryBreakdownError,
    } = useCategoryBreakdown();
    const {
        monthlyExpenses,
        loading: monthlyExpensesLoading,
        error: monthlyExpensesError,
    } = useMonthlyExpenses();
    const { categories } = useCategories();
    const renewSubscriptions = useMemo(
        () =>
            subscriptions
                .slice(0, 4)
                .map((subscription) => toSubscriptionCardModel(subscription)),
        [subscriptions],
    );

    return (
        <DashboardLayout>
            <h1 className="text-3xl mb-4">Dashboard</h1>

            <section className="my-6">
                <div className="flex flex-row items-center justify-between mb-4">
                    <h1 className="text-xl font-medium">Renew Subscriptions</h1>
                    <NavLink
                        to="/subscriptions"
                        className="text-md text-main-600"
                    >
                        View all
                    </NavLink>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {loading && (
                        <p className="text-sm text-gray-500 dark:text-main-400">
                            Loading subscriptions...
                        </p>
                    )}

                    {!loading && error && (
                        <p className="text-sm text-red-600">
                            Failed to load subscriptions.
                        </p>
                    )}

                    {!loading && !error && renewSubscriptions.length === 0 && (
                        <p className="text-sm text-gray-500 dark:text-main-400">
                            No subscriptions yet.
                        </p>
                    )}

                    {!loading &&
                        !error &&
                        renewSubscriptions.map((subscription) => (
                            <SubscriptionCard
                                key={subscription.id}
                                name={subscription.name}
                                daysLeft={subscription.daysLeft}
                                cost={subscription.cost}
                                logo={subscription.logo}
                                frequency={subscription.frequencyLabel}
                                category={subscription.categoryLabel}
                                categoryId={subscription.categoryId}
                                frequencyValue={subscription.frequencyValue}
                                startDate={subscription.startDate}
                                description={subscription.description}
                                categories={categories}
                                onSave={async (payload) => {
                                    await editSubscription(subscription.id, {
                                        name: payload.name,
                                        cost: payload.cost,
                                        startDate: payload.startDate,
                                        frequency: payload.frequency,
                                        categoryId: payload.categoryId,
                                        description: payload.description,
                                    });
                                }}
                                isSaving={mutating}
                                isDeleting={mutating}
                                onDelete={async () => {
                                    await removeSubscription(subscription.id);
                                }}
                            />
                        ))}
                </div>
            </section>

            <section className="my-6">
                <div className="flex flex-row items-center justify-between mb-4">
                    <h1 className="text-xl font-medium">Expenses</h1>
                    <NavLink to="/analytics" className="text-md text-main-600">
                        View all
                    </NavLink>
                </div>
            </section>

            <section className="my-6">
                <div className="grid grid-cols-2 gap-6">
                    <TotalExpenseWidget
                        items={monthlyExpenses}
                        loading={monthlyExpensesLoading}
                        error={monthlyExpensesError}
                    />
                    <SubscriptionCategoryWidget
                        items={categoryBreakdown}
                        loading={categoryBreakdownLoading}
                        error={categoryBreakdownError}
                    />
                </div>
            </section>

            <section className="my-6">
                <div className="flex flex-row items-center justify-between mb-4">
                    <h1 className="text-xl font-medium">Transactions</h1>
                    <NavLink to="/analytics" className="text-md text-main-600">
                        View all
                    </NavLink>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <LatestTransactionsWidget
                        items={latestTransactions}
                        loading={transactionsLoading}
                        error={transactionsError}
                    />
                    <UpcomingTransactionsWidget
                        items={upcomingTransactions}
                        loading={transactionsLoading}
                        error={transactionsError}
                    />
                </div>
            </section>
        </DashboardLayout>
    );
}
