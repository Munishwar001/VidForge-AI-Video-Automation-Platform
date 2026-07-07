import { Card, Button, Badge } from "../../../components/ui";
import { useAccountStore } from "../../../store/account-store";
import { formatDate } from "../../../libs/format";

const INVOICES = [
	{ id: "inv-1", date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), amount: "$79.00", status: "Paid" },
	{ id: "inv-2", date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), amount: "$79.00", status: "Paid" },
	{ id: "inv-3", date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), amount: "$79.00", status: "Paid" },
];

export function BillingSection() {
	const creditsTotal = useAccountStore((s) => s.creditsTotal);

	return (
		<div className="space-y-6">
			<Card className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
				<div>
					<span className="text-xs font-extrabold uppercase tracking-wider text-[#6D5DF6]">Current Plan</span>
					<h2 className="mt-1 font-heading text-2xl font-extrabold text-[#111827]">Pro</h2>
					<p className="mt-1 text-xs font-semibold text-[#6B7280]">{creditsTotal} credits / month · $79/mo</p>
				</div>
				<Button>Upgrade Plan</Button>
			</Card>

			<Card className="p-6">
				<h3 className="mb-4 font-heading text-base font-bold text-[#111827]">Billing History</h3>
				<div className="space-y-3">
					{INVOICES.map((invoice) => (
						<div key={invoice.id} className="flex items-center justify-between rounded-2xl border border-slate-200/70 p-3.5">
							<div>
								<p className="text-sm font-bold text-[#111827]">{invoice.amount}</p>
								<p className="text-[10px] font-semibold text-[#6B7280]">{formatDate(invoice.date)}</p>
							</div>
							<Badge tone="emerald">{invoice.status}</Badge>
						</div>
					))}
				</div>
			</Card>
		</div>
	);
}
