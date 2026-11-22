import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import SectionTitle from '../ui/SectionTitle';
import ProjectCard from '../ui/ProjectCard';
import TypewriterText from '../ui/TypewriterText';
import { projects } from '../../data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const scrollTriggerInstance = useRef(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);

  const n = projects.length;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const track = trackRef.current;
        const viewport = viewportRef.current;
        const cards = gsap.utils.toArray('.project-card', track);
        if (cards.length === 0) return;

        // Reset track posisi untuk kalkulasi akurat
        gsap.set(track, { x: 0 });
        gsap.set(cards, { clearProps: 'all' });

        // Hitung jarak horizontal antar titik tengah kartu (center-to-center distance)
        const firstCardRect = cards[0].getBoundingClientRect();
        const secondCardRect = cards[1].getBoundingClientRect();
        const stepDistance = secondCardRect.left - firstCardRect.left;

        // Posisi awal: Hitung selisih agar titik tengah Card 1 persis tepat di titik tengah Viewport layar
        const viewportRect = viewport.getBoundingClientRect();
        const viewportCenterX = viewportRect.left + viewportRect.width / 2;
        const firstCardCenterX = firstCardRect.left + firstCardRect.width / 2;
        const initialOffset = viewportCenterX - firstCardCenterX;

        // Set posisi awal track pas di tengah
        gsap.set(track, { x: initialOffset });

        // Kartu pertama menyala sebagai spotlight utama di awal
        cards.forEach((card, i) => {
          if (i === 0) {
            gsap.set(card, {
              scale: 1.12,
              opacity: 1,
              filter: 'none',
              zIndex: 20,
            });
            card.classList.add('is-spotlight');
          } else {
            gsap.set(card, {
              scale: 0.9,
              opacity: 0.65,
              filter: 'none',
              zIndex: 1,
            });
            card.classList.remove('is-spotlight');
          }
        });

        // Total jarak pergeseran dari kartu 1 ke kartu terakhir di tengah
        const totalTravel = stepDistance * (n - 1);

        // Master Timeline dengan ScrollTrigger Pin
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            start: 'top top',
            end: () => `+=${totalTravel * 1.5}`,
            scrub: 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            fastScrollEnd: true,
            onUpdate: (self) => {
              // Pantau index kartu aktif untuk navigasi tombol panah
              const progress = self.progress;
              const curIndex = Math.min(n - 1, Math.max(0, Math.round(progress * (n - 1))));
              setActiveProjectIndex(curIndex);
            },
          },
        });

        scrollTriggerInstance.current = tl.scrollTrigger;

        // 1. Geser track dari kartu pertama sampai kartu terakhir tiba di center
        tl.to(track, {
          x: initialOffset - totalTravel,
          duration: n - 1,
          ease: 'none',
        }, 0);

        // 2. Interpolasi transisi Spotlight
        for (let i = 0; i < n - 1; i++) {
          const currentCard = cards[i];
          const nextCard = cards[i + 1];

          // Kartu saat ini meninggalkan spotlight: scale 1.12 -> 0.9, opacity 1 -> 0.45
          tl.to(currentCard, {
            scale: 0.9,
            opacity: 0.45,
            duration: 1,
            ease: 'none',
            onStart: () => currentCard.classList.remove('is-spotlight'),
            onReverseComplete: () => currentCard.classList.add('is-spotlight'),
          }, i);

          // Kartu berikutnya masuk spotlight: scale 0.9 -> 1.12, opacity 0.45 -> 1
          tl.to(nextCard, {
            scale: 1.12,
            opacity: 1,
            duration: 1,
            ease: 'none',
            onStart: () => nextCard.classList.add('is-spotlight'),
            onReverseComplete: () => nextCard.classList.remove('is-spotlight'),
          }, i);
        }

        return () => {
          tl.scrollTrigger?.kill();
        };
      });

      return () => media.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, [n]);

  // Sync active index on mobile scroll
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleMobileScroll = () => {
      if (window.innerWidth >= 1024) return;
      const cards = viewport.querySelectorAll('.project-story-card');
      if (!cards.length) return;

      const viewportCenter = viewport.getBoundingClientRect().left + viewport.clientWidth / 2;
      let closestIdx = 0;
      let minDiff = Infinity;

      cards.forEach((card, idx) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const diff = Math.abs(viewportCenter - cardCenter);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });

      setMobileIndex(closestIdx);
    };

    viewport.addEventListener('scroll', handleMobileScroll, { passive: true });
    return () => viewport.removeEventListener('scroll', handleMobileScroll);
  }, []);

  // Handler Scroll Mobile ke Card Tertentu
  const scrollMobileTo = (index) => {
    const targetIdx = Math.max(0, Math.min(n - 1, index));
    const viewport = viewportRef.current;
    if (!viewport) return;
    const cards = viewport.querySelectorAll('.project-story-card');
    if (cards[targetIdx]) {
      cards[targetIdx].scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
      setMobileIndex(targetIdx);
    }
  };

  const prevMobileProject = () => {
    scrollMobileTo(mobileIndex - 1);
  };

  const nextMobileProject = () => {
    scrollMobileTo(mobileIndex + 1);
  };

  return (
    <section ref={sectionRef} id="projects" className="project-story-section section-padding bg-dark-surface/30 relative overflow-hidden">
      <div className="section-container relative z-10 w-full flex flex-col items-center">
        {/* Judul & Deskripsi singkat tepat di tengah */}
        <div className="w-full max-w-2xl text-center mb-6">
          <SectionTitle
            title="Featured Projects"
            align="center"
            subtitle={
              <TypewriterText
                text="Here are some projects I’ve completed"
                speed={30}
              />
            }
          />
        </div>

        {/* Viewport & Horizontal Spotlight Track dengan Tombol Left & Right */}
        <div className="relative w-full flex items-center justify-center">
          {/* Left Arrow Button (Mobile only) */}
          <button
            onClick={prevMobileProject}
            disabled={mobileIndex === 0}
            aria-label="Previous project"
            className={`flex lg:hidden absolute left-2 sm:left-4 z-30 w-10 h-10 rounded-full bg-dark/90 border border-white/20 text-white items-center justify-center transition-all duration-200 shadow-2xl backdrop-blur-md cursor-pointer ${
              mobileIndex === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:scale-105 active:scale-95 border-accent-cyan/50 text-accent-cyan'
            }`}
          >
            <FaChevronLeft className="text-xs" />
          </button>

          {/* Right Arrow Button (Mobile only) */}
          <button
            onClick={nextMobileProject}
            disabled={mobileIndex === n - 1}
            aria-label="Next project"
            className={`flex lg:hidden absolute right-2 sm:right-4 z-30 w-10 h-10 rounded-full bg-dark/90 border border-white/20 text-white items-center justify-center transition-all duration-200 shadow-2xl backdrop-blur-md cursor-pointer ${
              mobileIndex === n - 1 ? 'opacity-20 cursor-not-allowed' : 'hover:scale-105 active:scale-95 border-accent-cyan/50 text-accent-cyan'
            }`}
          >
            <FaChevronRight className="text-xs" />
          </button>

          {/* Viewport Track */}
          <div ref={viewportRef} className="project-story-viewport py-6 w-full">
            <div ref={trackRef} className="project-story-track flex items-center">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  className="project-story-card flex-shrink-0"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
