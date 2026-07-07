export type MediaType = "image" | "video" | "audio";

export interface MediaFolder {
	id: string;
	name: string;
}

export interface MediaItem {
	id: string;
	name: string;
	type: MediaType;
	url: string;
	thumbnail: string;
	folderId: string | null;
	sizeBytes: number;
	createdAt: string;
}
