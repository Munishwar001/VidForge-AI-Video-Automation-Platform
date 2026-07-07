import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { VideoGenerationSettings, VideoResult } from "./types";
import { useQueueStore } from "../queue/queue.store";
import { useProjectsStore } from "../projects/projects.store";
import { usePromptHistoryStore } from "../prompt-history/prompt-history.store";
import { delay } from "../../mock/delay";

const DEFAULT_SETTINGS: VideoGenerationSettings = {
	aspectRatio: "16:9",
	duration: 15,
	quality: "HD",
	fps: 30,
	cameraStyle: "Cinematic",
	motionStrength: 50,
	creativity: 60,
	seed: Math.floor(Math.random() * 1_000_000),
	negativePrompt: "",
	referenceImage: null,
	referenceImageName: null,
	referenceVideoName: null,
	voiceOver: false,
	backgroundMusic: true,
	subtitles: false,
};

interface VideoGeneratorState {
	prompt: string;
	settings: VideoGenerationSettings;
	activeJobId: string | null;
	result: VideoResult | null;
	isImprovingPrompt: boolean;
	isSubmitting: boolean;
	setPrompt: (prompt: string) => void;
	loadPrompt: (prompt: string) => void;
	updateSettings: (partial: Partial<VideoGenerationSettings>) => void;
	randomizeSeed: () => void;
	setReferenceImage: (file: File) => Promise<void>;
	clearReferenceImage: () => void;
	setReferenceVideo: (file: File) => void;
	clearReferenceVideo: () => void;
	improvePrompt: () => Promise<void>;
	generate: () => Promise<void>;
	cancelGeneration: () => Promise<void>;
	regenerate: () => Promise<void>;
	clearPrompt: () => void;
	dismissResult: () => void;
}

export const useVideoGeneratorStore = create<VideoGeneratorState>()(
	immer((set, get) => ({
		prompt: "",
		settings: DEFAULT_SETTINGS,
		activeJobId: null,
		result: null,
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
		updateSettings(partial) {
			set((state) => {
				Object.assign(state.settings, partial);
			});
		},
		randomizeSeed() {
			set((state) => {
				state.settings.seed = Math.floor(Math.random() * 1_000_000);
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
		setReferenceVideo(file) {
			set((state) => {
				state.settings.referenceVideoName = file.name;
			});
		},
		clearReferenceVideo() {
			set((state) => {
				state.settings.referenceVideoName = null;
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
				state.prompt = `${current}, ultra-detailed, cinematic lighting, dynamic camera movement, 8k render quality`;
				state.isImprovingPrompt = false;
			});
		},
		async generate() {
			const prompt = get().prompt.trim();
			if (!prompt || get().activeJobId || get().isSubmitting) return;

			set((state) => {
				state.isSubmitting = true;
				state.result = null;
			});

			void usePromptHistoryStore.getState().addEntry("video", prompt);

			try {
				const job = await useQueueStore.getState().createVideoJob(prompt, get().settings);
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
		async cancelGeneration() {
			const jobId = get().activeJobId;
			if (!jobId) return;
			set((state) => {
				state.activeJobId = null;
			});
			await useQueueStore.getState().cancel(jobId);
		},
		async regenerate() {
			set((state) => {
				state.result = null;
			});
			await get().generate();
		},
		clearPrompt() {
			set((state) => {
				state.prompt = "";
			});
		},
		dismissResult() {
			set((state) => {
				state.result = null;
			});
		},
	}))
);

function watchJob(jobId: string, set: (fn: (state: VideoGeneratorState) => void) => void) {
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
	set: (fn: (state: VideoGeneratorState) => void) => void
) {
	await useProjectsStore.getState().fetchProjects();
	const project = useProjectsStore.getState().projects.find((p) => resultProjectIds.includes(p.id));

	set((state) => {
		if (state.activeJobId === jobId) state.activeJobId = null;
		if (project) {
			state.result = {
				id: project.id,
				projectId: project.id,
				prompt: project.prompt,
				thumbnail: project.thumbnail,
				durationSeconds: project.duration ?? 0,
				resolution: project.resolution ?? "",
				createdAt: project.createdAt,
			};
		}
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
