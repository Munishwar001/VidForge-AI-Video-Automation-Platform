import { Card, Badge, ProgressBar, Button } from "../../../components/ui";
import { useQueueStore } from "../../queue/queue.store";
import { jobStageMeta } from "../../../libs/status-meta";
import { formatEta } from "../../../libs/format";
import type { JobStage } from "../../../@types/generation";

const STAGES: { key: JobStage; label: string }[] = [
	{ key: "preparing", label: "Preparing" },
	{ key: "generating", label: "Generating" },
	{ key: "rendering", label: "Rendering" },
	{ key: "finalizing", label: "Finalizing" },
	{ key: "completed", label: "Complete" },
];

interface GenerationProgressProps {
	jobId: string;
	onCancel: () => void;
}

export function GenerationProgress({ jobId, onCancel }: GenerationProgressProps) {
	const item = useQueueStore((s) => s.items.find((i) => i.id === jobId));
	if (!item) return null;

	const currentIndex = STAGES.findIndex((s) => s.key === item.stage);
	const meta = jobStageMeta[item.stage];
	const isTerminal = item.stage === "completed" || item.stage === "failed" || item.stage === "cancelled";

	return (
		<Card className="p-6">
			<div className="mb-5 flex items-center justify-between">
				<h3 className="font-heading text-base font-bold text-[#111827]">Generating your video</h3>
				<Badge tone={meta.tone}>{meta.label}</Badge>
			</div>

			<div className="mb-5 flex items-center gap-1">
				{STAGES.map((stage, idx) => (
					<div key={stage.key} className="flex flex-1 flex-col items-center gap-1.5">
						<div
							className={`h-2 w-full rounded-full ${
								idx <= currentIndex || item.stage === "completed" ? "bg-gradient-to-r from-[#6D5DF6] to-[#3B82F6]" : "bg-slate-200"
							}`}
						/>
						<span className={`text-[9px] font-bold uppercase tracking-wide ${idx <= currentIndex ? "text-[#6D5DF6]" : "text-slate-400"}`}>
							{stage.label}
						</span>
					</div>
				))}
			</div>

			<ProgressBar value={item.progress} tone={item.stage === "failed" ? "red" : "gradient"} />
			<div className="mt-2 flex items-center justify-between text-xs font-semibold text-[#6B7280]">
				<span>{item.progress}% complete</span>
				{item.etaSeconds !== null && !isTerminal && <span>{formatEta(item.etaSeconds)} remaining</span>}
			</div>

			{!isTerminal && (
				<div className="mt-5 flex justify-end">
					<Button variant="secondary" size="sm" onClick={onCancel}>
						Cancel Generation
					</Button>
				</div>
			)}

			{item.stage === "failed" && <p className="mt-4 text-xs font-semibold text-red-500">{item.error ?? "Something went wrong."}</p>}
		</Card>
	);
}
