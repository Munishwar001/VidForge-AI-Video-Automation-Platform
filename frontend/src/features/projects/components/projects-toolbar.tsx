import { SegmentedControl, Select } from "../../../components/ui";

export type FilterOption = "all" | "videos" | "images" | "completed" | "failed";
export type SortOption = "newest" | "oldest" | "favorites";

const FILTERS: { label: string; value: FilterOption }[] = [
	{ label: "All", value: "all" },
	{ label: "Videos", value: "videos" },
	{ label: "Images", value: "images" },
	{ label: "Completed", value: "completed" },
	{ label: "Failed", value: "failed" },
];

const SORTS: { label: string; value: SortOption }[] = [
	{ label: "Newest", value: "newest" },
	{ label: "Oldest", value: "oldest" },
	{ label: "Favorites", value: "favorites" },
];

interface ProjectsToolbarProps {
	search: string;
	onSearchChange: (value: string) => void;
	filter: FilterOption;
	onFilterChange: (value: FilterOption) => void;
	sort: SortOption;
	onSortChange: (value: SortOption) => void;
}

export function ProjectsToolbar({ search, onSearchChange, filter, onFilterChange, sort, onSortChange }: ProjectsToolbarProps) {
	return (
		<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
			<input
				value={search}
				onChange={(e) => onSearchChange(e.target.value)}
				placeholder="Search projects..."
				className="w-full max-w-xs rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[#6D5DF6]"
			/>
			<div className="flex flex-wrap items-center gap-3">
				<SegmentedControl options={FILTERS} value={filter} onChange={onFilterChange} />
				<Select value={sort} onChange={(e) => onSortChange(e.target.value as SortOption)}>
					{SORTS.map((s) => (
						<option key={s.value} value={s.value}>
							{s.label}
						</option>
					))}
				</Select>
			</div>
		</div>
	);
}
