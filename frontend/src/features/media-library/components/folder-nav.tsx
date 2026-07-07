import type { MediaFolder } from "../../../@types/media";

interface FolderNavProps {
	folders: MediaFolder[];
	activeFolderId: string | "all";
	onSelect: (id: string | "all") => void;
	counts: Record<string, number>;
}

export function FolderNav({ folders, activeFolderId, onSelect, counts }: FolderNavProps) {
	return (
		<div className="flex flex-wrap gap-2">
			<button
				onClick={() => onSelect("all")}
				className={`cursor-pointer rounded-xl border px-3.5 py-2 text-xs font-bold transition-all ${
					activeFolderId === "all"
						? "border-transparent bg-gradient-to-r from-[#6D5DF6] to-[#3B82F6] text-white shadow-premium-sm"
						: "border-slate-200 bg-white text-[#6B7280] hover:border-[#6D5DF6]/40"
				}`}
			>
				All Media ({counts.all ?? 0})
			</button>
			{folders.map((folder) => (
				<button
					key={folder.id}
					onClick={() => onSelect(folder.id)}
					className={`cursor-pointer rounded-xl border px-3.5 py-2 text-xs font-bold transition-all ${
						activeFolderId === folder.id
							? "border-transparent bg-gradient-to-r from-[#6D5DF6] to-[#3B82F6] text-white shadow-premium-sm"
							: "border-slate-200 bg-white text-[#6B7280] hover:border-[#6D5DF6]/40"
					}`}
				>
					📁 {folder.name} ({counts[folder.id] ?? 0})
				</button>
			))}
		</div>
	);
}
