import { Router } from 'express';
import { getMessagesByPost, sendMessage } from '../controllers/messageController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', protect, sendMessage);
router.get('/:postId', protect, getMessagesByPost);

export default router;
