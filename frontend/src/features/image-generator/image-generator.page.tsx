import { useState } from "react";
import { DashboardLayout } from "../../components/layout/dashboard-layout";
import { Button } from "../../components/ui";
import { PromptPanel } from "./components/prompt-panel";
import { GenerationSettingsPanel } from "./components/generation-settings-panel";
import { ImageGrid } from "./components/image-grid";
import { PromptHistoryPanel } from "../prompt-history/prompt-history-panel";
import { useImageGeneratorStore } from "./image-generator.store";

export function ImageGeneratorPage() {
	const prompt = useImageGeneratorStore((s) => s.prompt);
	const activeJobId = useImageGeneratorStore((s) => s.activeJobId);
	const isSubmitting = useImageGeneratorStore((s) => s.isSubmitting);
	const images = useImageGeneratorStore((s) => s.images);
	const settings = useImageGeneratorStore((s) => s.settings);
	const generate = useImageGeneratorStore((s) => s.generate);
	const loadPrompt = useImageGeneratorStore((s) => s.loadPrompt);
	const [historyOpen, setHistoryOpen] = useState(false);

	return (
		<DashboardLayout title="AI Image Generator" description="Generate on-brand images in any style, instantly.">
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				<div className="space-y-6 lg:col-span-2">
					<PromptPanel onOpenHistory={() => setHistoryOpen(true)} />

					<Button
						size="lg"
						className="w-full"
						disabled={!prompt.trim() || Boolean(activeJobId) || isSubmitting}
						loading={Boolean(activeJobId) || isSubmitting}
						onClick={() => void generate()}
					>
						{activeJobId || isSubmitting ? "Generating..." : "Generate Image"}
					</Button>

					<ImageGrid images={images} isGenerating={Boolean(activeJobId) || isSubmitting} pendingCount={settings.count} />
				</div>
				<div>
					<GenerationSettingsPanel />
				</div>
			</div>

			<PromptHistoryPanel open={historyOpen} onClose={() => setHistoryOpen(false)} type="image" onReuse={loadPrompt} />
		</DashboardLayout>
	);
}
