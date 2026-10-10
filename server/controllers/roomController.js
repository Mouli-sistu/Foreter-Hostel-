import Room from '../models/Room.js';

// @desc    Get all hostel rooms with optional filters
// @route   GET /api/rooms
// @access  Public
export const getRooms = async (req, res) => {
  try {
    const { sharingType, status, floor } = req.query;
    const filter = {};

    if (sharingType) {
      filter.sharingType = sharingType;
    }
    if (status) {
      filter.status = status;
    }
    if (floor) {
      filter.floor = Number(floor);
    }

    const rooms = await Room.find(filter).sort({ roomNumber: 1 });

    res.json({
      success: true,
      count: rooms.length,
      data: rooms,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single room by ID or RoomNumber
// @route   GET /api/rooms/:id
// @access  Public
export const getRoomById = async (req, res) => {
  try {
    let room;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      room = await Room.findById(req.params.id);
    } else {
      room = await Room.findOne({ roomNumber: req.params.id });
    }

    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    res.json({ success: true, data: room });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new room (Admin only)
// @route   POST /api/rooms
// @access  Private/Admin
export const createRoom = async (req, res) => {
  try {
    const { roomNumber, floor, sharingType, monthlyPrice, amenities, notes } = req.body;

    const existingRoom = await Room.findOne({ roomNumber });
    if (existingRoom) {
      return res.status(400).json({ success: false, message: `Room ${roomNumber} already exists` });
    }

    const capacity = sharingType === '3-Share' ? 3 : 4;
    const price = monthlyPrice || (sharingType === '3-Share' ? 10000 : 7500);

    // Generate bed slots: Bed A, Bed B, Bed C, Bed D
    const beds = [];
    const letters = ['A', 'B', 'C', 'D'];
    for (let i = 0; i < capacity; i++) {
      beds.push({
        bedId: `Bed ${letters[i]}`,
        isOccupied: false,
        residentId: null,
        residentName: '',
      });
    }

    const room = await Room.create({
      roomNumber,
      floor: Number(floor),
      sharingType,
      capacity,
      monthlyPrice: price,
      beds,
      amenities: amenities || [
        '24/7 Electricity Backup',
        'High-Speed Wi-Fi',
        '24/7 Hot Water',
        'Attached Washroom',
        'Wooden Wardrobe',
        'Study Table',
      ],
      notes: notes || '',
    });

    res.status(201).json({
      success: true,
      message: `Room ${roomNumber} created successfully`,
      data: room,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update room details (Admin only)
// @route   PUT /api/rooms/:id
// @access  Private/Admin
export const updateRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    const { status, monthlyPrice, amenities, notes } = req.body;
    if (status) room.status = status;
    if (monthlyPrice) room.monthlyPrice = Number(monthlyPrice);
    if (amenities) room.amenities = amenities;
    if (notes !== undefined) room.notes = notes;

    const updatedRoom = await room.save();
    res.json({ success: true, message: 'Room updated successfully', data: updatedRoom });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete room (Admin only, only if unoccupied)
// @route   DELETE /api/rooms/:id
// @access  Private/Admin
export const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    const occupiedBeds = room.beds.filter((b) => b.isOccupied);
    if (occupiedBeds.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete room with active residents. Reassign or checkout residents first.',
      });
    }

    await Room.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: `Room ${room.roomNumber} deleted successfully` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
