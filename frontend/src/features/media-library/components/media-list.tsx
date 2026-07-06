import { DropdownMenu } from "../../../components/ui";
import { formatBytes, formatRelativeTime } from "../../../libs/format";
import type { MediaItem } from "../../../@types/media";

const TYPE_ICON: Record<string, string> = { image: "🖼️", video: "🎬", audio: "🎵" };

interface MediaListProps {
	items: MediaItem[];
	selectedIds: string[];
	onToggleSelect: (id: string) => void;
	onPreview: (item: MediaItem) => void;
	onRename: (item: MediaItem) => void;
	onDelete: (id: string) => void;
	onDownload: (item: MediaItem) => void;
}

export function MediaList({ items, selectedIds, onToggleSelect, onPreview, onRename, onDelete, onDownload }: MediaListProps) {
	return (
		<div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-premium-sm">
			{items.map((item, idx) => {
				const selected = selectedIds.includes(item.id);
				return (
					<div
						key={item.id}
						className={`flex items-center gap-3 px-4 py-3 ${idx !== items.length - 1 ? "border-b border-slate-100" : ""} ${
							selected ? "bg-purple-50/40" : ""
						}`}
					>
						<input
							type="checkbox"
							checked={selected}
							onChange={() => onToggleSelect(item.id)}
							className="h-4 w-4 cursor-pointer accent-[#6D5DF6]"
						/>
						<button
							onClick={() => onPreview(item)}
							className="flex h-10 w-14 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-slate-100"
						>
							<img src={item.thumbnail} alt={item.name} className="h-full w-full object-cover" />
						</button>
						<span className="text-sm">{TYPE_ICON[item.type]}</span>
						<div className="min-w-0 flex-1">
							<p className="truncate text-sm font-bold text-[#111827]">{item.name}</p>
							<p className="text-[10px] font-semibold text-[#6B7280]">
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
				);
			})}
		</div>
	);
}
