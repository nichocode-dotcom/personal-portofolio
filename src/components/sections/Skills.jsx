import SectionTitle from '../ui/SectionTitle';
import TypewriterText from '../ui/TypewriterText';
import { skillGroups } from '../../data/skills';
import { motion } from 'framer-motion';

export default function Skills() {
  const allSkills = skillGroups.flatMap((group) => group.skills);

  // Bagi icon menjadi 2 baris agar tampilan dinamis dan berkedalaman
  const half = Math.ceil(allSkills.length / 2);
  const row1 = allSkills.slice(0, half);
  const row2 = allSkills.slice(half);

  // Gandakan array agar loop berjalan mulus tanpa jeda (infinite seamless loop)
  const infiniteRow1 = [...row1, ...row1, ...row1, ...row1];
  const infiniteRow2 = [...row2, ...row2, ...row2, ...row2];

  const renderCard = (skill, index) => {
    const Icon = skill.icon;
    return (
      <div
        key={`${skill.name}-${index}`}
        className="relative group shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-dark-surface/90 hover:bg-[#15152d] border border-white/[0.08] hover:border-white/25 flex flex-col items-center justify-center cursor-pointer shadow-lg hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all duration-300 hover:scale-105 mx-2 sm:mx-3"
      >
        {/* Glow Aura saat di-hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-25 transition-opacity duration-300 blur-md pointer-events-none"
          style={{ backgroundColor: skill.color }}
        />

        {/* Icon */}
        <div
          className="text-2xl sm:text-3xl transition-transform duration-300 group-hover:scale-110"
          style={{ color: skill.color }}
        >
          <Icon />
        </div>

        {/* Floating Tooltip */}
        <div className="absolute -bottom-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 z-30">
          <span className="px-2.5 py-0.5 rounded-md bg-dark/95 border border-white/20 text-[10px] font-mono text-slate-200 whitespace-nowrap shadow-2xl backdrop-blur-md">
            {skill.name}
          </span>
        </div>
      </div>
    );
  };

  return (
    <section id="skills" className="section-padding relative overflow-hidden select-none">
      <div className="section-container">
        <SectionTitle
          title="Tech Stack"
          subtitle={
            <TypewriterText
              text="Technologies I have used while working on projects"
              speed={30}
            />
          }
        />

        {/* Infinite Moving Marquee Container */}
        <div className="relative max-w-5xl mx-auto py-4">
          {/* Edge Fade Gradients (Efek memudar halus di kiri & kanan) */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-dark to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-dark to-transparent z-20 pointer-events-none" />

          {/* Row 1: Bergerak ke Kiri */}
          <div className="flex overflow-hidden py-2 sm:py-3 [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
            <motion.div
              className="flex shrink-0"
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                ease: 'linear',
                duration: 22,
                repeat: Infinity,
              }}
              whileHover={{ animationPlayState: 'paused' }}
            >
              {infiniteRow1.map((skill, i) => renderCard(skill, i))}
            </motion.div>
          </div>

          {/* Row 2: Bergerak ke Kanan (Arah Berlawanan) */}
          <div className="flex overflow-hidden py-2 sm:py-3 [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
            <motion.div
              className="flex shrink-0"
              animate={{ x: ['-50%', '0%'] }}
              transition={{
                ease: 'linear',
                duration: 22,
                repeat: Infinity,
              }}
              whileHover={{ animationPlayState: 'paused' }}
            >
              {infiniteRow2.map((skill, i) => renderCard(skill, i))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}


