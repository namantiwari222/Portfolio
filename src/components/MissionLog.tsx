import React, { useState } from 'react';
import { MISSION_EXPERIENCE } from '../data/portfolioData';
import { Terminal, ShieldCheck, Cpu, Calendar, Building, CheckCircle2 } from 'lucide-react';

const MISSION_PHOTOS = [
  'https://i.postimg.cc/NM5NHkKM/9.jpg',
  'https://i.postimg.cc/Qxpf1td1/7.jpg',
  'https://i.postimg.cc/1XFJWRc8/1.jpg',
  'https://i.postimg.cc/0N3YLRN5/8.jpg',
  'https://i.postimg.cc/vZb3zs4p/6.jpg',
  'https://i.postimg.cc/T1jnLKJ3/3.jpg',
  'https://i.postimg.cc/8zBG1dQL/Whats-App-Image-2026-10-01-at-7-33-08-PM.jpg',
  'https://i.postimg.cc/ZR8Wj1BD/10.jpg',
];

export const MissionLog: React.FC = () => {
  const [photoDimensions, setPhotoDimensions] = useState<
    Record<string, { isLandscape: boolean; aspectRatio: string }>
  >({});

  return (
    <section
      className="relative min-h-[80vh] py-24 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col justify-center"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-400/30 bg-emerald-950/40 text-emerald-300 text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(52,211,153,0.2)]">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span>EXPERIENCE</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white mb-4">
          MISSION <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-sky-300 drop-shadow-[0_0_30px_rgba(52,211,153,0.3)]">LOG</span>
        </h2>

        <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
          "A journey of hands-on learning, practical skills, and professional growth."
        </p>
      </div>

      {/* Space Mission Terminal Interface */}
      <div className="max-w-3xl mx-auto w-full">
        <div className="rounded-3xl border-2 border-emerald-500/30 bg-gradient-to-b from-[#04120e]/95 via-[#02040A]/95 to-[#030a08]/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(5,150,105,0.15)] overflow-hidden">
          {/* Terminal Titlebar */}
          <div className="px-6 py-3.5 bg-emerald-950/40 border-b border-emerald-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 animate-pulse" />
              <span className="ml-2 text-xs font-mono text-emerald-300 tracking-wider">
                EXPOSURE
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 bg-emerald-900/40 px-2.5 py-0.5 rounded border border-emerald-500/30">
              <ShieldCheck className="w-3 h-3" />
              <span>STATUS: VERIFIED RECORD</span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-5 sm:p-7 space-y-5">
            {/* Primary Mission Info Block */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
                  {MISSION_EXPERIENCE.role}
                </h3>
                <div className="flex items-center gap-2 text-sm font-mono text-slate-300 mt-2">
                  <Building className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-slate-100">{MISSION_EXPERIENCE.organization}</span>
                </div>
              </div>

              <div className="flex flex-col md:items-end">
                <span className="text-xs font-mono text-slate-400 uppercase">TIMEFRAME</span>
                <div className="flex items-center gap-2 text-sm sm:text-base font-mono font-semibold text-amber-300 mt-1 bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-500/30">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>{MISSION_EXPERIENCE.duration}</span>
                </div>
              </div>
            </div>

            {/* Core Responsibilities Log */}
            <div>
              <h4 className="text-xs font-mono text-emerald-400 tracking-widest uppercase mb-4 flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5" />
                <span>OPERATIONAL DIRECTIVES & DELIVERABLES</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {MISSION_EXPERIENCE.responsibilities.map((resp, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-950/20 hover:border-emerald-400/40 transition-colors flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-tech text-slate-200">{resp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-end text-xs font-mono text-slate-400 gap-2">
            </div>
          </div>
        </div>
      </div>

      <div className="mission-gallery" aria-label="Mission photo gallery">
        <div className="mission-gallery__heading">
          <span className="mission-gallery__eyebrow">FIELD NOTES</span>
          <span className="mission-gallery__caption">MOMENTS ALONG THE WAY</span>
        </div>
        <div className="mission-gallery__viewport">
          <div className="mission-gallery__track">
            {[false, true].map((isDuplicate) => (
              <div
                className="mission-gallery__group"
                key={isDuplicate ? 'duplicate' : 'original'}
                aria-hidden={isDuplicate}
              >
                {MISSION_PHOTOS.map((photo, index) => (
                  <div
                    className={`mission-gallery__card${photoDimensions[photo]?.isLandscape ? ' mission-gallery__card--landscape' : ''}`}
                    key={`${photo}-${index}`}
                    style={{ aspectRatio: photoDimensions[photo]?.aspectRatio ?? '3 / 4' }}
                  >
                    <img
                      src={photo}
                      alt={isDuplicate ? '' : `Mission moment ${index + 1}`}
                      loading="lazy"
                      decoding="async"
                      draggable="false"
                      onLoad={(event) => {
                        const { naturalWidth, naturalHeight } = event.currentTarget;
                        setPhotoDimensions((dimensions) => ({
                          ...dimensions,
                          [photo]: {
                            isLandscape: naturalWidth > naturalHeight,
                            aspectRatio: `${naturalWidth} / ${naturalHeight}`,
                          },
                        }));
                      }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
