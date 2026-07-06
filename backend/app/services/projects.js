import prisma from '../config/db.js';
import { logActivity } from './activity.js';

export function listProjects(userId) {
	return prisma.project.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
}

export async function renameProject(userId, id, title) {
	await assertOwnership(id, userId);
	return prisma.project.update({ where: { id }, data: { title } });
}

export async function toggleFavorite(userId, id) {
	const project = await assertOwnership(id, userId);
	const updated = await prisma.project.update({ where: { id }, data: { favorite: !project.favorite } });
	if (updated.favorite) {
		await logActivity(userId, 'FAVORITED', `Marked "${project.title}" as favorite`);
	}
	return updated;
}

export async function duplicateProject(userId, id) {
	const project = await assertOwnership(id, userId);
	return prisma.project.create({
		data: {
			userId,
			title: `${project.title} (Copy)`,
			prompt: project.prompt,
			type: project.type,
			status: project.status,
			thumbnail: project.thumbnail,
			duration: project.duration,
			resolution: project.resolution,
			creditsUsed: project.creditsUsed,
			favorite: false,
		},
	});
}

export async function deleteProject(userId, id) {
	const project = await assertOwnership(id, userId);
	await prisma.project.delete({ where: { id } });
	await logActivity(userId, 'DELETED', `Deleted project "${project.title}"`);
	return project;
}

async function assertOwnership(id, userId) {
	const project = await prisma.project.findFirst({ where: { id, userId } });
	if (!project) {
		const error = new Error('Project not found');
		error.status = 404;
		throw error;
	}
	return project;
}
