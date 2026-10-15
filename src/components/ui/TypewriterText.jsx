import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function TypewriterText({
  text,
  speed = 35,
  delay = 0,
  cursorColor = 'bg-accent-cyan',
  glowColor = 'rgba(34,211,238,0.8)',
  className = 'inline-flex items-center justify-center font-mono text-sm md:text-base text-slate-400',
}) {
  const [displayedText, setDisplayedText] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;

    let interval;
    const timeout = setTimeout(() => {
      let index = 0;
      interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [isInView, text, speed, delay]);

  return (
    <span ref={ref} className={className}>
      <span>{displayedText}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
        className={`inline-block w-[2px] h-4 md:h-5 ${cursorColor} ml-1 rounded-full`}
        style={{ boxShadow: `0 0 8px ${glowColor}` }}
      />
    </span>
  );
}
