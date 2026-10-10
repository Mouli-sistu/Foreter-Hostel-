import Booking from '../models/Booking.js';
import Room from '../models/Room.js';
import User from '../models/User.js';

// @desc    Self-service Book / Check-in by Resident
// @route   POST /api/bookings/book
// @access  Private (Resident)
export const createSelfBooking = async (req, res) => {
  try {
    const { roomId, bedId, stayDurationMonths, paymentMethod } = req.body;
    const resident = await User.findById(req.user._id);

    if (!roomId || !bedId) {
      return res.status(400).json({ success: false, message: 'Please select both room and bed' });
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    const bed = room.beds.find((b) => b.bedId === bedId);
    if (!bed) {
      return res.status(400).json({ success: false, message: 'Selected bed does not exist in this room' });
    }

    if (bed.isOccupied && bed.residentId && bed.residentId.toString() !== resident._id.toString()) {
      return res.status(400).json({ success: false, message: 'This bed is already occupied' });
    }

    const duration = Number(stayDurationMonths) || 6;
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + duration);

    // If resident was occupying another bed, release it
    if (resident.roomNumber && resident.bedId) {
      const prevRoom = await Room.findOne({ roomNumber: resident.roomNumber });
      if (prevRoom) {
        const prevBed = prevRoom.beds.find((b) => b.bedId === resident.bedId);
        if (prevBed && prevBed.residentId && prevBed.residentId.toString() === resident._id.toString()) {
          prevBed.isOccupied = false;
          prevBed.residentId = null;
          prevBed.residentName = '';
          prevBed.checkInDate = null;
          await prevRoom.save();
        }
      }
    }

    // Assign bed
    bed.isOccupied = true;
    bed.residentId = resident._id;
    bed.residentName = resident.name;
    bed.checkInDate = startDate;
    await room.save();

    // Update user profile
    resident.roomNumber = room.roomNumber;
    resident.sharingType = room.sharingType;
    resident.bedId = bedId;
    resident.checkInDate = startDate;
    resident.stayDurationMonths = duration;
    resident.expectedCheckOutDate = endDate;
    resident.monthlyRent = room.monthlyPrice;
    resident.paymentStatus = 'Paid';
    await resident.save();

    const booking = await Booking.create({
      resident: resident._id,
      residentName: resident.name,
      residentEmail: resident.email,
      residentPhone: resident.phone,
      room: room._id,
      roomNumber: room.roomNumber,
      bedId,
      sharingType: room.sharingType,
      monthlyRent: room.monthlyPrice,
      checkInDate: startDate,
      stayDurationMonths: duration,
      expectedCheckOutDate: endDate,
      paymentStatus: 'Paid',
      paymentMethod: paymentMethod || 'UPI',
      status: 'Active',
    });

    res.status(201).json({
      success: true,
      message: `Successfully checked in to Room ${room.roomNumber} (${bedId})!`,
      data: {
        booking,
        resident,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get active stay & bookings for current logged-in resident
// @route   GET /api/bookings/my-stay
// @access  Private
export const getMyStay = async (req, res) => {
  try {
    const bookings = await Booking.find({ resident: req.user._id })
      .populate('room')
      .sort({ createdAt: -1 });

    const activeBooking = bookings.find((b) => b.status === 'Active') || null;

    res.json({
      success: true,
      data: {
        activeBooking,
        history: bookings,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all bookings (Admin only)
// @route   GET /api/bookings
// @access  Private/Admin
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('resident', 'name email phone')
      .populate('room', 'roomNumber sharingType floor')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
