import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Sparkles, GraduationCap } from 'lucide-react';

interface TimelineYearData {
  year: string;
  degree: string;
  institution: string;
  details: string;
  badge: string;
  xPos: number;  // % offset on curved trajectory
  yPos: number;
}

const TIMELINE_DATA: TimelineYearData[] = [
  {
    year: '2020',
    degree: 'Class 10 (Secondary)',
    institution: 'Foundational Schooling',
    details: 'Completed Class 10 under UP Board in Auraiya with a strong foundation in core subjects. Developed foundational computer skills including MS Office and basic operational knowledge.',
    badge: 'FOUNDATION',
    xPos: -38,
    yPos: 18,
  },
  {
    year: '2022',
    degree: 'Class 12 (Intermediate)',
    institution: 'Higher Secondary Science',
    details: 'Completed Class 12 under UP Board in Auraiya with PCM core. Physics, Mathematics, and core subjects strengthening analytical and logical foundations.',
    badge: 'HIGHER SECONDARY',
    xPos: -20,
    yPos: 4,
  },
  {
    year: '2025',
    degree: 'B.Sc',
    institution: 'CSJMU / Science Faculty',
    details: 'Graduated B.Sc. in PCM (Physics, Chemistry, Mathematics) from Chhatrapati Shahu Ji Maharaj University (CSJMU), Kanpur.',
    badge: 'GRADUATE',
    xPos: 0,
    yPos: -6,
  },
  {
    year: '2028',
    degree: 'B.Tech — Computer Science Engineering',
    institution: 'GL Bajaj Group of Institution, Mathura',
    details: 'Specialization in Artificial Intelligence & Machine Learning. Core focus: Deep Learning, System Design, Scalable Cloud Architectures & DSA.',
    badge: 'CURRENT SPECIALIZATION',
    xPos: 24,
    yPos: 6,
  },
  {
    year: 'BEYOND',
    degree: 'Mastery & Industry Impact',
    institution: 'Global Tech & AI Frontiers',
    details: 'Planning for advanced specialization through Master\'s after gaining industry experience, focusing on scalable systems, core architecture, and advanced technologies.',
    badge: 'FUTURE EXPEDITION',
    xPos: 42,
    yPos: 20,
  },
];

export const CinematicThroughTime: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<TimelineYearData>(TIMELINE_DATA[3]); // Default to 2028 (current B.Tech)

  return (
    <section
      className="relative min-h-screen py-24 px-4 sm:px-6 w-full flex flex-col justify-center items-center overflow-hidden bg-transparent select-none"
    >
      {/* Background radial amber glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-amber-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-red-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Header (Matches 00:12 in video) */}
      <div className="relative z-30 text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-amber-500/40 bg-amber-950/60 text-amber-300 text-xs font-mono tracking-[0.25em] uppercase mb-3 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>SCENE 03</span>
        </div>

        <h2
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase leading-none"
          style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
        >
          THROUGH{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200 drop-shadow-[0_0_35px_rgba(245,197,66,0.5)]">
            TIME
          </span>
        </h2>

        <p className="mt-2 text-xs sm:text-sm font-mono tracking-widest text-slate-400 uppercase">
          ACADEMIC & CODE ODYSSEY • 2020 TO 2028 & BEYOND
        </p>
      </div>

      <div className="relative z-20 w-full max-w-5xl h-[560px] sm:h-[640px] flex items-center justify-center">
        
        {/* Massive Arch Clock Dial Ring */}
        <div className="absolute top-10 w-[380px] h-[380px] sm:w-[580px] sm:h-[580px] md:w-[720px] md:h-[720px] rounded-full border border-amber-500/20 pointer-events-none">
          {/* Outer dashed ring */}
          <div className="absolute inset-4 rounded-full border border-dashed border-amber-500/15 animate-spin-slow" />
          
          {/* Tick marks on dial perimeter */}
          {Array.from({ length: 36 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[1.5px] h-3 bg-amber-500/30 origin-bottom"
              style={{
                transform: `rotate(${i * 10}deg) translateY(0px)`,
                height: i % 3 === 0 ? '10px' : '5px',
                backgroundColor: i % 3 === 0 ? 'rgba(245,158,11,0.6)' : 'rgba(245,158,11,0.2)',
              }}
            />
          ))}
        </div>

        {/* Year Pills Floating on Arc */}
        <div className="absolute inset-0 flex items-center justify-center">
          {TIMELINE_DATA.map((item) => {
            const isCurrent = selectedYear.year === item.year;

            return (
              <button
                key={item.year}
                onClick={() => setSelectedYear(item)}
                className={`absolute z-30 transition-all duration-300 px-3.5 py-1.5 rounded-full font-mono text-xs sm:text-sm tracking-wider border ${
                  isCurrent
                    ? 'border-amber-300 bg-[rgba(15,15,15,0.20)] text-amber-200 shadow-[0_0_20px_rgba(245,197,66,0.3)] scale-105 font-bold'
                    : 'border-amber-500/30 bg-[rgba(15,15,15,0.20)] text-slate-300 hover:text-amber-200 hover:border-amber-300/70 hover:-translate-y-0.5 scale-100'
                }`}
                style={{
                  left: `calc(50% + ${item.xPos}%)`,
                  top: `calc(32% + ${item.yPos}%)`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <span>{item.year}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* CENTER SILHOUETTE: STANDING AT THE CENTER OF CONCENTRIC LIGHT RINGS       */}
        {/* ========================================================================= */}
        <div className="relative z-20 flex flex-col items-center justify-center mt-12 pointer-events-none">
          {/* Concentric floor circles glowing with orange/amber light */}
          <div className="absolute bottom-6 w-60 h-20 rounded-full border-2 border-amber-500/60 bg-amber-950/40 blur-[1px] shadow-[0_0_60px_rgba(245,158,11,0.8)] animate-pulse" />
          <div className="absolute bottom-8 w-44 h-14 rounded-full border border-yellow-400/60" />
          <div className="absolute bottom-10 w-28 h-10 rounded-full border border-white/40" />

          {/* Silhouette Figure */}
          <div className="relative w-48 sm:w-56 md:w-64 aspect-[9/16] max-h-[46vh] rounded-2xl overflow-hidden filter contrast-125 brightness-95">
            <img
              src={PERSONAL_INFO.backSilhouetteImage || PERSONAL_INFO.modelImage}
              alt="Naman Tiwari - Back View"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
            {/* Dark floor fade */}
            <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#02040a] via-[#02040a]/80 to-transparent" />
          </div>
        </div>

        {/* Floating Active Milestone Detail Card (Bottom right / Center) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 w-full max-w-lg px-4">
          <div className="p-5 sm:p-6 rounded-2xl border border-amber-300/50 bg-[rgba(15,15,15,0.20)] backdrop-blur-[3px] shadow-[0_12px_32px_rgba(0,0,0,0.18),0_0_24px_rgba(245,197,66,0.1)] hover:-translate-y-1 hover:border-amber-200/80 hover:shadow-[0_14px_40px_rgba(0,0,0,0.2),0_0_30px_rgba(245,197,66,0.2)] text-center sm:text-left transition-all duration-300">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-space font-bold tracking-widest text-amber-200 bg-[rgba(15,15,15,0.20)] border border-amber-300/50">
                {selectedYear.year} • {selectedYear.badge}
              </span>
              <GraduationCap className="w-5 h-5 text-amber-300" />
            </div>

            <h3 className="font-space text-lg sm:text-xl font-bold text-amber-50 mb-1">
              {selectedYear.degree}
            </h3>

            <p className="font-inter text-xs text-amber-200/90 font-semibold mb-2">
              {selectedYear.institution}
            </p>

            <p className="font-inter text-xs text-slate-200 leading-relaxed">
              {selectedYear.details}
            </p>
          </div>
        </div>

      </div>

      <div className="mt-8 text-center text-[10px] font-mono text-slate-500 tracking-widest uppercase">
        <span>SELECT A YEAR TO VIEW THE EDUCATION MILESTONE</span>
      </div>
    </section>
  );
};
