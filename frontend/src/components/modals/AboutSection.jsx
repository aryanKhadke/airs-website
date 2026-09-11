import React from 'react';
import { soundEngine } from '../../utils/audio';

export default function AboutSection() {
  const divisions = [
    {
      id: "WING-01",
      name: "Autonomous Agents & LLM Reasoning",
      lead: "Lead: Advait V. // Architecture",
      focus: "Agent swarms, tool orchestration, RLHF/DPO alignments, self-correcting logic."
    },
    {
      id: "WING-02",
      name: "Computer Vision & Spatial Intelligence",
      lead: "Lead: Sarah K. // Perception",
      focus: "Real-time edge detection, multi-camera tracking, 3D Gaussian splatting."
    },
    {
      id: "WING-03",
      name: "Distributed Compute & High-Perf MLOps",
      lead: "Lead: Rohan M. // Bare Metal",
      focus: "Bare-metal GPU rigs, vLLM inference serving, model quantization, low-latency APIs."
    },
    {
      id: "WING-04",
      name: "Synthetic Data & Frontier Robotics",
      lead: "Lead: Maya T. // Embodied AI",
      focus: "Simulation-to-real transfer, robot manipulation policy learning, dataset curation."
    }
  ];

  const weaponsStack = [
    "PyTorch", "CUDA 12", "vLLM", "Triton", "HuggingFace", "LangGraph", "Docker", "Ray", "Weights & Biases", "Qdrant"
  ];

  return (
    <div className="space-y-6">
      {/* Overview Dossier Card */}
      <div className="neo-box p-5 bg-gradient-to-r from-blue-50 to-white">
        <div className="text-[10px] font-mono font-bold text-[#FF0055] uppercase tracking-widest">
          CLASSIFIED DOSSIER // LOS SANTOS CHAPTER
        </div>
        <h3 className="text-3xl font-black font-['Bebas_Neue'] text-[#1A1D20] uppercase mt-1">
          BORN IN SERVER ROOMS, TESTED AT 03:00 AM
        </h3>
        <p className="text-gray-700 text-sm mt-2 font-['Space_Grotesk'] leading-relaxed font-medium">
          <span className="text-[#FF0055] font-bold">AIRS</span> (Artificial Intelligence & Research Syndicate) was built by student engineers who refused to sit through passive slideshows while the generative AI revolution reshaped the world.
          We function like a tactical strike crew: specialized divisions, shared dedicated GPU compute nodes, aggressive internal peer reviews, and an obsession with shipping models that actually run in the wild.
        </p>
      </div>

      {/* Divisions Roster */}
      <div>
        <div className="text-xs font-mono font-bold text-[#1A1D20] uppercase tracking-widest mb-3 flex items-center gap-2">
          <span className="text-base">📁</span>
          <span>SPECIALIZED TACTICAL DIVISIONS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {divisions.map((div, i) => (
            <div
              key={i}
              onMouseEnter={() => soundEngine.playHover()}
              className="neo-box p-4 bg-white hover:bg-yellow-50 transition-colors"
            >
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#FF0055]">
                <span>{div.id}</span>
                <span className="text-gray-600">{div.lead}</span>
              </div>
              <div className="text-lg font-black text-[#1A1D20] font-['Bebas_Neue'] tracking-wide mt-1">
                {div.name}
              </div>
              <p className="text-xs text-gray-600 mt-1 font-['Space_Grotesk']">
                {div.focus}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Arsenal */}
      <div className="neo-box p-4 bg-white">
        <div className="text-xs font-mono font-bold text-[#1A1D20] uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>VERIFIED WEAPONRY & TOOLS</span>
          <span className="text-[#2ECC71] text-[10px] font-mono">100% PRODUCTION-GRADE</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {weaponsStack.map((tech, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 bg-gray-100 border border-[#1A1D20] text-xs font-mono font-bold text-[#1A1D20] shadow-[2px_2px_0px_#1A1D20]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Quote */}
      <div className="border-l-4 border-[#FF0055] pl-4 py-1 text-sm text-gray-700 font-['Space_Grotesk'] italic font-medium">
        "Code talks, hype walks. We measure an engineer by what they run in production, not what they repost on social feeds."
      </div>
    </div>
  );
}
