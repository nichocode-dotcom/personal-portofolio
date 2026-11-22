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
  const trackRef = useRef(null);
  const viewportRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const track = trackRef.current;
        const viewport = viewportRef.current;
        const cards = gsap.utils.toArray('.project-card', track);
        const n = cards.length;
        if (n === 0) return;

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

        // Kartu pertama menyala sebagai spotlight utama di awal (tanpa blur apapun)
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
              filter: 'none', // Pastikan jernih dan tidak buram
              zIndex: 1,
            });
            card.classList.remove('is-spotlight');
          }
        });

        // Total jarak pergeseran dari kartu 1 ke kartu terakhir di tengah
        const totalTravel = stepDistance * (n - 1);

        // Master Timeline dengan ScrollTrigger Pin
        // scrub: 0.6 memberikan peredam kejut (momentum smoothing) agar putaran gerigi wheel mouse terasa lembut seperti mentega tanpa jeda
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            start: 'top top',
            end: () => `+=${totalTravel * 1.5}`,
            scrub: 0.6, // Halus dan tetap 100% mengikuti scroll
            invalidateOnRefresh: true,
            anticipatePin: 1,
            fastScrollEnd: true,
          },
        });

        // 1. Geser track dari kartu pertama sampai kartu terakhir tiba di center
        tl.to(track, {
          x: initialOffset - totalTravel,
          duration: n - 1,
          ease: 'none',
        }, 0);

        // 2. Interpolasi transisi Spotlight:
        // Hindari animasi 'filter: blur' di GPU saat pergeseran kontinu karena menyebabkan micro-stutter
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
  }, []);

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

        {/* Viewport & Horizontal Spotlight Track */}
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
    </section>
  );
}
