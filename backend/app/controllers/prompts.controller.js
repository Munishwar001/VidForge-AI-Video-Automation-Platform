import * as promptsService from '../services/prompts.js';
import { toApiEnum, toDbEnum } from '../libs/enum-map.js';

function serialize(entry) {
	return { ...entry, type: toApiEnum(entry.type) };
}

export async function list(req, res) {
	const entries = await promptsService.listPrompts(req.userId);
	return res.json(entries.map(serialize));
}

export async function create(req, res) {
	const entry = await promptsService.addPrompt(req.userId, req.body.text, toDbEnum(req.body.type));
	return res.status(201).json(serialize(entry));
}

export async function favorite(req, res) {
	const entry = await promptsService.toggleFavorite(req.userId, req.params.id);
	return res.json(serialize(entry));
}

export async function remove(req, res) {
	await promptsService.deletePrompt(req.userId, req.params.id);
	return res.status(204).send();
}
