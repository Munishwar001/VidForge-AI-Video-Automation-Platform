import { useEffect, useRef } from "react";
import type { RefObject } from "react";

export function useClickOutside<T extends HTMLElement>(onOutsideClick: () => void, active = true): RefObject<T | null> {
	const ref = useRef<T | null>(null);

	useEffect(() => {
		if (!active) return;

		const handler = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				onOutsideClick();
			}
		};

		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, [onOutsideClick, active]);

	return ref;
}
