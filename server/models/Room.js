import mongoose from 'mongoose';

const bedSchema = new mongoose.Schema({
  bedId: {
    type: String,
    required: true,
  },
  isOccupied: {
    type: Boolean,
    default: false,
  },
  residentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  residentName: {
    type: String,
    default: '',
  },
  checkInDate: {
    type: Date,
    default: null,
  },
});

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: [true, 'Please provide room number'],
      unique: true,
      trim: true,
    },
    floor: {
      type: Number,
      required: [true, 'Please provide floor number'],
    },
    sharingType: {
      type: String,
      enum: ['3-Share', '4-Share'],
      required: [true, 'Please specify 3-Share or 4-Share'],
    },
    capacity: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return v === 3 || v === 4;
        },
        message: 'Hostel rooms are exclusively 3-share or 4-share',
      },
    },
    occupied: {
      type: Number,
      default: 0,
    },
    monthlyPrice: {
      type: Number,
      required: true,
      default: function () {
        return this.sharingType === '3-Share' ? 10000 : 7500;
      },
    },
    beds: [bedSchema],
    amenities: {
      type: [String],
      default: [
        '24/7 Electricity Backup',
        'High-Speed Wi-Fi',
        '24/7 Hot Water',
        'Attached Bathroom',
        'Personal Wooden Wardrobe',
        'Study Table & Chair',
      ],
    },
    status: {
      type: String,
      enum: ['Available', 'Partially Occupied', 'Full', 'Under Maintenance'],
      default: 'Available',
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

// Auto-update room status based on bed occupancy
roomSchema.pre('save', function (next) {
  const occupiedCount = this.beds.filter((b) => b.isOccupied).length;
  this.occupied = occupiedCount;
  if (this.occupied === 0) {
    this.status = 'Available';
  } else if (this.occupied < this.capacity) {
    this.status = 'Partially Occupied';
  } else {
    this.status = 'Full';
  }
  next();
});

const Room = mongoose.model('Room', roomSchema);
export default Room;
