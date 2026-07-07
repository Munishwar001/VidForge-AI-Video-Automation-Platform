import { Card, Button, Textarea, Select } from "../../../components/ui";
import { useVideoGeneratorStore } from "../video-generator.store";
import { usePromptHistoryStore } from "../../prompt-history/prompt-history.store";
import { PROMPT_TEMPLATES } from "../types";

const MAX_LENGTH = 800;

interface PromptPanelProps {
	onOpenHistory: () => void;
}

export function PromptPanel({ onOpenHistory }: PromptPanelProps) {
	const prompt = useVideoGeneratorStore((s) => s.prompt);
	const setPrompt = useVideoGeneratorStore((s) => s.setPrompt);
	const clearPrompt = useVideoGeneratorStore((s) => s.clearPrompt);
	const improvePrompt = useVideoGeneratorStore((s) => s.improvePrompt);
	const isImprovingPrompt = useVideoGeneratorStore((s) => s.isImprovingPrompt);
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
		<Card className="p-6">
			<div className="mb-4 flex items-center justify-between">
				<h2 className="font-heading text-base font-bold text-[#111827]">Prompt</h2>
				<div className="flex items-center gap-2">
					<Select
						defaultValue=""
						onChange={(e) => {
							const template = PROMPT_TEMPLATES.find((t) => t.label === e.target.value);
							if (template) setPrompt(template.text);
							e.target.value = "";
						}}
					>
						<option value="" disabled>
							Templates
						</option>
						{PROMPT_TEMPLATES.map((t) => (
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

			<Textarea
				value={prompt}
				onChange={(e) => setPrompt(e.target.value.slice(0, MAX_LENGTH))}
				placeholder="Describe the video you want to generate — setting, mood, camera style, action..."
				className="min-h-32"
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
					<Button variant="ghost" size="sm" disabled={!prompt} onClick={() => addEntry("video", prompt)}>
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
		</Card>
	);
}
