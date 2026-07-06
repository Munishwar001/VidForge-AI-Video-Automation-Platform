import { useState } from "react";
import { message } from "antd";
import { Card, Button } from "../../../components/ui";
import { useAppStore } from "../../../store";
import { useSettingsStore } from "../settings.store";

export function ProfileSection() {
	const user = useAppStore((s) => s.user);
	const updateProfile = useSettingsStore((s) => s.updateProfile);
	const [name, setName] = useState(user?.name ?? "");
	const [email, setEmail] = useState(user?.email ?? "");
	const [saving, setSaving] = useState(false);

	const handleSave = async () => {
		setSaving(true);
		try {
			await updateProfile(name.trim(), email.trim());
			message.success("Profile updated.");
		} catch (error) {
			message.error(error instanceof Error ? error.message : "Failed to update profile.");
		} finally {
			setSaving(false);
		}
	};

	return (
		<Card className="space-y-5 p-6">
			<h2 className="font-heading text-base font-bold text-[#111827]">Profile</h2>
			<div>
				<label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#6B7280]">Full Name</label>
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#6D5DF6]"
				/>
			</div>
			<div>
				<label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#6B7280]">Email</label>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#6D5DF6]"
				/>
			</div>
			<Button loading={saving} onClick={() => void handleSave()}>
				Save Changes
			</Button>
		</Card>
	);
}
