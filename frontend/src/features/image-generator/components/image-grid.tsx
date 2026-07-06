import { EmptyState } from "../../../components/ui";
import { ImageCard } from "./image-card";
import { GeneratingSkeletons } from "./generating-skeletons";
import type { GeneratedImage } from "../types";

interface ImageGridProps {
	images: GeneratedImage[];
	isGenerating: boolean;
	pendingCount: number;
}

export function ImageGrid({ images, isGenerating, pendingCount }: ImageGridProps) {
	if (isGenerating) return <GeneratingSkeletons count={pendingCount} />;

	if (images.length === 0) {
		return (
			<EmptyState icon="🖼️" title="No images yet" description="Enter a prompt and hit Generate to create your first batch of images." />
		);
	}

	return (
		<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
			{images.map((image) => (
				<ImageCard key={image.id} image={image} />
			))}
		</div>
	);
}
