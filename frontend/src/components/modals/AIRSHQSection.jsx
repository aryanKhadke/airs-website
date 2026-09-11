import React from 'react';
import { soundEngine } from '../../utils/audio';

export default function AIRSHQSection({ onNavigate }) {
  const directives = [
    {
      code: "OP-DELTA",
      title: "DISTRIBUTED CLUSTER EXPANSION",
      status: "ACTIVE",
      priority: "CRITICAL",
      description: "Deploying 16x new NVIDIA H100 SXM5 compute nodes across underground safehouses in Del Perro and Pillbox Hill.",
      progress: 78
    },
    {
      code: "OP-SYNAPSE",
      title: "AUTONOMOUS RECON DRONES",
      status: "IN PROGRESS",
      priority: "HIGH",
      description: "Training real-time edge vision transformers for campus telemetry and drone fleet traffic monitoring.",
      progress: 62
    },
    {
      code: "OP-ZERO-DAY",
      title: "PROMPT INJECTION RED-TEAMING",
      status: "STANDBY",
      priority: "ELEVATED",
      description: "Penetration testing external LLM guardrails before the 2026 Gauntlet tournament launch.",
      progress: 45
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="neo-box p-5 bg-gradient-to-r from-red-50 via-amber-50 to-pink-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-[#FF0055] text-white font-black text-[10px] px-3 py-1 font-mono uppercase tracking-widest">
          COMMAND CENTER // SEC-01
        </div>

        <div className="text-[10px] font-mono font-bold text-[#FF0055] uppercase tracking-widest mb-1 flex items-center gap-2">
          <span>🏛️ AIRS HEADQUARTERS</span>
          <span>•</span>
          <span>ROCKFORD HILLS SECTOR</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black font-['Bebas_Neue'] text-[#1A1D20] tracking-wide uppercase leading-none">
          AIRS SYNDICATE // WAR ROOM & OPERATIONS
        </h2>
        <p className="text-gray-700 text-sm mt-2 leading-relaxed font-['Space_Grotesk'] max-w-2xl font-medium">
          The central apex of AIRS intelligence and resource orchestration. From here, syndicate leadership directs GPU allocations, synchronizes distributed model training, and dispatches field squads to competitive hackathons and frontier benchmarks.
        </p>
      </div>

      {/* Real-Time Command Telemetry */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="neo-box p-3.5 bg-white">
          <div className="text-[10px] font-mono font-bold text-gray-500">NETWORK CLEARANCE</div>
          <div className="text-2xl font-black font-['Bebas_Neue'] text-[#FF0055] mt-0.5">LEVEL 5 ALPHA</div>
          <div className="text-[10px] font-mono font-bold text-[#2ECC71] mt-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#2ECC71] inline-block animate-pulse" />
            SECURE VPN MESH
          </div>
        </div>

        <div className="neo-box p-3.5 bg-white">
          <div className="text-[10px] font-mono font-bold text-gray-500">ACTIVE DIRECTIVES</div>
          <div className="text-2xl font-black font-['Bebas_Neue'] text-[#1A1D20] mt-0.5">3 OPERATIONS</div>
          <div className="text-[10px] font-mono font-bold text-[#FFC700] mt-1">2 READY TO DEPLOY</div>
        </div>

        <div className="neo-box p-3.5 bg-white">
          <div className="text-[10px] font-mono font-bold text-gray-500">GLOBAL SQUAD RANK</div>
          <div className="text-2xl font-black font-['Bebas_Neue'] text-[#2ECC71] mt-0.5">#1 IN SAN ANDREAS</div>
          <div className="text-[10px] font-mono font-bold text-gray-600 mt-1">TOP 1% WORLDWIDE</div>
        </div>

        <div className="neo-box p-3.5 bg-white">
          <div className="text-[10px] font-mono font-bold text-gray-500">DEFCON STATUS</div>
          <div className="text-2xl font-black font-['Bebas_Neue'] text-[#00E5FF] mt-0.5">DEFCON 4</div>
          <div className="text-[10px] font-mono font-bold text-[#2ECC71] mt-1">NO INTRUSIONS</div>
        </div>
      </div>

      {/* Active High-Stakes Directives */}
      <div className="border-2 border-[#1A1D20] p-4 bg-white shadow-[4px_4px_0px_#1A1D20]">
        <div className="flex items-center justify-between border-b-2 border-[#1A1D20] pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">📡</span>
            <span className="text-xs font-mono font-black uppercase text-[#1A1D20] tracking-wider">
              TACTICAL DIRECTIVES // PRIORITY QUEUE
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold bg-[#1A1D20] text-white px-2 py-0.5">
            LIVE SYNC
          </span>
        </div>

        <div className="space-y-3">
          {directives.map((dir, i) => (
            <div key={i} className="p-3 bg-[#F4F5F7] border border-[#1A1D20] hover:bg-yellow-50 transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 bg-[#FF0055] text-white text-[9px] font-mono font-black">
                    {dir.code}
                  </span>
                  <span className="font-['Bebas_Neue'] text-lg text-[#1A1D20] tracking-wide">
                    {dir.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold text-gray-500">
                    PRIORITY: <span className="text-[#FF0055] font-black">{dir.priority}</span>
                  </span>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-[#2ECC71] text-white">
                    {dir.status}
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-700 font-['Space_Grotesk'] mb-2 font-medium">
                {dir.description}
              </p>

              {/* Progress Bar */}
              <div className="flex items-center gap-2 text-[10px] font-mono">
                <div className="flex-1 h-2 bg-gray-200 border border-[#1A1D20] overflow-hidden">
                  <div 
                    className="h-full bg-[#FF0055] transition-all"
                    style={{ width: `${dir.progress}%` }}
                  />
                </div>
                <span className="font-bold text-[#1A1D20]">{dir.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-wrap gap-2 pt-2 border-t-2 border-[#1A1D20]">
        <button
          onClick={() => {
            soundEngine.playSelect();
            if (onNavigate) onNavigate('start_mission');
          }}
          className="neo-btn px-4 py-2 bg-[#FFC700] hover:bg-yellow-400 text-xs font-mono font-bold cursor-pointer flex items-center gap-1.5"
        >
          <span>⭐️</span>
          <span>VIEW ACTIVE HEIST MISSIONS &rarr;</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playSelect();
            if (onNavigate) onNavigate('research_lab');
          }}
          className="neo-btn px-4 py-2 bg-white hover:bg-gray-100 text-xs font-mono font-bold cursor-pointer flex items-center gap-1.5"
        >
          <span>🔬</span>
          <span>INSPECT RESEARCH LAB INTEL &rarr;</span>
        </button>
      </div>
    </div>
  );
}
