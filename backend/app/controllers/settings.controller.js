import * as settingsService from '../services/settings.js';
import { clearAuthCookie } from '../services/auth.js';

export async function get(req, res) {
	const data = await settingsService.getSettings(req.userId);
	return res.json(data);
}

export async function updateProfile(req, res) {
	const user = await settingsService.updateProfile(req.userId, req.body);
	return res.json({ id: user.id, name: user.name, email: user.email });
}

export async function changePassword(req, res) {
	await settingsService.changePassword(req.userId, req.body);
	return res.json({ message: 'Password updated successfully.' });
}

export async function createApiKey(req, res) {
	const result = await settingsService.createApiKey(req.userId, req.body.label);
	return res.status(201).json(result);
}

export async function revokeApiKey(req, res) {
	await settingsService.revokeApiKey(req.userId, req.params.id);
	return res.status(204).send();
}

export async function updateNotification(req, res) {
	await settingsService.updateNotificationPreference(req.userId, req.body.key, req.body.value);
	return res.json({ success: true });
}

export async function updateTheme(req, res) {
	await settingsService.updateTheme(req.userId, req.body.theme);
	return res.json({ success: true });
}

export async function deleteAccount(req, res) {
	await settingsService.deleteAccount(req.userId);
	clearAuthCookie(res);
	return res.status(204).send();
}
