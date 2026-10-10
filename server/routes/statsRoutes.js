import express from 'express';
import {
  getAdminStats,
  getHostelInfo,
  getNotices,
  createNotice,
} from '../controllers/statsController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/hostel-info', getHostelInfo);
router.get('/admin', protect, adminOnly, getAdminStats);
router.route('/notices')
  .get(getNotices)
  .post(protect, adminOnly, createNotice);

export default router;
