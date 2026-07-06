import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { QueueItem } from "./queue.types";
import { mainClient } from "../../store";
import { useAccountStore } from "../../store/account-store";
import { useActivityStore } from "../../store/activity-store";
import { notify } from "../../libs/notify";

const POLL_MS = 1500;

interface QueueState {
	items: QueueItem[];
	isDrawerOpen: boolean;
	openDrawer: () => void;
	closeDrawer: () => void;
	fetchJobs: () => Promise<void>;
	startPolling: () => void;
	stopPolling: () => void;
	createVideoJob: (prompt: string, settings: unknown) => Promise<QueueItem>;
	createImageJob: (prompt: string, settings: unknown) => Promise<QueueItem>;
	cancel: (id: string) => Promise<void>;
	retry: (id: string) => Promise<void>;
}

let pollHandle: ReturnType<typeof setInterval> | null = null;

export const useQueueStore = create<QueueState>()(
	immer((set, get) => ({
		items: [],
		isDrawerOpen: false,
		openDrawer() {
			set((state) => {
				state.isDrawerOpen = true;
			});
		},
		closeDrawer() {
			set((state) => {
				state.isDrawerOpen = false;
			});
		},
		async fetchJobs() {
			try {
				const items = await mainClient.getGenerationJobs();
				const previous = get().items;
				let shouldRefreshAccount = false;

				items.forEach((item) => {
					const prev = previous.find((p) => p.id === item.id);
					if (prev && prev.stage !== item.stage) {
						if (item.stage === "completed") {
							notify.generationCompleted(item.title);
							shouldRefreshAccount = true;
						} else if (item.stage === "failed") {
							notify.generationFailed(item.title);
							shouldRefreshAccount = true;
						}
					}
				});

				set((state) => {
					state.items = items;
				});

				if (shouldRefreshAccount) {
					void useActivityStore.getState().fetchActivity();
					void useAccountStore.getState().fetchStats();
				}
			} catch {
				// polling failure is non-fatal; the next tick retries
			}
		},
		startPolling() {
			if (pollHandle) return;
			void get().fetchJobs();
			pollHandle = setInterval(() => void get().fetchJobs(), POLL_MS);
		},
		stopPolling() {
			if (pollHandle) {
				clearInterval(pollHandle);
				pollHandle = null;
			}
		},
		async createVideoJob(prompt, settings) {
			const job = await mainClient.createVideoJob(prompt, settings);
			set((state) => {
				state.items.unshift(job);
			});
			notify.generationStarted(job.title);
			void useAccountStore.getState().fetchStats();
			get().startPolling();
			return job;
		},
		async createImageJob(prompt, settings) {
			const job = await mainClient.createImageJob(prompt, settings);
			set((state) => {
				state.items.unshift(job);
			});
			notify.generationStarted(job.title);
			void useAccountStore.getState().fetchStats();
			get().startPolling();
			return job;
		},
		async cancel(id) {
			const job = await mainClient.cancelJob(id);
			set((state) => {
				const index = state.items.findIndex((item) => item.id === id);
				if (index !== -1) state.items[index] = job;
			});
			notify.generationCancelled(job.title);
			void useAccountStore.getState().fetchStats();
		},
		async retry(id) {
			const job = await mainClient.retryJob(id);
			set((state) => {
				const index = state.items.findIndex((item) => item.id === id);
				if (index !== -1) state.items[index] = job;
			});
			notify.generationStarted(job.title);
			void useAccountStore.getState().fetchStats();
			get().startPolling();
		},
	}))
);
