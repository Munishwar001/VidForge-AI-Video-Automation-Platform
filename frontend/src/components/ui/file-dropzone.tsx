import { useRef, useState } from "react";
import type { DragEvent } from "react";

interface FileDropzoneProps {
	accept?: string;
	label: string;
	hint?: string;
	preview?: string | null;
	onFile: (file: File) => void;
	onClear?: () => void;
}

export function FileDropzone({ accept, label, hint, preview, onFile, onClear }: FileDropzoneProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [dragging, setDragging] = useState(false);

	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragging(false);
		const file = e.dataTransfer.files?.[0];
		if (file) onFile(file);
	};

	return (
		<div>
			<div
				onDragOver={(e) => {
					e.preventDefault();
					setDragging(true);
				}}
				onDragLeave={() => setDragging(false)}
				onDrop={handleDrop}
				onClick={() => inputRef.current?.click()}
				className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-6 text-center transition-colors ${
					dragging ? "border-[#6D5DF6] bg-purple-50/50" : "border-slate-200 bg-slate-50/50 hover:border-[#6D5DF6]/40"
				}`}
			>
				{preview ? (
					<img src={preview} alt={label} className="h-20 w-32 rounded-xl object-cover" />
				) : (
					<UploadIcon />
				)}
				<span className="text-xs font-bold text-[#111827]">{label}</span>
				{hint && <span className="text-[10px] text-[#6B7280]">{hint}</span>}
				<input
					ref={inputRef}
					type="file"
					accept={accept}
					className="hidden"
					onChange={(e) => {
						const file = e.target.files?.[0];
						if (file) onFile(file);
						e.target.value = "";
					}}
				/>
			</div>
			{preview && onClear && (
				<button
					onClick={(e) => {
						e.stopPropagation();
						onClear();
					}}
					className="mt-2 cursor-pointer text-[10px] font-bold text-red-500 hover:underline"
				>
					Remove file
				</button>
			)}
		</div>
	);
}

function UploadIcon() {
	return (
		<svg className="h-6 w-6 text-[#6D5DF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1.5}
				d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12"
			/>
		</svg>
	);
}
