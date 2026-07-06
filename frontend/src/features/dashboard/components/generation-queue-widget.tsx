import { useMemo } from "react";
import { Card, Badge, ProgressBar, Button } from "../../../components/ui";
import { useQueueStore } from "../../queue/queue.store";
import { jobStageMeta } from "../../../libs/status-meta";
import { ACTIVE_JOB_STAGES } from "../../../@types/generation";

export function GenerationQueueWidget() {
	const allItems = useQueueStore((s) => s.items);
	const openDrawer = useQueueStore((s) => s.openDrawer);
	const items = useMemo(
		() => allItems.filter((i) => ACTIVE_JOB_STAGES.includes(i.stage)).slice(0, 4),
		[allItems],
	);

	return (
		<Card className="p-6">
			<div className="mb-4 flex items-center justify-between">
				<h2 className="font-heading text-base font-bold text-[#111827]">Generation Queue</h2>
				<Button variant="ghost" size="sm" onClick={openDrawer}>
					View all
				</Button>
			</div>
			{items.length === 0 ? (
				<p className="text-sm text-[#6B7280]">Nothing generating right now.</p>
			) : (
				<div className="space-y-4">
					{items.map((item) => {
						const meta = jobStageMeta[item.stage];
						return (
							<div key={item.id}>
								<div className="mb-1.5 flex items-center justify-between text-xs">
									<span className="font-bold text-[#111827]">{item.title}</span>
									<Badge tone={meta.tone}>{meta.label}</Badge>
								</div>
								<ProgressBar value={item.progress} />
							</div>
						);
					})}
				</div>
			)}
		</Card>
	);
}
