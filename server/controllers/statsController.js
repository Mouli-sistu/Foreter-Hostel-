import Room from '../models/Room.js';
import User from '../models/User.js';
import Booking from '../models/Booking.js';
import MaintenanceRequest from '../models/MaintenanceRequest.js';
import Notice from '../models/Notice.js';

// @desc    Get aggregated stats for the Admin Dashboard
// @route   GET /api/stats/admin
// @access  Private/Admin
export const getAdminStats = async (req, res) => {
  try {
    const totalResidents = await User.countDocuments({ role: 'resident' });
    const activeResidents = await User.countDocuments({
      role: 'resident',
      roomNumber: { $ne: '' },
    });
    const unassignedResidents = await User.countDocuments({
      role: 'resident',
      $or: [{ roomNumber: '' }, { roomNumber: null }],
    });

    const rooms = await Room.find();
    let totalBeds = 0;
    let occupiedBeds = 0;
    let threeShareTotal = 0;
    let threeShareOccupied = 0;
    let fourShareTotal = 0;
    let fourShareOccupied = 0;

    rooms.forEach((r) => {
      totalBeds += r.capacity;
      const occupiedInRoom = r.beds.filter((b) => b.isOccupied).length;
      occupiedBeds += occupiedInRoom;

      if (r.sharingType === '3-Share') {
        threeShareTotal += r.capacity;
        threeShareOccupied += occupiedInRoom;
      } else if (r.sharingType === '4-Share') {
        fourShareTotal += r.capacity;
        fourShareOccupied += occupiedInRoom;
      }
    });

    // Financial revenue calculations based on occupied beds
    const monthlyRevenue =
      threeShareOccupied * 10000 + fourShareOccupied * 7500;

    const paidResidents = await User.countDocuments({
      role: 'resident',
      paymentStatus: 'Paid',
      roomNumber: { $ne: '' },
    });
    const pendingPaymentResidents = await User.countDocuments({
      role: 'resident',
      paymentStatus: { $in: ['Pending', 'Due', 'Overdue'] },
      roomNumber: { $ne: '' },
    });

    // Maintenance stats
    const openTickets = await MaintenanceRequest.countDocuments({
      status: { $in: ['Pending', 'In Progress'] },
    });

    // Recent 5 bookings
    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        summary: {
          totalResidents,
          activeResidents,
          unassignedResidents,
          totalRooms: rooms.length,
          totalBeds,
          occupiedBeds,
          availableBeds: totalBeds - occupiedBeds,
          occupancyPercentage:
            totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0,
        },
        sharingBreakdown: {
          threeShare: {
            totalBeds: threeShareTotal,
            occupiedBeds: threeShareOccupied,
            availableBeds: threeShareTotal - threeShareOccupied,
            monthlyPrice: 10000,
          },
          fourShare: {
            totalBeds: fourShareTotal,
            occupiedBeds: fourShareOccupied,
            availableBeds: fourShareTotal - fourShareOccupied,
            monthlyPrice: 7500,
          },
        },
        finance: {
          monthlyRevenue,
          paidResidents,
          pendingPaymentResidents,
        },
        support: {
          openTickets,
        },
        recentBookings,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Public hostel specifications, pricing and facilities
// @route   GET /api/stats/hostel-info
// @access  Public
export const getHostelInfo = async (req, res) => {
  try {
    const hostelInfo = {
      name: 'Foreter Pg for men',
      tagline: "Luxury Men's PG & Co-Living · Beside Durgam Cheruvu Metro, Madhapur, Hyderabad",
      city: 'Hyderabad',
      address: 'Plot No. 42, 100 Feet Road, Beside Durgam Cheruvu Metro Station, Madhapur, Hitec City, Hyderabad - 500081',
      facilities: [
        {
          id: 'electricity',
          title: '24/7 Electricity',
          icon: 'Zap',
          subtitle: '100% DG Generator Backup',
          description:
            'Continuous uninterrupted power supply with heavy-duty backup generators for all rooms and study lounges.',
        },
        {
          id: 'wifi',
          title: 'High-Speed Wi-Fi',
          icon: 'Wifi',
          subtitle: '500 Mbps Fiber Mesh',
          description:
            'Dedicated Wi-Fi 6 access points on every corridor ensuring low latency for coding, studies, and streaming.',
        },
        {
          id: 'hotwater',
          title: '24/7 Hot Water',
          icon: 'Flame',
          subtitle: 'Solar + Electric Geysers',
          description:
            'Instant pressurized hot water available round-the-clock in every attached bathroom.',
        },
        {
          id: 'washing',
          title: 'Washing Machines',
          icon: 'Shirt',
          subtitle: 'Automated Laundry Zone',
          description:
            'Modern front-load & top-load automatic washing machines with dedicated drying racks and iron stations.',
        },
        {
          id: 'cctv',
          title: 'CCTV & Security',
          icon: 'ShieldCheck',
          subtitle: '24/7 Monitored Surveillance',
          description:
            'High-definition security cameras across entry gates, corridors, and biometric card access doors.',
        },
        {
          id: 'water',
          title: 'RO Purified Water',
          icon: 'Droplet',
          subtitle: 'Multi-stage RO + UV',
          description:
            'Industrial water purifiers with cold and regular water dispensing units on each floor.',
        },
      ],
      sharingPlans: [
        {
          type: '3-Share',
          badge: 'Popular for Students',
          price: 10000,
          billingPeriod: 'per month',
          capacity: 3,
          features: [
            'Spacious air-conditioned room',
            '3 Ergonomic beds with orthopaedic mattresses',
            '3 Dedicated study desks & ergonomic chairs',
            '3 Independent lockable wooden wardrobes',
            'Attached modern bathroom with 24/7 hot water',
            'High-speed Wi-Fi router in the room',
            'Daily housekeeping included',
          ],
        },
        {
          type: '4-Share',
          badge: 'Best Value & Social',
          price: 7500,
          billingPeriod: 'per month',
          capacity: 4,
          features: [
            'Well-ventilated ambient room',
            '4 Sturdy wooden beds with premium mattresses',
            'Individual lockable wardrobes with locker keys',
            'Study workspace with reading lamps',
            'Attached bathroom with hot water & shower',
            'High-speed Wi-Fi access',
            'Daily housekeeping & waste disposal',
          ],
        },
      ],
      timings: {
        curfew: '10:30 PM (Biometric Entry for late shifts)',
        messBreakfast: '7:30 AM - 9:30 AM',
        messLunch: '12:30 PM - 2:30 PM',
        messDinner: '7:30 PM - 10:00 PM',
      },
    };

    res.json({ success: true, data: hostelInfo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get notices
// @route   GET /api/stats/notices
// @access  Public
export const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json({ success: true, count: notices.length, data: notices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create notice (Admin only)
// @route   POST /api/stats/notices
// @access  Private/Admin
export const createNotice = async (req, res) => {
  try {
    const { title, content, category, priority } = req.body;
    const notice = await Notice.create({
      title,
      content,
      category: category || 'General',
      priority: priority || 'Normal',
      postedBy: req.user.name,
    });
    res.status(201).json({ success: true, message: 'Notice posted successfully', data: notice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
