import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { mainClient } from "../../store";
import type { GenerationType } from "../../@types/generation";

export interface PromptHistoryEntry {
	id: string;
	text: string;
	type: GenerationType;
	favorite: boolean;
	createdAt: string;
}

interface PromptHistoryState {
	entries: PromptHistoryEntry[];
	isLoading: boolean;
	fetchEntries: () => Promise<void>;
	addEntry: (type: GenerationType, text: string) => Promise<void>;
	toggleFavorite: (id: string) => Promise<void>;
	deleteEntry: (id: string) => Promise<void>;
}

export const usePromptHistoryStore = create<PromptHistoryState>()(
	immer((set) => ({
		entries: [],
		isLoading: false,
		async fetchEntries() {
			set((state) => {
				state.isLoading = true;
			});
			try {
				const entries = await mainClient.getPrompts();
				set((state) => {
					state.entries = entries;
					state.isLoading = false;
				});
			} catch {
				set((state) => {
					state.isLoading = false;
				});
			}
		},
		async addEntry(type, text) {
			if (!text.trim()) return;
			const entry = await mainClient.createPrompt(text, type);
			set((state) => {
				const exists = state.entries.some((e) => e.id === entry.id);
				if (!exists) state.entries.unshift(entry);
			});
		},
		async toggleFavorite(id) {
			const updated = await mainClient.togglePromptFavorite(id);
			set((state) => {
				const entry = state.entries.find((e) => e.id === id);
				if (entry) Object.assign(entry, updated);
			});
		},
		async deleteEntry(id) {
			await mainClient.deletePrompt(id);
			set((state) => {
				state.entries = state.entries.filter((e) => e.id !== id);
			});
		},
	}))
);
