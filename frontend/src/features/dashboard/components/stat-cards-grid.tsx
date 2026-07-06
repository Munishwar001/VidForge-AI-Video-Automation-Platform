import { StatCard } from "../../../components/ui";
import { useAccountStore } from "../../../store/account-store";
import { useQueueStore } from "../../queue/queue.store";
import { ACTIVE_JOB_STAGES } from "../../../@types/generation";
import { formatBytes } from "../../../libs/format";

export function StatCardsGrid() {
	const totalVideosGenerated = useAccountStore((s) => s.totalVideosGenerated);
	const totalImagesGenerated = useAccountStore((s) => s.totalImagesGenerated);
	const creditsRemaining = useAccountStore((s) => s.creditsRemaining);
	const creditsTotal = useAccountStore((s) => s.creditsTotal);
	const storageUsedBytes = useAccountStore((s) => s.storageUsedBytes);
	const storageLimitBytes = useAccountStore((s) => s.storageLimitBytes);
	const activeJobs = useQueueStore((s) => s.items.filter((i) => ACTIVE_JOB_STAGES.includes(i.stage)).length);
	const storagePercent = Math.round((storageUsedBytes / storageLimitBytes) * 100);

	return (
		<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
			<StatCard label="Total Videos Generated" value={String(totalVideosGenerated)} icon="🎬" accent="from-purple-500 to-indigo-500" />
			<StatCard label="Total Images Generated" value={String(totalImagesGenerated)} icon="🖼️" accent="from-blue-500 to-cyan-500" />
			<StatCard
				label="Credits Remaining"
				value={String(creditsRemaining)}
				icon="✦"
				accent="from-purple-500 to-pink-500"
				sublabel={`of ${creditsTotal} total`}
			/>
			<StatCard label="Active Jobs" value={String(activeJobs)} icon="⚡" accent="from-amber-500 to-orange-500" />
			<StatCard
				label="Storage Used"
				value={formatBytes(storageUsedBytes)}
				icon="☁️"
				accent="from-emerald-500 to-teal-500"
				sublabel={`${storagePercent}% of ${formatBytes(storageLimitBytes)}`}
			/>
		</div>
	);
}
