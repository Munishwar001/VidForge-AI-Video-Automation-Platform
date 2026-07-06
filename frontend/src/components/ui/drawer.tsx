import { useEffect } from "react";
import type { ReactNode } from "react";

interface DrawerProps {
	open: boolean;
	onClose: () => void;
	title: string;
	children: ReactNode;
	widthClassName?: string;
}

export function Drawer({ open, onClose, title, children, widthClassName = "max-w-md" }: DrawerProps) {
	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [open, onClose]);

	return (
		<div className={`fixed inset-0 z-100 ${open ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!open}>
			<div
				className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${
					open ? "opacity-100" : "opacity-0"
				}`}
				onClick={onClose}
			/>
			<div
				className={`absolute right-0 top-0 flex h-full w-full ${widthClassName} flex-col border-l border-slate-200 bg-white shadow-premium-lg transition-transform duration-300 ${
					open ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<div className="flex items-center justify-between border-b border-slate-200/70 px-6 py-5">
					<h3 className="font-heading text-base font-bold text-[#111827]">{title}</h3>
					<button
						onClick={onClose}
						className="cursor-pointer rounded-lg p-1.5 text-[#6B7280] hover:bg-slate-100 hover:text-[#111827]"
					>
						<CloseIcon />
					</button>
				</div>
				<div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
			</div>
		</div>
	);
}

function CloseIcon() {
	return (
		<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
		</svg>
	);
}
