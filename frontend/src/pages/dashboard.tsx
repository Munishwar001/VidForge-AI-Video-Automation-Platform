import { useCallback } from "react";
import { useNavigate } from "react-router";
import { Button, Typography } from "antd";
import { useAppStore } from "../store";

const { Title, Text } = Typography;

export default function Dashboard() {
	const user = useAppStore((state) => state.user);
	const logout = useAppStore((state) => state.logout);
	const navigate = useNavigate();

	const handleLogout = useCallback(async () => {
		await logout();
		navigate("/login");
	}, [logout, navigate]);

	return (
		<main className="min-h-svh px-5 py-8">
			<div className="mx-auto flex max-w-3xl items-center justify-between">
				<div>
					<Title level={2} className="!mb-1">
						Dashboard
					</Title>
					<Text type="secondary">
						Signed in as {user?.name} ({user?.email}) &middot; {user?.role}
					</Text>
				</div>
				<Button onClick={handleLogout}>Sign out</Button>
			</div>
		</main>
	);
}
