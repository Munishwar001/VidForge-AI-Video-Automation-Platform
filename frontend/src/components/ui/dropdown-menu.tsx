import { useState } from "react";
import type { ReactNode } from "react";
import { useClickOutside } from "../../libs/use-click-outside";

export interface DropdownMenuItem {
	label: string;
	onClick: () => void;
	danger?: boolean;
	icon?: ReactNode;
}

interface DropdownMenuProps {
	items: DropdownMenuItem[];
	trigger?: ReactNode;
}

export function DropdownMenu({ items, trigger }: DropdownMenuProps) {
	const [open, setOpen] = useState(false);
	const ref = useClickOutside<HTMLDivElement>(() => setOpen(false), open);

	return (
		<div className="relative" ref={ref}>
			<button
				type="button"
				onClick={(e) => {
					e.stopPropagation();
					setOpen((v) => !v);
				}}
				className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#6B7280] hover:bg-slate-100 hover:text-[#111827]"
			>
				{trigger ?? <DotsIcon />}
			</button>
			{open && (
				<div className="absolute right-0 top-9 z-20 w-44 overflow-hidden rounded-2xl border border-slate-200 bg-white py-1.5 shadow-premium-lg">
					{items.map((item) => (
						<button
							key={item.label}
							onClick={(e) => {
								e.stopPropagation();
								setOpen(false);
								item.onClick();
							}}
							className={`flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-xs font-semibold ${
								item.danger ? "text-red-500 hover:bg-red-50" : "text-[#111827] hover:bg-slate-50"
							}`}
						>
							{item.icon}
							{item.label}
						</button>
					))}
				</div>
			)}
		</div>
	);
}

function DotsIcon() {
	return (
		<svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
			<circle cx="5" cy="12" r="2" />
			<circle cx="12" cy="12" r="2" />
			<circle cx="19" cy="12" r="2" />
		</svg>
	);
}
