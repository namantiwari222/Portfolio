import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { CinematicEnergyRibbon } from './CinematicEnergyRibbon';
import {
  Flame,
  Zap,
  Power,
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface TechCard {
  id: string;
  name: string;
  category: string;
  tag: string;
  iconText: string;
}

interface CurvedHoloCard extends TechCard {
  gradient: string;
  xOffset: number;
  yOffset: number;
  zDistance: number;
  rotateY: number;
  rotateZ: number;
  svgX: number;
  svgY: number;
}

const TECH_CARDS: TechCard[] = [
  { id: 'java', name: 'Java', category: 'Programming', tag: 'Core language', iconText: '☕' },
  { id: 'python', name: 'Python', category: 'Programming', tag: 'Data & scripting', iconText: '🐍' },
  { id: 'dsa', name: 'DSA', category: 'Computer science', tag: 'Data structures & algorithms', iconText: '⌘' },
  { id: 'dbms', name: 'DBMS', category: 'Computer science', tag: 'Database management systems', iconText: '▤' },
  { id: 'git', name: 'Git', category: 'Tools', tag: 'Version control', iconText: '⑂' },
  { id: 'github', name: 'GitHub', category: 'Tools', tag: 'Code collaboration', iconText: '◉' },
  { id: 'android-studio', name: 'Android Studio', category: 'Tools', tag: 'Android development IDE', iconText: 'AS' },
  { id: 'database', name: 'Database', category: 'Data', tag: 'Data storage', iconText: '▥' },
  { id: 'mysql', name: 'MySQL', category: 'Database', tag: 'Relational database', iconText: '🐬' },
  { id: 'mongodb', name: 'MongoDB', category: 'Database', tag: 'Document database', iconText: '🍃' },
  { id: 'android', name: 'Android', category: 'Mobile', tag: 'App development', iconText: '◉' },
  { id: 'ai', name: 'AI / ML', category: 'Artificial intelligence', tag: 'Machine learning', iconText: '✳' },
  { id: 'apis', name: 'APIs', category: 'Integration', tag: 'Service integration', iconText: '{ }' },
];

const HOLO_CARDS: CurvedHoloCard[] = [
  {
    id: 'java',
    name: 'Java',
    category: 'Programming',
    tag: 'Core Language',
    iconText: '☕ Java',
    gradient: 'from-amber-600/35 to-orange-600/25 border-amber-500/70 shadow-[0_0_30px_rgba(245,158,11,0.35)]',
    xOffset: -38,
    yOffset: -10,
    zDistance: 60,
    rotateY: 24,
    rotateZ: -3,
    svgX: 160,
    svgY: 300,
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Programming',
    tag: 'Data & Scripting',
    iconText: '🐍 Python',
    gradient: 'from-emerald-600/35 to-teal-600/25 border-emerald-400/70 shadow-[0_0_30px_rgba(16,185,129,0.35)]',
    xOffset: 38,
    yOffset: 26,
    zDistance: 60,
    rotateY: -24,
    rotateZ: 3,
    svgX: 840,
    svgY: 560,
  },
];

export const CinematicTechUniverse: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<TechCard | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPoweredOn, setIsPoweredOn] = useState<boolean>(false);
  const [powerPulse, setPowerPulse] = useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  // Web Audio synthesizer for tactile holographic ignition feedback
  const playPowerSound = (turnOn: boolean) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      if (turnOn) {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(680, ctx.currentTime + 0.38);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.07, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.32);
      }
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch {
      // Audio is an enhancement; proceed seamlessly if blocked
    }
  };

  const togglePower = () => {
    const nextState = !isPoweredOn;
    setIsPoweredOn(nextState);
    if (!nextState) setSelectedSkill(null);
    playPowerSound(nextState);
    setPowerPulse(true);
    setTimeout(() => setPowerPulse(false), 900);
  };

  const ORIGIN_X = 500;
  const ORIGIN_Y = 565;

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen py-24 px-4 sm:px-6 w-full flex flex-col justify-center items-center overflow-hidden bg-[#02040a] select-none"
    >
      {/* 3D Energy Spline / Particle Ribbon swirling around scene */}
      <CinematicEnergyRibbon color="#ef4444" speed={1.1} />

      {/* Atmospheric Background Ambient Radiance (Deep neutral cosmic tone, no red/yellow wash) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-slate-900/30 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* Scene Header */}
      <div className="relative z-30 text-center max-w-3xl mx-auto mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-red-500/40 bg-red-950/60 text-red-300 text-xs font-mono tracking-[0.25em] uppercase mb-3 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
          <Flame className="w-3.5 h-3.5 text-red-400 animate-pulse" />
          <span>SCENE 02</span>
        </div>

        <h2
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase leading-none"
          style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
        >
          THE TECH{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-yellow-300 drop-shadow-[0_0_35px_rgba(239,68,68,0.5)]">
            UNIVERSE
          </span>
        </h2>

        <div className="mt-2 flex items-center justify-center gap-2 text-xs font-mono tracking-widest text-slate-400 uppercase">
          <span className="text-white font-bold">NAMAN TIWARI</span>
          <span className="text-slate-600">•</span>
          <span className="text-amber-300">CSE & AI/ML</span>
        </div>
      </div>

      {/* Holographic Power HUD Status & Quick Toggle */}
      <div className="relative z-30 mb-4 flex items-center gap-3">
        <button
          onClick={togglePower}
          className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider flex items-center gap-2 transition-all duration-300 border ${
            isPoweredOn
              ? 'bg-amber-500/20 border-amber-400/80 text-amber-200 shadow-[0_0_25px_rgba(245,158,11,0.5)]'
              : 'bg-red-950/80 border-red-500/50 text-red-300 hover:border-red-400 hover:bg-red-900/60 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
          }`}
        >
          <Power className={`w-3.5 h-3.5 ${isPoweredOn ? 'text-amber-300 animate-pulse' : 'text-red-400'}`} />
          <span>{isPoweredOn ? 'BACK TO MODEL' : 'VIEW TECHNOLOGIES'}</span>
          <span
            className={`w-2 h-2 rounded-full ${
              isPoweredOn ? 'bg-amber-400 animate-ping' : 'bg-red-500'
            }`}
          />
        </button>

        {isPoweredOn && (
          <button
            onClick={() => {
              setIsPoweredOn(false);
              setSelectedSkill(null);
              playPowerSound(false);
            }}
            className="p-1.5 rounded-full border border-slate-700 hover:border-amber-400 text-slate-400 hover:text-white transition-colors text-xs"
            title="Reset Tech Universe to Standby"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* The model toggles to a straight technology grid when powered on. */}
      <div
        className={`relative z-20 w-full max-w-6xl flex items-center justify-center ${
          isPoweredOn
            ? 'min-h-[520px] py-8'
            : 'h-[680px] sm:h-[760px] md:h-[820px]'
        }`}
      >
        {isPoweredOn ? (
          <div className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 px-2 sm:px-6">
            {TECH_CARDS.map((card, index) => {
              const isSelected = selectedSkill?.id === card.id;

              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setSelectedSkill(card)}
                  className={`min-h-24 sm:min-h-28 rounded-2xl border p-3 sm:p-4 text-left bg-slate-950/55 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300/70 hover:bg-slate-900/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
                    isSelected
                      ? 'border-amber-300 shadow-[0_0_24px_rgba(245,158,11,0.3)]'
                      : 'border-red-500/30'
                  }`}
                  style={{
                    animation: 'tech-card-appear 400ms ease-out both',
                    animationDelay: `${index * 55}ms`,
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex h-9 min-w-9 items-center justify-center rounded-xl border border-red-400/30 bg-red-950/50 px-2 text-lg text-amber-200">
                      {card.iconText}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-slate-400 text-right">
                      {card.category}
                    </span>
                  </div>
                  <span className="mt-3 block text-sm sm:text-base font-bold text-white">{card.name}</span>
                  <span className="mt-1 block text-[10px] sm:text-xs text-amber-200/80">{card.tag}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <>
        {/* ========================================================================= */}
        {/* GLOWING ORANGE LIGHT BEAMS: ORIGINATING FROM UNDER MODEL'S FEET           */}
        {/* Crisp vector paths connecting feet origin out to each holographic card    */}
        {/* ========================================================================= */}
        <svg
          viewBox="0 0 1000 700"
          className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible transition-opacity duration-700 ease-out"
          style={{
            opacity: isPoweredOn ? 1 : 0.08,
          }}
        >
          <defs>
            {/* Crisp glowing orange gradient for the beams */}
            <linearGradient id="orangeBeamGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ea580c" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#f97316" stopOpacity="0.9" />
              <stop offset="80%" stopColor="#fbbf24" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id="radialBeamPulse" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f97316" stopOpacity="1" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.3" />
            </linearGradient>

            <filter id="crispOrangeGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur1" />
              <feGaussianBlur stdDeviation="7" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Radiating Crisp Orange Beams from Naman's Feet (ORIGIN_X, ORIGIN_Y) to each card */}
          {HOLO_CARDS.map((card, idx) => {
            // Smooth quadratic curve from feet anchor to card
            const midX = ORIGIN_X + (card.svgX - ORIGIN_X) * 0.45;
            const midY = ORIGIN_Y + (card.svgY - ORIGIN_Y) * 0.25;
            const pathData = `M ${ORIGIN_X} ${ORIGIN_Y} Q ${midX} ${midY} ${card.svgX} ${card.svgY}`;

            return (
              <g key={`beam-${card.id}`}>
                {/* Ambient Soft Glow Beam Track */}
                <path
                  d={pathData}
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="4"
                  strokeOpacity={isPoweredOn ? 0.35 : 0.08}
                  strokeLinecap="round"
                  filter="url(#crispOrangeGlow)"
                />
                {/* Crisp Primary Orange Core Beam */}
                <path
                  d={pathData}
                  fill="none"
                  stroke="url(#orangeBeamGrad)"
                  strokeWidth={isPoweredOn ? '2.2' : '1'}
                  strokeDasharray={isPoweredOn ? '10 6' : '3 12'}
                  strokeLinecap="round"
                  className={isPoweredOn ? 'animate-pulse' : ''}
                  style={{
                    filter: 'drop-shadow(0 0 6px rgba(249,115,22,0.9)) drop-shadow(0 0 12px rgba(239,68,68,0.5))',
                    animation: isPoweredOn ? `dashFlow 2s linear infinite ${idx * 0.15}s` : 'none',
                  }}
                />
                {/* Card Target Energy Node */}
                {isPoweredOn && (
                  <circle
                    cx={card.svgX}
                    cy={card.svgY}
                    r="4.5"
                    fill="#fbbf24"
                    filter="url(#crispOrangeGlow)"
                    className="animate-ping"
                    style={{ animationDuration: '2.5s', animationDelay: `${idx * 0.2}s` }}
                  />
                )}
              </g>
            );
          })}

          {/* Central Origin Nexus Node directly under feet */}
          <g transform={`translate(${ORIGIN_X}, ${ORIGIN_Y})`}>
            {/* Concentric expanding ripples */}
            <ellipse
              cx="0"
              cy="0"
              rx={isPoweredOn ? '48' : '26'}
              ry={isPoweredOn ? '16' : '9'}
              fill="none"
              stroke="#f97316"
              strokeWidth="1.5"
              strokeOpacity="0.75"
              filter="url(#crispOrangeGlow)"
              className="animate-ping"
              style={{ animationDuration: '2.8s' }}
            />
            <ellipse
              cx="0"
              cy="0"
              rx="32"
              ry="11"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2"
              strokeOpacity="0.9"
              filter="url(#crispOrangeGlow)"
            />
            <ellipse
              cx="0"
              cy="0"
              rx="18"
              ry="6"
              fill="url(#radialBeamPulse)"
              filter="url(#crispOrangeGlow)"
            />
            {/* Bright core center spark */}
            <circle cx="0" cy="0" r="3.5" fill="#ffffff" />
          </g>
        </svg>

        {/* 3D Curved Amphitheater Holographic Cards */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
          style={{
            transform: `rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 10}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {HOLO_CARDS.map((card, index) => {
            const isHovered = selectedSkill?.id === card.id;

            return (
              <div
                key={card.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSkill(card);
                }}
                className={`absolute cursor-pointer p-3.5 sm:p-4 rounded-2xl border-2 backdrop-blur-md bg-[#02040a]/90 ${
                  card.gradient
                } ${
                  isHovered
                    ? 'scale-125 z-40 shadow-[0_0_45px_rgba(249,115,22,0.8)] ring-2 ring-white'
                    : 'hover:scale-110 hover:shadow-[0_0_30px_rgba(245,158,11,0.6)]'
                } ${
                  isPoweredOn
                    ? 'opacity-100 scale-100 pointer-events-auto'
                    : 'opacity-0 scale-50 pointer-events-none'
                }`}
                style={{
                  left: `calc(50% + ${card.xOffset}%)`,
                  top: `calc(50% + ${card.yOffset}%)`,
                  transform: isPoweredOn
                    ? `translate(-50%, -50%) translateZ(${card.zDistance}px) rotateY(${card.rotateY}deg) rotateZ(${card.rotateZ}deg)`
                    : `translate(-50%, -50%) translateZ(0px) scale(0.4)`,
                  transformStyle: 'preserve-3d',
                  minWidth: '150px',
                  transition: `transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease-out, filter 0.3s ease`,
                  transitionDelay: isPoweredOn ? `${index * 80}ms` : '0ms',
                }}
              >
                {/* Holographic scanline sheen */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none opacity-40">
                  <div className="w-full h-full bg-gradient-to-b from-transparent via-white/10 to-transparent animate-pulse" />
                </div>

                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-semibold">
                    {card.category}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                </div>

                <div className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-1.5">
                  <span>{card.iconText}</span>
                </div>

                <div className="mt-1.5 pt-1.5 border-t border-white/10 text-xs font-mono text-amber-300 font-semibold tracking-wide flex items-center gap-1">
                  <span className="text-orange-400 text-[10px]">▸</span>
                  <span>{card.tag}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* CENTER SILHOUETTE: STANDING FROM BEHIND (PRECISE GEOMETRIC CENTER)         */}
        {/* - Scale decreased slightly to balance spacing and prevent dead space       */}
        {/* - Floating square box eliminated via smooth radial feather masking         */}
        {/* - Grounded with soft oval contact shadow beneath shoes on platform         */}
        {/* - Light beams integrate right beneath feet origin nexus                    */}
        {/* - Crimson rim on right edge, deep amber rim on left edge                   */}
        {/* ========================================================================= */}
        <div
          onClick={togglePower}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center cursor-pointer group"
          style={{ transformStyle: 'preserve-3d' }}
          title={isPoweredOn ? 'Click to switch Command Core to standby' : 'Click to power on holographic tech stack'}
        >
          {/* Interactive Power-On Callout Prompt (Visible when unpowered or on hover) */}
          <div
            className={`absolute -top-14 z-40 px-3.5 py-1.5 rounded-full backdrop-blur-md text-[11px] font-mono tracking-wider flex items-center gap-2 transition-all duration-300 pointer-events-none whitespace-nowrap ${
              !isPoweredOn
                ? 'bg-gradient-to-r from-amber-500/25 via-orange-500/35 to-red-500/25 border border-orange-500/70 text-amber-200 shadow-[0_0_25px_rgba(249,115,22,0.6)] animate-bounce'
                : 'bg-black/80 border border-slate-700/70 text-slate-300 opacity-0 group-hover:opacity-100'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${!isPoweredOn ? 'text-amber-300 animate-pulse' : 'text-slate-400'}`} />
              <span>{!isPoweredOn ? 'CLICK MODEL TO VIEW TECHNOLOGIES' : 'USE BUTTON ABOVE TO RETURN TO MODEL'}</span>
          </div>

          {/* Ground Platform Pedestal with Perspective Floor Rings */}
          <div className="absolute -bottom-8 flex flex-col items-center pointer-events-none">
            {/* Outer Pedestal Ring */}
            <div
              className="w-80 sm:w-96 md:w-[420px] h-28 rounded-full border border-orange-500/40 bg-orange-950/20 shadow-[0_0_45px_rgba(249,115,22,0.35)] transition-all duration-500"
              style={{
                transform: 'rotateX(75deg)',
              }}
            />
            {/* Inner Glowing Ring */}
            <div
              className="absolute top-2 w-64 sm:w-72 md:w-80 h-18 rounded-full border border-amber-400/60 shadow-[0_0_35px_rgba(251,191,36,0.5)] transition-all duration-500"
              style={{
                transform: 'rotateX(75deg)',
              }}
            />

            {/* Power Ignition Shockwave Ring (expands on power-on click) */}
            {powerPulse && (
              <div
                className="absolute top-1 w-96 h-28 rounded-full border-2 border-orange-400 bg-orange-500/30 animate-ping pointer-events-none"
                style={{
                  transform: 'rotateX(75deg)',
                  animationDuration: '0.85s',
                }}
              />
            )}

            {/* Soft, Oval Contact Shadows Beneath Shoes on Platform */}
            {/* Primary deep contact shadow directly under shoe soles */}
            <div className="absolute -top-3 w-48 sm:w-56 h-5 rounded-full bg-black/95 blur-[2.5px]" />
            {/* Soft broader ambient ground contact shadow */}
            <div className="absolute -top-4 w-72 sm:w-84 h-12 rounded-full bg-black/90 blur-[12px]" />

            {/* Foot-level Subtle Reflection Glow (originating from the model's feet) */}
            <div
              className="absolute -top-5 w-56 sm:w-64 h-8 rounded-full blur-[14px] transition-opacity duration-500"
              style={{
                background: 'radial-gradient(ellipse, rgba(249,115,22,0.7) 0%, rgba(245,158,11,0.25) 60%, transparent 100%)',
                opacity: isPoweredOn ? 0.85 : 0.3,
              }}
            />
          </div>

          {/* Silhouette Figure Container (Background Removed, Clean Transparent Cutout & Increased Model Size) */}
          <div
            className="relative w-60 sm:w-72 md:w-84 lg:w-96 aspect-[1/3] max-h-[520px] sm:max-h-[600px] md:max-h-[660px] transition-transform duration-500 group-hover:scale-[1.02]"
          >
            {/* Full-Length Model Cutout Image facing away - 100% Transparent Background, No Red/Yellow Backing */}
            <img
              src={PERSONAL_INFO.backSilhouetteImage || PERSONAL_INFO.modelImage}
              alt="Naman Tiwari - Back View Silhouette (Command Core)"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain object-bottom transition-all duration-500"
              style={{
                filter: isPoweredOn
                  ? 'drop-shadow(0 0 16px rgba(255,255,255,0.18)) drop-shadow(0 0 28px rgba(249,115,22,0.25)) contrast(108%) brightness(102%)'
                  : 'drop-shadow(0 0 10px rgba(255,255,255,0.08)) contrast(104%) brightness(98%)',
              }}
            />
          </div>

        </div>
          </>
        )}
      </div>

      {/* Interactive Inspector for Clicked Skill */}
      {selectedSkill && (
        <div className="relative z-40 mt-4 p-4 rounded-2xl border border-red-500/50 bg-[#02040a]/95 backdrop-blur-xl max-w-lg mx-auto text-center shadow-[0_0_40px_rgba(239,68,68,0.35)] animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-red-400 font-bold uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>ACTIVE MODULE: {selectedSkill.name}</span>
            </span>
            <button
              onClick={() => setSelectedSkill(null)}
              className="text-xs font-mono text-slate-400 hover:text-white px-2 py-0.5 rounded border border-slate-800 hover:border-slate-600"
            >
              ✕ CLOSE
            </button>
          </div>
          <p className="text-xs font-mono text-slate-300 leading-relaxed">
            Specialized engineering competency in {selectedSkill.name} — <strong className="text-amber-300">{selectedSkill.tag}</strong> — applied across Naman's real-world software systems, data engineering, and algorithmic problem solving.
          </p>
        </div>
      )}

      {/* Floating Explore Tip */}
      <div className="mt-8 text-center text-[10px] font-mono text-slate-500 tracking-widest uppercase flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
        <span>
          {isPoweredOn
            ? 'SELECT A TECH CARD TO INSPECT • USE THE BUTTON ABOVE TO RETURN TO MODEL'
            : 'CLICK MODEL TO VIEW ALL TECHNOLOGIES'}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
      </div>
    </section>
  );
};
