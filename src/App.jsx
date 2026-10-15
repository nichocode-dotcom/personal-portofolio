import { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Achievements from './components/sections/Achievements';
import Skills from './components/sections/Skills';
import WorkProcess from './components/sections/WorkProcess';
import Contact from './components/sections/Contact';
import SplashScreen from './components/ui/SplashScreen';

const hasSeenSplash = sessionStorage.getItem('splash_seen');

export default function App() {
  const [splashDone, setSplashDone] = useState(!!hasSeenSplash);

  const handleSplashComplete = () => {
    sessionStorage.setItem('splash_seen', '1');
    setSplashDone(true);
  };

  return (
    <>
      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}
      <div className="min-h-screen bg-dark" style={{ visibility: splashDone ? 'visible' : 'hidden' }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Achievements />
          <Skills />
          <WorkProcess />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
