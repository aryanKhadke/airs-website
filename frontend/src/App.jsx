import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import IntroSequence from './components/IntroSequence';
import TacticalMap from './components/TacticalMap';
import HUDOverlays from './components/HUDOverlays';
import HUDModal from './components/HUDModal';
import { soundEngine } from './utils/audio';

// Base Distinct Strategic Coordinates across the Los Santos Vector Canvas (0-100%)
const BASE_LOCATIONS = [
  {
    id: 'airs_hq',
    sector: 'SEC-01',
    title: 'AIRS HQ',
    subtitle: 'CENTRAL COMMAND & OPS',
    gtaEmoji: '🏛️',
    distance: '0.0 MILES',
    baseMapX: 28,
    baseMapY: 30,
    baseRadarX: 30,
    baseRadarY: 32,
    accentBg: 'bg-[#FF0055]'
  },
  {
    id: 'research_lab',
    sector: 'SEC-02',
    title: 'RESEARCH LAB',
    subtitle: 'QUANTUM & NEURAL CORES',
    gtaEmoji: '🔬',
    distance: '1.4 MILES',
    baseMapX: 52,
    baseMapY: 18,
    baseRadarX: 50,
    baseRadarY: 22,
    accentBg: 'bg-[#9B51E0]'
  },
  {
    id: 'start_mission',
    sector: 'SEC-03',
    title: 'START MISSION',
    subtitle: 'HEIST PREP & BOUNTIES',
    gtaEmoji: '⭐️',
    distance: '2.1 MILES',
    baseMapX: 74,
    baseMapY: 36,
    baseRadarX: 72,
    baseRadarY: 38,
    accentBg: 'bg-[#FFC700]'
  },
  {
    id: 'ai_garage',
    sector: 'SEC-04',
    title: 'AI GARAGE',
    subtitle: 'GPU CLUSTERS & RIG TUNING',
    gtaEmoji: '🏎️',
    distance: '3.3 MILES',
    baseMapX: 82,
    baseMapY: 66,
    baseRadarX: 78,
    baseRadarY: 64,
    accentBg: 'bg-[#FF6B00]'
  },
  {
    id: 'innovation_lab',
    sector: 'SEC-05',
    title: 'INNOVATION LAB',
    subtitle: 'AGENT SANDBOX & SWARMS',
    gtaEmoji: '⚡',
    distance: '2.8 MILES',
    baseMapX: 56,
    baseMapY: 82,
    baseRadarX: 54,
    baseRadarY: 78,
    accentBg: 'bg-[#2ECC71]'
  },
  {
    id: 'home',
    sector: 'SEC-06',
    title: 'HOME',
    subtitle: 'OPERATIVE SAFEHOUSE',
    gtaEmoji: '🏠',
    distance: '0.8 MILES',
    baseMapX: 24,
    baseMapY: 72,
    baseRadarX: 26,
    baseRadarY: 70,
    accentBg: 'bg-[#00E5FF]'
  },
  {
    id: 'about_us',
    sector: 'SEC-07',
    title: 'ABOUT US',
    subtitle: 'SYNDICATE DOSSIER & ROSTER',
    gtaEmoji: '📁',
    distance: '1.9 MILES',
    baseMapX: 42,
    baseMapY: 50,
    baseRadarX: 44,
    baseRadarY: 52,
    accentBg: 'bg-[#34495E]'
  }
];

// Helper to generate distinct randomized coordinate offsets
const generateRandomizedMarkers = (applyJitter = true) => {
  return BASE_LOCATIONS.map(loc => {
    // Generate distinct bounded random jitter between -4% and +4%
    const jitterX = applyJitter ? Math.round((Math.random() * 8 - 4) * 10) / 10 : 0;
    const jitterY = applyJitter ? Math.round((Math.random() * 8 - 4) * 10) / 10 : 0;

    const mapX = Math.min(Math.max(loc.baseMapX + jitterX, 15), 88);
    const mapY = Math.min(Math.max(loc.baseMapY + jitterY, 14), 86);

    // Radar coordinate bounded within circular radar radius (~20-80%)
    const radarJitterX = applyJitter ? Math.round((Math.random() * 4 - 2) * 10) / 10 : 0;
    const radarJitterY = applyJitter ? Math.round((Math.random() * 4 - 2) * 10) / 10 : 0;
    const radarX = Math.min(Math.max(loc.baseRadarX + radarJitterX, 20), 80);
    const radarY = Math.min(Math.max(loc.baseRadarY + radarJitterY, 20), 80);

    return {
      ...loc,
      mapX,
      mapY,
      radarX,
      radarY
    };
  });
};

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeModal, setActiveModal] = useState(null); // 'airs_hq' | 'research_lab' | 'start_mission' | 'ai_garage' | 'innovation_lab' | 'home' | 'about_us' | 'registration' | null
  const [activeMarker, setActiveMarker] = useState('airs_hq');
  const [isMuted, setIsMuted] = useState(false);
  const [mapScale, setMapScale] = useState(0.72); // Default zoomed-out wide FOV (~0.72x)
  const [markers, setMarkers] = useState(() => generateRandomizedMarkers(true));

  const handleSelectMarker = useCallback((markerId) => {
    // Normalize IDs for legacy links
    const normalizedId = 
      markerId === 'mission' ? 'start_mission' :
      markerId === 'about' ? 'about_us' :
      markerId;

    setActiveMarker(normalizedId);
    setActiveModal(normalizedId);
  }, []);

  const handleRandomizeMarkers = useCallback(() => {
    setMarkers(generateRandomizedMarkers(true));
  }, []);

  const handleToggleMute = useCallback(() => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
    return muted;
  }, []);

  const handleZoomChange = useCallback((delta) => {
    soundEngine.playHover();
    setMapScale((prev) => {
      const next = Math.round((prev + delta) * 100) / 100;
      return Math.min(Math.max(next, 0.60), 0.90);
    });
  }, []);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showIntro) {
        if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
          setShowIntro(false);
          soundEngine.playCash();
        }
        return;
      }

      // 1-7 Hotkeys for the 7 Map Waypoints
      if (e.key === '1') handleSelectMarker('airs_hq');
      if (e.key === '2') handleSelectMarker('research_lab');
      if (e.key === '3') handleSelectMarker('start_mission');
      if (e.key === '4') handleSelectMarker('ai_garage');
      if (e.key === '5') handleSelectMarker('innovation_lab');
      if (e.key === '6') handleSelectMarker('home');
      if (e.key === '7') handleSelectMarker('about_us');
      if (e.key === 'r' || e.key === 'R') {
        soundEngine.playCash();
        handleRandomizeMarkers();
      }
      if (e.key === 'm' || e.key === 'M') handleToggleMute();
      if (e.key === '+' || e.key === '=') handleZoomChange(0.06);
      if (e.key === '-' || e.key === '_') handleZoomChange(-0.06);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showIntro, handleSelectMarker, handleToggleMute, handleZoomChange, handleRandomizeMarkers]);

  return (
    <div className="relative w-screen h-[100dvh] min-h-[100dvh] max-h-[100dvh] overflow-hidden bg-[#F4F5F7] text-[#1A1D20] select-none">
      {/* Cinematic Los Santos Intro Sequence */}
      <AnimatePresence>
        {showIntro && (
          <IntroSequence onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {/* Sun-Drenched Vector Campus Map with Wide FOV Scaling (~0.72x) */}
      <TacticalMap
        markers={markers}
        activeMarker={activeMarker}
        onSelectMarker={handleSelectMarker}
        mapScale={mapScale}
      />

      {/* GTA V-Inspired HUD Overlays (Anchored in absolute screen space) */}
      <HUDOverlays
        markers={markers}
        activeMarker={activeMarker}
        onSelectMarker={handleSelectMarker}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        mapScale={mapScale}
        onZoomChange={handleZoomChange}
        onRandomizeMarkers={handleRandomizeMarkers}
      />

      {/* Neubrutalist White HUD Modal */}
      <AnimatePresence>
        {activeModal && (
          <HUDModal
            activeTab={activeModal}
            onClose={() => setActiveModal(null)}
            onSelectTab={(tabId) => {
              handleSelectMarker(tabId);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
