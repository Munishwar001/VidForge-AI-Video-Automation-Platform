import { Skeleton } from "../../../components/ui";

export function GeneratingSkeletons({ count }: { count: number }) {
	return (
		<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
			{Array.from({ length: count }).map((_, idx) => (
				<Skeleton key={idx} className="aspect-square w-full rounded-2xl" />
			))}
		</div>
	);
}
