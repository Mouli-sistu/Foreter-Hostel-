import React, { useState } from 'react';
import { ShieldCheck, Moon, Clock, CheckCircle2, QrCode, FileText, AlertCircle, Copy, Check } from 'lucide-react';

export default function HydNightGatePassModal({ user, onClose }) {
  const [reason, setReason] = useState('IT Night Shift (US/UK Client)');
  const [company, setCompany] = useState(user?.collegeOrCompany || 'Tech Mahindra / TCS');
  const [expectedTime, setExpectedTime] = useState('01:30 AM');
  const [passGenerated, setPassGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const passId = `HYD-FP-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const handleGenerate = (e) => {
    e.preventDefault();
    setPassGenerated(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`FORETER PG LATE ENTRY PASS\nPass ID: ${passId}\nResident: ${user?.name}\nRoom: ${user?.roomNumber || '101'}\nExpected Time: ${expectedTime}\nReason: ${reason}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
      <div
        className="glass-panel"
        style={{
          maxWidth: 480,
          width: '100%',
          background: '#ffffff',
          borderRadius: 20,
          padding: 28,
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 18,
            right: 20,
            fontSize: '1.2rem',
            color: 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          ✕
        </button>

        {!passGenerated ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: '#e0e7ff',
                color: '#4338ca',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Moon size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>
                  Late Night Entry / IT Shift Pass
                </h3>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Standard Hyderabad PG gate curfew: 10:30 PM
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: 20, lineHeight: 1.5 }}>
              Working late at Hitec City / Mindspace or on an offshore project release? Generate a digital night gate pass verified for the night security team.
            </p>

            <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Resident Name & Room</label>
                <input
                  type="text"
                  disabled
                  value={`${user?.name} · Room ${user?.roomNumber || '101'}`}
                  className="form-input"
                  style={{ background: '#f8fafc', color: 'var(--text-muted)' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Reason for Late Entry</label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="form-select"
                >
                  <option value="IT Night Shift (US/UK Client)">IT Night Shift (US/UK Client)</option>
                  <option value="Production Release / Server Maintenance">Production Release / Server Maintenance</option>
                  <option value="Extended Office Work / Client Meeting">Extended Office Work / Client Meeting</option>
                  <option value="Late Night Study / Library">Late Night Study / Library</option>
                  <option value="Outstation Bus/Flight Arrival">Outstation Bus / Flight Arrival</option>
                  <option value="Family / Personal Emergency">Personal Emergency</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Company / Work Location</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. TCS, Mindspace, Microsoft"
                  className="form-input"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Expected Return Time to PG</label>
                <input
                  type="text"
                  value={expectedTime}
                  onChange={(e) => setExpectedTime(e.target.value)}
                  placeholder="e.g. 01:30 AM or 03:00 AM"
                  className="form-input"
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: 8 }}>
                <ShieldCheck size={16} /> Issue Instant Digital Gate Pass
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex',
              padding: '6px 14px',
              borderRadius: 9999,
              background: '#ecfdf5',
              color: '#047857',
              border: '1px solid #a7f3d0',
              fontWeight: 700,
              fontSize: '0.78rem',
              marginBottom: 16,
              alignItems: 'center',
              gap: 6
            }}>
              <CheckCircle2 size={14} /> ACTIVE NIGHT PASS APPROVED
            </div>

            {/* Pass badge */}
            <div style={{
              background: 'linear-gradient(145deg, #f8fafc 0%, #eef2ff 100%)',
              border: '2px dashed #818cf8',
              borderRadius: 16,
              padding: 20,
              marginBottom: 20,
              textAlign: 'left',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-dim)', fontWeight: 700 }}>
                    FORETER PG FOR MEN · MADHAPUR
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    Pass #{passId}
                  </div>
                </div>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#4f46e5'
                }}>
                  <QrCode size={22} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, fontSize: '0.82rem', marginBottom: 12 }}>
                <div>
                  <span style={{ color: 'var(--text-dim)', display: 'block' }}>Resident:</span>
                  <strong>{user?.name}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-dim)', display: 'block' }}>Room No:</span>
                  <strong>Room {user?.roomNumber || '101'}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-dim)', display: 'block' }}>Expected Arrival:</span>
                  <strong style={{ color: '#4f46e5' }}>{expectedTime}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-dim)', display: 'block' }}>Valid Date:</span>
                  <strong>{dateStr}</strong>
                </div>
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', paddingTop: 10, borderTop: '1px solid #e2e8f0' }}>
                <strong>Reason:</strong> {reason} ({company})
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={handleCopy}
                className="btn btn-secondary"
                style={{ flex: 1, padding: '10px' }}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied Details' : 'Copy Pass Details'}
              </button>
              <button
                onClick={onClose}
                className="btn btn-primary"
                style={{ flex: 1, padding: '10px' }}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
