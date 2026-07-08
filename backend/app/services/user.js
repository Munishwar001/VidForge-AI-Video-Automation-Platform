import prisma from '../config/db.js';

export function findUserByEmail(email, { includeRole = false } = {}) {
	return prisma.user.findUnique({
		where: { email },
		...(includeRole ? { include: { roles: { include: { role: true }, orderBy: { createdAt: 'asc' } } } } : {}),
	});
}

export function findUserById(id, { includeRole = false } = {}) {
	return prisma.user.findUnique({
		where: { id },
		...(includeRole ? { include: { roles: { include: { role: true }, orderBy: { createdAt: 'asc' } } } } : {}),
	});
}

export function findUserByGoogleId(googleId, { includeRole = false } = {}) {
	return prisma.user.findUnique({
		where: { googleId },
		...(includeRole ? { include: { roles: { include: { role: true }, orderBy: { createdAt: 'asc' } } } } : {}),
	});
}

export function createUser({ name, email, password, roleId }) {
	return prisma.user.create({
		data: {
			name,
			email,
			password,
			roles: {
				create: { roleId },
			},
		},
		include: { roles: { include: { role: true }, orderBy: { createdAt: 'asc' } } },
	});
}

export function createGoogleUser({ name, email, googleId, roleId }) {
	return prisma.user.create({
		data: {
			name,
			email,
			googleId,
			roles: {
				create: { roleId },
			},
		},
		include: { roles: { include: { role: true }, orderBy: { createdAt: 'asc' } } },
	});
}

export function linkGoogleAccount(id, googleId) {
	return prisma.user.update({
		where: { id },
		data: { googleId },
		include: { roles: { include: { role: true }, orderBy: { createdAt: 'asc' } } },
	});
}

export function updateUserPassword(id, password) {
	return prisma.user.update({
		where: { id },
		data: { password },
	});
}
