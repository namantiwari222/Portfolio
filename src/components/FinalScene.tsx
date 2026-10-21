import React, { lazy, Suspense, useCallback, useRef, useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { CseEmailModal } from './CseEmailModal';
import { ArrowUp, Flame, Send, Linkedin, Download } from 'lucide-react';

const ResumeDownloadDialog = lazy(() =>
  import('./ResumeDownload').then((module) => ({
    default: module.ResumeDownloadDialog,
  }))
);

export const FinalScene: React.FC = () => {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const resumeButtonRef = useRef<HTMLButtonElement>(null);
  const closeResumeModal = useCallback(() => {
    setIsResumeModalOpen(false);
    window.requestAnimationFrame(() => resumeButtonRef.current?.focus());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="final-scene"
      className="relative min-h-screen py-24 px-4 sm:px-6 flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-[#02040A] via-[#050104] to-[#000000]"
    >
      {/* Background radial crimson glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.1),transparent_70%)]" />

      {/* ========================================================================= */}
      {/* OUTRO CARD: EXACT MATCH TO VIDEO (00:22 - 00:24)                           */}
      {/* "Love This Style? Let's Create It Together!"                              */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full max-w-xl mx-auto mb-16 p-8 rounded-3xl border-2 border-red-500/40 bg-gradient-to-b from-red-950/40 via-slate-950/90 to-black/95 backdrop-blur-2xl shadow-[0_0_80px_rgba(239,68,68,0.35)]">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/40 bg-red-950/60 text-red-300 text-xs font-mono tracking-widest uppercase mb-4">
          <Flame className="w-3.5 h-3.5 text-red-400 animate-pulse" />
          <span>CHANGE SOMETHING</span>
        </div>

        <h3
          className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-2"
          style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
        >
          THANKS FOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-yellow-300">CONNECTING</span>
        </h3>

        <p className="text-sm sm:text-base font-mono text-slate-300 mb-6 leading-relaxed">
          "Let's connect, collaborate, and create something amazing together."
        </p>

        {/* 3 Pillars Triad */}
        <div className="grid grid-cols-3 gap-2 py-4 mb-6 border-y border-red-500/20 text-center text-xs font-mono">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Pillar 01</span>
            <span className="text-amber-300 font-bold">YOUR VISION</span>
          </div>
          <div className="border-x border-red-500/20">
            <span className="text-slate-400 block text-[10px] uppercase">Pillar 02</span>
            <span className="text-red-400 font-bold">MY CODE</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Pillar 03</span>
            <span className="text-white font-bold">A STRONGER FUTURE</span>
          </div>
        </div>

        {/* Primary Contact CTA */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setIsEmailModalOpen(true)}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-amber-500 text-white font-tech font-bold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(239,68,68,0.5)] hover:shadow-[0_0_40px_rgba(239,68,68,0.8)] transition-all flex items-center gap-2"
          >
            <Send className="w-4 h-4 text-amber-200" />
            <span>DISPATCH EMAIL NOW</span>
          </button>

          <button
            ref={resumeButtonRef}
            type="button"
            onClick={() => setIsResumeModalOpen(true)}
            className="resume-download-trigger resume-download-trigger--outro"
            aria-label="Download resume"
            title="Download Resume"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            <span>DOWNLOAD RESUME</span>
          </button>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-full border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-mono text-xs tracking-wider uppercase transition-all flex items-center gap-2"
          >
            <Linkedin className="w-4 h-4 text-sky-400" />
            <span>CONNECT ON LINKEDIN</span>
          </a>
        </div>
      </div>

      {/* Central Standing Model Silhouette */}
      <div className="relative z-10 mb-8 group">
        <div className="relative w-36 sm:w-44 aspect-[3/4] rounded-2xl overflow-hidden border border-slate-800 shadow-[0_0_40px_rgba(0,0,0,0.9)] mx-auto">
          <img
            src={PERSONAL_INFO.realFaceImage}
            alt="Naman Tiwari Final Scene"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top filter contrast-[1.08] brightness-[0.98]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-85 pointer-events-none" />
        </div>
      </div>

      {/* Name and Professional Title */}
      <div className="relative z-10 space-y-1 mb-8">
        <h4 className="text-2xl sm:text-4xl font-display font-black tracking-wider text-white">
          NAMAN TIWARI
        </h4>
        <p className="text-xs sm:text-sm font-mono tracking-widest text-red-400 uppercase">
          B.TECH COMPUTER SCIENCE ENGINEERING
        </p>
      </div>

      {/* Back to top rocket button */}
      <button
        onClick={scrollToTop}
        className="relative z-10 group flex items-center gap-2 px-6 py-3 rounded-full border border-slate-800 hover:border-red-500/50 bg-[#060913]/80 hover:bg-red-950/30 text-slate-300 hover:text-red-300 transition-all duration-300 shadow-[0_0_25px_rgba(239,68,68,0.15)] text-xs font-mono tracking-wider uppercase"
      >
        <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
        <span>REPLAY CINEMATIC JOURNEY</span>
      </button>

      <CseEmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />
      {isResumeModalOpen && (
        <Suspense fallback={null}>
          <ResumeDownloadDialog isOpen={isResumeModalOpen} onClose={closeResumeModal} />
        </Suspense>
      )}
    </footer>
  );
};
