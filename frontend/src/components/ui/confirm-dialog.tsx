import { Modal } from "./modal";
import { Button } from "./button";

interface ConfirmDialogProps {
	open: boolean;
	title: string;
	description: string;
	confirmLabel?: string;
	danger?: boolean;
	loading?: boolean;
	onConfirm: () => void;
	onCancel: () => void;
}

export function ConfirmDialog({
	open,
	title,
	description,
	confirmLabel = "Confirm",
	danger,
	loading,
	onConfirm,
	onCancel,
}: ConfirmDialogProps) {
	return (
		<Modal
			open={open}
			onClose={onCancel}
			title={title}
			maxWidth="max-w-sm"
			footer={
				<>
					<Button variant="secondary" size="sm" onClick={onCancel}>
						Cancel
					</Button>
					<Button variant={danger ? "danger" : "primary"} size="sm" loading={loading} onClick={onConfirm}>
						{confirmLabel}
					</Button>
				</>
			}
		>
			<p className="text-sm text-[#6B7280]">{description}</p>
		</Modal>
	);
}
