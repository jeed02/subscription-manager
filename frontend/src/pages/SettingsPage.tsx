import DashboardLayout from "../components/layout/DashboardLayout.tsx";
import BudgetSection from "../components/settings/BudgetSection.tsx";
import CategoryManagementSection from "../components/settings/CategoryManagementSection.tsx";
import DangerZoneSection from "../components/settings/DangerZoneSection.tsx";
import ExportSection from "../components/settings/ExportSection.tsx";
import PreferencesSection from "../components/settings/PreferencesSection.tsx";
import ProfileSection from "../components/settings/ProfileSection.tsx";

export default function SettingsPage() {
    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto p-6 space-y-8">
                <h1 className="text-3xl mb-8">Settings</h1>

                <ProfileSection />
                <PreferencesSection />
                <CategoryManagementSection />
                <BudgetSection />
                <ExportSection />
                <DangerZoneSection />
            </div>
        </DashboardLayout>
    );
}
