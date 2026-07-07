import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { mainClient } from "./index";

interface AccountState {
	creditsRemaining: number;
	creditsTotal: number;
	totalVideosGenerated: number;
	totalImagesGenerated: number;
	storageUsedBytes: number;
	storageLimitBytes: number;
	isLoading: boolean;
	fetchStats: () => Promise<void>;
}

export const useAccountStore = create<AccountState>()(
	immer((set) => ({
		creditsRemaining: 0,
		creditsTotal: 0,
		totalVideosGenerated: 0,
		totalImagesGenerated: 0,
		storageUsedBytes: 0,
		storageLimitBytes: 0,
		isLoading: false,
		async fetchStats() {
			set((state) => {
				state.isLoading = true;
			});
			try {
				const stats = await mainClient.getDashboardStats();
				set((state) => {
					Object.assign(state, stats);
					state.isLoading = false;
				});
			} catch {
				set((state) => {
					state.isLoading = false;
				});
			}
		},
	}))
);
