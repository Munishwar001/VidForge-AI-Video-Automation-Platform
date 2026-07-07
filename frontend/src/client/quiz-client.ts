import { Client } from "./abstract";
import type { User } from "../@types/user";
import type { Project } from "../@types/project";
import type { MediaFolder, MediaItem } from "../@types/media";
import type { GenerationType } from "../@types/generation";
import type { QueueItem } from "../features/queue/queue.types";
import type { PromptHistoryEntry } from "../features/prompt-history/prompt-history.store";
import type { ApiKey, NotificationPreferences } from "../features/settings/settings.store";

export interface DashboardStats {
	creditsRemaining: number;
	creditsTotal: number;
	totalVideosGenerated: number;
	totalImagesGenerated: number;
	storageUsedBytes: number;
	storageLimitBytes: number;
}

export interface ActivityEntry {
	id: string;
	type: "generated" | "uploaded" | "deleted" | "favorited" | "failed";
	message: string;
	createdAt: string;
}

export interface SettingsPayload {
	profile: User;
	theme: "light" | "dark";
	notificationPreferences: NotificationPreferences;
	apiKeys: ApiKey[];
}

export class MainClient extends Client {
	constructor(url: string) {
		super(url);
	}

	async getMe() {
		const res = await this.mainApi("/auth/me");
		const user = res.data as User;
		return user;
	}

	async logout() {
		await this.mainApi.post("/auth/logout");
	}

	async forgotPassword(email: string) {
		await this.mainApi.post("/auth/forgot-password", { email });
	}

	async resetPassword(token: string, password: string) {
		await this.mainApi.post("/auth/reset-password", { token, password });
	}

	async getDashboardStats() {
		const res = await this.mainApi.get("/api/dashboard/stats");
		return res.data as DashboardStats;
	}

	async getDashboardActivity(limit = 10) {
		const res = await this.mainApi.get("/api/dashboard/activity", { params: { limit } });
		return res.data as ActivityEntry[];
	}

	async getProjects() {
		const res = await this.mainApi.get("/api/projects");
		return res.data as Project[];
	}

	async renameProject(id: string, title: string) {
		const res = await this.mainApi.patch(`/api/projects/${id}`, { title });
		return res.data as Project;
	}

	async toggleFavoriteProject(id: string) {
		const res = await this.mainApi.post(`/api/projects/${id}/favorite`);
		return res.data as Project;
	}

	async duplicateProject(id: string) {
		const res = await this.mainApi.post(`/api/projects/${id}/duplicate`);
		return res.data as Project;
	}

	async deleteProject(id: string) {
		await this.mainApi.delete(`/api/projects/${id}`);
	}

	async getMedia() {
		const res = await this.mainApi.get("/api/media");
		return res.data as MediaItem[];
	}

	async getMediaFolders() {
		const res = await this.mainApi.get("/api/media/folders");
		return res.data as MediaFolder[];
	}

	async uploadMedia(file: File, folderId: string | null) {
		const formData = new FormData();
		formData.append("file", file);
		if (folderId) formData.append("folderId", folderId);
		const res = await this.mainApi.post("/api/media", formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});
		return res.data as MediaItem;
	}

	async renameMedia(id: string, name: string) {
		const res = await this.mainApi.patch(`/api/media/${id}`, { name });
		return res.data as MediaItem;
	}

	async deleteMedia(id: string) {
		await this.mainApi.delete(`/api/media/${id}`);
	}

	async bulkDeleteMedia(ids: string[]) {
		await this.mainApi.post("/api/media/bulk-delete", { ids });
	}

	async getPrompts() {
		const res = await this.mainApi.get("/api/prompts");
		return res.data as PromptHistoryEntry[];
	}

	async createPrompt(text: string, type: GenerationType) {
		const res = await this.mainApi.post("/api/prompts", { text, type });
		return res.data as PromptHistoryEntry;
	}

	async togglePromptFavorite(id: string) {
		const res = await this.mainApi.patch(`/api/prompts/${id}/favorite`);
		return res.data as PromptHistoryEntry;
	}

	async deletePrompt(id: string) {
		await this.mainApi.delete(`/api/prompts/${id}`);
	}

	async getGenerationJobs() {
		const res = await this.mainApi.get("/api/generation/jobs");
		return res.data as QueueItem[];
	}

	async createVideoJob(prompt: string, settings: unknown) {
		const res = await this.mainApi.post("/api/generation/video", { prompt, settings });
		return res.data as QueueItem;
	}

	async createImageJob(prompt: string, settings: unknown) {
		const res = await this.mainApi.post("/api/generation/image", { prompt, settings });
		return res.data as QueueItem;
	}

	async cancelJob(id: string) {
		const res = await this.mainApi.post(`/api/generation/jobs/${id}/cancel`);
		return res.data as QueueItem;
	}

	async retryJob(id: string) {
		const res = await this.mainApi.post(`/api/generation/jobs/${id}/retry`);
		return res.data as QueueItem;
	}

	async getSettings() {
		const res = await this.mainApi.get("/api/settings");
		return res.data as SettingsPayload;
	}

	async updateProfile(name: string, email: string) {
		const res = await this.mainApi.patch("/api/settings/profile", { name, email });
		return res.data as { id: string; name: string; email: string };
	}

	async changePassword(currentPassword: string, newPassword: string) {
		await this.mainApi.post("/api/settings/password", { currentPassword, newPassword });
	}

	async createApiKey(label: string) {
		const res = await this.mainApi.post("/api/settings/api-keys", { label });
		return res.data as ApiKey & { fullKey: string };
	}

	async revokeApiKey(id: string) {
		await this.mainApi.delete(`/api/settings/api-keys/${id}`);
	}

	async updateNotificationPreference(key: keyof NotificationPreferences, value: boolean) {
		await this.mainApi.patch("/api/settings/notifications", { key, value });
	}

	async updateTheme(theme: "light" | "dark") {
		await this.mainApi.patch("/api/settings/theme", { theme });
	}

	async deleteAccount() {
		await this.mainApi.delete("/api/settings/account");
	}
}
