import { useCallback, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router";
import { Button, Checkbox, Form, Input, Typography, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { AxiosError } from "axios";
import { zodRule } from "../libs/zod-rule";
import { loginSchema } from "../schemas/auth";
import { mainClient, useAppStore } from "../store";

const { Title, Text } = Typography;

type LoginFormValues = {
	email: string;
	password: string;
	remember: boolean;
};

export default function Login() {
	const [submitting, setSubmitting] = useState(false);
	const navigate = useNavigate();
	const init = useAppStore((state) => state.init);

	const handleFinish = useCallback(
		async (values: LoginFormValues) => {
			setSubmitting(true);
			try {
				await mainClient.request("POST", "/auth/login", {
					data: { email: values.email, password: values.password },
				});
				await init();
				return navigate("/dashboard");
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
		[init, navigate]
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
						Welcome back
					</Title>
					<Text type="secondary">Sign in to continue to your workspace.</Text>
				</div>

				<Form<LoginFormValues>
					name="login"
					layout="vertical"
					initialValues={{ remember: true }}
					onFinish={handleFinish}
					onFinishFailed={handleFinishFailed}
					requiredMark={false}
				>
					<Form.Item
						label="Email"
						name="email"
						rules={[zodRule(loginSchema.shape.email)]}
					>
						<Input prefix={<UserOutlined />} placeholder="you@example.com" size="large" />
					</Form.Item>

					<Form.Item
						label="Password"
						name="password"
						rules={[zodRule(loginSchema.shape.password)]}
					>
						<Input.Password prefix={<LockOutlined />} placeholder="••••••••" size="large" />
					</Form.Item>

					<div className="mb-5 flex items-center justify-between">
						<Form.Item name="remember" valuePropName="checked" noStyle>
							<Checkbox>Remember me</Checkbox>
						</Form.Item>
						<RouterLink to="/forgot-password" className="text-(--accent)! hover:underline">
							Forgot password?
						</RouterLink>
					</div>

					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							size="large"
							loading={submitting}
							block
						>
							Sign in
						</Button>
					</Form.Item>
				</Form>

				<Text className="mt-2 block text-center">
					Don't have an account?{" "}
					<RouterLink to="/register" className="text-(--accent)! hover:underline">
						Sign up
					</RouterLink>
				</Text>
			</section>
		</main>
	);
}
