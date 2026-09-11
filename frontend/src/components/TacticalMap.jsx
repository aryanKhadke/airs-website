import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import { soundEngine } from '../utils/audio';

export default function TacticalMap({ 
  markers, 
  onSelectMarker, 
  activeMarker,
  mapScale: externalMapScale = 0.72 
}) {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Position & Zoom Motion Values
  const panX = useMotionValue(0);
  const panY = useMotionValue(0);
  const zoomScale = useMotionValue(externalMapScale);

  // Smoothed Springs for Zoom and Pan
  const smoothScale = useSpring(zoomScale, { stiffness: 220, damping: 28 });
  const smoothPanX = useSpring(panX, { stiffness: 260, damping: 32 });
  const smoothPanY = useSpring(panY, { stiffness: 260, damping: 32 });

  // Sync external zoom controller with internal zoom
  useEffect(() => {
    if (externalMapScale) {
      animate(zoomScale, externalMapScale, { duration: 0.35, ease: [0.16, 1, 0.3, 1] });
    }
  }, [externalMapScale, zoomScale]);

  // Mouse Parallax Tilt state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 140, damping: 24 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 140, damping: 24 });

  // 3D Perspective Tilt: base 15deg on X, -4deg on Z + subtle mouse tilt
  const dynamicRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [17, 13]);
  const dynamicRotateZ = useTransform(smoothMouseX, [-0.5, 0.5], [-6, -2]);
  const dynamicRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-3, 3]);

  // Cursor-Anchored Mouse Wheel Zooming
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleNativeWheel = (e) => {
      e.preventDefault();

      const rect = el.getBoundingClientRect();
      // Mouse position relative to center of the viewport
      const cx = e.clientX - (rect.left + rect.width / 2);
      const cy = e.clientY - (rect.top + rect.height / 2);

      const currentScale = zoomScale.get();
      const currentPanX = panX.get();
      const currentPanY = panY.get();

      // Zoom factor calculation (smooth exponential scaling)
      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
      const targetScale = Math.min(Math.max(currentScale * zoomFactor, 0.5), 3.0);

      if (targetScale === currentScale) return;

      // Anchor zoom around the cursor position:
      // (cx - panX) / currentScale = (cx - newPanX) / targetScale
      const newPanX = cx - (cx - currentPanX) * (targetScale / currentScale);
      const newPanY = cy - (cy - currentPanY) * (targetScale / currentScale);

      // Clamp pan boundaries based on current scale
      const maxPanX = 900 * targetScale;
      const maxPanY = 650 * targetScale;
      const clampedPanX = Math.min(Math.max(newPanX, -maxPanX), maxPanX);
      const clampedPanY = Math.min(Math.max(newPanY, -maxPanY), maxPanY);

      zoomScale.set(targetScale);
      panX.set(clampedPanX);
      panY.set(clampedPanY);

      soundEngine.playHover();
    };

    el.addEventListener('wheel', handleNativeWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleNativeWheel);
  }, [panX, panY, zoomScale]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Coordinated locations for the 4 Waypoints in authentic Los Santos map geography:
  // SEC-01 HQ: Del Perro / Rockford Hills (West coast)
  // SEC-02 Heist Board: Downtown Los Santos / Maze Bank Core (Central-East)
  // SEC-03 Dossier: LSIA / Terminal Port Tech Labs (South-West coast)
  // SEC-04 Enlist: Vinewood / Mirror Park AI Campus (North-East foothills)
  const hqMarker = markers.find(m => m.id === 'airs_hq') || markers.find(m => m.id === 'home') || markers[0];
  const targetMarker = markers.find(m => m.id === activeMarker) || hqMarker;

  // Convert marker percentages into SVG viewBox coordinate space (2400 x 1600)
  const hqX = (hqMarker.mapX / 100) * 2400;
  const hqY = (hqMarker.mapY / 100) * 1600;
  const targetX = (targetMarker.mapX / 100) * 2400;
  const targetY = (targetMarker.mapY / 100) * 1600;

  // Realistic curved GPS navigation route along the freeway network (smooth bezier curves)
  const midX = (hqX + targetX) / 2;
  const midY = (hqY + targetY) / 2;
  const gpsPath = `M ${hqX} ${hqY} C ${hqX + (midX - hqX) * 0.8} ${hqY + 40}, ${midX - 40} ${targetY - 60}, ${targetX} ${targetY}`;

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative w-full h-full overflow-hidden bg-[#EAEBF0] select-none flex items-center justify-center [perspective:1100px] ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
    >
      {/* GTA V Pause Map Navigation HUD Pill */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none opacity-85 transition-opacity">
        <div className="bg-white/95 border-2 border-[#1A1D20] px-4 py-1 text-[10px] font-mono font-bold tracking-widest text-[#1A1D20] shadow-[3px_3px_0px_#1A1D20] uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF0055] animate-ping" />
          <span>DRAG MAP TO PAN • MOUSE WHEEL TO ZOOM • 3D ROTATION ACTIVE</span>
        </div>
      </div>

      {/* 
        DRAGGABLE & WHEEL-ZOOMABLE 3D LOS SANTOS MAP CANVAS
      */}
      <motion.div
        drag
        dragConstraints={{ left: -1200, right: 1200, top: -900, bottom: 900 }}
        dragElastic={0.08}
        dragTransition={{ power: 0.35, timeConstant: 220, bounceStiffness: 450, bounceDamping: 30 }}
        onDragStart={() => {
          setIsDragging(true);
          soundEngine.playHover();
        }}
        onDragEnd={() => setIsDragging(false)}
        style={{
          x: smoothPanX,
          y: smoothPanY,
          scale: smoothScale,
          rotateX: dynamicRotateX,
          rotateZ: dynamicRotateZ,
          rotateY: dynamicRotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-[170%] h-[170%] shrink-0 flex items-center justify-center will-change-transform"
      >
        {/* ========================================================================= */}
        {/* LAYER 0 (translateZ: 0px): ORGANIC TERRAIN, SHORELINES, MOUNTAIN CONTOURS */}
        {/* ========================================================================= */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ transform: 'translateZ(0px)' }}
        >
          {/* Subtle tactical coordinate grid */}
          <div className="absolute inset-0 light-map-grid opacity-60" />

          {/* Organic Topographic Vector Map (2400 x 1600 ViewBox) */}
          <svg
            className="w-full h-full object-cover"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2400 1600"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              {/* Ocean Depth Gradient */}
              <radialGradient id="pacificShelf" cx="15%" cy="50%" r="65%">
                <stop offset="0%" stopColor="#87CEEB" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#5F9EA0" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#4682B4" stopOpacity="0.5" />
              </radialGradient>

              {/* Urban District Pattern */}
              <pattern id="urbanGridPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <rect width="40" height="40" fill="none" />
                <circle cx="2" cy="2" r="1" fill="#1A1D20" fillOpacity="0.08" />
              </pattern>
            </defs>

            {/* Base Ocean Background */}
            <rect x="0" y="0" width="2400" height="1600" fill="#E4E6EB" />

            {/* Pacific Coastline Ocean Water Body */}
            <path
              d="M -200,-200 L 420,-200 C 460,250 360,520 480,780 C 580,1000 340,1250 560,1800 L -200,1800 Z"
              fill="url(#pacificShelf)"
              stroke="#00E5FF"
              strokeWidth="4"
            />

            {/* Coastal Surf Contours */}
            <path
              d="M -200,-200 L 450,-200 C 490,260 390,530 510,790 C 610,1010 370,1260 590,1800"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeDasharray="14 10"
              opacity="0.6"
            />

            {/* Del Perro Pleasure Pier */}
            <rect x="360" y="740" width="220" height="38" rx="4" fill="#1A1D20" opacity="0.8" />
            <circle cx="560" cy="759" r="26" fill="#FF0055" fillOpacity="0.3" stroke="#FF0055" strokeWidth="2" />
            <text x="380" y="764" fill="#FFFFFF" fontSize="13" fontFamily="Bebas Neue" letterSpacing="1">
              DEL PERRO PIER // FERRIS REEL
            </text>

            {/* South Port of Los Santos Terminal Water Basin & Inlets */}
            <path
              d="M 1200,1800 C 1220,1450 1480,1380 1560,1520 C 1620,1620 1850,1500 1920,1800 Z"
              fill="#00E5FF"
              fillOpacity="0.25"
              stroke="#00E5FF"
              strokeWidth="3"
            />
            {/* Terminal Island Breakwater */}
            <path
              d="M 1300,1580 C 1450,1540 1700,1560 1820,1620"
              stroke="#1A1D20"
              strokeWidth="12"
              strokeLinecap="round"
              fill="none"
            />

            {/* Los Santos Flood Control River (Winding Concrete Aqueduct) */}
            <path
              d="M 1880,-200 C 1820,380 1660,720 1780,1100 C 1840,1280 1720,1500 1880,1800"
              stroke="#00E5FF"
              strokeWidth="48"
              strokeOpacity="0.28"
              fill="none"
            />
            <path
              d="M 1880,-200 C 1820,380 1660,720 1780,1100 C 1840,1280 1720,1500 1880,1800"
              stroke="#1A1D20"
              strokeWidth="2"
              strokeDasharray="16 12"
              fill="none"
              opacity="0.3"
            />

            {/* North Vinewood Hills Mountain Ranges (Organic Contours) */}
            <g stroke="#1A1D20" strokeWidth="1.2" strokeOpacity="0.14" fill="none">
              <path d="M 600,60 C 950,-20 1400,20 1750,120" />
              <path d="M 650,120 C 1000,40 1350,80 1700,180" />
              <path d="M 720,180 C 1050,110 1300,140 1650,240" />
              <path d="M 780,240 C 1100,180 1250,210 1600,300" />
            </g>
            <text x="1100" y="140" fill="#1A1D20" opacity="0.45" fontSize="16" fontFamily="Bebas Neue" letterSpacing="4">
              VINEWOOD HILLS // GALILEO OBSERVATORY
            </text>

            {/* Tataviam Mountains & Foothills (East) */}
            <g stroke="#1A1D20" strokeWidth="1.2" strokeOpacity="0.12" fill="none">
              <path d="M 2000,300 C 2150,550 2100,850 2250,1100" />
              <path d="M 2060,340 C 2200,580 2160,880 2300,1140" />
              <path d="M 2120,380 C 2250,620 2220,920 2350,1180" />
            </g>

            {/* Organic Green Parks & Campus Commons */}
            <path
              d="M 520,480 C 720,440 920,490 880,680 C 840,820 620,840 500,740 C 440,680 460,510 520,480 Z"
              fill="#2ECC71"
              fillOpacity="0.14"
              stroke="#2ECC71"
              strokeWidth="2"
              strokeDasharray="8 6"
            />
            <text x="560" y="580" fill="#1A1D20" opacity="0.7" fontSize="14" fontFamily="Space Grotesk" fontWeight="bold" letterSpacing="2">
              AIRS CENTRAL PARK // NEURAL LAWNS
            </text>

            {/* Silicon Hills Innovation Commons */}
            <path
              d="M 1480,440 C 1720,390 1980,480 1920,720 C 1880,880 1600,890 1440,780 C 1380,720 1400,470 1480,440 Z"
              fill="#FFC700"
              fillOpacity="0.13"
              stroke="#FFC700"
              strokeWidth="2"
              strokeDasharray="8 6"
            />
            <text x="1520" y="550" fill="#1A1D20" opacity="0.7" fontSize="14" fontFamily="Space Grotesk" fontWeight="bold" letterSpacing="2">
              INNOVATION RIDGE // SILICON COMMONS
            </text>

            {/* South Terminal Industrial Tech Basin */}
            <path
              d="M 980,1120 C 1280,1080 1520,1150 1460,1360 C 1420,1480 1140,1510 950,1420 C 890,1360 910,1150 980,1120 Z"
              fill="#00E5FF"
              fillOpacity="0.1"
              stroke="#00E5FF"
              strokeWidth="2"
              strokeDasharray="8 6"
            />
            <text x="1030" y="1220" fill="#1A1D20" opacity="0.65" fontSize="14" fontFamily="Space Grotesk" fontWeight="bold" letterSpacing="2">
              PORT TERMINAL // GPU BARE-METAL BASIN
            </text>
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 1 (translateZ: 22px): ORGANIC CURVED FREEWAYS, ARTERIALS & BUILDINGS */}
        {/* ========================================================================= */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ transform: 'translateZ(22px)' }}
        >
          <svg
            className="w-full h-full object-cover"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2400 1600"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <filter id="neoBuildingShadowOrganic" x="-20%" y="-20%" width="150%" height="150%">
                <feDropShadow dx="5" dy="8" stdDeviation="0" floodColor="#1A1D20" floodOpacity="0.22" />
              </filter>
            </defs>

            {/* Detailed Organic City Building Footprints */}
            <g fill="#FFFFFF" stroke="#1A1D20" strokeWidth="2.5" filter="url(#neoBuildingShadowOrganic)">
              {/* Safehouse / Rockford Hills Estates */}
              <polygon points="560,340 700,320 740,430 580,450" />
              <polygon points="760,350 910,340 940,470 780,480" />
              <polygon points="580,490 730,480 750,600 610,620" />

              {/* Downtown Los Santos High-Rise Core */}
              <polygon points="1120,540 1340,510 1380,740 1150,770" />
              <polygon points="1200,360 1380,340 1410,480 1230,500" />
              <polygon points="1440,530 1640,520 1660,710 1460,730" />
              <polygon points="1420,350 1600,340 1630,470 1450,490" />

              {/* East Tech & Mission Labs */}
              <polygon points="1680,360 1880,340 1910,490 1710,510" />
              <polygon points="1720,540 1920,530 1950,700 1750,720" />

              {/* South Terminal Tech Warehouses */}
              <polygon points="620,950 840,940 860,1110 650,1130" />
              <polygon points="900,960 1120,950 1140,1120 920,1140" />

              {/* Southeast Enlistment Campuses */}
              <polygon points="1620,980 1860,960 1890,1150 1650,1170" />
              <polygon points="1920,990 2140,980 2160,1140 1940,1160" />
            </g>

            {/* ------------------------------------------------------------- */}
            {/* AUTHENTIC GTA V FREEWAY NETWORK (Golden Yellow with Casing)   */}
            {/* ------------------------------------------------------------- */}
            <g fill="none">
              {/* Freeway Under-Casing (Dark Charcoal #1A1D20) */}
              <g stroke="#1A1D20" strokeLinecap="round" strokeLinejoin="round">
                {/* Del Perro Freeway (Curving East-West through Downtown) */}
                <path d="M -100,300 C 450,280 850,380 1300,420 C 1750,460 2050,400 2500,380" strokeWidth="26" />

                {/* Olympic Freeway (Curving along South Urban Hub) */}
                <path d="M -100,880 C 400,840 850,920 1350,900 C 1850,880 2100,940 2500,920" strokeWidth="26" />

                {/* La Puerta Freeway (Flowing North-South towards Airport & Docks) */}
                <path d="M 1080,-150 C 1040,350 1020,700 1140,1050 C 1220,1300 1350,1500 1480,1750" strokeWidth="28" />

                {/* Los Santos River Expressway (East Bypass) */}
                <path d="M 2150,-150 C 2050,350 2080,850 2180,1300 C 2240,1550 2300,1750 2350,1750" strokeWidth="24" />

                {/* Palomino Scenic Coastal Loop */}
                <path d="M 450,280 C 350,550 320,950 480,1350 C 580,1600 800,1700 1150,1720" strokeWidth="22" />

                {/* Curved Freeway Cloverleaf & Roundabout Interchanges */}
                <circle cx="1060" cy="400" r="85" strokeWidth="18" />
                <circle cx="1120" cy="910" r="95" strokeWidth="18" />
              </g>

              {/* Freeway Golden-Yellow Fill (#FFB800) */}
              <g stroke="#FFB800" strokeLinecap="round" strokeLinejoin="round">
                <path d="M -100,300 C 450,280 850,380 1300,420 C 1750,460 2050,400 2500,380" strokeWidth="18" />
                <path d="M -100,880 C 400,840 850,920 1350,900 C 1850,880 2100,940 2500,920" strokeWidth="18" />
                <path d="M 1080,-150 C 1040,350 1020,700 1140,1050 C 1220,1300 1350,1500 1480,1750" strokeWidth="20" />
                <path d="M 2150,-150 C 2050,350 2080,850 2180,1300 C 2240,1550 2300,1750 2350,1750" strokeWidth="16" />
                <path d="M 450,280 C 350,550 320,950 480,1350 C 580,1600 800,1700 1150,1720" strokeWidth="14" />

                <circle cx="1060" cy="400" r="85" strokeWidth="12" />
                <circle cx="1120" cy="910" r="95" strokeWidth="12" />
              </g>

              {/* Center White Dashed Highway Markings */}
              <g stroke="#FFFFFF" strokeWidth="2" strokeDasharray="14 10" opacity="0.85">
                <path d="M -100,300 C 450,280 850,380 1300,420 C 1750,460 2050,400 2500,380" />
                <path d="M -100,880 C 400,840 850,920 1350,900 C 1850,880 2100,940 2500,920" />
                <path d="M 1080,-150 C 1040,350 1020,700 1140,1050 C 1220,1300 1350,1500 1480,1750" />
              </g>

              {/* ----------------------------------------------------------- */}
              {/* SECONDARY ARTERIALS & CURVED CITY AVENUES (Dark Charcoal)   */}
              {/* ----------------------------------------------------------- */}
              <g stroke="#1A1D20" strokeLinecap="round" strokeLinejoin="round" opacity="0.75">
                {/* Vinewood Boulevard (Curving hillside avenue) */}
                <path d="M 680,180 C 950,140 1280,190 1620,160 C 1900,130 2150,220 2380,260" strokeWidth="10" />

                {/* Rockford Hills Serpentine Mountain Hairpins */}
                <path d="M 720,80 C 850,160 760,220 920,260 C 1040,290 980,360 1120,380" strokeWidth="6" strokeDasharray="8 4" />

                {/* Sunset Blvd diagonal artery */}
                <path d="M 320,440 C 650,460 980,560 1420,620 C 1850,680 2120,640 2450,660" strokeWidth="10" />

                {/* San Andreas Avenue curve */}
                <path d="M 280,680 C 650,660 1050,720 1520,760 C 1880,800 2180,780 2480,820" strokeWidth="10" />

                {/* South Shambles & Docks connectors */}
                <path d="M 520,1180 C 950,1160 1350,1220 1780,1240 C 2050,1260 2250,1220 2450,1260" strokeWidth="8" />

                {/* Cross connecting curved avenues */}
                <path d="M 750,150 C 720,520 740,950 760,1450" strokeWidth="8" />
                <path d="M 1450,160 C 1420,550 1440,950 1460,1480" strokeWidth="8" />
                <path d="M 1780,180 C 1750,550 1760,980 1780,1450" strokeWidth="8" />
              </g>
            </g>
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 2 (translateZ: 42px): ANIMATED GTA GPS NAVIGATION HOLO-ROUTE        */}
        {/* ========================================================================= */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ transform: 'translateZ(42px)' }}
        >
          <svg
            className="w-full h-full object-cover"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2400 1600"
            preserveAspectRatio="xMidYMid slice"
          >
            {activeMarker !== 'home' ? (
              <g>
                {/* Floating GPS Route Line with 3D drop blur */}
                <path
                  d={gpsPath}
                  fill="none"
                  stroke="#FF0055"
                  strokeWidth="16"
                  strokeOpacity="0.32"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d={gpsPath}
                  fill="none"
                  stroke="#FF0055"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-gps-route"
                />
                {/* Target Pulsing Reticle */}
                <circle
                  cx={targetX}
                  cy={targetY}
                  r="42"
                  fill="none"
                  stroke="#FF0055"
                  strokeWidth="4"
                  strokeDasharray="10 8"
                  className="animate-spin"
                />
              </g>
            ) : (
              <g>
                <circle cx={hqX} cy={hqY} r="44" fill="none" stroke="#FF0055" strokeWidth="4" strokeDasharray="10 8" className="animate-spin" opacity="0.75" />
              </g>
            )}
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 3 (translateZ: 68px): 3D ELEVATED GTA WAYPOINT BADGES               */}
        {/* ========================================================================= */}
        <div 
          className="absolute inset-0 pointer-events-auto"
          style={{ transform: 'translateZ(68px)' }}
        >
          {markers.map((marker) => {
            const isSelected = activeMarker === marker.id;

            return (
              <div
                key={marker.id}
                style={{
                  top: `${marker.mapY}%`,
                  left: `${marker.mapX}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30 group"
              >
                {/* Simulated ground cast shadow underneath the elevated pin */}
                <div className="absolute top-12 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#1A1D20]/25 rounded-full blur-[4px] pointer-events-none transform -rotate-12" />

                {/* Beacon Radar Wave */}
                <div className="relative flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 2.2, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                    className="absolute w-16 h-16 rounded-full border-2 border-[#FF0055] pointer-events-none"
                  />

                  {/* 3D Elevated Pin Badge */}
                  <button
                    onClick={() => {
                      soundEngine.playSelect();
                      onSelectMarker(marker.id);
                    }}
                    onMouseEnter={() => soundEngine.playHover()}
                    className={`relative z-10 flex items-center gap-2 px-3 py-2 bg-white border-2 border-[#1A1D20] text-[#1A1D20] cursor-pointer transition-all duration-150 ${
                      isSelected
                        ? 'shadow-[6px_6px_0px_#FF0055] -translate-y-2 ring-2 ring-[#FF0055]'
                        : 'shadow-[5px_5px_0px_#1A1D20] hover:shadow-[6px_6px_0px_#FF0055] hover:-translate-y-1'
                    }`}
                  >
                    {/* GTA Emoji Icon Box */}
                    <div className={`w-8 h-8 flex items-center justify-center text-lg rounded-sm ${marker.accentBg} text-white font-bold border border-[#1A1D20]`}>
                      <span>{marker.gtaEmoji}</span>
                    </div>

                    {/* Sector Info */}
                    <div className="text-left font-['Space_Grotesk'] pr-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] px-1 bg-[#1A1D20] text-white font-mono font-bold tracking-wider">
                          {marker.sector}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-[#FF0055]">
                          {marker.distance}
                        </span>
                      </div>
                      <div className="text-sm font-black uppercase font-['Bebas_Neue'] tracking-wider leading-tight text-[#1A1D20]">
                        {marker.title}
                      </div>
                    </div>

                    {/* Active Waypoint Ribbon */}
                    {isSelected && (
                      <div className="absolute -top-2 -right-2 bg-[#FF0055] text-white text-[8px] font-mono px-1 py-0.2 font-bold shadow-sm">
                        GPS TARGET
                      </div>
                    )}
                  </button>
                </div>

                {/* Tooltip on Hover */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-40">
                  <div className="bg-[#1A1D20] text-white border border-white px-2.5 py-1 text-[11px] font-mono font-bold tracking-wider uppercase shadow-[3px_3px_0px_#FF0055]">
                    ENGAGE: {marker.subtitle} &rarr;
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
