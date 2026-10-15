import imagePodomoro from '../assets/images/podomoro.png';
import imageEdunai from '../assets/images/edunai.jpg';
import imageZenmood from '../assets/images/zenmood.png';

export const projects = [
  {
    id: 1,
    title: 'Edunai',
    subtitle: 'AI-Powered Learning Platform',
    description:
      'A website integrated with an AI agent to help students improve their learning productivity.',
    github: 'https://github.com/nichocode-dotcom/edunai',
    demo: null,
    accentColor: 'violet',
    gradient: 'from-violet-500 to-purple-600',
    glowClass: 'shadow-glow-violet',
    category: 'Health & Wellbeing',
    image: imageEdunai,
  },
  {
    id: 2,
    title: 'PodoMoro',
    subtitle: 'Warmindo Barokah Digital Catalog',
    description:
      'A digital catalog website for Warmindo Barokah with admin panel for management.',
    github: 'https://github.com/nichocode-dotcom/PodoMoro-Website',
    demo: 'https://podo-moro.vercel.app/',
    accentColor: 'cyan',
    gradient: 'from-cyan-400 to-blue-500',
    glowClass: 'shadow-glow-cyan',
    category: 'Education & AI',
    image: imagePodomoro,
  },
  {
    id: 3,
    title: 'ZenMood',
    subtitle: 'Mental Health Management',
    description:
      'A web platform that helps users manage their mental health, mood, and energy on daily.',
    github: 'https://github.com/nichocode-dotcom/Zenmood',
    demo: null,
    accentColor: 'amber',
    gradient: 'from-amber-400 to-orange-500',
    glowClass: 'shadow-glow-amber',
    category: 'F&B / Business',
    image: imageZenmood,
  },
];
