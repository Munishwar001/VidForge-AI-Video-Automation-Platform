import { Card } from "../../../components/ui";
import { useActivityStore } from "../../../store/activity-store";
import { formatRelativeTime } from "../../../libs/format";

const ACTIVITY_ICON: Record<string, string> = {
	generated: "✨",
	uploaded: "☁️",
	deleted: "🗑️",
	favorited: "⭐",
	failed: "⚠️",
};

export function RecentActivity() {
	const items = useActivityStore((s) => s.items).slice(0, 6);

	return (
		<Card className="p-6">
			<h2 className="mb-4 font-heading text-base font-bold text-[#111827]">Recent Activity</h2>
			<div className="space-y-4">
				{items.map((item) => (
					<div key={item.id} className="flex items-start gap-3">
						<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-sm">
							{ACTIVITY_ICON[item.type] ?? "•"}
						</span>
						<div className="min-w-0">
							<p className="text-xs font-semibold text-[#111827]">{item.message}</p>
							<p className="text-[10px] text-[#6B7280]">{formatRelativeTime(item.createdAt)}</p>
						</div>
					</div>
				))}
				{items.length === 0 && <p className="text-sm text-[#6B7280]">No recent activity.</p>}
			</div>
		</Card>
	);
}
