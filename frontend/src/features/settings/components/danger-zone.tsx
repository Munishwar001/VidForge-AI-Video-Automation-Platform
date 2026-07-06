import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, Button, ConfirmDialog } from "../../../components/ui";
import { useAppStore } from "../../../store";
import { useSettingsStore } from "../settings.store";

export function DangerZone() {
	const [confirmDeleteAccount, setConfirmDeleteAccount] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const logout = useAppStore((s) => s.logout);
	const deleteAccount = useSettingsStore((s) => s.deleteAccount);
	const navigate = useNavigate();

	const handleDeleteAccount = async () => {
		setDeleting(true);
		try {
			await deleteAccount();
			await logout();
			navigate("/login");
		} finally {
			setDeleting(false);
		}
	};

	return (
		<Card className="space-y-4 border-red-200 p-6">
			<h2 className="font-heading text-base font-bold text-red-600">Danger Zone</h2>

			<div className="flex items-center justify-between rounded-2xl border border-red-100 bg-red-50/40 p-4">
				<div>
					<p className="text-sm font-bold text-[#111827]">Delete account</p>
					<p className="text-xs text-[#6B7280]">Permanently delete your account and all associated data.</p>
				</div>
				<Button variant="danger" size="sm" onClick={() => setConfirmDeleteAccount(true)}>
					Delete Account
				</Button>
			</div>

			<ConfirmDialog
				open={confirmDeleteAccount}
				title="Delete your account?"
				description="This action is permanent and cannot be undone."
				confirmLabel="Delete Account"
				danger
				loading={deleting}
				onConfirm={() => void handleDeleteAccount()}
				onCancel={() => setConfirmDeleteAccount(false)}
			/>
		</Card>
	);
}
