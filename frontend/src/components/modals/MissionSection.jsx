import React from 'react';
import { soundEngine } from '../../utils/audio';

export default function MissionSection() {
  const heists = [
    {
      id: "HEIST-01",
      title: "THE AGENTIC GAUNTLET",
      subtitle: "36-Hour Extreme Hackathon",
      payout: "$2,500,000 FLOP",
      roles: [
        { role: "The Hacker", desc: "Model Fine-tuner & Quantization (LoRA / DPO)" },
        { role: "The Architect", desc: "Agent Swarm Orchestrator (LangGraph / Tool calling)" },
        { role: "The Driver", desc: "Real-time High-Throughput UI & Streaming API" }
      ],
      prereqs: ["Python 3.11", "Docker", "PyTorch 2.4", "vLLM", "Vector DBs"],
      pinColor: "bg-[#FF0055]",
      tapeColor: "bg-[#FFC700]"
    },
    {
      id: "HEIST-02",
      title: "THE CUDA CRACKDOWN",
      subtitle: "Low-Level Kernel Optimization Workshop",
      payout: "$1,200,000 FLOP",
      roles: [
        { role: "Kernel Dev", desc: "C++ & Triton GPU Custom Memory Operators" },
        { role: "Benchmark Lead", desc: "NVIDIA Nsight Tensor Core Performance Profiling" }
      ],
      prereqs: ["C++", "Triton", "PyTorch C++ API", "CUDA 12.4"],
      pinColor: "bg-[#00E5FF]",
      tapeColor: "bg-[#2ECC71]"
    },
    {
      id: "HEIST-03",
      title: "OPERATION JAILBREAK",
      subtitle: "Red-Teaming & Frontier Alignment Gauntlet",
      payout: "$850,000 FLOP",
      roles: [
        { role: "The Adversary", desc: "Prompt Injection & Safety Boundary Testing" },
        { role: "The Shield", desc: "NeMo Guardrails & Real-time Sanitization Pipeline" }
      ],
      prereqs: ["Python", "Hugging Face", "LlamaGuard", "Adversarial Prompts"],
      pinColor: "bg-[#2ECC71]",
      tapeColor: "bg-[#FF0055]"
    }
  ];

  return (
    <div className="space-y-6">
      {/* GTA V Heist Prep Board Title */}
      <div className="neo-box p-4 bg-[#1A1D20] text-white flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">⭐️</span>
            <span className="text-[10px] font-mono text-[#FFC700] uppercase tracking-widest font-bold">
              HEIST PLANNING BOARD // THE BIG SCORE
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-black font-['Bebas_Neue'] text-white uppercase tracking-wider mt-0.5">
            CHOOSE YOUR OPERATION & PREPARE THE SQUAD
          </h3>
        </div>

        <div className="bg-white/10 px-3 py-1.5 border border-white/20 text-right">
          <div className="text-[9px] font-mono text-gray-400">TOTAL BOUNTY POOL</div>
          <div className="text-2xl font-black font-['Bebas_Neue'] text-[#2ECC71] leading-none">
            $4,550,000 FLOP
          </div>
        </div>
      </div>

      {/* Heist Cards (Styled like pinned tactical prep sheets on a board) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {heists.map((heist) => (
          <div
            key={heist.id}
            onMouseEnter={() => soundEngine.playHover()}
            className="neo-box p-4 bg-[#FFFFFF] relative flex flex-col justify-between hover:-translate-y-1 transition-transform group"
          >
            {/* Top Tape Graphic */}
            <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 ${heist.tapeColor} border border-[#1A1D20] opacity-90 rotate-[-2deg] shadow-xs`} />

            <div>
              {/* Heist Identifier & Payout */}
              <div className="flex justify-between items-start pt-2 border-b-2 border-gray-100 pb-2">
                <span className="text-[10px] font-mono font-black text-[#FF0055] tracking-widest">
                  {heist.id}
                </span>
                <span className="text-lg font-black font-['Bebas_Neue'] text-[#2ECC71] drop-shadow-xs">
                  {heist.payout}
                </span>
              </div>

              {/* Heist Title */}
              <div className="text-xl font-black font-['Bebas_Neue'] text-[#1A1D20] uppercase mt-2 tracking-wide">
                {heist.title}
              </div>
              <p className="text-xs text-gray-600 font-['Space_Grotesk'] font-medium mb-3">
                {heist.subtitle}
              </p>

              {/* Roles Section */}
              <div className="space-y-2 mb-3">
                <div className="text-[10px] font-mono font-bold text-gray-500 uppercase">
                  REQUIRED CREW ROLES:
                </div>
                {heist.roles.map((r, i) => (
                  <div key={i} className="p-1.5 bg-gray-50 border border-gray-200 text-left">
                    <div className="text-xs font-bold text-[#1A1D20] font-['Space_Grotesk']">
                      🎯 {r.role}
                    </div>
                    <div className="text-[10px] text-gray-600 font-sans mt-0.5">
                      {r.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prerequisites & Launch Button */}
            <div>
              <div className="text-[10px] font-mono font-bold text-gray-500 uppercase mb-1">
                TECH PREREQUISITES:
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {heist.prereqs.map((prereq, idx) => (
                  <span
                    key={idx}
                    className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-gray-100 border border-gray-300 text-gray-700"
                  >
                    {prereq}
                  </span>
                ))}
              </div>

              <button
                onClick={() => soundEngine.playSelect()}
                className="w-full py-2 bg-[#1A1D20] hover:bg-[#FF0055] text-white font-['Bebas_Neue'] text-base tracking-wider uppercase transition-colors cursor-pointer shadow-[2px_2px_0px_#1A1D20]"
              >
                SELECT HEIST & LOCK CREW &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Heist Rules of Engagement */}
      <div className="neo-box p-4 bg-yellow-50 border-2 border-[#1A1D20]">
        <div className="text-xs font-mono font-bold text-[#1A1D20] uppercase tracking-wider mb-1 flex items-center gap-2">
          <span>⚠️ HEIST CODE OF CONDUCT:</span>
        </div>
        <p className="text-xs text-gray-700 font-['Space_Grotesk'] leading-relaxed">
          Zero vaporware. Every operation requires a deployed, working endpoint before the clock runs out. All compute keys, cluster nodes, and datasets are provisioned at the start of the prep phase.
        </p>
      </div>
    </div>
  );
}
