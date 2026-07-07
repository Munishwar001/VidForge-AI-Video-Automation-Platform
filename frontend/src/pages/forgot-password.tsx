import { useCallback, useState } from "react";
import { Link as RouterLink } from "react-router";
import { Button, Form, Input, Typography, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { AxiosError } from "axios";
import { zodRule } from "../libs/zod-rule";
import { forgotPasswordSchema } from "../schemas/auth";
import { mainClient } from "../store";

const { Title, Text } = Typography;

type ForgotPasswordFormValues = {
	email: string;
};

export default function ForgotPassword() {
	const [submitting, setSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const handleFinish = useCallback(async (values: ForgotPasswordFormValues) => {
		setSubmitting(true);
		try {
			await mainClient.forgotPassword(values.email);
			setSubmitted(true);
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
	}, []);

	return (
		<main className="grid min-h-svh place-items-center px-5 py-8">
			<section className="w-full max-w-[420px] rounded-[28px] border border-[var(--border)] bg-gradient-to-b from-white/70 to-white p-8 shadow-[var(--shadow)] sm:p-10">
				<div className="mb-7 text-left">
					<Text className="!mb-2 block text-xs uppercase tracking-[0.22em] !text-[var(--accent)]">
						VidForge AI
					</Text>
					<Title level={2} className="!mb-1.5">
						Forgot password
					</Title>
					<Text type="secondary">
						Enter your email and we'll send you a link to reset your password.
					</Text>
				</div>

				{submitted ? (
					<Text>
						If that email exists, a reset link has been sent. Check your inbox.
					</Text>
				) : (
					<Form<ForgotPasswordFormValues>
						name="forgot-password"
						layout="vertical"
						onFinish={handleFinish}
						requiredMark={false}
					>
						<Form.Item
							label="Email"
							name="email"
							rules={[zodRule(forgotPasswordSchema.shape.email)]}
						>
							<Input prefix={<MailOutlined />} placeholder="you@example.com" size="large" />
						</Form.Item>

						<Form.Item className="mt-6">
							<Button
								type="primary"
								htmlType="submit"
								size="large"
								loading={submitting}
								block
							>
								Send reset link
							</Button>
						</Form.Item>
					</Form>
				)}

				<Text className="mt-2 block text-center">
					Remembered your password?{" "}
					<RouterLink to="/login" className="text-(--accent)! hover:underline">
						Sign in
					</RouterLink>
				</Text>
			</section>
		</main>
	);
}
