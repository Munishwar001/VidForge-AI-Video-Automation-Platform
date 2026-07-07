export type GenerationType = "video" | "image";

export type JobStage =
	| "queued"
	| "preparing"
	| "generating"
	| "rendering"
	| "finalizing"
	| "completed"
	| "failed"
	| "cancelled";

export const ACTIVE_JOB_STAGES: JobStage[] = ["queued", "preparing", "generating", "rendering", "finalizing"];
