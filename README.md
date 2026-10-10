# 🏨 Foreter Pg for men — Hostel Management System (Full Stack MERN)

A modern, production-grade **Full-Stack Hostel & PG Management Web Application** designed for **Foreter Pg for men** in Madhapur, Hitec City, Hyderabad. Built with **React** for the frontend, **Node.js & Express** for the backend REST API, **MongoDB & Mongoose** for database persistence, and **JWT (JSON Web Token)** for secure authentication.

---

## 🌟 Key Application Features

### 1. 🍛 Authentic Hyderabad PG Food & 3-Times Daily Mess
- **3-Times Daily Unlimited Buffet**: Fresh South Indian breakfast (Idli, Masala Dosa, Puri, Upma with coconut & ginger chutney), homely lunch (warm phulkas, steamed Sona Masoori rice, dal tadka, veg curries, curd & Gongura pickle), evening Irani Chai & snacks (Mirchi Bajji, Pakoda), and hot dinner.
- **🍗 Sunday Special Hyderabadi Dum Biryani**: Authentic slow-cooked Chicken Dum Biryani and Royal Paneer Dum Biryani with Mirchi Ka Salan, Onion Raita, and Gulab Jamun!
- **Wednesday Special**: Andhra style chicken curry & egg curry / paneer butter masala.
- **Clean Hygienic Dining**: Stainless steel kitchen with separate preparation and serving counters for vegetarian and non-vegetarian meals.

---

### 2. ⚡ Complete Specifications & PG Facilities
- **24/7 DG Electricity Backup**: Continuous heavy-duty diesel generator (AMF auto-switch) that runs ACs, fans, lights, elevator, and Wi-Fi with 100% uptime during Hyderabad summer power cuts.
- **500 Mbps Dual Fiber Wi-Fi**: Enterprise mesh network (ACT Fibernet + Airtel Xstream dual fiber) with low latency across all rooms and corridors.
- **24/7 Hot Water**: Hybrid solar thermal heating arrays paired with en-suite geysers.
- **Automated Laundromat Zone**: Fully automatic washing machines, covered terrace drying zone, and steam iron stations.
- **Biometric Security & 2-Wheeler Parking**: Biometric gate entry, 24/7 CCTV surveillance, and covered two-wheeler parking with EV charging.
- **RO Mineral Water Dispensers**: Chilled and ambient multi-stage RO + UV mineral drinking water on every floor.

---

### 3. 📍 Prime Hyderabad IT Corridor Proximity
- Located on Madhapur 100 Feet Road beside Durgam Cheruvu Metro Station (4 mins walk).
- 5 mins to Cyber Towers, Raheja Mindspace, DLF Cybercity, and major IT campuses (TCS, Google, Amazon, Microsoft, Deloitte).

---

### 4. 🛏️ Room Sharing & Pricing (3-Share & 4-Share)
- **3-Share Premium Room (AC) — ₹10,000 / resident / month**
  - Triple occupancy with 3 wooden beds, orthopaedic mattresses
  - 3 independent study desks with LED reading lamps & power strips
  - 3 lockable wardrobes, en-suite bathroom with 24/7 hot water, high-speed Wi-Fi
  - All meals, Sunday Biryani, electricity, and laundry included
- **4-Share Value Room (AC) — ₹7,500 / resident / month**
  - Quad occupancy with 4 wooden beds, personal steel lockers with keys
  - Shared study zone with dedicated laptop plugs
  - Attached bathroom with 24/7 hot water shower, high-speed Wi-Fi, daily housekeeping
  - All meals, Sunday Biryani, electricity, and laundry included

---

### 5. 👥 Dual Dedicated Portals

#### 👑 Admin Portal (Hostel Owner & Warden)
- **Executive KPI Dashboard**: Total Residents, Bed Occupancy rate, Monthly Revenue, Pending Fee Dues, Open Facility Tickets.
- **Resident Stay Management**: Comprehensive roster of all residents showing Name, Phone, Room Number, 3/4-Share layout, Bed ID, Check-in Date, Stay Duration (Time Period), Expected Check-out, and Payment status.
- **1-Click Bed Allocation**: Assign unassigned residents to specific vacant beds in 3-Share or 4-Share rooms.
- **Resident Check-out**: 1-click checkout that immediately releases bed slots back to inventory.
- **Facility Maintenance Desk**: Review tickets raised by residents (Wi-Fi, power, geyser, washing machine) and mark as *In Progress* or *Resolved* with warden notes.
- **Notice Board Broadcast**: Post announcements displayed across all resident portals.

#### 👤 Stay People Portal (Resident)
- **Check-in Record & Stay Duration Visualizer**:
  - Allocated Room Number & Sharing Type (3-Share @ ₹10k / 4-Share @ ₹7.5k)
  - Bed ID (Bed A, Bed B, etc.)
  - Check-in Date & Expected Check-out Date
  - Stay Time Period (e.g., 6 Months stay) with real-time days-stayed elapsed progress bar
  - Monthly rent & payment status badge (Paid / Due)
- **Digital Resident ID Card Modal**: Interactive hostel ID card badge with QR code, check-in date, room details, and emergency contact.
- **🌙 Night Shift Gate Pass Generator**: Generate an instant verified late entry gate pass for IT professionals working late shifts past the 10:30 PM gate curfew.
- **💳 UPI / QR Code Rent Payment**: Scan UPI QR code (Google Pay, PhonePe, Paytm) and generate instant HRA rent receipts.
- **Live Facilities Hub**: One-click Wi-Fi password copy (`ForeterPgSecure#2026`), generator status, laundromat timings.
- **Raise Maintenance Ticket**: Report facility issues with priority levels and track real-time resolution status.
- **Self-Service Check-in**: For new residents to choose their preferred sharing plan, select an available bed, and check in.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18+ or v20+ recommended
- **MongoDB**: Local MongoDB instance (`mongodb://127.0.0.1:27017/hostel_management`)

### 2. Backend Setup
```bash
cd server
npm install
npm run seed     # Seeds demo rooms, admin, and residents
npm run dev      # Runs backend at http://localhost:5000
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev      # Runs frontend at http://localhost:5173
```

---

## 🔑 Demo Accounts

| Role | Email | Password | Details |
|------|-------|----------|---------|
| **Hostel Owner (Admin)** | `admin@hostel.com` | `admin123` | Full Owner Control Center & Bed Allocation |
| **Resident (3-Share)** | `rahul@gmail.com` | `resident123` | Room 101, Bed A · ₹10,000/mo |
| **Resident (4-Share)** | `arun@gmail.com` | `resident123` | Room 201, Bed A · ₹7,500/mo |
| **New Resident** | `vikram@gmail.com` | `resident123` | Unassigned · Test self check-in |
