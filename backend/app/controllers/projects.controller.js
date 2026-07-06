import * as projectsService from '../services/projects.js';
import { toApiEnum } from '../libs/enum-map.js';

function serialize(project) {
	return { ...project, type: toApiEnum(project.type), status: toApiEnum(project.status) };
}

export async function list(req, res) {
	const projects = await projectsService.listProjects(req.userId);
	return res.json(projects.map(serialize));
}

export async function rename(req, res) {
	const project = await projectsService.renameProject(req.userId, req.params.id, req.body.title);
	return res.json(serialize(project));
}

export async function favorite(req, res) {
	const project = await projectsService.toggleFavorite(req.userId, req.params.id);
	return res.json(serialize(project));
}

export async function duplicate(req, res) {
	const project = await projectsService.duplicateProject(req.userId, req.params.id);
	return res.status(201).json(serialize(project));
}

export async function remove(req, res) {
	await projectsService.deleteProject(req.userId, req.params.id);
	return res.status(204).send();
}
