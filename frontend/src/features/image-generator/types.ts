export type ImageStyle = "Realistic" | "Anime" | "3D" | "Illustration" | "Cyberpunk" | "Studio Ghibli" | "Sketch" | "Watercolor";
export type ImageSize = "1024x1024" | "1024x1792" | "1792x1024";
export type ImageQuality = "Standard" | "HD";

export interface ImageGenerationSettings {
	style: ImageStyle;
	size: ImageSize;
	count: number;
	quality: ImageQuality;
	negativePrompt: string;
	referenceImage: string | null;
	referenceImageName: string | null;
}

export interface GeneratedImage {
	id: string;
	projectId: string;
	prompt: string;
	url: string;
	style: ImageStyle;
	size: ImageSize;
	createdAt: string;
	status: "ready" | "processing";
}

export const IMAGE_STYLES: ImageStyle[] = [
	"Realistic",
	"Anime",
	"3D",
	"Illustration",
	"Cyberpunk",
	"Studio Ghibli",
	"Sketch",
	"Watercolor",
];

export const IMAGE_PROMPT_TEMPLATES: { label: string; text: string }[] = [
	{ label: "Cyberpunk Cityscape", text: "Cyberpunk city skyline at night, neon lights, flying cars, rain-slicked streets." },
	{ label: "Fantasy Portrait", text: "Portrait of a fantasy elf warrior, intricate armor, glowing runes, dramatic lighting." },
	{ label: "Product Render", text: "3D render of a minimalist skincare bottle floating with soft studio lighting." },
	{ label: "Studio Ghibli Scene", text: "Hand-painted forest spirit in a Studio Ghibli style, magical lighting, soft colors." },
	{ label: "Watercolor Landscape", text: "Soft watercolor painting of a mountain range at sunrise, pastel tones." },
];
