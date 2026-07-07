import { useState } from "react";
import { message } from "antd";
import { AxiosError } from "axios";
import { Card, Button } from "../../../components/ui";
import { useSettingsStore } from "../settings.store";

export function PasswordSection() {
	const changePassword = useSettingsStore((s) => s.changePassword);
	const [current, setCurrent] = useState("");
	const [next, setNext] = useState("");
	const [confirm, setConfirm] = useState("");
	const [saving, setSaving] = useState(false);

	const handleSave = async () => {
		if (!current || !next || !confirm) {
			message.error("Please fill in all password fields.");
			return;
		}
		if (next.length < 8) {
			message.error("New password must be at least 8 characters.");
			return;
		}
		if (next !== confirm) {
			message.error("Passwords do not match.");
			return;
		}
		setSaving(true);
		try {
			await changePassword(current, next);
			setCurrent("");
			setNext("");
			setConfirm("");
			message.success("Password updated.");
		} catch (error) {
			if (error instanceof AxiosError && error.response?.data?.error) {
				message.error(String(error.response.data.error));
			} else {
				message.error("Failed to update password.");
			}
		} finally {
			setSaving(false);
		}
	};

	return (
		<Card className="space-y-5 p-6">
			<h2 className="font-heading text-base font-bold text-[#111827]">Password</h2>
			<Field label="Current Password" value={current} onChange={setCurrent} />
			<Field label="New Password" value={next} onChange={setNext} />
			<Field label="Confirm New Password" value={confirm} onChange={setConfirm} />
			<Button loading={saving} onClick={() => void handleSave()}>
				Update Password
			</Button>
		</Card>
	);
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
	return (
		<div>
			<label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#6B7280]">{label}</label>
			<input
				type="password"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#6D5DF6]"
			/>
		</div>
	);
}
