import certWebDesign from '../assets/images/goldmedal.jpg';
import certHackathon from '../assets/images/mapres.jpg';
import certGemastik from '../assets/images/webdev.jpg';
import certDicoding from '../assets/images/bpc.webp';
import certAmbassador from '../assets/images/ambassador.webp';
import certDuta from '../assets/images/duta.jpg';

// Speaker / Moderator Assets
import speakerDII from '../assets/speaker/Speaker_DII.webp';
import speakerIYEBA from '../assets/speaker/Speaker_IYEBA.webp';
import speakerKomunitas from '../assets/speaker/Speaker_Komunitas Remaja Aktif.webp';
import speakerYIT from '../assets/speaker/Speaker_YIT.webp';
import moderatorDII from '../assets/speaker/Moderator.webp';

// Licenses Assets
import licDataAnalysis from '../assets/licenses/data_analysis.png';
import licDataScience from '../assets/licenses/data_science.png';
import licDataViz from '../assets/licenses/data_visualization.webp';
import licKagglePandas from '../assets/licenses/Kaggle-Pandas-Sertifikat.webp';
import licPython from '../assets/licenses/python.png';
import licSoftwareEng from '../assets/licenses/software_enggineering.png';

export const achievements = [
  {
    id: 1,
    title: 'Gold Medal & Presenter Award',
    summary: 'Secured the Gold Medal and was honored with the Best Presenter Award for delivering compelling arguments and articulating complex ideas effectively.',
    category: 'International Competition',
    image: certWebDesign,
    pdfUrl: '#',
    accentColor: 'amber',
  },
  {
    id: 2,
    title: 'The Most Outstanding Student',
    summary: 'Awarded 1st place at both the Faculty and University levels. Presented a strategic paper on web standards and digital accessibility audit framework.',
    category: 'National Competition',
    issuer: 'Universitas Teknologi Yogyakarta',
    image: certHackathon,
    pdfUrl: '#',
    accentColor: 'cyan',
    stats: '24-Hour Sprint',
  },
  {
    id: 3,
    title: '1st Place - National Web Development Competition',
    summary: 'Achieved 1st place in a national-level competition by collaborating within a team to build a highly responsive and interactive website.',
    category: 'National Competition',
    issuer: 'IFEST 14',
    image: certGemastik,
    pdfUrl: '#',
    accentColor: 'violet',
    stats: 'Top 10 Nasional',
  },
  {
    id: 4,
    title: '3rd Place - Business Plan Competition, INSPIRE 1.0 2026',
    summary: 'Awarded 3rd Place in the BPC for EquaUI (Equality User Interface), a B2B/B2G SaaS platform designed to improve digital accessibility.',
    category: 'National Competition',
    issuer: 'INSPIRE 1.0 2026',
    image: certDicoding,
    pdfUrl: '#',
    accentColor: 'amber',
    stats: 'Grade A — 98%',
  },
  {
    id: 5,
    title: 'International Youth Exchange (IYE) Brand Ambassador',
    summary: 'Dedicated to empowering youth communities and driving initiatives that actively support the Sustainable Development Goals (SDGs).',
    category: 'International Program',
    issuer: 'International Youth Exchange',
    image: certAmbassador,
    pdfUrl: '#',
    accentColor: 'rose',
    stats: 'Grade A — 98%',
  },
  {
    id: 6,
    title: 'Inspiring Ambassador of East Nusa Tenggara (Batch 15)',
    summary: 'Served a dedicated tenure under the auspices of Yayasan Duta Inspirasi Indonesia and the Ministry of Youth and Sports of the Republic of Indonesia (Kemenpora).',
    category: 'National Program',
    issuer: 'Yayasan Duta Inspirasi Indonesia and the Ministry of Youth and Sports of the Republic of Indonesia (Kemenpora)',
    image: certDuta,
    pdfUrl: '#',
    accentColor: 'amber',
  },
];

export const speakerCertificates = [
  {
    id: 'spk-1',
    title: 'Speaker - Duta Inspirasi Indonesia',
    summary: 'Sharing insights on consistency and perseverance as the keys to the 2045 Golden Generation in Indonesian.',
    image: speakerDII,
    accentColor: 'amber',
  },
  {
    id: 'spk-2',
    title: 'Speaker - International Youth Exchange Brand Ambassador',
    summary: 'Delivered discussions on cross cultural collaboration, SDGs, and digital initiatives for youth leaders.',
    image: speakerIYEBA,
    accentColor: 'rose',
  },
  {
    id: 'spk-3',
    title: 'Speaker & Facilitator - Komunitas Remaja Aktif',
    summary: 'Sharing insights on how to master public speaking skills and techniques for understanding the audience.',
    image: speakerKomunitas,
    accentColor: 'cyan',
  },
  {
    id: 'spk-4',
    title: "Speaker - Youth In Space's",
    summary: 'Sharing insights on how to cultivate a positive mindset in everyday life.',
    image: speakerYIT,
    accentColor: 'violet',
  },
  {
    id: 'spk-5',
    title: 'Moderator - Duta Inspirasi Indoensia',
    summary: 'Served as the moderator for the “LIVE Sapa Alumni” event, with the theme is enjoying youth with joy.',
    image: moderatorDII,
    accentColor: 'rose',
  },
];

export const licenseCertificates = [
  {
    id: 'lic-1',
    title: 'Software Engineering Competency Certification',
    summary: 'Verified competency in software design principles, architecture, system development life cycle, and best practices.',
    image: licSoftwareEng,
    accentColor: 'violet',
  },
  {
    id: 'lic-2',
    title: 'Python Programming Certification',
    summary: 'Certification covering core Python concepts, object-oriented programming, data structures, and automation.',
    image: licPython,
    accentColor: 'cyan',
  },
  {
    id: 'lic-3',
    title: 'Data Analysis Professional Certificate',
    summary: 'Credential in data wrangling, exploratory data analysis, pattern recognition, and business intelligence.',
    image: licDataAnalysis,
    accentColor: 'amber',
  },
  {
    id: 'lic-4',
    title: 'Data Science & Machine Learning Foundations',
    summary: 'Demonstrated skills in statistical modeling, predictive analytics, and algorithmic data processing.',
    image: licDataScience,
    accentColor: 'emerald',
  },
  {
    id: 'lic-5',
    title: 'Data Visualization & Dashboarding',
    summary: 'Expertise in translating complex data sets into intuitive charts, infographics, and interactive dashboards.',
    image: licDataViz,
    accentColor: 'rose',
  },
  {
    id: 'lic-6',
    title: 'Kaggle Pandas Certificate',
    summary: 'Verified proficiency in manipulating, grouping, indexing, and structuring tabular datasets with Pandas library.',
    image: licKagglePandas,
    accentColor: 'cyan',
  },
];
