import prisma from '../config/db.js';

export async function getStats(userId) {
	const user = await prisma.user.findUnique({ where: { id: userId } });
	return {
		creditsRemaining: user.creditsRemaining,
		creditsTotal: user.creditsTotal,
		totalVideosGenerated: user.totalVideosGenerated,
		totalImagesGenerated: user.totalImagesGenerated,
		storageUsedBytes: user.storageUsedBytes,
		storageLimitBytes: user.storageLimitBytes,
	};
}

export function getActivity(userId, limit = 10) {
	return prisma.activityItem.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, take: limit });
}
