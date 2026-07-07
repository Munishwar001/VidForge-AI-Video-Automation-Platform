import { Link } from "react-router";
import { Card, Badge, EmptyState } from "../../../components/ui";
import { useProjectsStore } from "../../projects/projects.store";
import { projectStatusMeta } from "../../../libs/status-meta";
import { formatRelativeTime } from "../../../libs/format";

export function RecentProjects() {
	const projects = useProjectsStore((s) => s.projects).slice(0, 5);
	const toggleFavorite = useProjectsStore((s) => s.toggleFavorite);

	return (
		<Card className="p-6">
			<div className="mb-4 flex items-center justify-between">
				<h2 className="font-heading text-base font-bold text-[#111827]">Recent Projects</h2>
				<Link to="/projects" className="text-xs font-bold text-[#6D5DF6] hover:underline">
					View all
				</Link>
			</div>
			{projects.length === 0 ? (
				<EmptyState icon="📁" title="No projects yet" description="Generate a video or image to see it appear here." />
			) : (
				<div className="space-y-3">
					{projects.map((project) => {
						const meta = projectStatusMeta[project.status];
						return (
							<div
								key={project.id}
								className="flex items-center gap-3 rounded-2xl border border-slate-200/70 p-3 transition-colors hover:border-[#6D5DF6]/30"
							>
								<img src={project.thumbnail} alt={project.title} className="h-12 w-16 shrink-0 rounded-xl object-cover" />
								<div className="min-w-0 flex-1">
									<p className="truncate text-sm font-bold text-[#111827]">{project.title}</p>
									<p className="text-[10px] font-semibold text-[#6B7280]">
										{formatRelativeTime(project.createdAt)} · {project.type === "video" ? "Video" : "Image"}
									</p>
								</div>
								<Badge tone={meta.tone}>{meta.label}</Badge>
								<button
									onClick={() => toggleFavorite(project.id)}
									className={`cursor-pointer text-lg ${project.favorite ? "text-amber-400" : "text-slate-300"}`}
								>
									★
								</button>
							</div>
						);
					})}
				</div>
			)}
		</Card>
	);
}
