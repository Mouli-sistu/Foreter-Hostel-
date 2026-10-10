import React from 'react';
import { Zap, Wifi, Flame, Shirt, ShieldCheck, Droplet, Utensils, Bike, CheckCircle2, Activity } from 'lucide-react';

export default function FacilitiesGrid() {
  const facilities = [
    {
      id: 'mess',
      title: '3-Times Food & Sunday Biryani',
      subtitle: 'Unlimited Homely South & North Buffet',
      icon: Utensils,
      accentColor: '#e11d48',
      badge: 'Buffet + Irani Chai',
      status: 'Daily 7:30 AM - 10:00 PM',
      description: 'Authentic homely food prepared with premium Sona Masoori rice & RO water. Sunday special Hyderabadi Chicken Dum Biryani & Mirchi Ka Salan, Wednesday Chicken Curry, and daily morning breakfast with hot tea/coffee.',
      specifications: [
        'Sunday Special Hyderabadi Chicken Dum Biryani + Paneer Biryani',
        'Daily South Indian breakfast: Idli, Dosa, Puri, Upma with Chutneys',
        '3-Times unlimited buffet meals with curd, papad & Andhra pickle',
        'Dedicated clean dining hall with separate veg & non-veg counters',
      ],
    },
    {
      id: 'electricity',
      title: '24/7 DG Power Backup',
      subtitle: 'Uninterrupted Generator Sync',
      icon: Zap,
      accentColor: '#d97706',
      badge: '100% DG Sync Backup',
      status: 'Continuous Active',
      description: 'Heavy-duty commercial diesel generator with automatic changeover switch (AMF panel). Zero latency power transition ensures your ACs, laptops, study lamps, and chargers never shut down during peak Hyderabad summer days.',
      specifications: [
        '100% Generator auto-backup within 5 seconds of power outage',
        'Runs all ACs, fans, lights, elevator & Wi-Fi routers',
        'Surge-protected dual power sockets at every study desk',
        'Corridor and emergency exit safety lighting',
      ],
    },
    {
      id: 'wifi',
      title: 'High-Speed Wi-Fi 6',
      subtitle: '500 Mbps Dual Fiber Mesh Network',
      icon: Wifi,
      accentColor: '#0284c7',
      badge: 'ACT + Airtel Dual Fiber',
      status: 'Low Latency (6ms)',
      description: 'Enterprise grade dual fiber optic connections (ACT Fibernet & Airtel Xstream) with automated failover. Dual-band access points positioned across all corridors ensure glitch-free coding sessions, Zoom calls, and streaming.',
      specifications: [
        '500 Mbps symmetrical download & upload bandwidth',
        'Wi-Fi 6 enterprise mesh access points on every corridor',
        'Automatic failover between ACT and Airtel lines',
        'Dedicated bandwidth prioritization for IT work from PG',
      ],
    },
    {
      id: 'hotwater',
      title: '24/7 Hot Water',
      subtitle: 'Hybrid Solar + Geyser Heating',
      icon: Flame,
      accentColor: '#ea580c',
      badge: 'Instant Pressurized Flow',
      status: 'Available Round-the-Clock',
      description: 'Eco-friendly high capacity rooftop solar thermal arrays coupled with automated electric geysers in attached bathrooms. Enjoy steaming hot showers at 6:00 AM before office or late at night after long shifts.',
      specifications: [
        'Pressurized hot water pipeline to all attached washrooms',
        'Solar thermal energy backup with auto-heating elements',
        'Thermostatically controlled water temperature (42°C - 48°C)',
        'Quarterly descaling and maintenance for clean water',
      ],
    },
    {
      id: 'washing',
      title: 'Automated Laundromat',
      subtitle: 'Washing Machines & Drying Zone',
      icon: Shirt,
      accentColor: '#7c3aed',
      badge: 'Dedicated Laundry Bay',
      status: 'Daily 6 AM - 11 PM',
      description: 'Dedicated laundromat wing equipped with commercial grade fully automatic washing machines. Includes spin dryers, large covered terrace drying racks, and ergonomic steam iron stations.',
      specifications: [
        'Multiple fully automatic washing machines with quick-wash modes',
        'Dedicated indoor & covered terrace drying zones',
        'Electric steam iron tables available for resident use',
        'Zero extra charge for resident laundry loads',
      ],
    },
    {
      id: 'parking_security',
      title: 'Biometric Access & Parking',
      subtitle: '24/7 CCTV & 2-Wheeler Parking',
      icon: Bike,
      accentColor: '#059669',
      badge: 'Guarded & Monitored',
      status: '24/7 Monitored',
      description: 'Round-the-clock physical security guards combined with biometric fingerprint entry for resident safety. Dedicated basement & covered two-wheeler parking with EV scooter charging points.',
      specifications: [
        'High-definition CCTV coverage across all corridors & gates',
        'Biometric check-in and checkout attendance logging',
        'Dedicated covered 2-wheeler parking with CCTV',
        'Night shift digital gate pass for tech professionals',
      ],
    },
    {
      id: 'water',
      title: 'RO Purified Drinking Water',
      subtitle: 'Multi-Stage Mineral Water Dispensers',
      icon: Droplet,
      accentColor: '#2563eb',
      badge: 'Chilled & Normal',
      status: 'Available on Every Floor',
      description: 'Commercial multi-stage RO + UV purification system with cold, normal, and hot water dispensers situated on every floor. Tested daily for optimal TDS and mineral balance.',
      specifications: [
        'Daily TDS & pH quality testing recorded on notice board',
        'Instant hot water dispenser for tea/coffee & cup noodles',
        'Food grade stainless steel storage tanks',
        'Zero plastic cans needed — pure hygienic dispensers',
      ],
    },
    {
      id: 'cctv',
      title: 'Daily Housekeeping & Care',
      subtitle: 'Spotless Room & Bathroom Cleaning',
      icon: ShieldCheck,
      accentColor: '#4f46e5',
      badge: 'Professional Staff',
      status: 'Daily Morning Service',
      description: 'Dedicated housekeeping staff sweeps, mops, and disinfects rooms and washrooms daily. Dustbins cleared every morning to ensure a fresh, pleasant living environment.',
      specifications: [
        'Daily room floor sweeping and wet mopping',
        'Attached bathroom deep sanitization twice a week',
        'Corridor and staircase cleaning every morning',
        'Prompt in-house repair and maintenance assistance',
      ],
    },
  ];

  return (
    <section style={{ padding: '60px 0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 48px' }}>
          <span className="badge badge-primary" style={{ marginBottom: 12 }}>
            <Activity size={13} /> Complete PG Specifications
          </span>
          <h2 style={{ fontSize: '2.4rem', marginBottom: 16, color: 'var(--text-main)' }}>
            Engineered for <span className="text-gradient">Complete Comfort</span> & Tech Focus
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            We provide all core amenities essential for Hyderabad techies and students, ensuring you never have to worry about power cuts, slow internet, laundry, or food.
          </p>
        </div>

        {/* Facilities Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
        }}>
          {facilities.map((fac) => {
            const Icon = fac.icon;
            return (
              <div
                key={fac.id}
                className="glass-panel"
                style={{
                  padding: 26,
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: '#ffffff',
                }}
              >
                <div>
                  {/* Top Bar with Icon & Status */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
                    <div style={{
                      width: 50,
                      height: 50,
                      borderRadius: 'var(--radius-md)',
                      background: '#f8fafc',
                      border: `1px solid #e2e8f0`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: fac.accentColor,
                    }}>
                      <Icon size={24} />
                    </div>

                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '4px 10px',
                      borderRadius: 9999,
                      background: '#ecfdf5',
                      border: '1px solid #a7f3d0',
                      color: '#047857',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                    }}>
                      <span style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: '#059669',
                      }} />
                      {fac.status}
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', marginBottom: 4, color: 'var(--text-main)' }}>{fac.title}</h3>
                  <div style={{ fontSize: '0.82rem', color: fac.accentColor, fontWeight: 700, marginBottom: 12 }}>
                    {fac.subtitle}
                  </div>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: 20, lineHeight: 1.55 }}>
                    {fac.description}
                  </p>
                </div>

                {/* Specs List */}
                <div style={{
                  borderTop: '1px solid #f1f5f9',
                  paddingTop: 16,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}>
                  {fac.specifications.map((spec, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      <CheckCircle2 size={14} color={fac.accentColor} style={{ flexShrink: 0, marginTop: 2 }} />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
