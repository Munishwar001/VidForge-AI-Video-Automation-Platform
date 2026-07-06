export function toDbEnum(value) {
	return typeof value === 'string' ? value.toUpperCase() : value;
}

export function toApiEnum(value) {
	return typeof value === 'string' ? value.toLowerCase() : value;
}
