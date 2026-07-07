import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Project } from "../../@types/project";
import { mainClient } from "../../store";
import { notify } from "../../libs/notify";

interface ProjectsState {
	projects: Project[];
	isLoading: boolean;
	fetchProjects: () => Promise<void>;
	renameProject: (id: string, title: string) => Promise<void>;
	duplicateProject: (id: string) => Promise<void>;
	deleteProject: (id: string) => Promise<void>;
	toggleFavorite: (id: string) => Promise<void>;
}

export const useProjectsStore = create<ProjectsState>()(
	immer((set, get) => ({
		projects: [],
		isLoading: false,
		async fetchProjects() {
			set((state) => {
				state.isLoading = true;
			});
			try {
				const projects = await mainClient.getProjects();
				set((state) => {
					state.projects = projects;
					state.isLoading = false;
				});
			} catch {
				set((state) => {
					state.isLoading = false;
				});
			}
		},
		async renameProject(id, title) {
			const updated = await mainClient.renameProject(id, title);
			set((state) => {
				const project = state.projects.find((p) => p.id === id);
				if (project) Object.assign(project, updated);
			});
		},
		async duplicateProject(id) {
			const created = await mainClient.duplicateProject(id);
			set((state) => {
				state.projects.unshift(created);
			});
		},
		async deleteProject(id) {
			const project = get().projects.find((p) => p.id === id);
			await mainClient.deleteProject(id);
			set((state) => {
				state.projects = state.projects.filter((p) => p.id !== id);
			});
			if (project) notify.projectDeleted(project.title);
		},
		async toggleFavorite(id) {
			const updated = await mainClient.toggleFavoriteProject(id);
			set((state) => {
				const project = state.projects.find((p) => p.id === id);
				if (project) Object.assign(project, updated);
			});
		},
	}))
);
