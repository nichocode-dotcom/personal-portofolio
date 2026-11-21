import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../ui/SectionTitle';
import ProjectCard from '../ui/ProjectCard';
import TypewriterText from '../ui/TypewriterText';
import { projects } from '../../data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isDesktop = window.innerWidth >= 768;
      const cards = gsap.utils.toArray('.project-card');
      const shimmers = gsap.utils.toArray('.card-shimmer');

      if (!isDesktop) {
        // Mobile layout: Clean cascade
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
        return;
      }

      // REKOMENDASI 3: KINETIC 3D WAVE DROP & SPECULAR LIGHT SWEEP
      // Baris atas (0, 1, 2) turun diagonal dari kiri-atas dengan rotasi 3D
      // Baris bawah (3, 4, 5) turun diagonal dari kanan-atas
      cards.forEach((card, i) => {
        const isTopRow = i < 3;
        const colIndex = i % 3; // 0, 1, 2

        gsap.set(card, {
          opacity: 0,
          y: isTopRow ? -90 : 80,
          x: (colIndex - 1) * 60, // Memancar keluar dari tengah
          rotationX: isTopRow ? 28 : -22,
          rotationY: (colIndex - 1) * 15,
          scale: 0.86,
          filter: 'blur(8px)',
          transformPerspective: 1400,
        });
      });

      // Master Timeline yang dipicu saat user scroll mendekati pertengahan section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 48%',
          toggleActions: 'play none none none',
        },
      });

      // Step 1: Kinetic Wave Drop ke slot grid masing-masing (durasi lebih cepat, snap responsif)
      tl.to(cards, {
        opacity: 1,
        y: 0,
        x: 0,
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.65,
        stagger: {
          each: 0.06,
          from: 'start', // Gelombang cepat dari kiri atas ke kanan bawah
        },
        ease: 'power3.out',
      });

      // Step 2: Specular Light Wave Sweep yang menyapu melintasi ke-6 kartu secara cepat
      tl.fromTo(
        shimmers,
        {
          x: '-100%',
          opacity: 0,
        },
        {
          x: '200%',
          opacity: 0.75,
          duration: 0.45,
          stagger: 0.05,
          ease: 'power2.inOut',
        },
        '-=0.35' // Mulai menyapu saat kartu mendarat
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="section-padding bg-dark-surface/30 relative overflow-hidden">
      <div className="section-container relative z-10">
        <SectionTitle
          title="Featured Projects"
          subtitle={
            <TypewriterText
              text="Here are some projects I’ve completed"
              speed={30}
            />
          }
        />

        {/* 3D Perspective Grid */}
        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4"
          style={{ perspective: 1600 }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
