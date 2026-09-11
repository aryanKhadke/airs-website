import React, { useState } from 'react';
import { soundEngine } from '../../utils/audio';

export default function AIGarageSection({ onNavigate }) {
  const [overclock, setOverclock] = useState(115);
  const [cooling, setCooling] = useState('LIQUID_NITROGEN');

  const rigs = [
    {
      name: "BEAST-01 // TITAN BLACK",
      spec: "8x NVIDIA H100 SXM5 80GB",
      vram: "640 GB HBM3",
      cooling: "Custom Custom Loop LN2",
      power: "10.2 kW Peak",
      status: "ONLINE // TRAINING",
      accent: "border-[#FF6B00]"
    },
    {
      name: "PHANTOM-02 // B200 PROTOTYPE",
      spec: "4x NVIDIA Blackwell B200",
      vram: "768 GB HBM3e",
      cooling: "Direct Liquid Immersion",
      power: "14.8 kW Peak",
      status: "BENCHMARKING",
      accent: "border-[#FF0055]"
    },
    {
      name: "WARP-03 // INFERENCE SLEEPER",
      spec: "16x RTX 4090 24GB Modded",
      vram: "384 GB GDDR6X",
      cooling: "High-CFM Industrial Blowers",
      power: "7.5 kW",
      status: "READY FOR DEPLOY",
      accent: "border-[#2ECC71]"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="neo-box p-5 bg-gradient-to-r from-orange-50 via-amber-50 to-red-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-[#FF6B00] text-white font-black text-[10px] px-3 py-1 font-mono uppercase tracking-widest">
          RIG TUNING GARAGE // SEC-04
        </div>

        <div className="text-[10px] font-mono font-bold text-[#FF6B00] uppercase tracking-widest mb-1 flex items-center gap-2">
          <span>🏎️ AIRS HARDWARE GARAGE</span>
          <span>•</span>
          <span>CYPRESS FLATS INDUSTRIAL</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black font-['Bebas_Neue'] text-[#1A1D20] tracking-wide uppercase leading-none">
          CUSTOM GPU RIGS, CLUSTER TUNING & OVERCLOCKING
        </h2>
        <p className="text-gray-700 text-sm mt-2 leading-relaxed font-['Space_Grotesk'] max-w-2xl font-medium">
          Where raw silicon meets motorsport engineering. The AI Garage tunes bare-metal supercomputers, solders custom copper heatsinks, and flashes modified BIOS kernels to squeeze every last TFLOP from our training clusters.
        </p>
      </div>

      {/* Interactive Overclocking Bench */}
      <div className="border-2 border-[#1A1D20] p-4 bg-white shadow-[4px_4px_0px_#1A1D20]">
        <div className="flex items-center justify-between border-b-2 border-[#1A1D20] pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚙️</span>
            <span className="text-xs font-mono font-black uppercase text-[#1A1D20] tracking-wider">
              INTERACTIVE CLUSTER TUNER // VOLTAGE & CLOCK SIMULATOR
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold text-[#FF0055]">
            CAUTION: HIGH VOLTAGE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 bg-[#F4F5F7] border border-[#1A1D20]">
          {/* Overclock Slider */}
          <div>
            <div className="text-[10px] font-mono font-bold text-gray-600 mb-1">
              GPU CORE FREQUENCY: <span className="text-[#FF6B00] font-black">{overclock}%</span>
            </div>
            <input
              type="range"
              min="90"
              max="140"
              value={overclock}
              onChange={(e) => {
                setOverclock(Number(e.target.value));
                soundEngine.playHover();
              }}
              className="w-full cursor-pointer accent-[#FF6B00]"
            />
            <div className="flex justify-between text-[9px] font-mono text-gray-500 mt-1">
              <span>STOCK (100%)</span>
              <span>NITROGEN BOOST (140%)</span>
            </div>
          </div>

          {/* Cooling Selector */}
          <div>
            <div className="text-[10px] font-mono font-bold text-gray-600 mb-1">
              COOLING APPARATUS:
            </div>
            <div className="flex gap-1.5">
              {['AIR', 'IMMERSION', 'LN2'].map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    soundEngine.playSelect();
                    setCooling(c);
                  }}
                  className={`flex-1 py-1.5 text-[10px] font-mono font-bold border border-[#1A1D20] cursor-pointer transition-all ${
                    cooling === c
                      ? 'bg-[#1A1D20] text-white shadow-xs'
                      : 'bg-white hover:bg-gray-100 text-[#1A1D20]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Thermal Output Gauge */}
          <div className="text-right flex flex-col justify-center">
            <div className="text-[10px] font-mono font-bold text-gray-600">ESTIMATED THERMALS</div>
            <div className={`text-2xl font-black font-['Bebas_Neue'] ${
              overclock > 125 ? 'text-[#FF0055]' : 'text-[#2ECC71]'
            }`}>
              {Math.round(45 + (overclock - 100) * 0.85)}°C {overclock > 125 ? '🔥 CRITICAL' : '⚡ OPTIMAL'}
            </div>
            <div className="text-[9px] font-mono text-gray-500">
              CLUSTER EFFICIENCY: {Math.round(overclock * 1.8)} TFLOPS/W
            </div>
          </div>
        </div>
      </div>

      {/* Active Rigs Fleet */}
      <div className="space-y-3">
        <div className="text-xs font-mono font-black uppercase text-[#1A1D20] tracking-wider flex items-center justify-between">
          <span>GARAGE FLEET SPECIFICATIONS:</span>
          <span className="text-[#FF6B00]">3 FLEET ASSETS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {rigs.map((rig, idx) => (
            <div 
              key={idx}
              className={`p-4 bg-white border-2 border-[#1A1D20] shadow-[4px_4px_0px_#1A1D20] flex flex-col justify-between hover:bg-orange-50/40 transition-all`}
            >
              <div>
                <div className="flex items-center justify-between border-b border-gray-200 pb-1 mb-2">
                  <span className="text-[9px] font-mono font-bold text-gray-500">ASSET #{idx + 1}</span>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 bg-[#2ECC71] text-white">
                    {rig.status}
                  </span>
                </div>

                <h4 className="font-['Bebas_Neue'] text-xl text-[#1A1D20] tracking-wide mb-2">
                  {rig.name}
                </h4>

                <div className="space-y-1 text-xs font-mono">
                  <div className="text-gray-700">
                    <span className="text-gray-400">SPECS:</span> <span className="font-bold">{rig.spec}</span>
                  </div>
                  <div className="text-gray-700">
                    <span className="text-gray-400">VRAM:</span> <span className="font-bold text-[#FF6B00]">{rig.vram}</span>
                  </div>
                  <div className="text-gray-700">
                    <span className="text-gray-400">COOLING:</span> {rig.cooling}
                  </div>
                  <div className="text-gray-700">
                    <span className="text-gray-400">DRAW:</span> {rig.power}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  soundEngine.playCash();
                }}
                className="mt-4 w-full py-1.5 bg-[#1A1D20] hover:bg-[#FF6B00] text-white text-[10px] font-mono font-bold cursor-pointer transition-colors"
              >
                REQUEST TELEMETRY LINK
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Nav */}
      <div className="flex flex-wrap gap-2 pt-2 border-t-2 border-[#1A1D20]">
        <button
          onClick={() => {
            soundEngine.playSelect();
            if (onNavigate) onNavigate('innovation_lab');
          }}
          className="neo-btn px-4 py-2 bg-[#2ECC71] text-white text-xs font-mono font-bold cursor-pointer flex items-center gap-1.5"
        >
          <span>⚡</span>
          <span>INSPECT INNOVATION LAB &rarr;</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playSelect();
            if (onNavigate) onNavigate('airs_hq');
          }}
          className="neo-btn px-4 py-2 bg-white hover:bg-gray-100 text-xs font-mono font-bold cursor-pointer flex items-center gap-1.5"
        >
          <span>🏛️</span>
          <span>RETURN TO AIRS HQ &rarr;</span>
        </button>
      </div>
    </div>
  );
}
