export function formatBytes(bytes: number, decimals = 1): string {
	if (bytes <= 0) return "0 B";
	const units = ["B", "KB", "MB", "GB", "TB"];
	const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
	const value = bytes / Math.pow(1024, exponent);
	return `${value.toFixed(exponent === 0 ? 0 : decimals)} ${units[exponent]}`;
}

export function formatDuration(totalSeconds: number): string {
	const seconds = Math.max(0, Math.round(totalSeconds));
	const minutes = Math.floor(seconds / 60);
	const remainder = seconds % 60;
	return `${minutes}:${remainder.toString().padStart(2, "0")}`;
}

export function formatEta(totalSeconds: number): string {
	const seconds = Math.max(0, Math.round(totalSeconds));
	if (seconds < 60) return `${seconds}s`;
	const minutes = Math.floor(seconds / 60);
	const remainder = seconds % 60;
	return `${minutes}m ${remainder}s`;
}

export function formatRelativeTime(iso: string): string {
	const date = new Date(iso).getTime();
	const diffMs = Date.now() - date;
	const diffSeconds = Math.round(diffMs / 1000);

	if (diffSeconds < 60) return "just now";
	const diffMinutes = Math.round(diffSeconds / 60);
	if (diffMinutes < 60) return `${diffMinutes}m ago`;
	const diffHours = Math.round(diffMinutes / 60);
	if (diffHours < 24) return `${diffHours}h ago`;
	const diffDays = Math.round(diffHours / 24);
	if (diffDays < 30) return `${diffDays}d ago`;
	const diffMonths = Math.round(diffDays / 30);
	return `${diffMonths}mo ago`;
}

export function formatDate(iso: string): string {
	return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}
