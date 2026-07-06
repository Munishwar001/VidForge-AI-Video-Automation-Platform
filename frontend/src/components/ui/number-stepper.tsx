interface NumberStepperProps {
	value: number;
	min: number;
	max: number;
	onChange: (value: number) => void;
}

export function NumberStepper({ value, min, max, onChange }: NumberStepperProps) {
	return (
		<div className="inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-2 py-1.5">
			<button
				type="button"
				disabled={value <= min}
				onClick={() => onChange(value - 1)}
				className="h-6 w-6 cursor-pointer rounded-lg text-sm font-bold text-[#6D5DF6] hover:bg-purple-50 disabled:cursor-not-allowed disabled:opacity-30"
			>
				−
			</button>
			<span className="w-4 text-center text-sm font-bold text-[#111827]">{value}</span>
			<button
				type="button"
				disabled={value >= max}
				onClick={() => onChange(value + 1)}
				className="h-6 w-6 cursor-pointer rounded-lg text-sm font-bold text-[#6D5DF6] hover:bg-purple-50 disabled:cursor-not-allowed disabled:opacity-30"
			>
				+
			</button>
		</div>
	);
}
