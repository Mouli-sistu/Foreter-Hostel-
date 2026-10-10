import User from '../models/User.js';
import Room from '../models/Room.js';
import Booking from '../models/Booking.js';

// @desc    Get all residents with stay details & check-in info (Admin only)
// @route   GET /api/residents
// @access  Private/Admin
export const getAllResidents = async (req, res) => {
  try {
    const residents = await User.find({ role: 'resident' })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: residents.length,
      data: residents,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single resident details
// @route   GET /api/residents/:id
// @access  Private
export const getResidentById = async (req, res) => {
  try {
    const resident = await User.findById(req.params.id).select('-password');
    if (!resident) {
      return res.status(404).json({ success: false, message: 'Resident not found' });
    }

    // Include recent bookings/stay history
    const bookings = await Booking.find({ resident: resident._id }).sort({ checkInDate: -1 });

    res.json({
      success: true,
      data: {
        resident,
        bookings,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Assign resident to a room and bed (Admin check-in allocation)
// @route   POST /api/residents/assign-room
// @access  Private/Admin
export const assignRoom = async (req, res) => {
  try {
    const { residentId, roomId, bedId, checkInDate, stayDurationMonths, paymentStatus } = req.body;

    const resident = await User.findById(residentId);
    if (!resident) {
      return res.status(404).json({ success: false, message: 'Resident user not found' });
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    // Check if target bed is available
    const bed = room.beds.find((b) => b.bedId === bedId);
    if (!bed) {
      return res.status(400).json({ success: false, message: `Bed ${bedId} not found in Room ${room.roomNumber}` });
    }

    if (bed.isOccupied && bed.residentId && bed.residentId.toString() !== residentId) {
      return res.status(400).json({
        success: false,
        message: `${bedId} in Room ${room.roomNumber} is already occupied by ${bed.residentName}`,
      });
    }

    // If resident was previously in another room/bed, free up previous bed
    if (resident.roomNumber && resident.bedId) {
      const prevRoom = await Room.findOne({ roomNumber: resident.roomNumber });
      if (prevRoom) {
        const prevBed = prevRoom.beds.find((b) => b.bedId === resident.bedId);
        if (prevBed && prevBed.residentId && prevBed.residentId.toString() === residentId) {
          prevBed.isOccupied = false;
          prevBed.residentId = null;
          prevBed.residentName = '';
          prevBed.checkInDate = null;
          await prevRoom.save();
        }
      }
    }

    // Calculate dates
    const startDate = checkInDate ? new Date(checkInDate) : new Date();
    const duration = stayDurationMonths ? Number(stayDurationMonths) : 6;
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + duration);

    // Occupy target bed
    bed.isOccupied = true;
    bed.residentId = resident._id;
    bed.residentName = resident.name;
    bed.checkInDate = startDate;
    await room.save();

    // Update resident details
    resident.roomNumber = room.roomNumber;
    resident.sharingType = room.sharingType;
    resident.bedId = bedId;
    resident.checkInDate = startDate;
    resident.stayDurationMonths = duration;
    resident.expectedCheckOutDate = endDate;
    resident.monthlyRent = room.monthlyPrice;
    resident.paymentStatus = paymentStatus || 'Paid';
    await resident.save();

    // Create Booking record
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
      paymentStatus: resident.paymentStatus,
      status: 'Active',
    });

    res.json({
      success: true,
      message: `Resident ${resident.name} assigned to Room ${room.roomNumber} (${bedId}) successfully!`,
      data: {
        resident,
        room,
        booking,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Check-out resident & release room bed
// @route   POST /api/residents/checkout
// @access  Private/Admin
export const checkOutResident = async (req, res) => {
  try {
    const { residentId } = req.body;

    const resident = await User.findById(residentId);
    if (!resident) {
      return res.status(404).json({ success: false, message: 'Resident not found' });
    }

    // Free bed in current room
    if (resident.roomNumber && resident.bedId) {
      const room = await Room.findOne({ roomNumber: resident.roomNumber });
      if (room) {
        const bed = room.beds.find((b) => b.bedId === resident.bedId);
        if (bed) {
          bed.isOccupied = false;
          bed.residentId = null;
          bed.residentName = '';
          bed.checkInDate = null;
          await room.save();
        }
      }
    }

    // Update active booking
    await Booking.updateMany(
      { resident: resident._id, status: 'Active' },
      { status: 'Completed', actualCheckOutDate: new Date() }
    );

    // Reset resident's stay fields
    resident.roomNumber = '';
    resident.bedId = '';
    resident.sharingType = 'Unassigned';
    resident.paymentStatus = 'Paid';
    await resident.save();

    res.json({
      success: true,
      message: `Resident ${resident.name} has been successfully checked out. Bed released.`,
      data: resident,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update resident payment status
// @route   PUT /api/residents/:id/payment
// @access  Private/Admin
export const updateResidentPayment = async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    const resident = await User.findById(req.params.id);
    if (!resident) {
      return res.status(404).json({ success: false, message: 'Resident not found' });
    }

    resident.paymentStatus = paymentStatus;
    await resident.save();

    // Also update any active booking
    await Booking.updateMany(
      { resident: resident._id, status: 'Active' },
      { paymentStatus }
    );

    res.json({
      success: true,
      message: `Payment status updated to ${paymentStatus}`,
      data: resident,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
