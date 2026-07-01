import { z } from "zod";

export const emailSchema = z
	.string()
	.trim()
	.min(1, "Please enter your email.")
	.email("Please enter a valid email.");

export const loginSchema = z.object({
	email: emailSchema,
	password: z.string().min(1, "Please enter your password."),
});

export const registerObjectSchema = z.object({
	name: z.string().trim().min(1, "Please enter your name."),
	email: emailSchema,
	password: z.string().min(8, "Password must be at least 8 characters."),
	confirmPassword: z.string().min(1, "Please confirm your password."),
});

export const registerSchema = registerObjectSchema.refine(
	(data) => data.password === data.confirmPassword,
	{ message: "Passwords do not match.", path: ["confirmPassword"] }
);

export const forgotPasswordSchema = z.object({
	email: emailSchema,
});

export const resetPasswordObjectSchema = z.object({
	password: z.string().min(8, "Password must be at least 8 characters."),
	confirmPassword: z.string().min(1, "Please confirm your password."),
});

export const resetPasswordSchema = resetPasswordObjectSchema.refine(
	(data) => data.password === data.confirmPassword,
	{ message: "Passwords do not match.", path: ["confirmPassword"] }
);
