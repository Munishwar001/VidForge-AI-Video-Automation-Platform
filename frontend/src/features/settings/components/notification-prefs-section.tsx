import { Card, Toggle } from "../../../components/ui";
import { useSettingsStore } from "../settings.store";
import type { NotificationPreferences } from "../settings.store";

const LABELS: { key: keyof NotificationPreferences; label: string; description: string }[] = [
	{ key: "generationComplete", label: "Generation Complete", description: "Notify me when a video or image finishes generating." },
	{ key: "creditAlerts", label: "Credit Alerts", description: "Notify me when my credit balance runs low." },
	{ key: "weeklySummary", label: "Weekly Summary", description: "A recap of your generations and usage each week." },
	{ key: "productUpdates", label: "Product Updates", description: "New features, templates, and announcements." },
];

export function NotificationPrefsSection() {
	const preferences = useSettingsStore((s) => s.notificationPreferences);
	const update = useSettingsStore((s) => s.updateNotificationPreference);

	return (
		<Card className="space-y-5 p-6">
			<h2 className="font-heading text-base font-bold text-[#111827]">Notification Preferences</h2>
			<div className="space-y-4">
				{LABELS.map((item) => (
					<Toggle
						key={item.key}
						label={item.label}
						description={item.description}
						checked={preferences[item.key]}
						onChange={(v) => update(item.key, v)}
					/>
				))}
			</div>
		</Card>
	);
}
