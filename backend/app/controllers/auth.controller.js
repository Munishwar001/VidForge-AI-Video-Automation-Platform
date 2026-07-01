import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/db.js';
import { sendPasswordResetEmail } from '../services/mailer.js';

const COOKIE_NAME = 'token';
const isProduction = process.env.NODE_ENV === 'production';
const RESET_TOKEN_TTL_MS = 60 * 60 * 1000;

function hashToken(token) {
	return crypto.createHash('sha256').update(token).digest('hex');
}

function signToken(user) {
	return jwt.sign({ sub: user.id, role: user.role.name }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN || '7d',
	});
}

function setAuthCookie(res, token) {
	res.cookie(COOKIE_NAME, token, {
		httpOnly: true,
		secure: isProduction,
		sameSite: isProduction ? 'none' : 'lax',
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});
}

function sanitizeUser(user) {
	return {
		id: user.id,
		name: user.name,
		email: user.email,
		role: user.role.name,
	};
}

export async function login(req, res) {
	const { email, password } = req.body;

	const user = await prisma.user.findUnique({
		where: { email },
		include: { role: true },
	});
	if (!user) {
		return res.status(401).json({ error: 'Invalid email or password' });
	}

	const passwordMatches = await bcrypt.compare(password, user.password);
	if (!passwordMatches) {
		return res.status(401).json({ error: 'Invalid email or password' });
	}

	const token = signToken(user);
	setAuthCookie(res, token);
	return res.json(sanitizeUser(user));
}

export async function register(req, res) {
	const { name, email, password } = req.body;

	const existingUser = await prisma.user.findUnique({ where: { email } });
	if (existingUser) {
		return res.status(409).json({ error: 'Email is already registered' });
	}

	const role = await prisma.role.findUnique({ where: { name: 'user' } });
	if (!role) {
		return res.status(500).json({ error: 'Default role is not configured' });
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	const user = await prisma.user.create({
		data: { name, email, password: hashedPassword, roleId: role.id },
		include: { role: true },
	});

	return res.status(201).json(sanitizeUser(user));
}

export async function me(req, res) {
	const user = await prisma.user.findUnique({
		where: { id: req.userId },
		include: { role: true },
	});
	if (!user) {
		return res.status(401).json({ error: 'Not authenticated' });
	}
	return res.json(sanitizeUser(user));
}

export async function logout(_req, res) {
	res.clearCookie(COOKIE_NAME);
	return res.json({ success: true });
}

export async function forgotPassword(req, res) {
	const { email } = req.body;
	const genericResponse = { message: 'If that email exists, a reset link has been sent.' };

	const user = await prisma.user.findUnique({ where: { email } });
	if (!user) {
		return res.json(genericResponse);
	}

	await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });

	const rawToken = crypto.randomBytes(32).toString('hex');
	await prisma.passwordResetToken.create({
		data: {
			token: hashToken(rawToken),
			userId: user.id,
			expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS),
		},
	});

	const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${rawToken}`;

	if (!isProduction) {
		console.log(`Password reset link for ${user.email}: ${resetUrl}`);
	}

	try {
		await sendPasswordResetEmail(user.email, resetUrl);
	} catch (error) {
		console.error('Failed to send password reset email', error);
	}

	return res.json(genericResponse);
}

export async function resetPassword(req, res) {
	const { token, password } = req.body;

	const resetToken = await prisma.passwordResetToken.findUnique({
		where: { token: hashToken(token) },
	});

	if (!resetToken || resetToken.usedAt || resetToken.expiresAt < new Date()) {
		return res.status(400).json({ error: 'Invalid or expired reset link' });
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	await prisma.$transaction([
		prisma.user.update({
			where: { id: resetToken.userId },
			data: { password: hashedPassword },
		}),
		prisma.passwordResetToken.update({
			where: { id: resetToken.id },
			data: { usedAt: new Date() },
		}),
	]);

	return res.json({ message: 'Password has been reset. You can now sign in.' });
}
