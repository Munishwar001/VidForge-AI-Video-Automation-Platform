import { Router } from 'express';
import { stats, activity } from '../../controllers/dashboard.controller.js';

const router = Router();

router.get('/stats', stats);
router.get('/activity', activity);

export default router;
