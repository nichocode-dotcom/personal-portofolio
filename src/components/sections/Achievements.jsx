import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight, FaChevronDown, FaThLarge } from 'react-icons/fa';
import { HiOutlineDocumentText } from 'react-icons/hi';
import SectionTitle from '../ui/SectionTitle';
import TypewriterText from '../ui/TypewriterText';
import { achievements, speakerCertificates, licenseCertificates } from '../../data/achievements';

const accentStyles = {
  amber: {
    border: 'border-amber-500/35',
    glow: 'shadow-[0_0_40px_rgba(245,158,11,0.22)]',
    text: 'text-amber-400',
  },
  cyan: {
    border: 'border-cyan-500/35',
    glow: 'shadow-[0_0_40px_rgba(34,211,238,0.22)]',
    text: 'text-cyan-400',
  },
  violet: {
    border: 'border-purple-500/35',
    glow: 'shadow-[0_0_40px_rgba(168,85,247,0.22)]',
    text: 'text-purple-400',
  },
  emerald: {
    border: 'border-emerald-500/35',
    glow: 'shadow-[0_0_40px_rgba(16,185,129,0.22)]',
    text: 'text-emerald-400',
  },
  rose: {
    border: 'border-rose-500/35',
    glow: 'shadow-[0_0_40px_rgba(244,63,94,0.22)]',
    text: 'text-rose-400',
  },
};

const TAB_DATA = [
  {
    id: 'awards',
    label: 'Honors & Awards',
    items: achievements,
  },
  {
    id: 'speaker',
    label: 'Speakers & Moderator',
    items: speakerCertificates,
  },
  {
    id: 'licenses',
    label: 'Licenses & Certifications',
    items: licenseCertificates,
  },
];

export default function Achievements() {
  const [activeTab, setActiveTab] = useState('awards');
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCert, setSelectedCert] = useState(null);
  const [showAllModal, setShowAllModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentTab = TAB_DATA.find((tab) => tab.id === activeTab) || TAB_DATA[0];
  const items = currentTab.items;
  const count = items.length;

  // Reset index saat tab berganti
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setActiveIndex(0);
    setIsDropdownOpen(false);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isNavigating = useRef(false);

  const prevSlide = useCallback(() => {
    if (isNavigating.current) return;
    isNavigating.current = true;
    setActiveIndex((prev) => (prev === 0 ? count - 1 : prev - 1));
    setTimeout(() => {
      isNavigating.current = false;
    }, 250);
  }, [count]);

  const nextSlide = useCallback(() => {
    if (isNavigating.current) return;
    isNavigating.current = true;
    setActiveIndex((prev) => (prev === count - 1 ? 0 : prev + 1));
    setTimeout(() => {
      isNavigating.current = false;
    }, 250);
  }, [count]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedCert || showAllModal) {
        if (e.key === 'Escape') {
          setSelectedCert(null);
          setShowAllModal(false);
        }
        return;
      }
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide, selectedCert, showAllModal]);

  const activeItem = items[activeIndex] || items[0];

  return (
    <section id="achievements" className="section-padding bg-dark/60 relative overflow-hidden select-none">
      <div className="section-container relative z-10 flex flex-col items-center">
        {/* Main Section Title */}
        <SectionTitle
          title="Achievements & Credentials"
          align="center"
          subtitle={
            <TypewriterText
              text="Competitive honors, speaker engagements, and professional licenses"
              speed={30}
            />
          }
        />

        {/* Mobile View: Modern Glass Dropdown Selector */}
        <div ref={dropdownRef} className="relative w-full max-w-xs mx-auto mb-8 md:hidden z-40">
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="w-full flex items-center justify-between px-5 py-3 rounded-2xl bg-dark-surface/90 border border-white/15 backdrop-blur-xl text-white shadow-xl hover:border-accent-indigo/50 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-accent-indigo animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
              <span className="font-heading font-medium text-sm text-white">
                {currentTab.label}
              </span>
            </div>
            <FaChevronDown
              className={`text-xs text-slate-400 transition-transform duration-300 ${
                isDropdownOpen ? 'rotate-180 text-accent-indigo' : ''
              }`}
            />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className="absolute top-full left-0 right-0 mt-2 p-1.5 rounded-2xl bg-dark/95 border border-white/15 backdrop-blur-2xl shadow-2xl overflow-hidden"
              >
                {TAB_DATA.map((tab) => {
                  const isActive = tab.id === activeTab;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-heading font-medium transition-all text-left cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-accent-indigo to-blue-600 text-white font-semibold shadow-md'
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop View: Elegant Minimalist Capsule Tab Switcher */}
        <div className="hidden md:flex items-center justify-center gap-2 p-1.5 rounded-full bg-dark-surface/90 border border-white/10 backdrop-blur-xl mb-10 w-fit mx-auto shadow-2xl">
          {TAB_DATA.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-heading font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-indigo to-blue-600 shadow-[0_0_20px_rgba(99,102,241,0.5)] border border-white/20"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Subtitle Deskripsi Kategori Aktif */}
        <p className="text-xs sm:text-sm font-mono text-slate-400 text-center -mt-4 mb-8 max-w-lg">
          {currentTab.subtitle}
        </p>

        {/* 3D Coverflow Carousel Container */}
        <div className="relative w-full max-w-5xl mx-auto h-[220px] sm:h-[300px] md:h-[340px] flex items-center justify-center mb-6">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            aria-label="Previous certificate"
            className="absolute left-2 sm:left-4 md:left-8 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-dark/80 hover:bg-dark border border-white/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-xl backdrop-blur-md cursor-pointer"
          >
            <FaChevronLeft className="text-xs sm:text-sm" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next certificate"
            className="absolute right-2 sm:right-4 md:right-8 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-dark/80 hover:bg-dark border border-white/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-xl backdrop-blur-md cursor-pointer"
          >
            <FaChevronRight className="text-xs sm:text-sm" />
          </button>

          {/* The Flat Symmetrical Card Stage */}
          <div
            className="relative w-full h-full flex items-center justify-center overflow-visible"
            style={{ perspective: 1100 }}
          >
            {items.map((item, index) => {
              let offset = index - activeIndex;
              while (offset > count / 2) offset -= count;
              while (offset < -count / 2) offset += count;

              const isCenter = offset === 0;
              const style = accentStyles[item.accentColor] || accentStyles.cyan;

              let xOffset = 0;
              let scale = 1;
              let zIndex = 20 - Math.abs(offset);
              let opacity = 1;

              if (offset === 0) {
                xOffset = 0;
                scale = 1;
                opacity = 1;
              } else if (offset === -1) {
                xOffset = -230;
                scale = 0.88;
                opacity = 0.82;
              } else if (offset === 1) {
                xOffset = 230;
                scale = 0.88;
                opacity = 0.82;
              } else if (offset === -2) {
                xOffset = -420;
                scale = 0.76;
                opacity = 0.55;
              } else if (offset === 2) {
                xOffset = 420;
                scale = 0.76;
                opacity = 0.55;
              } else if (offset <= -3) {
                xOffset = -570;
                scale = 0.64;
                opacity = 0.3;
              } else if (offset >= 3) {
                xOffset = 570;
                scale = 0.64;
                opacity = 0.3;
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
                    rotateY: 0,
                    opacity: opacity,
                    zIndex: zIndex,
                  }}
                  transition={{
                    duration: 0.65,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`absolute w-[260px] sm:w-[420px] md:w-[480px] h-[165px] sm:h-[260px] md:h-[295px] rounded-2xl overflow-hidden cursor-pointer ${
                    isCenter
                      ? `border-2 ${style.border} ${style.glow} shadow-2xl`
                      : 'border border-white/10 shadow-lg'
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    willChange: 'transform, opacity',
                  }}
                >
                  <div className="relative w-full h-full bg-dark-surface rounded-2xl overflow-hidden group">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center pointer-events-none transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Gradient Overlay Bersih (Tanpa Badge) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent pointer-events-none" />

                    {/* Center Action Button saat kartu berada di tengah spotlight */}
                    {isCenter && (
                      <div className="absolute inset-0 bg-dark/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                        <span className="px-4 py-2 rounded-xl bg-dark/75 hover:bg-dark border border-white/30 text-xs font-mono font-medium text-white flex items-center gap-2 shadow-2xl backdrop-blur-md">
                          <HiOutlineDocumentText className="text-sm text-cyan-300" />
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
        <div className="flex items-center justify-center gap-2 mb-6">
          {items.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex
                  ? 'w-7 bg-accent-indigo'
                  : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Dynamic Title, Summary Info & See All Certificates Button */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${activeItem?.id}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="max-w-2xl mx-auto text-center px-4"
          >
            <h4 className="text-base sm:text-lg md:text-xl font-heading font-bold text-white mb-2 tracking-tight">
              {activeItem?.title}
            </h4>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-body mb-7">
              {activeItem?.summary}
            </p>

            {/* Button See All Certificates untuk Tab Ini */}
            <button
              onClick={() => setShowAllModal(true)}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-dark-surface/90 hover:bg-dark-lighter border border-white/15 hover:border-accent-indigo text-slate-200 hover:text-white text-xs sm:text-sm font-heading font-medium shadow-xl hover:shadow-[0_0_30px_rgba(99,102,241,0.25)] transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <FaThLarge className="text-accent-indigo text-sm" />
              <span>See All {currentTab.label}</span>
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* MODAL 1: Grid Gallery untuk Melihat Semua Sertifikat di Tab Ini */}
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
                  All {currentTab.label}
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

            {/* Modal Content - Elegant Card Grid (Sesuai Screenshot Referensi) */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map((item) => {
                  const style = accentStyles[item.accentColor] || accentStyles.cyan;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        setShowAllModal(false);
                        setSelectedCert(item);
                      }}
                      className="group p-3.5 sm:p-4 rounded-2xl bg-dark/80 border border-white/10 hover:border-accent-indigo/50 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:shadow-[0_10px_30px_-10px_rgba(99,102,241,0.25)]"
                    >
                      {/* Thumbnail Image Container */}
                      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-dark-lighter mb-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                      </div>

                      {/* Title & Summary */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="mb-3">
                          <h5 className="text-sm sm:text-[15px] font-heading font-bold text-white group-hover:text-accent-cyan transition-colors line-clamp-2 mb-1.5">
                            {item.title}
                          </h5>
                          <p className="text-slate-400 text-xs line-clamp-3 leading-relaxed font-body">
                            {item.summary}
                          </p>
                        </div>

                        {/* View details link */}
                        <div className="pt-2">
                          <span className="text-xs font-mono text-accent-indigo group-hover:text-accent-cyan transition-colors flex items-center gap-1.5 font-medium">
                            <span>View details</span>
                            <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                          </span>
                        </div>
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
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-dark-surface border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 animate-in zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div>
                <span className="text-xs font-mono text-accent-cyan uppercase tracking-wider block mb-1 font-semibold">
                  Certificate Document
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
                className="btn-primary px-6 py-2.5 text-xs font-medium cursor-pointer"
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
