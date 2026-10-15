import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  { text: "> Initializing system...", delay: 0, color: "#a0aec0" },
  { text: "> Loading kernel modules...", delay: 400, color: "#a0aec0" },
  { text: "> Mounting file system... [OK]", delay: 800, color: "#68d391" },
  { text: "> Checking dependencies...", delay: 1200, color: "#a0aec0" },
  { text: "  \u2713 React           v18.3.1", delay: 1500, color: "#63b3ed" },
  { text: "  \u2713 Framer Motion   v11.x", delay: 1700, color: "#63b3ed" },
  { text: "  \u2713 Vite            v6.x", delay: 1900, color: "#63b3ed" },
  { text: "  \u2713 TailwindCSS     v3.x", delay: 2100, color: "#63b3ed" },
  { text: "> Compiling portfolio assets...", delay: 2500, color: "#a0aec0" },
  { text: "> Loading projects...... [\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588] 100%", delay: 2900, color: "#68d391" },
  { text: "> Loading achievements.. [\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588] 100%", delay: 3200, color: "#68d391" },
  { text: "> Loading skills stack.. [\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588] 100%", delay: 3500, color: "#68d391" },
  { text: "> Applying design system....... [OK]", delay: 3900, color: "#68d391" },
];
const LAST_DELAY = Math.max(...BOOT_LINES.map((l) => l.delay));
const TOTAL_DURATION = LAST_DELAY + 700; // Beri jeda 0.7 detik setelah baris terakhir muncul sebelum menutup

export default function SplashScreen({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [showCursor, setShowCursor] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const timeoutsRef = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / TOTAL_DURATION) * 100, 100);
      setProgress(pct);
      if (pct >= 100) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    BOOT_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
      }, line.delay);
      timeoutsRef.current.push(t);
    });

    const exitT = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onComplete?.(), 900);
    }, TOTAL_DURATION);
    timeoutsRef.current.push(exitT);

    const skipHandler = () => {
      timeoutsRef.current.forEach(clearTimeout);
      setExiting(true);
      setTimeout(() => onComplete?.(), 900);
    };
    window.addEventListener("keydown", skipHandler);
    window.addEventListener("click", skipHandler);
    window.addEventListener("touchstart", skipHandler, { passive: true });

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      window.removeEventListener("keydown", skipHandler);
      window.removeEventListener("click", skipHandler);
      window.removeEventListener("touchstart", skipHandler);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
          transition={{ duration: 0.85, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden px-3 sm:px-6"
          style={{ background: "radial-gradient(ellipse at 50% 30%, #0d0b1e 0%, #000000 100%)" }}
        >
          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)",
            }}
          />

          {/* Purple glow orb */}
          <div
            className="absolute pointer-events-none z-0"
            style={{
              width: "min(600px, 90vw)",
              height: "min(600px, 90vw)",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(159,122,234,0.1) 0%, transparent 70%)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Terminal window */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative z-10 w-full max-w-2xl"
            style={{
              background: "rgba(8, 7, 18, 0.97)",
              border: "1px solid rgba(159, 122, 234, 0.35)",
              borderRadius: 14,
              boxShadow: "0 0 40px rgba(159,122,234,0.18), 0 0 80px rgba(159,122,234,0.06), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            {/* Title bar */}
            <div
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3"
              style={{
                borderBottom: "1px solid rgba(159, 122, 234, 0.2)",
                background: "rgba(255,255,255,0.015)",
                borderRadius: "14px 14px 0 0",
              }}
            >
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" style={{ background: "#fc5c65" }} />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" style={{ background: "#fed330" }} />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" style={{ background: "#26de81" }} />
              <span className="ml-2 sm:ml-3 text-[11px] sm:text-xs font-mono" style={{ color: "rgba(160,174,192,0.55)" }}>
                nicho@portfolio:~
              </span>
              <div className="ml-auto flex items-center gap-1.5">
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: "#68d391", boxShadow: "0 0 4px #68d391", animation: "pulse 2s infinite" }}
                />
                <span className="text-[10px] sm:text-xs font-mono" style={{ color: "#68d391" }}>
                  LIVE
                </span>
              </div>
            </div>

            {/* Lines */}
            <div
              className="p-3.5 sm:p-5 font-mono text-[11px] sm:text-sm overflow-x-hidden"
              style={{ minHeight: 260, maxHeight: "min(400px, 60vh)", overflowY: "hidden" }}
            >
              {visibleLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.12 }}
                  className="leading-[1.7] whitespace-pre"
                  style={{ color: line.color }}
                >
                  {line.text}
                </motion.div>
              ))}
              <span
                className="inline-block w-[7px] sm:w-[9px] h-[13px] sm:h-[15px] ml-0.5"
                style={{
                  background: "#9f7aea",
                  opacity: showCursor ? 1 : 0,
                  verticalAlign: "middle",
                  transition: "opacity 0.1s",
                  boxShadow: showCursor ? "0 0 7px #9f7aea" : "none",
                }}
              />
            </div>

            {/* Progress bar */}
            <div
              className="mx-3.5 sm:mx-5 mb-4 sm:mb-5 rounded-full overflow-hidden"
              style={{ height: 3, background: "rgba(159,122,234,0.12)" }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #6b21a8, #9f7aea, #d8b4fe)",
                  boxShadow: "0 0 10px rgba(159,122,234,0.9)",
                  borderRadius: 9999,
                  transition: "width 0.04s linear",
                }}
              />
            </div>
          </motion.div>

          {/* Skip hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-5 sm:bottom-8 font-mono text-[11px] sm:text-xs tracking-wider text-center px-4"
            style={{ color: "#a0aec0" }}
          >
            tap or click anywhere to skip →
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
