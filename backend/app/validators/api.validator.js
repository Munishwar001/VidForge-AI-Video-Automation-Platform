import { z } from 'zod';

export const renameProjectSchema = z.object({
	title: z.string().trim().min(1, 'Title is required'),
});

export const renameMediaSchema = z.object({
	name: z.string().trim().min(1, 'Name is required'),
});

export const bulkDeleteMediaSchema = z.object({
	ids: z.array(z.string().min(1)).min(1, 'Select at least one item'),
});

export const createPromptSchema = z.object({
	text: z.string().trim().min(1, 'Prompt text is required'),
	type: z.enum(['video', 'image']),
});

const videoSettingsSchema = z.object({
	aspectRatio: z.string(),
	duration: z.number(),
	quality: z.string(),
	fps: z.number(),
	cameraStyle: z.string(),
	motionStrength: z.number(),
	creativity: z.number(),
	seed: z.number(),
	negativePrompt: z.string().optional().default(''),
	referenceImage: z.string().nullable().optional(),
	referenceImageName: z.string().nullable().optional(),
	referenceVideoName: z.string().nullable().optional(),
	voiceOver: z.boolean(),
	backgroundMusic: z.boolean(),
	subtitles: z.boolean(),
});

export const createVideoJobSchema = z.object({
	prompt: z.string().trim().min(1, 'Prompt is required'),
	settings: videoSettingsSchema,
});

const imageSettingsSchema = z.object({
	style: z.string(),
	size: z.string(),
	count: z.number().min(1).max(4),
	quality: z.string(),
	negativePrompt: z.string().optional().default(''),
	referenceImage: z.string().nullable().optional(),
	referenceImageName: z.string().nullable().optional(),
});

export const createImageJobSchema = z.object({
	prompt: z.string().trim().min(1, 'Prompt is required'),
	settings: imageSettingsSchema,
});

export const updateProfileSchema = z.object({
	name: z.string().trim().min(1, 'Name is required'),
	email: z.string().trim().toLowerCase().email('Please enter a valid email'),
});

export const changePasswordSchema = z.object({
	currentPassword: z.string().min(1, 'Current password is required'),
	newPassword: z.string().min(8, 'New password must be at least 8 characters'),
});

export const createApiKeySchema = z.object({
	label: z.string().trim().min(1, 'Label is required'),
});

export const updateNotificationSchema = z.object({
	key: z.enum(['generationComplete', 'creditAlerts', 'weeklySummary', 'productUpdates']),
	value: z.boolean(),
});

export const updateThemeSchema = z.object({
	theme: z.enum(['light', 'dark']),
});
