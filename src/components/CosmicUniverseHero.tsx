import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { CseEmailModal } from './CseEmailModal';
import {
  Flame,
  Send,
  Crosshair,
  GraduationCap,
  Mail,
  Phone,
  Github,
  Linkedin,
  Award,
  Building2,
} from 'lucide-react';

interface CosmicUniverseHeroProps {
  onEnterUniverse?: () => void;
}

const CLOUDINARY_VIDEO_SRC =
  'https://res.cloudinary.com/i0n3b3xa/video/upload/q_auto:eco,w_720,c_limit,vc_h264/Video_Project_1.mp4';
const CLOUDINARY_IMAGE_SRC =
  'https://res.cloudinary.com/i0n3b3xa/image/upload/f_auto/q_auto/image_3142f032_1_1.jpg';

export const CosmicUniverseHero: React.FC<CosmicUniverseHeroProps> = ({
  onEnterUniverse,
}) => {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVideoEnded, setIsVideoEnded] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const hasVideoEndedRef = useRef<boolean>(false);
  const isVideoPlayingRef = useRef<boolean>(false);

  const startPlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion || hasVideoEndedRef.current || isVideoPlayingRef.current) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    isVideoPlayingRef.current = true;
    void video.play().catch((error: unknown) => {
      isVideoPlayingRef.current = false;
      if (error instanceof DOMException && error.name === 'AbortError') return;
      console.warn('Hero video playback failed; keeping the still image visible.', error);
      hasVideoEndedRef.current = true;
      setIsVideoEnded(true);
    });
  }, [prefersReducedMotion]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handlePreferenceChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handlePreferenceChange);
    return () => mediaQuery.removeEventListener('change', handlePreferenceChange);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const updatePlayback = (isVisible: boolean) => {
      const video = videoRef.current;
      if (!video) return;

      if (isVisible && !prefersReducedMotion && !hasVideoEndedRef.current) {
        startPlayback();
      } else {
        video.pause();
        isVideoPlayingRef.current = false;
      }
    };

    if (!('IntersectionObserver' in window)) {
      updatePlayback(true);
      return () => videoRef.current?.pause();
    }

    const observer = new IntersectionObserver(([entry]) => {
      updatePlayback(entry.isIntersecting);
    });
    observer.observe(section);

    return () => {
      observer.disconnect();
      videoRef.current?.pause();
      isVideoPlayingRef.current = false;
    };
  }, [prefersReducedMotion, startPlayback]);

  const handleVideoEnded = () => {
    hasVideoEndedRef.current = true;
    isVideoPlayingRef.current = false;
    setIsVideoEnded(true);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-center text-white overflow-hidden select-none pt-24 pb-12 sm:pt-28 sm:pb-16 bg-transparent"
    >
      {/* The still image remains visible when video is paused or motion is reduced. */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-transparent">
        <img
          src={CLOUDINARY_IMAGE_SRC}
          alt="Naman Tiwari Cosmic Cinematic Background"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* The video is fetched only while the hero is visible and is never replayed after it ends. */}
        <video
          ref={videoRef}
          src={prefersReducedMotion ? undefined : CLOUDINARY_VIDEO_SRC}
          poster={CLOUDINARY_IMAGE_SRC}
          muted
          playsInline
          preload="none"
          disablePictureInPicture
          disableRemotePlayback
          onEnded={handleVideoEnded}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out ${
            isVideoEnded || prefersReducedMotion ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center bg-transparent">
        
        {/* ===================================================================== */}
        {/* LEFT COLUMN: HERO TYPOGRAPHY, BIO, SIGNATURE, AND CTAs                */}
        {/* ===================================================================== */}
        <div className="lg:col-span-12 flex flex-col items-start text-left bg-transparent">
          {/* "Hello, I'm" */}
          <p
            className="text-2xl sm:text-3xl font-semibold text-zinc-900 tracking-wide mb-2 sm:mb-3"
          >
            Hello, I'm
          </p>

          {/* Grand Name: NAMAN TIWARI - NAMAN in radiant 3D golden gradient */}
          <div className="hero-name-reveal flex flex-col -space-y-2 sm:-space-y-4 mb-4 sm:mb-5">
            <h1
              className="text-[clamp(2.5rem,12vw,4.5rem)] sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black tracking-tight uppercase leading-[0.92]"
              style={{
                fontFamily: "'Playfair Display', 'Cinzel', Georgia, serif",
                background: 'linear-gradient(180deg, #FDE68A 0%, #F5C542 30%, #D97706 70%, #92400E 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              NAMAN
            </h1>

            <h2
              className="text-[clamp(2.5rem,12vw,4.5rem)] sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black tracking-tight uppercase leading-[0.92]"
              style={{
                fontFamily: "'Playfair Display', 'Cinzel', Georgia, serif",
                background: 'linear-gradient(180deg, #DC2626 0%, #B91C1C 32%, #450A0A 68%, #09090B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              TIWARI
            </h2>
          </div>

          {/* Subtitle: Software Developer | CSE Student | Problem Solver */}
          <div
            className="flex flex-wrap items-center text-base sm:text-lg lg:text-xl font-normal tracking-wide text-zinc-900 mb-4 sm:mb-5"
          >
            <span className="font-bold text-zinc-900">Software Developer</span>
            <span className="text-zinc-400 mx-2 sm:mx-3 font-light">|</span>
            <span className="font-bold text-zinc-900">CSE Student</span>
            <span className="text-zinc-400 mx-2 sm:mx-3 font-light">|</span>
            <span className="text-black font-black">
              Problem Solver
            </span>
          </div>

          {/* Bio Statement */}
          <p
            className="text-base sm:text-lg text-zinc-800 font-medium leading-relaxed max-w-xl mb-6"
          >
            I build practical software experiences, solve problems with code, and turn ideas into useful products.
          </p>

          {/* Golden Script Signature with Sparkle Star */}
          <div className="flex items-center gap-3 mb-8 sm:mb-10">
            <span
              className="text-4xl sm:text-5xl text-[#92400E] font-bold select-none transform -rotate-2"
              style={{
                fontFamily: "'Caveat', cursive",
              }}
            >
              Naman Tiwari
            </span>
            {/* 4-point Sparkle Star */}
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 sm:w-7 sm:h-7 text-[#B45309] fill-[#B45309]"
            >
              <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
            </svg>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            {/* EXPLORE MY UNIVERSE gradient pill button */}
            <a
              href="#tech-universe"
              onClick={onEnterUniverse}
              className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#F5C542] via-[#F97316] to-[#EF4444] text-black font-extrabold text-sm sm:text-base tracking-wider uppercase flex items-center gap-2.5 hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              <Flame className="w-5 h-5 text-black fill-black" />
              <span>EXPLORE MY UNIVERSE</span>
            </a>

            {/* DIRECT EMAIL translucent dark pill button */}
            <button
              onClick={() => setIsEmailModalOpen(true)}
              className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-zinc-950/90 hover:bg-black text-white font-mono text-sm sm:text-base font-semibold tracking-wider uppercase flex items-center gap-2.5 border border-zinc-800 hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              <Send className="w-4 h-4 text-[#F5C542]" />
              <span>DIRECT EMAIL</span>
            </button>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* RIGHT COLUMN: COMPACT TRANSLUCENT HUD GLASS CARDS                    */}
        {/* ===================================================================== */}
        <div className="hidden">
          
          <div className="font-card-strong relative overflow-hidden group/card w-full max-w-xs sm:max-w-sm rounded-2xl border border-red-950 bg-transparent p-4 sm:p-5 hover:-translate-y-1 hover:border-red-900 transition-all duration-300">
            {/* Header */}
            <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-red-950">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl border border-pink-500/50 bg-gradient-to-br from-red-700 to-pink-500 flex items-center justify-center text-white shadow-[0_0_14px_rgba(236,72,153,0.25)]">
                  <Crosshair className="w-4 h-4 group-hover/card:rotate-45 transition-transform duration-300" />
                </div>
                <div>
                  <span className="block text-sm tracking-[0.18em] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-950 via-red-800 to-pink-500 uppercase">CONTACT</span>
                  <span className="block text-[9px] tracking-[0.12em] text-red-600 uppercase">Direct channels</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-900" />
                </span>
                <span className="text-[10px] font-extrabold text-red-600 tracking-[0.14em]">ONLINE</span>
              </div>
            </div>

            {/* Contact Rows */}
            <div className="space-y-2">
              {/* Email */}
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-3 px-2 py-2 -mx-2 rounded-xl group/item text-left transition-all duration-200 hover:ring-1 hover:ring-pink-500/50 hover:bg-red-950/10 focus-visible:outline focus-visible:outline-1 focus-visible:outline-pink-400"
              >
                <div className="w-9 h-9 rounded-xl border border-pink-500/50 bg-gradient-to-br from-red-950 via-red-900 to-pink-500 group-hover/item:scale-105 flex items-center justify-center text-white transition-all">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-[10px] uppercase tracking-[0.15em] font-extrabold text-red-950">
                    EMAIL
                  </span>
                  <span
                    className="block text-xs sm:text-[13px] font-extrabold text-red-600 truncate transition-colors"
                  >
                    {PERSONAL_INFO.email}
                  </span>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="flex items-center gap-3 px-2 py-2 -mx-2 rounded-xl group/item text-left transition-all duration-200 hover:ring-1 hover:ring-pink-500/50 hover:bg-red-950/10 focus-visible:outline focus-visible:outline-1 focus-visible:outline-pink-400"
              >
                <div className="w-9 h-9 rounded-xl border border-pink-500/50 bg-gradient-to-br from-red-950 via-red-900 to-pink-500 group-hover/item:scale-105 flex items-center justify-center text-white transition-all">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-[10px] uppercase tracking-[0.15em] font-extrabold text-red-950">
                    PHONE
                  </span>
                  <span
                    className="block text-xs sm:text-[13px] font-extrabold text-red-600 truncate transition-colors"
                  >
                    {PERSONAL_INFO.phone}
                  </span>
                </div>
              </a>

              {/* GitHub */}
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-2 py-2 -mx-2 rounded-xl group/item text-left transition-all duration-200 hover:ring-1 hover:ring-pink-500/50 hover:bg-red-950/10 focus-visible:outline focus-visible:outline-1 focus-visible:outline-pink-400"
              >
                <div className="w-9 h-9 rounded-xl border border-pink-500/50 bg-gradient-to-br from-red-950 via-red-900 to-pink-500 group-hover/item:scale-105 flex items-center justify-center text-white transition-all">
                  <Github className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-[10px] uppercase tracking-[0.15em] font-extrabold text-red-950">
                    GITHUB
                  </span>
                  <span
                    className="block text-xs sm:text-[13px] font-extrabold text-red-600 truncate transition-colors"
                  >
                    {PERSONAL_INFO.githubUsername}
                  </span>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-2 py-2 -mx-2 rounded-xl group/item text-left transition-all duration-200 hover:ring-1 hover:ring-pink-500/50 hover:bg-red-950/10 focus-visible:outline focus-visible:outline-1 focus-visible:outline-pink-400"
              >
                <div className="w-9 h-9 rounded-xl border border-pink-500/50 bg-gradient-to-br from-red-950 via-red-900 to-pink-500 group-hover/item:scale-105 flex items-center justify-center text-white transition-all">
                  <Linkedin className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-[10px] uppercase tracking-[0.15em] font-extrabold text-red-950">
                    LINKEDIN
                  </span>
                  <span
                    className="block text-xs sm:text-[13px] font-extrabold text-red-600 truncate transition-colors"
                  >
                    {PERSONAL_INFO.linkedinUsername}
                  </span>
                </div>
              </a>
            </div>
          </div>

          <div className="font-card-strong relative overflow-hidden group/card w-full max-w-xs sm:max-w-sm rounded-2xl border border-red-950 bg-transparent p-4 sm:p-5 hover:-translate-y-1 hover:border-red-900 transition-all duration-300 mt-3 sm:mt-3.5">
            {/* Header */}
            <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-red-950">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl border border-pink-500/50 bg-gradient-to-br from-red-950 via-red-900 to-pink-500 flex items-center justify-center text-pink-100 shadow-[0_0_14px_rgba(190,24,93,0.2)]">
                  <GraduationCap className="w-4 h-4 group-hover/card:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <span className="block text-sm tracking-[0.18em] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-950 via-red-800 to-pink-500 uppercase">EDUCATION</span>
                  <span className="block text-[9px] tracking-[0.12em] text-red-600 uppercase">Academic background</span>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-red-600 tracking-[0.14em]">ACADEMIC</span>
            </div>

            {/* Education Rows */}
            <div className="space-y-2.5">
              {/* Entry 1: Chhatrapati Shahu Ji Maharaj University, Kanpur */}
              <div className="flex items-start gap-3 p-2 -mx-2 rounded-xl text-left transition-all duration-200 group/edu hover:ring-1 hover:ring-pink-500/70 hover:bg-red-950/10">
                <div className="w-9 h-9 rounded-xl border border-pink-500/50 bg-gradient-to-br from-red-950 via-red-900 to-pink-500 group-hover/edu:scale-105 flex items-center justify-center text-pink-100 transition-all shrink-0 mt-0.5">
                  <Building2 className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4
                    className="text-transparent bg-clip-text bg-gradient-to-r from-red-950 via-red-800 to-pink-500 text-sm sm:text-base font-extrabold leading-snug"
                  >
                    Chhatrapati Shahu Ji Maharaj University, Kanpur
                  </h4>
                  <p className="text-red-600 text-[11px] mt-1">
                    Bachelor of Science
                  </p>
                </div>
              </div>

              {/* Entry 2: GL Bajaj Group of Institutions, Mathura */}
              <div className="flex items-start gap-3 p-2 -mx-2 rounded-xl text-left transition-all duration-200 group/edu hover:ring-1 hover:ring-pink-500/70 hover:bg-red-950/10">
                <div className="w-9 h-9 rounded-xl border border-pink-500/50 bg-gradient-to-br from-red-950 via-red-900 to-pink-500 group-hover/edu:scale-105 flex items-center justify-center text-pink-100 transition-all shrink-0 mt-0.5">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4
                    className="text-transparent bg-clip-text bg-gradient-to-r from-red-950 via-red-800 to-pink-500 text-sm sm:text-base font-extrabold leading-snug"
                  >
                    GL Bajaj Group of Institutions, Mathura
                  </h4>
                  <p className="text-red-600 text-[11px] mt-1">
                    B.Tech CSE - Artificial Intelligence & Machine Learning
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Typography: LEARNING / BUILDING with crimson-to-gold gradient underline */}
          <div className="w-full max-w-xs sm:max-w-sm mt-5 sm:mt-6 flex flex-col items-end text-right select-none">
            <div
              className="font-mono text-xs sm:text-sm font-extrabold tracking-[0.45em] text-black"
            >
              <span className="text-black">L E A R N</span><span className="text-red-900"> I N G</span>
            </div>
            <div
              className="font-mono text-xs sm:text-sm font-extrabold tracking-[0.45em] mt-0.5"
            >
              <span className="text-black">B U I L D</span><span className="text-red-900"> I N G</span>
            </div>
            <div className="w-16 h-[2px] bg-gradient-to-r from-black via-red-950 to-red-800 mt-1" />
          </div>

        </div>

      </div>

      {/* Direct CSE Email Dispatch Modal */}
      <CseEmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />
    </section>
  );
};
