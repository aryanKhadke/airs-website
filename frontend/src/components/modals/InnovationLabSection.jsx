import React, { useState } from 'react';
import { soundEngine } from '../../utils/audio';

export default function InnovationLabSection({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('swarms');

  const prototypes = [
    {
      id: "PROTO-01",
      title: "PROJECT SENTINEL // AUTONOMOUS HACKER SWARM",
      category: "MULTI-AGENT SWARMS",
      desc: "A cooperative network of 12 localized LLM agents performing continuous code analysis, repo exploration, and autonomous pull requests.",
      tech: ["LangGraph", "Docker Sandboxes", "Claude 3.7 Sonnet API", "Llama 3 8B Local"],
      status: "LIVE SANDBOX",
      badgeColor: "bg-[#2ECC71]"
    },
    {
      id: "PROTO-02",
      title: "NEXUS-VISION // 60 FPS EMBODIED TELEMETRY",
      category: "ROBOTICS & PERCEPTION",
      desc: "Edge-quantized vision-language-action (VLA) pipeline driving autonomous RC rovers across obstacle courses in Terminal Port.",
      tech: ["YOLO-World", "Jetson Orin Nano", "ROS2 Humble", "FastAPI"],
      status: "FIELD TESTING",
      badgeColor: "bg-[#00E5FF]"
    },
    {
      id: "PROTO-03",
      title: "VOICE-CIPHER // GTA CITIZEN SYNTHESIZER",
      category: "AUDIO & GENERATIVE AI",
      desc: "Ultra-low-latency neural audio engine generating real-time dynamic radio stations and police dispatch chatter from live campus events.",
      tech: ["XTTS v2", "Whisper Large v3", "Web Audio API", "Rust"],
      status: "EXPERIMENTAL",
      badgeColor: "bg-[#FFC700]"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="neo-box p-5 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-[#2ECC71] text-white font-black text-[10px] px-3 py-1 font-mono uppercase tracking-widest">
          SANDBOX INCUBATOR // SEC-05
        </div>

        <div className="text-[10px] font-mono font-bold text-[#2ECC71] uppercase tracking-widest mb-1 flex items-center gap-2">
          <span>⚡ INNOVATION LAB</span>
          <span>•</span>
          <span>TERMINAL PORT TECH DOCKS</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black font-['Bebas_Neue'] text-[#1A1D20] tracking-wide uppercase leading-none">
          AUTONOMOUS AGENT INCUBATOR & RAPID PROTOTYPING
        </h2>
        <p className="text-gray-700 text-sm mt-2 leading-relaxed font-['Space_Grotesk'] max-w-2xl font-medium">
          Located inside converted shipping containers at the Port of Los Santos, the Innovation Lab is the crucible where radical student experiments evolve into production-grade autonomous systems and winning hackathon entries.
        </p>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="neo-box p-3.5 bg-white">
          <div className="text-[10px] font-mono font-bold text-gray-500">ACTIVE PROTOTYPES</div>
          <div className="text-2xl font-black font-['Bebas_Neue'] text-[#2ECC71] mt-0.5">8 EXPERIMENTS</div>
          <div className="text-[10px] font-mono font-bold text-gray-600 mt-1">4 IN ACCELERATION</div>
        </div>

        <div className="neo-box p-3.5 bg-white">
          <div className="text-[10px] font-mono font-bold text-gray-500">INCUBATOR GRANT</div>
          <div className="text-2xl font-black font-['Bebas_Neue'] text-[#FFC700] mt-0.5">$250K SEED</div>
          <div className="text-[10px] font-mono font-bold text-[#2ECC71] mt-1">EQUITY-FREE</div>
        </div>

        <div className="neo-box p-3.5 bg-white">
          <div className="text-[10px] font-mono font-bold text-gray-500">SANDBOX SAFETY</div>
          <div className="text-2xl font-black font-['Bebas_Neue'] text-[#00E5FF] mt-0.5">AIR-GAPPED</div>
          <div className="text-[10px] font-mono font-bold text-gray-600 mt-1">VIRTUALIZED CONTAINERS</div>
        </div>

        <div className="neo-box p-3.5 bg-white">
          <div className="text-[10px] font-mono font-bold text-gray-500">NEXT DEMO DAY</div>
          <div className="text-2xl font-black font-['Bebas_Neue'] text-[#FF0055] mt-0.5">FRIDAY 18:00</div>
          <div className="text-[10px] font-mono font-bold text-gray-600 mt-1">LIVE STREAMED</div>
        </div>
      </div>

      {/* Prototype Showcase */}
      <div className="border-2 border-[#1A1D20] p-4 bg-white shadow-[4px_4px_0px_#1A1D20]">
        <div className="flex items-center justify-between border-b-2 border-[#1A1D20] pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">🧪</span>
            <span className="text-xs font-mono font-black uppercase text-[#1A1D20] tracking-wider">
              EXPERIMENTAL PROTOTYPE INCUBATOR
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold bg-[#2ECC71] text-white px-2 py-0.5">
            SPRING COHORT
          </span>
        </div>

        <div className="space-y-3">
          {prototypes.map((proto) => (
            <div 
              key={proto.id}
              className="p-3.5 bg-[#F4F5F7] border border-[#1A1D20] hover:bg-emerald-50/50 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-1 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-black px-1.5 py-0.5 bg-[#1A1D20] text-white">
                    {proto.id}
                  </span>
                  <span className="font-['Bebas_Neue'] text-lg text-[#1A1D20] tracking-wide">
                    {proto.title}
                  </span>
                </div>
                <span className={`text-[9px] font-mono font-bold px-2 py-0.5 text-white ${proto.badgeColor}`}>
                  {proto.status}
                </span>
              </div>

              <p className="text-xs text-gray-700 font-['Space_Grotesk'] mb-2.5 font-medium leading-relaxed">
                {proto.desc}
              </p>

              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-mono font-bold text-gray-500 mr-1">STACK:</span>
                {proto.tech.map((t, idx) => (
                  <span key={idx} className="text-[9px] font-mono font-bold bg-white border border-gray-300 px-1.5 py-0.5 text-[#1A1D20]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Nav */}
      <div className="flex flex-wrap gap-2 pt-2 border-t-2 border-[#1A1D20]">
        <button
          onClick={() => {
            soundEngine.playSelect();
            if (onNavigate) onNavigate('home');
          }}
          className="neo-btn px-4 py-2 bg-[#00E5FF] hover:bg-cyan-400 text-[#1A1D20] text-xs font-mono font-bold cursor-pointer flex items-center gap-1.5"
        >
          <span>🏠</span>
          <span>RETURN TO HOME SAFEHOUSE &rarr;</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playSelect();
            if (onNavigate) onNavigate('registration');
          }}
          className="neo-btn px-4 py-2 bg-[#FFC700] hover:bg-yellow-400 text-[#1A1D20] text-xs font-mono font-bold cursor-pointer flex items-center gap-1.5"
        >
          <span>🛡️</span>
          <span>ENLIST TO JOIN INNOVATION SQUAD &rarr;</span>
        </button>
      </div>
    </div>
  );
}
