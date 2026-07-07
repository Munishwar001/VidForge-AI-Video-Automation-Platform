import { useEffect } from "react";
import { DashboardLayout } from "../../components/layout/dashboard-layout";
import { useAppStore } from "../../store";
import { useProjectsStore } from "../projects/projects.store";
import { StatCardsGrid } from "./components/stat-cards-grid";
import { RecentProjects } from "./components/recent-projects";
import { GenerationQueueWidget } from "./components/generation-queue-widget";
import { RecentActivity } from "./components/recent-activity";
import { QuickActions } from "./components/quick-actions";

export function DashboardPage() {
	const user = useAppStore((s) => s.user);
	const fetchProjects = useProjectsStore((s) => s.fetchProjects);

	useEffect(() => {
		void fetchProjects();
	}, [fetchProjects]);

	return (
		<DashboardLayout title="Dashboard" description={`Welcome back, ${user?.name ?? "Creator"}`}>
			<div className="space-y-6">
				<StatCardsGrid />
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
					<div className="space-y-6 lg:col-span-2">
						<RecentProjects />
						<GenerationQueueWidget />
					</div>
					<div className="space-y-6">
						<QuickActions />
						<RecentActivity />
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}
