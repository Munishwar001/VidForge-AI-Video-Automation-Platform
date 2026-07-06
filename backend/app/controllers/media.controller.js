import * as mediaService from '../services/media.js';
import { toApiEnum } from '../libs/enum-map.js';

function serialize(item) {
	return { ...item, type: toApiEnum(item.type) };
}

export async function list(req, res) {
	const items = await mediaService.listMedia(req.userId);
	return res.json(items.map(serialize));
}

export async function folders(req, res) {
	const items = await mediaService.listFolders(req.userId);
	return res.json(items);
}

export async function upload(req, res) {
	if (!req.file) {
		return res.status(400).json({ error: 'No file uploaded' });
	}
	const item = await mediaService.uploadMedia(req.userId, req.file, req.body.folderId);
	return res.status(201).json(serialize(item));
}

export async function rename(req, res) {
	const item = await mediaService.renameMedia(req.userId, req.params.id, req.body.name);
	return res.json(serialize(item));
}

export async function remove(req, res) {
	await mediaService.deleteMedia(req.userId, req.params.id);
	return res.status(204).send();
}

export async function bulkRemove(req, res) {
	await mediaService.bulkDeleteMedia(req.userId, req.body.ids);
	return res.status(204).send();
}
