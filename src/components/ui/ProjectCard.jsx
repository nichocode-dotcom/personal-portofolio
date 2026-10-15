import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { SiVercel } from 'react-icons/si';


export default function ProjectCard({ project, index }) {
  const isVercel = project.demo && project.demo.includes('vercel.app');

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative glass border-white/[0.08] hover:border-accent-indigo/40 
                 hover:shadow-[0_10px_35px_-5px_rgba(99,102,241,0.2)] 
                 transition-all duration-500 overflow-hidden flex flex-col rounded-2xl bg-dark-surface/40 hover:bg-dark-surface/70"
    >
      {/* Subtle hover gradient highlight on top edge */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-indigo/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

      {/* Thumbnail area */}
      <div className="relative h-52 w-full overflow-hidden bg-dark/60 flex items-center justify-center">
        {project.image ? (
          <img
            src={Array.isArray(project.image) ? project.image[0] : project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <span className="text-6xl">{project.icon}</span>
        )}

        {/* Soft vignette overlay at bottom of image for seamless blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a16] via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* Clean Glass Hover Actions (Mirip Achievement - tidak menutupi gelap foto) */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px] bg-dark/30 p-4">
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-dark/70 hover:bg-dark/90 border border-white/20 hover:border-accent-indigo text-xs font-mono font-medium text-white flex items-center gap-2 shadow-lg backdrop-blur-md transition-all duration-200 active:scale-95 group/btn"
            >
              {isVercel ? (
                <SiVercel className="text-xs text-white group-hover/btn:text-accent-indigo transition-colors" />
              ) : (
                <FaExternalLinkAlt className="text-xs text-indigo-300 group-hover/btn:text-white transition-colors" />
              )}
              <span>{isVercel ? 'Vercel App' : 'Live Demo'}</span>
            </a>
          ) : (
            project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-dark/70 hover:bg-dark/90 border border-white/20 hover:border-accent-indigo text-xs font-mono font-medium text-white flex items-center gap-2 shadow-lg backdrop-blur-md transition-all duration-200 active:scale-95 group/btn"
              >
                <FaGithub className="text-sm text-slate-300 group-hover/btn:text-accent-indigo transition-colors" />
                <span>Source Code</span>
              </a>
            )
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title & Subtitle */}
        <div className="mb-3">
          <h3 className="text-xl font-heading font-bold text-white transition-colors duration-300">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="text-xs font-mono text-accent-indigo/90 tracking-wide mt-1">
              {project.subtitle}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed flex-1 line-clamp-3">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
}
