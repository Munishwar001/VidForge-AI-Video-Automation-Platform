export type AspectRatio = "16:9" | "9:16" | "1:1" | "4:5";
export type VideoDuration = 5 | 10 | 15 | 30 | 60;
export type VideoQuality = "Standard" | "HD" | "4K";
export type Fps = 24 | 30 | 60;
export type CameraStyle = "Static" | "Drone" | "Cinematic" | "Tracking" | "Handheld";

export interface VideoGenerationSettings {
	aspectRatio: AspectRatio;
	duration: VideoDuration;
	quality: VideoQuality;
	fps: Fps;
	cameraStyle: CameraStyle;
	motionStrength: number;
	creativity: number;
	seed: number;
	negativePrompt: string;
	referenceImage: string | null;
	referenceImageName: string | null;
	referenceVideoName: string | null;
	voiceOver: boolean;
	backgroundMusic: boolean;
	subtitles: boolean;
}

export interface VideoResult {
	id: string;
	projectId: string;
	prompt: string;
	thumbnail: string;
	durationSeconds: number;
	resolution: string;
	createdAt: string;
}

export const PROMPT_TEMPLATES: { label: string; text: string }[] = [
	{
		label: "Cinematic Documentary",
		text: "Cinematic documentary about the history of deep sea exploration, dramatic narration, orchestral score, slow dolly shots.",
	},
	{
		label: "Product Launch Ad",
		text: "Fast-paced product launch commercial for a wireless earbud, glossy studio lighting, dynamic camera moves, upbeat music.",
	},
	{
		label: "Travel Vlog Intro",
		text: "Energetic travel vlog intro exploring Tokyo streets at night, handheld camera, neon lights, upbeat pop soundtrack.",
	},
	{
		label: "Real Estate Walkthrough",
		text: "Luxury beachfront villa walkthrough, drone establishing shot, golden hour lighting, smooth gimbal transitions.",
	},
	{
		label: "Anime Trailer",
		text: "Anime style action trailer with a lone samurai walking through a rain-soaked neon city, dramatic slow motion.",
	},
];
