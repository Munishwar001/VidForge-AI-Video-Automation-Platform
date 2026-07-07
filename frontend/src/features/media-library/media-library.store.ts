import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { MediaFolder, MediaItem } from "../../@types/media";
import { mainClient } from "../../store";
import { useAccountStore } from "../../store/account-store";
import { notify } from "../../libs/notify";

interface MediaLibraryState {
	items: MediaItem[];
	folders: MediaFolder[];
	selectedIds: string[];
	isLoading: boolean;
	fetchMedia: () => Promise<void>;
	uploadFile: (file: File, folderId: string | null) => Promise<void>;
	renameItem: (id: string, name: string) => Promise<void>;
	deleteItem: (id: string) => Promise<void>;
	bulkDelete: (ids: string[]) => Promise<void>;
	toggleSelect: (id: string) => void;
	clearSelection: () => void;
	selectAll: (ids: string[]) => void;
}

export const useMediaLibraryStore = create<MediaLibraryState>()(
	immer((set) => ({
		items: [],
		folders: [],
		selectedIds: [],
		isLoading: false,
		async fetchMedia() {
			set((state) => {
				state.isLoading = true;
			});
			try {
				const [items, folders] = await Promise.all([mainClient.getMedia(), mainClient.getMediaFolders()]);
				set((state) => {
					state.items = items;
					state.folders = folders;
					state.isLoading = false;
				});
			} catch {
				set((state) => {
					state.isLoading = false;
				});
			}
		},
		async uploadFile(file, folderId) {
			const item = await mainClient.uploadMedia(file, folderId);
			set((state) => {
				state.items.unshift(item);
			});
			notify.uploadSuccess(file.name);
			void useAccountStore.getState().fetchStats();
		},
		async renameItem(id, name) {
			const updated = await mainClient.renameMedia(id, name);
			set((state) => {
				const item = state.items.find((i) => i.id === id);
				if (item) Object.assign(item, updated);
			});
		},
		async deleteItem(id) {
			await mainClient.deleteMedia(id);
			set((state) => {
				state.items = state.items.filter((i) => i.id !== id);
				state.selectedIds = state.selectedIds.filter((sid) => sid !== id);
			});
			void useAccountStore.getState().fetchStats();
		},
		async bulkDelete(ids) {
			await mainClient.bulkDeleteMedia(ids);
			set((state) => {
				state.items = state.items.filter((i) => !ids.includes(i.id));
				state.selectedIds = [];
			});
			void useAccountStore.getState().fetchStats();
		},
		toggleSelect(id) {
			set((state) => {
				if (state.selectedIds.includes(id)) {
					state.selectedIds = state.selectedIds.filter((sid) => sid !== id);
				} else {
					state.selectedIds.push(id);
				}
			});
		},
		clearSelection() {
			set((state) => {
				state.selectedIds = [];
			});
		},
		selectAll(ids) {
			set((state) => {
				state.selectedIds = ids;
			});
		},
	}))
);
