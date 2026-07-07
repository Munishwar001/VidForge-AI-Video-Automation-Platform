import { useState } from "react";
import { DashboardLayout } from "../../components/layout/dashboard-layout";
import { Button } from "../../components/ui";
import { PromptPanel } from "./components/prompt-panel";
import { AdvancedSettingsPanel } from "./components/advanced-settings-panel";
import { GenerationProgress } from "./components/generation-progress";
import { ResultCard } from "./components/result-card";
import { PromptHistoryPanel } from "../prompt-history/prompt-history-panel";
import { useVideoGeneratorStore } from "./video-generator.store";

export function VideoGeneratorPage() {
	const prompt = useVideoGeneratorStore((s) => s.prompt);
	const activeJobId = useVideoGeneratorStore((s) => s.activeJobId);
	const isSubmitting = useVideoGeneratorStore((s) => s.isSubmitting);
	const result = useVideoGeneratorStore((s) => s.result);
	const generate = useVideoGeneratorStore((s) => s.generate);
	const cancelGeneration = useVideoGeneratorStore((s) => s.cancelGeneration);
	const loadPrompt = useVideoGeneratorStore((s) => s.loadPrompt);
	const [historyOpen, setHistoryOpen] = useState(false);

	return (
		<DashboardLayout title="AI Video Generator" description="Turn a single prompt into a studio-quality video.">
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
						{activeJobId || isSubmitting ? "Generating..." : "Generate Video"}
					</Button>

					{activeJobId && <GenerationProgress jobId={activeJobId} onCancel={cancelGeneration} />}
					{!activeJobId && result && <ResultCard result={result} />}
				</div>
				<div>
					<AdvancedSettingsPanel />
				</div>
			</div>

			<PromptHistoryPanel open={historyOpen} onClose={() => setHistoryOpen(false)} type="video" onReuse={loadPrompt} />
		</DashboardLayout>
	);
}
