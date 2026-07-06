import { useCallback, type ReactNode } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAppStore } from "../../store";

const LogoIcon = () => (
	<svg className="h-7 w-7 text-[#6D5DF6]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

const DashboardIcon = () => (
	<svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
	</svg>
);

const ProjectsIcon = () => (
	<svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
	</svg>
);

const TemplatesIcon = () => (
	<svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5h16v4H4V5zm0 6h7v8H4v-8zm9 0h7v8h-7v-8z" />
	</svg>
);

const MediaIcon = () => (
	<svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" />
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16l5-5 4 4 3-3 6 6" />
		<circle cx="8" cy="9" r="1.5" fill="currentColor" stroke="none" />
	</svg>
);

const SettingsIcon = () => (
	<svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
		<circle cx="12" cy="12" r="3" strokeWidth={2} />
	</svg>
);

const LogoutIcon = () => (
	<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 5v1a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h6a2 2 0 012 2v1" />
	</svg>
);

type NavItem = {
	label: string;
	icon: ReactNode;
	path?: string;
};

const navItems: NavItem[] = [
	{ label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
	{ label: "Projects", icon: <ProjectsIcon /> },
	{ label: "Templates", icon: <TemplatesIcon /> },
	{ label: "Media Library", icon: <MediaIcon /> },
	{ label: "Settings", icon: <SettingsIcon /> },
];

export default function Sidebar() {
	const user = useAppStore((state) => state.user);
	const logout = useAppStore((state) => state.logout);
	const navigate = useNavigate();

	const handleLogout = useCallback(async () => {
		await logout();
		navigate("/login");
	}, [logout, navigate]);

	const initials = user?.name
		? user.name
				.split(" ")
				.filter(Boolean)
				.slice(0, 2)
				.map((part) => part[0]!.toUpperCase())
				.join("")
		: "?";

	return (
		<aside className="flex h-svh w-64 shrink-0 flex-col border-r border-slate-200/70 bg-white/90 backdrop-blur-md">
			<div className="flex items-center gap-2.5 px-6 py-6">
				<LogoIcon />
				<span className="font-heading text-lg font-bold tracking-tight text-[#111827]">
					VidForge <span className="bg-gradient-to-r from-[#6D5DF6] to-[#3B82F6] bg-clip-text text-transparent">AI</span>
				</span>
			</div>

			<nav className="flex-1 space-y-1 px-4">
				{navItems.map((item) =>
					item.path ? (
						<NavLink
							key={item.label}
							to={item.path}
							end
							className={({ isActive }) =>
								`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors ${
									isActive
										? "border-purple-100 bg-purple-50 text-[#6D5DF6]"
										: "border-transparent text-[#6B7280] hover:bg-slate-100 hover:text-[#111827]"
								}`
							}
						>
							{item.icon}
							{item.label}
						</NavLink>
					) : (
						<div
							key={item.label}
							className="flex cursor-not-allowed items-center justify-between gap-3 rounded-xl border border-transparent px-3 py-2.5 text-sm font-semibold text-slate-350"
						>
							<span className="flex items-center gap-3">
								{item.icon}
								{item.label}
							</span>
							<span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-slate-400">
								Soon
							</span>
						</div>
					)
				)}
			</nav>

			<div className="border-t border-slate-200/70 p-4">
				<div className="flex items-center gap-2.5 rounded-xl bg-slate-50 px-3 py-2.5">
					<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-[#6D5DF6]">
						{initials}
					</div>
					<div className="min-w-0 flex-1">
						<p className="truncate text-xs font-bold text-[#111827]">{user?.name}</p>
						<p className="truncate text-[10px] font-medium text-[#6B7280]">{user?.email}</p>
					</div>
				</div>
				<button
					onClick={handleLogout}
					className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-[#111827] transition-colors hover:bg-slate-50"
				>
					<LogoutIcon />
					Sign out
				</button>
			</div>
		</aside>
	);
}
