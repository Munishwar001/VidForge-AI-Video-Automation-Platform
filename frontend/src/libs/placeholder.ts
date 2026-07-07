const PALETTE = ["#6D5DF6", "#3B82F6", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B", "#6366F1"];

function hashCode(input: string): number {
	let hash = 0;
	for (let i = 0; i < input.length; i++) {
		hash = (hash << 5) - hash + input.charCodeAt(i);
		hash |= 0;
	}
	return Math.abs(hash);
}

function escapeXml(input: string): string {
	return input.replace(/[<>&'"]/g, (char) => {
		switch (char) {
			case "<":
				return "&lt;";
			case ">":
				return "&gt;";
			case "&":
				return "&amp;";
			case "'":
				return "&apos;";
			default:
				return "&quot;";
		}
	});
}

export function placeholderImage(seed: string, label?: string, width = 400, height = 225): string {
	const hash = hashCode(seed);
	const color1 = PALETTE[hash % PALETTE.length];
	const color2 = PALETTE[(hash + 3) % PALETTE.length];
	const truncatedLabel = label && label.length > 42 ? `${label.slice(0, 42)}…` : label;

	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
		<defs>
			<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
				<stop offset="0%" stop-color="${color1}" />
				<stop offset="100%" stop-color="${color2}" />
			</linearGradient>
		</defs>
		<rect width="100%" height="100%" fill="url(#g)" />
		${
			truncatedLabel
				? `<text x="50%" y="50%" font-family="Inter, sans-serif" font-size="${Math.max(12, width / 26)}" font-weight="600" fill="#ffffff" fill-opacity="0.92" text-anchor="middle" dominant-baseline="middle">${escapeXml(
						truncatedLabel
				  )}</text>`
				: ""
		}
	</svg>`;

	return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
