import { useEffect, useMemo, useState } from "react";
import { DashboardLayout } from "../../components/layout/dashboard-layout";
import { EmptyState } from "../../components/ui";
import { useProjectsStore } from "./projects.store";
import { ProjectCard } from "./components/project-card";
import { ProjectsToolbar } from "./components/projects-toolbar";
import type { FilterOption, SortOption } from "./components/projects-toolbar";

export function ProjectsPage() {
	const projects = useProjectsStore((s) => s.projects);
	const fetchProjects = useProjectsStore((s) => s.fetchProjects);
	const [search, setSearch] = useState("");
	const [filter, setFilter] = useState<FilterOption>("all");
	const [sort, setSort] = useState<SortOption>("newest");

	useEffect(() => {
		void fetchProjects();
	}, [fetchProjects]);

	const filtered = useMemo(() => {
		const query = search.toLowerCase();
		let result = projects.filter(
			(p) => p.title.toLowerCase().includes(query) || p.prompt.toLowerCase().includes(query)
		);

		if (filter === "videos") result = result.filter((p) => p.type === "video");
		else if (filter === "images") result = result.filter((p) => p.type === "image");
		else if (filter === "completed") result = result.filter((p) => p.status === "completed");
		else if (filter === "failed") result = result.filter((p) => p.status === "failed");

		result = [...result].sort((a, b) => {
			if (sort === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
			if (sort === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
			return Number(b.favorite) - Number(a.favorite);
		});

		return result;
	}, [projects, search, filter, sort]);

	return (
		<DashboardLayout title="Projects" description="All your generated videos and images in one place.">
			<div className="space-y-6">
				<ProjectsToolbar
					search={search}
					onSearchChange={setSearch}
					filter={filter}
					onFilterChange={setFilter}
					sort={sort}
					onSortChange={setSort}
				/>

				{filtered.length === 0 ? (
					<EmptyState icon="📁" title="No projects found" description="Try adjusting your search or filters, or generate something new." />
				) : (
					<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{filtered.map((project) => (
							<ProjectCard key={project.id} project={project} />
						))}
					</div>
				)}
			</div>
		</DashboardLayout>
	);
}
