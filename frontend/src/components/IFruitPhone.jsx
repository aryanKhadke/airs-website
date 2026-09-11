import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../utils/audio';

export default function IFruitPhone({ 
  onNavigate, 
  markers = [], 
  activeMarker, 
  onRandomizeMarkers 
}) {
  const [isOpen, setIsOpen] = useState(false);
  // 'home' | 'notifications' | 'contacts' | 'join_crew' | 'intel' | 'complaints' | 'profile'
  const [activeApp, setActiveApp] = useState('home');

  // Contact Calling state
  const [callingContact, setCallingContact] = useState(null);
  const [callDuration, setCallDuration] = useState(0);

  // Dispatches / Notifications State
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      sender: "AIRS_DISPATCH",
      title: "GAUNTLET 2026 ANNOUNCED",
      body: "36-Hour Autonomous Agent Hackathon kicks off Nov 08. $5,000 compute bounties locked.",
      time: "10m ago",
      tag: "PRIORITY",
      read: false
    },
    {
      id: 2,
      sender: "COMPUTE_LAB",
      title: "CUDA KERNEL SPRINT",
      body: "Lab 402 seats filled 85%. Bring laptops with Docker and PyTorch installed.",
      time: "2h ago",
      tag: "WORKSHOP",
      read: false
    },
    {
      id: 3,
      sender: "COMMAND",
      title: "GPU CLUSTER UPGRADE",
      body: "Additional 8x H100 nodes added to AIRS distributed inference mesh.",
      time: "1d ago",
      tag: "INFRA",
      read: false
    }
  ]);

  // Contacts List
  const contacts = [
    { 
      name: "Advait V. // Lead Operative", 
      role: "President & Architect", 
      handle: "@advait_ai",
      frequency: "104.5 MHz",
      status: "SAFEHOUSE COMMAND",
      phone: "555-0199"
    },
    { 
      name: "Sarah K. // Vision Lead", 
      role: "Perception & Edge Models", 
      handle: "@sarah_k",
      frequency: "98.2 MHz",
      status: "FIELD RECON",
      phone: "555-0142"
    },
    { 
      name: "Rohan M. // Cluster Lead", 
      role: "MLOps & Bare Metal Rigs", 
      handle: "@rohan_rigs",
      frequency: "101.9 MHz",
      status: "AI GARAGE",
      phone: "555-0187"
    },
    { 
      name: "Maya T. // Embodied AI", 
      role: "Robotics & Swarm Sim", 
      handle: "@maya_robotics",
      frequency: "107.1 MHz",
      status: "INNOVATION DOCKS",
      phone: "555-0123"
    },
    { 
      name: "Marcus C. // Kernel Dev", 
      role: "Triton & FlashAttention", 
      handle: "@byte_marcus",
      frequency: "94.7 MHz",
      status: "RESEARCH LAB",
      phone: "555-0166"
    }
  ];

  // Join Crew Form State
  const [crewForm, setCrewForm] = useState({
    alias: '',
    role: 'Neural Hacker',
    handle: '',
    experience: 'Intermediate'
  });
  const [enlistedSuccess, setEnlistedSuccess] = useState(false);

  // Complaints State
  const [complaints, setComplaints] = useState([
    {
      id: "LS-8419",
      category: "Hardware Theft",
      subject: "Stolen 8x H100 server from Del Perro trunk",
      status: "UNDER FIB REVIEW",
      statusColor: "bg-[#FFC700]",
      time: "Yesterday"
    },
    {
      id: "LS-7231",
      category: "Police Harassment",
      subject: "LSPD confiscated my CUDA optimization scripts",
      status: "SETTLED ($10K BOUNTY)",
      statusColor: "bg-[#2ECC71]",
      time: "2 days ago"
    },
    {
      id: "LS-6102",
      category: "Thermal Overheat",
      subject: "Thermal throttling during 70B parameter fine-tuning",
      status: "REJECTED (SKILL ISSUE)",
      statusColor: "bg-[#FF0055]",
      time: "3 days ago"
    }
  ]);
  const [complaintForm, setComplaintForm] = useState({
    category: 'GPU Overheat / Hardware Failure',
    urgency: 'Code Red (Critical)',
    details: ''
  });
  const [complaintSubmitted, setComplaintSubmitted] = useState(null);

  const togglePhone = () => {
    soundEngine.playPhoneNotification();
    setIsOpen(prev => !prev);
  };

  const unreadCount = announcements.filter(a => !a.read).length;

  const markAllRead = () => {
    soundEngine.playSelect();
    setAnnouncements(prev => prev.map(a => ({ ...a, read: true })));
  };

  const handleStartCall = (contact) => {
    soundEngine.playPhoneNotification();
    setCallingContact(contact);
    setCallDuration(0);
    const interval = setInterval(() => {
      setCallDuration(d => d + 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
    }, 10000);
  };

  const handleEndCall = () => {
    soundEngine.playModalClose();
    setCallingContact(null);
    setCallDuration(0);
  };

  const handleEnlistSubmit = (e) => {
    e.preventDefault();
    if (!crewForm.alias.trim()) return;
    soundEngine.playSuccess();
    setEnlistedSuccess(true);

    // Add notification
    const newDispatch = {
      id: Date.now(),
      sender: "CREW_RECRUITMENT",
      title: `ENLISTED: ${crewForm.alias.toUpperCase()}`,
      body: `Welcome to AIRS syndicate. Role assigned: ${crewForm.role}. Report to Del Perro safehouse.`,
      time: "Just now",
      tag: "ENLISTED",
      read: false
    };
    setAnnouncements(prev => [newDispatch, ...prev]);

    setTimeout(() => {
      setEnlistedSuccess(false);
      setActiveApp('notifications');
    }, 1800);
  };

  const handleComplaintSubmit = (e) => {
    e.preventDefault();
    if (!complaintForm.details.trim()) return;
    soundEngine.playWantedAlert();

    const newTicketId = `LS-${Math.floor(1000 + Math.random() * 9000)}`;
    const newComplaint = {
      id: newTicketId,
      category: complaintForm.category,
      subject: complaintForm.details.slice(0, 45) + (complaintForm.details.length > 45 ? '...' : ''),
      status: "QUEUED FOR REVIEW",
      statusColor: "bg-[#00E5FF]",
      time: "Just now"
    };

    setComplaints(prev => [newComplaint, ...prev]);
    setComplaintSubmitted(newTicketId);
    setComplaintForm({
      category: 'GPU Overheat / Hardware Failure',
      urgency: 'Code Red (Critical)',
      details: ''
    });

    setTimeout(() => {
      setComplaintSubmitted(null);
    }, 2500);
  };

  // Fallback 7 markers if not passed
  const waypointsList = markers.length > 0 ? markers : [
    { id: 'airs_hq', sector: 'SEC-01', title: 'AIRS HQ', gtaEmoji: '🏛️', distance: '0.0 MILES' },
    { id: 'research_lab', sector: 'SEC-02', title: 'RESEARCH LAB', gtaEmoji: '🔬', distance: '1.4 MILES' },
    { id: 'start_mission', sector: 'SEC-03', title: 'START MISSION', gtaEmoji: '⭐️', distance: '2.1 MILES' },
    { id: 'ai_garage', sector: 'SEC-04', title: 'AI GARAGE', gtaEmoji: '🏎️', distance: '3.3 MILES' },
    { id: 'innovation_lab', sector: 'SEC-05', title: 'INNOVATION LAB', gtaEmoji: '⚡', distance: '2.8 MILES' },
    { id: 'home', sector: 'SEC-06', title: 'HOME', gtaEmoji: '🏠', distance: '0.8 MILES' },
    { id: 'about_us', sector: 'SEC-07', title: 'ABOUT US', gtaEmoji: '📁', distance: '1.9 MILES' },
  ];

  return (
    <div className="relative font-mono select-none">
      {/* Floating Toggle Button (Always visible on Bottom-Right) */}
      <button
        onClick={togglePhone}
        onMouseEnter={() => soundEngine.playHover()}
        className="neo-btn bg-[#FFFFFF] hover:bg-[#FFC700] px-3.5 py-2 flex items-center gap-2 cursor-pointer text-[#1A1D20] font-['Bebas_Neue'] text-lg tracking-wider"
      >
        <span className="text-xl">📱</span>
        <span>{isOpen ? "CLOSE iFRUIT" : "iFRUIT PHONE"}</span>
        {unreadCount > 0 ? (
          <span className="px-1.5 py-0.2 text-[10px] font-mono font-bold bg-[#FF0055] text-white rounded-full">
            {unreadCount}
          </span>
        ) : (
          <span className="w-2.5 h-2.5 rounded-full bg-[#2ECC71] animate-pulse" />
        )}
      </button>

      {/* Slide-Up iFruit Smartphone Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute bottom-12 right-0 w-[320px] sm:w-[350px] bg-[#1A1D20] rounded-[40px] p-3 border-4 border-[#1A1D20] shadow-[8px_8px_0px_rgba(0,0,0,0.35)] z-50 overflow-hidden"
          >
            {/* Phone Screen Frame */}
            <div className="bg-[#F4F5F7] rounded-[30px] overflow-hidden border-2 border-black flex flex-col h-[500px] text-[#1A1D20]">
              
              {/* 1. TOP-RIGHT PROFILE HEADER BAR */}
              <div className="bg-white px-3.5 py-2 border-b border-gray-300 flex items-center justify-between text-[10px] font-bold">
                {/* Left: Signal & 5G */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">🌴</span>
                  <span className="font-['Space_Grotesk'] text-[11px] text-[#1A1D20]">iFruit 5G</span>
                </div>

                {/* Center Speaker Notch */}
                <div className="w-12 h-2.5 bg-[#1A1D20] rounded-full mx-auto" />

                {/* Right: Battery & User Profile / Avatar Logo Icon */}
                <div className="flex items-center gap-2">
                  {/* Battery */}
                  <div className="flex items-center gap-1 text-[#2ECC71]">
                    <span className="text-[9px]">100%</span>
                    <div className="w-3.5 h-2 border border-[#1A1D20] bg-[#2ECC71] rounded-xs" />
                  </div>

                  {/* USER PROFILE / AVATAR LOGO ICON */}
                  <button
                    onClick={() => {
                      soundEngine.playSelect();
                      setActiveApp(activeApp === 'profile' ? 'home' : 'profile');
                    }}
                    title="User Profile: Operative Nexus-01"
                    className={`relative w-6 h-6 rounded-full border-2 border-[#1A1D20] flex items-center justify-center text-white text-[11px] transition-transform cursor-pointer overflow-hidden ${
                      activeApp === 'profile' 
                        ? 'bg-[#FF0055] ring-2 ring-[#FFC700]' 
                        : 'bg-gradient-to-tr from-[#FF0055] via-[#FFC700] to-[#00E5FF] hover:scale-110'
                    }`}
                  >
                    <span className="leading-none">👤</span>
                    <span className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-[#2ECC71] rounded-full border border-black" />
                  </button>
                </div>
              </div>

              {/* Calling Overlay Banner (If calling) */}
              {callingContact && (
                <div className="bg-[#1A1D20] text-white p-2.5 flex items-center justify-between border-b-2 border-[#2ECC71] animate-pulse">
                  <div>
                    <div className="text-[9px] text-[#2ECC71] font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#2ECC71] animate-ping" />
                      ENCRYPTED COMMS ACTIVE ({callDuration}s)
                    </div>
                    <div className="text-xs font-black font-['Space_Grotesk'] text-white">
                      {callingContact.name}
                    </div>
                  </div>
                  <button
                    onClick={handleEndCall}
                    className="px-2 py-1 bg-[#FF0055] text-white text-[10px] font-mono font-bold rounded cursor-pointer"
                  >
                    END
                  </button>
                </div>
              )}

              {/* Phone Content Screen */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
                
                {/* ========================================================= */}
                {/* HOME APP GRID VIEW                                        */}
                {/* ========================================================= */}
                {activeApp === 'home' && (
                  <div className="space-y-2.5">
                    {/* Lock Screen Header Banner */}
                    <div className="text-center py-2 bg-gradient-to-r from-amber-100 via-pink-50 to-cyan-100 rounded-xl border border-[#1A1D20]/25">
                      <div className="text-xl font-black font-['Bebas_Neue'] text-[#1A1D20] tracking-wider">
                        LOS SANTOS // AIRS OPERATIVE
                      </div>
                      <div className="text-[9px] text-[#FF0055] font-bold tracking-wider">
                        SYNDICATE MESH • STATUS: ONLINE
                      </div>
                    </div>

                    {/* NEW & UPDATED APP MODULES / BUTTONS GRID */}
                    <div className="grid grid-cols-2 gap-2">
                      {/* 1. Notifications / Dispatches */}
                      <button
                        onClick={() => {
                          soundEngine.playSelect();
                          setActiveApp('notifications');
                        }}
                        className="p-2 bg-white border-2 border-[#1A1D20] shadow-[2px_2px_0px_#1A1D20] rounded-xl flex flex-col items-center hover:bg-yellow-50 cursor-pointer text-center relative group"
                      >
                        {unreadCount > 0 && (
                          <span className="absolute top-1.5 right-1.5 px-1 py-0.2 bg-[#FF0055] text-white text-[8px] font-bold rounded-full animate-bounce">
                            {unreadCount}
                          </span>
                        )}
                        <span className="text-2xl group-hover:scale-110 transition-transform">📢</span>
                        <span className="text-xs font-bold font-['Space_Grotesk'] mt-0.5 text-[#1A1D20]">
                          Dispatches
                        </span>
                        <span className="text-[9px] text-[#FF0055] font-mono font-bold">
                          {unreadCount > 0 ? `${unreadCount} UNREAD` : 'ALERTS'}
                        </span>
                      </button>

                      {/* 2. Contact Details & Comms */}
                      <button
                        onClick={() => {
                          soundEngine.playSelect();
                          setActiveApp('contacts');
                        }}
                        className="p-2 bg-white border-2 border-[#1A1D20] shadow-[2px_2px_0px_#1A1D20] rounded-xl flex flex-col items-center hover:bg-yellow-50 cursor-pointer text-center group"
                      >
                        <span className="text-2xl group-hover:scale-110 transition-transform">👥</span>
                        <span className="text-xs font-bold font-['Space_Grotesk'] mt-0.5 text-[#1A1D20]">
                          Contacts
                        </span>
                        <span className="text-[9px] text-gray-500 font-mono">
                          DIRECT COMMS
                        </span>
                      </button>

                      {/* 3. Join Crew App Tile */}
                      <button
                        onClick={() => {
                          soundEngine.playSelect();
                          setActiveApp('join_crew');
                        }}
                        className="p-2 bg-gradient-to-br from-yellow-50 to-green-50 border-2 border-[#1A1D20] shadow-[2px_2px_0px_#1A1D20] rounded-xl flex flex-col items-center hover:bg-green-100 cursor-pointer text-center group"
                      >
                        <span className="text-2xl group-hover:scale-110 transition-transform">🛡️</span>
                        <span className="text-xs font-bold font-['Space_Grotesk'] mt-0.5 text-[#1A1D20]">
                          Join Crew
                        </span>
                        <span className="text-[9px] text-[#2ECC71] font-mono font-bold">
                          RECRUITMENT
                        </span>
                      </button>

                      {/* 4. Details / Intel App Tile */}
                      <button
                        onClick={() => {
                          soundEngine.playSelect();
                          setActiveApp('intel');
                        }}
                        className="p-2 bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-[#1A1D20] shadow-[2px_2px_0px_#1A1D20] rounded-xl flex flex-col items-center hover:bg-cyan-100 cursor-pointer text-center group"
                      >
                        <span className="text-2xl group-hover:scale-110 transition-transform">📂</span>
                        <span className="text-xs font-bold font-['Space_Grotesk'] mt-0.5 text-[#1A1D20]">
                          Details / Intel
                        </span>
                        <span className="text-[9px] text-[#00E5FF] font-mono font-bold">
                          MISSION DATA
                        </span>
                      </button>

                      {/* 5. iFruit Complaint Portal */}
                      <button
                        onClick={() => {
                          soundEngine.playSelect();
                          setActiveApp('complaints');
                        }}
                        className="col-span-2 p-2 bg-gradient-to-r from-red-50 via-amber-50 to-pink-50 border-2 border-[#1A1D20] shadow-[2px_2px_0px_#1A1D20] rounded-xl flex items-center justify-between hover:bg-red-100 cursor-pointer text-left px-3 group"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-2xl group-hover:scale-110 transition-transform">⚖️</span>
                          <div>
                            <div className="text-xs font-black font-['Space_Grotesk'] text-[#1A1D20]">
                              Complaint Portal
                            </div>
                            <div className="text-[9px] text-[#FF0055] font-mono font-bold">
                              GRIEVANCE & DISPUTES BUREAU
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] bg-[#1A1D20] text-white px-2 py-0.5 font-mono font-bold rounded">
                          LODGE &rarr;
                        </span>
                      </button>
                    </div>

                    {/* FAST TRAVEL GPS WAYPOINTS (SYNCED WITH 7 LOCATIONS) */}
                    <div className="bg-white border-2 border-[#1A1D20] p-2.5 rounded-xl shadow-[2px_2px_0px_#1A1D20]">
                      <div className="text-[10px] font-black text-[#1A1D20] uppercase tracking-wider mb-2 flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <span>📍</span>
                          <span>FAST TRAVEL GPS (7 WAYPOINTS)</span>
                        </span>
                        {onRandomizeMarkers && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              soundEngine.playCash();
                              onRandomizeMarkers();
                            }}
                            title="Shuffle Waypoint Offsets Randomly Across Los Santos"
                            className="text-[9px] bg-yellow-100 hover:bg-[#FFC700] border border-[#1A1D20] px-1.5 py-0.5 rounded font-bold cursor-pointer transition-colors"
                          >
                            🎲 SHUFFLE
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-1.5 text-[11px] font-bold max-h-40 overflow-y-auto pr-0.5">
                        {waypointsList.map((m) => {
                          const isTarget = activeMarker === m.id;
                          return (
                            <button
                              key={m.id}
                              onClick={() => {
                                soundEngine.playSelect();
                                onNavigate(m.id);
                              }}
                              className={`px-2 py-1.5 rounded text-left border flex items-center justify-between gap-1 transition-all cursor-pointer ${
                                isTarget
                                  ? 'bg-[#FF0055] text-white border-[#1A1D20] shadow-xs'
                                  : 'bg-gray-100 hover:bg-yellow-200 text-[#1A1D20] border-gray-300'
                              }`}
                            >
                              <div className="flex items-center gap-1 truncate">
                                <span>{m.gtaEmoji}</span>
                                <span className="truncate text-[10px] font-['Space_Grotesk']">{m.title}</span>
                              </div>
                              <span className="text-[8px] font-mono opacity-80 shrink-0">
                                {m.sector}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* ========================================================= */}
                {/* 1. NOTIFICATIONS & DISPATCHES VIEW                        */}
                {/* ========================================================= */}
                {activeApp === 'notifications' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-gray-300 pb-1">
                      <button
                        onClick={() => setActiveApp('home')}
                        className="text-xs font-bold text-[#FF0055] hover:underline cursor-pointer"
                      >
                        &larr; HOME
                      </button>
                      <span className="text-xs font-black font-['Bebas_Neue'] tracking-wider">
                        DISPATCHES & ALERTS
                      </span>
                      <button
                        onClick={markAllRead}
                        className="text-[9px] font-mono font-bold text-gray-600 hover:text-black cursor-pointer"
                      >
                        MARK ALL READ
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      {announcements.map(item => (
                        <div 
                          key={item.id} 
                          className={`p-2 bg-white border border-[#1A1D20] rounded-lg shadow-sm text-left transition-all ${
                            !item.read ? 'border-l-4 border-l-[#FF0055] bg-red-50/20' : ''
                          }`}
                        >
                          <div className="flex justify-between items-center text-[9px] font-bold text-gray-500 mb-0.5">
                            <span className="text-[#FF0055] font-black">{item.sender}</span>
                            <span>{item.time}</span>
                          </div>
                          <div className="text-xs font-black text-[#1A1D20] font-['Space_Grotesk']">
                            {item.title}
                          </div>
                          <p className="text-[10px] text-gray-700 font-sans mt-0.5 leading-snug">
                            {item.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ========================================================= */}
                {/* 2. CONTACT DETAILS & DIRECT COMMS VIEW                    */}
                {/* ========================================================= */}
                {activeApp === 'contacts' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-gray-300 pb-1">
                      <button
                        onClick={() => setActiveApp('home')}
                        className="text-xs font-bold text-[#FF0055] hover:underline cursor-pointer"
                      >
                        &larr; HOME
                      </button>
                      <span className="text-xs font-black font-['Bebas_Neue'] tracking-wider">
                        SYNDICATE CONTACTS ({contacts.length})
                      </span>
                      <span className="text-[9px] text-[#2ECC71] font-bold">SECURE 5G</span>
                    </div>

                    <div className="space-y-1.5">
                      {contacts.map((contact, idx) => (
                        <div key={idx} className="p-2 bg-white border border-gray-300 rounded-lg flex items-center justify-between text-left">
                          <div>
                            <div className="text-xs font-bold text-[#1A1D20] font-['Space_Grotesk']">
                              {contact.name}
                            </div>
                            <div className="text-[9px] text-gray-500 font-mono">
                              {contact.role} • <span className="text-[#00E5FF]">{contact.frequency}</span>
                            </div>
                            <div className="text-[8px] text-gray-400 font-mono">
                              LOC: {contact.status}
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleStartCall(contact)}
                              className="px-2 py-1 bg-[#2ECC71] hover:bg-green-600 text-white font-mono text-[9px] font-bold rounded cursor-pointer transition-colors"
                              title={`Call ${contact.phone}`}
                            >
                              CALL
                            </button>
                            <button
                              onClick={() => {
                                soundEngine.playSelect();
                                alert(`[DISPATCH PING SENT] Pinging ${contact.handle} on frequency ${contact.frequency}`);
                              }}
                              className="px-1.5 py-1 bg-[#1A1D20] hover:bg-gray-800 text-white font-mono text-[9px] font-bold rounded cursor-pointer"
                              title="Send Quick Ping"
                            >
                              PING
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ========================================================= */}
                {/* 3. JOIN CREW RECRUITMENT VIEW                             */}
                {/* ========================================================= */}
                {activeApp === 'join_crew' && (
                  <div className="space-y-2 text-left">
                    <div className="flex items-center justify-between border-b border-gray-300 pb-1">
                      <button
                        onClick={() => setActiveApp('home')}
                        className="text-xs font-bold text-[#FF0055] hover:underline cursor-pointer"
                      >
                        &larr; HOME
                      </button>
                      <span className="text-xs font-black font-['Bebas_Neue'] tracking-wider">
                        JOIN THE CREW // ENLIST
                      </span>
                      <span className="text-[9px] text-[#2ECC71] font-bold">ACTIVE</span>
                    </div>

                    {enlistedSuccess ? (
                      <div className="p-4 bg-green-50 border-2 border-[#2ECC71] rounded-xl text-center space-y-2">
                        <div className="text-3xl">🛡️</div>
                        <div className="text-base font-black font-['Bebas_Neue'] text-[#2ECC71]">
                          ENLISTMENT TRANSMITTED!
                        </div>
                        <p className="text-xs text-gray-700 font-mono">
                          Operative dossier registered in AIRS database. Check dispatches for briefing.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleEnlistSubmit} className="space-y-2">
                        <div>
                          <label className="text-[10px] font-bold text-gray-600 font-mono uppercase block">
                            Operative Codename / Alias:
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. CYBER_VIPER"
                            value={crewForm.alias}
                            onChange={e => setCrewForm({ ...crewForm, alias: e.target.value })}
                            className="w-full mt-0.5 px-2 py-1 text-xs border border-[#1A1D20] bg-white rounded font-mono"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-gray-600 font-mono uppercase block">
                            Select Specialization:
                          </label>
                          <select
                            value={crewForm.role}
                            onChange={e => setCrewForm({ ...crewForm, role: e.target.value })}
                            className="w-full mt-0.5 px-2 py-1 text-xs border border-[#1A1D20] bg-white rounded font-mono"
                          >
                            <option value="Neural Hacker">Neural Hacker (LLM fine-tuning & LoRA)</option>
                            <option value="Rig Overclocker">Rig Overclocker (CUDA & hardware)</option>
                            <option value="Agent Orchestrator">Agent Orchestrator (Multi-agent swarms)</option>
                            <option value="Perception Specialist">Perception Specialist (Vision & robotics)</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-gray-600 font-mono uppercase block">
                            Discord / GitHub Handle:
                          </label>
                          <input
                            type="text"
                            placeholder="@handle"
                            value={crewForm.handle}
                            onChange={e => setCrewForm({ ...crewForm, handle: e.target.value })}
                            className="w-full mt-0.5 px-2 py-1 text-xs border border-[#1A1D20] bg-white rounded font-mono"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2 bg-[#2ECC71] hover:bg-green-600 text-white font-mono text-xs font-black uppercase tracking-wider rounded border border-[#1A1D20] shadow-[2px_2px_0px_#1A1D20] cursor-pointer transition-colors"
                        >
                          SUBMIT ENLISTMENT APPLICATION
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            soundEngine.playSelect();
                            onNavigate('registration');
                          }}
                          className="w-full py-1 text-[10px] font-mono font-bold text-gray-600 hover:text-black text-center cursor-pointer underline"
                        >
                          Or open Full Screen Heist Dossier &rarr;
                        </button>
                      </form>
                    )}
                  </div>
                )}

                {/* ========================================================= */}
                {/* 4. DETAILS / MISSION INTEL VIEW                           */}
                {/* ========================================================= */}
                {activeApp === 'intel' && (
                  <div className="space-y-2 text-left">
                    <div className="flex items-center justify-between border-b border-gray-300 pb-1">
                      <button
                        onClick={() => setActiveApp('home')}
                        className="text-xs font-bold text-[#FF0055] hover:underline cursor-pointer"
                      >
                        &larr; HOME
                      </button>
                      <span className="text-xs font-black font-['Bebas_Neue'] tracking-wider">
                        MISSION INTEL // BRIEFING
                      </span>
                      <span className="text-[9px] bg-[#FF0055] text-white px-1 font-bold">
                        CLASSIFIED
                      </span>
                    </div>

                    <div className="p-2.5 bg-white border border-[#1A1D20] rounded-lg shadow-sm space-y-1.5">
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-gray-500">OPERATION:</span>
                        <span className="font-black text-[#FF0055]">TITAN MATRIX 2026</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-gray-500">TARGET:</span>
                        <span className="font-bold text-[#1A1D20]">MAZE BANK GPU VAULT</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-gray-500">POTENTIAL LOOT:</span>
                        <span className="font-black text-[#2ECC71]">$5,000,000 FLOP</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-gray-500">SECURITY RATING:</span>
                        <span className="font-bold text-[#FFC700]">5-STAR WANTED REP</span>
                      </div>

                      <div className="border-t border-gray-200 pt-1.5 mt-1 text-[10px] text-gray-700 font-mono">
                        <p className="font-bold text-[#1A1D20] mb-0.5">TACTICAL OBJECTIVES:</p>
                        <ul className="list-disc list-inside space-y-0.5 text-[9px] text-gray-600">
                          <li>Infiltrate high-density distributed nodes</li>
                          <li>Deploy autonomous multi-agent consensus</li>
                          <li>Extract 70B parameter model weights intact</li>
                        </ul>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        soundEngine.playSelect();
                        onNavigate('start_mission');
                      }}
                      className="w-full py-2 bg-[#FFC700] hover:bg-yellow-400 text-[#1A1D20] font-mono text-xs font-black uppercase tracking-wider rounded border border-[#1A1D20] shadow-[2px_2px_0px_#1A1D20] cursor-pointer"
                    >
                      FAST TRAVEL TO HEIST BOARD &rarr;
                    </button>
                  </div>
                )}

                {/* ========================================================= */}
                {/* 5. iFRUIT COMPLAINT PORTAL VIEW                           */}
                {/* ========================================================= */}
                {activeApp === 'complaints' && (
                  <div className="space-y-2 text-left">
                    <div className="flex items-center justify-between border-b border-gray-300 pb-1">
                      <button
                        onClick={() => setActiveApp('home')}
                        className="text-xs font-bold text-[#FF0055] hover:underline cursor-pointer"
                      >
                        &larr; HOME
                      </button>
                      <span className="text-xs font-black font-['Bebas_Neue'] tracking-wider">
                        GRIEVANCE & COMPLAINTS BUREAU
                      </span>
                      <span className="text-[9px] text-[#FF0055] font-bold">LSPD / FIB</span>
                    </div>

                    {complaintSubmitted ? (
                      <div className="p-3 bg-yellow-50 border-2 border-[#FFC700] rounded-xl text-center space-y-1">
                        <div className="text-2xl">📋</div>
                        <div className="text-sm font-black font-['Bebas_Neue'] text-[#1A1D20]">
                          COMPLAINT LODGED: #{complaintSubmitted}
                        </div>
                        <p className="text-[10px] text-gray-600 font-mono">
                          Case transferred to San Andreas Consumer Arbitration Cell.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleComplaintSubmit} className="space-y-1.5 p-2 bg-white border border-[#1A1D20] rounded-lg">
                        <div className="text-[10px] font-black uppercase text-[#1A1D20] font-mono">
                          FILE NEW GRIEVANCE:
                        </div>

                        <div>
                          <label className="text-[9px] font-bold text-gray-500 font-mono block">
                            CATEGORY:
                          </label>
                          <select
                            value={complaintForm.category}
                            onChange={e => setComplaintForm({ ...complaintForm, category: e.target.value })}
                            className="w-full px-2 py-1 text-[10px] border border-gray-300 bg-white rounded font-mono"
                          >
                            <option value="GPU Overheat / Hardware Failure">GPU Overheat / Hardware Failure</option>
                            <option value="Unpaid FLOP Bounty">Unpaid FLOP Bounty</option>
                            <option value="LSPD Helicopter Campers">LSPD Helicopter Harassment</option>
                            <option value="Model Hallucination / Bad Loss">Model Hallucination / Bad Loss</option>
                            <option value="Stolen Server in Trunk">Stolen Server from Car Trunk</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[9px] font-bold text-gray-500 font-mono block">
                            URGENCY LEVEL:
                          </label>
                          <select
                            value={complaintForm.urgency}
                            onChange={e => setComplaintForm({ ...complaintForm, urgency: e.target.value })}
                            className="w-full px-2 py-1 text-[10px] border border-gray-300 bg-white rounded font-mono"
                          >
                            <option value="Low Priority">Routine Grievance</option>
                            <option value="Code Red (Critical)">Code Red (Critical)</option>
                            <option value="FIB Investigation Imminent">5-Star FIB Emergency</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[9px] font-bold text-gray-500 font-mono block">
                            INCIDENT SUMMARY:
                          </label>
                          <textarea
                            rows={2}
                            required
                            placeholder="Describe what happened in Los Santos..."
                            value={complaintForm.details}
                            onChange={e => setComplaintForm({ ...complaintForm, details: e.target.value })}
                            className="w-full px-2 py-1 text-[10px] border border-gray-300 bg-white rounded font-mono"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-1.5 bg-[#FF0055] hover:bg-red-600 text-white font-mono text-[10px] font-black uppercase tracking-wider rounded cursor-pointer"
                        >
                          LODGE GRIEVANCE WITH BUREAU
                        </button>
                      </form>
                    )}

                    {/* Logged Complaints History */}
                    <div className="space-y-1">
                      <div className="text-[9px] font-black text-gray-500 font-mono uppercase">
                        RECORDED GRIEVANCES:
                      </div>
                      {complaints.map(c => (
                        <div key={c.id} className="p-1.5 bg-gray-50 border border-gray-300 rounded text-[9px] font-mono flex items-center justify-between">
                          <div>
                            <span className="font-bold text-[#1A1D20]">#{c.id}: </span>
                            <span className="text-gray-700 truncate inline-block max-w-[150px] align-bottom">
                              {c.subject}
                            </span>
                          </div>
                          <span className={`px-1 py-0.2 text-[8px] font-bold rounded ${c.statusColor} text-[#1A1D20]`}>
                            {c.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ========================================================= */}
                {/* 6. OPERATIVE PROFILE / GAMER CARD VIEW                    */}
                {/* ========================================================= */}
                {activeApp === 'profile' && (
                  <div className="space-y-2 text-left">
                    <div className="flex items-center justify-between border-b border-gray-300 pb-1">
                      <button
                        onClick={() => setActiveApp('home')}
                        className="text-xs font-bold text-[#FF0055] hover:underline cursor-pointer"
                      >
                        &larr; HOME
                      </button>
                      <span className="text-xs font-black font-['Bebas_Neue'] tracking-wider">
                        OPERATIVE GAMER CARD
                      </span>
                      <span className="text-[9px] text-[#2ECC71] font-bold">VERIFIED</span>
                    </div>

                    <div className="p-3 bg-white border-2 border-[#1A1D20] rounded-xl shadow-[3px_3px_0px_#1A1D20] space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full border-2 border-[#1A1D20] bg-gradient-to-tr from-[#FF0055] to-[#FFC700] flex items-center justify-center text-2xl shadow-xs">
                          👤
                        </div>
                        <div>
                          <div className="text-sm font-black font-['Space_Grotesk'] text-[#1A1D20]">
                            NEXUS-01 // FRANKLIN
                          </div>
                          <div className="text-[10px] text-[#FF0055] font-mono font-bold">
                            LEVEL 48 SYNDICATE ARCHITECT
                          </div>
                          <div className="text-[9px] text-gray-500 font-mono">
                            ID: #AIRS-LS-99420
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-gray-200 text-[10px] font-mono">
                        <div className="p-1.5 bg-gray-50 rounded border border-gray-200">
                          <span className="text-gray-500">WANTED LEVEL:</span>
                          <div className="text-[#FFC700] font-black">★★★★★ MAX</div>
                        </div>
                        <div className="p-1.5 bg-gray-50 rounded border border-gray-200">
                          <span className="text-gray-500">FLOP BALANCE:</span>
                          <div className="text-[#2ECC71] font-black">$4,250,000</div>
                        </div>
                        <div className="p-1.5 bg-gray-50 rounded border border-gray-200">
                          <span className="text-gray-500">CREW SQUAD:</span>
                          <div className="text-[#00E5FF] font-black">ALPHA TEAM</div>
                        </div>
                        <div className="p-1.5 bg-gray-50 rounded border border-gray-200">
                          <span className="text-gray-500">SAFEHOUSE:</span>
                          <div className="text-[#1A1D20] font-black">DEL PERRO</div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        soundEngine.playSelect();
                        setActiveApp('join_crew');
                      }}
                      className="w-full py-1.5 bg-[#2ECC71] text-white font-mono text-xs font-bold rounded cursor-pointer text-center"
                    >
                      SWITCH CREW ROLE &rarr;
                    </button>
                  </div>
                )}

              </div>

              {/* Phone Bottom Home Bar */}
              <div className="bg-white py-2 border-t border-gray-200 flex justify-center">
                <button
                  onClick={() => {
                    soundEngine.playSelect();
                    setActiveApp('home');
                  }}
                  title="Return to iFruit Home Screen"
                  className="w-24 h-1.5 bg-gray-400 hover:bg-black rounded-full cursor-pointer transition-colors"
                />
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
