import { Router } from 'express';
import multer from 'multer';
import { list, folders, upload, rename, remove, bulkRemove } from '../../controllers/media.controller.js';
import { validate } from '../../middleware/validate.middleware.js';
import { renameMediaSchema, bulkDeleteMediaSchema } from '../../validators/api.validator.js';

const uploadMiddleware = multer({ storage: multer.memoryStorage(), limits: { fileSize: 500 * 1024 * 1024 } });

const router = Router();

router.get('/', list);
router.get('/folders', folders);
router.post('/', uploadMiddleware.single('file'), upload);
router.patch('/:id', validate(renameMediaSchema), rename);
router.delete('/:id', remove);
router.post('/bulk-delete', validate(bulkDeleteMediaSchema), bulkRemove);

export default router;
