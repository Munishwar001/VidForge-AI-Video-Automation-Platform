import type { ReactNode } from "react";

interface TabItem<T extends string> {
	label: string;
	value: T;
	icon?: ReactNode;
}

interface TabsProps<T extends string> {
	items: TabItem<T>[];
	value: T;
	onChange: (value: T) => void;
	className?: string;
}

export function Tabs<T extends string>({ items, value, onChange, className = "" }: TabsProps<T>) {
	return (
		<div className={`flex flex-wrap gap-1 rounded-2xl border border-slate-200/80 bg-white p-1.5 shadow-premium-sm ${className}`}>
			{items.map((item) => (
				<button
					key={item.value}
					type="button"
					onClick={() => onChange(item.value)}
					className={`flex cursor-pointer items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
						value === item.value ? "bg-purple-50 text-[#6D5DF6]" : "text-[#6B7280] hover:bg-slate-50 hover:text-[#111827]"
					}`}
				>
					{item.icon}
					{item.label}
				</button>
			))}
		</div>
	);
}
