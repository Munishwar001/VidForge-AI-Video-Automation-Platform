import type { HTMLAttributes } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
	return <div className={`rounded-3xl border border-slate-200/80 bg-white shadow-premium-sm ${className}`} {...props} />;
}
