import { Router } from 'express';
import {
  acceptSession,
  completeSession,
  createPost,
  deletePost,
  getAllPosts,
  updatePost
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.route('/').get(protect, getAllPosts).post(protect, createPost);
router.put('/:id/accept', protect, acceptSession);
router.put('/:id/complete', protect, completeSession);
router.route('/:id').put(protect, updatePost).delete(protect, deletePost);

export default router;
