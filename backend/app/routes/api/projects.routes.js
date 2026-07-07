import { Router } from 'express';
import { list, rename, favorite, duplicate, remove } from '../../controllers/projects.controller.js';
import { validate } from '../../middleware/validate.middleware.js';
import { renameProjectSchema } from '../../validators/api.validator.js';

const router = Router();

router.get('/', list);
router.patch('/:id', validate(renameProjectSchema), rename);
router.post('/:id/favorite', favorite);
router.post('/:id/duplicate', duplicate);
router.delete('/:id', remove);

export default router;
