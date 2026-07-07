import type { SelectHTMLAttributes } from "react";

export function Select({ className = "", children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
	return (
		<select
			className={`cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-[#111827] outline-none focus:border-[#6D5DF6] ${className}`}
			{...props}
		>
			{children}
		</select>
	);
}
