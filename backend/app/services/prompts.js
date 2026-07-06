import prisma from '../config/db.js';

export function listPrompts(userId) {
	return prisma.promptHistoryEntry.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, take: 50 });
}

export async function addPrompt(userId, text, type) {
	const trimmed = text.trim();
	const existing = await prisma.promptHistoryEntry.findFirst({ where: { userId, type, text: trimmed } });
	if (existing) return existing;
	return prisma.promptHistoryEntry.create({ data: { userId, text: trimmed, type } });
}

export async function toggleFavorite(userId, id) {
	const entry = await assertOwnership(id, userId);
	return prisma.promptHistoryEntry.update({ where: { id }, data: { favorite: !entry.favorite } });
}

export async function deletePrompt(userId, id) {
	await assertOwnership(id, userId);
	await prisma.promptHistoryEntry.delete({ where: { id } });
}

async function assertOwnership(id, userId) {
	const entry = await prisma.promptHistoryEntry.findFirst({ where: { id, userId } });
	if (!entry) {
		const error = new Error('Prompt not found');
		error.status = 404;
		throw error;
	}
	return entry;
}
