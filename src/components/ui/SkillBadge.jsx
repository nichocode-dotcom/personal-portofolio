import { motion } from 'framer-motion';

export default function SkillBadge({ skill, index }) {
  const Icon = skill.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="glass-light group p-4 flex flex-col gap-3 hover:bg-white/[0.08] 
                 transition-all duration-300 cursor-default"
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-xl 
                     transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${skill.color}15`, color: skill.color }}
        >
          <Icon />
        </div>
        <h4 className="text-sm font-heading font-semibold text-white">{skill.name}</h4>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed">{skill.context}</p>
    </motion.div>
  );
}
