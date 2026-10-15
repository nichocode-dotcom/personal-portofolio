import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../../data/personal';
import { scrollToSection } from '../../utils/scroll';
import {
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineFolder,
  HiOutlineStar,
  HiOutlineLightningBolt,
  HiOutlineCollection,
  HiOutlineMail,
  HiOutlineSearch,
  HiOutlineTerminal,
} from 'react-icons/hi';

const iconMap = {
  hero:         HiOutlineHome,
  about:        HiOutlineUser,
  projects:     HiOutlineFolder,
  achievements: HiOutlineStar,
  skills:       HiOutlineLightningBolt,
  process:      HiOutlineCollection,
  contact:      HiOutlineMail,
};

const descMap = {
  hero:         'Back to top',
  about:        "Who I am & my story",
  projects:     "Works I've built",
  achievements: 'Awards & recognition',
  skills:       'Tech stack & tools',
  process:      'How I work',
  contact:      'Get in touch',
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlighted, setHighlighted] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  // Hide trigger button when user scrolls
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const inputRef = useRef(null);
  const itemRefs = useRef([]);

  const filtered = navLinks.filter((link) =>
    link.label.toLowerCase().includes(query.toLowerCase()) ||
    (descMap[link.id] || '').toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => { setHighlighted(0); }, [query]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: 0.1 }
    );
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const openPalette = useCallback(() => {
    setOpen(true);
    setQuery('');
    setHighlighted(0);
  }, []);

  const closePalette = useCallback(() => {
    setOpen(false);
    setQuery('');
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        open ? closePalette() : openPalette();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, openPalette, closePalette]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlighted((h) => (h + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlighted((h) => (h - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      if (filtered[highlighted]) navigate(filtered[highlighted].id);
    } else if (e.key === 'Escape') {
      closePalette();
    }
  };

  useEffect(() => {
    itemRefs.current[highlighted]?.scrollIntoView({ block: 'nearest' });
  }, [highlighted]);

  const navigate = (id) => {
    scrollToSection(id);
    closePalette();
  };

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0.8, y: -10 }}
        animate={{
          opacity: scrolled ? 0 : 1,
          scale: scrolled ? 0.9 : 1,
          y: scrolled ? -8 : 0,
          pointerEvents: scrolled ? 'none' : 'auto',
        }}
        onClick={openPalette}
        aria-label="Open command palette"
        className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50 group flex items-center gap-2 sm:gap-2.5 px-3 py-2 sm:px-4 sm:py-2.5 bg-dark-surface/90 hover:bg-dark-lighter border border-white/[0.12] hover:border-accent-indigo/50 rounded-xl backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_4px_30px_rgba(99,102,241,0.2)] transition-[border,box-shadow] duration-300 select-none cursor-pointer"
      >
        <HiOutlineTerminal className="text-accent-indigo text-base" />
        <span className="text-xs font-mono text-slate-400 group-hover:text-slate-200 transition-colors">
          navigate
        </span>
        <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-[10px] font-mono text-slate-500">
          Ctrl K
        </kbd>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={closePalette}
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            />
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4 pointer-events-none">
              <motion.div
                key="palette"
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-auto w-full max-w-[520px] max-h-[85vh] flex flex-col"
              >
                <div className="rounded-2xl overflow-hidden border border-white/[0.12] bg-dark-surface/95 backdrop-blur-2xl shadow-[0_32px_80px_-12px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)] flex flex-col max-h-full">
                  <div className="flex items-center gap-3 px-3.5 sm:px-4 py-3 sm:py-3.5 border-b border-white/[0.06] shrink-0">
                    <HiOutlineSearch className="text-slate-400 text-lg shrink-0" />
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Navigate to..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 outline-none font-mono caret-accent-indigo"
                    />
                    <button
                      type="button"
                      onClick={closePalette}
                      aria-label="Close navigation"
                      className="sm:hidden flex items-center justify-center w-6 h-6 rounded-md bg-white/[0.06] text-slate-400 hover:text-white text-xs font-mono active:scale-95 transition-transform"
                    >
                      ✕
                    </button>
                    <kbd className="hidden sm:flex px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.08] text-[10px] font-mono text-slate-500">
                      ESC
                    </kbd>
                  </div>

                  <ul className="py-2 max-h-[50vh] sm:max-h-[340px] overflow-y-auto overscroll-contain">
                    {filtered.length === 0 && (
                      <li className="px-4 py-8 text-center text-sm text-slate-500 font-mono">
                        No results for &quot;{query}&quot;
                      </li>
                    )}
                    {filtered.map((link, i) => {
                      const Icon = iconMap[link.id] || HiOutlineFolder;
                      const isActive = activeSection === link.id;
                      const isHighlighted = i === highlighted;
                      return (
                        <li
                          key={link.id}
                          ref={(el) => (itemRefs.current[i] = el)}
                          onMouseEnter={() => setHighlighted(i)}
                          onClick={() => navigate(link.id)}
                          className={`mx-1.5 sm:mx-2 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-xl flex items-center gap-3 sm:gap-3.5 cursor-pointer transition-all duration-100 group ${
                            isHighlighted
                              ? 'bg-accent-indigo/15 border border-accent-indigo/25'
                              : 'border border-transparent hover:bg-white/[0.04]'
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                              isHighlighted
                                ? 'bg-accent-indigo/20 text-accent-indigo'
                                : 'bg-white/[0.05] text-slate-400 group-hover:text-slate-200'
                            }`}
                          >
                            <Icon className="text-sm" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div
                              className={`text-sm font-medium font-heading transition-colors ${
                                isHighlighted ? 'text-white' : 'text-slate-200'
                              }`}
                            >
                              {link.label}
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono truncate">
                              {descMap[link.id]}
                            </div>
                          </div>
                          {isActive && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-accent-indigo/15 text-accent-indigo border border-accent-indigo/20 shrink-0">
                              here
                            </span>
                          )}
                          {isHighlighted && (
                            <kbd className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.08] text-slate-400 shrink-0">
                              Enter
                            </kbd>
                          )}
                        </li>
                      );
                    })}
                  </ul>

                  <div className="px-3 sm:px-4 py-2 sm:py-2.5 border-t border-white/[0.05] flex items-center justify-between text-[10px] font-mono shrink-0">
                    <div className="flex items-center gap-2 sm:gap-3 text-slate-400">
                      <span className="hidden sm:flex items-center gap-1">
                        <kbd className="px-1 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">Up</kbd>
                        <kbd className="px-1 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">Down</kbd>
                        navigate
                      </span>
                      <span className="hidden sm:flex items-center gap-1">
                        <kbd className="px-1 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">Enter</kbd>
                        go
                      </span>
                      <span className="flex items-center gap-1">
                        <kbd className="px-1 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">Esc</kbd>
                        close
                      </span>
                    </div>
                    <span className="text-slate-400 flex items-center gap-1">
                      <HiOutlineTerminal className="text-accent-indigo" />
                      portfolio.cmd
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
