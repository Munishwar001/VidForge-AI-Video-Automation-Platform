import { Link } from "react-router";
import { Card } from "../../../components/ui";

const actions = [
	{ label: "Generate Video", to: "/videos", icon: "🎬", accent: "from-purple-500 to-indigo-500" },
	{ label: "Generate Image", to: "/images", icon: "🖼️", accent: "from-blue-500 to-cyan-500" },
	{ label: "Media Library", to: "/media-library", icon: "☁️", accent: "from-emerald-500 to-teal-500" },
	{ label: "View Projects", to: "/projects", icon: "📁", accent: "from-pink-500 to-rose-500" },
];

export function QuickActions() {
	return (
		<Card className="p-6">
			<h2 className="mb-4 font-heading text-base font-bold text-[#111827]">Quick Actions</h2>
			<div className="grid grid-cols-2 gap-3">
				{actions.map((action) => (
					<Link
						key={action.label}
						to={action.to}
						className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200/70 p-4 text-center transition-all hover:border-[#6D5DF6]/40 hover:shadow-premium-sm"
					>
						<span
							className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${action.accent} text-lg text-white`}
						>
							{action.icon}
						</span>
						<span className="text-xs font-bold text-[#111827]">{action.label}</span>
					</Link>
				))}
			</div>
		</Card>
	);
}
