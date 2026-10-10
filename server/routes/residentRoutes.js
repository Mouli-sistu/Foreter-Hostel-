import express from 'express';
import {
  getAllResidents,
  getResidentById,
  assignRoom,
  checkOutResident,
  updateResidentPayment,
} from '../controllers/residentController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, adminOnly, getAllResidents);
router.get('/:id', protect, getResidentById);
router.post('/assign-room', protect, adminOnly, assignRoom);
router.post('/checkout', protect, adminOnly, checkOutResident);
router.put('/:id/payment', protect, adminOnly, updateResidentPayment);

export default router;
