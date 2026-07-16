import { UtensilsCrossed, Users, Clock, Heart } from "lucide-react";
import { useRef, useState, useCallback, useMemo, memo } from "react";
import "./services.css";

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

    const rotateY = ((x - centerX) / centerX) * 10;
    const rotateX = -((y - centerY) / centerY) * 10;

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

const ServiceCard = memo(function ServiceCard({ service }) {
  const {
    cardRef,
    handleMouseMove,
    handleMouseLeave,
    handleFocus,
    handleBlur,
  } = useCardTilt();

  return (
    <div className="group transition-all duration-700 ease-out opacity-100 translate-y-0">
      <div
        ref={cardRef}
        tabIndex={0}
        style={{
          willChange: "transform",
        }}
        className="group relative h-full p-6 rounded-3xl bg-primary/5 backdrop-blur-xl border border-primary/15 shadow-[0_4px_30px_rgba(252,128,25,0.06),inset_0_1px_1px_rgba(252,128,25,0.08)] hover:shadow-2xl transition-shadow duration-100 overflow-hidden focus:outline-none service-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-label={service.title}
      >
        {/* Inner subtle highlight */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/8 via-transparent to-transparent pointer-events-none" />
        
        {/* Liquid glass hover bubble */}
        <div 
          className="absolute inset-0 rounded-3xl bg-primary/15 backdrop-blur-md border border-primary/25 scale-[0.85] opacity-0 group-hover:scale-100 group-hover:opacity-100 pointer-events-none" 
          style={{
            transitionProperty: 'all',
            transitionDuration: '500ms',
            transitionTimingFunction: 'cubic-bezier(0.34, 1.15, 0.64, 1)'
          }}
        />

        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-200" />
        
        <div className="relative z-10 space-y-4 sm:space-y-5">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center transition-colors duration-300 group-hover:bg-primary/30 backdrop-blur-sm border border-white/30 shadow-inner">
            <service.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary drop-shadow-sm transition-transform duration-200 group-hover:scale-110" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-primary transition-colors duration-200 text-center">
            {service.title}
          </h3>
          <p className="text-sm sm:text-base text-foreground/85 leading-relaxed text-center">
            {service.description}
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-3xl" />
      </div>
    </div>
  );
});

const services = [
  {
    icon: UtensilsCrossed,
    title: "Daily Tiffin Service",
    description: "Get fresh, घर का खाना in घर का स्वाद delivered daily at your doorstep. Perfect for working professionals and students."
  },
  {
    icon: Users,
    title: "Special Order",
    description: "From office lunches to house parties to kitty parties to office meetings. We've got you all covered."
  },
  {
    icon: Clock,
    title: "2 - Time meals",
    description: "Choose your preferred meal package - lunch, dinner or both. We've got you covered."
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Every meal is prepared with love & care. We eat the same food we serve our customers."
  }
];

export function Services() {
  const serviceCardsJSX = useMemo(() => {
    return services.map((service) => (
      <ServiceCard key={service.title} service={service} />
    ));
  }, []);

  return (
    <section
      id="services"
      className="py-28 sm:py-36 md:py-56 relative overflow-hidden bg-cover bg-center bg-no-repeat"
    >
      <img
        src="/assets/img18.jpg"
        alt="Services Background"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          left: "0px",
          top: "0px",
          right: "0px",
          bottom: "0px",
          objectFit: "cover",
          objectPosition: "center 0%",
          zIndex: 0,
        }}
        className="absolute inset-0 w-full h-full"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 blur-xl opacity-30 animate-pulse" />
      </div>

      <div className="container px-4 relative z-10">
        <div className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16 transition-all duration-700 ease-out opacity-100 translate-y-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#FC8019] drop-shadow-md">
            Our Services
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto px-4">
            From daily tiffins to special events, we've got you all covered
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {serviceCardsJSX}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-10 sm:h-12 md:h-16 bg-gradient-to-t from-background to-transparent z-5" />
    </section>
  );
}
