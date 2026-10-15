import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import TypewriterText from '../ui/TypewriterText';
import { HiOutlineSearch, HiOutlineTemplate, HiOutlineCode, HiOutlineDeviceMobile, HiOutlineSparkles } from 'react-icons/hi';

const steps = [
  {
    icon: HiOutlineSearch,
    title: 'Understanding Requirements',
    description:
      'Analyzing project goals, target audience, and key feature specifications before writing code.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
  },
  {
    icon: HiOutlineTemplate,
    title: 'Interface Architecture',
    description:
      'Crafting intuitive wireframes, defining cohesive layout systems, color palettes, and typography.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
  },
  {
    icon: HiOutlineCode,
    title: 'Component Engineering',
    description:
      'Developing modular, clean, and reusable components using modern frameworks and best practices.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
  },
  {
    icon: HiOutlineDeviceMobile,
    title: 'Responsive & Cross-Device QA',
    description:
      'Rigorous testing across screen sizes, mobile viewports, browsers, and accessibility standards.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    icon: HiOutlineSparkles,
    title: 'Refinement & Optimization',
    description:
      'Polishing visual details, fine-tuning animations, optimizing load performance, and final deployment.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
];

export default function WorkProcess() {
  return (
    <section id="process" className="section-padding bg-dark-surface/30">
      <div className="section-container">
        <SectionTitle
          title="How I Work"
          subtitle={
            <TypewriterText
              text="My work process, from understanding to final projects"
              speed={30}
            />
          }
        />

        <div className="relative">
          {/* Vertical connector line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-indigo/30 via-accent-cyan/20 to-transparent" />

          <div className="space-y-8 md:space-y-12">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`md:flex items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Card */}
                  <div className={`md:w-[45%] glass-light border ${step.border} p-6 
                                  hover:bg-white/[0.06] transition-all duration-300`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg ${step.bg} flex items-center justify-center`}>
                        <Icon className={`text-xl ${step.color}`} />
                      </div>
                      <div>
                        <span className={`text-xs font-mono ${step.color}`}>0{i + 1}</span>
                        <h3 className="text-base font-heading font-bold text-white">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Center dot (desktop) */}
                  <div className="hidden md:flex w-[10%] justify-center">
                    <div className={`w-4 h-4 rounded-full ${step.bg} border-2 ${step.border} 
                                    relative z-10`}>
                      <div className={`absolute inset-1 rounded-full ${step.color === 'text-indigo-400' ? 'bg-indigo-400' : step.color === 'text-violet-400' ? 'bg-violet-400' : step.color === 'text-cyan-400' ? 'bg-cyan-400' : step.color === 'text-emerald-400' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block md:w-[45%]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
