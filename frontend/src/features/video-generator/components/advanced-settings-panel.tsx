import type { ReactNode } from "react";
import { Card, SegmentedControl, Slider, Toggle, Textarea, FileDropzone, Button } from "../../../components/ui";
import { useVideoGeneratorStore } from "../video-generator.store";
import type { AspectRatio, CameraStyle, VideoDuration, VideoQuality, Fps } from "../types";

const ASPECT_RATIOS: { label: string; value: AspectRatio }[] = [
	{ label: "16:9", value: "16:9" },
	{ label: "9:16", value: "9:16" },
	{ label: "1:1", value: "1:1" },
	{ label: "4:5", value: "4:5" },
];

const DURATIONS: { label: string; value: VideoDuration }[] = [5, 10, 15, 30, 60].map((d) => ({ label: `${d}s`, value: d as VideoDuration }));

const QUALITIES: { label: string; value: VideoQuality }[] = [
	{ label: "Standard", value: "Standard" },
	{ label: "HD", value: "HD" },
	{ label: "4K", value: "4K" },
];

const FPS_OPTIONS: { label: string; value: Fps }[] = [24, 30, 60].map((f) => ({ label: `${f} fps`, value: f as Fps }));

const CAMERA_STYLES: { label: string; value: CameraStyle }[] = [
	{ label: "Static", value: "Static" },
	{ label: "Drone", value: "Drone" },
	{ label: "Cinematic", value: "Cinematic" },
	{ label: "Tracking", value: "Tracking" },
	{ label: "Handheld", value: "Handheld" },
];

function Field({ label, children }: { label: string; children: ReactNode }) {
	return (
		<div>
			<span className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#6B7280]">{label}</span>
			{children}
		</div>
	);
}

export function AdvancedSettingsPanel() {
	const settings = useVideoGeneratorStore((s) => s.settings);
	const updateSettings = useVideoGeneratorStore((s) => s.updateSettings);
	const randomizeSeed = useVideoGeneratorStore((s) => s.randomizeSeed);
	const setReferenceImage = useVideoGeneratorStore((s) => s.setReferenceImage);
	const clearReferenceImage = useVideoGeneratorStore((s) => s.clearReferenceImage);
	const setReferenceVideo = useVideoGeneratorStore((s) => s.setReferenceVideo);
	const clearReferenceVideo = useVideoGeneratorStore((s) => s.clearReferenceVideo);

	return (
		<Card className="space-y-5 p-6">
			<h2 className="font-heading text-base font-bold text-[#111827]">Advanced Settings</h2>

			<Field label="Aspect Ratio">
				<SegmentedControl options={ASPECT_RATIOS} value={settings.aspectRatio} onChange={(v) => updateSettings({ aspectRatio: v })} />
			</Field>

			<Field label="Duration">
				<SegmentedControl options={DURATIONS} value={settings.duration} onChange={(v) => updateSettings({ duration: v })} />
			</Field>

			<Field label="Quality">
				<SegmentedControl options={QUALITIES} value={settings.quality} onChange={(v) => updateSettings({ quality: v })} />
			</Field>

			<Field label="FPS">
				<SegmentedControl options={FPS_OPTIONS} value={settings.fps} onChange={(v) => updateSettings({ fps: v })} />
			</Field>

			<Field label="Camera Style">
				<SegmentedControl options={CAMERA_STYLES} value={settings.cameraStyle} onChange={(v) => updateSettings({ cameraStyle: v })} />
			</Field>

			<Slider
				label="Motion Strength"
				value={settings.motionStrength}
				min={0}
				max={100}
				onChange={(v) => updateSettings({ motionStrength: v })}
				valueLabel={`${settings.motionStrength}%`}
			/>

			<Slider
				label="Creativity"
				value={settings.creativity}
				min={0}
				max={100}
				onChange={(v) => updateSettings({ creativity: v })}
				valueLabel={`${settings.creativity}%`}
			/>

			<Field label="Seed">
				<div className="flex items-center gap-2">
					<input
						type="number"
						value={settings.seed}
						onChange={(e) => updateSettings({ seed: Number(e.target.value) || 0 })}
						className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-[#111827] outline-none focus:border-[#6D5DF6]"
					/>
					<Button variant="secondary" size="sm" onClick={randomizeSeed}>
						Randomize
					</Button>
				</div>
			</Field>

			<Field label="Negative Prompt">
				<Textarea
					value={settings.negativePrompt}
					onChange={(e) => updateSettings({ negativePrompt: e.target.value })}
					placeholder="Elements to avoid — blurry, watermark, low quality..."
					className="min-h-20"
				/>
			</Field>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<Field label="Reference Image">
					<FileDropzone
						accept="image/*"
						label={settings.referenceImageName ?? "Upload reference image"}
						hint="PNG, JPG up to 10MB"
						preview={settings.referenceImage}
						onFile={(file) => void setReferenceImage(file)}
						onClear={settings.referenceImage ? clearReferenceImage : undefined}
					/>
				</Field>
				<Field label="Reference Video">
					<FileDropzone
						accept="video/*"
						label={settings.referenceVideoName ?? "Upload reference video"}
						hint="MP4, MOV up to 200MB"
						onFile={(file) => setReferenceVideo(file)}
						onClear={settings.referenceVideoName ? clearReferenceVideo : undefined}
					/>
				</Field>
			</div>

			<div className="space-y-4 rounded-2xl border border-slate-200/70 p-4">
				<Toggle
					label="Voice Over"
					description="Generate an AI narration track"
					checked={settings.voiceOver}
					onChange={(v) => updateSettings({ voiceOver: v })}
				/>
				<Toggle
					label="Background Music"
					description="Auto-select a matching soundtrack"
					checked={settings.backgroundMusic}
					onChange={(v) => updateSettings({ backgroundMusic: v })}
				/>
				<Toggle
					label="Subtitles"
					description="Burn in animated captions"
					checked={settings.subtitles}
					onChange={(v) => updateSettings({ subtitles: v })}
				/>
			</div>
		</Card>
	);
}
