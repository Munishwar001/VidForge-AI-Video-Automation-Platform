import { useEffect } from "react";
import type { ReactNode } from "react";

interface ModalProps {
	open: boolean;
	onClose: () => void;
	title?: string;
	children: ReactNode;
	footer?: ReactNode;
	maxWidth?: string;
}

export function Modal({ open, onClose, title, children, footer, maxWidth = "max-w-lg" }: ModalProps) {
	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [open, onClose]);

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-100 flex items-center justify-center p-4">
			<div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
			<div className={`relative w-full ${maxWidth} rounded-3xl border border-slate-200 bg-white p-6 shadow-premium-lg`}>
				{title && <h3 className="mb-4 font-heading text-lg font-bold text-[#111827]">{title}</h3>}
				{children}
				{footer && <div className="mt-6 flex justify-end gap-3">{footer}</div>}
			</div>
		</div>
	);
}
