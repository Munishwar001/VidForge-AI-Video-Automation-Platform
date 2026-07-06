import { notification } from "antd";

const placement = "bottomRight" as const;
const duration = 4.5;

export const notify = {
	generationStarted(label: string) {
		notification.info({ title: "Generation started", description: label, placement, duration });
	},
	generationCompleted(label: string) {
		notification.success({ title: "Generation completed", description: label, placement, duration });
	},
	generationFailed(label: string) {
		notification.error({ title: "Generation failed", description: label, placement, duration });
	},
	generationCancelled(label: string) {
		notification.warning({ title: "Generation cancelled", description: label, placement, duration });
	},
	uploadSuccess(label: string) {
		notification.success({ title: "Upload successful", description: label, placement, duration });
	},
	creditsLow(remaining: number) {
		notification.warning({
			title: "Credits running low",
			description: `Only ${remaining} credits remaining. Consider upgrading your plan.`,
			placement,
			duration,
		});
	},
	projectDeleted(label: string) {
		notification.info({ title: "Project deleted", description: label, placement, duration });
	},
};
