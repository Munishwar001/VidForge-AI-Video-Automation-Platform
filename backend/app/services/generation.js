import prisma from '../config/db.js';
import { placeholderImage } from '../libs/placeholder.js';

const TICK_MS = 750;
const VIDEO_STAGES = ['PREPARING', 'GENERATING', 'RENDERING', 'FINALIZING'];
const IMAGE_STAGES = ['GENERATING'];
const FAILURE_RATE = 0.08;
const RESOLUTION_BY_QUALITY = { Standard: '1280x720', HD: '1920x1080', '4K': '3840x2160' };

const timers = new Map();

function stagesFor(type) {
	return type === 'VIDEO' ? VIDEO_STAGES : IMAGE_STAGES;
}

function truncate(text) {
	return text.length > 48 ? `${text.slice(0, 48)}…` : text;
}

function creditsPerVideo(settings) {
	const qualityMultiplier = settings.quality === '4K' ? 3 : settings.quality === 'HD' ? 1.6 : 1;
	return Math.max(2, Math.round(settings.duration * 0.6 * qualityMultiplier));
}

function creditsPerImage(settings) {
	return settings.quality === 'HD' ? 6 : 4;
}

function badRequest(message) {
	const error = new Error(message);
	error.status = 400;
	return error;
}

export async function createVideoJob(userId, { prompt, settings }) {
	const credits = creditsPerVideo(settings);
	return startJob(userId, {
		type: 'VIDEO',
		prompt,
		title: truncate(prompt),
		credits,
		settings,
		durationMs: 6000 + settings.duration * 120,
	});
}

export async function createImageJob(userId, { prompt, settings }) {
	const perImage = creditsPerImage(settings);
	const count = settings.count || 1;
	const credits = perImage * count;
	return startJob(userId, {
		type: 'IMAGE',
		prompt,
		title: truncate(prompt),
		credits,
		settings: { ...settings, creditsPerImage: perImage },
		durationMs: 3500 + count * 900,
	});
}

async function startJob(userId, { type, prompt, title, credits, settings, durationMs }) {
	const user = await prisma.user.findUnique({ where: { id: userId } });
	if (!user) throw badRequest('User not found');
	if (user.creditsRemaining < credits) throw badRequest('Not enough credits remaining');

	const [, job] = await prisma.$transaction([
		prisma.user.update({ where: { id: userId }, data: { creditsRemaining: { decrement: credits } } }),
		prisma.generationJob.create({
			data: { userId, type, prompt, title, credits, settings, stage: 'QUEUED', progress: 0 },
		}),
	]);

	runJob(job.id, type, durationMs);
	return job;
}

function runJob(jobId, type, durationMs) {
	const stages = stagesFor(type);
	const totalTicks = Math.max(4, Math.round(durationMs / TICK_MS));
	const willFail = Math.random() < FAILURE_RATE;
	const failAtTick = willFail ? Math.floor(totalTicks * (0.5 + Math.random() * 0.4)) : -1;

	let tick = 0;
	const interval = setInterval(async () => {
		tick += 1;
		try {
			if (tick === failAtTick) {
				await finalizeFailed(jobId);
				return;
			}
			if (tick >= totalTicks) {
				await finalizeCompleted(jobId);
				return;
			}

			const progress = Math.min(99, Math.round((tick / totalTicks) * 100));
			const stageIndex = Math.min(stages.length - 1, Math.floor((progress / 100) * stages.length));
			const remainingTicks = totalTicks - tick;
			const etaSeconds = Math.round((remainingTicks * TICK_MS) / 1000);

			await prisma.generationJob.update({
				where: { id: jobId },
				data: { stage: stages[stageIndex], progress, etaSeconds },
			});
		} catch (error) {
			console.error('Generation tick failed', error);
			clearTimer(jobId);
		}
	}, TICK_MS);

	timers.set(jobId, interval);
}

function clearTimer(jobId) {
	const interval = timers.get(jobId);
	if (interval) {
		clearInterval(interval);
		timers.delete(jobId);
	}
}

async function finalizeCompleted(jobId) {
	clearTimer(jobId);
	const job = await prisma.generationJob.findUnique({ where: { id: jobId } });
	if (!job || job.stage === 'CANCELLED') return;

	const settings = job.settings;
	const results = [];

	if (job.type === 'VIDEO') {
		results.push({
			title: job.title,
			thumbnail: placeholderImage(`${job.id}-video`, job.title),
			duration: settings.duration,
			resolution: RESOLUTION_BY_QUALITY[settings.quality] || RESOLUTION_BY_QUALITY.HD,
			creditsUsed: job.credits,
		});
	} else {
		const count = settings.count || 1;
		const perImage = settings.creditsPerImage || Math.round(job.credits / count);
		const [width, height] = (settings.size || '1024x1024').split('x').map(Number);
		for (let i = 0; i < count; i++) {
			results.push({
				title: count > 1 ? `${job.title} (${i + 1}/${count})` : job.title,
				thumbnail: placeholderImage(`${job.id}-image-${i}`, `${settings.style || 'Realistic'} #${i + 1}`, width, height),
				duration: null,
				resolution: settings.size,
				creditsUsed: perImage,
			});
		}
	}

	await prisma.$transaction(async (tx) => {
		const createdProjects = [];
		for (const result of results) {
			const project = await tx.project.create({
				data: {
					userId: job.userId,
					title: result.title,
					prompt: job.prompt,
					type: job.type,
					status: 'COMPLETED',
					thumbnail: result.thumbnail,
					duration: result.duration,
					resolution: result.resolution,
					creditsUsed: result.creditsUsed,
				},
			});
			createdProjects.push(project);
		}

		await tx.user.update({
			where: { id: job.userId },
			data:
				job.type === 'VIDEO'
					? { totalVideosGenerated: { increment: 1 } }
					: { totalImagesGenerated: { increment: results.length } },
		});

		await tx.activityItem.create({
			data: {
				userId: job.userId,
				type: 'GENERATED',
				message: `${job.type === 'VIDEO' ? 'Generated video' : 'Generated image'} "${job.title}"`,
			},
		});

		await tx.generationJob.update({
			where: { id: jobId },
			data: {
				stage: 'COMPLETED',
				progress: 100,
				etaSeconds: 0,
				resultProjectIds: createdProjects.map((project) => project.id),
			},
		});
	});
}

async function finalizeFailed(jobId) {
	clearTimer(jobId);
	const job = await prisma.generationJob.findUnique({ where: { id: jobId } });
	if (!job || job.stage === 'CANCELLED') return;

	await prisma.$transaction([
		prisma.user.update({ where: { id: job.userId }, data: { creditsRemaining: { increment: job.credits } } }),
		prisma.activityItem.create({
			data: { userId: job.userId, type: 'FAILED', message: `Generation failed for "${job.title}"` },
		}),
		prisma.generationJob.update({
			where: { id: jobId },
			data: { stage: 'FAILED', error: 'Generation failed due to a rendering error.', etaSeconds: null },
		}),
	]);
}

export async function cancelJob(userId, jobId) {
	const job = await prisma.generationJob.findFirst({ where: { id: jobId, userId } });
	if (!job) {
		const error = new Error('Job not found');
		error.status = 404;
		throw error;
	}
	clearTimer(jobId);

	await prisma.$transaction([
		prisma.user.update({ where: { id: userId }, data: { creditsRemaining: { increment: job.credits } } }),
		prisma.generationJob.update({ where: { id: jobId }, data: { stage: 'CANCELLED', etaSeconds: null } }),
	]);

	return prisma.generationJob.findUnique({ where: { id: jobId } });
}

export async function retryJob(userId, jobId) {
	const job = await prisma.generationJob.findFirst({ where: { id: jobId, userId } });
	if (!job || job.stage !== 'FAILED') throw badRequest('Only failed jobs can be retried');

	const user = await prisma.user.findUnique({ where: { id: userId } });
	if (user.creditsRemaining < job.credits) throw badRequest('Not enough credits remaining');

	await prisma.$transaction([
		prisma.user.update({ where: { id: userId }, data: { creditsRemaining: { decrement: job.credits } } }),
		prisma.generationJob.update({ where: { id: jobId }, data: { stage: 'QUEUED', progress: 0, error: null } }),
	]);

	const durationMs =
		job.type === 'VIDEO' ? 6000 + (job.settings.duration || 15) * 120 : 3500 + (job.settings.count || 1) * 900;
	runJob(jobId, job.type, durationMs);

	return prisma.generationJob.findUnique({ where: { id: jobId } });
}

export function listJobs(userId) {
	return prisma.generationJob.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, take: 30 });
}
