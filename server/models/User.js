import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    role: {
      type: String,
      enum: ['resident', 'admin'],
      default: 'resident',
    },
    phone: {
      type: String,
      required: [true, 'Please provide a phone number'],
      trim: true,
    },
    // Stay & Check-in Details
    roomNumber: {
      type: String,
      default: '',
    },
    sharingType: {
      type: String,
      enum: ['3-Share', '4-Share', 'Unassigned'],
      default: 'Unassigned',
    },
    bedId: {
      type: String,
      default: '',
    },
    checkInDate: {
      type: Date,
      default: null,
    },
    stayDurationMonths: {
      type: Number,
      default: 6,
    },
    expectedCheckOutDate: {
      type: Date,
      default: null,
    },
    monthlyRent: {
      type: Number,
      default: 7500, // ₹7,500 for 4-share, ₹10,000 for 3-share
    },
    paymentStatus: {
      type: String,
      enum: ['Paid', 'Pending', 'Due', 'Overdue'],
      default: 'Paid',
    },
    collegeOrCompany: {
      type: String,
      default: 'Engineering Student / IT Professional',
    },
    emergencyContact: {
      name: { type: String, default: '' },
      phone: { type: String, default: '' },
      relation: { type: String, default: 'Parent / Guardian' },
    },
    idProofNumber: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password helper
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
