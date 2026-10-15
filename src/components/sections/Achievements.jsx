import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaAward, FaTimes, FaChevronLeft, FaChevronRight, FaThLarge } from 'react-icons/fa';
import { HiOutlineDocumentText } from 'react-icons/hi';
import SectionTitle from '../ui/SectionTitle';
import TypewriterText from '../ui/TypewriterText';
import { achievements } from '../../data/achievements';

const accentStyles = {
  amber: {
    border: 'border-amber-500/30',
    badge: 'bg-dark/95 text-amber-300 border-amber-400/40 shadow-md',
    glow: 'shadow-[0_0_50px_rgba(245,158,11,0.25)]',
    text: 'text-amber-400',
    btn: 'bg-amber-500/15 hover:bg-amber-500/30 text-amber-300 border-amber-500/30',
  },
  cyan: {
    border: 'border-cyan-500/30',
    badge: 'bg-dark/95 text-cyan-300 border-cyan-400/40 shadow-md',
    glow: 'shadow-[0_0_50px_rgba(34,211,238,0.25)]',
    text: 'text-cyan-400',
    btn: 'bg-cyan-500/15 hover:bg-cyan-500/30 text-cyan-300 border-cyan-500/30',
  },
  violet: {
    border: 'border-purple-500/30',
    badge: 'bg-dark/95 text-purple-300 border-purple-400/40 shadow-md',
    glow: 'shadow-[0_0_50px_rgba(168,85,247,0.25)]',
    text: 'text-purple-400',
    btn: 'bg-purple-500/15 hover:bg-purple-500/30 text-purple-300 border-purple-500/30',
  },
  emerald: {
    border: 'border-emerald-500/30',
    badge: 'bg-dark/95 text-emerald-300 border-emerald-400/40 shadow-md',
    glow: 'shadow-[0_0_50px_rgba(16,185,129,0.25)]',
    text: 'text-emerald-400',
    btn: 'bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-300 border-emerald-500/30',
  },
  rose: {
    border: 'border-rose-500/30',
    badge: 'bg-dark/95 text-rose-300 border-rose-400/40 shadow-md',
    glow: 'shadow-[0_0_50px_rgba(244,63,94,0.25)]',
    text: 'text-rose-400',
    btn: 'bg-rose-500/15 hover:bg-rose-500/30 text-rose-300 border-rose-500/30',
  },
};

export default function Achievements() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCert, setSelectedCert] = useState(null);
  const [showAllModal, setShowAllModal] = useState(false);
  const containerRef = useRef(null);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? achievements.length - 1 : prev - 1));
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev === achievements.length - 1 ? 0 : prev + 1));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedCert || showAllModal) return;
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide, selectedCert, showAllModal]);

  const activeItem = achievements[activeIndex];
  const count = achievements.length;

  return (
    <section id="achievements" className="section-padding bg-dark/60 relative overflow-hidden select-none">
      {/* Background ambient lighting synced to active card color */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-accent-indigo/[0.06] rounded-full blur-[140px] pointer-events-none transition-all duration-700" />

      <div className="section-container relative z-10">
        <SectionTitle
          title="Achievements & Awards"
          subtitle={
            <TypewriterText
              text="A selection of achievements and awards I have received"
              speed={30}
            />
          }
        />

        {/* 3D Infinite Circular Coverflow Slider Carousel */}
        <div
          ref={containerRef}
          className="relative w-full max-w-5xl mx-auto h-[260px] sm:h-[340px] md:h-[400px] flex items-center justify-center my-6"
          style={{ perspective: '1100px' }}
        >
          {/* Navigation arrow buttons */}
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute -left-2 sm:left-2 md:left-4 z-40 w-10 h-10 md:w-12 md:h-12 rounded-full bg-dark-surface/90 hover:bg-dark-lighter border border-white/15 text-slate-300 hover:text-white flex items-center justify-center shadow-2xl backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
          >
            <FaChevronLeft className="text-sm md:text-base -translate-x-0.5" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute -right-2 sm:right-2 md:right-4 z-40 w-10 h-10 md:w-12 md:h-12 rounded-full bg-dark-surface/90 hover:bg-dark-lighter border border-white/15 text-slate-300 hover:text-white flex items-center justify-center shadow-2xl backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
          >
            <FaChevronRight className="text-sm md:text-base translate-x-0.5" />
          </button>

          {/* Cards Track (Seamless Circular Looping) */}
          <div className="relative w-full h-full flex items-center justify-center">
            {achievements.map((item, index) => {
              // Menghitung offset melingkar terpendek (circular distance)
              let offset = (index - activeIndex) % count;
              if (offset > count / 2) offset -= count;
              if (offset < -count / 2) offset += count;

              const isCenter = offset === 0;
              const style = accentStyles[item.accentColor] || accentStyles.amber;

              // Hitung transform 3D coverflow berdasarkan circular offset
              let xOffset = 0;
              let rotateY = 0;
              let scale = 1;
              let zIndex = 20 - Math.abs(offset);
              let opacity = 1;

              if (offset === 0) {
                xOffset = 0;
                scale = 1;
                rotateY = 0;
                opacity = 1;
              } else if (offset === -1) {
                xOffset = -230;
                scale = 0.82;
                rotateY = 24;
                opacity = 0.78;
              } else if (offset === 1) {
                xOffset = 230;
                scale = 0.82;
                rotateY = -24;
                opacity = 0.78;
              } else if (offset === -2) {
                xOffset = -390;
                scale = 0.68;
                rotateY = 32;
                opacity = 0.45;
              } else if (offset === 2) {
                xOffset = 390;
                scale = 0.68;
                rotateY = -32;
                opacity = 0.45;
              } else {
                xOffset = offset < 0 ? -480 : 480;
                scale = 0.55;
                rotateY = offset < 0 ? 38 : -38;
                opacity = 0.15;
              }

              return (
                <motion.div
                  key={item.id}
                  onClick={() => {
                    if (isCenter) {
                      setSelectedCert(item);
                    } else {
                      setActiveIndex(index);
                    }
                  }}
                  animate={{
                    x: xOffset,
                    scale: scale,
                    rotateY: rotateY,
                    opacity: opacity,
                    zIndex: zIndex,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 26,
                  }}
                  className={`absolute w-[260px] sm:w-[420px] md:w-[480px] h-[170px] sm:h-[260px] md:h-[300px] rounded-2xl overflow-hidden cursor-pointer transition-shadow duration-300 ${
                    isCenter
                      ? `border-2 ${style.border} ${style.glow} shadow-2xl`
                      : 'border border-white/10 shadow-lg'
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="relative w-full h-full bg-dark-surface rounded-2xl overflow-hidden group">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center pointer-events-none transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent pointer-events-none" />

                    {/* Badge on Card */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold tracking-wide border backdrop-blur-xl ${style.badge}`}
                      >
                        <FaAward className="text-xs" />
                        {item.category}
                      </span>
                    </div>

                    {/* Center hover hint for preview */}
                    {isCenter && (
                      <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                        <span className="px-4 py-2 rounded-xl bg-white/15 border border-white/30 text-xs font-medium text-white flex items-center gap-2 shadow-2xl backdrop-blur-md">
                          <HiOutlineDocumentText className="text-base" />
                          View Certificate
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Dots Pagination */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {achievements.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex
                  ? 'w-8 bg-accent-indigo'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Dynamic Detail Information Section Below Carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="max-w-2xl mx-auto text-center px-4"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-white mb-3 tracking-tight">
              {activeItem.title}
            </h3>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6 font-body">
              {activeItem.summary}
            </p>

            {/* View All Certificates Button */}
            <button
              onClick={() => setShowAllModal(true)}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-dark-surface/90 hover:bg-dark-lighter border border-white/15 hover:border-accent-indigo text-slate-200 hover:text-white text-xs sm:text-sm font-heading font-medium shadow-xl hover:shadow-[0_0_30px_rgba(99,102,241,0.25)] transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <FaThLarge className="text-accent-indigo text-sm" />
              View All Certificates
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* MODAL 1: View All Certificates (Gallery Grid Modal) */}
      {showAllModal && (
        <div
          onClick={() => setShowAllModal(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[90vh] bg-dark-surface border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-4 p-5 sm:p-6 border-b border-white/[0.08] bg-dark/60">
              <div>
                <span className="text-xs font-mono text-accent-indigo uppercase tracking-wider block mb-1 font-semibold">
                  Portfolio Archives
                </span>
                <h4 className="text-lg sm:text-2xl font-heading font-bold text-white">
                  All Achievements & Awards
                </h4>
              </div>
              <button
                onClick={() => setShowAllModal(false)}
                className="w-10 h-10 rounded-xl bg-white/[0.06] hover:bg-white/15 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Content - Systematic Grid List */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {achievements.map((item) => {
                  const style = accentStyles[item.accentColor] || accentStyles.amber;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        setShowAllModal(false);
                        setSelectedCert(item);
                      }}
                      className={`group glass border ${style.border} p-4 rounded-xl flex flex-col justify-between hover:scale-[1.02] transition-all duration-300 cursor-pointer hover:shadow-xl`}
                    >
                      <div className="relative h-44 rounded-lg overflow-hidden mb-3.5 bg-black/40 border border-white/[0.08]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 left-2 z-10">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold border backdrop-blur-md ${style.badge}`}
                          >
                            <FaAward className="text-[9px]" />
                            {item.category}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-dark/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
                          <span className="px-3 py-1.5 rounded-lg bg-white/20 border border-white/30 text-xs font-medium text-white flex items-center gap-1.5">
                            <HiOutlineDocumentText />
                            Inspect
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h5 className="text-sm font-heading font-bold text-white group-hover:text-accent-cyan transition-colors line-clamp-2 mb-1.5">
                            {item.title}
                          </h5>
                          <p className="text-slate-400 text-xs line-clamp-3 leading-relaxed mb-3">
                            {item.summary}
                          </p>
                        </div>
                        <span className="text-[11px] font-mono text-accent-indigo group-hover:underline flex items-center gap-1">
                          View details &rarr;
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Interactive Single Certificate Fullscreen Modal */}
      {selectedCert && (
        <div
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-dark-surface border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div>
                <span
                  className={`text-xs font-mono uppercase tracking-wider block mb-1 font-semibold ${
                    accentStyles[selectedCert.accentColor]?.text || 'text-accent-cyan'
                  }`}
                >
                  Official Achievement Document
                </span>
                <h4 className="text-base md:text-lg font-heading font-bold text-white">
                  {selectedCert.title}
                </h4>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="w-9 h-9 rounded-lg bg-white/[0.06] hover:bg-white/15 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Certificate Image Preview */}
            <div className="relative rounded-xl overflow-hidden border border-white/10 w-fit max-w-full mx-auto">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="block w-full h-auto max-h-[65vh] object-contain rounded-xl"
              />
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end pt-2 text-xs">
              <button
                onClick={() => setSelectedCert(null)}
                className="btn-primary px-6 py-2.5 text-xs font-medium"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


