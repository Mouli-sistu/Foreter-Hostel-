import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import {
  Users,
  Home,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Plus,
  Bed,
  Calendar,
  Clock,
  Shield,
  FileText,
  UserCheck,
  UserMinus,
  Send,
  Zap,
  Wifi,
  Flame,
  Shirt,
  Search,
  Filter
} from 'lucide-react';

export default function AdminDashboard({ onOpenAuth }) {
  const { user, isAdmin, isAuthenticated } = useAuth();
  const [stats, setStats] = useState(null);
  const [residents, setResidents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeAdminTab, setActiveAdminTab] = useState('residents'); // 'residents', 'rooms', 'tickets', 'broadcast'

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSharing, setFilterSharing] = useState('all');

  // Assign Room Modal State
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedResidentId, setSelectedResidentId] = useState('');
  const [targetRoomId, setTargetRoomId] = useState('');
  const [targetBedId, setTargetBedId] = useState('');
  const [assignDuration, setAssignDuration] = useState(6);
  const [assignSubmitting, setAssignSubmitting] = useState(false);

  // Add Room Modal State
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);
  const [newRoomNumber, setNewRoomNumber] = useState('');
  const [newRoomFloor, setNewRoomFloor] = useState(1);
  const [newRoomSharing, setNewRoomSharing] = useState('3-Share');

  // Resolve Ticket State
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketStatusUpdate, setTicketStatusUpdate] = useState('In Progress');
  const [ticketResolutionNote, setTicketResolutionNote] = useState('');

  // Notice Broadcast State
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeCategory, setNoticeCategory] = useState('Facility');
  const [noticePriority, setNoticePriority] = useState('Normal');
  const [broadcastMessage, setBroadcastMessage] = useState('');

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      loadAllAdminData();
    }
  }, [isAuthenticated, isAdmin]);

  const loadAllAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, resRes, roomsRes, ticketsRes] = await Promise.all([
        api.stats.getAdminStats(),
        api.residents.getAll(),
        api.rooms.getAll(),
        api.maintenance.getAll(),
      ]);

      if (statsRes.success) setStats(statsRes.data);
      if (resRes.success) setResidents(resRes.data || []);
      if (roomsRes.success) setRooms(roomsRes.data || []);
      if (ticketsRes.success) setTickets(ticketsRes.data || []);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignResident = async (e) => {
    e.preventDefault();
    if (!selectedResidentId || !targetRoomId || !targetBedId) return;

    setAssignSubmitting(true);
    try {
      const res = await api.residents.assignRoom({
        residentId: selectedResidentId,
        roomId: targetRoomId,
        bedId: targetBedId,
        stayDurationMonths: assignDuration,
      });

      if (res.success) {
        setShowAssignModal(false);
        await loadAllAdminData();
      }
    } catch (err) {
      alert(err.message || 'Room assignment failed');
    } finally {
      setAssignSubmitting(false);
    }
  };

  const handleCheckoutResident = async (residentId, residentName) => {
    if (!window.confirm(`Are you sure you want to checkout ${residentName}? This will immediately release their bed slot.`)) {
      return;
    }

    try {
      const res = await api.residents.checkout({ residentId });
      if (res.success) {
        await loadAllAdminData();
      }
    } catch (err) {
      alert(err.message || 'Checkout failed');
    }
  };

  const handleTogglePayment = async (residentId, currentStatus) => {
    const newStatus = currentStatus === 'Paid' ? 'Due' : 'Paid';
    try {
      const res = await api.residents.updatePayment(residentId, newStatus);
      if (res.success) {
        await loadAllAdminData();
      }
    } catch (err) {
      alert(err.message || 'Payment status update failed');
    }
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    if (!newRoomNumber) return;

    try {
      const res = await api.rooms.create({
        roomNumber: newRoomNumber,
        floor: newRoomFloor,
        sharingType: newRoomSharing,
        monthlyPrice: newRoomSharing === '3-Share' ? 10000 : 7500,
      });

      if (res.success) {
        setShowAddRoomModal(false);
        setNewRoomNumber('');
        await loadAllAdminData();
      }
    } catch (err) {
      alert(err.message || 'Failed to create room');
    }
  };

  const handleUpdateTicket = async (e) => {
    e.preventDefault();
    if (!selectedTicket) return;

    try {
      const res = await api.maintenance.updateStatus(selectedTicket._id, {
        status: ticketStatusUpdate,
        adminNotes: ticketResolutionNote,
      });

      if (res.success) {
        setSelectedTicket(null);
        setTicketResolutionNote('');
        await loadAllAdminData();
      }
    } catch (err) {
      alert(err.message || 'Ticket update failed');
    }
  };

  const handlePostNotice = async (e) => {
    e.preventDefault();
    if (!noticeTitle || !noticeContent) return;

    try {
      const res = await api.stats.createNotice({
        title: noticeTitle,
        content: noticeContent,
        category: noticeCategory,
        priority: noticePriority,
      });

      if (res.success) {
        setBroadcastMessage('Announcement posted to all resident portals successfully!');
        setNoticeTitle('');
        setNoticeContent('');
        setTimeout(() => setBroadcastMessage(''), 3000);
      }
    } catch (err) {
      alert(err.message || 'Failed to post announcement');
    }
  };

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div className="glass-panel" style={{ maxWidth: 520, margin: '0 auto', padding: 40, background: '#ffffff' }}>
          <Shield size={48} color="#4f46e5" style={{ marginBottom: 16 }} />
          <h2 style={{ fontSize: '1.8rem', marginBottom: 12, color: 'var(--text-main)' }}>Owner / Admin Portal Access</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>
            This section is restricted to the Hostel Owner & Warden. Please log in with admin credentials (<code>admin@hostel.com</code> / <code>admin123</code>).
          </p>
          <button onClick={() => onOpenAuth('login')} className="btn btn-primary" style={{ width: '100%' }}>
            Log in as Hostel Owner
          </button>
        </div>
      </div>
    );
  }

  // Filter residents
  const filteredResidents = residents.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.phone.includes(searchQuery) ||
      (r.roomNumber && r.roomNumber.includes(searchQuery));

    const matchesSharing =
      filterSharing === 'all' || r.sharingType === filterSharing;

    return matchesSearch && matchesSharing;
  });

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
          marginBottom: 32,
        }}>
          <div>
            <span className="badge badge-primary" style={{ marginBottom: 6 }}>
              <Shield size={12} /> Foreter Pg for men · Owner Portal
            </span>
            <h1 style={{ fontSize: '2.2rem', color: 'var(--text-main)' }}>
              Hostel Owner & Warden <span className="text-gradient">Control Center</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
              Management of resident check-ins, time periods, room allocations, monthly revenue, and facility operations in Madhapur, Hyderabad.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => setShowAssignModal(true)}
              className="btn btn-emerald"
            >
              <UserCheck size={16} /> Allocate Room / Bed
            </button>
            <button
              onClick={() => setShowAddRoomModal(true)}
              className="btn btn-secondary"
            >
              <Plus size={16} /> Add Room
            </button>
          </div>
        </div>

        {/* OWNER KPI OVERVIEW CARDS */}
        {stats && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: 18,
            marginBottom: 36,
          }}>
            {/* Total Residents */}
            <div className="glass-panel" style={{ padding: 20, background: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>Total Residents</span>
                <Users size={18} color="#4f46e5" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {stats.summary.totalResidents}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>
                {stats.summary.activeResidents} Active · {stats.summary.unassignedResidents} Unassigned
              </div>
            </div>

            {/* Bed Occupancy */}
            <div className="glass-panel" style={{ padding: 20, background: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>Bed Occupancy</span>
                <Bed size={18} color="#0284c7" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0284c7' }}>
                {stats.summary.occupiedBeds}/{stats.summary.totalBeds}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {stats.summary.occupancyPercentage}% Occupied ({stats.summary.availableBeds} Free)
              </div>
            </div>

            {/* Monthly Revenue */}
            <div className="glass-panel" style={{ padding: 20, background: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>Monthly Revenue</span>
                <DollarSign size={18} color="#059669" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#059669' }}>
                ₹{stats.finance.monthlyRevenue.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                3-Share (₹10k) + 4-Share (₹7.5k)
              </div>
            </div>

            {/* Pending Dues */}
            <div className="glass-panel" style={{ padding: 20, background: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>Payment Dues</span>
                <AlertCircle size={18} color="#d97706" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: stats.finance.pendingPaymentResidents > 0 ? '#b45309' : '#059669' }}>
                {stats.finance.pendingPaymentResidents} Residents
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                {stats.finance.paidResidents} Cleared
              </div>
            </div>

            {/* Open Maintenance Tickets */}
            <div className="glass-panel" style={{ padding: 20, background: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>Facility Tickets</span>
                <Zap size={18} color="#e11d48" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#e11d48' }}>
                {stats.support.openTickets} Open
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                Power, Wi-Fi, Geyser, Laundry
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation for Admin Sections */}
        <div style={{
          display: 'flex',
          gap: 10,
          borderBottom: '1px solid #e2e8f0',
          paddingBottom: 14,
          marginBottom: 24,
          flexWrap: 'wrap',
        }}>
          <button
            onClick={() => setActiveAdminTab('residents')}
            className={`btn btn-sm ${activeAdminTab === 'residents' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Users size={14} /> Resident Check-ins & Time Periods ({residents.length})
          </button>

          <button
            onClick={() => setActiveAdminTab('rooms')}
            className={`btn btn-sm ${activeAdminTab === 'rooms' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Home size={14} /> Rooms & Bed Layout ({rooms.length})
          </button>

          <button
            onClick={() => setActiveAdminTab('tickets')}
            className={`btn btn-sm ${activeAdminTab === 'tickets' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <AlertCircle size={14} /> Facility Tickets ({tickets.length})
          </button>

          <button
            onClick={() => setActiveAdminTab('broadcast')}
            className={`btn btn-sm ${activeAdminTab === 'broadcast' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Send size={14} /> Post Notice / Announcement
          </button>
        </div>

        {/* TAB 1: RESIDENTS CHECK-IN & TIME PERIOD MANAGEMENT */}
        {activeAdminTab === 'residents' && (
          <div>
            {/* Search and Filters Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              marginBottom: 16,
              flexWrap: 'wrap',
            }}>
              <div style={{
                position: 'relative',
                maxWidth: 320,
                width: '100%',
              }}>
                <Search size={16} color="var(--text-dim)" style={{ position: 'absolute', left: 12, top: 12 }} />
                <input
                  type="text"
                  placeholder="Search resident, room, phone..."
                  className="form-input"
                  style={{ paddingLeft: 36, fontSize: '0.88rem' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                {['all', '3-Share', '4-Share', 'Unassigned'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterSharing(st)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 8,
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      background: filterSharing === st ? 'var(--primary)' : '#ffffff',
                      color: filterSharing === st ? '#ffffff' : 'var(--text-muted)',
                      border: filterSharing === st ? '1px solid var(--primary)' : '1px solid #cbd5e1',
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Residents Table */}
            <div className="glass-panel" style={{ overflowX: 'auto', padding: 0, background: '#ffffff' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '14px 18px', color: 'var(--text-dim)', fontWeight: 600 }}>Resident</th>
                    <th style={{ padding: '14px 18px', color: 'var(--text-dim)', fontWeight: 600 }}>Room & Bed</th>
                    <th style={{ padding: '14px 18px', color: 'var(--text-dim)', fontWeight: 600 }}>Sharing Plan & Rent</th>
                    <th style={{ padding: '14px 18px', color: 'var(--text-dim)', fontWeight: 600 }}>Check-in Date</th>
                    <th style={{ padding: '14px 18px', color: 'var(--text-dim)', fontWeight: 600 }}>Time Period (Validity)</th>
                    <th style={{ padding: '14px 18px', color: 'var(--text-dim)', fontWeight: 600 }}>Payment</th>
                    <th style={{ padding: '14px 18px', color: 'var(--text-dim)', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResidents.map((r) => {
                    const checkInFormatted = r.checkInDate
                      ? new Date(r.checkInDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
                      : 'Not Checked In';

                    const checkOutFormatted = r.expectedCheckOutDate
                      ? new Date(r.expectedCheckOutDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
                      : 'N/A';

                    return (
                      <tr key={r._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        {/* Name & Contact */}
                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{r.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{r.email} · {r.phone}</div>
                          <div style={{ fontSize: '0.72rem', color: '#4f46e5', fontWeight: 600 }}>{r.collegeOrCompany}</div>
                        </td>

                        {/* Room & Bed */}
                        <td style={{ padding: '14px 18px' }}>
                          {r.roomNumber ? (
                            <div>
                              <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>Room {r.roomNumber}</span>
                              <span style={{ color: 'var(--text-dim)', marginLeft: 4 }}>({r.bedId})</span>
                            </div>
                          ) : (
                            <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>
                              Unassigned
                            </span>
                          )}
                        </td>

                        {/* Sharing Plan & Monthly Rent */}
                        <td style={{ padding: '14px 18px' }}>
                          <span className={`badge ${r.sharingType === '3-Share' ? 'badge-primary' : r.sharingType === '4-Share' ? 'badge-cyan' : 'badge-amber'}`}>
                            {r.sharingType || 'Standard'}
                          </span>
                          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginTop: 4 }}>
                            ₹{r.monthlyRent?.toLocaleString() || (r.sharingType === '3-Share' ? '10,000' : '7,500')}/mo
                          </div>
                        </td>

                        {/* Check-In Date */}
                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <Calendar size={13} color="#64748b" />
                            <span style={{ color: r.checkInDate ? 'var(--text-main)' : 'var(--text-dim)' }}>
                              {checkInFormatted}
                            </span>
                          </div>
                        </td>

                        {/* Time Period / Stay Duration */}
                        <td style={{ padding: '14px 18px' }}>
                          {r.checkInDate ? (
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, color: '#4f46e5' }}>
                                <Clock size={13} /> {r.stayDurationMonths || 6} Months
                              </div>
                              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                                Until: {checkOutFormatted}
                              </div>
                            </div>
                          ) : (
                            <span style={{ color: 'var(--text-dim)' }}>Pending check-in</span>
                          )}
                        </td>

                        {/* Payment Status with 1-click toggle */}
                        <td style={{ padding: '14px 18px' }}>
                          <button
                            onClick={() => handleTogglePayment(r._id, r.paymentStatus)}
                            className={`badge ${r.paymentStatus === 'Paid' ? 'badge-emerald' : 'badge-rose'}`}
                            style={{ cursor: 'pointer', border: 'none' }}
                            title="Click to toggle Paid / Due"
                          >
                            ● {r.paymentStatus || 'Paid'} (Toggle)
                          </button>
                        </td>

                        {/* Actions */}
                        <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                            {r.roomNumber ? (
                              <button
                                onClick={() => handleCheckoutResident(r._id, r.name)}
                                className="btn btn-sm"
                                style={{
                                  background: '#fff1f2',
                                  color: '#be123c',
                                  border: '1px solid #fecdd3',
                                  padding: '4px 10px',
                                  fontSize: '0.75rem',
                                }}
                                title="Check-out and free bed"
                              >
                                <UserMinus size={13} /> Check-out
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  setSelectedResidentId(r._id);
                                  setShowAssignModal(true);
                                }}
                                className="btn btn-emerald btn-sm"
                                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                              >
                                <UserCheck size={13} /> Assign Room
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: ROOM & BED INVENTORY GRID */}
        {activeAdminTab === 'rooms' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 24,
          }}>
            {rooms.map((room) => {
              const freeBeds = room.beds.filter((b) => !b.isOccupied).length;
              return (
                <div key={room._id} className="glass-panel" style={{ padding: 24, background: '#ffffff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>Room {room.roomNumber}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Floor {room.floor}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span className={`badge ${room.sharingType === '3-Share' ? 'badge-primary' : 'badge-cyan'}`}>
                        {room.sharingType}
                      </span>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginTop: 4 }}>
                        ₹{room.monthlyPrice.toLocaleString()}/mo
                      </div>
                    </div>
                  </div>

                  {/* Bed layout */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                    {room.beds.map((b) => (
                      <div
                        key={b.bedId}
                        style={{
                          padding: '8px 12px',
                          borderRadius: 8,
                          background: b.isOccupied ? '#f8fafc' : '#ecfdf5',
                          border: b.isOccupied ? '1px solid #e2e8f0' : '1px solid #a7f3d0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '0.82rem',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Bed size={15} color={b.isOccupied ? '#64748b' : '#059669'} />
                          <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{b.bedId}</span>
                        </div>
                        <div>
                          {b.isOccupied ? (
                            <span style={{ color: 'var(--text-muted)' }}>Occupied by <strong>{b.residentName}</strong></span>
                          ) : (
                            <span style={{ color: '#047857', fontWeight: 700 }}>Vacant Slot</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                    Amenities: 3-Times Food, 24/7 DG Power, Wi-Fi 6, Solar Hot Water, Attached Bath.
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 3: FACILITY TICKETS DESK */}
        {activeAdminTab === 'tickets' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {tickets.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                No facility maintenance tickets reported!
              </div>
            ) : (
              tickets.map((t) => (
                <div key={t._id} className="glass-panel" style={{ padding: 22, background: '#ffffff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 10 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                        <span className="badge badge-primary">{t.facilityCategory}</span>
                        <span className={`badge ${
                          t.status === 'Resolved' ? 'badge-emerald' : t.status === 'In Progress' ? 'badge-cyan' : 'badge-amber'
                        }`}>
                          {t.status}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                          Priority: {t.priority}
                        </span>
                      </div>
                      <h4 style={{ fontSize: '1.15rem', color: 'var(--text-main)' }}>{t.title}</h4>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        Raised by: <strong>{t.residentName}</strong> · Room: <strong>{t.roomNumber}</strong>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedTicket(t);
                        setTicketStatusUpdate(t.status);
                        setTicketResolutionNote(t.adminNotes || '');
                      }}
                      className="btn btn-secondary btn-sm"
                    >
                      Update / Resolve Ticket
                    </button>
                  </div>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: 12 }}>
                    {t.description}
                  </p>

                  {t.adminNotes && (
                    <div style={{
                      padding: '8px 14px',
                      background: '#eef2ff',
                      border: '1px solid #c7d2fe',
                      borderRadius: 8,
                      fontSize: '0.82rem',
                      color: '#4338ca',
                    }}>
                      <strong>Admin Resolution Note:</strong> {t.adminNotes}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 4: POST NOTICE / BROADCAST */}
        {activeAdminTab === 'broadcast' && (
          <div className="glass-panel" style={{ maxWidth: 640, padding: 32, background: '#ffffff' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-main)' }}>
              <Send size={18} color="#4f46e5" /> Broadcast Hostel Announcement
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: 20 }}>
              Broadcast facility announcements (e.g., Wi-Fi maintenance, food menu, water timings) to all resident dashboards.
            </p>

            {broadcastMessage && (
              <div style={{
                padding: '10px 14px',
                borderRadius: 8,
                marginBottom: 16,
                background: '#ecfdf5',
                color: '#047857',
                border: '1px solid #a7f3d0',
                fontSize: '0.85rem',
              }}>
                {broadcastMessage}
              </div>
            )}

            <form onSubmit={handlePostNotice}>
              <div className="form-group">
                <label className="form-label">Notice Title</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Sunday Chicken Dum Biryani Feast Timings (1:00 PM)"
                  value={noticeTitle}
                  onChange={(e) => setNoticeTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Notice Category</label>
                <select
                  className="form-select"
                  value={noticeCategory}
                  onChange={(e) => setNoticeCategory(e.target.value)}
                >
                  <option value="Facility">Facility (Electricity, Geyser, Washing)</option>
                  <option value="Wi-Fi">High-Speed Wi-Fi</option>
                  <option value="Mess/Food">Dining & Mess</option>
                  <option value="General">General Hostel Rule</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Announcement Content</label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  placeholder="Type the full notification message for residents..."
                  value={noticeContent}
                  onChange={(e) => setNoticeContent(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Publish Notice to All Resident Portals
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ASSIGN RESIDENT MODAL */}
      {showAssignModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1100,
          padding: 20,
        }}>
          <div className="glass-panel" style={{ maxWidth: 480, width: '100%', padding: 28, background: '#ffffff', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)' }}>Assign Resident to Room & Bed</h3>
              <button onClick={() => setShowAssignModal(false)} style={{ color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            <form onSubmit={handleAssignResident}>
              <div className="form-group">
                <label className="form-label">Select Resident</label>
                <select
                  className="form-select"
                  value={selectedResidentId}
                  onChange={(e) => setSelectedResidentId(e.target.value)}
                  required
                >
                  <option value="">-- Choose Resident --</option>
                  {residents.map((r) => (
                    <option key={r._id} value={r._id}>
                      {r.name} ({r.roomNumber ? `Currently Rm ${r.roomNumber}` : 'Unassigned'})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Target Room</label>
                <select
                  className="form-select"
                  value={targetRoomId}
                  onChange={(e) => {
                    setTargetRoomId(e.target.value);
                    const r = rooms.find((rm) => rm._id === e.target.value);
                    const freeBed = r?.beds.find((b) => !b.isOccupied);
                    setTargetBedId(freeBed ? freeBed.bedId : '');
                  }}
                  required
                >
                  <option value="">-- Choose Room --</option>
                  {rooms.map((rm) => (
                    <option key={rm._id} value={rm._id}>
                      Room {rm.roomNumber} ({rm.sharingType} · ₹{rm.monthlyPrice.toLocaleString()}/mo)
                    </option>
                  ))}
                </select>
              </div>

              {targetRoomId && (
                <div className="form-group">
                  <label className="form-label">Target Bed</label>
                  <select
                    className="form-select"
                    value={targetBedId}
                    onChange={(e) => setTargetBedId(e.target.value)}
                    required
                  >
                    {rooms
                      .find((rm) => rm._id === targetRoomId)
                      ?.beds.map((b) => (
                        <option key={b.bedId} value={b.bedId} disabled={b.isOccupied}>
                          {b.bedId} {b.isOccupied ? `(Occupied by ${b.residentName})` : '(Available)'}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Stay Duration / Time Period</label>
                <select
                  className="form-select"
                  value={assignDuration}
                  onChange={(e) => setAssignDuration(Number(e.target.value))}
                >
                  <option value={3}>3 Months</option>
                  <option value={6}>6 Months (Semester)</option>
                  <option value={9}>9 Months</option>
                  <option value={12}>12 Months (Full Year)</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                <button type="button" onClick={() => setShowAssignModal(false)} className="btn btn-secondary" style={{ flex: 1 }}>
                  Cancel
                </button>
                <button type="submit" disabled={assignSubmitting} className="btn btn-emerald" style={{ flex: 2 }}>
                  {assignSubmitting ? 'Allocating...' : 'Confirm Allocation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD ROOM MODAL */}
      {showAddRoomModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1100,
          padding: 20,
        }}>
          <div className="glass-panel" style={{ maxWidth: 440, width: '100%', padding: 28, background: '#ffffff', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)' }}>Create New Hostel Room</h3>
              <button onClick={() => setShowAddRoomModal(false)} style={{ color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            <form onSubmit={handleCreateRoom}>
              <div className="form-group">
                <label className="form-label">Room Number</label>
                <input
                  type="text"
                  placeholder="e.g. 301"
                  className="form-input"
                  value={newRoomNumber}
                  onChange={(e) => setNewRoomNumber(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Floor</label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  className="form-input"
                  value={newRoomFloor}
                  onChange={(e) => setNewRoomFloor(Number(e.target.value))}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Sharing Layout & Pricing</label>
                <select
                  className="form-select"
                  value={newRoomSharing}
                  onChange={(e) => setNewRoomSharing(e.target.value)}
                >
                  <option value="3-Share">3-Share (Triple Sharing @ ₹10,000/mo)</option>
                  <option value="4-Share">4-Share (Quad Sharing @ ₹7,500/mo)</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                <button type="button" onClick={() => setShowAddRoomModal(false)} className="btn btn-secondary" style={{ flex: 1 }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                  Create Room
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RESOLVE TICKET MODAL */}
      {selectedTicket && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1100,
          padding: 20,
        }}>
          <div className="glass-panel" style={{ maxWidth: 480, width: '100%', padding: 28, background: '#ffffff', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)' }}>Update Facility Ticket</h3>
              <button onClick={() => setSelectedTicket(null)} style={{ color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{selectedTicket.title}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {selectedTicket.facilityCategory} · Room {selectedTicket.roomNumber} ({selectedTicket.residentName})
              </div>
            </div>

            <form onSubmit={handleUpdateTicket}>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={ticketStatusUpdate}
                  onChange={(e) => setTicketStatusUpdate(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress (Technician Assigned)</option>
                  <option value="Resolved">Resolved (Fixed & Verified)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Warden Resolution Notes for Resident</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  placeholder="e.g. Electrician replaced fuse; Wi-Fi antenna re-aligned..."
                  value={ticketResolutionNote}
                  onChange={(e) => setTicketResolutionNote(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                <button type="button" onClick={() => setSelectedTicket(null)} className="btn btn-secondary" style={{ flex: 1 }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                  Save Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
