import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, User, Phone, Shield, Building, AlertCircle } from 'lucide-react';

export default function AuthModal({ initialMode = 'login', onClose, onSuccess }) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'resident',
    collegeOrCompany: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await login(loginEmail, loginPassword);
    setLoading(false);
    if (res.success) {
      if (onSuccess) onSuccess(res.user);
      onClose();
    } else {
      setError(res.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const payload = {
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
      phone: registerData.phone,
      role: registerData.role,
      collegeOrCompany: registerData.collegeOrCompany,
      emergencyContact: {
        name: registerData.emergencyContactName,
        phone: registerData.emergencyContactPhone,
        relation: 'Parent / Guardian',
      },
    };

    const res = await register(payload);
    setLoading(false);
    if (res.success) {
      if (onSuccess) onSuccess(res.user);
      onClose();
    } else {
      setError(res.message || 'Registration failed.');
    }
  };

  const fillQuickCredentials = (email, pass) => {
    setLoginEmail(email);
    setLoginPassword(pass);
    setError('');
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
      zIndex: 1050,
      padding: 20,
    }}>
      <div
        className="glass-panel"
        style={{
          maxWidth: 460,
          width: '100%',
          padding: 32,
          position: 'relative',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 18,
            right: 20,
            color: 'var(--text-muted)',
            fontSize: '1.2rem',
            cursor: 'pointer',
          }}
        >
          ✕
        </button>

        {/* Tab switchers */}
        <div style={{
          display: 'flex',
          background: '#f1f5f9',
          padding: 4,
          borderRadius: 12,
          marginBottom: 24,
        }}>
          <button
            onClick={() => { setMode('login'); setError(''); }}
            style={{
              flex: 1,
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: '0.9rem',
              fontWeight: 700,
              background: mode === 'login' ? '#ffffff' : 'transparent',
              color: mode === 'login' ? 'var(--primary)' : 'var(--text-muted)',
              boxShadow: mode === 'login' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => { setMode('register'); setError(''); }}
            style={{
              flex: 1,
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: '0.9rem',
              fontWeight: 700,
              background: mode === 'register' ? '#ffffff' : 'transparent',
              color: mode === 'register' ? 'var(--primary)' : 'var(--text-muted)',
              boxShadow: mode === 'register' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            New Resident Registration
          </button>
        </div>

        {error && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 14px',
            borderRadius: 8,
            marginBottom: 20,
            fontSize: '0.85rem',
            background: '#fff1f2',
            border: '1px solid #fecdd3',
            color: '#be123c',
          }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {mode === 'login' ? (
          <div>
            {/* Quick autofill helper */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 10,
              padding: '12px 14px',
              marginBottom: 20,
              fontSize: '0.78rem',
            }}>
              <div style={{ color: 'var(--primary)', fontWeight: 700, marginBottom: 8 }}>
                ⚡ 1-Click Fast Credentials:
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => fillQuickCredentials('admin@hostel.com', 'admin123')}
                  style={{
                    background: '#ffffff',
                    color: 'var(--text-main)',
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    border: '1px solid #cbd5e1',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                  }}
                >
                  👑 Owner (Admin)
                </button>
                <button
                  type="button"
                  onClick={() => fillQuickCredentials('rahul@gmail.com', 'resident123')}
                  style={{
                    background: '#ffffff',
                    color: 'var(--text-main)',
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    border: '1px solid #cbd5e1',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                  }}
                >
                  👤 Rahul (3-Share)
                </button>
                <button
                  type="button"
                  onClick={() => fillQuickCredentials('arun@gmail.com', 'resident123')}
                  style={{
                    background: '#ffffff',
                    color: 'var(--text-main)',
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    border: '1px solid #cbd5e1',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                  }}
                >
                  👤 Arun (4-Share)
                </button>
              </div>
            </div>

            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="e.g. rahul@gmail.com or admin@hostel.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Enter password (e.g. resident123)"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: 10 }}
              >
                {loading ? 'Authenticating...' : 'Sign In to Portal'}
              </button>
            </form>
          </div>
        ) : (
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Ankit Sharma"
                value={registerData.name}
                onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="e.g. ankit@gmail.com"
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="+91 9876543210"
                  value={registerData.phone}
                  onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Account Role</label>
                <select
                  className="form-select"
                  value={registerData.role}
                  onChange={(e) => setRegisterData({ ...registerData, role: e.target.value })}
                >
                  <option value="resident">Resident (Men)</option>
                  <option value="admin">Hostel Owner / Admin</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Minimum 6 characters"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">College or IT Company</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. TCS / Cognizant / Mindspace"
                value={registerData.collegeOrCompany}
                onChange={(e) => setRegisterData({ ...registerData, collegeOrCompany: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label className="form-label">Emergency Contact Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Parent Name"
                  value={registerData.emergencyContactName}
                  onChange={(e) => setRegisterData({ ...registerData, emergencyContactName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Emergency Phone</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="Emergency Phone"
                  value={registerData.emergencyContactPhone}
                  onChange={(e) => setRegisterData({ ...registerData, emergencyContactPhone: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: 10 }}
            >
              {loading ? 'Registering...' : 'Complete Registration'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
