import { useState } from "react";
import { Card, Button, Badge, ConfirmDialog } from "../../../components/ui";
import { useProjectsStore } from "../../projects/projects.store";
import { useVideoGeneratorStore } from "../video-generator.store";
import { formatDuration } from "../../../libs/format";
import { notify } from "../../../libs/notify";
import type { VideoResult } from "../types";

export function ResultCard({ result }: { result: VideoResult }) {
	const project = useProjectsStore((s) => s.projects.find((p) => p.id === result.projectId));
	const toggleFavorite = useProjectsStore((s) => s.toggleFavorite);
	const deleteProject = useProjectsStore((s) => s.deleteProject);
	const duplicateProject = useProjectsStore((s) => s.duplicateProject);
	const regenerate = useVideoGeneratorStore((s) => s.regenerate);
	const dismissResult = useVideoGeneratorStore((s) => s.dismissResult);
	const [confirmDelete, setConfirmDelete] = useState(false);

	if (!project) return null;

	const handleDownload = () => {
		const a = document.createElement("a");
		a.href = result.thumbnail;
		a.download = `${project.title.replace(/\s+/g, "-").toLowerCase()}.svg`;
		a.click();
	};

	const handleShare = async () => {
		try {
			await navigator.clipboard.writeText(`https://vidforge.ai/share/${project.id}`);
			notify.uploadSuccess("Share link copied to clipboard");
		} catch {
			// clipboard permissions unavailable; safe to ignore
		}
	};

	const handleCopyPrompt = async () => {
		try {
			await navigator.clipboard.writeText(project.prompt);
		} catch {
			// clipboard permissions unavailable; safe to ignore
		}
	};

	return (
		<Card className="overflow-hidden p-0">
			<div className="relative aspect-video bg-slate-900">
				<img src={result.thumbnail} alt={project.title} className="h-full w-full object-cover" />
				<div className="absolute bottom-3 right-3 rounded-lg bg-black/60 px-2 py-1 text-[10px] font-bold text-white">
					{formatDuration(result.durationSeconds)}
				</div>
				<div className="absolute left-3 top-3">
					<Badge tone="emerald">Complete</Badge>
				</div>
			</div>
			<div className="p-6">
				<div className="flex items-start justify-between gap-3">
					<div className="min-w-0">
						<h3 className="truncate font-heading text-base font-bold text-[#111827]">{project.title}</h3>
						<p className="mt-0.5 text-xs font-semibold text-[#6B7280]">
							{result.resolution} · {formatDuration(result.durationSeconds)} · {project.creditsUsed} credits
						</p>
					</div>
					<button
						onClick={() => toggleFavorite(project.id)}
						className={`shrink-0 cursor-pointer text-xl ${project.favorite ? "text-amber-400" : "text-slate-300"}`}
					>
						★
					</button>
				</div>

				<div className="mt-5 flex flex-wrap gap-2">
					<Button size="sm" onClick={handleDownload}>
						Download
					</Button>
					<Button variant="secondary" size="sm" onClick={() => void handleShare()}>
						Share
					</Button>
					<Button variant="secondary" size="sm" onClick={regenerate}>
						Regenerate
					</Button>
					<Button variant="secondary" size="sm" onClick={() => duplicateProject(project.id)}>
						Duplicate Project
					</Button>
					<Button variant="secondary" size="sm" onClick={() => void handleCopyPrompt()}>
						Copy Prompt
					</Button>
					<Button variant="danger" size="sm" onClick={() => setConfirmDelete(true)}>
						Delete
					</Button>
				</div>
			</div>

			<ConfirmDialog
				open={confirmDelete}
				title="Delete this project?"
				description="This will permanently remove the generated video from your projects."
				confirmLabel="Delete"
				danger
				onConfirm={() => {
					deleteProject(project.id);
					setConfirmDelete(false);
					dismissResult();
				}}
				onCancel={() => setConfirmDelete(false)}
			/>
		</Card>
	);
}
