import '../app/config/env.js';
import bcrypt from 'bcryptjs';
import prisma from '../app/config/db.js';
import { placeholderImage } from '../app/libs/placeholder.js';

const ROLES = ['admin', 'user'];

function hoursAgo(hours) {
	return new Date(Date.now() - hours * 60 * 60 * 1000);
}

function daysAgo(days) {
	return hoursAgo(days * 24);
}

async function seedDemoData(userId) {
	const existingProjects = await prisma.project.count({ where: { userId } });
	if (existingProjects > 0) {
		console.log('Demo data already present, skipping.');
		return;
	}

	await prisma.project.createMany({
		data: [
			{
				userId,
				title: 'Mars Colonization Documentary',
				prompt: 'Cinematic space documentary about Mars colonization, dramatic narration, orchestral score.',
				type: 'VIDEO',
				status: 'COMPLETED',
				thumbnail: placeholderImage('proj-1', 'Mars Colonization'),
				duration: 32,
				resolution: '1920x1080',
				creditsUsed: 18,
				favorite: true,
				createdAt: hoursAgo(3),
			},
			{
				userId,
				title: 'Neon Cyberpunk Cityscape',
				prompt: 'Cyberpunk city skyline at night, neon lights, flying cars, rain-slicked streets.',
				type: 'IMAGE',
				status: 'COMPLETED',
				thumbnail: placeholderImage('proj-2', 'Cyberpunk City'),
				resolution: '1024x1024',
				creditsUsed: 4,
				createdAt: hoursAgo(7),
			},
			{
				userId,
				title: 'Real Estate Walkthrough Reel',
				prompt: 'Luxury beachfront villa walkthrough, drone establishing shot, golden hour lighting.',
				type: 'VIDEO',
				status: 'COMPLETED',
				thumbnail: placeholderImage('proj-3', 'Villa Walkthrough'),
				duration: 45,
				resolution: '1920x1080',
				creditsUsed: 22,
				favorite: true,
				createdAt: daysAgo(1),
			},
			{
				userId,
				title: 'Studio Ghibli Forest Spirit',
				prompt: 'Hand-painted forest spirit in a Studio Ghibli style, magical lighting, soft colors.',
				type: 'IMAGE',
				status: 'COMPLETED',
				thumbnail: placeholderImage('proj-4', 'Forest Spirit'),
				resolution: '1024x1792',
				creditsUsed: 4,
				createdAt: daysAgo(1),
			},
			{
				userId,
				title: 'Product Launch Teaser',
				prompt: 'Fast-paced tech product launch teaser, glossy studio lighting, dynamic camera moves.',
				type: 'VIDEO',
				status: 'FAILED',
				thumbnail: placeholderImage('proj-5', 'Product Teaser'),
				creditsUsed: 0,
				createdAt: daysAgo(2),
			},
			{
				userId,
				title: 'Watercolor Mountain Range',
				prompt: 'Soft watercolor painting of a mountain range at sunrise, pastel tones.',
				type: 'IMAGE',
				status: 'COMPLETED',
				thumbnail: placeholderImage('proj-6', 'Watercolor Peaks'),
				resolution: '1792x1024',
				creditsUsed: 4,
				createdAt: daysAgo(3),
			},
			{
				userId,
				title: 'Tech Demo Launch Sequence',
				prompt: 'Rocket launch sequence with dramatic countdown overlays and mission control cutaways.',
				type: 'VIDEO',
				status: 'COMPLETED',
				thumbnail: placeholderImage('proj-7', 'Launch Sequence'),
				duration: 60,
				resolution: '3840x2160',
				creditsUsed: 35,
				createdAt: daysAgo(4),
			},
			{
				userId,
				title: 'Anime Street Racer',
				prompt: 'Anime style street racer drifting through a rain-soaked Tokyo alley at night.',
				type: 'IMAGE',
				status: 'COMPLETED',
				thumbnail: placeholderImage('proj-8', 'Street Racer'),
				resolution: '1024x1024',
				creditsUsed: 4,
				favorite: true,
				createdAt: daysAgo(5),
			},
		],
	});

	const broll = await prisma.mediaFolder.create({ data: { userId, name: 'B-Roll' } });
	const voice = await prisma.mediaFolder.create({ data: { userId, name: 'Voiceovers' } });
	const music = await prisma.mediaFolder.create({ data: { userId, name: 'Music' } });

	await prisma.mediaItem.createMany({
		data: [
			{
				userId,
				name: 'mars-establishing-shot.mp4',
				type: 'VIDEO',
				url: placeholderImage('media-1', 'Mars Shot', 640, 360),
				thumbnail: placeholderImage('media-1', 'Mars Shot'),
				folderId: broll.id,
				sizeBytes: 84 * 1024 * 1024,
				createdAt: hoursAgo(5),
			},
			{
				userId,
				name: 'villa-drone-flyover.mp4',
				type: 'VIDEO',
				url: placeholderImage('media-2', 'Villa Flyover', 640, 360),
				thumbnail: placeholderImage('media-2', 'Villa Flyover'),
				folderId: broll.id,
				sizeBytes: 132 * 1024 * 1024,
				createdAt: daysAgo(1),
			},
			{
				userId,
				name: 'cyberpunk-skyline.png',
				type: 'IMAGE',
				url: placeholderImage('media-3', 'Cyberpunk Skyline'),
				thumbnail: placeholderImage('media-3', 'Cyberpunk Skyline'),
				sizeBytes: 6 * 1024 * 1024,
				createdAt: hoursAgo(7),
			},
			{
				userId,
				name: 'arthur-narration-final.mp3',
				type: 'AUDIO',
				url: placeholderImage('media-4', 'Narration Audio', 640, 200),
				thumbnail: placeholderImage('media-4', 'Narration Audio', 640, 200),
				folderId: voice.id,
				sizeBytes: 9 * 1024 * 1024,
				createdAt: daysAgo(2),
			},
			{
				userId,
				name: 'synthwave-background-loop.mp3',
				type: 'AUDIO',
				url: placeholderImage('media-6', 'Synthwave Loop', 640, 200),
				thumbnail: placeholderImage('media-6', 'Synthwave Loop', 640, 200),
				folderId: music.id,
				sizeBytes: 4 * 1024 * 1024,
				createdAt: daysAgo(3),
			},
		],
	});

	const mediaAgg = await prisma.mediaItem.aggregate({ where: { userId }, _sum: { sizeBytes: true } });
	await prisma.user.update({
		where: { id: userId },
		data: { storageUsedBytes: Number(mediaAgg._sum.sizeBytes || 0) },
	});

	await prisma.promptHistoryEntry.createMany({
		data: [
			{
				userId,
				text: 'Cinematic space documentary about Mars colonization, dramatic narration, orchestral score.',
				type: 'VIDEO',
				favorite: true,
				createdAt: hoursAgo(3),
			},
			{
				userId,
				text: 'Cyberpunk city skyline at night, neon lights, flying cars, rain-slicked streets.',
				type: 'IMAGE',
				createdAt: hoursAgo(7),
			},
			{
				userId,
				text: 'Luxury beachfront villa walkthrough, drone establishing shot, golden hour lighting.',
				type: 'VIDEO',
				createdAt: daysAgo(1),
			},
			{
				userId,
				text: 'Hand-painted forest spirit in a Studio Ghibli style, magical lighting, soft colors.',
				type: 'IMAGE',
				favorite: true,
				createdAt: daysAgo(1),
			},
		],
	});

	await prisma.activityItem.createMany({
		data: [
			{ userId, type: 'GENERATED', message: 'Generated video "Mars Colonization Documentary"', createdAt: hoursAgo(3) },
			{ userId, type: 'GENERATED', message: 'Generated image "Neon Cyberpunk Cityscape"', createdAt: hoursAgo(7) },
			{ userId, type: 'UPLOADED', message: 'Uploaded arthur-narration-final.mp3 to Voiceovers', createdAt: daysAgo(2) },
			{ userId, type: 'FAILED', message: 'Generation failed for "Product Launch Teaser"', createdAt: daysAgo(2) },
		],
	});

	console.log('Seeded demo projects, media, prompts, and activity.');
}

async function main() {
	const roles = {};
	for (const name of ROLES) {
		roles[name] = await prisma.role.upsert({
			where: { name },
			update: {},
			create: { name },
		});
	}

	const adminEmail = process.env.ADMIN_EMAIL || 'admin@vidforge.ai';
	const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
	const hashedPassword = await bcrypt.hash(adminPassword, 10);

	const admin = await prisma.user.upsert({
		where: { email: adminEmail },
		update: {},
		create: {
			name: 'Admin',
			email: adminEmail,
			password: hashedPassword,
		},
	});

	await prisma.userRole.upsert({
		where: {
			userId_roleId: {
				userId: admin.id,
				roleId: roles.admin.id,
			},
		},
		update: {},
		create: {
			userId: admin.id,
			roleId: roles.admin.id,
		},
	});

	console.log(`Seeded roles: ${ROLES.join(', ')}`);
	console.log(`Seeded admin user: ${adminEmail}`);

	await seedDemoData(admin.id);
}

main()
	.catch((error) => {
		console.error(error);
		process.exitCode = 1;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
