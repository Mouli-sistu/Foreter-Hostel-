import mongoose from 'mongoose';

const maintenanceRequestSchema = new mongoose.Schema(
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
    roomNumber: {
      type: String,
      required: true,
    },
    facilityCategory: {
      type: String,
      enum: [
        '24/7 Electricity',
        'High-Speed Wi-Fi',
        'Hot Water / Geyser',
        'Washing Machine / Laundry',
        'Room Cleaning',
        'Plumbing & Bathroom',
        'Other',
      ],
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide issue title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide detailed issue description'],
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Emergency'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Resolved'],
      default: 'Pending',
    },
    adminNotes: {
      type: String,
      default: '',
    },
    resolvedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const MaintenanceRequest = mongoose.model('MaintenanceRequest', maintenanceRequestSchema);
export default MaintenanceRequest;
