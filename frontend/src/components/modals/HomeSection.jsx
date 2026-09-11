import React from 'react';
import { soundEngine } from '../../utils/audio';

export default function HomeSection({ onNavigate }) {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="neo-box p-5 bg-gradient-to-r from-yellow-50 via-pink-50 to-cyan-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-[#FF0055] text-white font-black text-[10px] px-3 py-1 font-mono uppercase tracking-widest">
          SAFEHOUSE // LEVEL 5 CLEARANCE
        </div>

        <div className="text-[10px] font-mono font-bold text-[#FF0055] uppercase tracking-widest mb-1">
          SECTOR-01 // AIRS DEL PERRO SAFEHOUSE
        </div>
        <h2 className="text-3xl md:text-4xl font-black font-['Bebas_Neue'] text-[#1A1D20] tracking-wide uppercase leading-none">
          AIRS COMMAND // NEURAL HEIST HQ
        </h2>
        <p className="text-gray-700 text-sm mt-2 leading-relaxed font-['Space_Grotesk'] max-w-2xl font-medium">
          Welcome to the Los Santos tactical command of <span className="text-[#FF0055] font-bold">AIRS</span>. 
          We are an elite underground syndicate of student engineers and researchers executing high-stakes AI operations: training multimodal agent swarms, fine-tuning large language models, and hacking distributed compute clusters.
        </p>
      </div>

      {/* Grid Status Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="neo-box p-3.5 bg-white hover:bg-yellow-50 transition-colors">
          <div className="text-[10px] font-mono font-bold text-gray-500">CLUSTER COMPUTE</div>
          <div className="text-2xl font-black font-['Bebas_Neue'] text-[#1A1D20] mt-0.5">4.2 PFLOPS</div>
          <div className="text-[10px] font-mono font-bold text-[#2ECC71] mt-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#2ECC71] inline-block animate-pulse" />
            24 NODES ONLINE
          </div>
        </div>

        <div className="neo-box p-3.5 bg-white hover:bg-yellow-50 transition-colors">
          <div className="text-[10px] font-mono font-bold text-gray-500">CREW SIZE</div>
          <div className="text-2xl font-black font-['Bebas_Neue'] text-[#1A1D20] mt-0.5">540+ OPERATIVES</div>
          <div className="text-[10px] font-mono font-bold text-[#FF0055] mt-1">4 DIVISIONS</div>
        </div>

        <div className="neo-box p-3.5 bg-white hover:bg-yellow-50 transition-colors">
          <div className="text-[10px] font-mono font-bold text-gray-500">HEIST SCORE WINS</div>
          <div className="text-2xl font-black font-['Bebas_Neue'] text-[#1A1D20] mt-0.5">14 TROPHIES</div>
          <div className="text-[10px] font-mono font-bold text-gray-600 mt-1">GLOBAL HACKATHONS</div>
        </div>

        <div className="neo-box p-3.5 bg-white hover:bg-yellow-50 transition-colors">
          <div className="text-[10px] font-mono font-bold text-gray-500">NEXT HEIST</div>
          <div className="text-2xl font-black font-['Bebas_Neue'] text-[#2ECC71] mt-0.5">T-MINUS 14D</div>
          <div className="text-[10px] font-mono font-bold text-gray-600 mt-1">GAUNTLET 2026</div>
        </div>
      </div>

      {/* Sector Navigation Cards */}
      <div className="border-t-2 border-[#1A1D20] pt-4">
        <div className="text-xs font-mono font-bold text-[#1A1D20] uppercase tracking-widest mb-3 flex items-center gap-2">
          <span>SELECT TACTICAL DESTINATION:</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => {
              soundEngine.playSelect();
              onNavigate('mission');
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="neo-btn p-4 bg-white text-left group cursor-pointer"
          >
            <div className="flex items-center justify-between text-[#FF0055]">
              <span className="text-xs font-mono font-bold">SECTOR 02</span>
              <span className="text-xl">⭐️</span>
            </div>
            <div className="text-xl font-black text-[#1A1D20] font-['Bebas_Neue'] group-hover:text-[#FF0055] mt-1">
              THE HEIST BOARD &rarr;
            </div>
            <p className="text-xs text-gray-600 mt-1 font-['Space_Grotesk']">
              Prep boards, roles, tech stack requirements, and massive FLOP bounties.
            </p>
          </button>

          <button
            onClick={() => {
              soundEngine.playSelect();
              onNavigate('about');
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="neo-btn p-4 bg-white text-left group cursor-pointer"
          >
            <div className="flex items-center justify-between text-[#00E5FF]">
              <span className="text-xs font-mono font-bold text-gray-500">SECTOR 03</span>
              <span className="text-xl">📁</span>
            </div>
            <div className="text-xl font-black text-[#1A1D20] font-['Bebas_Neue'] group-hover:text-[#00E5FF] mt-1">
              DOSSIER & CREW INTEL &rarr;
            </div>
            <p className="text-xs text-gray-600 mt-1 font-['Space_Grotesk']">
              Syndicate origins, squad leads, and weapons tooling arsenal.
            </p>
          </button>

          <button
            onClick={() => {
              soundEngine.playSelect();
              onNavigate('registration');
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="neo-btn p-4 bg-yellow-50 text-left group cursor-pointer border-[#1A1D20]"
          >
            <div className="flex items-center justify-between text-[#2ECC71]">
              <span className="text-xs font-mono font-bold text-gray-500">SECTOR 04</span>
              <span className="text-xl">🛡️</span>
            </div>
            <div className="text-xl font-black text-[#1A1D20] font-['Bebas_Neue'] group-hover:text-[#2ECC71] mt-1">
              ENLIST IN CREW &rarr;
            </div>
            <p className="text-xs text-gray-600 mt-1 font-['Space_Grotesk']">
              Enlist as an operative for the 2026 season. Limited squad slots remaining.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
