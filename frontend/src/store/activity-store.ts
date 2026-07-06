import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { mainClient } from "./index";
import type { ActivityEntry } from "../client/quiz-client";

interface ActivityState {
	items: ActivityEntry[];
	isLoading: boolean;
	fetchActivity: () => Promise<void>;
}

export const useActivityStore = create<ActivityState>()(
	immer((set) => ({
		items: [],
		isLoading: false,
		async fetchActivity() {
			set((state) => {
				state.isLoading = true;
			});
			try {
				const items = await mainClient.getDashboardActivity(20);
				set((state) => {
					state.items = items;
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
