import type { ReactNode } from "react";
import { Card } from "./card";

interface StatCardProps {
	label: string;
	value: string;
	icon: ReactNode;
	accent?: string;
	sublabel?: string;
}

export function StatCard({ label, value, icon, accent = "from-purple-500 to-indigo-500", sublabel }: StatCardProps) {
	return (
		<Card className="p-6 transition-all duration-300 hover:border-[#6D5DF6]/30">
			<div
				className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-lg text-white shadow-premium-sm`}
			>
				{icon}
			</div>
			<div className="mt-4 font-heading text-2xl font-extrabold text-[#111827]">{value}</div>
			<div className="mt-1 text-xs font-semibold text-[#6B7280]">{label}</div>
			{sublabel && <div className="mt-2 text-[10px] font-bold text-emerald-600">{sublabel}</div>}
		</Card>
	);
}
