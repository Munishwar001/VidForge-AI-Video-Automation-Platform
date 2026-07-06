import type { GenerationType } from "./generation";

export type ProjectStatus = "completed" | "processing" | "failed";

export interface Project {
	id: string;
	title: string;
	prompt: string;
	type: GenerationType;
	status: ProjectStatus;
	thumbnail: string;
	createdAt: string;
	duration: number | null;
	resolution?: string;
	creditsUsed: number;
	favorite: boolean;
}
