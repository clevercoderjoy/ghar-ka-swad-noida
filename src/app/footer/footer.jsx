import { Heart } from "lucide-react";
import { useCallback } from "react";
import "./footer.css";

export function Footer() {
  const scrollToSection = useCallback((href) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <footer className="relative overflow-hidden bg-white/10 dark:bg-white/5 backdrop-blur-xl shadow-2xl min-h-[100px]">
      <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
        <img
          src="/assets/img5.jpeg"
          alt="Footer Background"
          style={{ objectFit: "cover", objectPosition: "center 50%", zIndex: 0, width: "100%", height: "100%" }}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/10 dark:via-transparent dark:to-transparent" />
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 blur-xl opacity-30 animate-pulse" />
      </div>
      <div className="container px-4 py-4 md:py-12 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-4">
          <div
            className="group relative flex items-center gap-2 cursor-pointer transition-all duration-300 p-0 sm:pl-0 sm:pr-3.5 sm:py-0 h-11 rounded-full bg-black/35 backdrop-blur-md border border-white/20 shadow-[0_4px_30px_rgba(252,128,25,0.06),inset_0_1px_1px_rgba(252,128,25,0.08)] overflow-hidden [transform:translateZ(0)] hover:scale-105"
            onClick={() => scrollToSection("#home")}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-primary/8 via-transparent to-transparent pointer-events-none" />
            <div 
              className="absolute inset-0 rounded-full bg-primary/15 border border-primary/25 shadow-[inset_0_1px_1px_rgba(252,128,25,0.15)] scale-[0.85] opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 pointer-events-none" 
              style={{
                transitionTimingFunction: 'cubic-bezier(0.34, 1.15, 0.64, 1)'
              }}
            />
            <img
              src="/logo.svg.svg"
              alt="घर का स्वाद Logo"
              style={{ width: 44, height: 44 }}
              className="rounded-full object-cover border border-white/10"
              decoding="async"
            />
            <div className="hidden sm:flex flex-col justify-center items-center select-none text-center gap-0 leading-tight pr-2">
              <span className="text-[16px] font-extrabold text-white tracking-wide">
                Ghar ka Swad
              </span>
              <span className="text-[12px] font-black text-[#FC8019] tracking-wider uppercase">
                Sanskriti Raj
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 w-full lg:w-auto">
            <div className="text-center text-sm sm:text-base text-white/95 font-medium">
              <p className="whitespace-nowrap">&copy; {new Date().getFullYear()} घर का स्वाद | All rights reserved.</p>
            </div>
          </div>

          <div className="group relative flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/35 backdrop-blur-md border border-white/20 shadow-[0_4px_30px_rgba(252,128,25,0.06),inset_0_1px_1px_rgba(252,128,25,0.08)] hover:scale-105 transition-all duration-300 [transform:translateZ(0)]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-primary/8 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 rounded-full bg-primary/15 backdrop-blur-md border border-primary/25 scale-[0.85] opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 pointer-events-none" style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.15, 0.64, 1)' }} />
            
            <span className="relative z-10 text-sm sm:text-[15px] text-white">Made with</span>
            <Heart className="relative z-10 w-4 h-4 text-red-500 fill-red-500 border-red-500 animate-pulse" />
            <span className="relative z-10 text-sm sm:text-[15px] text-white">by <a href="https://clevercoderjoy.bio.link/" target="_blank" rel="noopener noreferrer" className="text-[#FC8019] drop-shadow-md no-underline transition-colors font-semibold">clevercoderjoy</a></span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background/80 to-transparent z-5 pointer-events-none" />
    </footer>
  );
}
