import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

export const personalInfo = {
  name: 'Nicho Arie Setiawan',
  role: 'Frontend Developer',
  tagline: 'Build with code, Create a better experience',
  email: 'nichoariesetiawan@gmail.com',
  github: 'https://github.com/nichocode-dotcom',
  linkedin: 'https://linkedin.com/in/nichoariesetiawan',
  about: {
    intro: `Hai, saya Nicho — seorang Frontend Developer yang senang membangun web yang tidak hanya terlihat bagus, tapi juga terasa menyenangkan digunakan. Saya percaya bahwa antarmuka yang baik bisa membuat perbedaan nyata, baik itu untuk membantu seseorang menjaga kesehatan mentalnya, belajar lebih efektif, atau sekadar memesan makanan dengan mudah.`,
    motivation: `Saya mendaftar ke divisi Web Development karena ingin berkontribusi langsung dalam membangun pengalaman digital yang digunakan banyak orang — mulai dari halaman acara yang informatif hingga sistem pendaftaran yang lancar di semua perangkat.`,
  },
  stats: [
    { value: '3', label: 'Projects Built' },
    { value: '5+', label: 'Technologies Used' },
    { value: '1', label: 'AI-integrated App' },
  ],
  socials: [
    { name: 'GitHub', url: 'https://github.com/nichocode-dotcom', icon: FaGithub },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/nichoariesetiawan', icon: FaLinkedinIn },
    { name: 'Email', url: 'mailto:nichoariesetiawan@gmail.com', icon: HiOutlineMail },
  ],
};

export const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Awards' },
  { id: 'skills', label: 'Skills' },
  { id: 'process', label: 'Process' },
  { id: 'contact', label: 'Contact' },
];
