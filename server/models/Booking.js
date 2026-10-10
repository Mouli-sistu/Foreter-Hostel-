import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    resident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    residentName: {
      type: String,
      required: true,
    },
    residentEmail: {
      type: String,
      required: true,
    },
    residentPhone: {
      type: String,
      required: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    roomNumber: {
      type: String,
      required: true,
    },
    bedId: {
      type: String,
      required: true,
    },
    sharingType: {
      type: String,
      enum: ['3-Share', '4-Share'],
      required: true,
    },
    monthlyRent: {
      type: Number,
      required: true,
    },
    checkInDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    stayDurationMonths: {
      type: Number,
      required: true,
      default: 6,
    },
    expectedCheckOutDate: {
      type: Date,
      required: true,
    },
    actualCheckOutDate: {
      type: Date,
      default: null,
    },
    paymentStatus: {
      type: String,
      enum: ['Paid', 'Pending', 'Due', 'Overdue'],
      default: 'Paid',
    },
    paymentMethod: {
      type: String,
      enum: ['UPI', 'Net Banking', 'Cash', 'Credit/Debit Card'],
      default: 'UPI',
    },
    transactionId: {
      type: String,
      default: function () {
        return 'TXN-' + Math.floor(100000 + Math.random() * 900000);
      },
    },
    status: {
      type: String,
      enum: ['Active', 'Completed', 'Cancelled'],
      default: 'Active',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
