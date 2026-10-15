import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/personal';
import { scrollToSection } from '../../utils/scroll';
import TypewriterText from '../ui/TypewriterText';
import heroReal from '../../assets/images/hero_real.png';

export default function Hero() {
  const [activeSide, setActiveSide] = useState(null); // 'left' | 'right' | null
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const rafId = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (window.innerWidth < 768) return;
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    if (rafId.current) cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      setMousePos({ x: mx, y: my });
      if (mx < -0.22) {
        setActiveSide('left');
      } else if (mx > 0.22) {
        setActiveSide('right');
      } else {
        setActiveSide(null);
      }
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    setActiveSide(null);
    setMousePos({ x: 0, y: 0 });
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-12 pb-20 sm:pb-28 lg:pb-36"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, #0a0a1a 0%, #050510 100%)' }}
    >
      {/* ── Dynamic Ambient Glow Orbs (GPU Accelerated) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Left Glow: Creative Indigo */}
        <div
          className="absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, transparent 70%)',
            opacity: activeSide === 'left' ? 1 : activeSide === 'right' ? 0.2 : 0.45,
            transform: `translate3d(${mousePos.x * -24}px, ${mousePos.y * -16}px, 0)`,
            transition: 'opacity 0.5s ease-out, transform 0.25s ease-out',
            willChange: 'transform, opacity',
          }}
        />

        {/* Right Glow: Cyber Cyan */}
        <div
          className="absolute top-1/4 -right-32 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.35) 0%, transparent 70%)',
            opacity: activeSide === 'right' ? 1 : activeSide === 'left' ? 0.2 : 0.45,
            transform: `translate3d(${mousePos.x * 24}px, ${mousePos.y * -16}px, 0)`,
            transition: 'opacity 0.5s ease-out, transform 0.25s ease-out',
            willChange: 'transform, opacity',
          }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* ═══════════ MAIN HERO CONTENT ═══════════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center">

        {/* ── Layered Portrait + Typography 3D Stage ── */}
        <div
          className="relative w-full flex items-center justify-center pt-4 sm:pt-8"
          style={{
            minHeight: 'clamp(380px, 58vh, 560px)',
            perspective: '1200px',
          }}
        >

          {/* LAYER 1: Giant Outlined Typography (Deep Background Reverse Parallax) */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
            style={{
              transform: `translate3d(${mousePos.x * -16}px, ${mousePos.y * -10}px, 0)`,
              transition: 'transform 0.35s ease-out',
            }}
          >
            <h1
              className="font-heading font-black uppercase tracking-tighter leading-none whitespace-nowrap"
              style={{
                fontSize: 'clamp(140px, 24vw, 340px)',
                color: 'transparent',
                WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.08)',
                letterSpacing: '-0.04em',
                userSelect: 'none',
              }}
            >
              NICHO
            </h1>
          </div>

          {/* LAYER 2: Reaktif Halo Aura Langsung di Belakang Karakter */}
          <div
            className="absolute rounded-full pointer-events-none blur-[90px] sm:blur-[110px] transition-all duration-700 ease-out"
            style={{
              width: 'clamp(280px, 36vw, 460px)',
              height: 'clamp(320px, 42vw, 520px)',
              transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 14}px, 0)`,
              background:
                activeSide === 'left'
                  ? 'radial-gradient(circle, rgba(99,102,241,0.5) 0%, rgba(139,92,246,0.2) 60%, transparent 80%)'
                  : activeSide === 'right'
                  ? 'radial-gradient(circle, rgba(34,211,238,0.5) 0%, rgba(6,182,212,0.2) 60%, transparent 80%)'
                  : 'radial-gradient(ellipse at center, rgba(129,140,248,0.3) 0%, rgba(34,211,238,0.25) 45%, transparent 75%)',
            }}
          />

          {/* LAYER 3: 3D Interactive Tilting Character (Single Hero Photo) */}
          <motion.div
            className="relative z-10"
            style={{
              width: 'clamp(320px, 42vw, 540px)',
              aspectRatio: '447 / 558',
              maxHeight: '65vh',
              transformStyle: 'preserve-3d',
              willChange: 'transform',
              WebkitMaskImage:
                'linear-gradient(to bottom, black 0%, black 65%, rgba(0, 0, 0, 0.78) 78%, rgba(0, 0, 0, 0.22) 90%, transparent 100%)',
              maskImage:
                'linear-gradient(to bottom, black 0%, black 65%, rgba(0, 0, 0, 0.78) 78%, rgba(0, 0, 0, 0.22) 90%, transparent 100%)',
            }}
            animate={{
              rotateY: mousePos.x * 10, // 3D yaw tilt halus
              rotateX: mousePos.y * -6,  // 3D pitch tilt halus
              x: mousePos.x * 12,
              y: mousePos.y * 6,
            }}
            transition={{
              type: 'spring',
              stiffness: 90,
              damping: 20,
              mass: 0.5,
            }}
          >
            {/* Organic Breathing Floating Motion Inner Wrapper */}
            <motion.div
              className="w-full h-full"
              style={{ willChange: 'transform' }}
              animate={{ y: [-5, 5, -5] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <img
                src={heroReal}
                alt="Nicho Arie Setiawan"
                className="w-full h-full object-cover object-top pointer-events-none select-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                style={{ objectPosition: 'center top' }}
              />
            </motion.div>
          </motion.div>

          {/* LAYER 4: Side Labels (Desktop only) */}
          {/* SISI KIRI: Designer (Creative Vision) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            onMouseEnter={() => setActiveSide('left')}
            onMouseLeave={() => setActiveSide(null)}
            className={`hidden lg:flex absolute left-4 xl:left-10 2xl:left-16 top-1/2 -translate-y-1/2 flex-col items-end text-right cursor-pointer select-none transition-all duration-500 max-w-[230px] xl:max-w-[270px] ${
              activeSide === 'left'
                ? 'opacity-100 scale-105'
                : activeSide === 'right'
                ? 'opacity-30 scale-95'
                : 'opacity-85'
            }`}
          >
            <span className={`text-[11px] xl:text-xs font-mono tracking-[0.2em] uppercase font-semibold mb-1.5 transition-colors duration-300 ${
              activeSide === 'left' ? 'text-accent-indigo' : 'text-slate-400'
            }`}>
              Creative Vision
            </span>
            <h2
              className={`text-3xl sm:text-4xl xl:text-[42px] font-heading font-extrabold tracking-tight transition-colors duration-500 ${
                activeSide === 'left' ? 'text-accent-indigo' : 'text-white'
              }`}
            >
              designer
            </h2>
            <p className="mt-2.5 text-slate-400 text-xs sm:text-sm leading-relaxed">
              Crafting intuitive interfaces with modern visual aesthetics
            </p>
            <div className="mt-3.5 flex items-center gap-1.5 text-[11px] font-mono text-slate-300">
              <span className={`px-2.5 py-1 rounded transition-colors duration-300 ${
                activeSide === 'left'
                  ? 'bg-accent-indigo/20 border border-accent-indigo/40 text-accent-indigo'
                  : 'bg-white/[0.05] border border-white/10'
              }`}>
                UI Design
              </span>
              <span className={`px-2.5 py-1 rounded transition-colors duration-300 ${
                activeSide === 'left'
                  ? 'bg-accent-indigo/20 border border-accent-indigo/40 text-accent-indigo'
                  : 'bg-white/[0.05] border border-white/10'
              }`}>
                Figma
              </span>
            </div>
          </motion.div>

          {/* SISI KANAN: Coder (Engineering Core) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            onMouseEnter={() => setActiveSide('right')}
            onMouseLeave={() => setActiveSide(null)}
            className={`hidden lg:flex absolute right-4 xl:right-10 2xl:right-16 top-1/2 -translate-y-1/2 flex-col items-start text-left cursor-pointer select-none transition-all duration-500 max-w-[230px] xl:max-w-[270px] ${
              activeSide === 'right'
                ? 'opacity-100 scale-105'
                : activeSide === 'left'
                ? 'opacity-30 scale-95'
                : 'opacity-85'
            }`}
          >
            <span className={`text-[11px] xl:text-xs font-mono tracking-[0.2em] uppercase font-semibold mb-1.5 transition-colors duration-300 ${
              activeSide === 'right' ? 'text-accent-cyan' : 'text-slate-400'
            }`}>
              Engineering Core
            </span>
            <h2
              className={`text-3xl sm:text-4xl xl:text-[42px] font-mono font-bold tracking-tight transition-colors duration-500 ${
                activeSide === 'right' ? 'text-accent-cyan' : 'text-white'
              }`}
            >
              &lt;coder&gt;
            </h2>
            <p className="mt-2.5 text-slate-400 text-xs sm:text-sm leading-relaxed">
              Building performant, responsive web experiences with clean code
            </p>
            <div className="mt-3.5 flex items-center gap-1.5 text-[11px] font-mono text-slate-300">
              <span className={`px-2.5 py-1 rounded transition-colors duration-300 ${
                activeSide === 'right'
                  ? 'bg-accent-cyan/20 border border-accent-cyan/40 text-accent-cyan'
                  : 'bg-white/[0.05] border border-white/10'
              }`}>
                React
              </span>
              <span className={`px-2.5 py-1 rounded transition-colors duration-300 ${
                activeSide === 'right'
                  ? 'bg-accent-cyan/20 border border-accent-cyan/40 text-accent-cyan'
                  : 'bg-white/[0.05] border border-white/10'
              }`}>
                Tailwind
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom Info: Name + Role + CTAs ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="relative z-20 text-center -mt-6 sm:-mt-10 md:-mt-12"
        >
          <p className="text-xs sm:text-sm font-mono tracking-[0.15em] uppercase text-slate-500 mb-2">
            {personalInfo.role}
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white tracking-tight">
            {personalInfo.name}
          </h1>
          <div className="mt-3 text-slate-300 text-sm sm:text-base max-w-lg mx-auto leading-relaxed px-4 min-h-[30px] flex items-center justify-center">
            <TypewriterText
              text={personalInfo.tagline}
              speed={35}
              delay={600}
              className="inline-flex items-center justify-center font-mono text-sm sm:text-base text-slate-300"
              cursorColor="bg-accent-cyan"
              glowColor="rgba(34,211,238,0.8)"
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-7">
            <button
              onClick={() => scrollToSection('projects')}
              className="btn-primary w-44 sm:w-auto px-7 py-3"
            >
              View Projects
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-outline w-44 sm:w-auto px-7 py-3"
            >
              Contact Me
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-4 mt-7 mb-4 sm:mb-6">
            {personalInfo.socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target={social.url.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08]
                             flex items-center justify-center text-slate-400 hover:text-white
                             hover:bg-accent-indigo/20 hover:border-accent-indigo/30
                             transition-all duration-150 hover:scale-110 active:scale-90 shadow-sm"
                  aria-label={social.name}
                >
                  <Icon className="text-xl" />
                </a>
              );
            })}
          </div>
        </motion.div>

        {/* Mobile-only side labels (below photo) */}
        <div className="flex lg:hidden items-center justify-center gap-7 mt-6">
          <div
            onClick={() => setActiveSide(activeSide === 'left' ? null : 'left')}
            className={`text-center cursor-pointer transition-all duration-300 ${
              activeSide === 'left' ? 'opacity-100 scale-105' : activeSide === 'right' ? 'opacity-30' : 'opacity-85'
            }`}
          >
            <span className="text-[11px] font-mono tracking-wider uppercase text-accent-indigo font-semibold">Creative</span>
            <h3 className={`text-xl font-heading font-bold mt-0.5 transition-colors ${activeSide === 'left' ? 'text-accent-indigo' : 'text-white'}`}>
              designer
            </h3>
          </div>
          <div className="w-px h-10 bg-white/15" />
          <div
            onClick={() => setActiveSide(activeSide === 'right' ? null : 'right')}
            className={`text-center cursor-pointer transition-all duration-300 ${
              activeSide === 'right' ? 'opacity-100 scale-105' : activeSide === 'left' ? 'opacity-30' : 'opacity-85'
            }`}
          >
            <span className="text-[11px] font-mono tracking-wider uppercase text-accent-cyan font-semibold">Engineering</span>
            <h3 className={`text-xl font-mono font-bold mt-0.5 transition-colors ${activeSide === 'right' ? 'text-accent-cyan' : 'text-white'}`}>
              &lt;coder&gt;
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}

