import { useEffect, useMemo, useState } from "react";
import { DashboardLayout } from "../../components/layout/dashboard-layout";
import { Button, EmptyState, Modal, ConfirmDialog } from "../../components/ui";
import { useMediaLibraryStore } from "./media-library.store";
import { UploadDropzone } from "./components/upload-dropzone";
import { FolderNav } from "./components/folder-nav";
import { MediaGrid } from "./components/media-grid";
import { MediaList } from "./components/media-list";
import { PreviewModal } from "./components/preview-modal";
import type { MediaItem } from "../../@types/media";

export function MediaLibraryPage() {
	const items = useMediaLibraryStore((s) => s.items);
	const folders = useMediaLibraryStore((s) => s.folders);
	const selectedIds = useMediaLibraryStore((s) => s.selectedIds);
	const fetchMedia = useMediaLibraryStore((s) => s.fetchMedia);
	const uploadFile = useMediaLibraryStore((s) => s.uploadFile);
	const renameItem = useMediaLibraryStore((s) => s.renameItem);
	const deleteItem = useMediaLibraryStore((s) => s.deleteItem);
	const bulkDelete = useMediaLibraryStore((s) => s.bulkDelete);
	const toggleSelect = useMediaLibraryStore((s) => s.toggleSelect);
	const clearSelection = useMediaLibraryStore((s) => s.clearSelection);
	const selectAll = useMediaLibraryStore((s) => s.selectAll);

	useEffect(() => {
		void fetchMedia();
	}, [fetchMedia]);

	const [view, setView] = useState<"grid" | "list">("grid");
	const [search, setSearch] = useState("");
	const [activeFolder, setActiveFolder] = useState<string | "all">("all");
	const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
	const [renamingItem, setRenamingItem] = useState<MediaItem | null>(null);
	const [renameValue, setRenameValue] = useState("");
	const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
	const [confirmBulkDelete, setConfirmBulkDelete] = useState(false);

	const filtered = useMemo(() => {
		const query = search.toLowerCase();
		return items.filter((i) => (activeFolder === "all" ? true : i.folderId === activeFolder)).filter((i) => i.name.toLowerCase().includes(query));
	}, [items, activeFolder, search]);

	const counts = useMemo(() => {
		const map: Record<string, number> = { all: items.length };
		folders.forEach((f) => {
			map[f.id] = items.filter((i) => i.folderId === f.id).length;
		});
		return map;
	}, [items, folders]);

	const handleDownload = (item: MediaItem) => {
		const a = document.createElement("a");
		a.href = item.url;
		a.download = item.name;
		a.click();
	};

	return (
		<DashboardLayout title="Media Library" description="All your uploaded and generated media assets.">
			<div className="space-y-6">
				<UploadDropzone onFiles={(files) => files.forEach((file) => uploadFile(file, activeFolder === "all" ? null : activeFolder))} />

				<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
					<FolderNav folders={folders} activeFolderId={activeFolder} onSelect={setActiveFolder} counts={counts} />
					<div className="flex items-center gap-3">
						<input
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search media..."
							className="w-full max-w-xs rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[#6D5DF6]"
						/>
						{filtered.length > 0 && (
							<Button variant="ghost" size="sm" onClick={() => selectAll(filtered.map((i) => i.id))}>
								Select All
							</Button>
						)}
						<div className="flex rounded-xl border border-slate-200 bg-white p-1">
							<button
								onClick={() => setView("grid")}
								className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold ${view === "grid" ? "bg-purple-50 text-[#6D5DF6]" : "text-[#6B7280]"}`}
							>
								Grid
							</button>
							<button
								onClick={() => setView("list")}
								className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold ${view === "list" ? "bg-purple-50 text-[#6D5DF6]" : "text-[#6B7280]"}`}
							>
								List
							</button>
						</div>
					</div>
				</div>

				{selectedIds.length > 0 && (
					<div className="flex items-center justify-between rounded-2xl border border-purple-200 bg-purple-50 px-4 py-3">
						<span className="text-xs font-bold text-[#6D5DF6]">{selectedIds.length} selected</span>
						<div className="flex items-center gap-2">
							<Button variant="ghost" size="sm" onClick={clearSelection}>
								Clear
							</Button>
							<Button variant="danger" size="sm" onClick={() => setConfirmBulkDelete(true)}>
								Delete Selected
							</Button>
						</div>
					</div>
				)}

				{filtered.length === 0 ? (
					<EmptyState icon="☁️" title="No media found" description="Upload files or adjust your search and folder filters." />
				) : view === "grid" ? (
					<MediaGrid
						items={filtered}
						selectedIds={selectedIds}
						onToggleSelect={toggleSelect}
						onPreview={setPreviewItem}
						onRename={(item) => {
							setRenamingItem(item);
							setRenameValue(item.name);
						}}
						onDelete={setConfirmDeleteId}
						onDownload={handleDownload}
					/>
				) : (
					<MediaList
						items={filtered}
						selectedIds={selectedIds}
						onToggleSelect={toggleSelect}
						onPreview={setPreviewItem}
						onRename={(item) => {
							setRenamingItem(item);
							setRenameValue(item.name);
						}}
						onDelete={setConfirmDeleteId}
						onDownload={handleDownload}
					/>
				)}
			</div>

			<PreviewModal item={previewItem} onClose={() => setPreviewItem(null)} />

			<Modal
				open={!!renamingItem}
				onClose={() => setRenamingItem(null)}
				title="Rename file"
				footer={
					<>
						<Button variant="secondary" size="sm" onClick={() => setRenamingItem(null)}>
							Cancel
						</Button>
						<Button
							size="sm"
							onClick={() => {
								if (renamingItem) renameItem(renamingItem.id, renameValue.trim() || renamingItem.name);
								setRenamingItem(null);
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
				open={!!confirmDeleteId}
				title="Delete this file?"
				description="This will permanently remove the file from your media library."
				confirmLabel="Delete"
				danger
				onConfirm={() => {
					if (confirmDeleteId) deleteItem(confirmDeleteId);
					setConfirmDeleteId(null);
				}}
				onCancel={() => setConfirmDeleteId(null)}
			/>

			<ConfirmDialog
				open={confirmBulkDelete}
				title={`Delete ${selectedIds.length} files?`}
				description="This will permanently remove all selected files from your media library."
				confirmLabel="Delete All"
				danger
				onConfirm={() => {
					bulkDelete(selectedIds);
					setConfirmBulkDelete(false);
				}}
				onCancel={() => setConfirmBulkDelete(false)}
			/>
		</DashboardLayout>
	);
}
