import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import smoothscroll from "smoothscroll-polyfill";
import Lenis from "lenis";

// Layouts and Sections
import { Header } from "./app/header/header";
import { Footer } from "./app/footer/footer";
import { Hero } from "./app/hero/hero";
import { OurStory } from "./app/our-story/our-story";
import { WhyChooseUs } from "./app/why-choose-us/why-choose-us";
import { Services } from "./app/services/services";
import { Reviews } from "./app/reviews/reviews";
import { Menu } from "./app/menu/menu";
import { Packages } from "./app/packages/packages";
import { Contact } from "./app/contact/contact";

// Lazy load the brochure page since it's on a completely separate route
const BroucherPage = lazy(() => import("./app/broucher/broucher"));

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <OurStory />
        <WhyChooseUs />
        <Reviews />
        {/* <Services /> */}
        <Menu />
        <Packages />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  useEffect(() => {
    // Initialize smoothscroll polyfill for older browsers
    smoothscroll.polyfill();

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 1.5,
      infinite: false,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Smooth anchor clicks
    const handleAnchorClick = (e) => {
      const target = e.target;
      const anchor = target.closest("a");
      if (anchor && anchor.hash && anchor.origin === window.location.origin) {
        const targetElement = document.querySelector(anchor.hash);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-white/50">Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/broucher" element={<BroucherPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
