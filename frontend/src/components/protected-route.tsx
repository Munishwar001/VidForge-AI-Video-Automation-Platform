import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAppStore } from "../store";

export function ProtectedRoute({ children }: { children: ReactNode }) {
	const user = useAppStore((state) => state.user);

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	return children;
}
