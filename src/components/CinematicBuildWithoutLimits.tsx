import React, { useState } from 'react';
import { PROJECTS, PERSONAL_INFO } from '../data/portfolioData';
import { ExternalLink, Github, Monitor } from 'lucide-react';

export const CinematicBuildWithoutLimits: React.FC = () => {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);

  return (
    <section
      className="relative min-h-screen py-24 px-4 sm:px-6 w-full flex flex-col justify-center items-center overflow-hidden bg-[#02040a] select-none"
    >
      {/* Background neon ambient rings */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-red-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-cyan-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Header (Matches 00:18 in video) */}
      <div className="relative z-30 text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-red-500/40 bg-red-950/60 text-red-300 text-xs font-mono tracking-[0.25em] uppercase mb-3 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
          <Monitor className="w-3.5 h-3.5 text-red-400 animate-pulse" />
          <span>SCENE 04</span>
        </div>

        <h2
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase leading-none"
          style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-yellow-300 drop-shadow-[0_0_35px_rgba(239,68,68,0.5)]">
            PROJECTS
          </span>
        </h2>

        <p className="mt-2 text-xs sm:text-sm font-mono tracking-widest text-slate-400 uppercase">
          CURVED PROJECT COMMAND RING
        </p>
      </div>

      {/* ========================================================================= */}
      {/* IMAX CURVED 3D SCREEN AMPHITHEATER (Video 00:19 - 00:21)                  */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full max-w-6xl h-[620px] sm:h-[680px] flex items-center justify-center perspective-[1200px]">
        
        {/* Curved Floating Monitors in Arc */}
        <div className="absolute inset-0 flex items-center justify-center">
          {PROJECTS.map((proj, idx) => {
            const isActive = idx === activeProjectIndex;
            // Offsets for the 3 curved screens
            const xOffsets = [-36, 0, 36];
            const rotY = [25, 0, -25];
            const zTrans = [-20, 40, -20];

            return (
              <div
                key={proj.id}
                onClick={() => setActiveProjectIndex(idx)}
                className={`absolute cursor-pointer transition-all duration-500 rounded-2xl border-2 p-4 sm:p-5 backdrop-blur-xl ${
                  isActive
                    ? 'border-red-500 bg-[#060913]/95 z-30 shadow-[0_0_50px_rgba(239,68,68,0.5)] scale-105 sm:scale-110'
                    : 'border-slate-800 bg-[#02040a]/80 opacity-60 hover:opacity-90 scale-90 sm:scale-95'
                }`}
                style={{
                  left: `calc(50% + ${xOffsets[idx % 3]}%)`,
                  top: '32%',
                  transform: `translate(-50%, -50%) translateZ(${zTrans[idx % 3]}px) rotateY(${rotY[idx % 3]}deg)`,
                  width: 'min(92vw, 360px)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Header line */}
                <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-red-400 uppercase">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span>HOLO-DISPLAY 0{idx + 1}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{proj.category}</span>
                </div>

                {/* Project Title */}
                <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-2">
                  {proj.title}
                </h3>

                {/* Project Description */}
                <p className="text-xs font-mono text-slate-300 line-clamp-3 mb-3 leading-relaxed">
                  {proj.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {proj.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <a
                    href={proj.liveUrl || PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 text-xs font-mono text-amber-300 hover:text-white"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>LAUNCH DEMO</span>
                  </a>

                  <a
                    href={proj.githubUrl || PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-white"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GITHUB</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* CENTER SILHOUETTE: STANDING ON THE CURVED STAGE PEDESTAL                  */}
        {/* ========================================================================= */}
        <div className="relative z-20 flex flex-col items-center justify-center mt-36 pointer-events-none">
          {/* Glowing floor pedestal circles beneath character's feet */}
          <div className="absolute bottom-6 w-60 h-20 rounded-full border-2 border-red-500/60 bg-red-950/40 blur-[1px] shadow-[0_0_50px_rgba(239,68,68,0.8)] animate-pulse" />
          <div className="absolute bottom-8 w-44 h-14 rounded-full border border-amber-400/50" />

          {/* Full Silhouette Figure standing seamlessly on stage (NO BOX) */}
          <div
            className="relative w-56 sm:w-64 md:w-72 h-[48vh] max-h-[500px] flex items-end justify-center filter contrast-125 brightness-95"
            style={{
              maskImage: 'linear-gradient(to bottom, black 0%, black 82%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 82%, transparent 100%)',
            }}
          >
            <img
              src={PERSONAL_INFO.backSilhouetteImage || PERSONAL_INFO.modelImage}
              alt="Naman Tiwari - Back View"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain object-bottom drop-shadow-[0_15px_30px_rgba(239,68,68,0.4)]"
            />
          </div>
        </div>

        {/* Floating Project Switcher Buttons on Bottom */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {PROJECTS.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => setActiveProjectIndex(idx)}
              className={`px-3 py-1 rounded-full text-xs font-mono tracking-wider border transition-all ${
                activeProjectIndex === idx
                  ? 'border-red-500 bg-red-500/30 text-white font-bold shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
              }`}
            >
              0{idx + 1} {proj.title}
            </button>
          ))}
        </div>

      </div>

      <div className="mt-8 text-center text-[10px] font-mono text-slate-500 tracking-widest uppercase">
        <span>CLICK ANY SCREEN IN THE 3D HOLOGRAPHIC RING TO ROTATE & INSPECT THE CODE REPOSITORY</span>
      </div>
    </section>
  );
};
