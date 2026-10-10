import React from 'react';
import FacilitiesGrid from '../components/FacilitiesGrid';
import PricingRooms from '../components/PricingRooms';
import HydMessMenu from '../components/HydMessMenu';
import HydLocationProximity from '../components/HydLocationProximity';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  Zap,
  Wifi,
  Flame,
  Shirt,
  Shield,
  ArrowRight,
  CheckCircle,
  Building,
  Users,
  Award,
  ChevronRight,
  Utensils,
  MapPin,
  Clock,
  Bike
} from 'lucide-react';

export default function LandingPage({ setActiveTab, onOpenAuth }) {
  const { user, isAuthenticated } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        padding: '50px 0 40px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 40,
            alignItems: 'center',
          }}>
            {/* Left Content */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 14px',
                borderRadius: 9999,
                background: '#eef2ff',
                border: '1px solid #c7d2fe',
                color: '#4338ca',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.03em',
                marginBottom: 20,
              }}>
                <Sparkles size={14} /> LUXURY MEN'S PG · MADHAPUR & HITEC CITY
              </div>

              <h1 style={{
                fontSize: '3.1rem',
                letterSpacing: '-0.03em',
                lineHeight: 1.18,
                marginBottom: 20,
                color: '#0f172a',
              }}>
                Premium Living for Men in Hyderabad with <span className="text-gradient">Zero Compromise</span>.
              </h1>

              <p style={{
                fontSize: '1.08rem',
                color: 'var(--text-muted)',
                marginBottom: 30,
                lineHeight: 1.6,
              }}>
                Welcome to <strong>Foreter Pg for men</strong> in Madhapur. Built for techies and students with guaranteed <strong style={{ color: '#0f172a' }}>24/7 DG power backup</strong>, <strong style={{ color: '#0f172a' }}>500 Mbps dual fiber Wi-Fi</strong>, <strong style={{ color: '#0f172a' }}>3-times unlimited homely food (Sunday Biryani special)</strong>, and an on-premise automated laundromat. Just 4 minutes walk to Durgam Cheruvu Metro!
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 36 }}>
                <button
                  onClick={() => {
                    const el = document.getElementById('pricing-rooms-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn btn-primary"
                  style={{ padding: '12px 24px', fontSize: '1rem' }}
                >
                  Explore 3 & 4 Share Rooms <ArrowRight size={18} />
                </button>

                <button
                  onClick={() => setActiveTab('mess')}
                  className="btn btn-secondary"
                  style={{ padding: '12px 24px', fontSize: '1rem', color: '#b45309', border: '1px solid #fde68a', background: '#fffbeb' }}
                >
                  <Utensils size={18} /> Daily Hyderabad Mess Menu
                </button>

                {isAuthenticated ? (
                  <button
                    onClick={() => setActiveTab(user?.role === 'admin' ? 'admin' : 'resident')}
                    className="btn btn-secondary"
                    style={{ padding: '12px 24px', fontSize: '1rem' }}
                  >
                    Open {user?.role === 'admin' ? 'Owner Portal' : 'Stay Portal'}
                  </button>
                ) : (
                  <button
                    onClick={() => onOpenAuth('login')}
                    className="btn btn-secondary"
                    style={{ padding: '12px 24px', fontSize: '1rem' }}
                  >
                    Sign In to Portal
                  </button>
                )}
              </div>

              {/* Hyderabad Live feature pill tags */}
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.84rem', color: '#334155', background: '#ffffff', padding: '6px 12px', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                  <Zap size={15} color="#d97706" />
                  <span>24/7 DG Generator</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.84rem', color: '#334155', background: '#ffffff', padding: '6px 12px', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                  <Wifi size={15} color="#0284c7" />
                  <span>500 Mbps Fiber Wi-Fi</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.84rem', color: '#334155', background: '#ffffff', padding: '6px 12px', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                  <Utensils size={15} color="#e11d48" />
                  <span>3-Times Food + Biryani</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.84rem', color: '#334155', background: '#ffffff', padding: '6px 12px', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                  <Bike size={15} color="#059669" />
                  <span>Bike Parking + CCTV</span>
                </div>
              </div>
            </div>

            {/* Right Card Graphic */}
            <div className="glass-panel" style={{
              padding: 32,
              border: '1px solid #e2e8f0',
              background: '#ffffff',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <span className="badge badge-emerald">Live Hostel Status</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: 600 }}>Madhapur Branch · Hitec City</span>
              </div>

              {/* Status metrics grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 24 }}>
                <div style={{
                  padding: '16px',
                  borderRadius: 14,
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                }}>
                  <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>
                    Triple Sharing (AC)
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)', margin: '4px 0' }}>
                    ₹10,000
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>Food + Wi-Fi + Geyser Included</div>
                </div>

                <div style={{
                  padding: '16px',
                  borderRadius: 14,
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                }}>
                  <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>
                    Quad Sharing (AC)
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0284c7', margin: '4px 0' }}>
                    ₹7,500
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>Attached Bath + Lockers + Food</div>
                </div>
              </div>

              {/* Verified Features Quick List */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                fontSize: '0.85rem',
                color: 'var(--text-main)',
                paddingTop: 16,
                borderTop: '1px solid #f1f5f9',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>🍛 3-Times Homely Food + Sunday Biryani</span>
                  <span style={{ color: '#059669', fontWeight: 700 }}>Unlimited</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>⚡ 24/7 Heavy DG Power Backup (Runs AC)</span>
                  <span style={{ color: '#059669', fontWeight: 700 }}>100% Uptime</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>📶 High-Speed Dual Fiber Wi-Fi (ACT + Airtel)</span>
                  <span style={{ color: '#059669', fontWeight: 700 }}>500 Mbps</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>♨️ Solar Hybrid Hot Water Geysers</span>
                  <span style={{ color: '#059669', fontWeight: 700 }}>24/7 Active</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>🧺 Automatic Washing Machines & Terrace Drying</span>
                  <span style={{ color: '#059669', fontWeight: 700 }}>Free Use</span>
                </div>
              </div>

              {/* Quick action button */}
              <div style={{ marginTop: 24 }}>
                <button
                  onClick={() => {
                    const el = document.getElementById('pricing-rooms-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '11px' }}
                >
                  View Available Beds & Reserve Spot
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hyderabad Mess Food Schedule Section */}
      <section className="container">
        <HydMessMenu />
      </section>

      {/* Facilities Grid */}
      <FacilitiesGrid />

      {/* 3 & 4 Share Room Pricing Section */}
      <PricingRooms onOpenAuth={onOpenAuth} />

      {/* Hyderabad Location & IT Hub Proximity */}
      <section className="container">
        <HydLocationProximity />
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid #e2e8f0',
        background: '#ffffff',
        padding: '40px 0 24px',
        marginTop: 60,
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 20,
            marginBottom: 20,
          }}>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#0f172a' }}>Foreter Pg</span>
                <span className="text-gradient">for men</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Luxury Men's PG & Co-Living · Beside Durgam Cheruvu Metro Station, Madhapur, Hyderabad
              </div>
            </div>

            <div style={{ display: 'flex', gap: 16, fontSize: '0.85rem' }}>
              <button onClick={() => setActiveTab('home')} style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Home</button>
              <button onClick={() => setActiveTab('mess')} style={{ color: '#b45309', fontWeight: 700 }}>Mess Menu 🍛</button>
              <button onClick={() => setActiveTab('facilities')} style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Facilities</button>
              <button onClick={() => setActiveTab('rooms')} style={{ color: 'var(--text-muted)', fontWeight: 600 }}>3 & 4 Share</button>
              <button onClick={() => setActiveTab('resident')} style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Stay Portal</button>
              <button onClick={() => setActiveTab('admin')} style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Owner Portal</button>
            </div>
          </div>

          <div style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-dim)', borderTop: '1px solid #f1f5f9', paddingTop: 16 }}>
            © {new Date().getFullYear()} Foreter Pg for men. Madhapur, Hitec City, Hyderabad - 500081. All utilities, 3-times daily meals & 500 Mbps Wi-Fi included.
          </div>
        </div>
      </footer>
    </div>
  );
}
