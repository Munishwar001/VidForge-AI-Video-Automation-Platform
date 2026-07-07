import { Card } from "../../../components/ui";
import { useSettingsStore } from "../settings.store";

export function ThemeSection() {
	const theme = useSettingsStore((s) => s.theme);
	const setTheme = useSettingsStore((s) => s.setTheme);

	return (
		<Card className="space-y-4 p-6">
			<h2 className="font-heading text-base font-bold text-[#111827]">Theme</h2>
			<div className="grid grid-cols-2 gap-3">
				{(["light", "dark"] as const).map((option) => (
					<button
						key={option}
						onClick={() => setTheme(option)}
						className={`cursor-pointer rounded-2xl border p-4 text-left transition-all ${
							theme === option ? "border-[#6D5DF6] bg-purple-50/50" : "border-slate-200 hover:border-[#6D5DF6]/40"
						}`}
					>
						<span className="text-sm font-bold capitalize text-[#111827]">{option}</span>
						<p className="mt-1 text-xs text-[#6B7280]">
							{option === "light" ? "Bright interface, ideal for daytime." : "Reduced brightness for low-light environments."}
						</p>
					</button>
				))}
			</div>
			<p className="text-[10px] font-semibold text-[#6B7280]">
				Preference saved to your account. Full dark mode theming is coming soon.
			</p>
		</Card>
	);
}
