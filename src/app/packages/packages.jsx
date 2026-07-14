import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Sparkles } from "lucide-react";
import { useRef, useState, useCallback, useMemo, memo } from "react";
import "./packages.css";

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

const PackageCard = memo(function PackageCard({ pkg }) {
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
        className={`group relative h-full p-6 rounded-3xl bg-primary/5 backdrop-blur-xl border border-primary/15 shadow-[0_4px_30px_rgba(252,128,25,0.06),inset_0_1px_1px_rgba(252,128,25,0.08)] hover:shadow-2xl transition-shadow duration-100 overflow-hidden focus:outline-none package-card ${pkg.popular ? "border-primary/50 bg-primary/10" : ""}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-label={pkg.name}
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
        
        {pkg.popular && (
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-xs font-semibold rounded-bl-lg flex items-center gap-1 z-10">
            <Sparkles className="w-3 h-3" />
            Most Popular
          </div>
        )}

        <div className="relative z-10 space-y-4 sm:space-y-5">
          <CardHeader className="space-y-4 pb-4">
            <CardTitle className="text-2xl text-center text-white">{pkg.name}</CardTitle>
            <div className="space-y-2">
              <div className="flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-primary text-center">{pkg.price}</span>
                {pkg.originalPrice && (
                  <div className="flex flex-row items-center gap-2 mt-1 mb-1">
                    <span className="text-lg font-bold text-accent">Festive Offer</span>
                    <span className="text-lg font-semibold text-muted-foreground line-through">{pkg.originalPrice}</span>
                  </div>
                )}
              </div>
              <CardDescription className="text-base text-white text-center">{pkg.description}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pb-4">
            <ul className="space-y-3">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm text-foreground/90">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className={`group relative overflow-hidden w-full rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-none ${
                pkg.popular 
                  ? "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white border border-white/20 shadow-lg"
                  : "bg-primary/5 backdrop-blur-xl border border-primary/15 shadow-[0_4px_30px_rgba(252,128,25,0.06),inset_0_1px_1px_rgba(252,128,25,0.08)] text-white/90 hover:bg-transparent hover:text-white"
              }`}
              variant="ghost"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {!pkg.popular && (
                <>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-primary/8 via-transparent to-transparent pointer-events-none" />
                  <div 
                    className="absolute inset-0 rounded-full bg-primary/15 backdrop-blur-md border border-primary/25 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 pointer-events-none" 
                    style={{
                      transition: 'opacity 300ms cubic-bezier(0.25, 1, 0.5, 1), transform 350ms cubic-bezier(0.25, 1, 0.5, 1)'
                    }}
                  />
                </>
              )}
              <span className="relative z-10 tracking-wide">Get In Touch</span>
            </Button>
          </CardFooter>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-3xl" />
      </div>
    </div>
  );
});

const packages = [
  {
    name: "1 Meal",
    price: "₹200/- Meal",
    originalPrice: null,
    description: "Perfect for 1 time meal",
    features: [
      "Advanced Payment",
      "One meal a day",
      "Fresh preparation",
      "On-time delivery",
    ],
    popular: false
  },
  {
    name: "Monthly Veg",
    price: "₹3300/-",
    originalPrice: "₹3600/-",
    description: "Most popular among our vegetarian customers",
    features: [
      "Advanced Payment",
      "30 days of delicious meals",
      "Best value pricing",
      "On-time delivery",
      "Standard Menu",
      "sweets 3 days a week",
      "Weekend specials",
    ],
    popular: true
  },
  {
    name: "Event Catering",
    price: "Custom Quote",
    description: "For your special occasions",
    features: [
      "Customized menu",
      "Any number of guests",
      "Professional setup",
      "Multiple cuisines",
      "Dedicated service staff"
    ],
    popular: false
  }
];

export function Packages() {
  const packageCardsJSX = useMemo(() => {
    return packages.map((pkg) => (
      <div
        key={pkg.name}
        className={`transition-all duration-700 ease-out opacity-100 translate-y-0 ${pkg.popular ? "md:scale-102" : ""}`}
        style={{ minWidth: 300, maxWidth: 360, width: "100%" }}
      >
        <PackageCard pkg={pkg} />
      </div>
    ));
  }, []);

  return (
    <section id="packages" className="py-20 md:py-32 relative overflow-hidden bg-cover bg-center bg-no-repeat">
      <img
        src="/assets/img7.webp"
        alt="Packages Background"
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
        <div className="text-center space-y-4 mb-16 transition-all duration-700 ease-out opacity-100 translate-y-0">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#FC8019] drop-shadow-md">
            Choose Your Meal Plan
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Flexible packages designed for every need and budget
          </p>
        </div>
        <div className="flex justify-center items-center gap-8 max-w-full mx-auto flex-wrap md:flex-nowrap">
          {packageCardsJSX}
        </div>
      </div>
    </section>
  );
}
