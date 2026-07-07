import { Router } from 'express';
import dashboardRoutes from './dashboard.routes.js';
import projectsRoutes from './projects.routes.js';
import mediaRoutes from './media.routes.js';
import promptsRoutes from './prompts.routes.js';
import generationRoutes from './generation.routes.js';
import settingsRoutes from './settings.routes.js';

const router = Router();

router.use('/dashboard', dashboardRoutes);
router.use('/projects', projectsRoutes);
router.use('/media', mediaRoutes);
router.use('/prompts', promptsRoutes);
router.use('/generation', generationRoutes);
router.use('/settings', settingsRoutes);

export default router;
