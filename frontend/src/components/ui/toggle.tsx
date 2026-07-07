interface ToggleProps {
	checked: boolean;
	onChange: (checked: boolean) => void;
	label?: string;
	description?: string;
	disabled?: boolean;
}

export function Toggle({ checked, onChange, label, description, disabled }: ToggleProps) {
	return (
		<div className={`flex items-center justify-between gap-4 ${disabled ? "opacity-50" : ""}`}>
			{(label || description) && (
				<span className="flex flex-col">
					{label && <span className="text-sm font-semibold text-[#111827]">{label}</span>}
					{description && <span className="text-xs text-[#6B7280]">{description}</span>}
				</span>
			)}
			<button
				type="button"
				role="switch"
				aria-checked={checked}
				disabled={disabled}
				onClick={() => onChange(!checked)}
				className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 disabled:cursor-not-allowed ${
					checked ? "bg-gradient-to-r from-[#6D5DF6] to-[#3B82F6]" : "bg-slate-200"
				}`}
			>
				<span
					className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
						checked ? "translate-x-[22px]" : "translate-x-0.5"
					}`}
				/>
			</button>
		</div>
	);
}
