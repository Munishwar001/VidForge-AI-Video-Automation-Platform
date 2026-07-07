import * as generationService from '../services/generation.js';
import { toApiEnum } from '../libs/enum-map.js';

function serialize(job) {
	return {
		id: job.id,
		title: job.title,
		type: toApiEnum(job.type),
		stage: toApiEnum(job.stage),
		progress: job.progress,
		etaSeconds: job.etaSeconds,
		credits: job.credits,
		createdAt: job.createdAt,
		error: job.error || undefined,
		resultProjectIds: job.resultProjectIds,
	};
}

export async function list(req, res) {
	const jobs = await generationService.listJobs(req.userId);
	return res.json(jobs.map(serialize));
}

export async function createVideo(req, res) {
	const job = await generationService.createVideoJob(req.userId, req.body);
	return res.status(201).json(serialize(job));
}

export async function createImage(req, res) {
	const job = await generationService.createImageJob(req.userId, req.body);
	return res.status(201).json(serialize(job));
}

export async function cancel(req, res) {
	const job = await generationService.cancelJob(req.userId, req.params.id);
	return res.json(serialize(job));
}

export async function retry(req, res) {
	const job = await generationService.retryJob(req.userId, req.params.id);
	return res.json(serialize(job));
}
