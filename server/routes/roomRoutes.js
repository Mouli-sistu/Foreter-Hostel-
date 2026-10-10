import express from 'express';
import {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
} from '../controllers/roomController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getRooms)
  .post(protect, adminOnly, createRoom);

router.route('/:id')
  .get(getRoomById)
  .put(protect, adminOnly, updateRoom)
  .delete(protect, adminOnly, deleteRoom);

export default router;
