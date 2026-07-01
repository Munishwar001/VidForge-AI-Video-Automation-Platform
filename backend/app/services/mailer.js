import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST || 'smtp.gmail.com',
	port: Number(process.env.SMTP_PORT) || 587,
	secure: false,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASSWORD,
	},
});

export async function sendPasswordResetEmail(to, resetUrl) {
	await transporter.sendMail({
		from: process.env.SMTP_FROM || process.env.SMTP_USER,
		to,
		subject: 'Reset your VidForge AI password',
		html: `
			<p>You requested a password reset for your VidForge AI account.</p>
			<p><a href="${resetUrl}">Click here to reset your password</a></p>
			<p>This link expires in 1 hour. If you didn't request this, you can ignore this email.</p>
		`,
	});
}
