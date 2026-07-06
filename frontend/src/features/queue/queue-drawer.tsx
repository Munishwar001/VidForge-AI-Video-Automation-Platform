import { Drawer, Badge, ProgressBar, Button, EmptyState } from "../../components/ui";
import { jobStageMeta } from "../../libs/status-meta";
import { formatEta, formatRelativeTime } from "../../libs/format";
import { ACTIVE_JOB_STAGES } from "../../@types/generation";
import { useQueueStore } from "./queue.store";

const TYPE_ICON: Record<string, string> = { video: "🎬", image: "🖼️" };

export function QueueDrawer() {
	const isOpen = useQueueStore((state) => state.isDrawerOpen);
	const closeDrawer = useQueueStore((state) => state.closeDrawer);
	const items = useQueueStore((state) => state.items);
	const cancel = useQueueStore((state) => state.cancel);
	const retry = useQueueStore((state) => state.retry);

	return (
		<Drawer open={isOpen} onClose={closeDrawer} title="Generation Queue">
			{items.length === 0 ? (
				<EmptyState icon="🗂️" title="No jobs yet" description="Generated videos and images will appear here while they process." />
			) : (
				<div className="space-y-4">
					{items.map((item) => {
						const meta = jobStageMeta[item.stage];
						const isActive = ACTIVE_JOB_STAGES.includes(item.stage);
						return (
							<div key={item.id} className="rounded-2xl border border-slate-200/80 p-4">
								<div className="flex items-start justify-between gap-3">
									<div className="flex items-center gap-2.5">
										<span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 text-sm">
											{TYPE_ICON[item.type]}
										</span>
										<div>
											<p className="text-sm font-bold text-[#111827]">{item.title}</p>
											<p className="text-[10px] font-semibold text-[#6B7280]">{formatRelativeTime(item.createdAt)}</p>
										</div>
									</div>
									<Badge tone={meta.tone}>{meta.label}</Badge>
								</div>

								<div className="mt-3">
									<ProgressBar value={item.progress} tone={item.stage === "failed" ? "red" : "gradient"} />
									<div className="mt-1.5 flex items-center justify-between text-[10px] font-semibold text-[#6B7280]">
										<span>{item.progress}%</span>
										<span>
											{isActive && item.etaSeconds !== null
												? `${formatEta(item.etaSeconds)} remaining`
												: `${item.credits} credits`}
										</span>
									</div>
								</div>

								{item.error && <p className="mt-2 text-[11px] font-semibold text-red-500">{item.error}</p>}

								{(isActive || item.stage === "failed") && (
									<div className="mt-3 flex justify-end gap-2">
										{isActive && (
											<Button variant="secondary" size="sm" onClick={() => cancel(item.id)}>
												Cancel
											</Button>
										)}
										{item.stage === "failed" && (
											<Button variant="primary" size="sm" onClick={() => retry(item.id)}>
												Retry
											</Button>
										)}
									</div>
								)}
							</div>
						);
					})}
				</div>
			)}
		</Drawer>
	);
}
