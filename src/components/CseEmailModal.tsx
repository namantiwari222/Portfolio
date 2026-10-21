import React, { useEffect, useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Copy, Check, X, GraduationCap, Send } from 'lucide-react';

interface CseEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTemplate?: string;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
}

const TEMPLATES: EmailTemplate[] = [
  {
    id: 'swe-opportunity',
    name: '💼 Software Engineering Opportunity',
    subject: 'Opportunity Inquiry for Naman Tiwari - Software Engineering Role',
    body: `Hi Naman,\n\nBest regards,\n[Your Name / Company]`,
  },
  {
    id: 'project-collab',
    name: '🤝 AI / Full-Stack Collaboration',
    subject: 'Project Collaboration Proposal - Naman Tiwari',
    body: `Hello Naman,\n\nI reviewed your projects like File Note and SwasthyaSetu AI. I am currently working on an innovative software / AI project and would love to collaborate with you.\n\nCould we schedule a brief time to chat about potential synergies?\n\nRegards,\n[Your Name]`,
  },
  {
    id: 'academic',
    name: '🎓 Academic & Research Inquiry',
    subject: 'Academic / Technical Discussion - CSE & AI',
    body: `Hi Naman,\n\nI saw your academic trajectory at GL Bajaj Group of Institution and CSJMU specializing in CSE and AI/ML. I would like to discuss technical topics regarding data structures and machine learning implementations.\n\nBest,\n[Your Name]`,
  },
  {
    id: 'custom',
    name: '✉️ Direct Engineering Message',
    subject: 'Direct Message for Naman Tiwari',
    body: `Hi Naman,\n\nI explored your portfolio and wanted to reach out regarding...\n\nThanks!\n[Your Name]`,
  },
];

export const CseEmailModal: React.FC<CseEmailModalProps> = ({ isOpen, onClose }) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('swe-opportunity');
  const [subject, setSubject] = useState<string>(TEMPLATES[0].subject);
  const [body, setBody] = useState<string>(TEMPLATES[0].body);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedDraft, setCopiedDraft] = useState<boolean>(false);
  const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PERSONAL_INFO.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  useEffect(() => {
    if (isOpen) {
      setSelectedTemplateId(TEMPLATES[0].id);
      setSubject(TEMPLATES[0].subject);
      setBody(TEMPLATES[0].body);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectTemplate = (template: EmailTemplate) => {
    setSelectedTemplateId(template.id);
    setSubject(template.subject);
    setBody(template.body);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyDraft = () => {
    const text = `To: ${PERSONAL_INFO.email}\nSubject: ${subject}\n\n${body}`;
    navigator.clipboard.writeText(text);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2000);
  };

  const handleLaunchEmail = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = mailtoUrl;
  };

  const handleEmailAppLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const form = e.currentTarget.closest('form');
    if (form && !form.reportValidity()) {
      e.preventDefault();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#02040A]/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl border-2 border-sky-500/40 bg-gradient-to-b from-[#060e1a] via-[#02040A] to-[#04060f] text-slate-100 shadow-[0_25px_60px_rgba(56,189,248,0.3)] p-5 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full border border-slate-800 bg-slate-900/80 hover:border-amber-400 text-slate-300 hover:text-amber-300 transition-colors"
          aria-label="Close Email Terminal"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-2xl sm:text-3xl font-display font-black text-white tracking-wide mb-1 flex items-center gap-2">
          <span>CONTACT</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-amber-300">
            NAMAN TIWARI
          </span>
        </h3>
        <p className="text-xs font-mono text-slate-400 mb-5">
          Computer Science Engineering • AI & ML Specialization
        </p>

        {/* Naman's Verified CSE Identity Badge */}
        <div className="mb-6 p-4 rounded-2xl border border-sky-500/30 bg-sky-950/20 backdrop-blur-md flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.3)] flex-shrink-0">
            <img
              src={PERSONAL_INFO.realFaceImage}
              alt="Naman Tiwari - Real Face Profile"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-sky-500/80 text-[8px] font-mono text-slate-950 text-center font-bold">
              VERIFIED
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="font-display font-bold text-base text-white">NAMAN TIWARI</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                CSE STUDENT
              </span>
            </div>
            <div className="text-xs font-mono text-slate-300 flex items-center justify-center sm:justify-start gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
              <span>GL Bajaj Group of Institution, Mathura (AI & ML)</span>
            </div>
            <div className="text-xs font-mono text-slate-400 flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
              <span className="text-amber-300">📧 {PERSONAL_INFO.email}</span>
              <span className="text-slate-600">•</span>
              <span className="text-sky-300">📱 {PERSONAL_INFO.phone}</span>
            </div>
          </div>

          <div className="flex sm:flex-col gap-2 flex-shrink-0">
            <button
              onClick={copyEmail}
              className="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800 text-xs font-mono text-slate-200 hover:text-white hover:border-sky-400 flex items-center gap-1.5 transition-colors"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>COPY EMAIL</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Engineering Templates */}
        <div className="mb-4">
          <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
            CHOOSE CSE INQUIRY TEMPLATE:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => handleSelectTemplate(tmpl)}
                className={`p-2.5 rounded-xl border text-left text-xs font-mono transition-all ${
                  selectedTemplateId === tmpl.id
                    ? 'border-sky-400 bg-sky-500/20 text-white shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                    : 'border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700'
                }`}
              >
                {tmpl.name}
              </button>
            ))}
          </div>
        </div>

        {/* Email Editor Form */}
        <form onSubmit={handleLaunchEmail} className="space-y-3.5">
          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
              RECIPIENT (TO):
            </label>
            <input
              type="text"
              readOnly
              value={`${PERSONAL_INFO.email} (Naman Tiwari)`}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-800 bg-slate-950 text-xs font-mono text-amber-300 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
              SUBJECT:
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-800 bg-slate-900 text-xs font-mono text-white focus:outline-none focus:border-sky-400 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
              MESSAGE BODY:
            </label>
            <textarea
              rows={6}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-xs font-mono text-slate-200 focus:outline-none focus:border-sky-400 transition-colors resize-none leading-relaxed"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80">
            <button
              type="button"
              onClick={copyDraft}
              className="px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-xs font-mono text-slate-300 hover:text-white hover:border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              {copiedDraft ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">DRAFT COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>COPY FULL DRAFT</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-mono text-slate-400 hover:text-slate-200"
              >
                CANCEL
              </button>
              <a
                href={mailtoUrl}
                onClick={handleEmailAppLink}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-amber-400 text-slate-950 font-tech font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_30px_rgba(56,189,248,0.7)] transition-all flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>OPEN EMAIL APP & SEND</span>
              </a>
            </div>
          </div>
          <p className="text-right text-[11px] font-mono text-slate-400">
            If your email app does not open,{' '}
            <a
              href={gmailComposeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-300 underline hover:text-white"
            >
              open Gmail compose
            </a>.
          </p>
        </form>
      </div>
    </div>
  );
};
