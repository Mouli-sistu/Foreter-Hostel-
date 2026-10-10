import React, { useState } from 'react';
import { QrCode, CheckCircle2, DollarSign, Download, FileText, ArrowRight, ShieldCheck, Check, Copy } from 'lucide-react';

export default function HydUpiPaymentModal({ user, onClose, onPaymentSuccess }) {
  const [utrNumber, setUtrNumber] = useState('');
  const [paymentMode, setPaymentMode] = useState('Google Pay / PhonePe');
  const [paidSuccess, setPaidSuccess] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  const amount = user?.roomNumber?.startsWith('1') ? 10000 : 7500;
  const currentMonth = new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
  const receiptNo = `FPG-REC-${Math.floor(100000 + Math.random() * 900000)}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('foreterpg@icici');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleConfirmPayment = (e) => {
    e.preventDefault();
    if (!utrNumber || utrNumber.length < 6) {
      alert('Please enter a valid 12-digit UPI UTR / Transaction Reference number');
      return;
    }
    setPaidSuccess(true);
    if (onPaymentSuccess) {
      onPaymentSuccess({ utrNumber, amount, month: currentMonth });
    }
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

        {!paidSuccess ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: '#ecfdf5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <QrCode size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>
                  Pay PG Rent via UPI / QR Code
                </h3>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Foreter Pg for men · Madhapur, Hyderabad
                </div>
              </div>
            </div>

            {/* Bill summary */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 14,
              padding: '16px',
              marginBottom: 20,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Month:</span>
                <strong style={{ color: 'var(--text-main)' }}>{currentMonth}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Resident:</span>
                <strong>{user?.name} (Room {user?.roomNumber || '101'})</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid #e2e8f0', fontSize: '1.1rem' }}>
                <strong>Total Amount:</strong>
                <strong style={{ color: 'var(--primary)', fontSize: '1.25rem' }}>₹{amount.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            {/* QR Code & UPI ID */}
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{
                width: 160,
                height: 160,
                margin: '0 auto 12px',
                background: '#ffffff',
                border: '2px solid #cbd5e1',
                borderRadius: 16,
                padding: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              }}>
                <QrCode size={120} color="#0f172a" />
                <span style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600 }}>SCAN WITH ANY UPI APP</span>
              </div>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#f1f5f9', padding: '6px 12px', borderRadius: 9999, fontSize: '0.82rem' }}>
                <span>UPI ID: <strong>foreterpg@icici</strong></span>
                <button
                  type="button"
                  onClick={handleCopyUpi}
                  style={{ color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2 }}
                >
                  {copiedUpi ? <Check size={14} /> : <Copy size={14} />}
                  <span style={{ fontSize: '0.75rem' }}>{copiedUpi ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* UTR input form */}
            <form onSubmit={handleConfirmPayment}>
              <div className="form-group">
                <label className="form-label">Enter 12-Digit UPI Transaction / UTR No.</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 428901234567"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  className="form-input"
                />
              </div>

              <button type="submit" className="btn btn-emerald" style={{ width: '100%', padding: '12px' }}>
                <CheckCircle2 size={16} /> Confirm Rent Payment & Get Receipt
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: '#ecfdf5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <CheckCircle2 size={32} />
            </div>

            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: 4 }}>
              Payment Verified Successfully!
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: 20 }}>
              Your rent payment for {currentMonth} is acknowledged by Foreter Pg for men management.
            </p>

            {/* Receipt Box */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: 14,
              padding: 20,
              textAlign: 'left',
              fontSize: '0.84rem',
              marginBottom: 20,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <div>
                  <strong>FORETER PG FOR MEN</strong>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>HRA Rent Payment Receipt</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{receiptNo}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{new Date().toLocaleDateString('en-IN')}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '8px 0', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
                <div>Resident: <strong>{user?.name}</strong></div>
                <div>Room: <strong>Room {user?.roomNumber || '101'}</strong></div>
                <div>Month: <strong>{currentMonth}</strong></div>
                <div>UTR: <strong>{utrNumber}</strong></div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: '1rem', fontWeight: 700 }}>
                <span>Amount Paid:</span>
                <span style={{ color: '#059669' }}>₹{amount.toLocaleString('en-IN')} (PAID)</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px' }}
            >
              Done & Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
