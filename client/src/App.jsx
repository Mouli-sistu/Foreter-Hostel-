import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import FacilitiesGrid from './components/FacilitiesGrid';
import PricingRooms from './components/PricingRooms';
import ResidentDashboard from './pages/ResidentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import HydMessMenu from './components/HydMessMenu';
import AuthModal from './components/AuthModal';

function MainApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [authModalMode, setAuthModalMode] = useState(null); // 'login' | 'register' | null
  const { user } = useAuth();

  const handleOpenAuth = (mode = 'login') => {
    setAuthModalMode(mode);
  };

  const handleCloseAuth = () => {
    setAuthModalMode(null);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      {/* Main Navigation - Positioned Cleanly At The Top */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={handleOpenAuth}
      />

      {/* Dynamic Tab Body */}
      <main style={{ flex: 1 }}>
        {activeTab === 'home' && (
          <LandingPage
            setActiveTab={setActiveTab}
            onOpenAuth={handleOpenAuth}
          />
        )}

        {activeTab === 'mess' && (
          <div className="container" style={{ padding: '20px 0 60px' }}>
            <HydMessMenu />
          </div>
        )}

        {activeTab === 'facilities' && (
          <div style={{ padding: '20px 0 60px' }}>
            <FacilitiesGrid />
          </div>
        )}

        {activeTab === 'rooms' && (
          <div style={{ padding: '20px 0 60px' }}>
            <PricingRooms onOpenAuth={handleOpenAuth} />
          </div>
        )}

        {activeTab === 'resident' && (
          <ResidentDashboard onOpenAuth={handleOpenAuth} />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard onOpenAuth={handleOpenAuth} />
        )}
      </main>

      {/* Auth Modal (Login / Register) */}
      {authModalMode && (
        <AuthModal
          initialMode={authModalMode}
          onClose={handleCloseAuth}
          onSuccess={(loggedUser) => {
            if (loggedUser.role === 'admin') {
              setActiveTab('admin');
            } else {
              setActiveTab('resident');
            }
          }}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
