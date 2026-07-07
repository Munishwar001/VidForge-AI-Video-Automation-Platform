import { useCallback, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router";
import { Button, Form, Input, Typography, message } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { AxiosError } from "axios";
import { zodRule } from "../libs/zod-rule";
import { registerObjectSchema } from "../schemas/auth";
import { mainClient } from "../store";
import logoCube from "../assets/cubeImage.jpg";

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
		<main className="relative grid min-h-svh place-items-center overflow-hidden bg-white px-5 py-8">
			<div className="pointer-events-none absolute inset-0 bg-grid-faint opacity-40" />
			<div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#1A3BF5]/5 blur-[120px]" />

			<section className="relative w-full max-w-[440px] rounded-[2.5rem] border border-neutral-200/80 bg-gradient-to-b from-white via-white to-neutral-50/50 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.08)] sm:p-10 overflow-hidden">
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
						Create your account
					</Title>
					<Text className="text-neutral-500!">Start automating your video workflow.</Text>
				</div>

				<Form<RegisterFormValues>
					name="register"
					layout="vertical"
					onFinish={handleFinish}
					onFinishFailed={handleFinishFailed}
					requiredMark={false}
					className="relative z-10"
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

					<Form.Item className="mt-6!">
						<Button
							type="primary"
							htmlType="submit"
							size="large"
							loading={submitting}
							block
							className="h-12! rounded-full! bg-neutral-950! font-bold! hover:bg-black!"
						>
							Create account
						</Button>
					</Form.Item>
				</Form>

				<Text className="relative z-10 mt-6 block text-center text-neutral-500!">
					Already have an account?{" "}
					<RouterLink to="/login" className="text-[#1A3BF5]! font-semibold hover:underline">
						Sign in
					</RouterLink>
				</Text>
			</section>
		</main>
	);
}
