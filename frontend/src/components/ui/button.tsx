import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	loading?: boolean;
	icon?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
	primary:
		"bg-gradient-to-r from-[#6D5DF6] to-[#3B82F6] text-white shadow-premium-sm hover:from-[#5C4EE5] hover:to-[#2563EB]",
	secondary: "bg-white border border-slate-200 text-[#111827] hover:bg-slate-50 shadow-premium-sm",
	ghost: "bg-transparent text-[#6B7280] hover:bg-slate-100 hover:text-[#111827]",
	danger: "bg-red-50 border border-red-200 text-red-600 hover:bg-red-100",
};

const sizeClasses: Record<ButtonSize, string> = {
	sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
	md: "px-4 py-2.5 text-sm rounded-xl gap-2",
	lg: "px-6 py-3.5 text-sm rounded-2xl gap-2",
};

export function Button({
	variant = "primary",
	size = "md",
	loading,
	icon,
	disabled,
	className = "",
	children,
	...props
}: ButtonProps) {
	return (
		<button
			disabled={disabled || loading}
			className={`inline-flex cursor-pointer items-center justify-center font-bold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
			{...props}
		>
			{loading ? <Spinner /> : icon}
			{children}
		</button>
	);
}

function Spinner() {
	return <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />;
}
