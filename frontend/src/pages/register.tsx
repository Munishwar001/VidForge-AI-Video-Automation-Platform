import { useCallback, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router";
import { Button, Form, Input, Typography, message } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { AxiosError } from "axios";
import { zodRule } from "../libs/zod-rule";
import { registerObjectSchema } from "../schemas/auth";
import { mainClient } from "../store";

const { Title, Text } = Typography;

type RegisterFormValues = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
};

export default function Register() {
	const [submitting, setSubmitting] = useState(false);
	const navigate = useNavigate();

	const handleFinish = useCallback(
		async (values: RegisterFormValues) => {
			setSubmitting(true);
			try {
				await mainClient.request("POST", "/auth/register", {
					data: {
						name: values.name,
						email: values.email,
						password: values.password,
					},
				});
				message.success("Account created. Please sign in.");
				return navigate("/login");
			} catch (err) {
				if (err instanceof AxiosError) {
					const data = err.response?.data;
					if (data && typeof data === "object" && "error" in data) {
						return message.error(String(data.error));
					}
				}
				if (err instanceof Error) {
					return message.error(err.message);
				}
				return message.error("Something went wrong");
			} finally {
				setSubmitting(false);
			}
		},
		[navigate]
	);

	const handleFinishFailed = () => {
		message.error("Please fix the errors and try again.");
	};

	return (
		<main className="grid min-h-svh place-items-center px-5 py-8">
			<section className="w-full max-w-[420px] rounded-[28px] border border-[var(--border)] bg-gradient-to-b from-white/70 to-white p-8 shadow-[var(--shadow)] sm:p-10">
				<div className="mb-7 text-left">
					<Text className="!mb-2 block text-xs uppercase tracking-[0.22em] !text-[var(--accent)]">
						VidForge AI
					</Text>
					<Title level={2} className="!mb-1.5">
						Create your account
					</Title>
					<Text type="secondary">Start automating your video workflow.</Text>
				</div>

				<Form<RegisterFormValues>
					name="register"
					layout="vertical"
					onFinish={handleFinish}
					onFinishFailed={handleFinishFailed}
					requiredMark={false}
				>
					<Form.Item
						label="Full name"
						name="name"
						rules={[zodRule(registerObjectSchema.shape.name)]}
					>
						<Input prefix={<UserOutlined />} placeholder="Jane Doe" size="large" />
					</Form.Item>

					<Form.Item
						label="Email"
						name="email"
						rules={[zodRule(registerObjectSchema.shape.email)]}
					>
						<Input prefix={<MailOutlined />} placeholder="you@example.com" size="large" />
					</Form.Item>

					<Form.Item
						label="Password"
						name="password"
						rules={[zodRule(registerObjectSchema.shape.password)]}
						hasFeedback
					>
						<Input.Password prefix={<LockOutlined />} placeholder="••••••••" size="large" />
					</Form.Item>

					<Form.Item
						label="Confirm password"
						name="confirmPassword"
						dependencies={["password"]}
						hasFeedback
						rules={[
							zodRule(registerObjectSchema.shape.confirmPassword),
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
							Create account
						</Button>
					</Form.Item>
				</Form>

				<Text className="mt-2 block text-center">
					Already have an account?{" "}
					<RouterLink to="/login" className="text-(--accent)! hover:underline">
						Sign in
					</RouterLink>
				</Text>
			</section>
		</main>
	);
}
