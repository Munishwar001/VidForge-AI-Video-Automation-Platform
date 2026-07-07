import { useRef, useState } from "react";
import type { DragEvent } from "react";

interface UploadDropzoneProps {
	onFiles: (files: File[]) => void;
}

export function UploadDropzone({ onFiles }: UploadDropzoneProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [dragging, setDragging] = useState(false);

	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragging(false);
		const files = Array.from(e.dataTransfer.files ?? []);
		if (files.length) onFiles(files);
	};

	return (
		<div
			onDragOver={(e) => {
				e.preventDefault();
				setDragging(true);
			}}
			onDragLeave={() => setDragging(false)}
			onDrop={handleDrop}
			onClick={() => inputRef.current?.click()}
			className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed p-10 text-center transition-colors ${
				dragging ? "border-[#6D5DF6] bg-purple-50/50" : "border-slate-200 bg-slate-50/40 hover:border-[#6D5DF6]/40"
			}`}
		>
			<span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-2xl text-[#6D5DF6]">☁️</span>
			<p className="text-sm font-bold text-[#111827]">Drag & drop files here, or click to browse</p>
			<p className="text-xs text-[#6B7280]">Images, videos, and audio files supported</p>
			<input
				ref={inputRef}
				type="file"
				multiple
				accept="image/*,video/*,audio/*"
				className="hidden"
				onChange={(e) => {
					const files = Array.from(e.target.files ?? []);
					if (files.length) onFiles(files);
					e.target.value = "";
				}}
			/>
		</div>
	);
}
