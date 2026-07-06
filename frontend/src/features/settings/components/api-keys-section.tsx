import { useState } from "react";
import { Card, Button, ConfirmDialog, Modal } from "../../../components/ui";
import { useSettingsStore } from "../settings.store";
import { formatDate } from "../../../libs/format";

export function ApiKeysSection() {
	const apiKeys = useSettingsStore((s) => s.apiKeys);
	const generateApiKey = useSettingsStore((s) => s.generateApiKey);
	const revokeApiKey = useSettingsStore((s) => s.revokeApiKey);
	const [newKey, setNewKey] = useState<string | null>(null);
	const [revokeId, setRevokeId] = useState<string | null>(null);

	const handleGenerate = async () => {
		const key = await generateApiKey(`Key ${apiKeys.length + 1}`);
		setNewKey(key);
	};

	return (
		<Card className="space-y-5 p-6">
			<div className="flex items-center justify-between">
				<h2 className="font-heading text-base font-bold text-[#111827]">API Keys</h2>
				<Button size="sm" onClick={() => void handleGenerate()}>
					Generate New Key
				</Button>
			</div>
			<div className="space-y-3">
				{apiKeys.map((key) => (
					<div key={key.id} className="flex items-center justify-between rounded-2xl border border-slate-200/80 p-4">
						<div>
							<p className="text-sm font-bold text-[#111827]">{key.label}</p>
							<p className="mt-0.5 font-mono text-xs text-[#6B7280]">{key.keyPreview}</p>
							<p className="mt-1 text-[10px] font-semibold text-[#6B7280]">Created {formatDate(key.createdAt)}</p>
						</div>
						<Button variant="danger" size="sm" onClick={() => setRevokeId(key.id)}>
							Revoke
						</Button>
					</div>
				))}
				{apiKeys.length === 0 && <p className="text-sm text-[#6B7280]">No API keys yet.</p>}
			</div>

			<Modal
				open={!!newKey}
				onClose={() => setNewKey(null)}
				title="New API key created"
				footer={
					<Button size="sm" onClick={() => setNewKey(null)}>
						Done
					</Button>
				}
			>
				<p className="mb-3 text-sm text-[#6B7280]">Copy this key now — you won't be able to see it again.</p>
				<code className="block break-all rounded-xl bg-slate-50 p-3 text-xs font-bold text-[#111827]">{newKey}</code>
			</Modal>

			<ConfirmDialog
				open={!!revokeId}
				title="Revoke this API key?"
				description="Applications using this key will immediately lose access."
				confirmLabel="Revoke"
				danger
				onConfirm={() => {
					if (revokeId) revokeApiKey(revokeId);
					setRevokeId(null);
				}}
				onCancel={() => setRevokeId(null)}
			/>
		</Card>
	);
}
