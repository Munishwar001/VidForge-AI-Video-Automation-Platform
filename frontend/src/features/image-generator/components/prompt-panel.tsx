import { Card, Button, Textarea, Select, FileDropzone } from "../../../components/ui";
import { useImageGeneratorStore } from "../image-generator.store";
import { usePromptHistoryStore } from "../../prompt-history/prompt-history.store";
import { IMAGE_PROMPT_TEMPLATES } from "../types";

const MAX_LENGTH = 600;

interface PromptPanelProps {
	onOpenHistory: () => void;
}

export function PromptPanel({ onOpenHistory }: PromptPanelProps) {
	const prompt = useImageGeneratorStore((s) => s.prompt);
	const setPrompt = useImageGeneratorStore((s) => s.setPrompt);
	const clearPrompt = useImageGeneratorStore((s) => s.clearPrompt);
	const improvePrompt = useImageGeneratorStore((s) => s.improvePrompt);
	const isImprovingPrompt = useImageGeneratorStore((s) => s.isImprovingPrompt);
	const settings = useImageGeneratorStore((s) => s.settings);
	const updateSettings = useImageGeneratorStore((s) => s.updateSettings);
	const setReferenceImage = useImageGeneratorStore((s) => s.setReferenceImage);
	const clearReferenceImage = useImageGeneratorStore((s) => s.clearReferenceImage);
	const addEntry = usePromptHistoryStore((s) => s.addEntry);

	const handleCopy = async () => {
		if (!prompt) return;
		try {
			await navigator.clipboard.writeText(prompt);
		} catch {
			// clipboard permissions unavailable; safe to ignore
		}
	};

	return (
		<Card className="space-y-5 p-6">
			<div className="flex items-center justify-between">
				<h2 className="font-heading text-base font-bold text-[#111827]">Prompt</h2>
				<div className="flex items-center gap-2">
					<Select
						defaultValue=""
						onChange={(e) => {
							const template = IMAGE_PROMPT_TEMPLATES.find((t) => t.label === e.target.value);
							if (template) setPrompt(template.text);
							e.target.value = "";
						}}
					>
						<option value="" disabled>
							Templates
						</option>
						{IMAGE_PROMPT_TEMPLATES.map((t) => (
							<option key={t.label} value={t.label}>
								{t.label}
							</option>
						))}
					</Select>
					<Button variant="ghost" size="sm" onClick={onOpenHistory}>
						History
					</Button>
				</div>
			</div>

			<div>
				<Textarea
					value={prompt}
					onChange={(e) => setPrompt(e.target.value.slice(0, MAX_LENGTH))}
					placeholder="Describe the image you want to generate..."
					className="min-h-28"
					maxLength={MAX_LENGTH}
				/>
				<div className="mt-2 flex items-center justify-between">
					<span className="text-[10px] font-semibold text-[#6B7280]">
						{prompt.length} / {MAX_LENGTH}
					</span>
					<div className="flex flex-wrap items-center gap-2">
						<Button variant="secondary" size="sm" loading={isImprovingPrompt} onClick={() => void improvePrompt()}>
							✦ Improve Prompt
						</Button>
						<Button variant="ghost" size="sm" disabled={!prompt} onClick={() => addEntry("image", prompt)}>
							Save
						</Button>
						<Button variant="ghost" size="sm" disabled={!prompt} onClick={() => void handleCopy()}>
							Copy
						</Button>
						<Button variant="ghost" size="sm" disabled={!prompt} onClick={clearPrompt}>
							Clear
						</Button>
					</div>
				</div>
			</div>

			<div>
				<span className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#6B7280]">Negative Prompt</span>
				<Textarea
					value={settings.negativePrompt}
					onChange={(e) => updateSettings({ negativePrompt: e.target.value })}
					placeholder="Elements to avoid — blurry, watermark, extra limbs..."
					className="min-h-20"
				/>
			</div>

			<div>
				<span className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#6B7280]">Reference Image</span>
				<FileDropzone
					accept="image/*"
					label={settings.referenceImageName ?? "Upload reference image"}
					hint="PNG, JPG up to 10MB"
					preview={settings.referenceImage}
					onFile={(file) => void setReferenceImage(file)}
					onClear={settings.referenceImage ? clearReferenceImage : undefined}
				/>
			</div>
		</Card>
	);
}
