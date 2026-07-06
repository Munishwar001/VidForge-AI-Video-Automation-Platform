import type { ReactNode } from "react";

export type BadgeTone = "purple" | "blue" | "emerald" | "red" | "amber" | "slate";

const toneClasses: Record<BadgeTone, string> = {
	purple: "bg-purple-50 text-[#6D5DF6] border-purple-200",
	blue: "bg-blue-50 text-[#3B82F6] border-blue-200",
	emerald: "bg-emerald-50 text-emerald-600 border-emerald-200",
	red: "bg-red-50 text-red-600 border-red-200",
	amber: "bg-amber-50 text-amber-600 border-amber-200",
	slate: "bg-slate-100 text-slate-500 border-slate-200",
};

export function Badge({ tone = "slate", children, className = "" }: { tone?: BadgeTone; children: ReactNode; className?: string }) {
	return (
		<span
			className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${toneClasses[tone]} ${className}`}
		>
			{children}
		</span>
	);
}
