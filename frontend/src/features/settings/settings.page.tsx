import { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/layout/dashboard-layout";
import { Tabs } from "../../components/ui";
import { useSettingsStore } from "./settings.store";
import { ProfileSection } from "./components/profile-section";
import { PasswordSection } from "./components/password-section";
import { ApiKeysSection } from "./components/api-keys-section";
import { BillingSection } from "./components/billing-section";
import { ThemeSection } from "./components/theme-section";
import { NotificationPrefsSection } from "./components/notification-prefs-section";
import { DangerZone } from "./components/danger-zone";

type TabValue = "profile" | "password" | "api-keys" | "billing" | "theme" | "notifications" | "danger";

const TABS: { label: string; value: TabValue }[] = [
	{ label: "Profile", value: "profile" },
	{ label: "Password", value: "password" },
	{ label: "API Keys", value: "api-keys" },
	{ label: "Billing", value: "billing" },
	{ label: "Theme", value: "theme" },
	{ label: "Notifications", value: "notifications" },
	{ label: "Danger Zone", value: "danger" },
];

export function SettingsPage() {
	const [tab, setTab] = useState<TabValue>("profile");
	const fetchSettings = useSettingsStore((s) => s.fetchSettings);

	useEffect(() => {
		void fetchSettings();
	}, [fetchSettings]);

	return (
		<DashboardLayout title="Settings" description="Manage your account, billing, and preferences.">
			<div className="space-y-6">
				<Tabs items={TABS} value={tab} onChange={setTab} />
				{tab === "profile" && <ProfileSection />}
				{tab === "password" && <PasswordSection />}
				{tab === "api-keys" && <ApiKeysSection />}
				{tab === "billing" && <BillingSection />}
				{tab === "theme" && <ThemeSection />}
				{tab === "notifications" && <NotificationPrefsSection />}
				{tab === "danger" && <DangerZone />}
			</div>
		</DashboardLayout>
	);
}
