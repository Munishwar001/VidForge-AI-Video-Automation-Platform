interface ProgressBarProps {
	value: number;
	tone?: "gradient" | "emerald" | "red";
	className?: string;
}

export function ProgressBar({ value, tone = "gradient", className = "" }: ProgressBarProps) {
	const fill =
		tone === "gradient" ? "bg-gradient-to-r from-[#6D5DF6] to-[#3B82F6]" : tone === "emerald" ? "bg-emerald-500" : "bg-red-500";
	return (
		<div className={`h-2 w-full overflow-hidden rounded-full bg-slate-100 ${className}`}>
			<div
				className={`h-full rounded-full transition-all duration-300 ${fill}`}
				style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
			/>
		</div>
	);
}
