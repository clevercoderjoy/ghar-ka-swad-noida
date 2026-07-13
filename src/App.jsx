import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import smoothscroll from "smoothscroll-polyfill";

// Layouts and Sections
import { Header } from "./app/header/header";
import { Footer } from "./app/footer/footer";
import { Hero } from "./app/hero/hero";
import { WhyChooseUs } from "./app/why-choose-us/why-choose-us";
import { Services } from "./app/services/services";
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
        <WhyChooseUs />
        <Services />
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
