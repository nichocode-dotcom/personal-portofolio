import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaLaravel,
  FaGitAlt,
  FaGithub,
  FaFigma,
} from 'react-icons/fa';
import {
  SiTypescript,
  SiTailwindcss,
  SiVite,
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';

export const skillGroups = [
  {
    category: 'Languages',
    skills: [
      {
        name: 'HTML',
        icon: FaHtml5,
        color: '#e34f26',
        context: 'Membangun struktur halaman yang semantik & aksesibel',
      },
      {
        name: 'CSS',
        icon: FaCss3Alt,
        color: '#1572b6',
        context: 'Styling responsif dengan Flexbox, Grid, & animations',
      },
      {
        name: 'JavaScript',
        icon: FaJs,
        color: '#f7df1e',
        context: 'Logika interaktif dan manipulasi DOM di seluruh proyek',
      },
      {
        name: 'TypeScript',
        icon: SiTypescript,
        color: '#3178c6',
        context: 'Type safety pada komponen React di Edunai',
      },
    ],
  },
  {
    category: 'Framework & Library',
    skills: [
      {
        name: 'React',
        icon: FaReact,
        color: '#61dafb',
        context: 'Komponen reusable & state management',
      },
      {
        name: 'Laravel',
        icon: FaLaravel,
        color: '#ff2d20',
        context: 'Backend & Blade templating untuk Zenmood',
      },
    ],
  },
  {
    category: 'Styling',
    skills: [
      {
        name: 'Tailwind CSS',
        icon: SiTailwindcss,
        color: '#06b6d4',
        context: 'Utility-first styling yang cepat & konsisten',
      },
    ],
  },
  {
    category: 'Tools & Platform',
    skills: [
      {
        name: 'Git',
        icon: FaGitAlt,
        color: '#f05032',
        context: 'Version control & branching di setiap proyek',
      },
      {
        name: 'GitHub',
        icon: FaGithub,
        color: '#e6edf3',
        context: 'Hosting repository & kolaborasi project',
      },
      {
        name: 'Vite',
        icon: SiVite,
        color: '#646cff',
        context: 'Build tool modern untuk pengembangan cepat',
      },
      {
        name: 'Figma',
        icon: FaFigma,
        color: '#f24e1e',
        context: 'Wireframing & desain UI sebelum coding',
      },
    ],
  },
  {
    category: 'API & Integration',
    skills: [
      {
        name: 'REST API',
        icon: TbApi,
        color: '#22d3ee',
        context: 'Integrasi AI Agent & data fetching di Edunai',
      },
    ],
  },
];
