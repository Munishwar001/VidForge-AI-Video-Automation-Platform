import { useState } from "react";
import { useAccountStore } from "../../store/account-store";
import { useActivityStore } from "../../store/activity-store";
import { useQueueStore } from "../../features/queue/queue.store";
import { ACTIVE_JOB_STAGES } from "../../@types/generation";
import { formatRelativeTime } from "../../libs/format";
import { useClickOutside } from "../../libs/use-click-outside";

interface TopbarProps {
	title: string;
	description?: string;
}

export function Topbar({ title, description }: TopbarProps) {
	const credits = useAccountStore((s) => s.creditsRemaining);
	const activity = useActivityStore((s) => s.items);
	const openQueueDrawer = useQueueStore((s) => s.openDrawer);
	const activeJobs = useQueueStore((s) => s.items.filter((i) => ACTIVE_JOB_STAGES.includes(i.stage)).length);
	const [notifOpen, setNotifOpen] = useState(false);
	const notifRef = useClickOutside<HTMLDivElement>(() => setNotifOpen(false), notifOpen);

	return (
		<header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-slate-200/70 bg-white/80 px-8 py-5 backdrop-blur-md">
			<div>
				<h1 className="font-heading text-xl font-extrabold text-[#111827]">{title}</h1>
				{description && <p className="text-xs font-medium text-[#6B7280]">{description}</p>}
			</div>

			<div className="flex items-center gap-3">
				<div className="hidden items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-3.5 py-1.5 text-xs font-bold text-[#6D5DF6] sm:flex">
					<span>✦</span> {credits} credits
				</div>

				<button
					onClick={openQueueDrawer}
					className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-[#6B7280] hover:bg-slate-50 hover:text-[#111827]"
				>
					<QueueIcon />
					{activeJobs > 0 && (
						<span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#6D5DF6] px-1 text-[9px] font-bold text-white">
							{activeJobs}
						</span>
					)}
				</button>

				<div className="relative" ref={notifRef}>
					<button
						onClick={() => setNotifOpen((v) => !v)}
						className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-[#6B7280] hover:bg-slate-50 hover:text-[#111827]"
					>
						<BellIcon />
					</button>
					{notifOpen && (
						<div className="absolute right-0 top-12 z-20 max-h-96 w-80 overflow-y-auto rounded-2xl border border-slate-200 bg-white py-2 shadow-premium-lg">
							<p className="px-4 py-2 text-[10px] font-black uppercase tracking-wide text-slate-400">Recent Activity</p>
							{activity.slice(0, 8).map((entry) => (
								<div key={entry.id} className="px-4 py-2 text-xs">
									<p className="font-semibold text-[#111827]">{entry.message}</p>
									<p className="mt-0.5 text-[10px] text-[#6B7280]">{formatRelativeTime(entry.createdAt)}</p>
								</div>
							))}
							{activity.length === 0 && <p className="px-4 py-3 text-xs text-[#6B7280]">No recent activity.</p>}
						</div>
					)}
				</div>
			</div>
		</header>
	);
}

function BellIcon() {
	return (
		<svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
			/>
		</svg>
	);
}

function QueueIcon() {
	return (
		<svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h7" />
			<circle cx="19" cy="17" r="2.5" strokeWidth={2} />
		</svg>
	);
}
