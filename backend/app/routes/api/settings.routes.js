import { Router } from 'express';
import * as controller from '../../controllers/settings.controller.js';
import { validate } from '../../middleware/validate.middleware.js';
import {
	updateProfileSchema,
	changePasswordSchema,
	createApiKeySchema,
	updateNotificationSchema,
	updateThemeSchema,
} from '../../validators/api.validator.js';

const router = Router();

router.get('/', controller.get);
router.patch('/profile', validate(updateProfileSchema), controller.updateProfile);
router.post('/password', validate(changePasswordSchema), controller.changePassword);
router.post('/api-keys', validate(createApiKeySchema), controller.createApiKey);
router.delete('/api-keys/:id', controller.revokeApiKey);
router.patch('/notifications', validate(updateNotificationSchema), controller.updateNotification);
router.patch('/theme', validate(updateThemeSchema), controller.updateTheme);
router.delete('/account', controller.deleteAccount);

export default router;
