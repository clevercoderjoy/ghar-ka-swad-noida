import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Phone, CookingPot } from "lucide-react";
import "./hero.css";

function useCardTilt() {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 15;
    const rotateX = -((y - centerY) / centerY) * 15;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.transition = "transform 0.05s ease-out";
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (card) {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      card.style.transition = "transform 0.3s ease-out";
    }
  }, []);

  const handleFocus = handleMouseLeave;
  const handleBlur = handleMouseLeave;

  return { cardRef, handleMouseMove, handleMouseLeave, handleFocus, handleBlur };
}

export function Hero() {
  const {
    cardRef: logoRef,
    handleMouseMove: handleLogoMouseMove,
    handleMouseLeave: handleLogoMouseLeave,
    handleFocus: handleLogoFocus,
    handleBlur: handleLogoBlur,
  } = useCardTilt();

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [hoverStyle, setHoverStyle] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0, animate: false });
  const [modalHoverStyle, setModalHoverStyle] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0, animate: false });

  const handleMouseEnter = useCallback((e) => {
    const el = e.currentTarget;
    setHoverStyle(prev => ({
      left: el.offsetLeft,
      top: el.offsetTop,
      width: el.offsetWidth,
      height: el.offsetHeight,
      opacity: 1,
      animate: prev.opacity > 0
    }));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoverStyle(prev => ({ ...prev, opacity: 0, animate: false }));
  }, []);

  const handleModalMouseEnter = useCallback((e) => {
    const el = e.currentTarget;
    setModalHoverStyle(prev => ({
      left: el.offsetLeft,
      top: el.offsetTop,
      width: el.offsetWidth,
      height: el.offsetHeight,
      opacity: 1,
      animate: prev.opacity > 0
    }));
  }, []);

  const handleModalMouseLeave = useCallback(() => {
    setModalHoverStyle(prev => ({ ...prev, opacity: 0, animate: false }));
  }, []);

  const handleOrderNow = () => {
    setIsOrderModalOpen(true);
  };

  const handleCallNow = () => {
    window.open('tel:+919266844741', '_self');
    setIsOrderModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsOrderModalOpen(false);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[76px] md:pt-[88px]">
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/hero-food.jpg"
          alt="Hero Food Background"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            left: "0px",
            top: "0px",
            right: "0px",
            bottom: "0px",
            objectFit: "cover",
            objectPosition: "center",
            zIndex: 0,
          }}
          className="absolute inset-0 w-full h-full"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/35 via-background/60 to-background/85" />
      </div>

      <div className="absolute inset-0 z-5 bg-white/0.5 backdrop-blur-[1px] border-0 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/2 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/2 via-accent/2 to-primary/2 blur-xl opacity-10 animate-pulse" />
      </div>

      <div className="container relative z-10 px-4 py-4 sm:py-6 h-full w-full">
        <div className="relative max-w-7xl mx-auto flex flex-col justify-between min-h-[calc(100vh-8rem)] transition-all duration-700 ease-out opacity-100 translate-y-0">
          
          <div className="relative z-10 text-center space-y-4 pt-2 sm:pt-4 flex flex-col items-center">
            {/* "Bihar ki Sanskriti" heading at the very top */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-none transition-all duration-700 ease-out opacity-100 translate-y-0 mb-1">
                <span className="text-white">
                  Bihar ki Sanskriti
                </span>
            </h2>

            {/* Logo with centered watermark 'के' overlay */}
            <div className="flex justify-center w-full">
              <div
                ref={logoRef}
                tabIndex={0}
                onMouseMove={handleLogoMouseMove}
                onMouseLeave={handleLogoMouseLeave}
                onFocus={handleLogoFocus}
                onBlur={handleLogoBlur}
                className="relative mx-auto rounded-full w-[160px] h-[160px] sm:w-[170px] sm:h-[170px] md:w-[200px] md:h-[200px] lg:w-[220px] lg:h-[220px] focus:outline-none group"
                aria-label="Ghar Ka Swaad Logo"
              >
                <img
                  src="/assets/logo.svg"
                  alt="logo"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    left: "0px",
                    top: "0px",
                    right: "0px",
                    bottom: "0px",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  className="rounded-full object-cover transition-all duration-300 ease-out group-hover:opacity-0 group-hover:scale-95"
                  fetchPriority="high"
                  decoding="async"
                />
                
                {/* Centered 'के' watermark overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10">
                  <span className="text-[100px] sm:text-[110px] md:text-[130px] lg:text-[145px] font-black text-[#FC8019] opacity-0 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-105 flex items-center justify-center leading-none h-full w-full select-none pointer-events-none drop-shadow-2xl translate-y-[18px] sm:translate-y-[20px] md:translate-y-[24px] lg:translate-y-[27px]">
                    के
                  </span>
                </div>
              </div>
            </div>

            {/* Brand title "घर का स्वाद" */}
            <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none transition-all duration-700 ease-out opacity-100 translate-y-0 mt-2">
              <span className="text-[#FC8019] drop-shadow-md">
                घर का स्वाद
              </span>
            </h1>
          </div>

          <div className="relative z-10 text-center space-y-3 sm:space-y-4 mt-auto mb-4 py-3">
            <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm hover:bg-primary/15 transition-all duration-200 hover:scale-105 mx-auto">
              <span className="text-sm sm:text-base md:text-lg font-semibold text-primary/90 tracking-wide">
                घर का खाना खाये, घर के स्वाद में खायें
              </span>
            </div>

            <div className="text-center max-w-2xl mx-auto leading-relaxed font-medium space-y-1.5 sm:space-y-2 px-4 transition-all duration-700 ease-out opacity-100 translate-y-0">
              <p className="text-base sm:text-sm md:text-lg text-foreground tracking-wider">
                The authentic home-cooked bihari cuisine.
              </p>
            </div>
          </div>

          <div className="relative z-10 space-y-3 sm:space-y-4 md:space-y-5 pb-3 sm:pb-4">
            <div 
              className="relative flex flex-col xs:flex-row gap-2.5 sm:gap-3 justify-center items-stretch p-1 sm:p-1.5 w-full max-w-md mx-auto transition-all duration-700 ease-out opacity-100 translate-y-0 rounded-[2rem] xs:rounded-full bg-primary/5 backdrop-blur-xl border border-primary/15 shadow-[0_4px_30px_rgba(252,128,25,0.06),inset_0_1px_1px_rgba(252,128,25,0.08)]"
              onMouseLeave={handleMouseLeave}
            >
              {/* inner highlight */}
              <div className="absolute inset-0 rounded-[2rem] xs:rounded-full bg-gradient-to-b from-primary/8 via-transparent to-transparent pointer-events-none" />

              {/* Sliding Hover Bubble */}
              <div 
                className="absolute rounded-full bg-primary/15 border border-primary/25 shadow-[inset_0_1px_1px_rgba(252,128,25,0.15)] backdrop-blur-md pointer-events-none z-10"
                style={{ 
                  left: hoverStyle.left, 
                  top: hoverStyle.top,
                  width: hoverStyle.width, 
                  height: hoverStyle.height,
                  opacity: hoverStyle.opacity, 
                  transform: hoverStyle.opacity ? 'scale(1)' : 'scale(0.85)',
                  transition: hoverStyle.animate
                    ? 'left 350ms cubic-bezier(0.25, 1, 0.5, 1), width 350ms cubic-bezier(0.25, 1, 0.5, 1), height 350ms cubic-bezier(0.25, 1, 0.5, 1), top 350ms cubic-bezier(0.25, 1, 0.5, 1), opacity 300ms cubic-bezier(0.25, 1, 0.5, 1), transform 300ms cubic-bezier(0.25, 1, 0.5, 1)'
                    : 'opacity 300ms cubic-bezier(0.25, 1, 0.5, 1), transform 300ms cubic-bezier(0.25, 1, 0.5, 1)'
                }}
              />

              <Button
                size="lg"
                variant="ghost"
                className="group relative z-20 overflow-hidden rounded-full w-full xs:flex-1 px-5 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold transition-all duration-300 hover:bg-transparent bg-transparent border-transparent shadow-none"
                onClick={handleOrderNow}
                onMouseEnter={handleMouseEnter}
              >
                <Phone className="relative z-10 mr-1.5 sm:mr-2 h-4 sm:h-5 w-4 sm:w-5 transition-transform group-hover:scale-110 group-hover:-translate-y-0.5 duration-200 text-[#FC8019] drop-shadow-md" />
                <span className="relative z-10 text-white/90 tracking-wide">Order Now</span>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="group relative z-20 overflow-hidden rounded-full w-full xs:flex-1 px-5 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold transition-all duration-300 hover:bg-transparent bg-transparent border-transparent shadow-none"
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                onMouseEnter={handleMouseEnter}
              >
                <CookingPot className="relative z-10 mr-1.5 sm:mr-2 h-4 sm:h-5 w-4 sm:w-5 transition-transform group-hover:scale-110 group-hover:-translate-y-0.5 duration-200 text-[#FC8019] drop-shadow-md" />
                <span className="relative z-10 text-white/90 tracking-wide">View Meal Plans</span>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 max-w-2xl mx-auto px-2 transition-all duration-700 ease-out opacity-100 translate-y-0">
              <div className="relative overflow-hidden space-y-0.5 sm:space-y-1 text-center p-3 sm:p-4 rounded-3xl transition-all duration-300 hover:scale-105 bg-primary/5 backdrop-blur-xl border border-primary/15 shadow-[0_4px_30px_rgba(252,128,25,0.06),inset_0_1px_1px_rgba(252,128,25,0.08)] cursor-pointer flex flex-col items-center justify-center">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/8 via-transparent to-transparent pointer-events-none" />
                <div className="relative z-10 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#FC8019] drop-shadow-md">
                  1000+
                </div>
                <div className="relative z-10 text-[10px] sm:text-xs md:text-sm text-white/80 font-medium tracking-wide">
                  Happy Stomachs
                </div>
              </div>
              <div className="relative overflow-hidden space-y-0.5 sm:space-y-1 text-center p-3 sm:p-4 rounded-3xl transition-all duration-300 hover:scale-105 bg-primary/5 backdrop-blur-xl border border-primary/15 shadow-[0_4px_30px_rgba(252,128,25,0.06),inset_0_1px_1px_rgba(252,128,25,0.08)] cursor-pointer flex flex-col items-center justify-center">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/8 via-transparent to-transparent pointer-events-none" />
                <div className="relative z-10 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#FC8019] drop-shadow-md">
                  Daily
                </div>
                <div className="relative z-10 text-[10px] sm:text-xs md:text-sm text-white/80 font-medium tracking-wide">
                  Fresh Meals
                </div>
              </div>
              <div className="relative overflow-hidden space-y-0.5 sm:space-y-1 text-center p-3 sm:p-4 rounded-3xl transition-all duration-300 hover:scale-105 bg-primary/5 backdrop-blur-xl border border-primary/15 shadow-[0_4px_30px_rgba(252,128,25,0.06),inset_0_1px_1px_rgba(252,128,25,0.08)] cursor-pointer flex flex-col items-center justify-center">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/8 via-transparent to-transparent pointer-events-none" />
                <div className="relative z-10 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#FC8019] drop-shadow-md">
                  2.5+
                </div>
                <div className="relative z-10 text-[10px] sm:text-xs md:text-sm text-white/80 font-medium tracking-wide">
                  Years of Service
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 md:h-28 bg-gradient-to-t from-background to-transparent z-20" />

      {isOrderModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ease-in-out"
          onClick={handleCloseModal}
        >
          <div className="absolute inset-0 bg-black/20 backdrop-blur-md transition-opacity duration-500" />

          <div
            className="relative w-full max-w-md mx-auto scale-100 opacity-100 translate-y-0 transition-all duration-500 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative p-6 sm:p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent" />

              <div className="relative z-10 text-center space-y-4 sm:space-y-6">
                <div className="group relative mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/5 backdrop-blur-xl border border-primary/15 shadow-[0_4px_30px_rgba(252,128,25,0.06),inset_0_1px_1px_rgba(252,128,25,0.08)] flex items-center justify-center scale-100 transition-all duration-300">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-primary/8 via-transparent to-transparent pointer-events-none" />
                  <div 
                    className="absolute inset-0 rounded-full bg-primary/15 backdrop-blur-md border border-primary/25 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 pointer-events-none" 
                    style={{
                      transitionProperty: 'all',
                      transitionDuration: '500ms',
                      transitionTimingFunction: 'cubic-bezier(0.34, 1.15, 0.64, 1)'
                    }}
                  />
                  <Phone className="relative z-10 h-7 w-7 sm:h-8 sm:w-8 text-[#FC8019] drop-shadow-md transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-0.5" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#FC8019] drop-shadow-md transition-all duration-500">Ready to Order?</h3>

                <p className="text-white/90 text-base sm:text-lg leading-relaxed transition-all duration-500">
                  Do you want to call and place your order now?
                </p>

                <div className="pt-2 sm:pt-4 transition-all duration-500">
                  <div 
                    className="relative flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center items-stretch p-1 sm:p-1.5 w-full rounded-[2rem] sm:rounded-full bg-primary/5 backdrop-blur-xl border border-primary/15 shadow-[0_4px_30px_rgba(252,128,25,0.06),inset_0_1px_1px_rgba(252,128,25,0.08)]"
                    onMouseLeave={handleModalMouseLeave}
                  >
                    {/* inner highlight */}
                    <div className="absolute inset-0 rounded-[2rem] sm:rounded-full bg-gradient-to-b from-primary/8 via-transparent to-transparent pointer-events-none" />

                    {/* Sliding Hover Bubble */}
                    <div 
                      className="absolute rounded-full bg-primary/15 border border-primary/25 shadow-[inset_0_1px_1px_rgba(252,128,25,0.15)] backdrop-blur-md pointer-events-none z-10"
                      style={{ 
                        left: modalHoverStyle.left, 
                        top: modalHoverStyle.top,
                        width: modalHoverStyle.width, 
                        height: modalHoverStyle.height,
                        opacity: modalHoverStyle.opacity, 
                        transform: modalHoverStyle.opacity ? 'scale(1)' : 'scale(0.85)',
                        transition: modalHoverStyle.animate
                          ? 'left 350ms cubic-bezier(0.25, 1, 0.5, 1), width 350ms cubic-bezier(0.25, 1, 0.5, 1), height 350ms cubic-bezier(0.25, 1, 0.5, 1), top 350ms cubic-bezier(0.25, 1, 0.5, 1), opacity 300ms cubic-bezier(0.25, 1, 0.5, 1), transform 300ms cubic-bezier(0.25, 1, 0.5, 1)'
                          : 'opacity 300ms cubic-bezier(0.25, 1, 0.5, 1), transform 300ms cubic-bezier(0.25, 1, 0.5, 1)'
                      }}
                    />

                    <Button
                      onClick={handleCallNow}
                      onMouseEnter={handleModalMouseEnter}
                      className="group relative z-20 overflow-hidden flex-1 rounded-full w-full bg-transparent border-transparent hover:bg-transparent shadow-none text-white/90 font-semibold py-2.5 sm:py-3 px-5 sm:px-6 transition-all duration-300"
                    >
                      <Phone className="relative z-10 mr-1.5 h-4 w-4 transition-transform group-hover:scale-110 group-hover:-translate-y-0.5 duration-200 drop-shadow-md text-[#FC8019]" />
                      <span className="relative z-10 tracking-wide group-hover:text-white transition-colors">Yes, Call Now</span>
                    </Button>
                    <Button
                      onClick={handleCloseModal}
                      onMouseEnter={handleModalMouseEnter}
                      variant="ghost"
                      className="group relative z-20 overflow-hidden flex-1 rounded-full w-full bg-transparent border-transparent hover:bg-transparent shadow-none text-white/90 font-semibold py-2.5 sm:py-3 px-5 sm:px-6 transition-all duration-300"
                    >
                      <span className="relative z-10 tracking-wide group-hover:text-white transition-colors">Not Now</span>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-xl opacity-30 animate-pulse" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
