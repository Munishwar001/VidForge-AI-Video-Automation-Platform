import crypto from 'node:crypto';
import prisma from '../config/db.js';
import { bcryptPass, compareBcrypt } from '../libs/encryption.js';
import { sanitizeUser } from './auth.js';

const NOTIFICATION_FIELD_MAP = {
	generationComplete: 'notifyGenerationComplete',
	creditAlerts: 'notifyCreditAlerts',
	weeklySummary: 'notifyWeeklySummary',
	productUpdates: 'notifyProductUpdates',
};

function randomKey() {
	return `vf_live_${crypto.randomUUID().replace(/-/g, '').slice(0, 32)}`;
}

export async function getSettings(userId) {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		include: {
			apiKeys: { orderBy: { createdAt: 'desc' } },
			roles: { include: { role: true }, orderBy: { createdAt: 'asc' } },
		},
	});

	return {
		profile: sanitizeUser(user),
		theme: user.theme,
		notificationPreferences: {
			generationComplete: user.notifyGenerationComplete,
			creditAlerts: user.notifyCreditAlerts,
			weeklySummary: user.notifyWeeklySummary,
			productUpdates: user.notifyProductUpdates,
		},
		apiKeys: user.apiKeys,
	};
}

export function updateProfile(userId, { name, email }) {
	return prisma.user.update({ where: { id: userId }, data: { name, email } });
}

export async function changePassword(userId, { currentPassword, newPassword }) {
	const user = await prisma.user.findUnique({ where: { id: userId } });
	const matches = await compareBcrypt(user.password, currentPassword);
	if (!matches) {
		const error = new Error('Current password is incorrect');
		error.status = 400;
		throw error;
	}
	const hashedPassword = await bcryptPass(newPassword);
	await prisma.user.update({ where: { id: userId }, data: { password: hashedPassword } });
}

export async function createApiKey(userId, label) {
	const fullKey = randomKey();
	const keyPreview = `${fullKey.slice(0, 12)}••••••••${fullKey.slice(-4)}`;
	const record = await prisma.apiKey.create({ data: { userId, label, keyPreview } });
	return { ...record, fullKey };
}

export async function revokeApiKey(userId, id) {
	const key = await prisma.apiKey.findFirst({ where: { id, userId } });
	if (!key) {
		const error = new Error('API key not found');
		error.status = 404;
		throw error;
	}
	await prisma.apiKey.delete({ where: { id } });
}

export function updateNotificationPreference(userId, key, value) {
	const field = NOTIFICATION_FIELD_MAP[key];
	return prisma.user.update({ where: { id: userId }, data: { [field]: value } });
}

export function updateTheme(userId, theme) {
	return prisma.user.update({ where: { id: userId }, data: { theme } });
}

export function deleteAccount(userId) {
	return prisma.user.delete({ where: { id: userId } });
}
