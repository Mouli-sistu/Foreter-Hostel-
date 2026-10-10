import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Building2, Shield, User, LogOut, Utensils, MapPin, Zap, ChevronDown, Check } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenAuth }) {
  const { user, isAdmin, isResident, logout, quickLogin } = useAuth();
  const [showDemoMenu, setShowDemoMenu] = useState(false);

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(255, 255, 255, 0.94)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid #e2e8f0',
      boxShadow: '0 2px 12px rgba(15, 23, 42, 0.04)',
      padding: '12px 0',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        {/* Brand */}
        <div
          onClick={() => setActiveTab('home')}
          style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
        >
          <div style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #4f46e5 0%, #0284c7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(79, 70, 229, 0.25)',
          }}>
            <Building2 size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#0f172a' }}>Foreter Pg</span>
              <span className="text-gradient">for men</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
              <MapPin size={11} color="#059669" /> Madhapur · Hitec City, Hyderabad
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('home')}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.88rem',
              fontWeight: 600,
              color: activeTab === 'home' ? 'var(--primary)' : 'var(--text-muted)',
              background: activeTab === 'home' ? '#eef2ff' : 'transparent',
              border: activeTab === 'home' ? '1px solid #c7d2fe' : '1px solid transparent',
              transition: 'all var(--transition-fast)',
            }}
          >
            Overview
          </button>

          {/* Hyderabad Mess Food Schedule Tab */}
          <button
            onClick={() => setActiveTab('mess')}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.88rem',
              fontWeight: 600,
              color: activeTab === 'mess' ? '#b45309' : 'var(--text-muted)',
              background: activeTab === 'mess' ? '#fffbeb' : 'transparent',
              border: activeTab === 'mess' ? '1px solid #fde68a' : '1px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all var(--transition-fast)',
            }}
          >
            <Utensils size={15} /> Hyd Mess Menu 🍛
          </button>

          <button
            onClick={() => setActiveTab('facilities')}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.88rem',
              fontWeight: 600,
              color: activeTab === 'facilities' ? 'var(--primary)' : 'var(--text-muted)',
              background: activeTab === 'facilities' ? '#eef2ff' : 'transparent',
              border: activeTab === 'facilities' ? '1px solid #c7d2fe' : '1px solid transparent',
              transition: 'all var(--transition-fast)',
            }}
          >
            PG Facilities
          </button>

          <button
            onClick={() => setActiveTab('rooms')}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.88rem',
              fontWeight: 600,
              color: activeTab === 'rooms' ? 'var(--primary)' : 'var(--text-muted)',
              background: activeTab === 'rooms' ? '#eef2ff' : 'transparent',
              border: activeTab === 'rooms' ? '1px solid #c7d2fe' : '1px solid transparent',
              transition: 'all var(--transition-fast)',
            }}
          >
            3 & 4 Share Rooms
          </button>

          {/* Stay People Portal Tab */}
          <button
            onClick={() => {
              if (!user) {
                onOpenAuth('login');
              } else {
                setActiveTab('resident');
              }
            }}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.88rem',
              fontWeight: 600,
              color: activeTab === 'resident' ? '#0369a1' : 'var(--text-muted)',
              background: activeTab === 'resident' ? '#f0f9ff' : 'transparent',
              border: activeTab === 'resident' ? '1px solid #bae6fd' : '1px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <User size={15} /> Stay People Portal
          </button>

          {/* Admin / Owner Portal Tab */}
          <button
            onClick={() => {
              if (!user) {
                onOpenAuth('login');
              } else {
                setActiveTab('admin');
              }
            }}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.88rem',
              fontWeight: 600,
              color: activeTab === 'admin' ? '#4338ca' : 'var(--text-muted)',
              background: activeTab === 'admin' ? '#eef2ff' : 'transparent',
              border: activeTab === 'admin' ? '1px solid #c7d2fe' : '1px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Shield size={15} /> Owner Portal
          </button>
        </div>

        {/* User Account / Auth Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Quick Demo Switcher Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowDemoMenu(!showDemoMenu)}
              className="btn btn-secondary btn-sm"
              style={{
                fontSize: '0.78rem',
                padding: '6px 10px',
                background: '#f8fafc',
                border: '1px solid #cbd5e1',
                color: '#334155',
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}
              title="Fast switch accounts for testing"
            >
              <span>Test Accounts</span>
              <ChevronDown size={13} />
            </button>

            {showDemoMenu && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: 6,
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 12,
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                padding: 8,
                zIndex: 200,
                minWidth: 220,
              }}>
                <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, padding: '4px 8px', textTransform: 'uppercase' }}>
                  1-Click Switch:
                </div>
                <button
                  onClick={async () => {
                    await quickLogin('admin');
                    setActiveTab('admin');
                    setShowDemoMenu(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 8,
                    fontSize: '0.82rem',
                    textAlign: 'left',
                    color: '#1e293b',
                    background: user?.role === 'admin' ? '#eef2ff' : 'transparent',
                  }}
                >
                  <Shield size={14} color="#4f46e5" />
                  <div>
                    <strong>Owner / Admin</strong>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>admin@hostel.com</div>
                  </div>
                </button>

                <button
                  onClick={async () => {
                    await quickLogin('rahul');
                    setActiveTab('resident');
                    setShowDemoMenu(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 8,
                    fontSize: '0.82rem',
                    textAlign: 'left',
                    color: '#1e293b',
                    background: user?.email === 'rahul@gmail.com' ? '#ecfdf5' : 'transparent',
                  }}
                >
                  <User size={14} color="#059669" />
                  <div>
                    <strong>Rahul (3-Share)</strong>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Room 101 · ₹10k/mo</div>
                  </div>
                </button>

                <button
                  onClick={async () => {
                    await quickLogin('arun');
                    setActiveTab('resident');
                    setShowDemoMenu(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 8,
                    fontSize: '0.82rem',
                    textAlign: 'left',
                    color: '#1e293b',
                    background: user?.email === 'arun@gmail.com' ? '#f0f9ff' : 'transparent',
                  }}
                >
                  <User size={14} color="#0284c7" />
                  <div>
                    <strong>Arun (4-Share)</strong>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Room 201 · ₹7.5k/mo</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '5px 12px',
                borderRadius: 'var(--radius-full)',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
              }}>
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: user.role === 'admin' ? 'linear-gradient(135deg, #4f46e5, #0284c7)' : 'linear-gradient(135deg, #059669, #10b981)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#ffffff',
                }}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', maxWidth: 120, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {user.name.split(' ')[0]}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: user.role === 'admin' ? '#4f46e5' : '#059669', fontWeight: 600 }}>
                    {user.role === 'admin' ? 'Hostel Owner' : (user.roomNumber ? `Room ${user.roomNumber}` : 'Resident')}
                  </div>
                </div>
              </div>

              <button
                onClick={logout}
                className="btn btn-secondary btn-sm"
                title="Log out"
                style={{ padding: '8px 10px', color: '#64748b' }}
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button
                onClick={() => onOpenAuth('login')}
                className="btn btn-secondary btn-sm"
              >
                Sign In
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="btn btn-primary btn-sm"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
