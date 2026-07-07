import jwt from 'jsonwebtoken';

const COOKIE_NAME = 'token';
const isProduction = process.env.NODE_ENV === 'production';

export function signToken(user) {
	const roles = getRoleNames(user);
	return jwt.sign({ sub: user.id, role: roles[0], roles }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN || '7d',
	});
}

export function setAuthCookie(res, token) {
	res.cookie(COOKIE_NAME, token, {
		httpOnly: true,
		secure: isProduction,
		sameSite: isProduction ? 'none' : 'lax',
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});
}

export function clearAuthCookie(res) {
	res.clearCookie(COOKIE_NAME);
}

function getRoleNames(user) {
	return user.roles?.map((userRole) => userRole.role.name) || [];
}

export function sanitizeUser(user) {
	const roles = getRoleNames(user);
	return {
		id: user.id,
		name: user.name,
		email: user.email,
		role: roles[0] || null,
		roles,
	};
}
