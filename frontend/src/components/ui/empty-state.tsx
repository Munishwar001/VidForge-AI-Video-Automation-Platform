import type { ReactNode } from "react";

interface EmptyStateProps {
	icon?: ReactNode;
	title: string;
	description?: string;
	action?: ReactNode;
	className?: string;
}

export function EmptyState({ icon, title, description, action, className = "" }: EmptyStateProps) {
	return (
		<div
			className={`flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-slate-200 bg-slate-50/50 px-6 py-16 text-center ${className}`}
		>
			{icon && (
				<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-2xl text-[#6D5DF6]">{icon}</div>
			)}
			<h3 className="font-heading text-base font-bold text-[#111827]">{title}</h3>
			{description && <p className="max-w-sm text-sm text-[#6B7280]">{description}</p>}
			{action}
		</div>
	);
}
