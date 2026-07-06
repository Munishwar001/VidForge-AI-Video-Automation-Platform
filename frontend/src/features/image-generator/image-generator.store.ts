import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { GeneratedImage, ImageGenerationSettings } from "./types";
import { useQueueStore } from "../queue/queue.store";
import { useProjectsStore } from "../projects/projects.store";
import { usePromptHistoryStore } from "../prompt-history/prompt-history.store";
import { placeholderImage } from "../../libs/placeholder";
import { delay } from "../../mock/delay";
import { notify } from "../../libs/notify";

const DEFAULT_SETTINGS: ImageGenerationSettings = {
	style: "Realistic",
	size: "1024x1024",
	count: 2,
	quality: "Standard",
	negativePrompt: "",
	referenceImage: null,
	referenceImageName: null,
};

function dimsForSize(size: ImageGenerationSettings["size"]): { width: number; height: number } {
	const [width, height] = size.split("x").map(Number);
	return { width, height };
}

interface ImageGeneratorState {
	prompt: string;
	settings: ImageGenerationSettings;
	activeJobId: string | null;
	images: GeneratedImage[];
	isImprovingPrompt: boolean;
	isSubmitting: boolean;
	setPrompt: (prompt: string) => void;
	loadPrompt: (prompt: string) => void;
	clearPrompt: () => void;
	updateSettings: (partial: Partial<ImageGenerationSettings>) => void;
	setReferenceImage: (file: File) => Promise<void>;
	clearReferenceImage: () => void;
	improvePrompt: () => Promise<void>;
	generate: () => Promise<void>;
	removeImage: (id: string) => Promise<void>;
	regenerateImage: (id: string) => Promise<void>;
	upscaleImage: (id: string) => Promise<void>;
}

export const useImageGeneratorStore = create<ImageGeneratorState>()(
	immer((set, get) => ({
		prompt: "",
		settings: DEFAULT_SETTINGS,
		activeJobId: null,
		images: [],
		isImprovingPrompt: false,
		isSubmitting: false,

		setPrompt(prompt) {
			set((state) => {
				state.prompt = prompt;
			});
		},
		loadPrompt(prompt) {
			set((state) => {
				state.prompt = prompt;
			});
		},
		clearPrompt() {
			set((state) => {
				state.prompt = "";
			});
		},
		updateSettings(partial) {
			set((state) => {
				Object.assign(state.settings, partial);
			});
		},
		async setReferenceImage(file) {
			const dataUrl = await fileToDataUrl(file);
			set((state) => {
				state.settings.referenceImage = dataUrl;
				state.settings.referenceImageName = file.name;
			});
		},
		clearReferenceImage() {
			set((state) => {
				state.settings.referenceImage = null;
				state.settings.referenceImageName = null;
			});
		},
		async improvePrompt() {
			const current = get().prompt.trim();
			if (!current) return;
			set((state) => {
				state.isImprovingPrompt = true;
			});
			await delay(1100);
			set((state) => {
				state.prompt = `${current}, highly detailed, trending on artstation, sharp focus, 8k`;
				state.isImprovingPrompt = false;
			});
		},
		async generate() {
			const prompt = get().prompt.trim();
			if (!prompt || get().activeJobId || get().isSubmitting) return;

			set((state) => {
				state.isSubmitting = true;
				state.images = [];
			});
			void usePromptHistoryStore.getState().addEntry("image", prompt);

			try {
				const job = await useQueueStore.getState().createImageJob(prompt, get().settings);
				set((state) => {
					state.activeJobId = job.id;
					state.isSubmitting = false;
				});
				watchJob(job.id, set);
			} catch (error) {
				set((state) => {
					state.isSubmitting = false;
				});
				throw error;
			}
		},
		async removeImage(id) {
			const img = get().images.find((i) => i.id === id);
			if (!img) return;
			await useProjectsStore.getState().deleteProject(img.projectId);
			set((state) => {
				state.images = state.images.filter((i) => i.id !== id);
			});
		},
		async regenerateImage(id) {
			set((state) => {
				const img = state.images.find((i) => i.id === id);
				if (img) img.status = "processing";
			});
			await delay(1400);
			set((state) => {
				const img = state.images.find((i) => i.id === id);
				if (img) {
					const { width, height } = dimsForSize(img.size);
					img.url = placeholderImage(`${img.id}-${Date.now()}`, img.prompt, width, height);
					img.status = "ready";
				}
			});
			notify.generationCompleted("Image regenerated");
		},
		async upscaleImage(id) {
			set((state) => {
				const img = state.images.find((i) => i.id === id);
				if (img) img.status = "processing";
			});
			await delay(1200);
			set((state) => {
				const img = state.images.find((i) => i.id === id);
				if (img) {
					img.url = placeholderImage(`${img.id}-upscaled`, img.prompt, 1600, 1600);
					img.status = "ready";
				}
			});
			notify.generationCompleted("Image upscaled to higher resolution");
		},
	}))
);

function watchJob(jobId: string, set: (fn: (state: ImageGeneratorState) => void) => void) {
	const unsubscribe = useQueueStore.subscribe((state) => {
		const item = state.items.find((i) => i.id === jobId);
		if (!item) return;

		if (item.stage === "completed") {
			unsubscribe();
			void resolveResult(jobId, item.resultProjectIds ?? [], set);
		} else if (item.stage === "failed" || item.stage === "cancelled") {
			unsubscribe();
			set((state) => {
				if (state.activeJobId === jobId) state.activeJobId = null;
			});
		}
	});
}

async function resolveResult(
	jobId: string,
	resultProjectIds: string[],
	set: (fn: (state: ImageGeneratorState) => void) => void
) {
	await useProjectsStore.getState().fetchProjects();
	const projects = useProjectsStore.getState().projects.filter((p) => resultProjectIds.includes(p.id));

	set((state) => {
		if (state.activeJobId === jobId) state.activeJobId = null;
		state.images = projects.map((project) => ({
			id: project.id,
			projectId: project.id,
			prompt: project.prompt,
			url: project.thumbnail,
			style: state.settings.style,
			size: state.settings.size,
			createdAt: project.createdAt,
			status: "ready" as const,
		}));
	});
}

function fileToDataUrl(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
}
