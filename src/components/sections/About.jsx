import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../ui/SectionTitle';
import TypewriterText from '../ui/TypewriterText';
import ImageWithSkeleton from '../ui/ImageWithSkeleton';
import { personalInfo } from '../../data/personal';
import profilePhoto from '../../assets/images/profile1.webp';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const cardContainerRef = useRef(null);
  const textContentRef = useRef(null);
  const cardRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [sheen, setSheen] = useState({ x: 50, y: 50 });

  // 3D Tilt saat mouse hover di dalam card
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;

    setRotate({
      x: normY * -10,
      y: normX * 10,
    });

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

  // GSAP Cinematic Scroll Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cek apakah layar desktop/tablet (>= 768px)
      const isDesktop = window.innerWidth >= 768;

      if (!isDesktop) {
        // Tampilan mobile: animasi smooth fade-up sederhana
        gsap.fromTo(
          cardContainerRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play none none none',
            },
          }
        );
        gsap.fromTo(
          textContentRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none none',
            },
          }
        );
        return;
      }

      // DESKTOP CINEMATIC FLIP & SWEEP
      // Posisi awal: Card tepat di TENGAH horizontal section
      // Jarak pergeseran dihitung dari selisih posisi col-5 ke tengah
      const cardEl = cardContainerRef.current;
      const textChildren = textContentRef.current ? Array.from(textContentRef.current.children) : [];

      // Hitung offset agar posisi awal card berada pas di tengah container 12-col
      const containerWidth = sectionRef.current.querySelector('.section-container').offsetWidth;
      const initialShiftX = (containerWidth * 0.58) / 2; // bergeser ke tengah layar

      // Set initial state
      gsap.set(cardEl, {
        x: initialShiftX,
        rotationY: -180, // Berawal dari posisi flip belakang
        scale: 0.95,
        transformPerspective: 1400,
        transformOrigin: '50% 50%',
      });

      gsap.set(textChildren, {
        opacity: 0,
        x: -80,
      });

      // Master Timeline yang dipicu saat user scroll mendekati pertengahan section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          // Mulai saat section masuk 45% (mendekati tengah viewport)
          start: 'top 45%',
          toggleActions: 'play none none none',
        },
      });

      // Step 1: Card berputar (flip 180 deg) dan meluncur mulus ke sisi kiri
      tl.to(cardEl, {
        x: 0,
        rotationY: 0,
        scale: 1,
        duration: 1.6,
        ease: 'power3.inOut',
      });

      // Step 2: Teks ditarik keluar dari arah kiri (jalur card) secara mulus
      tl.to(
        textChildren,
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
        },
        '-=0.9' // Mulai overlap ketika card sedang separuh jalan menuju kiri
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section-padding relative overflow-hidden select-none">
      <div className="section-container relative z-10">
        <SectionTitle
          title="About Me"
          subtitle={<TypewriterText text="Get to know the person behind the code" speed={40} />}
        />

        <div className="grid md:grid-cols-12 gap-10 md:gap-14 lg:gap-16 items-center max-w-6xl mx-auto overflow-hidden pt-4">
          {/* SISI KIRI: Card berawal di tengah, flip & meluncur ke kiri via GSAP (Tanpa Glow Blur Belakang) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center">
            <div
              ref={cardContainerRef}
              className="relative w-full max-w-[340px] sm:max-w-[380px] md:max-w-[400px] lg:max-w-[420px] group"
              style={{ perspective: 1400 }}
            >
              {/* Main Photo 3D Card */}
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
                className="relative aspect-[4/5] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-dark-surface shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] cursor-pointer"
              >
                {/* Gambar Foto Profil */}
                <ImageWithSkeleton
                  src={profilePhoto}
                  alt={personalInfo.name}
                  containerClassName="w-full h-full"
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
            </div>
          </div>

          {/* SISI KANAN: Konten ditarik/unveil dari arah kiri secara mulus dengan GSAP */}
          <div
            ref={textContentRef}
            className="md:col-span-7 flex flex-col justify-center gap-7 lg:gap-9"
          >
            {/* Location Tag */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
                Yogyakarta, Indonesia
              </div>
            </div>

            {/* Intro Paragraph (English) */}
            <div>
              <p className="text-sm sm:text-base md:text-[17px] font-body text-slate-300 leading-relaxed font-normal">
                Hi, I&apos;m Nicho. I build responsive websites with clear layouts and thoughtful details, making them easy to use on any device. Have a project in mind? Let&apos;s collaborate with me.
              </p>
            </div>

            {/* Key Focus & Highlights */}
            <div className="pt-2 space-y-4">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-slate-400">
                Core Competencies & Focus
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {[
                  {
                    num: '01 / FOCUS',
                    title: 'Web Applications',
                    desc: 'Useful tools and experiences built for the web',
                    color: 'text-accent-cyan',
                    hoverBorder: 'hover:border-accent-cyan/30',
                  },
                  {
                    num: '02 / CRAFT',
                    title: 'UI Engineering',
                    desc: 'Responsive interface, micro-interactions & accessibility',
                    color: 'text-accent-indigo',
                    hoverBorder: 'hover:border-accent-indigo/30',
                  },
                  {
                    num: '03 / STACK',
                    title: 'Frontend Stack',
                    desc: 'Next, React, Tailwind CSS, Vite & Framer Motion',
                    color: 'text-emerald-400',
                    hoverBorder: 'hover:border-emerald-400/30',
                  },
                ].map((item) => (
                  <div
                    key={item.num}
                    className={`p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] ${item.hoverBorder} transition-colors group cursor-default`}
                  >
                    <div className={`text-xs font-mono ${item.color} mb-1.5`}>{item.num}</div>
                    <div className="text-sm font-semibold text-white group-hover:text-white transition-colors">
                      {item.title}
                    </div>
                    <div className="text-xs text-slate-400 mt-1 leading-normal">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
