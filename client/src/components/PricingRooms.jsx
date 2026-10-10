import React, { useState, useEffect } from 'react';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { Users, Bed, Check, Sparkles, AlertCircle, ArrowRight, Home, Utensils, Zap, Wifi } from 'lucide-react';

export default function PricingRooms({ onSelectRoom, onOpenAuth }) {
  const { user, isAuthenticated, refreshUser } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', '3-Share', '4-Share'
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState(null);
  const [selectedBedId, setSelectedBedId] = useState('');
  const [stayDuration, setStayDuration] = useState(6);
  const [bookingMessage, setBookingMessage] = useState({ text: '', type: '' });
  const [submittingBooking, setSubmittingBooking] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const res = await api.rooms.getAll();
      if (res.success && res.data) {
        setRooms(res.data);
      }
    } catch (err) {
      console.error('Error fetching rooms:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredRooms = rooms.filter((r) => {
    if (activeFilter === 'all') return true;
    return r.sharingType === activeFilter;
  });

  const handleOpenBooking = (room, bedId) => {
    if (!isAuthenticated) {
      onOpenAuth('login');
      return;
    }
    setSelectedRoomForBooking(room);
    setSelectedBedId(bedId || (room.beds.find((b) => !b.isOccupied)?.bedId || 'Bed A'));
    setBookingMessage({ text: '', type: '' });
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    if (!selectedRoomForBooking || !selectedBedId) return;

    setSubmittingBooking(true);
    setBookingMessage({ text: '', type: '' });
    try {
      const res = await api.bookings.selfBook({
        roomId: selectedRoomForBooking._id,
        bedId: selectedBedId,
        stayDurationMonths: stayDuration,
      });

      if (res.success) {
        setBookingMessage({
          text: `Success! You have checked in to Room ${selectedRoomForBooking.roomNumber} (${selectedBedId}) for ${stayDuration} months!`,
          type: 'success',
        });
        await fetchRooms();
        await refreshUser();
        setTimeout(() => {
          setSelectedRoomForBooking(null);
        }, 1800);
      }
    } catch (err) {
      setBookingMessage({
        text: err.message || 'Failed to complete check-in',
        type: 'error',
      });
    } finally {
      setSubmittingBooking(false);
    }
  };

  return (
    <section id="pricing-rooms-section" style={{ padding: '60px 0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 48px' }}>
          <span className="badge badge-emerald" style={{ marginBottom: 12 }}>
            <Sparkles size={13} /> Transparent Hyderabad PG Pricing
          </span>
          <h2 style={{ fontSize: '2.4rem', marginBottom: 16, color: 'var(--text-main)' }}>
            Choose Your <span className="text-gradient">Sharing Plan</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            Fully furnished accommodations configured in 3-Share and 4-Share layouts with all utilities, 3-times daily meals, Sunday Biryani, Wi-Fi, power backup, and laundry included.
          </p>
        </div>

        {/* Pricing Cards Comparison */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 30,
          marginBottom: 60,
        }}>
          {/* 3-Share Plan Card */}
          <div
            className="glass-panel"
            style={{
              padding: 36,
              border: '2px solid #c7d2fe',
              position: 'relative',
              background: '#ffffff',
              boxShadow: '0 8px 24px rgba(79, 70, 229, 0.08)',
            }}
          >
            <div style={{
              position: 'absolute',
              top: 18,
              right: 18,
              padding: '4px 12px',
              borderRadius: 9999,
              background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
              color: '#ffffff',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
            }}>
              MOST POPULAR
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: '#eef2ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#4f46e5',
              }}>
                <Users size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.45rem', color: 'var(--text-main)' }}>3-Share Room</h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Triple Sharing · AC Option</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, margin: '20px 0' }}>
              <span style={{ fontSize: '2.8rem', fontWeight: 800, color: 'var(--text-main)' }}>₹10,000</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>/ resident / month</span>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: 24, lineHeight: 1.5 }}>
              Ideal for techies and students wanting spacious personal desks, orthopaedic beds, attached bath, and quiet focus space in Madhapur.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 30 }}>
              {[
                '3-Times Daily Homely Meals + Sunday Special Dum Biryani',
                '3 Wooden single beds with orthopaedic foam mattresses',
                '3 Independent study desks with LED reading lamps & sockets',
                '3 Lockable wardrobes with private keys',
                'Attached washroom with 24/7 hot water geyser',
                '500 Mbps High-Speed Wi-Fi 6 router access',
                '24/7 Heavy DG electricity backup (Runs AC)',
                'Automated washing machines & terrace drying area',
                'Daily room housekeeping & trash clearing',
              ].map((feat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.86rem' }}>
                  <Check size={16} color="#4f46e5" style={{ flexShrink: 0, marginTop: 3 }} />
                  <span style={{ color: 'var(--text-muted)' }}>{feat}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setActiveFilter('3-Share');
                const target = document.getElementById('live-rooms-grid');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              Explore Available 3-Share Rooms <ArrowRight size={16} />
            </button>
          </div>

          {/* 4-Share Plan Card */}
          <div
            className="glass-panel"
            style={{
              padding: 36,
              border: '2px solid #bae6fd',
              position: 'relative',
              background: '#ffffff',
              boxShadow: '0 8px 24px rgba(2, 132, 199, 0.08)',
            }}
          >
            <div style={{
              position: 'absolute',
              top: 18,
              right: 18,
              padding: '4px 12px',
              borderRadius: 9999,
              background: '#f0f9ff',
              color: '#0369a1',
              border: '1px solid #bae6fd',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
            }}>
              BEST VALUE
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: '#f0f9ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0284c7',
              }}>
                <Users size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.45rem', color: 'var(--text-main)' }}>4-Share Room</h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Quad Sharing Layout</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, margin: '20px 0' }}>
              <span style={{ fontSize: '2.8rem', fontWeight: 800, color: 'var(--text-main)' }}>₹7,500</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>/ resident / month</span>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: 24, lineHeight: 1.5 }}>
              Best value and vibrant community setting for friends, freshers, and budget-conscious techies with all food and amenities included.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 30 }}>
              {[
                '3-Times Daily Homely Meals + Sunday Special Dum Biryani',
                '4 Ergonomic wooden beds with soft bedding & pillows',
                'Personal steel wardrobe with private lock & key',
                'Shared study zone with individual laptop plugs',
                'Attached bathroom with 24/7 hot water supply',
                '500 Mbps High-Speed Wi-Fi throughout the room',
                '24/7 DG Power backup for lights, fans, & chargers',
                'Laundromat washing machines access',
                'Daily housekeeping and regular maintenance',
              ].map((feat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.86rem' }}>
                  <Check size={16} color="#0284c7" style={{ flexShrink: 0, marginTop: 3 }} />
                  <span style={{ color: 'var(--text-muted)' }}>{feat}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setActiveFilter('4-Share');
                const target = document.getElementById('live-rooms-grid');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-secondary"
              style={{ width: '100%', borderColor: '#bae6fd', color: '#0369a1' }}
            >
              Explore Available 4-Share Rooms <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Live Room Availability Grid */}
        <div id="live-rooms-grid" style={{ paddingTop: 20 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            marginBottom: 28,
          }}>
            <div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: 4, color: 'var(--text-main)' }}>
                Live Bed Availability <span className="text-gradient">at Foreter PG</span>
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Real-time room status, occupied beds, and instant self-booking check-in.
              </p>
            </div>

            {/* Filter pills */}
            <div style={{ display: 'flex', gap: 8 }}>
              {['all', '3-Share', '4-Share'].map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    background: activeFilter === type ? 'var(--primary)' : '#ffffff',
                    color: activeFilter === type ? '#ffffff' : 'var(--text-muted)',
                    border: activeFilter === type ? '1px solid var(--primary)' : '1px solid #cbd5e1',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                  }}
                >
                  {type === 'all' ? 'All Rooms' : type === '3-Share' ? '3-Share (₹10,000)' : '4-Share (₹7,500)'}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              Loading real-time room data...
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: 24,
            }}>
              {filteredRooms.map((room) => {
                const availableCount = room.beds.filter((b) => !b.isOccupied).length;
                return (
                  <div
                    key={room._id}
                    className="glass-panel"
                    style={{
                      padding: 24,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      background: '#ffffff',
                    }}
                  >
                    <div>
                      {/* Room Card Header */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{
                            width: 40,
                            height: 40,
                            borderRadius: 10,
                            background: '#eef2ff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#4f46e5',
                            fontWeight: 700,
                          }}>
                            {room.roomNumber}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-main)' }}>Room {room.roomNumber}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Floor {room.floor} · Madhapur Wing</div>
                          </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <span className={`badge ${room.sharingType === '3-Share' ? 'badge-primary' : 'badge-cyan'}`}>
                            {room.sharingType}
                          </span>
                          <div style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--text-main)', marginTop: 4 }}>
                            ₹{room.monthlyPrice.toLocaleString()}<span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 400 }}>/mo</span>
                          </div>
                        </div>
                      </div>

                      {/* Occupancy Indicator */}
                      <div style={{ marginBottom: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 6 }}>
                          <span>Bed Occupancy</span>
                          <span style={{ fontWeight: 600, color: availableCount > 0 ? '#059669' : '#e11d48' }}>
                            {room.occupied}/{room.capacity} Occupied ({availableCount} Free)
                          </span>
                        </div>
                        <div style={{ height: 6, width: '100%', background: '#f1f5f9', borderRadius: 9999, overflow: 'hidden' }}>
                          <div style={{
                            height: '100%',
                            width: `${(room.occupied / room.capacity) * 100}%`,
                            background: room.occupied === room.capacity ? '#f43f5e' : 'var(--grad-primary)',
                            borderRadius: 9999,
                          }} />
                        </div>
                      </div>

                      {/* Bed Slots Grid */}
                      <div style={{ marginBottom: 18 }}>
                        <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: 8, textTransform: 'uppercase' }}>
                          Bed Slots Layout:
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                          {room.beds.map((bed) => {
                            const isMyBed = user && bed.residentId === user._id;
                            return (
                              <div
                                key={bed.bedId}
                                style={{
                                  padding: '8px 10px',
                                  borderRadius: 8,
                                  background: isMyBed
                                    ? '#eef2ff'
                                    : bed.isOccupied
                                    ? '#f8fafc'
                                    : '#ecfdf5',
                                  border: isMyBed
                                    ? '1px solid #818cf8'
                                    : bed.isOccupied
                                    ? '1px solid #e2e8f0'
                                    : '1px solid #a7f3d0',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  fontSize: '0.78rem',
                                }}
                              >
                                <div>
                                  <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{bed.bedId}</div>
                                  <div style={{
                                    fontSize: '0.7rem',
                                    color: isMyBed ? '#4338ca' : bed.isOccupied ? 'var(--text-dim)' : '#047857',
                                    maxWidth: 90,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    fontWeight: isMyBed || !bed.isOccupied ? 600 : 400,
                                  }}>
                                    {isMyBed ? '★ You' : bed.isOccupied ? bed.residentName.split(' ')[0] : 'Vacant'}
                                  </div>
                                </div>

                                {!bed.isOccupied && (
                                  <button
                                    onClick={() => handleOpenBooking(room, bed.bedId)}
                                    className="btn btn-sm"
                                    style={{
                                      padding: '3px 8px',
                                      fontSize: '0.7rem',
                                      background: '#d1fae5',
                                      color: '#065f46',
                                      border: '1px solid #a7f3d0',
                                      fontWeight: 700,
                                    }}
                                  >
                                    Book
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Room Action */}
                    <div>
                      {availableCount > 0 ? (
                        <button
                          onClick={() => handleOpenBooking(room)}
                          className="btn btn-primary btn-sm"
                          style={{ width: '100%' }}
                        >
                          Check-in to Room {room.roomNumber} ({availableCount} Free)
                        </button>
                      ) : (
                        <div style={{
                          textAlign: 'center',
                          padding: '6px',
                          fontSize: '0.78rem',
                          color: '#be123c',
                          background: '#fff1f2',
                          borderRadius: 8,
                          fontWeight: 600,
                        }}>
                          Room Fully Occupied
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Booking / Check-in Modal */}
      {selectedRoomForBooking && (
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
          zIndex: 1000,
          padding: 20,
        }}>
          <div
            className="glass-panel"
            style={{
              maxWidth: 480,
              width: '100%',
              padding: 30,
              position: 'relative',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)' }}>Check-in & Room Allocation</h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Room {selectedRoomForBooking.roomNumber} · {selectedRoomForBooking.sharingType} (₹{selectedRoomForBooking.monthlyPrice.toLocaleString()}/mo)
                </div>
              </div>
              <button
                onClick={() => setSelectedRoomForBooking(null)}
                style={{ color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {bookingMessage.text && (
              <div style={{
                padding: '10px 14px',
                borderRadius: 8,
                marginBottom: 16,
                fontSize: '0.85rem',
                background: bookingMessage.type === 'success' ? '#ecfdf5' : '#fff1f2',
                color: bookingMessage.type === 'success' ? '#047857' : '#be123c',
                border: `1px solid ${bookingMessage.type === 'success' ? '#a7f3d0' : '#fecdd3'}`,
              }}>
                {bookingMessage.text}
              </div>
            )}

            <form onSubmit={handleConfirmBooking}>
              <div className="form-group">
                <label className="form-label">Resident Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={user?.name || ''}
                  disabled
                  style={{ background: '#f8fafc', color: 'var(--text-muted)' }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Select Bed</label>
                <select
                  className="form-select"
                  value={selectedBedId}
                  onChange={(e) => setSelectedBedId(e.target.value)}
                  required
                >
                  {selectedRoomForBooking.beds.map((b) => (
                    <option key={b.bedId} value={b.bedId} disabled={b.isOccupied && b.residentId !== user?._id}>
                      {b.bedId} {b.isOccupied ? `(Occupied by ${b.residentName})` : '(Available)'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Stay Duration / Time Period</label>
                <select
                  className="form-select"
                  value={stayDuration}
                  onChange={(e) => setStayDuration(Number(e.target.value))}
                >
                  <option value={3}>3 Months (Short Term / Intern)</option>
                  <option value={6}>6 Months (Standard Hyderabad Stay)</option>
                  <option value={9}>9 Months (Extended Period)</option>
                  <option value={12}>12 Months (Full Year Stay)</option>
                </select>
              </div>

              <div style={{
                padding: '12px 16px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 10,
                marginBottom: 20,
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span>Monthly Rent:</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>₹{selectedRoomForBooking.monthlyPrice.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span>Check-in Date:</span>
                  <span style={{ color: 'var(--text-main)' }}>Today ({new Date().toLocaleDateString()})</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>All Included:</span>
                  <span style={{ color: '#059669', fontWeight: 600 }}>3 Meals + Biryani, DG Backup, 500 Mbps Wi-Fi, Laundry</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setSelectedRoomForBooking(null)}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingBooking}
                  className="btn btn-primary"
                  style={{ flex: 2 }}
                >
                  {submittingBooking ? 'Allocating...' : 'Confirm Check-in'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
