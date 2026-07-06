import { Typography } from "antd";
import { useAppStore } from "../store";
import Sidebar from "../components/sidebar/sidebar";

const { Title, Text } = Typography;

export default function Dashboard() {
	const user = useAppStore((state) => state.user);

	return (
		<div className="flex min-h-svh bg-[#FAFBFF]">
			<Sidebar />
			<main className="flex-1 px-8 py-8">
				<Title level={2} className="!mb-1">
					Dashboard
				</Title>
				<Text type="secondary">
					Signed in as {user?.name} ({user?.email}) &middot; {user?.role}
				</Text>
			</main>
		</div>
	);
}
