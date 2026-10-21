import React, { useState } from 'react';
import { DSA_CONCEPTS } from '../data/portfolioData';
import { DsaTopic } from '../types';
import { Code2, Binary, Maximize2, X } from 'lucide-react';

export const ProblemSolvingCore: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<DsaTopic>(DSA_CONCEPTS[0]);
  const [isFullImageOpen, setIsFullImageOpen] = useState<boolean>(false);

  return (
    <section
      className="relative min-h-screen py-24 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col justify-center"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/30 bg-amber-950/40 text-amber-300 text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(245,197,66,0.2)]">
          <Binary className="w-3.5 h-3.5 text-amber-400" />
          <span>CERTIFICATES & EVENTS</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white mb-4">
          CERTIFICATES <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 drop-shadow-[0_0_30px_rgba(245,197,66,0.35)]">& EVENTS</span>
        </h2>

        <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
          "Showcasing my journey of continuous learning and growth."
        </p>

        {/* Primary Language Indicator */}
        <div className="mt-6 inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-amber-400/50 bg-[#060913]/90 backdrop-blur-md shadow-[0_0_20px_rgba(245,197,66,0.2)]">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          <span className="text-xs font-mono tracking-wider text-slate-300">
            SHOWCASING MY JOURNEY OF CONTINUOUS LEARNING AND GROWTH
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: The Central Glowing Core and Pattern Selector (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-3xl border border-amber-500/20 bg-gradient-to-b from-[#090b14]/90 to-[#02040A]/95 backdrop-blur-xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <span className="text-xs font-mono tracking-widest text-amber-400 uppercase flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-amber-400" />
                ACCOMPLISHMENTS
              </span>
              <span className="text-[10px] font-mono text-slate-400">EVENTS</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
              {DSA_CONCEPTS.map((concept) => {
                const isSelected = selectedTopic.name === concept.name;

                return (
                  <button
                    key={concept.name}
                    onClick={() => setSelectedTopic(concept)}
                    className={`text-left p-3.5 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                      isSelected
                        ? 'border-amber-400 bg-amber-500/15 text-white shadow-[0_0_20px_rgba(245,197,66,0.25)] scale-[1.02]'
                        : 'border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="font-tech font-bold text-sm tracking-wide">
                        {concept.name}
                      </span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-amber-400/80">
                      {concept.complexity}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Selected Algorithmic Dossier / Code View (5 cols) */}
        <div className="lg:col-span-5">
          <div className="p-6 sm:p-7 rounded-3xl border-2 border-amber-400/30 bg-gradient-to-b from-[#0e0d16]/95 via-[#02040A]/95 to-[#060913]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(245,197,66,0.15)]">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <span className="text-xs font-mono tracking-widest text-amber-300 uppercase">
                ALGORITHMIC DOSSIER
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950/60 text-sky-300 border border-sky-500/30">
                JAVA RUNTIME
              </span>
            </div>

            <h3 className="text-2xl font-display font-bold text-white mb-2">
              {selectedTopic.name}
            </h3>

            <div className="inline-block px-3 py-1 rounded-md text-xs font-mono text-amber-300 bg-amber-950/50 border border-amber-500/30 mb-4">
              COMPLEXITY: {selectedTopic.complexity}
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/80">
                <span className="text-slate-400 block mb-1 uppercase tracking-wider text-[10px]">
                  CONCEPT OVERVIEW:
                </span>
                <p className="text-slate-200 leading-relaxed font-sans text-sm">
                  {selectedTopic.description}
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/80">
                <span className="text-amber-400 block mb-1 uppercase tracking-wider text-[10px]">
                  ARCHITECTURAL PATTERN:
                </span>
                <p className="text-sky-300 font-mono text-xs">
                  {selectedTopic.keyPattern}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>LANGUAGE: Java 17+</span>
              <button
                onClick={() => setIsFullImageOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-400/40 bg-amber-950/40 text-amber-300 hover:bg-amber-500/20 transition-all font-mono text-[11px] shadow-[0_0_15px_rgba(245,197,66,0.2)]"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>SHOW FULL IMAGE / ARCHITECTURE</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FULL IMAGE / ARCHITECTURE DIAGRAM MODAL */}
      {isFullImageOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200"
          onClick={() => setIsFullImageOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl border border-amber-400/50 bg-[#060913] p-6 sm:p-8 shadow-[0_0_80px_rgba(245,197,66,0.3)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-amber-950 border border-amber-500/30 text-amber-400">
                  <Code2 className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    {selectedTopic.name} // FULL ARCHITECTURE SCHEMATIC
                  </h3>
                  <span className="text-xs font-mono text-amber-400">
                    Complexity: {selectedTopic.complexity} • Java Enterprise Pattern
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsFullImageOpen(false)}
                className="p-2 rounded-full border border-slate-700 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-500 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Schematic Flow Architecture */}
            <div className="space-y-6">
              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/80 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-amber-400 uppercase tracking-widest text-[10px]">
                    PIPELINE ARCHITECTURE
                  </span>
                  <span className="text-[10px] text-slate-500">OPTIMIZED MEMORY BUFFER</span>
                </div>
                <div className="p-4 rounded-xl bg-[#02040A] border border-slate-800/80 text-sky-300 leading-relaxed overflow-x-auto">
                  <pre className="font-mono text-xs sm:text-sm">
{`+-------------------------------------------------------------+
|               ${selectedTopic.name.toUpperCase().padEnd(45)}|
+-------------------------------------------------------------+
       |
       v
[INPUT BUFFER: Stream / Collection]
       |
       +---> [VALIDATION & BOUNDARY PRUNING]
       |
       v
[ALGORITHMIC ENGINE] ===> Pattern: ${selectedTopic.keyPattern}
       |
       v
[COMPLEXITY PROFILE] ===> ${selectedTopic.complexity}
       |
       v
[OUTPUT / DIVERGENCE] ===> Zero GC Overhead`}
                  </pre>
                </div>
              </div>

              {/* In-depth details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60">
                  <span className="text-slate-400 block mb-1 uppercase tracking-wider text-[10px]">
                    OPTIMIZATION INVARIANTS:
                  </span>
                  <p className="text-slate-200 font-sans text-sm">
                    {selectedTopic.description}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60">
                  <span className="text-amber-400 block mb-1 uppercase tracking-wider text-[10px]">
                    PRODUCTION PATTERN:
                  </span>
                  <p className="text-sky-300 font-mono text-xs">
                    {selectedTopic.keyPattern}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500">
                SCENE 05 // PROBLEM SOLVING CORE • JAVA 17+
              </span>
              <button
                onClick={() => setIsFullImageOpen(false)}
                className="px-4 py-2 rounded-full bg-amber-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider hover:bg-amber-300 transition-all"
              >
                CLOSE ARCHITECTURE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
