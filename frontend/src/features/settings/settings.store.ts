import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { mainClient, useAppStore } from "../../store";

export interface ApiKey {
	id: string;
	label: string;
	keyPreview: string;
	createdAt: string;
}

export interface NotificationPreferences {
	generationComplete: boolean;
	weeklySummary: boolean;
	productUpdates: boolean;
	creditAlerts: boolean;
}

interface SettingsState {
	theme: "light" | "dark";
	apiKeys: ApiKey[];
	notificationPreferences: NotificationPreferences;
	isLoading: boolean;
	fetchSettings: () => Promise<void>;
	setTheme: (theme: "light" | "dark") => Promise<void>;
	generateApiKey: (label: string) => Promise<string>;
	revokeApiKey: (id: string) => Promise<void>;
	updateNotificationPreference: (key: keyof NotificationPreferences, value: boolean) => Promise<void>;
	updateProfile: (name: string, email: string) => Promise<void>;
	changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
	deleteAccount: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>()(
	immer((set) => ({
		theme: "light",
		apiKeys: [],
		notificationPreferences: {
			generationComplete: true,
			weeklySummary: true,
			productUpdates: false,
			creditAlerts: true,
		},
		isLoading: false,
		async fetchSettings() {
			set((state) => {
				state.isLoading = true;
			});
			try {
				const data = await mainClient.getSettings();
				set((state) => {
					state.theme = data.theme;
					state.apiKeys = data.apiKeys;
					state.notificationPreferences = data.notificationPreferences;
					state.isLoading = false;
				});
			} catch {
				set((state) => {
					state.isLoading = false;
				});
			}
		},
		async setTheme(theme) {
			await mainClient.updateTheme(theme);
			set((state) => {
				state.theme = theme;
			});
		},
		async generateApiKey(label) {
			const result = await mainClient.createApiKey(label);
			set((state) => {
				state.apiKeys.unshift(result);
			});
			return result.fullKey;
		},
		async revokeApiKey(id) {
			await mainClient.revokeApiKey(id);
			set((state) => {
				state.apiKeys = state.apiKeys.filter((k) => k.id !== id);
			});
		},
		async updateNotificationPreference(key, value) {
			await mainClient.updateNotificationPreference(key, value);
			set((state) => {
				state.notificationPreferences[key] = value;
			});
		},
		async updateProfile(name, email) {
			await mainClient.updateProfile(name, email);
			await useAppStore.getState().init();
		},
		async changePassword(currentPassword, newPassword) {
			await mainClient.changePassword(currentPassword, newPassword);
		},
		async deleteAccount() {
			await mainClient.deleteAccount();
		},
	}))
);
