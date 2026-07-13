import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Phone, Headphones, Clock } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useRef, useState, useCallback, useEffect } from "react";
import "./contact.css";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    detail: "+91 6202744741",
    action: "tel:+916202744741"
  },
  {
    icon: Headphones,
    title: "Support Hours",
    detail: "9 AM - 9 PM Daily",
    action: null
  },
  {
    icon: FaWhatsapp,
    title: "Whatsapp",
    detail: "घर का स्वाद",
    action: "https://wa.me/+916202744741"
  },
  {
    icon: Clock,
    title: "Delivery Hours",
    detail: "9 AM - 9 PM Daily",
    action: null
  }
];

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

  return {
    cardRef,
    handleMouseMove,
    handleMouseLeave,
    handleFocus,
    handleBlur,
  };
}

function ContactCard({ info }) {
  const {
    cardRef,
    handleMouseMove,
    handleMouseLeave,
    handleFocus,
    handleBlur,
  } = useCardTilt();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  const cardInner = (
    <div
      ref={cardRef}
      tabIndex={0}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      className={
        isMounted
          ? "group relative h-full p-6 rounded-3xl bg-primary/5 backdrop-blur-xl border border-primary/15 shadow-[0_4px_30px_rgba(252,128,25,0.06),inset_0_1px_1px_rgba(252,128,25,0.08)] hover:shadow-2xl transition-shadow duration-100 overflow-hidden focus:outline-none contact-card"
          : "group relative h-full p-6 rounded-3xl bg-primary/5 border border-primary/15 shadow-[0_4px_30px_rgba(252,128,25,0.06),inset_0_1px_1px_rgba(252,128,25,0.08)] hover:shadow-2xl transition-shadow duration-100 overflow-hidden focus:outline-none contact-card"
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      aria-label={info.title}
    >
      {isMounted && (
        <>
          {/* Inner subtle highlight */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/8 via-transparent to-transparent pointer-events-none" style={{ transform: "translateZ(20px)" }} />
          
          {/* Liquid glass hover bubble */}
          <div 
            className="absolute inset-0 rounded-3xl bg-primary/15 backdrop-blur-md border border-primary/25 scale-[0.85] opacity-0 group-hover:scale-100 group-hover:opacity-100 pointer-events-none" 
            style={{
              transform: "translateZ(10px)",
              transitionProperty: 'all',
              transitionDuration: '500ms',
              transitionTimingFunction: 'cubic-bezier(0.34, 1.15, 0.64, 1)'
            }}
          />

          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-200" />
        </>
      )}
      <CardContent className="relative z-10 p-0 text-center space-y-4" style={{ transform: "translateZ(40px)" }}>
        <div className="w-12 h-12 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center transition-colors duration-300 group-hover:bg-primary/30 backdrop-blur-sm border border-white/30 shadow-inner">
          <info.icon className="w-6 h-6 text-primary drop-shadow-sm transition-transform duration-200 group-hover:scale-110" />
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-sm text-foreground/90">
            {info.title}
          </h3>
          {info.action ? (
            <span className="block text-base font-medium text-white group-hover:text-primary transition-colors duration-300 cursor-pointer">
              {info.detail}
            </span>
          ) : (
            <p className="text-base font-medium text-white">{info.detail}</p>
          )}
        </div>
      </CardContent>
      {isMounted && (
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-3xl" />
      )}
    </div>
  );

  return (
    <div className="group transition-all duration-700 ease-out opacity-100 translate-y-0">
      {info.action ? (
        <a
          href={info.action}
          target={info.title === "Whatsapp" ? "_blank" : undefined}
          rel={info.title === "Whatsapp" ? "noopener noreferrer" : undefined}
          tabIndex={0}
          aria-label={info.title}
          className="block focus:outline-none"
          style={{ textDecoration: "none" }}
        >
          {cardInner}
        </a>
      ) : (
        cardInner
      )}
    </div>
  );
}

function LiquidGlassCTA() {
  const {
    cardRef,
    transform,
    handleMouseMove,
    handleMouseLeave,
    handleFocus,
    handleBlur,
  } = useCardTilt();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);
  
  const [btnHoverStyle, setBtnHoverStyle] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0, animate: false });

  const handleBtnMouseEnter = useCallback((e) => {
    const el = e.currentTarget;
    setBtnHoverStyle(prev => ({
      left: el.offsetLeft,
      top: el.offsetTop,
      width: el.offsetWidth,
      height: el.offsetHeight,
      opacity: 1,
      animate: prev.opacity > 0
    }));
  }, []);

  const handleBtnMouseLeave = useCallback(() => {
    setBtnHoverStyle(prev => ({ ...prev, opacity: 0, animate: false }));
  }, []);
  
  return (
    <div
      ref={cardRef}
      tabIndex={0}
      style={{
        transform: transform,
        transition: "transform 0.1s ease-out",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      className={
        isMounted
          ? "relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-2xl transition-shadow duration-100 overflow-hidden focus:outline-none"
          : "relative rounded-3xl bg-white/5 border border-white/10 shadow-xl hover:shadow-2xl transition-shadow duration-100 overflow-hidden focus:outline-none"
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      aria-label="CTA Card"
    >
      {isMounted && (
        <>
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none" style={{ transform: "translateZ(20px)" }} />
        </>
      )}
      <CardContent className="relative z-10 p-8 md:p-12 text-center space-y-3" style={{ transform: "translateZ(40px)" }}>
        <h3 className="text-2xl md:text-3xl font-bold text-white">
          Start Your Delicious Journey with
          {" "}
          <span className="text-[#FC8019] drop-shadow-md font-semibold text-md tracking-wider">घर का स्वाद |</span>
        </h3>
        <p className="text-white max-w-2xl mx-auto">
          Join hundreds of satisfied customers who trust us for their daily meals.
        </p>
        
        <div className="flex justify-center pt-6" style={{ transform: "translateZ(40px)" }}>
          <div 
            className="relative flex items-center p-1.5 sm:p-2 rounded-full bg-primary/5 backdrop-blur-xl border border-primary/15 shadow-[0_4px_30px_rgba(252,128,25,0.06),inset_0_1px_1px_rgba(252,128,25,0.08)]"
            onMouseLeave={handleBtnMouseLeave}
          >
            {/* inner highlight */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-primary/8 via-transparent to-transparent pointer-events-none" />

            {/* Sliding Hover Bubble */}
            <div 
              className={`absolute rounded-full bg-primary/15 border border-primary/25 shadow-[inset_0_1px_1px_rgba(252,128,25,0.15)] backdrop-blur-md pointer-events-none z-10
                ${btnHoverStyle.animate ? 'transition-all duration-500' : 'transition-opacity duration-300'}
              `}
              style={{ 
                left: btnHoverStyle.left, 
                top: btnHoverStyle.top,
                width: btnHoverStyle.width, 
                height: btnHoverStyle.height,
                opacity: btnHoverStyle.opacity, 
                transform: btnHoverStyle.opacity ? 'scale(1)' : 'scale(0.8)',
                transitionTimingFunction: btnHoverStyle.animate ? 'cubic-bezier(0.34, 1.15, 0.64, 1)' : 'ease-out'
              }}
            />

            <button
              onMouseEnter={handleBtnMouseEnter}
              onClick={() => window.location.href = 'tel:+916202744741'}
              className="relative z-20 flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-white/90 font-semibold hover:text-white transition-colors duration-300"
            >
              <Phone className="h-4 sm:h-5 w-4 sm:w-5 drop-shadow-md text-[#FC8019]" />
              <span className="text-sm sm:text-base tracking-wide drop-shadow-sm">Call Now</span>
            </button>
            
            <button
              onMouseEnter={handleBtnMouseEnter}
              onClick={() => window.open('https://wa.me/+916202744741', '_blank', 'noopener,noreferrer')}
              className="relative z-20 flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-white/90 font-semibold hover:text-white transition-colors duration-300"
            >
              <FaWhatsapp className="h-5 sm:h-6 w-5 sm:w-6 drop-shadow-md text-green-500" />
              <span className="text-sm sm:text-base tracking-wide drop-shadow-sm">Send Message</span>
            </button>
          </div>
        </div>
      </CardContent>
      {isMounted && (
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-3xl" />
      )}
    </div>
  );
}

export function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden bg-secondary/30">
      <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
        <img
          src="/assets/img6.jpg"
          alt="Contact Background"
          style={{
            objectFit: "cover",
            objectPosition: "center 0%",
            zIndex: 0,
            position: "absolute",
            width: "100%",
            height: "100%",
            left: "0px",
            top: "0px",
            right: "0px",
            bottom: "0px",
          }}
          className="absolute inset-0 w-full h-full blur-[1px] opacity-60"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/10 dark:via-transparent dark:to-transparent" />
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 blur-xl opacity-30 animate-pulse" />
      </div>

      <div className="container px-4 relative z-10">
        <div className="text-center space-y-4 mb-16 transition-all duration-700 ease-out opacity-100 translate-y-0">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#FC8019] drop-shadow-md">
            Get In Touch
          </h2>
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
            Ready to experience <span className="text-[#FC8019] drop-shadow-md font-bold text-[17px] md:text-[21px] tracking-wider">घर का खाना</span>
            {" "}
            in
            {" "}
            <span className="text-[#FC8019] drop-shadow-md font-bold text-[17px] md:text-[21px] tracking-wider">घर का स्वाद</span>
            {" "}? Contact us today!
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-12">
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info) => (
              <ContactCard key={info.title} info={info} />
            ))}
          </div>

          <div className="transition-all duration-700 ease-out opacity-100 translate-y-0">
            <LiquidGlassCTA />
          </div>
        </div>
      </div>
    </section>
  );
}
