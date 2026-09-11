import React, { useState, useEffect } from 'react';
import MinimapRadar from './MinimapRadar';
import IFruitPhone from './IFruitPhone';
import { soundEngine } from '../utils/audio';

export default function HUDOverlays({
  markers,
  activeMarker,
  onSelectMarker,
  isMuted,
  onToggleMute,
  mapScale = 0.72,
  onZoomChange,
  onRandomizeMarkers
}) {
  const [time, setTime] = useState('');
  const [wantedStars, setWantedStars] = useState(5); // 5-Star GTA Wanted Level / Rep
  const [balance, setBalance] = useState(4250000);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toTimeString().split(' ')[0]);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Dynamic Cash Ticker Animation on Hover / Interaction
  const triggerCashTicker = () => {
    if (isCounting) return;
    setIsCounting(true);
    soundEngine.playCash();

    const target = balance + Math.floor(Math.random() * 50000 + 10000);
    const step = 2500;
    const interval = setInterval(() => {
      setBalance(prev => {
        if (prev + step >= target) {
          clearInterval(interval);
          setIsCounting(false);
          return target;
        }
        return prev + step;
      });
    }, 40);
  };

  const cycleWantedLevel = () => {
    soundEngine.playWantedAlert();
    setWantedStars(prev => (prev % 5) + 1);
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between p-3 md:p-6 font-mono select-none">
      {/* 1. TOP HUD BAR: Safehouse Location, 5-Star Wanted Level, Cash Green Treasury */}
      <div className="flex items-start justify-between w-full">
        {/* Top-Left: Location & Sunny Weather Badge */}
        <div className="flex flex-col gap-1 neo-box p-2.5 pointer-events-auto bg-white">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#FF0055] rounded-full animate-ping" />
            <span className="text-xs font-black font-['Bebas_Neue'] tracking-wider text-[#1A1D20] text-sm">
              AIRS // LOS SANTOS CHAPTER
            </span>
            <span className="text-[10px] bg-[#2ECC71] text-white px-1.5 py-0.2 font-bold rounded-xs">
              ONLINE
            </span>
          </div>
          <div className="text-[10px] text-gray-600 font-bold flex items-center gap-2">
            <span>SECTOR 09 • DEL PERRO BLVD</span>
            <span className="text-[#FF0055]">☀️ 78°F CLEAR</span>
          </div>
        </div>

        {/* Top-Center: 5-Star GTA Wanted Level (AIRS Rep / Activity Level) */}
        <div 
          onClick={cycleWantedLevel}
          title="Click to toggle Wanted Rep Level"
          className="neo-box px-4 py-2 pointer-events-auto cursor-pointer hover:bg-yellow-50 transition-colors flex flex-col items-center"
        >
          <div className="text-[10px] font-black tracking-widest text-[#1A1D20] uppercase mb-0.5">
            AIRS REP // WANTED LEVEL
          </div>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-6 h-6 transition-all duration-200 ${
                  star <= wantedStars
                    ? 'fill-[#FFC700] text-[#1A1D20] drop-shadow-[2px_2px_0px_#1A1D20]'
                    : 'fill-transparent text-gray-300 stroke-2'
                }`}
                viewBox="0 0 24 24"
              >
                <polygon
                  stroke="#1A1D20"
                  strokeWidth="1.5"
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                />
              </svg>
            ))}
          </div>
          <div className="text-[8px] text-[#FF0055] font-bold mt-0.5">
            MAX REP • 5-STAR SYNDICATE
          </div>
        </div>

        {/* Top-Right: Classic GTA Cash Green Money Display & Dynamic Ticker */}
        <div className="flex flex-col items-end pointer-events-auto">
          <div
            onMouseEnter={triggerCashTicker}
            onClick={triggerCashTicker}
            className="neo-box px-4 py-2 text-right cursor-pointer bg-white hover:bg-green-50 transition-all group"
            title="Hover or click to collect FLOP bounty!"
          >
            <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest flex items-center justify-end gap-1">
              <span>COMPUTE TREASURY</span>
              <span className="text-xs">💰</span>
            </div>
            {/* Bold GTA Cash Green Font */}
            <div className="text-2xl md:text-3xl font-black font-['Bebas_Neue'] text-[#2ECC71] tracking-wider drop-shadow-[1px_1px_0px_#1A1D20] leading-none mt-0.5">
              ${balance.toLocaleString()} <span className="text-xs text-[#1A1D20] font-mono font-extrabold">FLOP</span>
            </div>
          </div>

          {/* Clock & Sound Control */}
          <div className="flex items-center gap-2 mt-1.5">
            <div className="neo-box px-2.5 py-1 text-xs text-[#1A1D20] font-bold bg-white">
              🕒 {time || '12:00:00'}
            </div>

            <button
              onClick={() => {
                const muted = onToggleMute();
                if (!muted) soundEngine.playSelect();
              }}
              className="neo-btn px-2.5 py-1 text-[11px] text-[#1A1D20] font-bold cursor-pointer flex items-center gap-1.5"
              title="Toggle Game Audio"
            >
              <span>{isMuted ? 'MUTE' : 'AUDIO'}</span>
              <span className={`w-2 h-2 rounded-full ${isMuted ? 'bg-gray-400' : 'bg-[#2ECC71]'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. BOTTOM HUD ROW: GTA V Minimap on Left, Sector Hotkeys + Zoom Controls, iFruit Phone on Right */}
      <div className="flex items-end justify-between w-full">
        {/* Bottom-Left: Bright GTA Minimap */}
        <div className="pointer-events-auto">
          <MinimapRadar
            markers={markers}
            activeMarker={activeMarker}
            onSelectMarker={onSelectMarker}
          />
        </div>

        {/* Bottom-Center: Hotkey Waypoints Strip & Map Zoom FOV Controls */}
        <div className="hidden md:flex flex-col items-center gap-1.5 pointer-events-auto">
          {/* Waypoint Selectors for all 7 locations */}
          <div className="flex items-center gap-1.5 neo-box p-1.5 bg-white max-w-[58vw] overflow-x-auto scrollbar-none">
            {markers.map((m, idx) => (
              <button
                key={m.id}
                onClick={() => {
                  soundEngine.playSelect();
                  onSelectMarker(m.id);
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className={`px-2.5 py-1 text-xs font-mono font-bold tracking-wider transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                  activeMarker === m.id
                    ? 'bg-[#FF0055] text-white shadow-[2px_2px_0px_#1A1D20]'
                    : 'text-[#1A1D20] hover:bg-gray-100'
                }`}
              >
                <span className="text-sm">{m.gtaEmoji}</span>
                <span className="text-[9px] opacity-70">[{idx + 1}]</span>
                <span className="font-['Bebas_Neue'] text-xs sm:text-sm tracking-wide">{m.title}</span>
              </button>
            ))}

            {onRandomizeMarkers && (
              <button
                onClick={() => {
                  soundEngine.playCash();
                  onRandomizeMarkers();
                }}
                title="Shuffle waypoint pin positions across the map"
                className="px-2 py-1 bg-yellow-100 hover:bg-[#FFC700] text-[#1A1D20] border border-[#1A1D20] text-[10px] font-mono font-black uppercase cursor-pointer transition-colors shrink-0"
              >
                🎲 SHUFFLE
              </button>
            )}
          </div>

          {/* Map Scale / FOV Controller */}
          {onZoomChange && (
            <div className="flex items-center gap-2 neo-box px-2.5 py-1 bg-white text-[10px] font-mono font-bold text-[#1A1D20]">
              <span className="text-gray-500">MAP FOV:</span>
              <button
                onClick={() => onZoomChange(-0.06)}
                title="Zoom Out Map (or press '-')"
                className="w-5 h-5 bg-gray-100 hover:bg-[#FF0055] hover:text-white border border-[#1A1D20] flex items-center justify-center font-bold cursor-pointer transition-colors"
              >
                -
              </button>
              <span className="text-[#FF0055] w-10 text-center font-black">
                {Math.round(mapScale * 100)}%
              </span>
              <button
                onClick={() => onZoomChange(0.06)}
                title="Zoom In Map (or press '+')"
                className="w-5 h-5 bg-gray-100 hover:bg-[#2ECC71] hover:text-white border border-[#1A1D20] flex items-center justify-center font-bold cursor-pointer transition-colors"
              >
                +
              </button>
              <span className="text-gray-400 text-[9px] pl-1">WIDE ANGLE [+/-]</span>
            </div>
          )}
        </div>

        {/* Bottom-Right: Floating iFruit Phone & Weapon Loadout */}
        <div className="pointer-events-auto flex flex-col items-end gap-2">
          {/* Active Stack / Arsenal Badge */}
          <div className="neo-box p-2.5 bg-white text-right w-52 hidden sm:block">
            <div className="flex items-center justify-between border-b border-gray-200 pb-1 mb-1">
              <span className="text-[9px] text-[#FF0055] uppercase font-black tracking-wider">
                WEAPON WHEEL
              </span>
              <span className="text-[9px] bg-[#2ECC71] text-white px-1 font-bold">
                READY
              </span>
            </div>
            <div className="text-base font-black font-['Bebas_Neue'] text-[#1A1D20] tracking-wider">
              PYTORCH • TRITON • CUDA
            </div>
            <div className="text-[10px] text-gray-600 font-bold">
              WEIGHTS: 70B_INSTRUCT
            </div>
          </div>

          {/* Interactive Floating iFruit Phone */}
          <IFruitPhone 
            onNavigate={onSelectMarker} 
            markers={markers}
            activeMarker={activeMarker}
            onRandomizeMarkers={onRandomizeMarkers}
          />
        </div>
      </div>
    </div>
  );
}
