import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '../utils/audio';

export default function IntroSequence({ onComplete }) {
  const [bootLogs, setBootLogs] = useState([]);

  useEffect(() => {
    soundEngine.playBootBoom();

    const logMessages = [
      "ESTABLISHING LOS SANTOS SECURE CELL LINK...",
      "AIRS NEURAL OS // SUN-DRENCHED EDITION DETECTED",
      "ALLOCATING GPU CLUSTER BUDGET ($4.2M FLOP)...",
      "ACQUIRING CAMPUS MAP VECTOR GRIDS...",
      "WANTED LEVEL CLEARED // SAFEHOUSE ONLINE",
      "WELCOME TO LOS SANTOS // AIRS DISTRICT"
    ];

    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < logMessages.length) {
        setBootLogs(prev => [...prev, logMessages[logIndex]]);
        soundEngine.playHover();
        logIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 260);

    const completeTimer = setTimeout(() => {
      handleFinish();
    }, 3600);

    return () => {
      clearInterval(logInterval);
      clearTimeout(completeTimer);
    };
  }, []);

  const handleFinish = () => {
    soundEngine.playCash();
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.1,
        filter: "blur(8px)",
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F4F5F7] overflow-hidden select-none font-mono"
    >
      {/* Background Los Santos Sun-Drenched Gradient and Map Grid */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-100/40 via-[#F4F5F7] to-pink-100/50 pointer-events-none" />
      <div className="absolute inset-0 light-map-grid opacity-70 pointer-events-none" />

      {/* Decorative Bold GTA Accent Lines */}
      <div className="absolute top-0 left-0 w-full h-3 bg-[#FF0055]" />
      <div className="absolute bottom-0 left-0 w-full h-3 bg-[#00E5FF]" />

      {/* Rotating Sun Radar Ring */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute w-[580px] h-[580px] border-2 border-dashed border-[#FF0055]/20 rounded-full pointer-events-none flex items-center justify-center"
      >
        <div className="absolute top-0 w-4 h-4 bg-[#FF0055] rounded-full -translate-y-2 shadow-md" />
        <div className="absolute bottom-0 w-4 h-4 bg-[#00E5FF] rounded-full translate-y-2 shadow-md" />
      </motion.div>

      {/* Main Content Box */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-xl">
        {/* GTA Badge Header */}
        <div className="inline-flex items-center gap-2 bg-[#1A1D20] text-white px-3 py-1 mb-4 shadow-[3px_3px_0px_#FF0055]">
          <span className="w-2 h-2 rounded-full bg-[#2ECC71] animate-ping" />
          <span className="text-[10px] tracking-[0.25em] font-bold uppercase">
            LOS SANTOS // AIRS CHAPTER
          </span>
        </div>

        {/* Emblem */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-28 h-28 mb-4 flex items-center justify-center bg-white border-2 border-[#1A1D20] shadow-[5px_5px_0px_#1A1D20]"
        >
          {/* Accent corners */}
          <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#FF0055]" />
          <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#00E5FF]" />
          <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[#FFC700]" />
          <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#2ECC71]" />

          <div className="flex flex-col items-center">
            <span className="text-4xl">🌴</span>
            <span className="text-[11px] font-extrabold tracking-widest text-[#FF0055] mt-1 font-['Bebas_Neue'] text-xl">
              V
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-7xl md:text-8xl font-black tracking-tight text-[#1A1D20] font-['Bebas_Neue'] leading-none drop-shadow-[4px_4px_0px_rgba(255,0,85,0.25)]">
            A I R S
          </h1>
          <div className="inline-block bg-[#FF0055] text-white px-3 py-0.5 mt-1 font-['Bebas_Neue'] text-lg tracking-widest shadow-[3px_3px_0px_#1A1D20]">
            ARTIFICIAL INTELLIGENCE & RESEARCH SYNDICATE
          </div>
          <p className="text-xs text-[#1A1D20]/70 font-mono mt-2 tracking-wide font-semibold">
            NEURAL HEISTS • GPU CLUSTERS • AGENT SWARMS • FIELD HACKATHONS
          </p>
        </motion.div>

        {/* Terminal Boot Log */}
        <div className="w-full mt-5 p-3 bg-white border-2 border-[#1A1D20] shadow-[4px_4px_0px_#1A1D20] text-left text-[11px] text-[#1A1D20] font-mono min-h-[92px] flex flex-col justify-end">
          <div className="space-y-1">
            {bootLogs.map((log, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-[#FF0055] font-bold">&gt;&gt;</span>
                <span className="font-semibold tracking-wide">{log}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex items-center justify-between w-full">
          <span className="text-[11px] font-bold text-[#1A1D20]/70">
            PRESS [SPACE] OR CLICK
          </span>

          <button
            onClick={handleFinish}
            className="neo-btn bg-[#FFC700] hover:bg-[#FFD433] text-[#1A1D20] px-4 py-2 font-['Bebas_Neue'] text-lg tracking-wider flex items-center gap-2 cursor-pointer"
          >
            <span>ENTER LOS SANTOS</span>
            <span className="text-[#FF0055] font-black">&rarr;</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
