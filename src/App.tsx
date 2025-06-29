import React, { useState } from 'react';
import './App.css';
import { FPLogo } from './components/FPLogo';
import { LoadingScreen } from './components/LoadingScreen';
import { CustomDropModal } from './components/CustomDropModal';
import { UndergroundTunnel } from './components/UndergroundTunnel';
import { DegenVaultTunnel } from './components/DegenVaultTunnel';
import { WeaponsPage } from './components/WeaponsPage';
import { DegenVault } from './components/DegenVault';
import { trackEvent } from './utils/analytics';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCustomDropModalOpen, setIsCustomDropModalOpen] = useState(false);
  const [showTunnel, setShowTunnel] = useState(false);
  const [showDegenTunnel, setShowDegenTunnel] = useState(false);
  const [showWeaponsPage, setShowWeaponsPage] = useState(false);
  const [showDegenVault, setShowDegenVault] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleCustomDropClick = () => {
    setIsCustomDropModalOpen(true);
  };

  const handleCloseCustomDropModal = () => {
    setIsCustomDropModalOpen(false);
  };

  const handleExploreToolsClick = () => {
    // Track "Explore Tools" button click silently
    trackEvent('Explore Tools Clicked');
    setShowTunnel(true);
  };

  const handleTunnelComplete = () => {
    setShowTunnel(false);
    setShowWeaponsPage(true);
  };

  const handleBackToHome = () => {
    setShowWeaponsPage(false);
    setShowDegenVault(false);
    setShowDegenTunnel(false);
  };

  const handleEnterDegenVault = () => {
    // Track Degen Vault entry silently
    trackEvent('Degen Vault Entered');
    setShowWeaponsPage(false);
    setShowDegenTunnel(true);
  };

  const handleDegenTunnelComplete = () => {
    setShowDegenTunnel(false);
    setShowDegenVault(true);
  };

  const handleBackToWeapons = () => {
    setShowDegenVault(false);
    setShowDegenTunnel(false);
    setShowWeaponsPage(true);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  if (showTunnel) {
    return <UndergroundTunnel onTunnelComplete={handleTunnelComplete} />;
  }

  if (showDegenTunnel) {
    return <DegenVaultTunnel onTunnelComplete={handleDegenTunnelComplete} />;
  }

  if (showDegenVault) {
    return <DegenVault onBackToWeapons={handleBackToWeapons} />;
  }

  if (showWeaponsPage) {
    return <WeaponsPage onBackToHome={handleBackToHome} onEnterDegenVault={handleEnterDegenVault} />;
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* FP Logo Watermark - Fixed Background */}
      <div className="fixed inset-0 z-[15] flex items-center justify-center pointer-events-none">
        <div className="transform scale-[3] sm:scale-[4] lg:scale-[5] opacity-20">
          <FPLogo size="xl" className="animate-pulse" />
        </div>
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20 z-[1]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 z-10">
        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Logo and Title */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <FPLogo size="xl" className="flex-shrink-0" />
            <h1 className="fireprint-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-green-500">
              FIREPRINT
            </h1>
          </div>

          {/* New Subtitle with Fire Emoji */}
          <p className="crypto-subtitle text-lg sm:text-xl md:text-2xl text-green-500 mb-4 max-w-2xl mx-auto">
            🔥Blacksite utility drops for founders, nomads & degens
          </p>

          {/* Second Line */}
          <p className="underground-text text-base sm:text-lg md:text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
            Crypto-native. Delivered manually. No KYC.
          </p>

          {/* Main Tagline - Orange */}
          <p className="underground-text text-base sm:text-lg md:text-xl text-orange-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            No fluff. Just fire.
          </p>

          {/* CTA Buttons with Military Effects */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={handleExploreToolsClick}
              className="military-button-primary group relative overflow-hidden bg-green-600 hover:bg-green-700 text-black px-8 py-4 text-lg font-bold transition-all duration-200 border-2 border-green-500 hover:border-green-400 active:scale-95 active:shadow-inner"
            >
              {/* Button Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-green-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-green-400/20 opacity-0 group-active:opacity-100 transition-opacity duration-100"></div>
              
              {/* Emoji with Glow Effect */}
              <span className="relative z-10 inline-flex items-center gap-2">
                <span className="text-xl group-hover:animate-pulse group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.8)] transition-all duration-200">🗡️</span>
                <span className="tracking-wider">EXPLORE TOOLS</span>
              </span>
              
              {/* Click Ripple Effect */}
              <div className="absolute inset-0 opacity-0 group-active:opacity-100 bg-white/20 animate-ping"></div>
            </button>
            
            <button 
              onClick={handleCustomDropClick}
              className="military-button-secondary group relative overflow-hidden bg-transparent hover:bg-gray-900/50 text-green-500 px-8 py-4 text-lg font-bold transition-all duration-200 border-2 border-green-500 hover:border-green-400 active:scale-95 hover:shadow-lg hover:shadow-green-500/25"
            >
              {/* Button Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-red-800/20 to-red-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-red-500/10 opacity-0 group-active:opacity-100 transition-opacity duration-100"></div>
              
              {/* Emoji with Blood Glow Effect */}
              <span className="relative z-10 inline-flex items-center gap-2">
                <span className="text-xl group-hover:animate-pulse group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] transition-all duration-200">🩸</span>
                <span className="tracking-wider">REQUEST CUSTOM DROP</span>
              </span>
              
              {/* Click Ripple Effect */}
              <div className="absolute inset-0 opacity-0 group-active:opacity-100 bg-red-500/20 animate-ping"></div>
            </button>
          </div>
        </div>

        {/* Ambient Effects */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-green-500/3 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      </section>

      {/* Custom Drop Modal */}
      <CustomDropModal 
        isOpen={isCustomDropModalOpen} 
        onClose={handleCloseCustomDropModal} 
      />
    </div>
  );
}

export default App;