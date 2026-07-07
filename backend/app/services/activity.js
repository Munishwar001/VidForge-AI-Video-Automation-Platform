import prisma from '../config/db.js';

export function logActivity(userId, type, message) {
	return prisma.activityItem.create({ data: { userId, type, message } });
}
