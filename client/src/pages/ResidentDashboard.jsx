import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import DigitalIdCardModal from '../components/DigitalIdCardModal';
import HydNightGatePassModal from '../components/HydNightGatePassModal';
import HydUpiPaymentModal from '../components/HydUpiPaymentModal';
import {
  Calendar,
  Clock,
  Home,
  Bed,
  CreditCard,
  Zap,
  Wifi,
  Flame,
  Shirt,
  Shield,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Send,
  Sparkles,
  QrCode,
  Copy,
  Check,
  Moon,
  Utensils,
  DollarSign
} from 'lucide-react';

export default function ResidentDashboard({ onOpenAuth }) {
  const { user, refreshUser, isAuthenticated } = useAuth();
  const [stayData, setStayData] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showIdCard, setShowIdCard] = useState(false);
  const [showNightPass, setShowNightPass] = useState(false);
  const [showUpiPayment, setShowUpiPayment] = useState(false);
  const [copiedWifi, setCopiedWifi] = useState(false);

  // New ticket state
  const [ticketCategory, setTicketCategory] = useState('High-Speed Wi-Fi');
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketPriority, setTicketPriority] = useState('Medium');
  const [ticketSubmitting, setTicketSubmitting] = useState(false);
  const [ticketMessage, setTicketMessage] = useState('');

  // Self check-in for unassigned residents
  const [availableRooms, setAvailableRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [selectedBedId, setSelectedBedId] = useState('');
  const [stayDuration, setStayDuration] = useState(6);
  const [checkInSubmitting, setCheckInSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated, user?.roomNumber]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Fetch stay details
      const stayRes = await api.bookings.getMyStay().catch(() => ({ data: {} }));
      if (stayRes.success) {
        setStayData(stayRes.data);
      }

      // 2. Fetch my tickets
      const ticketRes = await api.maintenance.getMyTickets().catch(() => ({ data: [] }));
      if (ticketRes.success) {
        setTickets(ticketRes.data || []);
      }

      // 3. Fetch notices
      const noticeRes = await api.stats.getNotices().catch(() => ({ data: [] }));
      if (noticeRes.success) {
        setNotices(noticeRes.data || []);
      }

      // 4. If unassigned, load available rooms
      if (!user?.roomNumber) {
        const roomsRes = await api.rooms.getAll();
        if (roomsRes.success && roomsRes.data) {
          setAvailableRooms(roomsRes.data.filter((r) => r.beds.some((b) => !b.isOccupied)));
        }
      }
    } catch (err) {
      console.error('Error loading resident dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    if (!ticketTitle || !ticketDescription) return;

    setTicketSubmitting(true);
    setTicketMessage('');
    try {
      const res = await api.maintenance.create({
        facilityCategory: ticketCategory,
        title: ticketTitle,
        description: ticketDescription,
        priority: ticketPriority,
      });

      if (res.success) {
        setTicketMessage('Ticket submitted successfully! Hostel warden alerted.');
        setTicketTitle('');
        setTicketDescription('');
        // Refresh tickets
        const ticketRes = await api.maintenance.getMyTickets();
        if (ticketRes.success) setTickets(ticketRes.data || []);
      }
    } catch (err) {
      setTicketMessage(err.message || 'Failed to submit ticket');
    } finally {
      setTicketSubmitting(false);
    }
  };

  const handleSelfCheckIn = async (e) => {
    e.preventDefault();
    if (!selectedRoomId || !selectedBedId) return;

    setCheckInSubmitting(true);
    try {
      const res = await api.bookings.selfBook({
        roomId: selectedRoomId,
        bedId: selectedBedId,
        stayDurationMonths: stayDuration,
      });

      if (res.success) {
        await refreshUser();
        await loadDashboardData();
      }
    } catch (err) {
      alert(err.message || 'Check-in failed');
    } finally {
      setCheckInSubmitting(false);
    }
  };

  const copyWifiPassword = () => {
    navigator.clipboard.writeText('ForeterPgSecure#2026');
    setCopiedWifi(true);
    setTimeout(() => setCopiedWifi(false), 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div className="glass-panel" style={{ maxWidth: 520, margin: '0 auto', padding: 40, background: '#ffffff' }}>
          <Shield size={48} color="#4f46e5" style={{ marginBottom: 16 }} />
          <h2 style={{ fontSize: '1.8rem', marginBottom: 12, color: 'var(--text-main)' }}>Foreter PG Resident Portal</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>
            Please log in to view your check-in records, bed allocation, stay validity time period, night gate pass, and facility maintenance requests.
          </p>
          <button onClick={() => onOpenAuth('login')} className="btn btn-primary" style={{ width: '100%' }}>
            Sign In to Stay Portal
          </button>
        </div>
      </div>
    );
  }

  // Calculate stay duration & days elapsed
  const checkInDate = user.checkInDate ? new Date(user.checkInDate) : null;
  const checkOutDate = user.expectedCheckOutDate ? new Date(user.expectedCheckOutDate) : null;
  let daysStayed = 0;
  let totalDays = 0;
  let stayProgressPercent = 0;

  if (checkInDate && checkOutDate) {
    const now = new Date();
    const diffTime = Math.max(0, now - checkInDate);
    daysStayed = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    totalDays = Math.max(1, Math.floor((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)));
    stayProgressPercent = Math.min(100, Math.round((daysStayed / totalDays) * 100));
  }

  return (
    <div style={{ padding: '40px 0 60px' }}>
      <div className="container">
        {/* Top Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          marginBottom: 28,
        }}>
          <div>
            <span className="badge badge-primary" style={{ marginBottom: 6 }}>
              <Home size={12} /> Foreter Pg for men · Resident Portal
            </span>
            <h1 style={{ fontSize: '2.2rem', color: 'var(--text-main)' }}>
              Welcome Back, <span className="text-gradient">{user.name}</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
              Madhapur Campus, Hyderabad · Check-in records, stay period tracking, and resident services.
            </p>
          </div>

          {/* Quick Action Badges */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowNightPass(true)}
              className="btn btn-secondary btn-sm"
              style={{ background: '#f8fafc', color: '#4338ca', border: '1px solid #c7d2fe' }}
              title="Issue gate pass for night shifts past 10:30 PM"
            >
              <Moon size={15} /> Night Shift Gate Pass
            </button>

            <button
              onClick={() => setShowUpiPayment(true)}
              className="btn btn-secondary btn-sm"
              style={{ background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0' }}
              title="Pay rent via UPI QR Code and download HRA receipt"
            >
              <DollarSign size={15} /> Pay Rent via UPI
            </button>

            {user.roomNumber && (
              <button
                onClick={() => setShowIdCard(true)}
                className="btn btn-primary btn-sm"
              >
                <QrCode size={15} /> Digital Resident ID
              </button>
            )}
          </div>
        </div>

        {/* UNASSIGNED RESIDENT NOTICE & SELF CHECK-IN */}
        {!user.roomNumber ? (
          <div className="glass-panel" style={{
            padding: 32,
            marginBottom: 36,
            border: '2px dashed #f59e0b',
            background: '#fffbeb',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 20 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: '#fef3c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#d97706',
                flexShrink: 0,
              }}>
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem', color: '#b45309', marginBottom: 4 }}>
                  No Room Allocated Yet
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  You are registered as a resident, but you have not yet completed room and bed check-in. Select your preferred room layout below (3-Share at ₹10,000 or 4-Share at ₹7,500) to confirm your check-in immediately.
                </p>
              </div>
            </div>

            <form onSubmit={handleSelfCheckIn} style={{ maxWidth: 640 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 16 }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Select Room</label>
                  <select
                    className="form-select"
                    value={selectedRoomId}
                    onChange={(e) => {
                      setSelectedRoomId(e.target.value);
                      const targetRoom = availableRooms.find((r) => r._id === e.target.value);
                      const firstFreeBed = targetRoom?.beds.find((b) => !b.isOccupied);
                      setSelectedBedId(firstFreeBed ? firstFreeBed.bedId : '');
                    }}
                    required
                  >
                    <option value="">-- Choose a Room --</option>
                    {availableRooms.map((r) => {
                      const freeCount = r.beds.filter((b) => !b.isOccupied).length;
                      return (
                        <option key={r._id} value={r._id}>
                          Room {r.roomNumber} ({r.sharingType} · ₹{r.monthlyPrice.toLocaleString()}/mo · {freeCount} beds free)
                        </option>
                      );
                    })}
                  </select>
                </div>

                {selectedRoomId && (
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Select Bed</label>
                    <select
                      className="form-select"
                      value={selectedBedId}
                      onChange={(e) => setSelectedBedId(e.target.value)}
                      required
                    >
                      {availableRooms
                        .find((r) => r._id === selectedRoomId)
                        ?.beds.filter((b) => !b.isOccupied)
                        .map((b) => (
                          <option key={b.bedId} value={b.bedId}>
                            {b.bedId} (Vacant)
                          </option>
                        ))}
                    </select>
                  </div>
                )}

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Stay Duration</label>
                  <select
                    className="form-select"
                    value={stayDuration}
                    onChange={(e) => setStayDuration(Number(e.target.value))}
                  >
                    <option value={3}>3 Months</option>
                    <option value={6}>6 Months (Standard)</option>
                    <option value={12}>12 Months (Full Year)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={checkInSubmitting || !selectedRoomId || !selectedBedId}
                className="btn btn-emerald"
                style={{ padding: '10px 24px' }}
              >
                {checkInSubmitting ? 'Checking In...' : 'Confirm Check-in & Bed Allocation'}
              </button>
            </form>
          </div>
        ) : (
          /* ACTIVE CHECK-IN & STAY PERIOD DETAILS */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24,
            marginBottom: 36,
          }}>
            {/* Primary Stay Card */}
            <div className="glass-panel" style={{
              padding: 28,
              border: '2px solid #c7d2fe',
              background: '#ffffff',
              boxShadow: '0 8px 24px rgba(79, 70, 229, 0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <span className="badge badge-primary">
                  <Home size={12} /> Active Check-in Record
                </span>
                <span className="badge badge-emerald">
                  ● {user.paymentStatus || 'Paid'}
                </span>
              </div>

              {/* Room & Bed Banner */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Room {user.roomNumber}
                </span>
                <span style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: user.sharingType === '3-Share' ? '#4f46e5' : '#0284c7',
                }}>
                  ({user.bedId})
                </span>
                <span className={`badge ${user.sharingType === '3-Share' ? 'badge-primary' : 'badge-cyan'}`}>
                  {user.sharingType}
                </span>
              </div>

              {/* Monthly pricing */}
              <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: 20 }}>
                Monthly Tariff: <strong style={{ color: 'var(--text-main)' }}>₹{user.monthlyRent?.toLocaleString() || (user.sharingType === '3-Share' ? '10,000' : '7,500')}</strong> / month (includes 3-times meals, 24/7 DG backup, 500 Mbps Wi-Fi & laundry)
              </div>

              {/* Stay Duration Time Period Details */}
              <div style={{
                background: '#f8fafc',
                borderRadius: 14,
                border: '1px solid #e2e8f0',
                padding: 16,
                marginBottom: 20,
              }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 10, fontWeight: 700 }}>
                  Time Period & Validity Tracking
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 14 }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>CHECK-IN DATE</div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                      {checkInDate ? checkInDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>EXPECTED CHECK-OUT</div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                      {checkOutDate ? checkOutDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>TOTAL PERIOD</div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#4f46e5' }}>
                      {user.stayDurationMonths || 6} Months ({totalDays} Days)
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>DAYS STAYED SO FAR</div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#059669' }}>
                      {daysStayed} Days Elapsed
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: 4 }}>
                    <span>Stay Period Elapsed</span>
                    <span style={{ fontWeight: 700 }}>{stayProgressPercent}%</span>
                  </div>
                  <div style={{ height: 6, background: '#e2e8f0', borderRadius: 9999, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${stayProgressPercent}%`, background: 'var(--grad-primary)', borderRadius: 9999 }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Live Facilities & Utilities Quick Access */}
            <div className="glass-panel" style={{ padding: 28, background: '#ffffff' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-main)' }}>
                <Zap size={18} color="#d97706" /> Facilities & Connectivity Status
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {/* Wi-Fi Credential Card */}
                <div style={{
                  padding: 14,
                  borderRadius: 12,
                  background: '#f0f9ff',
                  border: '1px solid #bae6fd',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Wifi size={16} color="#0284c7" />
                      <strong style={{ fontSize: '0.88rem', color: '#0369a1' }}>High-Speed Wi-Fi 6 (500 Mbps)</strong>
                    </div>
                    <span className="badge badge-emerald" style={{ fontSize: '0.68rem' }}>Connected</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>SSID: <code>ForeterPg_Men_5G</code></span>
                    <button
                      onClick={copyWifiPassword}
                      style={{
                        color: '#0284c7',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}
                    >
                      {copiedWifi ? <Check size={12} /> : <Copy size={12} />}
                      {copiedWifi ? 'Copied' : 'Copy Password'}
                    </button>
                  </div>
                </div>

                {/* 24/7 Electricity */}
                <div style={{
                  padding: 14,
                  borderRadius: 12,
                  background: '#fffbeb',
                  border: '1px solid #fde68a',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Zap size={16} color="#d97706" />
                      <strong style={{ fontSize: '0.88rem', color: '#b45309' }}>24/7 Power Supply & DG Generator</strong>
                    </div>
                    <span className="badge badge-emerald" style={{ fontSize: '0.68rem' }}>100% DG Sync</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Continuous uninterrupted current runs AC, lights, fans and Wi-Fi.
                  </div>
                </div>

                {/* Hot Water */}
                <div style={{
                  padding: 14,
                  borderRadius: 12,
                  background: '#fff1f2',
                  border: '1px solid #fecdd3',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Flame size={16} color="#e11d48" />
                      <strong style={{ fontSize: '0.88rem', color: '#be123c' }}>24/7 Hot Water (Solar + Geyser)</strong>
                    </div>
                    <span className="badge badge-emerald" style={{ fontSize: '0.68rem' }}>Active 24/7</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Instant pressurized hot water available in your attached washroom.
                  </div>
                </div>

                {/* Washing Machine */}
                <div style={{
                  padding: 14,
                  borderRadius: 12,
                  background: '#f5f3ff',
                  border: '1px solid #ddd6fe',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Shirt size={16} color="#7c3aed" />
                      <strong style={{ fontSize: '0.88rem', color: '#6d28d9' }}>Washing Machines (Laundromat)</strong>
                    </div>
                    <span className="badge badge-primary" style={{ fontSize: '0.68rem' }}>Active</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Automatic machines & terrace covered clothes drying zone open 6 AM - 11 PM.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* NOTICES WIDGET */}
        {notices.length > 0 && (
          <div className="glass-panel" style={{ padding: 24, marginBottom: 32, background: '#ffffff' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-main)' }}>
              📢 Foreter PG Notice Board
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
              {notices.map((n) => (
                <div key={n._id} style={{ background: '#f8fafc', padding: 14, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <strong style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>{n.title}</strong>
                    <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>{n.category}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{n.content}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FACILITY TICKETS & COMPLAINTS SECTION */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 28,
        }}>
          {/* Raise Ticket Form */}
          <div className="glass-panel" style={{ padding: 28, background: '#ffffff' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-main)' }}>
              <FileText size={18} color="#4f46e5" /> Raise Facility Maintenance Ticket
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 20 }}>
              Report issues with Wi-Fi, power sockets, geysers, or washing machines directly to the warden.
            </p>

            {ticketMessage && (
              <div style={{
                padding: '10px 14px',
                borderRadius: 8,
                marginBottom: 16,
                fontSize: '0.85rem',
                background: '#ecfdf5',
                border: '1px solid #a7f3d0',
                color: '#047857',
              }}>
                {ticketMessage}
              </div>
            )}

            <form onSubmit={handleCreateTicket}>
              <div className="form-group">
                <label className="form-label">Facility Category</label>
                <select
                  className="form-select"
                  value={ticketCategory}
                  onChange={(e) => setTicketCategory(e.target.value)}
                >
                  <option value="High-Speed Wi-Fi">High-Speed Wi-Fi / Router Issue</option>
                  <option value="24/7 Electricity">24/7 Electricity / Power Socket / DG</option>
                  <option value="Hot Water / Geyser">Hot Water / Solar Geyser</option>
                  <option value="Washing Machine / Laundry">Washing Machine / Laundromat</option>
                  <option value="Room Cleaning">Room Cleaning & Housekeeping</option>
                  <option value="Plumbing & Bathroom">Plumbing & Attached Bathroom</option>
                  <option value="Food & Mess Feedback">Food & Mess Feedback</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Issue Title</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Wi-Fi speed dropping in Room 101"
                  value={ticketTitle}
                  onChange={(e) => setTicketTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Detailed Description</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  placeholder="Describe what's wrong and when it started..."
                  value={ticketDescription}
                  onChange={(e) => setTicketDescription(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Priority</label>
                <select
                  className="form-select"
                  value={ticketPriority}
                  onChange={(e) => setTicketPriority(e.target.value)}
                >
                  <option value="Low">Low - Minor Inconvenience</option>
                  <option value="Medium">Medium - Standard Repair</option>
                  <option value="High">High - Urgent Attention Needed</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={ticketSubmitting}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: 8 }}
              >
                <Send size={15} /> {ticketSubmitting ? 'Submitting...' : 'Submit Maintenance Request'}
              </button>
            </form>
          </div>

          {/* Ticket History & Status */}
          <div className="glass-panel" style={{ padding: 28, background: '#ffffff' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: 16, color: 'var(--text-main)' }}>
              Your Support Tickets ({tickets.length})
            </h3>

            {tickets.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                No maintenance tickets raised. Everything is running smoothly!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxHeight: 420, overflowY: 'auto' }}>
                {tickets.map((t) => (
                  <div
                    key={t._id}
                    style={{
                      padding: 16,
                      borderRadius: 12,
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span className="badge badge-primary" style={{ fontSize: '0.68rem' }}>
                        {t.facilityCategory}
                      </span>
                      <span className={`badge ${
                        t.status === 'Resolved' ? 'badge-emerald' : t.status === 'In Progress' ? 'badge-cyan' : 'badge-amber'
                      }`}>
                        {t.status}
                      </span>
                    </div>

                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: 4 }}>
                      {t.title}
                    </div>

                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 8 }}>
                      {t.description}
                    </div>

                    {t.adminNotes && (
                      <div style={{
                        padding: '8px 12px',
                        borderRadius: 8,
                        background: '#eef2ff',
                        border: '1px solid #c7d2fe',
                        fontSize: '0.78rem',
                        color: '#4338ca',
                      }}>
                        <strong>Warden Note:</strong> {t.adminNotes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Digital ID Card Modal */}
      {showIdCard && (
        <DigitalIdCardModal user={user} onClose={() => setShowIdCard(false)} />
      )}

      {/* Night Shift Gate Pass Modal */}
      {showNightPass && (
        <HydNightGatePassModal user={user} onClose={() => setShowNightPass(false)} />
      )}

      {/* UPI QR Rent Payment Modal */}
      {showUpiPayment && (
        <HydUpiPaymentModal
          user={user}
          onClose={() => setShowUpiPayment(false)}
          onPaymentSuccess={() => {
            refreshUser();
          }}
        />
      )}
    </div>
  );
}
