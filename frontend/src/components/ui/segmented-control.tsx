interface SegmentedOption<T extends string | number> {
	label: string;
	value: T;
}

interface SegmentedControlProps<T extends string | number> {
	options: SegmentedOption<T>[];
	value: T;
	onChange: (value: T) => void;
	className?: string;
}

export function SegmentedControl<T extends string | number>({ options, value, onChange, className = "" }: SegmentedControlProps<T>) {
	return (
		<div className={`flex flex-wrap gap-2 ${className}`}>
			{options.map((opt) => (
				<button
					key={opt.value}
					type="button"
					onClick={() => onChange(opt.value)}
					className={`cursor-pointer rounded-xl border px-3.5 py-2 text-xs font-bold transition-all ${
						value === opt.value
							? "border-transparent bg-gradient-to-r from-[#6D5DF6] to-[#3B82F6] text-white shadow-premium-sm"
							: "border-slate-200 bg-white text-[#6B7280] hover:border-[#6D5DF6]/40 hover:text-[#111827]"
					}`}
				>
					{opt.label}
				</button>
			))}
		</div>
	);
}
