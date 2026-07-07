import { Router } from 'express';
import { list, createVideo, createImage, cancel, retry } from '../../controllers/generation.controller.js';
import { validate } from '../../middleware/validate.middleware.js';
import { createVideoJobSchema, createImageJobSchema } from '../../validators/api.validator.js';

const router = Router();

router.get('/jobs', list);
router.post('/video', validate(createVideoJobSchema), createVideo);
router.post('/image', validate(createImageJobSchema), createImage);
router.post('/jobs/:id/cancel', cancel);
router.post('/jobs/:id/retry', retry);

export default router;
