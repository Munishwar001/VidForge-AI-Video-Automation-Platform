import { useCallback, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router";
import { Button, Checkbox, Divider, Form, Input, Typography, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { GoogleLogin } from "@react-oauth/google";
import { AxiosError } from "axios";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { zodRule } from "../libs/zod-rule";
import { loginSchema } from "../schemas/auth";
import { mainClient, useAppStore } from "../store";
import logoCube from "../assets/cubeImage.jpg";

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

	const { handleGoogleSuccess, googleSubmitting } = useGoogleAuth();

	return (
		<main className="relative grid min-h-svh place-items-center overflow-hidden bg-white px-5 py-8">
			<div className="pointer-events-none absolute inset-0 bg-grid-faint opacity-40" />
			<div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#1A3BF5]/5 blur-[120px]" />

			<section className="relative z-10 w-full max-w-[440px] rounded-[2.5rem] border border-neutral-200/80 bg-gradient-to-b from-white via-white to-neutral-50/50 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.08)] sm:p-10 overflow-hidden">
				<div className="pointer-events-none absolute inset-0 bg-grid-faint opacity-20" />

				<RouterLink to="/" className="group relative z-10 mb-8 inline-flex items-center gap-3">
					<img
						src={logoCube}
						alt="VidForge AI"
						className="h-10 w-10 shrink-0 object-contain transition-transform duration-500 ease-out group-hover:rotate-[15deg] group-hover:scale-105"
					/>
					<div className="flex flex-col text-left">
						<span className="font-heading text-lg font-extrabold leading-none tracking-tight text-neutral-900">
							VidForge AI
						</span>
						<span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-400">
							AI video automation platform
						</span>
					</div>
				</RouterLink>

				<div className="relative z-10 mb-7 text-left">
					<Title level={2} className="mb-1.5! font-heading! text-neutral-900!">
						Welcome back
					</Title>
					<Text className="text-neutral-500!">Sign in to continue to your workspace.</Text>
				</div>

				<Form<LoginFormValues>
					name="login"
					layout="vertical"
					initialValues={{ remember: true }}
					onFinish={handleFinish}
					onFinishFailed={handleFinishFailed}
					requiredMark={false}
					className="relative z-10"
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
						<RouterLink to="/forgot-password" className="text-[#1A3BF5]! hover:underline">
							Forgot password?
						</RouterLink>
					</div>

					<Form.Item className="mb-0!">
						<Button
							type="primary"
							htmlType="submit"
							size="large"
							loading={submitting}
							block
							className="h-12! rounded-full! bg-neutral-950! font-bold! hover:bg-black!"
						>
							Sign in
						</Button>
					</Form.Item>
				</Form>

				<Divider className="relative z-10 my-6! text-neutral-400! text-xs!">or</Divider>

				<div
					className={`relative z-10 flex justify-center${
						googleSubmitting ? " pointer-events-none opacity-60" : ""
					}`}
				>
					<GoogleLogin
						onSuccess={handleGoogleSuccess}
						onError={() => message.error("Google sign-in failed")}
					/>
				</div>

				<Text className="relative z-10 mt-6 block text-center text-neutral-500!">
					Don't have an account?{" "}
					<RouterLink to="/register" className="text-[#1A3BF5]! font-semibold hover:underline">
						Sign up
					</RouterLink>
				</Text>
			</section>
		</main>
	);
}
