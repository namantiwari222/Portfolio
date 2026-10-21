import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { CseEmailModal } from './CseEmailModal';
import { Mail, Phone, Github, Linkedin, Copy, Check, Sparkles, Send, ArrowUpRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      subject || 'Inquiry for Naman Tiwari - CSE'
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section
      className="relative min-h-screen py-24 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col justify-center"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-400/35 bg-[rgba(15,15,15,0.20)] text-red-200 text-xs font-space tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(239,68,68,0.14)]">
          <Sparkles className="w-3.5 h-3.5 text-red-300" />
          <span>COMPUTER SCIENCE ENGINEERING TRANSMISSION</span>
        </div>

        <h2 className="font-space text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-4">
          LET'S BUILD THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-300 via-red-500 to-rose-200 drop-shadow-[0_0_32px_rgba(239,68,68,0.3)]">NEXT STAR</span>
        </h2>

        <p className="font-inter text-base sm:text-xl text-slate-300 font-light leading-relaxed">
          "Whether you have a software engineering opportunity, an AI/ML collaboration, or a technical inquiry — reach out directly via email or phone."
        </p>

        <div className="pt-4 flex justify-center">
          <button
            onClick={() => setIsEmailModalOpen(true)}
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-amber-400 text-slate-950 font-tech font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(56,189,248,0.45)] hover:shadow-[0_0_40px_rgba(56,189,248,0.7)] transition-all flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>SEND EMAIL</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto w-full">
        {/* Left: Model Portrait / Real Face Badge (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center space-y-4">
          <div className="relative group w-full max-w-sm">
            {/* Cinematic Lighting Rim Glow */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-sky-500/30 via-transparent to-amber-400/30 blur-xl pointer-events-none opacity-80" />

            <div className="relative rounded-3xl overflow-hidden border-2 border-slate-800 bg-[#02040A] aspect-[3/4] shadow-2xl">
              <img
                src="https://i.postimg.cc/T2KpRPdN/Naman.jpg"
                alt="Naman Tiwari"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter contrast-105"
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#02040A] via-transparent to-transparent opacity-85" />
              
              <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-sky-950/80 border border-sky-400/30 text-[9px] font-mono text-sky-300">
                REAL FACE PROFILE
              </div>

              <div className="absolute bottom-4 inset-x-4 text-center">
                <h3 className="font-display font-bold text-lg text-white">NAMAN TIWARI</h3>
                <p className="text-xs font-mono text-amber-300">B.Tech CSE (AI & ML)</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right: Direct Contact Credentials & Quick Dispatcher (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Card 1: EMAIL */}
          <div className="relative p-5 sm:p-6 rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 via-white/[0.04] to-red-950/25 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_12px_36px_rgba(0,0,0,0.24),0_0_20px_rgba(220,38,38,0.08)] hover:-translate-y-1 hover:border-red-300/60 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_14px_40px_rgba(0,0,0,0.3),0_0_26px_rgba(220,38,38,0.18)] transition-all duration-300">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl border border-red-500/50 flex items-center justify-center text-red-400 flex-shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="font-space text-[10px] font-semibold text-red-300 tracking-[0.16em] uppercase">
                  DIRECT EMAIL
                </span>
                <p className="font-inter text-sm sm:text-base font-semibold text-white break-all">
                  {PERSONAL_INFO.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                className="px-3 py-1.5 rounded-xl border border-red-500/40 bg-transparent text-xs font-mono text-slate-200 hover:text-red-300 hover:border-red-400 flex items-center gap-1.5 transition-colors"
                title="Copy Email"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setIsEmailModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl border border-red-500/60 bg-transparent text-red-300 font-tech font-bold text-xs uppercase tracking-wider flex items-center gap-1 hover:bg-red-500/10 hover:border-red-400 transition-colors"
              >
                <span>COMPOSE</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Card 2: PHONE */}
          <div className="relative p-5 sm:p-6 rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 via-white/[0.04] to-red-950/25 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_12px_36px_rgba(0,0,0,0.24),0_0_20px_rgba(220,38,38,0.08)] hover:-translate-y-1 hover:border-red-300/60 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_14px_40px_rgba(0,0,0,0.3),0_0_26px_rgba(220,38,38,0.18)] transition-all duration-300">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl border border-red-500/50 flex items-center justify-center text-red-400 flex-shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="font-space text-[10px] font-semibold text-red-300 tracking-[0.16em] uppercase">
                  TELECOMM CONTACT
                </span>
                <p className="font-inter text-sm sm:text-base font-semibold text-white">
                  {PERSONAL_INFO.phone}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                className="px-3 py-1.5 rounded-xl border border-red-500/40 bg-transparent text-xs font-mono text-slate-200 hover:text-red-300 hover:border-red-400 flex items-center gap-1.5 transition-colors"
                title="Copy Phone Number"
              >
                {copiedPhone ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY</span>
                  </>
                )}
              </button>

              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="px-3.5 py-1.5 rounded-xl border border-red-500/60 bg-transparent text-red-300 font-tech font-bold text-xs uppercase tracking-wider flex items-center gap-1 hover:bg-red-500/10 hover:border-red-400 transition-colors"
              >
                <span>CALL</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Card 3: GITHUB & LINKEDIN ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* GITHUB */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-5 rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 via-white/[0.04] to-red-950/25 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_30px_rgba(0,0,0,0.2)] hover:-translate-y-1 hover:border-red-300/60 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0_24px_rgba(220,38,38,0.18)] flex items-center justify-between gap-3 transition-all duration-300 group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl border border-red-500/50 flex items-center justify-center text-red-400">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-space text-[10px] font-semibold tracking-wider text-red-300 block">GITHUB</span>
                  <span className="font-inter text-xs text-slate-100 group-hover:text-red-300 break-all">
                    {PERSONAL_INFO.githubUsername}
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-300" />
            </a>

            {/* LINKEDIN */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-5 rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 via-white/[0.04] to-red-950/25 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_30px_rgba(0,0,0,0.2)] hover:-translate-y-1 hover:border-red-300/60 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0_24px_rgba(220,38,38,0.18)] flex items-center justify-between gap-3 transition-all duration-300 group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl border border-red-500/50 flex items-center justify-center text-red-400">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-space text-[10px] font-semibold tracking-wider text-red-300 block">LINKEDIN</span>
                  <span className="font-inter text-xs text-slate-100 group-hover:text-red-300 break-all">
                    {PERSONAL_INFO.linkedinUsername}
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-300" />
            </a>
          </div>

          {/* Quick Mail Dispatcher */}
          <form
            onSubmit={handleSendMessage}
            className="p-5 sm:p-6 rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 via-white/[0.04] to-red-950/25 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_12px_36px_rgba(0,0,0,0.24),0_0_20px_rgba(220,38,38,0.08)] space-y-4"
          >
            <div className="font-space text-xs font-semibold text-red-300 tracking-wider uppercase flex items-center justify-between mb-1">
              <span className="flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5" />
                <span>QUICK MESSAGE DISPATCH</span>
              </span>
              <button
                type="button"
                onClick={() => setIsEmailModalOpen(true)}
                className="text-[10px] font-mono text-red-300 hover:underline"
              >
                Use CSE Templates →
              </button>
            </div>

            <input
              type="text"
              placeholder="Subject / Role / Topic..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-white/[0.06] backdrop-blur-md text-sm font-inter text-slate-100 placeholder-slate-400 focus:outline-none focus:border-red-300/60 transition-colors"
            />

            <textarea
              placeholder="Your message for Naman Tiwari..."
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-white/[0.06] backdrop-blur-md text-sm font-inter text-slate-100 placeholder-slate-400 focus:outline-none focus:border-red-300/60 transition-colors resize-none"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-xl border border-red-500/60 bg-transparent text-red-300 font-tech font-bold text-xs tracking-wider uppercase hover:bg-red-500/10 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)] transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>SEND EMAIL VIA CLIENT</span>
            </button>
          </form>

        </div>
      </div>

      {/* CSE Email Modal */}
      <CseEmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />
    </section>
  );
};
