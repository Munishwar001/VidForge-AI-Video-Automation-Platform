import { IMAGE_STYLES } from "../types";
import type { ImageStyle } from "../types";

interface StylePickerProps {
	value: ImageStyle;
	onChange: (style: ImageStyle) => void;
}

export function StylePicker({ value, onChange }: StylePickerProps) {
	return (
		<div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
			{IMAGE_STYLES.map((style) => (
				<button
					key={style}
					type="button"
					onClick={() => onChange(style)}
					className={`cursor-pointer rounded-xl border px-3 py-2.5 text-xs font-bold transition-all ${
						value === style
							? "border-transparent bg-gradient-to-r from-[#6D5DF6] to-[#3B82F6] text-white shadow-premium-sm"
							: "border-slate-200 bg-white text-[#6B7280] hover:border-[#6D5DF6]/40 hover:text-[#111827]"
					}`}
				>
					{style}
				</button>
			))}
		</div>
	);
}
