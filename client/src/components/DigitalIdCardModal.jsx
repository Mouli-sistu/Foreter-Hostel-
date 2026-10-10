import React from 'react';
import { Building2, QrCode, ShieldCheck, Phone, Calendar, User, Printer, MapPin } from 'lucide-react';

export default function DigitalIdCardModal({ user, onClose }) {
  if (!user) return null;

  const formatDate = (d) => {
    if (!d) return 'N/A';
    return new Date(d).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1100,
      padding: 20,
    }}>
      <div style={{ maxWidth: 420, width: '100%', position: 'relative' }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: -38,
            right: 0,
            color: '#ffffff',
            fontSize: '1rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 700,
          }}
        >
          ✕ Close
        </button>

        {/* Digital ID Badge Card */}
        <div style={{
          background: '#ffffff',
          borderRadius: 24,
          border: '2px solid #cbd5e1',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Top Header */}
          <div style={{
            background: 'linear-gradient(135deg, #4f46e5 0%, #0284c7 100%)',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Building2 size={22} color="#ffffff" />
              </div>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.02em' }}>
                  FORETER PG FOR MEN
                </div>
                <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.9)', letterSpacing: '0.04em' }}>
                  RESIDENT ID · MADHAPUR, HYDERABAD
                </div>
              </div>
            </div>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <ShieldCheck size={18} color="#ffffff" />
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: 24 }}>
            {/* Avatar and basic info */}
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
              <div style={{
                width: 70,
                height: 70,
                borderRadius: 18,
                background: 'linear-gradient(135deg, #4f46e5, #059669)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                fontWeight: 800,
                color: '#ffffff',
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.25)',
              }}>
                {user.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <h4 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: 2, fontWeight: 800 }}>{user.name}</h4>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{user.email}</div>
                <div style={{ fontSize: '0.78rem', color: '#4f46e5', marginTop: 4, fontWeight: 600 }}>
                  {user.collegeOrCompany || 'Registered Resident'}
                </div>
              </div>
            </div>

            {/* Stay Details Grid */}
            <div style={{
              background: '#f8fafc',
              borderRadius: 16,
              border: '1px solid #e2e8f0',
              padding: 16,
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 12,
              marginBottom: 20,
              fontSize: '0.82rem',
            }}>
              <div>
                <div style={{ color: '#64748b', fontSize: '0.7rem', fontWeight: 600 }}>ROOM ALLOCATION</div>
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>
                  {user.roomNumber ? `Room ${user.roomNumber} (${user.bedId})` : 'Unassigned'}
                </div>
              </div>

              <div>
                <div style={{ color: '#64748b', fontSize: '0.7rem', fontWeight: 600 }}>SHARING PLAN</div>
                <div style={{ fontWeight: 700, color: user.sharingType === '3-Share' ? '#4f46e5' : '#0284c7' }}>
                  {user.sharingType || 'Standard'}
                </div>
              </div>

              <div>
                <div style={{ color: '#64748b', fontSize: '0.7rem', fontWeight: 600 }}>CHECK-IN DATE</div>
                <div style={{ fontWeight: 600, color: '#0f172a' }}>
                  {formatDate(user.checkInDate)}
                </div>
              </div>

              <div>
                <div style={{ color: '#64748b', fontSize: '0.7rem', fontWeight: 600 }}>VALID UNTIL</div>
                <div style={{ fontWeight: 600, color: '#0f172a' }}>
                  {formatDate(user.expectedCheckOutDate)}
                </div>
              </div>

              <div>
                <div style={{ color: '#64748b', fontSize: '0.7rem', fontWeight: 600 }}>STAY PERIOD</div>
                <div style={{ fontWeight: 600, color: '#0f172a' }}>
                  {user.stayDurationMonths || 6} Months
                </div>
              </div>

              <div>
                <div style={{ color: '#64748b', fontSize: '0.7rem', fontWeight: 600 }}>PAYMENT STATUS</div>
                <div style={{
                  fontWeight: 700,
                  color: user.paymentStatus === 'Paid' ? '#059669' : '#e11d48',
                }}>
                  ● {user.paymentStatus || 'Paid'}
                </div>
              </div>
            </div>

            {/* Emergency & QR verification */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid #e2e8f0',
              paddingTop: 16,
            }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                <div>Emergency Contact:</div>
                <div style={{ color: '#0f172a', fontWeight: 600 }}>
                  {user.emergencyContact?.name ? `${user.emergencyContact.name} (${user.emergencyContact.phone})` : 'Warden: +91 98765 43210'}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#059669', marginTop: 2 }}>
                  ✓ Biometric Gate Enabled
                </div>
              </div>

              <div style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                padding: 6,
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <QrCode size={42} color="#0f172a" />
              </div>
            </div>
          </div>
        </div>

        {/* Print / Done buttons */}
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <button
            onClick={() => window.print()}
            className="btn btn-secondary"
            style={{ flex: 1 }}
          >
            <Printer size={15} /> Print Card
          </button>
          <button
            onClick={onClose}
            className="btn btn-primary"
            style={{ flex: 1 }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
