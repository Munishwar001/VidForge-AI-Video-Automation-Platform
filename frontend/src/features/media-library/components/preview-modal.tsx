import { Modal } from "../../../components/ui";
import type { MediaItem } from "../../../@types/media";

export function PreviewModal({ item, onClose }: { item: MediaItem | null; onClose: () => void }) {
	return (
		<Modal open={!!item} onClose={onClose} title={item?.name ?? ""} maxWidth="max-w-2xl">
			{item?.type === "image" && <img src={item.url} alt={item.name} className="w-full rounded-2xl object-contain" />}
			{item?.type === "video" && <video src={item.url} controls className="w-full rounded-2xl bg-black" />}
			{item?.type === "audio" && (
				<div className="rounded-2xl bg-slate-50 p-6">
					<img src={item.thumbnail} alt={item.name} className="mb-4 w-full rounded-xl" />
					<audio src={item.url} controls className="w-full" />
				</div>
			)}
		</Modal>
	);
}
