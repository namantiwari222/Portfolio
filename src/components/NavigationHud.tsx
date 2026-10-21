import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { CseEmailModal } from './CseEmailModal';
import { Github, Linkedin, Mail, Compass, Menu, X } from 'lucide-react';

interface NavigationHudProps {
  currentSection: string;
  scrollProgress: number;
}

export const NavigationHud: React.FC<NavigationHudProps> = ({ currentSection, scrollProgress }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const navItems = [
    { label: '01 HOME', href: '#hero' },
    { label: '02 TECH UNIVERSE', href: '#tech-universe' },
    { label: '03 THROUGH TIME', href: '#through-time' },
    { label: '04 PROJECTS', href: '#build-without-limits' },
    { label: '05 ACHIEVEMENTS', href: '#dsa' },
    { label: '06 CONTACT', href: '#contact' },
  ];

  return (
    <>
      <header
        id="main-navigation-hud"
        className="fixed top-0 left-0 right-0 z-50 bg-transparent py-3 sm:py-4"
        style={{ fontFamily: 'Cambria, Georgia, serif' }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 flex items-center justify-between">
          <a
            href="#hero"
            className="group flex items-center gap-3 text-decoration-none"
            id="nav-brand-link"
          >
            <div className="relative w-10 h-10 rounded-full border-2 border-red-600 overflow-hidden">
              <img
                src="https://i.postimg.cc/T2KpRPdN/Naman.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span
                className="text-xs font-black tracking-[0.12em] leading-none text-yellow-400 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
              >
                namantiwari222
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === '#hero'
                  ? currentSection === 'hero' || scrollProgress < 0.1
                  : currentSection === item.href.slice(1);

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`px-3.5 py-1 text-xs tracking-wider transition-all duration-200 rounded-md border ${
                    isActive
                      ? 'text-red-600 border-red-600 font-bold'
                      : 'text-yellow-400 border-transparent hover:text-red-600'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Controls & Quick Links */}
          <div className="flex items-center gap-2.5 sm:gap-3">

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              id="nav-github-link"
              className="w-9 h-9 rounded-full border border-red-700 hover:border-red-500 text-yellow-400 hover:text-red-400 transition-all flex items-center justify-center"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              id="nav-linkedin-link"
              className="w-9 h-9 rounded-full border border-red-700 hover:border-red-500 text-yellow-400 hover:text-red-400 transition-all flex items-center justify-center"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <button
              onClick={() => setIsEmailModalOpen(true)}
              id="nav-email-link"
              className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-700 text-yellow-400 hover:text-red-400 text-xs font-bold tracking-wider transition-all"
              title="Open CSE Email Terminal"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>DISPATCH EMAIL</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-red-700 text-yellow-400 hover:text-red-400"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[1.5px]">
          <div
            className="h-full bg-gradient-to-r from-red-900 via-red-500 to-red-300 transition-all duration-150"
            style={{ width: `${Math.min(Math.max(scrollProgress * 100, 0), 100)}%` }}
          />
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-transparent px-6 py-6 flex flex-col gap-3">
            {navItems.map((item) => {
              const isActive =
                item.href === '#hero'
                  ? currentSection === 'hero' || scrollProgress < 0.1
                  : currentSection === item.href.slice(1);

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 px-3 text-sm tracking-wider rounded-md border flex items-center justify-between ${
                    isActive
                      ? 'text-red-600 border-red-600'
                      : 'text-yellow-400 border-transparent hover:text-red-600'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{item.label}</span>
                  <Compass className="w-3.5 h-3.5 text-red-600/70" />
                </a>
              );
            })}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsEmailModalOpen(true);
              }}
              className="mt-2 py-2.5 px-4 rounded-xl border border-red-700 text-yellow-400 hover:text-red-400 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>OPEN CSE EMAIL TERMINAL</span>
            </button>
          </div>
        )}
      </header>

      <CseEmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />
    </>
  );
};
