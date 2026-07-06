import { useEffect } from "react";
import type { ReactNode } from "react";
import Sidebar from "../sidebar/sidebar";
import { Topbar } from "./topbar";
import { QueueDrawer } from "../../features/queue/queue-drawer";
import { useQueueStore } from "../../features/queue/queue.store";
import { useAccountStore } from "../../store/account-store";
import { useActivityStore } from "../../store/activity-store";

interface DashboardLayoutProps {
	title: string;
	description?: string;
	children: ReactNode;
}

export function DashboardLayout({ title, description, children }: DashboardLayoutProps) {
	useEffect(() => {
		void useAccountStore.getState().fetchStats();
		void useActivityStore.getState().fetchActivity();
		useQueueStore.getState().startPolling();
		return () => useQueueStore.getState().stopPolling();
	}, []);

	return (
		<div className="flex min-h-svh bg-[#FAFBFF]">
			<Sidebar />
			<div className="flex min-w-0 flex-1 flex-col">
				<Topbar title={title} description={description} />
				<main className="flex-1 px-8 py-8">{children}</main>
			</div>
			<QueueDrawer />
		</div>
	);
}
