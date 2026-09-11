import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '../utils/audio';
import HomeSection from './modals/HomeSection';
import MissionSection from './modals/MissionSection';
import AboutSection from './modals/AboutSection';
import RegistrationSection from './modals/RegistrationSection';
import AIRSHQSection from './modals/AIRSHQSection';
import ResearchLabSection from './modals/ResearchLabSection';
import AIGarageSection from './modals/AIGarageSection';
import InnovationLabSection from './modals/InnovationLabSection';

export default function HUDModal({ activeTab, onClose, onSelectTab }) {
  useEffect(() => {
    soundEngine.playModalOpen();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        soundEngine.playModalClose();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Normalized tab id
  const normalizedTab =
    activeTab === 'mission' ? 'start_mission' :
      activeTab === 'about' ? 'about_us' :
        activeTab;

  const tabs = [
    { id: 'airs_hq', label: 'AIRS HQ', code: 'SEC-01', emoji: '🏛️' },
    { id: 'research_lab', label: 'RESEARCH LAB', code: 'SEC-02', emoji: '🔬' },
    { id: 'start_mission', label: 'START MISSION', code: 'SEC-03', emoji: '⭐️' },
    { id: 'ai_garage', label: 'AI GARAGE', code: 'SEC-04', emoji: '🏎️' },
    { id: 'innovation_lab', label: 'INNOVATION LAB', code: 'SEC-05', emoji: '⚡' },
    { id: 'home', label: 'HOME', code: 'SEC-06', emoji: '🏠' },
    { id: 'about_us', label: 'ABOUT US', code: 'SEC-07', emoji: '📁' },
    { id: 'registration', label: 'JOIN CREW', code: 'ENLIST', emoji: '🛡️' },
  ];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#1A1D20]/65 backdrop-blur-xs">
      {/* Backdrop click to dismiss */}
      <div
        className="absolute inset-0"
        onClick={() => {
          soundEngine.playModalClose();
          onClose();
        }}
      />

      {/* Neubrutalist Modal Container */}
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10, transition: { duration: 0.15 } }}
        transition={{ type: "spring", damping: 24, stiffness: 280 }}
        className="relative z-10 w-full max-w-5xl max-h-[92vh] flex flex-col bg-white border-3 border-[#1A1D20] shadow-[8px_8px_0px_#1A1D20] select-none text-[#1A1D20] font-sans"
      >
        {/* Top Header Bar */}
        <div className="px-4 py-2.5 bg-[#1A1D20] text-white flex items-center justify-between border-b-2 border-[#1A1D20]">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-[#FF0055] rounded-full inline-block animate-ping" />
            <div className="flex items-center gap-2">
              <span className="font-['Bebas_Neue'] text-lg tracking-wider text-[#FFC700]">
                AIRS // LOS SANTOS OPERATIONS HUD
              </span>
              <span className="text-[10px] bg-[#00E5FF] text-[#1A1D20] font-mono font-bold px-1.5 py-0.2 rounded-xs hidden sm:inline-block">
                CLEARANCE GRANTED
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playModalClose();
              onClose();
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="px-2.5 py-1 bg-[#FF0055] hover:bg-[#ff1a66] text-white font-mono text-[11px] font-bold tracking-wider uppercase transition-colors cursor-pointer border border-black shadow-[2px_2px_0px_#000]"
          >
            CLOSE [ESC] &times;
          </button>
        </div>

        {/* Neubrutalist Navigation Tabs */}
        <div className="bg-[#F4F5F7] border-b-2 border-[#1A1D20] flex overflow-x-auto text-xs scrollbar-none">
          {tabs.map((tab) => {
            const isActive = normalizedTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundEngine.playSelect();
                  onSelectTab(tab.id);
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className={`px-3.5 py-2.5 border-r border-[#1A1D20] flex items-center gap-1.5 tracking-wider whitespace-nowrap transition-all cursor-pointer font-bold ${isActive
                    ? 'bg-white text-[#FF0055] border-b-2 border-b-white -mb-[2px] shadow-xs'
                    : 'text-[#1A1D20]/75 hover:text-[#1A1D20] hover:bg-white/60'
                  }`}
              >
                <span className="text-base">{tab.emoji}</span>
                <span className="text-[9px] font-mono text-gray-500 font-bold hidden md:inline-block">{tab.code}</span>
                <span className="font-['Bebas_Neue'] text-sm sm:text-base tracking-wide">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(92vh-120px)] bg-white">
          {normalizedTab === 'airs_hq' && <AIRSHQSection onNavigate={onSelectTab} />}
          {normalizedTab === 'research_lab' && <ResearchLabSection onNavigate={onSelectTab} />}
          {normalizedTab === 'start_mission' && <MissionSection onNavigate={onSelectTab} />}
          {normalizedTab === 'ai_garage' && <AIGarageSection onNavigate={onSelectTab} />}
          {normalizedTab === 'innovation_lab' && <InnovationLabSection onNavigate={onSelectTab} />}
          {normalizedTab === 'home' && <HomeSection onNavigate={onSelectTab} />}
          {normalizedTab === 'about_us' && <AboutSection onNavigate={onSelectTab} />}
          {normalizedTab === 'registration' && <RegistrationSection />}
        </div>

        {/* Footer Bar */}
        <div className="px-4 py-2 bg-[#F4F5F7] border-t-2 border-[#1A1D20] flex items-center justify-between text-[11px] font-mono font-bold text-gray-600">
          <div className="flex items-center gap-2">
            <span className="text-[#FF0055]">● GPS ACTIVE</span>
            <span className="hidden sm:inline-block">• LOS SANTOS CAMPUS GRID</span>
          </div>
          <div className="text-[#1A1D20] font-black font-['Bebas_Neue'] text-sm sm:text-base">
            AIRS SYNDICATE • 2026 LOS SANTOS
          </div>
        </div>
      </motion.div>
    </div>
  );
}
