import type { GenerationType, JobStage } from "../../@types/generation";

export interface QueueItem {
	id: string;
	title: string;
	type: GenerationType;
	stage: JobStage;
	progress: number;
	etaSeconds: number | null;
	credits: number;
	createdAt: string;
	error?: string;
	resultProjectIds?: string[];
}
