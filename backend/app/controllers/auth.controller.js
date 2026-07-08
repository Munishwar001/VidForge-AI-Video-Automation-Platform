import { OAuth2Client } from 'google-auth-library';
import prisma from '../config/db.js';
import { sendPasswordResetEmail } from '../libs/communication.js';
import { bcryptPass, compareBcrypt, generateToken, hashToken } from '../libs/encryption.js';
import { clearAuthCookie, sanitizeUser, setAuthCookie, signToken } from '../services/auth.js';
import {
	createGoogleUser,
	createUser,
	findUserByEmail,
	findUserByGoogleId,
	findUserById,
	linkGoogleAccount,
	updateUserPassword,
} from '../services/user.js';

const isProduction = process.env.NODE_ENV === 'production';
const RESET_TOKEN_TTL_MS = 60 * 60 * 1000;
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function login(req, res) {
	const { email, password } = req.body;

	const user = await findUserByEmail(email, { includeRole: true });
	if (!user) {
		return res.status(401).json({ error: 'Invalid email or password' });
	}

	const passwordMatches = await compareBcrypt(user.password, password);
	if (!passwordMatches) {
		return res.status(401).json({ error: 'Invalid email or password' });
	}

	const token = signToken(user);
	setAuthCookie(res, token);
	return res.json(sanitizeUser(user));
}

export async function register(req, res) {
	const { name, email, password } = req.body;

	const existingUser = await findUserByEmail(email);
	if (existingUser) {
		return res.status(409).json({ error: 'Email is already registered' });
	}

	const role = await prisma.role.findUnique({ where: { name: 'user' } });
	if (!role) {
		return res.status(500).json({ error: 'Default role is not configured' });
	}

	const hashedPassword = await bcryptPass(password);
	const user = await createUser({ name, email, password: hashedPassword, roleId: role.id });

	return res.status(201).json(sanitizeUser(user));
}

export async function googleAuth(req, res) {
	const { credential } = req.body;

	if (!process.env.GOOGLE_CLIENT_ID) {
		return res.status(500).json({ error: 'Google sign-in is not configured' });
	}

	let payload;
	try {
		const ticket = await googleClient.verifyIdToken({
			idToken: credential,
			audience: process.env.GOOGLE_CLIENT_ID,
		});
		payload = ticket.getPayload();
	} catch {
		return res.status(401).json({ error: 'Invalid Google credential' });
	}

	if (!payload?.email || !payload.email_verified) {
		return res.status(401).json({ error: 'Google account email is not verified' });
	}

	let user = await findUserByGoogleId(payload.sub, { includeRole: true });

	if (!user) {
		const existingUser = await findUserByEmail(payload.email, { includeRole: true });
		if (existingUser) {
			user = await linkGoogleAccount(existingUser.id, payload.sub);
		} else {
			const role = await prisma.role.findUnique({ where: { name: 'user' } });
			if (!role) {
				return res.status(500).json({ error: 'Default role is not configured' });
			}
			user = await createGoogleUser({
				name: payload.name || payload.email,
				email: payload.email,
				googleId: payload.sub,
				roleId: role.id,
			});
		}
	}

	const token = signToken(user);
	setAuthCookie(res, token);
	return res.json(sanitizeUser(user));
}

export async function me(req, res) {
	const user = await findUserById(req.userId, { includeRole: true });
	if (!user) {
		return res.status(401).json({ error: 'Not authenticated' });
	}
	return res.json(sanitizeUser(user));
}

export async function logout(_req, res) {
	clearAuthCookie(res);
	return res.json({ success: true });
}

export async function forgotPassword(req, res) {
	const { email } = req.body;
	const genericResponse = { message: 'If that email exists, a reset link has been sent.' };

	const user = await findUserByEmail(email);
	if (!user) {
		return res.json(genericResponse);
	}

	await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });

	const rawToken = generateToken();
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

	const hashedPassword = await bcryptPass(password);

	await prisma.$transaction([
		updateUserPassword(resetToken.userId, hashedPassword),
		prisma.passwordResetToken.update({
			where: { id: resetToken.id },
			data: { usedAt: new Date() },
		}),
	]);

	return res.json({ message: 'Password has been reset. You can now sign in.' });
}
