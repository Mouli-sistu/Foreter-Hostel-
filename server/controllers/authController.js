import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Helper to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '30d',
  });
};

// @desc    Register a new user (Resident or Admin)
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { name, email, password, phone, role, collegeOrCompany, emergencyContact } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, password, phone',
      });
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'A user with this email address already exists',
      });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      phone,
      role: role === 'admin' ? 'admin' : 'resident',
      collegeOrCompany: collegeOrCompany || 'Engineering Student / Working Professional',
      emergencyContact: emergencyContact || { name: '', phone: '', relation: 'Parent / Guardian' },
    });

    res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        roomNumber: user.roomNumber,
        sharingType: user.sharingType,
        bedId: user.bedId,
        checkInDate: user.checkInDate,
        stayDurationMonths: user.stayDurationMonths,
        expectedCheckOutDate: user.expectedCheckOutDate,
        paymentStatus: user.paymentStatus,
        monthlyRent: user.monthlyRent,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password',
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        message: `Welcome back, ${user.name}!`,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          roomNumber: user.roomNumber,
          sharingType: user.sharingType,
          bedId: user.bedId,
          checkInDate: user.checkInDate,
          stayDurationMonths: user.stayDurationMonths,
          expectedCheckOutDate: user.expectedCheckOutDate,
          paymentStatus: user.paymentStatus,
          monthlyRent: user.monthlyRent,
          collegeOrCompany: user.collegeOrCompany,
          emergencyContact: user.emergencyContact,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password credentials',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get current logged in user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.phone = req.body.phone || user.phone;
    user.collegeOrCompany = req.body.collegeOrCompany || user.collegeOrCompany;
    if (req.body.emergencyContact) {
      user.emergencyContact = {
        ...user.emergencyContact,
        ...req.body.emergencyContact,
      };
    }

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
        roomNumber: updatedUser.roomNumber,
        sharingType: updatedUser.sharingType,
        bedId: updatedUser.bedId,
        checkInDate: updatedUser.checkInDate,
        stayDurationMonths: updatedUser.stayDurationMonths,
        expectedCheckOutDate: updatedUser.expectedCheckOutDate,
        paymentStatus: updatedUser.paymentStatus,
        monthlyRent: updatedUser.monthlyRent,
        emergencyContact: updatedUser.emergencyContact,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
