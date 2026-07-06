import prisma from '../config/db.js';
import { placeholderImage } from '../libs/placeholder.js';
import { logActivity } from './activity.js';

function inferType(mimetype) {
	if (mimetype.startsWith('video')) return 'VIDEO';
	if (mimetype.startsWith('audio')) return 'AUDIO';
	return 'IMAGE';
}

export function listMedia(userId) {
	return prisma.mediaItem.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
}

export function listFolders(userId) {
	return prisma.mediaFolder.findMany({ where: { userId }, orderBy: { name: 'asc' } });
}

export async function uploadMedia(userId, file, folderId) {
	const type = inferType(file.mimetype);
	const previewHeight = type === 'AUDIO' ? 200 : type === 'VIDEO' ? 360 : 400;
	const thumbnail = placeholderImage(file.originalname, file.originalname, 640, previewHeight);

	const item = await prisma.mediaItem.create({
		data: {
			userId,
			name: file.originalname,
			type,
			url: thumbnail,
			thumbnail,
			folderId: folderId || null,
			sizeBytes: file.size,
		},
	});

	await prisma.user.update({ where: { id: userId }, data: { storageUsedBytes: { increment: file.size } } });
	await logActivity(userId, 'UPLOADED', `Uploaded ${file.originalname}`);

	return item;
}

export async function renameMedia(userId, id, name) {
	await assertOwnership(id, userId);
	return prisma.mediaItem.update({ where: { id }, data: { name } });
}

export async function deleteMedia(userId, id) {
	const item = await assertOwnership(id, userId);
	await prisma.mediaItem.delete({ where: { id } });
	await prisma.user.update({ where: { id: userId }, data: { storageUsedBytes: { decrement: item.sizeBytes } } });
	return item;
}

export async function bulkDeleteMedia(userId, ids) {
	const items = await prisma.mediaItem.findMany({ where: { id: { in: ids }, userId } });
	const freed = items.reduce((sum, item) => sum + item.sizeBytes, 0);
	await prisma.mediaItem.deleteMany({ where: { id: { in: ids }, userId } });
	if (freed > 0) {
		await prisma.user.update({ where: { id: userId }, data: { storageUsedBytes: { decrement: freed } } });
	}
	return items;
}

async function assertOwnership(id, userId) {
	const item = await prisma.mediaItem.findFirst({ where: { id, userId } });
	if (!item) {
		const error = new Error('Media item not found');
		error.status = 404;
		throw error;
	}
	return item;
}
