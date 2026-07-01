import { useCallback, useState } from "react";
import { Link as RouterLink, useNavigate, useSearchParams } from "react-router";
import { Button, Form, Input, Typography, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { AxiosError } from "axios";
import { zodRule } from "../libs/zod-rule";
import { resetPasswordObjectSchema } from "../schemas/auth";
import { mainClient } from "../store";

const { Title, Text } = Typography;

type ResetPasswordFormValues = {
	password: string;
	confirmPassword: string;
};

export default function ResetPassword() {
	const [submitting, setSubmitting] = useState(false);
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token");

	const handleFinish = useCallback(
		async (values: ResetPasswordFormValues) => {
			if (!token) {
				message.error("This reset link is invalid.");
				return;
			}
			setSubmitting(true);
			try {
				await mainClient.resetPassword(token, values.password);
				message.success("Password has been reset. Please sign in.");
				navigate("/login");
			} catch (err) {
				if (err instanceof AxiosError) {
					const data = err.response?.data;
					if (data && typeof data === "object" && "error" in data) {
						message.error(String(data.error));
						return;
					}
				}
				if (err instanceof Error) {
					message.error(err.message);
					return;
				}
				message.error("Something went wrong");
			} finally {
				setSubmitting(false);
			}
		},
		[navigate, token]
	);

	return (
		<main className="grid min-h-svh place-items-center px-5 py-8">
			<section className="w-full max-w-[420px] rounded-[28px] border border-[var(--border)] bg-gradient-to-b from-white/70 to-white p-8 shadow-[var(--shadow)] sm:p-10">
				<div className="mb-7 text-left">
					<Text className="!mb-2 block text-xs uppercase tracking-[0.22em] !text-[var(--accent)]">
						VidForge AI
					</Text>
					<Title level={2} className="!mb-1.5">
						Reset password
					</Title>
					<Text type="secondary">Choose a new password for your account.</Text>
				</div>

				{!token ? (
					<Text type="danger">
						This reset link is missing or invalid. Please request a new one.
					</Text>
				) : (
					<Form<ResetPasswordFormValues>
						name="reset-password"
						layout="vertical"
						onFinish={handleFinish}
						requiredMark={false}
					>
						<Form.Item
							label="New password"
							name="password"
							rules={[zodRule(resetPasswordObjectSchema.shape.password)]}
							hasFeedback
						>
							<Input.Password prefix={<LockOutlined />} placeholder="••••••••" size="large" />
						</Form.Item>

						<Form.Item
							label="Confirm new password"
							name="confirmPassword"
							dependencies={["password"]}
							hasFeedback
							rules={[
								zodRule(resetPasswordObjectSchema.shape.confirmPassword),
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue("password") === value) {
											return Promise.resolve();
										}
										return Promise.reject(new Error("Passwords do not match."));
									},
								}),
							]}
						>
							<Input.Password prefix={<LockOutlined />} placeholder="••••••••" size="large" />
						</Form.Item>

						<Form.Item className="mt-6">
							<Button
								type="primary"
								htmlType="submit"
								size="large"
								loading={submitting}
								block
							>
								Reset password
							</Button>
						</Form.Item>
					</Form>
				)}

				<Text className="mt-2 block text-center">
					Back to{" "}
					<RouterLink to="/login" className="text-(--accent)! hover:underline">
						Sign in
					</RouterLink>
				</Text>
			</section>
		</main>
	);
}
