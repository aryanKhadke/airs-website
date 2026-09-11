import React from 'react';
import { soundEngine } from '../../utils/audio';

export default function ResearchLabSection({ onNavigate }) {
  const papers = [
    {
      title: "TITAN-SWARM: Decentralized Multi-Agent Consensus at 100K Tokens/sec",
      authors: "Advait V., Sarah K., AIRS Frontier Team",
      conference: "NeurIPS 2026 Spotlight",
      tag: "BENCHMARK",
      color: "bg-[#9B51E0]"
    },
    {
      title: "FlashTriton: Zero-Copy Sparse Attention for Distributed Edge GPUs",
      authors: "Rohan M., Marcus 'Byte' C.",
      conference: "ICLR 2026 Oral",
      tag: "CUDA / KERNELS",
      color: "bg-[#00E5FF]"
    },
    {
      title: "StealthGuard: Adversarial Defense Against Jailbreaks in Multimodal RAG",
      authors: "Maya T., AIRS Safety Cell",
      conference: "ACL 2026",
      tag: "ALIGNMENT",
      color: "bg-[#2ECC71]"
    }
  ];

  const benchmarks = [
    { model: "AIRS-Llama3-70B-Heist", score: "89.4% MMLU-Pro", speed: "142 tok/s", rank: "#1 Open Weights" },
    { model: "AIRS-Vision-Swin-Edge", score: "94.2% COCO mAP", speed: "60 FPS", rank: "#1 Real-time Edge" },
    { model: "Titan-Reason-DeepSeek", score: "92.8% MATH-500", speed: "118 tok/s", rank: "#2 SOTA Math" }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="neo-box p-5 bg-gradient-to-r from-purple-50 via-indigo-50 to-pink-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-[#9B51E0] text-white font-black text-[10px] px-3 py-1 font-mono uppercase tracking-widest">
          FRONTIER LAB // SEC-02
        </div>

        <div className="text-[10px] font-mono font-bold text-[#9B51E0] uppercase tracking-widest mb-1 flex items-center gap-2">
          <span>🔬 NEURAL & QUANTUM LABS</span>
          <span>•</span>
          <span>VINEWOOD OBSERVATORY</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black font-['Bebas_Neue'] text-[#1A1D20] tracking-wide uppercase leading-none">
          FRONTIER AI RESEARCH & EXPERIMENTAL ARCHITECTURES
        </h2>
        <p className="text-gray-700 text-sm mt-2 leading-relaxed font-['Space_Grotesk'] max-w-2xl font-medium">
          Perched high above Los Santos at the Galileo Observatory, the AIRS Research Lab pioneers breakthroughs in autonomous reasoning, quantized inference kernels, and multimodal sensor fusion.
        </p>
      </div>

      {/* Model Benchmark Leaderboard */}
      <div className="border-2 border-[#1A1D20] p-4 bg-white shadow-[4px_4px_0px_#1A1D20]">
        <div className="flex items-center justify-between border-b-2 border-[#1A1D20] pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚡</span>
            <span className="text-xs font-mono font-black uppercase text-[#1A1D20] tracking-wider">
              FRONTIER MODEL BENCHMARKS (VLLM / TENSORRT-LLM)
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold text-[#9B51E0]">
            UPDATED HOURLY
          </span>
        </div>

        <div className="space-y-2">
          {benchmarks.map((bm, i) => (
            <div key={i} className="p-3 bg-[#F4F5F7] border border-[#1A1D20] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="font-['Space_Grotesk'] font-bold text-sm text-[#1A1D20]">
                  {bm.model}
                </div>
                <div className="text-[11px] font-mono text-gray-500">
                  THROUGHPUT: <span className="font-bold text-[#2ECC71]">{bm.speed}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-white border border-[#1A1D20] text-xs font-mono font-black text-[#9B51E0]">
                  {bm.score}
                </span>
                <span className="px-2 py-1 bg-[#1A1D20] text-white text-[10px] font-mono font-bold">
                  {bm.rank}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Publications Grid */}
      <div className="border-2 border-[#1A1D20] p-4 bg-white shadow-[4px_4px_0px_#1A1D20]">
        <div className="flex items-center justify-between border-b-2 border-[#1A1D20] pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">📜</span>
            <span className="text-xs font-mono font-black uppercase text-[#1A1D20] tracking-wider">
              FEATURED PAPERS & WHITE PAPERS
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold text-[#2ECC71]">
            PEER REVIEWED
          </span>
        </div>

        <div className="space-y-3">
          {papers.map((p, i) => (
            <div key={i} className="p-3 bg-[#F4F5F7] border border-[#1A1D20] hover:bg-purple-50 transition-colors">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className={`text-[9px] font-mono font-black text-white px-2 py-0.5 ${p.color}`}>
                  {p.tag}
                </span>
                <span className="text-[10px] font-mono font-bold text-[#9B51E0]">
                  {p.conference}
                </span>
              </div>

              <h4 className="font-['Space_Grotesk'] font-bold text-sm text-[#1A1D20] leading-snug">
                {p.title}
              </h4>

              <div className="text-[11px] text-gray-600 font-mono mt-1">
                AUTHORS: {p.authors}
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
            if (onNavigate) onNavigate('ai_garage');
          }}
          className="neo-btn px-4 py-2 bg-[#FF6B00] hover:bg-orange-500 text-white text-xs font-mono font-bold cursor-pointer flex items-center gap-1.5"
        >
          <span>🏎️</span>
          <span>VISIT AI RIGS GARAGE &rarr;</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playSelect();
            if (onNavigate) onNavigate('innovation_lab');
          }}
          className="neo-btn px-4 py-2 bg-[#2ECC71] text-white text-xs font-mono font-bold cursor-pointer flex items-center gap-1.5"
        >
          <span>⚡</span>
          <span>EXPLORE INNOVATION SANDBOX &rarr;</span>
        </button>
      </div>
    </div>
  );
}
