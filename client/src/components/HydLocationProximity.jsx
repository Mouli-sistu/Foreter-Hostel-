import React from 'react';
import { MapPin, Navigation, Building2, Train, Compass, Car, Bike, ShieldCheck, Clock } from 'lucide-react';

const HYD_HUBS = [
  {
    name: 'Durgam Cheruvu Metro Station',
    distance: '350 meters',
    time: '4 mins walk',
    type: 'Transit',
    badge: 'Direct Blue Line Metro'
  },
  {
    name: 'Cyber Towers (Hitec City)',
    distance: '1.2 km',
    time: '5 mins ride',
    type: 'IT Corridor',
    badge: 'Tech Landmark'
  },
  {
    name: 'Raheja Mindspace IT Park',
    distance: '1.5 km',
    time: '6 mins ride',
    type: 'IT Park',
    badge: 'Amazon, Cognizant, Qualcomm'
  },
  {
    name: 'DLF Cybercity & Gachibowli',
    distance: '3.8 km',
    time: '12 mins ride',
    type: 'IT Corridor',
    badge: 'Microsoft, Google, Infosys'
  },
  {
    name: 'Durgam Cheruvu Cable Bridge & Park',
    distance: '1.6 km',
    time: '6 mins ride',
    type: 'Recreation',
    badge: 'Jogging & Weekend Hangout'
  },
  {
    name: 'Inorbit Mall & Knowledge City',
    distance: '2.0 km',
    time: '7 mins ride',
    type: 'Shopping & Work',
    badge: 'My Home Twitza, Salarpuria'
  }
];

export default function HydLocationProximity() {
  return (
    <div className="glass-panel" style={{ padding: '36px 30px', margin: '40px 0' }}>
      <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 32px' }}>
        <span className="badge badge-primary" style={{ marginBottom: 12 }}>
          <MapPin size={13} /> Prime Hyderabad IT Corridor
        </span>
        <h2 style={{ fontSize: '2.2rem', marginBottom: 12, color: 'var(--text-main)' }}>
          Strategically Located in <span className="text-gradient">Madhapur, Hyderabad</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
          Foreter Pg for men is situated on Madhapur 100 Feet Road, giving techies and students instant walking access to Hyderabad Metro, major tech campuses, hospitals, and 24/7 food courts.
        </p>
      </div>

      {/* Campus Address Card */}
      <div style={{
        background: '#f8fafc',
        borderRadius: 16,
        border: '1px solid #e2e8f0',
        padding: '18px 24px',
        marginBottom: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #4f46e5, #0284c7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
          }}>
            <MapPin size={22} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)' }}>
              Foreter Pg for men — Madhapur Campus
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Plot #42, Beside Durgam Cheruvu Metro Station, Madhapur, Hitec City, Hyderabad - 500081
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <span className="badge badge-emerald">
            <Bike size={12} /> Covered Bike Parking
          </span>
          <span className="badge badge-cyan">
            <Train size={12} /> 4 Mins to Metro
          </span>
        </div>
      </div>

      {/* Proximity Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 16,
      }}>
        {HYD_HUBS.map((hub, idx) => (
          <div
            key={idx}
            style={{
              background: '#ffffff',
              borderRadius: 14,
              border: '1px solid #e2e8f0',
              padding: '18px 20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 10,
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
              <div>
                <strong style={{ fontSize: '0.98rem', color: 'var(--text-main)', display: 'block', marginBottom: 2 }}>
                  {hub.name}
                </strong>
                <span style={{ fontSize: '0.74rem', color: 'var(--primary)', fontWeight: 600 }}>
                  {hub.badge}
                </span>
              </div>
              <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>
                {hub.type}
              </span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: 10,
              borderTop: '1px solid #f1f5f9',
              fontSize: '0.84rem',
              color: 'var(--text-muted)',
            }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <Navigation size={13} color="#4f46e5" /> {hub.distance}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontWeight: 700, color: '#059669' }}>
                <Clock size={13} /> {hub.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
