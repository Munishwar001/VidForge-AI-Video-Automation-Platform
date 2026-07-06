interface SliderProps {
	label?: string;
	value: number;
	min: number;
	max: number;
	step?: number;
	onChange: (value: number) => void;
	valueLabel?: string;
}

export function Slider({ label, value, min, max, step = 1, onChange, valueLabel }: SliderProps) {
	return (
		<div>
			{label && (
				<div className="mb-2 flex items-center justify-between">
					<span className="text-xs font-bold uppercase tracking-wide text-[#6B7280]">{label}</span>
					<span className="text-xs font-bold text-[#6D5DF6]">{valueLabel ?? value}</span>
				</div>
			)}
			<input
				type="range"
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={(e) => onChange(Number(e.target.value))}
				className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-[#6D5DF6]"
			/>
		</div>
	);
}
