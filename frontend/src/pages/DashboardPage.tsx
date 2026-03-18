import { NavLink } from "react-router-dom";
import SubscriptionCard from "../components/dashboard/SubscriptionCard.tsx";
import LatestTransactionsWidget from "../components/dashboard/widgets/LatestTransactionsWidget.tsx";
import SubscriptionCategoryWidget from "../components/dashboard/widgets/SubscriptionCategoryWidget.tsx";
import TotalExpenseWidget from "../components/dashboard/widgets/TotalExpenseWidget.tsx";
import UpcomingTransactionsWidget from "../components/dashboard/widgets/UpcomingTransactionsWidget.tsx";
import DashboardLayout from "../components/layout/DashboardLayout.tsx";

export default function DashboardPage() {
    return (
        <DashboardLayout>
            <h1 className="text-3xl mb-4 font-medium">Dashboard</h1>

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
                    <SubscriptionCard
                        name={"Netflix"}
                        daysLeft={9}
                        cost={12}
                        logo={
                            "https://www.google.com/s2/favicons?domain=netflix.com&sz=128"
                        }
                    />
                    <SubscriptionCard
                        name={"Netflix"}
                        daysLeft={11}
                        cost={12}
                        logo={
                            "https://www.google.com/s2/favicons?domain=netflix.com&sz=128"
                        }
                    />
                    <SubscriptionCard
                        name={"Netflix"}
                        daysLeft={14}
                        cost={12}
                        logo={
                            "https://www.google.com/s2/favicons?domain=netflix.com&sz=128"
                        }
                    />
                    <SubscriptionCard
                        name={"Netflix"}
                        daysLeft={20}
                        cost={12}
                        logo={
                            "https://www.google.com/s2/favicons?domain=netflix.com&sz=128"
                        }
                    />
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
                    <TotalExpenseWidget />
                    <SubscriptionCategoryWidget />
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
                    <LatestTransactionsWidget />
                    <UpcomingTransactionsWidget />
                </div>
            </section>
        </DashboardLayout>
    );
}
