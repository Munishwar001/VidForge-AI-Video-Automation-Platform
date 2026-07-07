import { useState } from "react";
import { Badge, Button, ConfirmDialog, Skeleton } from "../../../components/ui";
import { useProjectsStore } from "../../projects/projects.store";
import { useImageGeneratorStore } from "../image-generator.store";
import type { GeneratedImage } from "../types";

export function ImageCard({ image }: { image: GeneratedImage }) {
	const project = useProjectsStore((s) => s.projects.find((p) => p.id === image.projectId));
	const toggleFavorite = useProjectsStore((s) => s.toggleFavorite);
	const removeImage = useImageGeneratorStore((s) => s.removeImage);
	const regenerateImage = useImageGeneratorStore((s) => s.regenerateImage);
	const upscaleImage = useImageGeneratorStore((s) => s.upscaleImage);
	const loadPrompt = useImageGeneratorStore((s) => s.loadPrompt);
	const [confirmDelete, setConfirmDelete] = useState(false);

	const handleDownload = () => {
		const a = document.createElement("a");
		a.href = image.url;
		a.download = `vidforge-image-${image.id}.svg`;
		a.click();
	};

	const handleCopyPrompt = async () => {
		try {
			await navigator.clipboard.writeText(image.prompt);
		} catch {
			// clipboard permissions unavailable; safe to ignore
		}
	};

	const isProcessing = image.status === "processing";

	return (
		<div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-premium-sm">
			<div className="relative aspect-square bg-slate-100">
				{isProcessing ? (
					<Skeleton className="h-full w-full rounded-none" />
				) : (
					<img src={image.url} alt={image.prompt} className="h-full w-full object-cover" />
				)}
				<div className="absolute left-2 top-2">
					<Badge tone="purple">{image.style}</Badge>
				</div>
				<button
					onClick={() => project && toggleFavorite(project.id)}
					className={`absolute right-2 top-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white/90 text-sm shadow ${
						project?.favorite ? "text-amber-400" : "text-slate-400"
					}`}
				>
					★
				</button>
			</div>
			<div className="flex flex-wrap gap-1.5 p-3">
				<Button size="sm" variant="secondary" onClick={handleDownload}>
					Download
				</Button>
				<Button size="sm" variant="secondary" loading={isProcessing} onClick={() => void regenerateImage(image.id)}>
					Regenerate
				</Button>
				<Button size="sm" variant="secondary" loading={isProcessing} onClick={() => void upscaleImage(image.id)}>
					Upscale
				</Button>
				<Button size="sm" variant="ghost" onClick={() => void handleCopyPrompt()}>
					Copy Prompt
				</Button>
				<Button size="sm" variant="ghost" onClick={() => loadPrompt(image.prompt)}>
					Edit
				</Button>
				<Button size="sm" variant="danger" onClick={() => setConfirmDelete(true)}>
					Delete
				</Button>
			</div>

			<ConfirmDialog
				open={confirmDelete}
				title="Delete this image?"
				description="This will permanently remove the generated image from your projects."
				confirmLabel="Delete"
				danger
				onConfirm={() => {
					removeImage(image.id);
					setConfirmDelete(false);
				}}
				onCancel={() => setConfirmDelete(false)}
			/>
		</div>
	);
}
