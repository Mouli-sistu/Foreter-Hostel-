import React, { useState } from 'react';
import { Utensils, Coffee, Sun, Sunset, Moon, Sparkles, CheckCircle2, Clock, ShieldCheck, Heart } from 'lucide-react';

const WEEKLY_MENU = {
  sunday: {
    name: 'Sunday',
    specialTag: '👑 Hyderabadi Dum Biryani Feast',
    specialColor: '#e11d48',
    breakfast: {
      items: ['Hot Masala Dosa', 'Palli Chutney', 'Tomato Chutney', 'Sambar', 'Tea / Coffee'],
      time: '7:30 AM - 9:30 AM'
    },
    lunch: {
      items: [
        '🍗 Authentic Hyderabadi Chicken Dum Biryani',
        '🧀 Royal Paneer Dum Biryani (Veg)',
        'Mirchi Ka Salan',
        'Onion Mint Raita',
        'Boiled Egg',
        'Gulab Jamun (Dessert)'
      ],
      time: '12:30 PM - 3:30 PM (Extended Weekend Hours)'
    },
    snacks: {
      items: ['Hyderabadi Irani Chai', 'Osmania Biscuits / Hot Onion Pakoda'],
      time: '5:30 PM - 6:30 PM'
    },
    dinner: {
      items: ['Hot Phulkas / Chapatis', 'Mixed Veg Korma / Light Egg Curry', 'Jeera Rice', 'Rasam', 'Fresh Curd'],
      time: '7:30 PM - 10:00 PM'
    }
  },
  monday: {
    name: 'Monday',
    specialTag: 'Energetic Week Starter',
    specialColor: '#4f46e5',
    breakfast: {
      items: ['Steaming Hot Idli & Medu Vada', 'Coconut Chutney', 'Drumstick Sambar', 'Filter Coffee / Tea'],
      time: '7:30 AM - 9:30 AM'
    },
    lunch: {
      items: ['Soft Chapatis', 'Palak Dal (Pappu)', 'Aloo Gobi Fry', 'Steamed Rice', 'Tomato Rasam', 'Curd & Andhra Gongura Pickle'],
      time: '12:30 PM - 2:30 PM'
    },
    snacks: {
      items: ['Ginger Tea / Filter Coffee', 'Mysore Bonda with Chutney'],
      time: '5:30 PM - 6:30 PM'
    },
    dinner: {
      items: ['Hot Chapatis', 'Paneer Butter Masala', 'Steamed Rice', 'Dal Tadka', 'Papad', 'Buttermilk'],
      time: '7:30 PM - 10:00 PM'
    }
  },
  tuesday: {
    name: 'Tuesday',
    specialTag: 'Nutritious & Homely',
    specialColor: '#059669',
    breakfast: {
      items: ['Puri with Potato Aloo Masala', 'Bombay Chutney', 'Tea / Coffee'],
      time: '7:30 AM - 9:30 AM'
    },
    lunch: {
      items: ['Phulkas', 'Methi Dal', 'Bhindi Masala Fry', 'Steamed Rice', 'Garlic Rasam', 'Curd & Lemon Pickle'],
      time: '12:30 PM - 2:30 PM'
    },
    snacks: {
      items: ['Masala Chai', 'Hot Veg Samosa & Green Chutney'],
      time: '5:30 PM - 6:30 PM'
    },
    dinner: {
      items: ['Hot Chapatis', 'Rajma Masala / Dal Makhani', 'Steamed Sona Masoori Rice', 'Salad', 'Curd'],
      time: '7:30 PM - 10:00 PM'
    }
  },
  wednesday: {
    name: 'Wednesday',
    specialTag: '🍗 Mid-Week Andhra Special Non-Veg',
    specialColor: '#d97706',
    breakfast: {
      items: ['Ghee Upma & Semiya Khichdi', 'Ginger (Allam) Chutney', 'Palli Chutney', 'Filter Coffee / Tea'],
      time: '7:30 AM - 9:30 AM'
    },
    lunch: {
      items: [
        '🍗 Andhra Style Spicy Chicken Curry',
        '🧀 Kaju Paneer Curry (Veg)',
        'Soft Chapatis',
        'Steamed Rice',
        'Sambar',
        'Curd & Papad'
      ],
      time: '12:30 PM - 2:30 PM'
    },
    snacks: {
      items: ['Irani Chai', 'Mirchi Bajji with Onions & Lemon'],
      time: '5:30 PM - 6:30 PM'
    },
    dinner: {
      items: ['Egg Masala Curry / Paneer Bhurji', 'Hot Chapatis', 'Bagara Rice', 'Dal Fry', 'Curd'],
      time: '7:30 PM - 10:00 PM'
    }
  },
  thursday: {
    name: 'Thursday',
    specialTag: 'Pure Comfort Vegetarian',
    specialColor: '#0284c7',
    breakfast: {
      items: ['Set Dosa with Butter', 'Tomato Peanut Chutney', 'Mixed Veg Sambar', 'Tea / Coffee'],
      time: '7:30 AM - 9:30 AM'
    },
    lunch: {
      items: ['Phulkas', 'Tomato Pappu (Andhra Style)', 'Cabbage Green Peas Poriyal', 'Steamed Rice', 'Pepper Rasam', 'Curd'],
      time: '12:30 PM - 2:30 PM'
    },
    snacks: {
      items: ['Cardamom Tea / Coffee', 'Punugulu with Spicy Chutney'],
      time: '5:30 PM - 6:30 PM'
    },
    dinner: {
      items: ['Hot Chapatis', 'Chole Masala', 'Steamed Rice', 'Yellow Moong Dal', 'Fresh Salad', 'Curd'],
      time: '7:30 PM - 10:00 PM'
    }
  },
  friday: {
    name: 'Friday',
    specialTag: '🍛 Hyderabadi Bagara Rice & Dalcha',
    specialColor: '#8b5cf6',
    breakfast: {
      items: ['Crispy Pesarattu & Upma (MLA Style)', 'Allam (Ginger) Chutney', 'Coconut Chutney', 'Tea / Coffee'],
      time: '7:30 AM - 9:30 AM'
    },
    lunch: {
      items: ['Hyderabadi Bagara Rice', 'Dalcha / Drumstick Sambar', 'Aloo Capsicum Fry', 'Hot Phulkas', 'Curd', 'Papad'],
      time: '12:30 PM - 2:30 PM'
    },
    snacks: {
      items: ['Filter Coffee / Masala Tea', 'Corn Cheese Nuggets / Biscuits'],
      time: '5:30 PM - 6:30 PM'
    },
    dinner: {
      items: ['🍗 Egg Curry / Soya Chunk Curry', 'Hot Chapatis', 'Steamed Rice', 'Dal Tadka', 'Curd'],
      time: '7:30 PM - 10:00 PM'
    }
  },
  saturday: {
    name: 'Saturday',
    specialTag: 'Weekend Eve Special',
    specialColor: '#059669',
    breakfast: {
      items: ['Uttapam with Onion & Green Chilli', 'Palli Chutney', 'Sambar', 'Tea / Coffee'],
      time: '7:30 AM - 9:30 AM'
    },
    lunch: {
      items: ['Soft Chapatis', 'Dosakaya Pappu', 'Paneer Aloo Curry', 'Steamed Rice', 'Rasam', 'Curd & Mango Pickle'],
      time: '12:30 PM - 2:30 PM'
    },
    snacks: {
      items: ['Hyderabadi Irani Chai', 'Hot Onion Pakoda & Samosa'],
      time: '5:30 PM - 6:30 PM'
    },
    dinner: {
      items: ['Hot Phulkas', 'Kadhai Veg / Egg Fried Rice', 'Dal Fry', 'Curd', 'Gulab Jamun or Semiya Payasam'],
      time: '7:30 PM - 10:00 PM'
    }
  }
};

export default function HydMessMenu() {
  const [selectedDay, setSelectedDay] = useState('sunday');
  const dayMenu = WEEKLY_MENU[selectedDay];

  return (
    <div className="glass-panel" style={{ padding: '36px 30px', margin: '40px 0' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 32px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
          <span className="badge badge-emerald">
            <Utensils size={13} /> 3-Times Homely Buffet + Evening Tea
          </span>
          <span className="badge badge-rose">
            <Sparkles size={13} /> Sunday Biryani Special
          </span>
        </div>
        <h2 style={{ fontSize: '2.2rem', marginBottom: 12, color: 'var(--text-main)' }}>
          Foreter Mess & <span className="text-gradient">Daily Food Schedule</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
          We serve freshly cooked, authentic South Indian & North Indian buffet meals 3 times a day using 100% RO purified water, premium Sona Masoori rice, and fresh farm veggies. Separate preparation counters for veg and non-veg dishes!
        </p>
      </div>

      {/* Weekday Switcher */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        flexWrap: 'wrap',
        marginBottom: 28,
        padding: '6px',
        background: '#f1f5f9',
        borderRadius: 16,
        maxWidth: 720,
        margin: '0 auto 32px',
      }}>
        {Object.entries(WEEKLY_MENU).map(([dayKey, dayData]) => {
          const isSelected = selectedDay === dayKey;
          return (
            <button
              key={dayKey}
              onClick={() => setSelectedDay(dayKey)}
              style={{
                flex: '1 1 80px',
                padding: '10px 14px',
                borderRadius: 12,
                fontSize: '0.86rem',
                fontWeight: 700,
                textAlign: 'center',
                transition: 'all var(--transition-fast)',
                background: isSelected ? '#ffffff' : 'transparent',
                color: isSelected ? 'var(--primary)' : 'var(--text-muted)',
                boxShadow: isSelected ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                border: isSelected ? '1px solid #cbd5e1' : '1px solid transparent',
              }}
            >
              {dayData.name}
              {dayKey === 'sunday' && (
                <span style={{ display: 'block', fontSize: '0.65rem', color: '#e11d48' }}>🍗 Biryani</span>
              )}
              {dayKey === 'wednesday' && (
                <span style={{ display: 'block', fontSize: '0.65rem', color: '#d97706' }}>🍗 Chicken</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Current Day Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        padding: '14px 20px',
        background: '#f8fafc',
        borderRadius: 14,
        border: '1px solid #e2e8f0',
        marginBottom: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #4f46e5, #0284c7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: 800,
            fontSize: '0.9rem'
          }}>
            {dayMenu.name.substring(0, 2)}
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)' }}>
              {dayMenu.name}'s Menu
            </div>
            <div style={{ fontSize: '0.78rem', color: dayMenu.specialColor, fontWeight: 700 }}>
              {dayMenu.specialTag}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: '0.8rem', color: 'var(--text-dim)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <ShieldCheck size={14} color="#059669" /> 100% Fresh Daily Preparation
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Heart size={14} color="#e11d48" /> Unlimited Servings
          </span>
        </div>
      </div>

      {/* 4 Meals Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 20,
      }}>
        {/* Breakfast */}
        <div style={{
          background: '#ffffff',
          borderRadius: 16,
          border: '1px solid #e2e8f0',
          padding: 22,
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: '#fef3c7',
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sun size={18} />
              </div>
              <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>Breakfast</strong>
            </div>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Clock size={12} /> {dayMenu.breakfast.time}
            </span>
          </div>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, padding: 0 }}>
            {dayMenu.breakfast.items.map((item, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={15} color="#059669" style={{ flexShrink: 0, marginTop: 3 }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Lunch */}
        <div style={{
          background: '#ffffff',
          borderRadius: 16,
          border: selectedDay === 'sunday' ? '2px solid #fda4af' : '1px solid #e2e8f0',
          padding: 22,
          boxShadow: selectedDay === 'sunday' ? '0 4px 16px rgba(225, 29, 72, 0.12)' : '0 2px 8px rgba(0,0,0,0.03)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: '#fee2e2',
                color: '#e11d48',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Utensils size={18} />
              </div>
              <div>
                <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>Lunch (Buffet)</strong>
                {selectedDay === 'sunday' && (
                  <span className="badge badge-rose" style={{ marginLeft: 6, fontSize: '0.62rem' }}>Biryani Special</span>
                )}
              </div>
            </div>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Clock size={12} /> {dayMenu.lunch.time}
            </span>
          </div>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, padding: 0 }}>
            {dayMenu.lunch.items.map((item, idx) => (
              <li key={idx} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 8,
                fontSize: '0.88rem',
                color: item.includes('Biryani') || item.includes('Chicken') ? '#e11d48' : 'var(--text-muted)',
                fontWeight: item.includes('Biryani') || item.includes('Chicken') ? 700 : 500,
              }}>
                <CheckCircle2 size={15} color={item.includes('Biryani') || item.includes('Chicken') ? '#e11d48' : '#059669'} style={{ flexShrink: 0, marginTop: 3 }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Evening Chai & Snacks */}
        <div style={{
          background: '#ffffff',
          borderRadius: 16,
          border: '1px solid #e2e8f0',
          padding: 22,
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: '#fef3c7',
                color: '#b45309',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Coffee size={18} />
              </div>
              <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>Evening Chai & Snacks</strong>
            </div>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Clock size={12} /> {dayMenu.snacks.time}
            </span>
          </div>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, padding: 0 }}>
            {dayMenu.snacks.items.map((item, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={15} color="#059669" style={{ flexShrink: 0, marginTop: 3 }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Dinner */}
        <div style={{
          background: '#ffffff',
          borderRadius: 16,
          border: '1px solid #e2e8f0',
          padding: 22,
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: '#e0e7ff',
                color: '#4338ca',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Moon size={18} />
              </div>
              <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>Dinner (Hot Meals)</strong>
            </div>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Clock size={12} /> {dayMenu.dinner.time}
            </span>
          </div>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, padding: 0 }}>
            {dayMenu.dinner.items.map((item, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={15} color="#059669" style={{ flexShrink: 0, marginTop: 3 }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mess highlights footer */}
      <div style={{
        marginTop: 28,
        padding: '16px 20px',
        background: '#f8fafc',
        borderRadius: 12,
        border: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        fontSize: '0.82rem',
        color: 'var(--text-muted)'
      }}>
        <div>
          🌿 <strong>Dietary Note:</strong> Separate vessels, cooktops & serving ladle sets strictly maintained for pure vegetarian meals.
        </div>
        <div style={{ color: 'var(--primary)', fontWeight: 600 }}>
          Included with all 3-Share and 4-Share room rent plans at Foreter Pg for men!
        </div>
      </div>
    </div>
  );
}
