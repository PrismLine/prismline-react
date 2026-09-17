import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import NetflixIntro from './components/NetflixIntro';
import Home from './pages/Home';
import Services from './pages/Services';
import Process from './pages/Process';
import Guarantee from './pages/Guarantee';
import About from './pages/About';
import Contact from './pages/Contact';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Use Lenis if available, otherwise native
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
}

// Noise overlay — persistent across all pages
function NoiseOverlay() {
  return <div className="site-noise-overlay" aria-hidden="true"></div>;
}

function AppLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    document.body.classList.add('js-ready');
    document.body.classList.remove('page-is-transitioning');
  }, []);

  return (
    <>
      <NoiseOverlay />
      {/* Cinematic intro only on home page */}
      {isHome && <NetflixIntro />}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/process" element={<Process />} />
        <Route path="/guarantee" element={<Guarantee />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* Catch-all → Home */}
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppLayout />
    </BrowserRouter>
  );
}
