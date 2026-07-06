import { useEffect, useMemo, useState } from "react";
import { Drawer, Button, EmptyState } from "../../components/ui";
import { usePromptHistoryStore } from "./prompt-history.store";
import { formatRelativeTime } from "../../libs/format";
import type { GenerationType } from "../../@types/generation";

interface PromptHistoryPanelProps {
	open: boolean;
	onClose: () => void;
	type: GenerationType;
	onReuse: (text: string) => void;
}

export function PromptHistoryPanel({ open, onClose, type, onReuse }: PromptHistoryPanelProps) {
	const entries = usePromptHistoryStore((s) => s.entries);
	const fetchEntries = usePromptHistoryStore((s) => s.fetchEntries);
	const toggleFavorite = usePromptHistoryStore((s) => s.toggleFavorite);
	const deleteEntry = usePromptHistoryStore((s) => s.deleteEntry);
	const [search, setSearch] = useState("");

	useEffect(() => {
		if (open) void fetchEntries();
	}, [open, fetchEntries]);

	const filtered = useMemo(() => {
		const query = search.toLowerCase();
		return entries.filter((e) => e.type === type).filter((e) => e.text.toLowerCase().includes(query));
	}, [entries, type, search]);

	const handleCopy = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
		} catch {
			// clipboard permissions unavailable in this context; safe to ignore
		}
	};

	return (
		<Drawer open={open} onClose={onClose} title="Prompt History">
			<input
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder="Search prompts..."
				className="mb-4 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm outline-none focus:border-[#6D5DF6]"
			/>
			{filtered.length === 0 ? (
				<EmptyState icon="🕓" title="No prompts found" description="Prompts you generate with will show up here automatically." />
			) : (
				<div className="space-y-3">
					{filtered.map((entry) => (
						<div key={entry.id} className="rounded-2xl border border-slate-200/80 p-3.5">
							<p className="text-xs font-semibold leading-relaxed text-[#111827]">{entry.text}</p>
							<div className="mt-2 flex items-center justify-between">
								<span className="text-[10px] font-semibold text-[#6B7280]">{formatRelativeTime(entry.createdAt)}</span>
								<div className="flex items-center gap-2.5">
									<button
										onClick={() => toggleFavorite(entry.id)}
										className={`cursor-pointer text-sm ${entry.favorite ? "text-amber-400" : "text-slate-300"}`}
									>
										★
									</button>
									<button
										onClick={() => handleCopy(entry.text)}
										className="cursor-pointer text-[10px] font-bold text-[#6B7280] hover:text-[#111827]"
									>
										Copy
									</button>
									<button
										onClick={() => deleteEntry(entry.id)}
										className="cursor-pointer text-[10px] font-bold text-red-400 hover:text-red-600"
									>
										Delete
									</button>
								</div>
							</div>
							<Button
								variant="secondary"
								size="sm"
								className="mt-2.5 w-full"
								onClick={() => {
									onReuse(entry.text);
									onClose();
								}}
							>
								Reuse Prompt
							</Button>
						</div>
					))}
				</div>
			)}
		</Drawer>
	);
}
