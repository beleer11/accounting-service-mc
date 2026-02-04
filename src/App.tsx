// src/App.jsx
import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';
import Testimonials from './components/Testimonials/Testimonials';
import Footer from './components/Footer/Footer';
import ThemeToggle from './components/shared/ThemeToggle/ThemeToggle';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <Header />
      <main>
        <Hero />
        <section id="servicios">
          <Services />
        </section>
        <section id="testimonios">
          <Testimonials />
        </section>
      </main>
      <section id="contacto">
        <Footer />
      </section>
    </div>
  );
}

export default App;