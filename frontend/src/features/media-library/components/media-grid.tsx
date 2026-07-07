import { DropdownMenu } from "../../../components/ui";
import { formatBytes, formatRelativeTime } from "../../../libs/format";
import type { MediaItem } from "../../../@types/media";

const TYPE_ICON: Record<string, string> = { image: "🖼️", video: "🎬", audio: "🎵" };

interface MediaGridProps {
	items: MediaItem[];
	selectedIds: string[];
	onToggleSelect: (id: string) => void;
	onPreview: (item: MediaItem) => void;
	onRename: (item: MediaItem) => void;
	onDelete: (id: string) => void;
	onDownload: (item: MediaItem) => void;
}

export function MediaGrid({ items, selectedIds, onToggleSelect, onPreview, onRename, onDelete, onDownload }: MediaGridProps) {
	return (
		<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
			{items.map((item) => {
				const selected = selectedIds.includes(item.id);
				return (
					<div
						key={item.id}
						className={`group relative overflow-hidden rounded-2xl border bg-white shadow-premium-sm transition-all ${
							selected ? "border-[#6D5DF6]" : "border-slate-200/80 hover:border-[#6D5DF6]/30"
						}`}
					>
						<input
							type="checkbox"
							checked={selected}
							onChange={() => onToggleSelect(item.id)}
							className="absolute left-2 top-2 z-10 h-4 w-4 cursor-pointer accent-[#6D5DF6]"
						/>
						<button className="relative block aspect-square w-full cursor-pointer bg-slate-100" onClick={() => onPreview(item)}>
							<img src={item.thumbnail} alt={item.name} className="h-full w-full object-cover" />
							<span className="absolute bottom-2 left-2 flex h-6 w-6 items-center justify-center rounded-lg bg-black/60 text-xs">
								{TYPE_ICON[item.type]}
							</span>
						</button>
						<div className="p-3">
							<div className="flex items-start justify-between gap-2">
								<div className="min-w-0">
									<p className="truncate text-xs font-bold text-[#111827]">{item.name}</p>
									<p className="mt-0.5 text-[10px] font-semibold text-[#6B7280]">
										{formatBytes(item.sizeBytes)} · {formatRelativeTime(item.createdAt)}
									</p>
								</div>
								<DropdownMenu
									items={[
										{ label: "Preview", onClick: () => onPreview(item) },
										{ label: "Rename", onClick: () => onRename(item) },
										{ label: "Download", onClick: () => onDownload(item) },
										{ label: "Delete", onClick: () => onDelete(item.id), danger: true },
									]}
								/>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
