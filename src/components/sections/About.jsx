import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import TypewriterText from '../ui/TypewriterText';
import { personalInfo } from '../../data/personal';
import profilePhoto from '../../assets/images/profile1.jpg';

export default function About() {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [sheen, setSheen] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalisasi -1 sampai 1
    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;

    // 3D tilt angles (rotasi halus dan presisi)
    setRotate({
      x: normY * -10,
      y: normX * 10,
    });

    // Posisi pantulan kilau cahaya (sheen)
    setSheen({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100),
    });
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <section id="about" className="section-padding relative overflow-hidden select-none">
      {/* Background glow accent */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-accent-indigo/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="section-container relative z-10">
        <SectionTitle
          title="About Me"
          subtitle={<TypewriterText text="Get to know the person behind the code" speed={40} />}
        />

        <div className="grid md:grid-cols-12 gap-10 md:gap-14 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* SISI KIRI: Interactive 3D Holographic Card + Behind The Code Tag (No Border) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative w-full max-w-[340px] sm:max-w-[380px] md:max-w-[400px] lg:max-w-[420px] group"
              style={{ perspective: 1000 }}
            >
              {/* Ambient diffuse glow behind the photo - mekar lebih terang saat di-hover */}
              <div
                className="absolute -inset-4 bg-gradient-to-tr from-accent-indigo/35 via-accent-cyan/25 to-blue-600/20 rounded-3xl blur-2xl pointer-events-none transition-all duration-500 ease-out"
                style={{
                  opacity: isHovered ? 0.95 : 0.55,
                  transform: `scale(${isHovered ? 1.08 : 1})`,
                }}
              />

              {/* Main Photo 3D Card - Completely borderless, spring physics tilt */}
              <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                animate={{
                  rotateX: rotate.x,
                  rotateY: rotate.y,
                  scale: isHovered ? 1.03 : 1,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                  mass: 0.5,
                }}
                style={{ transformStyle: 'preserve-3d' }}
                className="relative aspect-[4/5] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-dark-surface shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_40px_rgba(99,102,241,0.18)] cursor-pointer"
              >
                {/* Gambar Foto Profil */}
                <img
                  src={profilePhoto}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-top pointer-events-none transition-transform duration-700 ease-out"
                />

                {/* Pantulan Kilau Holografik Dinamis (Iridescent Foil Flare) */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
                  style={{
                    opacity: isHovered ? 0.45 : 0,
                    background: `radial-gradient(circle 360px at ${sheen.x}% ${sheen.y}%, rgba(255,255,255,0.7) 0%, rgba(34,211,238,0.3) 30%, rgba(139,92,246,0.18) 55%, transparent 80%)`,
                    mixBlendMode: 'color-dodge',
                  }}
                />

                {/* Diagonal Specular Sheen Shimmer */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-10"
                  style={{
                    opacity: isHovered ? 0.25 : 0,
                    background: `linear-gradient(${115 + rotate.y * 2.5}deg, transparent 20%, rgba(255,255,255,0.35) 48%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.35) 52%, transparent 80%)`,
                    mixBlendMode: 'overlay',
                  }}
                />

                {/* Subtle soft vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-transparent pointer-events-none opacity-50 group-hover:opacity-30 transition-opacity duration-500" />


              </motion.div>
            </motion.div>
          </div>

          {/* SISI KANAN: Narrative Story & Key Stats (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="md:col-span-7 space-y-6"
          >
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Interesting in Join the Web Development team
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white leading-tight">
                Crafting digital experiences where <span className="gradient-text">design meets code</span>.
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base font-body">
                Hai, I&apos;m Nicho, a Frontend Developer who enjoys turning ideas into websites that are clear, responsive, and easy to use.
              </p>
              <p className="text-slate-400 leading-relaxed text-sm md:text-base font-body">
                I'm especially interested in building websites for some eventes, places where people can find the schedule, speakers, and registration details they need. 
              </p>
            </div>

            {/* Quick Metrics / Stats Grid */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {personalInfo.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-light p-3.5 sm:p-4 rounded-xl border border-white/[0.08] text-center"
                >
                  <div className="text-xl sm:text-2xl font-heading font-bold text-white mb-0.5">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

