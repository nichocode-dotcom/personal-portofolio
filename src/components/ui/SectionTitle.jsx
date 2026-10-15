import { motion } from 'framer-motion';

export default function SectionTitle({ title, subtitle, align = 'center' }) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={`mb-14 ${alignClass}`}
    >
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto font-body">
          {subtitle}
        </p>
      )}
      <div className="mt-4 flex items-center gap-2 justify-center">
        <span className="h-1 w-8 rounded-full bg-accent-indigo"></span>
        <span className="h-1 w-3 rounded-full bg-accent-cyan"></span>
      </div>
    </motion.div>
  );
}
