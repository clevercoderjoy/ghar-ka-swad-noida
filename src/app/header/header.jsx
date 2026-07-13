import { useState, useEffect, useMemo, useCallback } from "react";
import { Menu, X, MapPin } from "lucide-react";
import { Broucher } from "@/components/Broucher";
import { rafThrottle } from "@/lib/performance";
import "./header.css";

const menuItems = [
  { label: "Home", href: "#home" },
  { label: "Why Us?", href: "#why-us" },
  { label: "Services", href: "#services" },
  { label: "Menu", href: "#menu" },
  { label: "Packages", href: "#packages" },
  { label: "Contact", href: "#contact" },
];

const NavItem = ({ item, isActive, isHome, onClick, onMouseEnter }) => {
  const showActive = isActive && !isHome;
  return (
    <button
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 z-20 ${
        showActive ? "text-white" : "text-white/70 hover:text-white"
      } active:scale-95`}
    >
      <div className={`absolute inset-0 rounded-full backdrop-blur-md border transition-all duration-300 ease-out pointer-events-none
        ${ showActive
          ? "bg-primary/15 border-primary/25 shadow-[inset_0_1px_1px_rgba(252,128,25,0.15)] scale-100 opacity-100"
          : "opacity-0 scale-75"
        }`}
      />
      <span className="relative z-10">{item.label}</span>
    </button>
  );
};

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoverStyle, setHoverStyle] = useState({ left: 0, width: 0, opacity: 0, animate: false });
  const [rightHoverStyle, setRightHoverStyle] = useState({ left: 0, width: 0, opacity: 0, animate: false });

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  const throttledScroll = useMemo(() => rafThrottle(handleScroll), [handleScroll]);

  useEffect(() => {
    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [throttledScroll]);

  useEffect(() => {
    const sections = ["home", "why-us", "services", "menu", "packages", "contact"];
    
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 200; // Offset for header trigger zone

      // Special case: if we are scrolled to the very bottom, force activate the contact section
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveSection("contact");
        return;
      }

      let currentSection = "home";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            currentSection = id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    // Run once on mount after a tiny timeout to ensure elements are positioned
    const timer = setTimeout(handleScrollSpy, 100);

    return () => {
      window.removeEventListener("scroll", handleScrollSpy);
      clearTimeout(timer);
    };
  }, []);

  const scrollToSection = useCallback((href) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    const sectionId = href.replace('#', '');
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
  }, []);

  const handleMouseEnter = useCallback((e) => {
    const el = e.currentTarget;
    setHoverStyle(prev => ({
      left: el.offsetLeft,
      width: el.offsetWidth,
      opacity: 1,
      animate: prev.opacity > 0 // Only animate movement if bubble is already visible
    }));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoverStyle(prev => ({ ...prev, opacity: 0, animate: false }));
  }, []);

  const handleRightMouseEnter = useCallback((e) => {
    const el = e.currentTarget;
    setRightHoverStyle(prev => ({
      left: el.offsetLeft,
      width: el.offsetWidth,
      opacity: 1,
      animate: prev.opacity > 0
    }));
  }, []);

  const handleRightMouseLeave = useCallback(() => {
    setRightHoverStyle(prev => ({ ...prev, opacity: 0, animate: false }));
  }, []);

  const navItemsJSX = useMemo(() => {
    return menuItems.map((item) => {
      const sectionId = item.href.replace("#", "");
      const isActive = activeSection === sectionId;
      const isHome = item.label === "Home";

      return (
        <NavItem
          key={item.label}
          item={item}
          isActive={isActive}
          isHome={isHome}
          onClick={() => scrollToSection(item.href)}
          onMouseEnter={handleMouseEnter}
        />
      );
    });
  }, [activeSection, scrollToSection, handleMouseEnter]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "" : "bg-transparent"}`}
      >
        {scrolled && (
          <>
            <div className="absolute inset-0 bg-white/10 dark:bg-white/5 backdrop-blur-xl border-b border-white/20 dark:border-white/10 shadow-2xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/10 dark:via-transparent dark:to-transparent" />
            <div className="absolute -inset-1 bg-gradient-to-r from-white/5 via-transparent to-white/5 blur-xl opacity-20 pointer-events-none" />
          </>
        )}

        <div className="container px-4 relative z-10">
          <div className="flex items-center justify-between gap-4 min-h-[76px] md:min-h-[88px]">
            <div
              className="group relative flex items-center gap-2 cursor-pointer transition-all duration-300 p-1.5 sm:pl-1.5 sm:pr-4 sm:py-1.5 rounded-full bg-primary/5 backdrop-blur-xl border border-primary/15 shadow-[0_4px_30px_rgba(252,128,25,0.06),inset_0_1px_1px_rgba(252,128,25,0.08)] overflow-hidden"
              onClick={() => scrollToSection("#home")}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-primary/8 via-transparent to-transparent pointer-events-none" />
              {/* hover bubble */}
              <div 
                className="absolute inset-0 rounded-full bg-primary/15 backdrop-blur-md border border-primary/25 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 pointer-events-none" 
                style={{
                  transitionProperty: 'all',
                  transitionDuration: '500ms',
                  transitionTimingFunction: 'cubic-bezier(0.34, 1.15, 0.64, 1)'
                }}
              />
              <img
                src="/assets/logo.svg"
                alt="घर का स्वाद Logo"
                style={{ width: 56, height: 56 }}
                className="rounded-full object-cover drop-shadow-md border border-white/10"
                decoding="async"
              />
              <div className="hidden sm:flex relative flex-col justify-center items-start gap-[3px] select-none">
                <span className="relative translate-y-[3px] text-[18px] font-semibold text-foreground/95 tracking-wide leading-none whitespace-nowrap">
                  {"Bihar\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}<span style={{marginLeft: "7px"}}>i</span><span style={{marginLeft: "2px"}}> Sanskriti</span>
                </span>
                {/* K overlay sits between the two lines, completing 'Ki' and 'Ka' */}
                <span className="absolute text-[48px] font-bold text-[#FC8019] drop-shadow-md leading-none pointer-events-none" style={{ left: '56px', top: 0, bottom: 0, margin: 'auto', height: '48px', display: 'flex', alignItems: 'center', paddingTop: '2px' }}>
                  K
                </span>
                <span className="text-[18px] font-bold text-foreground leading-none whitespace-nowrap ml-[29px]">
                  {"\u0918\u0930\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}<span style={{marginLeft: "7px"}}>a {"\u0938\u094d\u0935\u093e\u0926"}</span>
                </span>
              </div>
            </div>

            {/* Liquid glass nav pill */}
            <nav className="hidden min-[1080px]:flex items-center">
              <div 
                className="relative flex items-center gap-1 px-2 py-2 rounded-full
                  bg-primary/5 backdrop-blur-xl
                  border border-primary/15
                  shadow-[0_4px_30px_rgba(252,128,25,0.06),inset_0_1px_1px_rgba(252,128,25,0.08)]
                "
                onMouseLeave={handleMouseLeave}
              >
                {/* subtle orange inner highlight */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-primary/8 via-transparent to-transparent pointer-events-none" />
                
                {/* Sliding Hover Bubble */}
                <div 
                  className={`absolute top-2 bottom-2 rounded-full bg-primary/15 border border-primary/25 shadow-[inset_0_1px_1px_rgba(252,128,25,0.15)] backdrop-blur-md pointer-events-none z-10
                    ${hoverStyle.animate ? 'transition-all duration-500' : 'transition-opacity duration-300'}
                  `}
                  style={{ 
                    left: hoverStyle.left, 
                    width: hoverStyle.width, 
                    opacity: hoverStyle.opacity, 
                    transform: hoverStyle.opacity ? 'scale(1)' : 'scale(0.8)',
                    transitionTimingFunction: hoverStyle.animate ? 'cubic-bezier(0.34, 1.15, 0.64, 1)' : 'ease-out'
                  }}
                />

                {navItemsJSX}
              </div>
            </nav>

            <div 
              className="relative flex items-center p-1 rounded-full bg-primary/5 backdrop-blur-xl border border-primary/15 shadow-[0_4px_30px_rgba(252,128,25,0.06),inset_0_1px_1px_rgba(252,128,25,0.08)]"
              onMouseLeave={handleRightMouseLeave}
            >
              {/* inner highlight */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-primary/8 via-transparent to-transparent pointer-events-none" />

              {/* Sliding Hover Bubble */}
              <div 
                className={`absolute top-1 bottom-1 rounded-full bg-primary/15 border border-primary/25 shadow-[inset_0_1px_1px_rgba(252,128,25,0.15)] backdrop-blur-md pointer-events-none z-10
                  ${rightHoverStyle.animate ? 'transition-all duration-500' : 'transition-opacity duration-300'}
                `}
                style={{ 
                  left: rightHoverStyle.left, 
                  width: rightHoverStyle.width, 
                  opacity: rightHoverStyle.opacity, 
                  transform: rightHoverStyle.opacity ? 'scale(1)' : 'scale(0.8)',
                  transitionTimingFunction: rightHoverStyle.animate ? 'cubic-bezier(0.34, 1.15, 0.64, 1)' : 'ease-out'
                }}
              />

              <div 
                onMouseEnter={handleRightMouseEnter}
                className="relative z-20 flex items-center justify-center gap-1.5 px-3.5 h-10 rounded-full transition-all duration-300 select-none cursor-default"
              >
                <span className="text-sm font-medium text-white/90 tracking-wide group-hover:text-white transition-colors">Noida</span>
                <MapPin className="h-4 w-4 text-[#FC8019] drop-shadow-md transition-transform duration-200" />
              </div>
              
              <Broucher 
                href="/assets/ghar-ka-swad.pdf" 
                label="PDF" 
                download 
                downloadName="ghar-ka-swad.pdf" 
                variant="nav"
                onMouseEnter={handleRightMouseEnter}
              />
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                onMouseEnter={handleRightMouseEnter}
                className="relative z-20 min-[1080px]:hidden p-2.5 rounded-full transition-all duration-300"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5 text-white/90 drop-shadow-md transition-transform duration-200" />
                ) : (
                  <Menu className="h-5 w-5 text-white/90 drop-shadow-md transition-transform duration-200" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="fixed inset-0 z-50 lg:hidden pointer-events-none select-none">
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-[280px] sm:w-[320px] transition-transform duration-150 transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} pointer-events-auto mobile-drawer`}
        >
          <div className="absolute inset-0 bg-white/10 dark:bg-white/5 backdrop-blur-xl border-l border-white/20 shadow-2xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 blur-xl opacity-30 animate-pulse" />
          <div className="relative h-full flex flex-col p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-white/90">Menu</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-200 hover:scale-110 active:scale-90"
              >
                <X className="h-5 w-5 text-white/90" />
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {menuItems.map((item) => {
                const sectionId = item.href.replace("#", "");
                const isActive = activeSection === sectionId;
                const isHome = item.label === "Home";
                return (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    className={`relative px-6 py-4 rounded-xl text-left font-medium transition-all duration-300 overflow-hidden ${isActive && !isHome
                      ? "text-white border border-white/30"
                      : isActive && isHome
                        ? "text-white/90 border border-white/20"
                        : "text-white/80 border border-white/10 hover:border-[#FC8019]/60 hover:bg-white/10"
                      } hover:scale-102 active:scale-98`}
                  >
                    {isActive && !isHome && (
                      <>
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl shadow-2xl" />
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
                        <div className="absolute inset-0 bg-primary/80" />
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-xl blur-sm opacity-40 animate-pulse" />
                        <div className="absolute inset-0 rounded-xl border border-white/30 shadow-inner" />
                      </>
                    )}
                    {isActive && isHome && (
                      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
                    )}
                    <span className="relative z-10 text-base">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
