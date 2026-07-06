import { Router } from 'express';
import { list, create, favorite, remove } from '../../controllers/prompts.controller.js';
import { validate } from '../../middleware/validate.middleware.js';
import { createPromptSchema } from '../../validators/api.validator.js';

const router = Router();

router.get('/', list);
router.post('/', validate(createPromptSchema), create);
router.patch('/:id/favorite', favorite);
router.delete('/:id', remove);

export default router;
