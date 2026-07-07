import { useState } from "react";
import { Badge, ConfirmDialog, DropdownMenu, Modal, Button } from "../../../components/ui";
import { useProjectsStore } from "../projects.store";
import { projectStatusMeta } from "../../../libs/status-meta";
import { formatDate, formatDuration } from "../../../libs/format";
import type { Project } from "../../../@types/project";

export function ProjectCard({ project }: { project: Project }) {
	const toggleFavorite = useProjectsStore((s) => s.toggleFavorite);
	const renameProject = useProjectsStore((s) => s.renameProject);
	const duplicateProject = useProjectsStore((s) => s.duplicateProject);
	const deleteProject = useProjectsStore((s) => s.deleteProject);
	const [renaming, setRenaming] = useState(false);
	const [renameValue, setRenameValue] = useState(project.title);
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [preview, setPreview] = useState(false);

	const meta = projectStatusMeta[project.status];

	const handleDownload = () => {
		const a = document.createElement("a");
		a.href = project.thumbnail;
		a.download = `${project.title.replace(/\s+/g, "-").toLowerCase()}.svg`;
		a.click();
	};

	return (
		<div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-premium-sm transition-all hover:border-[#6D5DF6]/30 hover:shadow-premium-md">
			<button className="relative block aspect-video w-full cursor-pointer bg-slate-900" onClick={() => setPreview(true)}>
				<img src={project.thumbnail} alt={project.title} className="h-full w-full object-cover" />
				<div className="absolute left-2 top-2 flex gap-1.5">
					<Badge tone={meta.tone}>{meta.label}</Badge>
					<Badge tone="slate">{project.type === "video" ? "🎬 Video" : "🖼️ Image"}</Badge>
				</div>
				{project.duration && (
					<div className="absolute bottom-2 right-2 rounded-lg bg-black/60 px-2 py-1 text-[10px] font-bold text-white">
						{formatDuration(project.duration)}
					</div>
				)}
			</button>
			<div className="p-4">
				<div className="flex items-start justify-between gap-2">
					<div className="min-w-0">
						<p className="truncate text-sm font-bold text-[#111827]">{project.title}</p>
						<p className="mt-0.5 text-[10px] font-semibold text-[#6B7280]">
							{formatDate(project.createdAt)} · {project.creditsUsed} credits
						</p>
					</div>
					<div className="flex shrink-0 items-center gap-1">
						<button
							onClick={() => toggleFavorite(project.id)}
							className={`cursor-pointer text-lg ${project.favorite ? "text-amber-400" : "text-slate-300"}`}
						>
							★
						</button>
						<DropdownMenu
							items={[
								{ label: "Open", onClick: () => setPreview(true) },
								{
									label: "Rename",
									onClick: () => {
										setRenameValue(project.title);
										setRenaming(true);
									},
								},
								{ label: "Duplicate", onClick: () => duplicateProject(project.id) },
								{ label: "Download", onClick: handleDownload },
								{ label: "Delete", onClick: () => setConfirmDelete(true), danger: true },
							]}
						/>
					</div>
				</div>
			</div>

			<Modal open={preview} onClose={() => setPreview(false)} title={project.title} maxWidth="max-w-lg">
				<img src={project.thumbnail} alt={project.title} className="mb-4 aspect-video w-full rounded-2xl object-cover" />
				<p className="text-sm text-[#6B7280]">{project.prompt}</p>
			</Modal>

			<Modal
				open={renaming}
				onClose={() => setRenaming(false)}
				title="Rename project"
				footer={
					<>
						<Button variant="secondary" size="sm" onClick={() => setRenaming(false)}>
							Cancel
						</Button>
						<Button
							size="sm"
							onClick={() => {
								renameProject(project.id, renameValue.trim() || project.title);
								setRenaming(false);
							}}
						>
							Save
						</Button>
					</>
				}
			>
				<input
					value={renameValue}
					onChange={(e) => setRenameValue(e.target.value)}
					className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#6D5DF6]"
					autoFocus
				/>
			</Modal>

			<ConfirmDialog
				open={confirmDelete}
				title="Delete this project?"
				description="This will permanently remove the project and its generated media."
				confirmLabel="Delete"
				danger
				onConfirm={() => {
					deleteProject(project.id);
					setConfirmDelete(false);
				}}
				onCancel={() => setConfirmDelete(false)}
			/>
		</div>
	);
}
