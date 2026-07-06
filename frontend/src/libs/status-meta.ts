import type { JobStage } from "../@types/generation";
import type { ProjectStatus } from "../@types/project";
import type { BadgeTone } from "../components/ui/badge";

export const jobStageMeta: Record<JobStage, { label: string; tone: BadgeTone }> = {
	queued: { label: "Queued", tone: "slate" },
	preparing: { label: "Preparing", tone: "amber" },
	generating: { label: "Generating", tone: "purple" },
	rendering: { label: "Rendering", tone: "blue" },
	finalizing: { label: "Finalizing", tone: "blue" },
	completed: { label: "Completed", tone: "emerald" },
	failed: { label: "Failed", tone: "red" },
	cancelled: { label: "Cancelled", tone: "slate" },
};

export const projectStatusMeta: Record<ProjectStatus, { label: string; tone: BadgeTone }> = {
	completed: { label: "Completed", tone: "emerald" },
	processing: { label: "Processing", tone: "purple" },
	failed: { label: "Failed", tone: "red" },
};
