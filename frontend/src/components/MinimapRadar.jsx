import React, { useState, useEffect } from 'react';
import { soundEngine } from '../utils/audio';

export default function MinimapRadar({ activeMarker, onSelectMarker, markers }) {
  const [heading, setHeading] = useState(64);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeading(prev => (prev + (Math.random() * 2 - 1) + 360) % 360);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-start font-mono select-none">
      {/* GTA V Bright Round Minimap */}
      <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-white border-3 border-[#1A1D20] shadow-[5px_5px_0px_#1A1D20] overflow-hidden flex items-center justify-center p-2">
        {/* Map Vector Lines inside Radar */}
        <div className="absolute inset-0 bg-[#F4F5F7] pointer-events-none">
          {/* River Canal inside radar */}
          <div className="absolute top-0 right-8 w-6 h-full bg-[#00E5FF]/25 -rotate-12" />
          {/* Main street cross */}
          <div className="absolute inset-x-0 top-1/2 h-4 bg-white border-y border-[#1A1D20]/25 -translate-y-1/2" />
          <div className="absolute inset-y-0 left-1/2 w-4 bg-white border-x border-[#1A1D20]/25 -translate-x-1/2" />
        </div>

        {/* Concentric Radar Distance Rings */}
        <div className="absolute inset-3 rounded-full border border-dashed border-[#1A1D20]/20 pointer-events-none" />
        <div className="absolute inset-8 rounded-full border border-[#1A1D20]/15 pointer-events-none" />

        {/* Rotating Radar Sweep Beam */}
        <div className="absolute inset-0 animate-gta-sweep pointer-events-none origin-center">
          <div className="w-1/2 h-full bg-gradient-to-r from-transparent to-[#FF0055]/20 [clip-path:polygon(100%_50%,0_0,0_50%)]" />
        </div>

        {/* Center GTA Player Arrow (Facing Heading) */}
        <div className="relative z-10 w-5 h-5 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-[#FF0055] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ transform: `rotate(${heading - 45}deg)` }}
          >
            <path d="M12 2L4 21l8-4 8 4L12 2z" />
          </svg>
        </div>

        {/* Interactive Blips for Sectors */}
        {markers.map((marker) => {
          const isSelected = activeMarker === marker.id;
          return (
            <button
              key={marker.id}
              onClick={() => {
                soundEngine.playSelect();
                onSelectMarker(marker.id);
              }}
              title={marker.title}
              style={{
                top: `${marker.radarY}%`,
                left: `${marker.radarX}%`,
              }}
              className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-125 border border-[#1A1D20] ${
                isSelected
                  ? 'bg-[#FF0055] ring-2 ring-[#1A1D20] scale-110 shadow-md'
                  : 'bg-white shadow-sm'
              }`}
            >
              <span className="text-[10px] leading-none">{marker.gtaEmoji}</span>
            </button>
          );
        })}

        {/* Compass Rose (N, S, E, W) */}
        <div className="absolute top-1 text-[11px] font-black text-[#FF0055] font-['Bebas_Neue'] tracking-widest">
          N
        </div>
        <div className="absolute bottom-1 text-[9px] font-bold text-[#1A1D20]/60">
          S
        </div>
        <div className="absolute right-1.5 text-[9px] font-bold text-[#1A1D20]/60">
          E
        </div>
        <div className="absolute left-1.5 text-[9px] font-bold text-[#1A1D20]/60">
          W
        </div>
      </div>

      {/* GTA V Health & Armor Dual Bars */}
      <div className="w-44 sm:w-52 mt-2 bg-white p-2 border-2 border-[#1A1D20] shadow-[3px_3px_0px_#1A1D20] space-y-1.5">
        {/* Health Bar (Bright Cash Green #2ECC71) */}
        <div className="flex items-center gap-1.5 text-[10px]">
          <span className="w-12 font-bold text-[#1A1D20]">HEALTH</span>
          <div className="flex-1 h-3 bg-[#E5E7EB] border border-[#1A1D20] overflow-hidden flex">
            <div className="h-full bg-[#2ECC71] w-[88%]" />
            <div className="h-full bg-[#27ae60]/40 w-[12%]" />
          </div>
          <span className="font-extrabold text-[#27ae60]">88%</span>
        </div>

        {/* Armor Bar (Electric Blue #00E5FF) */}
        <div className="flex items-center gap-1.5 text-[10px]">
          <span className="w-12 font-bold text-[#1A1D20]">ARMOR</span>
          <div className="flex-1 h-3 bg-[#E5E7EB] border border-[#1A1D20] overflow-hidden flex">
            <div className="h-full bg-[#00E5FF] w-[94%]" />
            <div className="h-full bg-[#00bcd4]/40 w-[6%]" />
          </div>
          <span className="font-extrabold text-[#0284c7]">94%</span>
        </div>

        {/* Location Street Indicator */}
        <div className="flex justify-between items-center text-[9px] font-bold text-[#1A1D20]/70 border-t border-gray-200 pt-1">
          <span>PORTOLA DR // AIRS HQ</span>
          <span className="text-[#FF0055]">{Math.round(heading)}° NW</span>
        </div>
      </div>
    </div>
  );
}
