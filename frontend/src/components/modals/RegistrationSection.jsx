import React, { useState } from 'react';
import { soundEngine } from '../../utils/audio';

export default function RegistrationSection() {
  const [formData, setFormData] = useState({
    callsign: '',
    email: '',
    studentId: '',
    track: 'agents',
    skillLevel: 'intermediate',
    github: '',
    statement: '',
    agreed: false
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'transmitting' | 'confirmed'
  const [generatedBadge, setGeneratedBadge] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    soundEngine.playCash();
    setStatus('transmitting');

    setTimeout(() => {
      soundEngine.playSuccess();
      const serial = 'LS-AIRS-' + Math.floor(100000 + Math.random() * 900000);
      setGeneratedBadge({
        callsign: formData.callsign.toUpperCase(),
        serial,
        track: formData.track.toUpperCase(),
        timestamp: new Date().toLocaleTimeString(),
        rank: formData.skillLevel.toUpperCase()
      });
      setStatus('confirmed');
    }, 1600);
  };

  const handleReset = () => {
    soundEngine.playModalOpen();
    setStatus('idle');
    setFormData({
      callsign: '',
      email: '',
      studentId: '',
      track: 'agents',
      skillLevel: 'intermediate',
      github: '',
      statement: '',
      agreed: false
    });
  };

  if (status === 'confirmed' && generatedBadge) {
    return (
      <div className="space-y-6 text-center">
        <div className="neo-box p-6 bg-gradient-to-tr from-green-50 via-white to-pink-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#2ECC71] text-white px-3 py-1 text-[11px] font-mono font-bold tracking-widest uppercase">
            CLEARANCE ISSUED // CREW LOCKED
          </div>

          <div className="w-16 h-16 mx-auto mb-3 border-2 border-[#1A1D20] bg-[#2ECC71] rounded-full flex items-center justify-center text-white text-2xl shadow-[3px_3px_0px_#1A1D20]">
            ✓
          </div>

          <h3 className="text-3xl font-black font-['Bebas_Neue'] text-[#1A1D20] uppercase tracking-wider">
            HEIST CREW APPLICATION VERIFIED
          </h3>
          <p className="text-xs text-gray-700 font-['Space_Grotesk'] max-w-md mx-auto">
            Welcome to the front line. Your Los Santos operative badge has been dispatched to your dispatch comms.
          </p>

          {/* GTA Operative License Card */}
          <div className="mt-5 p-4 bg-white border-2 border-[#1A1D20] shadow-[5px_5px_0px_#1A1D20] text-left max-w-md mx-auto space-y-2 text-xs">
            <div className="flex justify-between items-center border-b-2 border-[#1A1D20] pb-2">
              <span className="font-['Bebas_Neue'] text-lg text-[#1A1D20]">LOS SANTOS // AIRS OPERATIVE LICENSE</span>
              <span className="text-xl">🌴</span>
            </div>
            
            <div className="flex gap-3 pt-2">
              {/* Avatar Box */}
              <div className="w-20 h-24 bg-gray-100 border-2 border-[#1A1D20] flex flex-col items-center justify-center text-center p-1">
                <span className="text-3xl">👤</span>
                <span className="text-[8px] font-mono font-bold text-gray-500 mt-1">VERIFIED</span>
              </div>

              {/* Data Fields */}
              <div className="flex-1 space-y-1.5 font-mono">
                <div className="flex justify-between border-b border-gray-200 pb-1">
                  <span className="text-gray-500 text-[10px]">CALLSIGN:</span>
                  <span className="font-bold text-[#FF0055]">{generatedBadge.callsign}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-1">
                  <span className="text-gray-500 text-[10px]">SERIAL NO:</span>
                  <span className="font-bold text-[#1A1D20]">{generatedBadge.serial}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-1">
                  <span className="text-gray-500 text-[10px]">TRACK:</span>
                  <span className="font-bold text-[#2ECC71]">{generatedBadge.track}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-[10px]">TIME:</span>
                  <span className="text-gray-700">{generatedBadge.timestamp}</span>
                </div>
              </div>
            </div>

            {/* Fake Barcode Graphic */}
            <div className="pt-2 flex justify-between items-center opacity-80 border-t border-gray-200">
              <div className="h-6 flex items-end gap-1">
                {[14, 20, 8, 24, 12, 18, 10, 22, 14, 18, 8, 20, 14].map((h, i) => (
                  <div key={i} className="bg-[#1A1D20] w-1" style={{ height: `${h}px` }} />
                ))}
              </div>
              <span className="text-[10px] font-mono font-bold text-gray-600">AUTH: AIRS_SEC_5</span>
            </div>
          </div>

          <div className="mt-5">
            <button
              onClick={handleReset}
              className="neo-btn px-4 py-2 bg-white text-xs font-mono font-bold tracking-wider uppercase cursor-pointer"
            >
              ENLIST ANOTHER OPERATIVE
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="neo-box p-4 bg-yellow-50 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono text-[#FF0055] font-bold uppercase tracking-widest">
            ENLISTMENT MANIFEST // 2026 COHORT
          </span>
          <div className="text-lg font-black font-['Bebas_Neue'] text-[#1A1D20]">
            JOIN THE SYNDICATE HEIST CREW
          </div>
        </div>
        <span className="text-xs font-mono font-bold bg-[#1A1D20] text-white px-2 py-1">
          28 SLOTS OPEN
        </span>
      </div>

      {/* Neubrutalist Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono font-bold text-gray-700 uppercase mb-1">
              OPERATIVE CALLSIGN / FULL NAME *
            </label>
            <input
              type="text"
              name="callsign"
              required
              value={formData.callsign}
              onChange={handleChange}
              placeholder="e.g. Maya Chen // CyberFox"
              className="w-full bg-white border-2 border-[#1A1D20] px-3 py-2 text-xs text-[#1A1D20] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF0055] font-mono shadow-[2px_2px_0px_#1A1D20]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold text-gray-700 uppercase mb-1">
              COMM FREQUENCY / UNIVERSITY EMAIL *
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="operative@university.edu"
              className="w-full bg-white border-2 border-[#1A1D20] px-3 py-2 text-xs text-[#1A1D20] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF0055] font-mono shadow-[2px_2px_0px_#1A1D20]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono font-bold text-gray-700 uppercase mb-1">
              STUDENT ID / ROLL NUMBER *
            </label>
            <input
              type="text"
              name="studentId"
              required
              value={formData.studentId}
              onChange={handleChange}
              placeholder="e.g. 2024-CS-0842"
              className="w-full bg-white border-2 border-[#1A1D20] px-3 py-2 text-xs text-[#1A1D20] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF0055] font-mono shadow-[2px_2px_0px_#1A1D20]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold text-gray-700 uppercase mb-1">
              GITHUB / CODE DOSSIER URL *
            </label>
            <input
              type="url"
              name="github"
              required
              value={formData.github}
              onChange={handleChange}
              placeholder="https://github.com/username"
              className="w-full bg-white border-2 border-[#1A1D20] px-3 py-2 text-xs text-[#1A1D20] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF0055] font-mono shadow-[2px_2px_0px_#1A1D20]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono font-bold text-gray-700 uppercase mb-1">
              PRIMARY SPECIALIZATION TRACK *
            </label>
            <select
              name="track"
              value={formData.track}
              onChange={handleChange}
              className="w-full bg-white border-2 border-[#1A1D20] px-3 py-2 text-xs text-[#1A1D20] focus:outline-none focus:ring-2 focus:ring-[#FF0055] font-mono shadow-[2px_2px_0px_#1A1D20]"
            >
              <option value="agents">Autonomous Agents & Reasoning</option>
              <option value="vision">Computer Vision & Robotics</option>
              <option value="mlops">Distributed MLOps & Hardware Acceleration</option>
              <option value="data">Synthetic Data & Quantization</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold text-gray-700 uppercase mb-1">
              SELF-ASSESSED OPERATIONAL RANK *
            </label>
            <select
              name="skillLevel"
              value={formData.skillLevel}
              onChange={handleChange}
              className="w-full bg-white border-2 border-[#1A1D20] px-3 py-2 text-xs text-[#1A1D20] focus:outline-none focus:ring-2 focus:ring-[#FF0055] font-mono shadow-[2px_2px_0px_#1A1D20]"
            >
              <option value="novice">Initiate // Ready to learn and grind</option>
              <option value="intermediate">Hacker // Built projects, know PyTorch</option>
              <option value="veteran">Specialist // Deployed models, won hackathons</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-mono font-bold text-gray-700 uppercase mb-1">
            MISSION DIRECTIVE // WHAT DO YOU WANT TO BUILD AT AIRS?
          </label>
          <textarea
            name="statement"
            rows="3"
            required
            value={formData.statement}
            onChange={handleChange}
            placeholder="Tell us about the hardest technical hurdle you conquered or what model architecture you want to build with us..."
            className="w-full bg-white border-2 border-[#1A1D20] px-3 py-2 text-xs text-[#1A1D20] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF0055] font-['Space_Grotesk'] shadow-[2px_2px_0px_#1A1D20]"
          />
        </div>

        <div className="flex items-start gap-2 pt-1">
          <input
            type="checkbox"
            id="agreed"
            name="agreed"
            required
            checked={formData.agreed}
            onChange={handleChange}
            className="mt-1 accent-[#FF0055] w-4 h-4"
          />
          <label htmlFor="agreed" className="text-xs text-gray-700 font-['Space_Grotesk'] cursor-pointer">
            I understand that AIRS is an active engineering syndicate. I commit to attending build marathons and shipping real production models.
          </label>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={status === 'transmitting'}
            onMouseEnter={() => soundEngine.playHover()}
            className="neo-btn w-full py-3.5 bg-[#FF0055] hover:bg-[#ff1a66] text-white font-['Bebas_Neue'] text-xl tracking-wider uppercase cursor-pointer flex items-center justify-center gap-2 shadow-[4px_4px_0px_#1A1D20]"
          >
            {status === 'transmitting' ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>TRANSMITTING TO AIRS SERVER CLUSTER...</span>
              </>
            ) : (
              <>
                <span>TRANSMIT ENLISTMENT CONTRACT</span>
                <span className="text-2xl font-bold">&rarr;</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
