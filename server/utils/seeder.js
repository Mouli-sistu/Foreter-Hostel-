import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Room from '../models/Room.js';
import Booking from '../models/Booking.js';
import MaintenanceRequest from '../models/MaintenanceRequest.js';
import Notice from '../models/Notice.js';

dotenv.config();

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hostel_management';
    await mongoose.connect(mongoUri);
    console.log('[Seeder] Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany();
    await Room.deleteMany();
    await Booking.deleteMany();
    await MaintenanceRequest.deleteMany();
    await Notice.deleteMany();
    console.log('[Seeder] Cleared existing collections');

    // 1. Create Admin
    const admin = await User.create({
      name: 'Rajesh Sharma (Owner & Warden)',
      email: 'admin@hostel.com',
      password: 'admin123',
      role: 'admin',
      phone: '+91 98765 43210',
      collegeOrCompany: 'Foreter Pg for men Management Office, Madhapur',
    });
    console.log(`[Seeder] Admin created: ${admin.email}`);

    // 2. Create Rooms
    // 3-Share rooms: ₹10,000 / month
    // 4-Share rooms: ₹7,500 / month
    const room101 = await Room.create({
      roomNumber: '101',
      floor: 1,
      sharingType: '3-Share',
      capacity: 3,
      monthlyPrice: 10000,
      beds: [
        { bedId: 'Bed A', isOccupied: false, residentId: null, residentName: '' },
        { bedId: 'Bed B', isOccupied: false, residentId: null, residentName: '' },
        { bedId: 'Bed C', isOccupied: false, residentId: null, residentName: '' },
      ],
      amenities: [
        '24/7 Electricity Backup',
        'High-Speed Wi-Fi',
        '24/7 Hot Water',
        'Attached Bathroom',
        'Wooden Wardrobe',
        'Study Table & Chair',
        'Air Cooling',
      ],
      notes: 'South facing, abundant sunlight, ground floor garden view.',
    });

    const room102 = await Room.create({
      roomNumber: '102',
      floor: 1,
      sharingType: '3-Share',
      capacity: 3,
      monthlyPrice: 10000,
      beds: [
        { bedId: 'Bed A', isOccupied: false, residentId: null, residentName: '' },
        { bedId: 'Bed B', isOccupied: false, residentId: null, residentName: '' },
        { bedId: 'Bed C', isOccupied: false, residentId: null, residentName: '' },
      ],
      amenities: [
        '24/7 Electricity Backup',
        'High-Speed Wi-Fi',
        '24/7 Hot Water',
        'Attached Bathroom',
        'Wooden Wardrobe',
        'Study Table & Chair',
      ],
      notes: 'Quiet corner room near the study lounge.',
    });

    const room103 = await Room.create({
      roomNumber: '103',
      floor: 1,
      sharingType: '3-Share',
      capacity: 3,
      monthlyPrice: 10000,
      beds: [
        { bedId: 'Bed A', isOccupied: false, residentId: null, residentName: '' },
        { bedId: 'Bed B', isOccupied: false, residentId: null, residentName: '' },
        { bedId: 'Bed C', isOccupied: false, residentId: null, residentName: '' },
      ],
      amenities: [
        '24/7 Electricity Backup',
        'High-Speed Wi-Fi',
        '24/7 Hot Water',
        'Attached Bathroom',
        'Wooden Wardrobe',
      ],
      notes: 'Spacious triple sharing unit.',
    });

    const room201 = await Room.create({
      roomNumber: '201',
      floor: 2,
      sharingType: '4-Share',
      capacity: 4,
      monthlyPrice: 7500,
      beds: [
        { bedId: 'Bed A', isOccupied: false, residentId: null, residentName: '' },
        { bedId: 'Bed B', isOccupied: false, residentId: null, residentName: '' },
        { bedId: 'Bed C', isOccupied: false, residentId: null, residentName: '' },
        { bedId: 'Bed D', isOccupied: false, residentId: null, residentName: '' },
      ],
      amenities: [
        '24/7 Electricity Backup',
        'High-Speed Wi-Fi',
        '24/7 Hot Water',
        'Attached Bathroom',
        'Personal Steel Locker',
        'Ceiling Fans',
      ],
      notes: 'Large quad sharing room with balcony access.',
    });

    const room202 = await Room.create({
      roomNumber: '202',
      floor: 2,
      sharingType: '4-Share',
      capacity: 4,
      monthlyPrice: 7500,
      beds: [
        { bedId: 'Bed A', isOccupied: false, residentId: null, residentName: '' },
        { bedId: 'Bed B', isOccupied: false, residentId: null, residentName: '' },
        { bedId: 'Bed C', isOccupied: false, residentId: null, residentName: '' },
        { bedId: 'Bed D', isOccupied: false, residentId: null, residentName: '' },
      ],
      amenities: [
        '24/7 Electricity Backup',
        'High-Speed Wi-Fi',
        '24/7 Hot Water',
        'Attached Bathroom',
        'Personal Steel Locker',
      ],
      notes: 'Close to laundry area.',
    });

    const room203 = await Room.create({
      roomNumber: '203',
      floor: 2,
      sharingType: '4-Share',
      capacity: 4,
      monthlyPrice: 7500,
      beds: [
        { bedId: 'Bed A', isOccupied: false, residentId: null, residentName: '' },
        { bedId: 'Bed B', isOccupied: false, residentId: null, residentName: '' },
        { bedId: 'Bed C', isOccupied: false, residentId: null, residentName: '' },
        { bedId: 'Bed D', isOccupied: false, residentId: null, residentName: '' },
      ],
      amenities: [
        '24/7 Electricity Backup',
        'High-Speed Wi-Fi',
        '24/7 Hot Water',
        'Attached Bathroom',
        'Personal Steel Locker',
      ],
      notes: 'Available for immediate occupancy.',
    });

    console.log('[Seeder] 6 Rooms created (3-share @ 10,000 & 4-share @ 7,500)');

    // 3. Create Residents and Assign Beds
    // Resident 1: Rahul Verma (3-Share, Room 101, Bed A)
    const rahulCheckIn = new Date('2026-08-01');
    const rahulCheckOut = new Date('2027-02-01');
    const rahul = await User.create({
      name: 'Rahul Verma',
      email: 'rahul@gmail.com',
      password: 'resident123',
      role: 'resident',
      phone: '+91 98112 23344',
      roomNumber: '101',
      sharingType: '3-Share',
      bedId: 'Bed A',
      checkInDate: rahulCheckIn,
      stayDurationMonths: 6,
      expectedCheckOutDate: rahulCheckOut,
      monthlyRent: 10000,
      paymentStatus: 'Paid',
      collegeOrCompany: 'B.Tech Computer Science (Final Year)',
      emergencyContact: {
        name: 'Suresh Verma',
        phone: '+91 98112 00000',
        relation: 'Father',
      },
    });

    // Resident 2: Priya Sundaram (3-Share, Room 101, Bed B)
    const priyaCheckIn = new Date('2026-09-01');
    const priyaCheckOut = new Date('2027-09-01');
    const priya = await User.create({
      name: 'Priya Sundaram',
      email: 'priya@gmail.com',
      password: 'resident123',
      role: 'resident',
      phone: '+91 98223 34455',
      roomNumber: '101',
      sharingType: '3-Share',
      bedId: 'Bed B',
      checkInDate: priyaCheckIn,
      stayDurationMonths: 12,
      expectedCheckOutDate: priyaCheckOut,
      monthlyRent: 10000,
      paymentStatus: 'Paid',
      collegeOrCompany: 'Software Engineer @ TechCorp',
      emergencyContact: {
        name: 'Lakshmi Sundaram',
        phone: '+91 98223 00000',
        relation: 'Mother',
      },
    });

    // Resident 3: Arun Kumar (4-Share, Room 201, Bed A)
    const arunCheckIn = new Date('2026-07-15');
    const arunCheckOut = new Date('2027-01-15');
    const arun = await User.create({
      name: 'Arun Kumar',
      email: 'arun@gmail.com',
      password: 'resident123',
      role: 'resident',
      phone: '+91 98334 45566',
      roomNumber: '201',
      sharingType: '4-Share',
      bedId: 'Bed A',
      checkInDate: arunCheckIn,
      stayDurationMonths: 6,
      expectedCheckOutDate: arunCheckOut,
      monthlyRent: 7500,
      paymentStatus: 'Paid',
      collegeOrCompany: 'Data Analyst Trainee',
      emergencyContact: {
        name: 'Mohan Kumar',
        phone: '+91 98334 11111',
        relation: 'Father',
      },
    });

    // Resident 4: Ananya Patel (4-Share, Room 201, Bed B)
    const ananyaCheckIn = new Date('2026-09-15');
    const ananyaCheckOut = new Date('2026-12-15');
    const ananya = await User.create({
      name: 'Ananya Patel',
      email: 'ananya@gmail.com',
      password: 'resident123',
      role: 'resident',
      phone: '+91 98445 56677',
      roomNumber: '201',
      sharingType: '4-Share',
      bedId: 'Bed B',
      checkInDate: ananyaCheckIn,
      stayDurationMonths: 3,
      expectedCheckOutDate: ananyaCheckOut,
      monthlyRent: 7500,
      paymentStatus: 'Due',
      collegeOrCompany: 'MBA Finance Student',
      emergencyContact: {
        name: 'Kirit Patel',
        phone: '+91 98445 22222',
        relation: 'Father',
      },
    });

    // Resident 5: Vikram Singh (New applicant, not yet assigned)
    const vikram = await User.create({
      name: 'Vikram Singh',
      email: 'vikram@gmail.com',
      password: 'resident123',
      role: 'resident',
      phone: '+91 98556 67788',
      roomNumber: '',
      sharingType: 'Unassigned',
      bedId: '',
      collegeOrCompany: 'Full Stack Web Developer Intern',
      emergencyContact: {
        name: 'Harpal Singh',
        phone: '+91 98556 33333',
        relation: 'Father',
      },
    });

    // Update Room 101 beds
    room101.beds[0].isOccupied = true;
    room101.beds[0].residentId = rahul._id;
    room101.beds[0].residentName = rahul.name;
    room101.beds[0].checkInDate = rahulCheckIn;

    room101.beds[1].isOccupied = true;
    room101.beds[1].residentId = priya._id;
    room101.beds[1].residentName = priya.name;
    room101.beds[1].checkInDate = priyaCheckIn;
    await room101.save();

    // Update Room 201 beds
    room201.beds[0].isOccupied = true;
    room201.beds[0].residentId = arun._id;
    room201.beds[0].residentName = arun.name;
    room201.beds[0].checkInDate = arunCheckIn;

    room201.beds[1].isOccupied = true;
    room201.beds[1].residentId = ananya._id;
    room201.beds[1].residentName = ananya.name;
    room201.beds[1].checkInDate = ananyaCheckIn;
    await room201.save();

    // 4. Create Active Bookings for stay records
    await Booking.create([
      {
        resident: rahul._id,
        residentName: rahul.name,
        residentEmail: rahul.email,
        residentPhone: rahul.phone,
        room: room101._id,
        roomNumber: '101',
        bedId: 'Bed A',
        sharingType: '3-Share',
        monthlyRent: 10000,
        checkInDate: rahulCheckIn,
        stayDurationMonths: 6,
        expectedCheckOutDate: rahulCheckOut,
        paymentStatus: 'Paid',
        paymentMethod: 'UPI',
        status: 'Active',
      },
      {
        resident: priya._id,
        residentName: priya.name,
        residentEmail: priya.email,
        residentPhone: priya.phone,
        room: room101._id,
        roomNumber: '101',
        bedId: 'Bed B',
        sharingType: '3-Share',
        monthlyRent: 10000,
        checkInDate: priyaCheckIn,
        stayDurationMonths: 12,
        expectedCheckOutDate: priyaCheckOut,
        paymentStatus: 'Paid',
        paymentMethod: 'Net Banking',
        status: 'Active',
      },
      {
        resident: arun._id,
        residentName: arun.name,
        residentEmail: arun.email,
        residentPhone: arun.phone,
        room: room201._id,
        roomNumber: '201',
        bedId: 'Bed A',
        sharingType: '4-Share',
        monthlyRent: 7500,
        checkInDate: arunCheckIn,
        stayDurationMonths: 6,
        expectedCheckOutDate: arunCheckOut,
        paymentStatus: 'Paid',
        paymentMethod: 'UPI',
        status: 'Active',
      },
      {
        resident: ananya._id,
        residentName: ananya.name,
        residentEmail: ananya.email,
        residentPhone: ananya.phone,
        room: room201._id,
        roomNumber: '201',
        bedId: 'Bed B',
        sharingType: '4-Share',
        monthlyRent: 7500,
        checkInDate: ananyaCheckIn,
        stayDurationMonths: 3,
        expectedCheckOutDate: ananyaCheckOut,
        paymentStatus: 'Due',
        paymentMethod: 'UPI',
        status: 'Active',
      },
    ]);
    console.log('[Seeder] Active stay bookings seeded');

    // 5. Create Maintenance Tickets for facilities
    await MaintenanceRequest.create([
      {
        resident: rahul._id,
        residentName: rahul.name,
        roomNumber: '101',
        facilityCategory: 'High-Speed Wi-Fi',
        title: 'Wi-Fi mesh node reconnecting intermittently',
        description:
          'Wi-Fi 5GHz connection dropped twice during evening video call. Please check the corridor router access point.',
        priority: 'High',
        status: 'In Progress',
        adminNotes: 'Technician scheduled for 11 AM tomorrow to re-align access point antennas.',
      },
      {
        resident: arun._id,
        residentName: arun.name,
        roomNumber: '201',
        facilityCategory: 'Hot Water / Geyser',
        title: 'Solar hot water pressure check',
        description: 'Hot water temperature is excellent, but water pressure in shower head is slightly low.',
        priority: 'Medium',
        status: 'Resolved',
        resolvedAt: new Date(),
        adminNotes: 'Plumber descaled the shower nozzle and verified 24/7 pressure valve.',
      },
      {
        resident: ananya._id,
        residentName: ananya.name,
        roomNumber: '201',
        facilityCategory: 'Washing Machine / Laundry',
        title: 'Laundromat machine #2 spin cycle vibration',
        description: 'The second front-load washing machine vibrates loudly during the rapid spin cycle.',
        priority: 'Medium',
        status: 'Pending',
      },
      {
        resident: priya._id,
        residentName: priya.name,
        roomNumber: '101',
        facilityCategory: '24/7 Electricity',
        title: 'Reading desk socket switch replaced',
        description: 'Individual desk switch socket was loose.',
        priority: 'Low',
        status: 'Resolved',
        resolvedAt: new Date(),
        adminNotes: 'Electrician replaced socket switch with brand new anchor unit.',
      },
    ]);
    console.log('[Seeder] Maintenance facility tickets seeded');

    // 6. Create Notices
    await Notice.create([
      {
        title: 'Sunday Special Hyderabadi Dum Biryani Feast (1:00 PM)',
        content:
          'Chef special Hyderabadi Chicken Dum Biryani & Royal Paneer Biryani with Mirchi Ka Salan, Raita & Gulab Jamun served this Sunday at the mess hall.',
        category: 'Mess/Food',
        priority: 'Important',
        postedBy: 'Mess Committee',
      },
      {
        title: 'High-Speed Wi-Fi 6 Upgrade Completed (500 Mbps)',
        content:
          'We have upgraded our backbone to dual fiber-optic lines (ACT + Airtel). Residents can connect to ForeterPg_Men_5G on all floors with ultra-low ping.',
        category: 'Wi-Fi',
        priority: 'Important',
        postedBy: 'Hostel Warden',
      },
      {
        title: '24/7 Hot Water & Power Backup Operational Health Check',
        content:
          'Routine preventive maintenance for the solar water heaters and diesel generator was conducted successfully. Zero outages.',
        category: 'Facility',
        priority: 'Normal',
        postedBy: 'Facilities Team',
      },
      {
        title: 'Laundromat Automated Washing Machine Guidelines',
        content:
          'Please ensure clothing items are emptied of coins and keys before using the front-load machines. Dry racks are available on the terrace.',
        category: 'Facility',
        priority: 'Normal',
        postedBy: 'Hostel Warden',
      },
    ]);
    console.log('[Seeder] Notices created');

    console.log('\n=============================================');
    console.log(' SEEDING COMPLETED SUCCESSFULLY! ');
    console.log('=============================================');
    console.log('Admin Account:');
    console.log('  Email:    admin@hostel.com');
    console.log('  Password: admin123');
    console.log('Resident Accounts:');
    console.log('  Email:    rahul@gmail.com (3-Share, Rm 101, ₹10,000)');
    console.log('  Email:    priya@gmail.com (3-Share, Rm 101, ₹10,000)');
    console.log('  Email:    arun@gmail.com (4-Share, Rm 201, ₹7,500)');
    console.log('  Email:    ananya@gmail.com (4-Share, Rm 201, ₹7,500)');
    console.log('  Email:    vikram@gmail.com (Unassigned applicant)');
    console.log('  Password for all residents: resident123');
    console.log('=============================================\n');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('[Seeder Error]', error);
    process.exit(1);
  }
};

seedData();
