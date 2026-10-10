import express from 'express';
import {
  createMaintenanceRequest,
  getMyRequests,
  getAllRequests,
  updateRequestStatus,
} from '../controllers/maintenanceController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createMaintenanceRequest)
  .get(protect, adminOnly, getAllRequests);

router.get('/my-tickets', protect, getMyRequests);
router.put('/:id', protect, adminOnly, updateRequestStatus);

export default router;
