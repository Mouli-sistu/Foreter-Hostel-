import express from 'express';
import {
  createSelfBooking,
  getMyStay,
  getAllBookings,
} from '../controllers/bookingController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/book', protect, createSelfBooking);
router.get('/my-stay', protect, getMyStay);
router.get('/', protect, adminOnly, getAllBookings);

export default router;
