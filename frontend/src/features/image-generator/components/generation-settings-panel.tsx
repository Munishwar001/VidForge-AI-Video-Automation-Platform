import { Card, SegmentedControl, NumberStepper } from "../../../components/ui";
import { StylePicker } from "./style-picker";
import { useImageGeneratorStore } from "../image-generator.store";
import type { ImageSize, ImageQuality } from "../types";

const SIZES: { label: string; value: ImageSize }[] = [
	{ label: "1024×1024", value: "1024x1024" },
	{ label: "1024×1792", value: "1024x1792" },
	{ label: "1792×1024", value: "1792x1024" },
];

const QUALITIES: { label: string; value: ImageQuality }[] = [
	{ label: "Standard", value: "Standard" },
	{ label: "HD", value: "HD" },
];

export function GenerationSettingsPanel() {
	const settings = useImageGeneratorStore((s) => s.settings);
	const updateSettings = useImageGeneratorStore((s) => s.updateSettings);

	return (
		<Card className="space-y-5 p-6">
			<h2 className="font-heading text-base font-bold text-[#111827]">Generation Settings</h2>

			<div>
				<span className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#6B7280]">Style</span>
				<StylePicker value={settings.style} onChange={(style) => updateSettings({ style })} />
			</div>

			<div>
				<span className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#6B7280]">Image Size</span>
				<SegmentedControl options={SIZES} value={settings.size} onChange={(size) => updateSettings({ size })} />
			</div>

			<div className="flex items-center justify-between">
				<span className="text-xs font-bold uppercase tracking-wide text-[#6B7280]">Image Count</span>
				<NumberStepper value={settings.count} min={1} max={4} onChange={(count) => updateSettings({ count })} />
			</div>

			<div>
				<span className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#6B7280]">Quality</span>
				<SegmentedControl options={QUALITIES} value={settings.quality} onChange={(quality) => updateSettings({ quality })} />
			</div>
		</Card>
	);
}
