import MaintenanceRequest from '../models/MaintenanceRequest.js';

// @desc    Raise a new facility maintenance/support ticket
// @route   POST /api/maintenance
// @access  Private
export const createMaintenanceRequest = async (req, res) => {
  try {
    const { facilityCategory, title, description, priority } = req.body;

    if (!facilityCategory || !title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide facility category, title, and description',
      });
    }

    const request = await MaintenanceRequest.create({
      resident: req.user._id,
      residentName: req.user.name,
      roomNumber: req.user.roomNumber || 'Common Area',
      facilityCategory,
      title,
      description,
      priority: priority || 'Medium',
      status: 'Pending',
    });

    res.status(201).json({
      success: true,
      message: 'Support ticket submitted. Our hostel maintenance team has been alerted.',
      data: request,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get maintenance requests raised by current resident
// @route   GET /api/maintenance/my-tickets
// @access  Private
export const getMyRequests = async (req, res) => {
  try {
    const requests = await MaintenanceRequest.find({ resident: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: requests.length, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all maintenance requests (Admin only)
// @route   GET /api/maintenance
// @access  Private/Admin
export const getAllRequests = async (req, res) => {
  try {
    const { status, category } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.facilityCategory = category;

    const requests = await MaintenanceRequest.find(filter)
      .populate('resident', 'name phone email roomNumber')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: requests.length, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update ticket status & admin notes
// @route   PUT /api/maintenance/:id
// @access  Private/Admin
export const updateRequestStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const request = await MaintenanceRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    if (status) {
      request.status = status;
      if (status === 'Resolved') {
        request.resolvedAt = new Date();
      }
    }
    if (adminNotes !== undefined) {
      request.adminNotes = adminNotes;
    }

    const updated = await request.save();
    res.json({
      success: true,
      message: `Ticket updated to ${request.status}`,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
