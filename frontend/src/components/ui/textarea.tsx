import { useEffect, useRef } from "react";
import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	autoResize?: boolean;
	maxHeight?: number;
}

export function Textarea({ autoResize = true, maxHeight = 320, className = "", value, onChange, ...props }: TextareaProps) {
	const ref = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (!autoResize || !ref.current) return;
		ref.current.style.height = "auto";
		ref.current.style.height = `${Math.min(ref.current.scrollHeight, maxHeight)}px`;
	}, [value, autoResize, maxHeight]);

	return (
		<textarea
			ref={ref}
			value={value}
			onChange={onChange}
			className={`w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/60 p-4 text-sm font-medium text-[#111827] outline-none transition-colors focus:border-[#6D5DF6] focus:bg-white ${className}`}
			{...props}
		/>
	);
}
