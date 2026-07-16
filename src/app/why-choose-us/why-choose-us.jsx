import { useRef, useState, useCallback, useEffect, useMemo, memo } from "react";
import { Leaf, Home, ShieldCheck, IndianRupee, UtensilsCrossed, Clock, Flame, Ban } from "lucide-react";
import "./why-choose-us.css";

const benefits = [
  { text: "Freshly prepared daily with premium ingredients", Icon: Leaf },
  { text: <>Home-cooked taste that reminds you of your <span className="text-[#FC8019] font-semibold">घर का खाना</span></>, Icon: Home },
  { text: "Hygienic preparation in a clean home kitchen", Icon: ShieldCheck },
  { text: "Premium meals affordable packages", Icon: IndianRupee },
  { text: "Customizable meals for preferred meal combination", Icon: UtensilsCrossed },
  { text: "On-time delivery, every single day at your door step", Icon: Clock },
  { text: "Authentic local and traditional recipes", Icon: Flame },
  { text: "No preservatives or artificial additives", Icon: Ban }
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

const BenefitCard = memo(function BenefitCard({ benefit }) {
  const { text, Icon } = benefit;
  const {
    cardRef,
    handleMouseMove,
    handleMouseLeave,
    handleFocus,
    handleBlur,
  } = useCardTilt();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);
  
  return (
    <div className="transition-all duration-700 ease-out opacity-100 translate-x-0">
      <div
        ref={cardRef}
        tabIndex={0}
        style={{
          willChange: "transform",
        }}
        className={
          isMounted
            ? "group relative h-full p-4 rounded-2xl bg-primary/5 backdrop-blur-xl border border-primary/15 shadow-[0_4px_30px_rgba(252,128,25,0.06),inset_0_1px_1px_rgba(252,128,25,0.08)] hover:shadow-2xl transition-shadow duration-100 overflow-hidden focus:outline-none benefit-card"
            : "group relative h-full p-4 rounded-2xl bg-primary/5 border border-primary/15 shadow-[0_4px_30px_rgba(252,128,25,0.06),inset_0_1px_1px_rgba(252,128,25,0.08)] hover:shadow-2xl transition-shadow duration-100 overflow-hidden focus:outline-none benefit-card"
        }
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-label={text}
      >
        {/* Inner subtle highlight */}
        {isMounted && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/8 via-transparent to-transparent pointer-events-none" />
        )}

        {/* Liquid glass hover bubble */}
        {isMounted && (
          <div 
            className="absolute inset-0 rounded-2xl bg-primary/15 backdrop-blur-md border border-primary/25 scale-[0.85] opacity-0 group-hover:scale-100 group-hover:opacity-100 pointer-events-none" 
            style={{
              transitionProperty: 'all',
              transitionDuration: '500ms',
              transitionTimingFunction: 'cubic-bezier(0.34, 1.15, 0.64, 1)'
            }}
          />
        )}

        {/* Outer glow blur backdrop */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-200" />

        <div className="relative z-10 flex items-center justify-start gap-3 w-full h-full px-2 sm:px-4">
          <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center transition-colors duration-300 group-hover:bg-primary/30 backdrop-blur-sm border border-white/30 shadow-inner flex-shrink-0">
            <Icon className="w-4 h-4 text-primary drop-shadow-sm transition-transform duration-200 group-hover:scale-110" />
          </div>
          <p className="text-sm md:text-base text-white/90 leading-relaxed group-hover:text-white transition-colors duration-200 text-left">
            {text}
          </p>
        </div>

        {/* Bottom hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl" />
      </div>
    </div>
  );
});

export function WhyChooseUs() {
  const {
    cardRef: visualCardRef,
    handleMouseMove: handleVisualMouseMove,
    handleMouseLeave: handleVisualMouseLeave,
    handleFocus: handleVisualFocus,
    handleBlur: handleVisualBlur,
  } = useCardTilt();

  const benefitCardsJSX = useMemo(() => {
    return benefits.map((benefit, index) => (
      <BenefitCard key={index} benefit={benefit} />
    ));
  }, []);

  return (
    <section
      id="why-us"
      className="py-20 md:py-32 relative overflow-hidden bg-cover bg-center bg-no-repeat"
    >
      <img
        src="/assets/img4.jpg"
        alt="Why Choose Us Background"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          left: "0px",
          top: "0px",
          right: "0px",
          bottom: "0px",
          objectFit: "cover",
          objectPosition: "center 20%",
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
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 lg:gap-16 items-center justify-between">
          <div className="space-y-8 transition-all duration-700 ease-out opacity-100 translate-x-0">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                Why {" "}
                <span className="text-primary">घर का स्वाद</span> ?
              </h2>
              <p className="text-lg md:text-xl text-foreground/90 leading-relaxed">
                Our tastiest bihari style
                {" "}
                <span className="text-primary font-semibold">घर का खाना</span>
                {" "}
                in
                {" "}
                <span className="text-primary font-semibold">घर का स्वाद</span>
                {" "}
                cooked with warmth and care by <span className="text-primary font-semibold">me</span> delivered at your doorstep.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefitCardsJSX}
            </div>
          </div>

          <div className="relative group mb-8 lg:mb-0 transition-all duration-700 ease-out opacity-100 scale-100">
            <div
              ref={visualCardRef}
              tabIndex={0}
              style={{
                transformStyle: 'preserve-3d',
              }}
              className="relative aspect-square rounded-3xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl focus:outline-none"
              onMouseMove={handleVisualMouseMove}
              onMouseLeave={handleVisualMouseLeave}
              onFocus={handleVisualFocus}
              onBlur={handleVisualBlur}
              aria-label="Homemade Quality & Authenticity Guaranteed"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent" />
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-200" />

              <div className="relative w-full h-full">
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src="/assets/img1.svg"
                    alt="Homemade Food"
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      left: "0px",
                      top: "0px",
                      right: "0px",
                      bottom: "0px",
                      objectFit: "cover",
                      objectPosition: "center"
                    }}
                    className="object-cover rounded-3xl w-full h-full"
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-3xl backdrop-blur-[2px]" />
                </div>

                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="text-center space-y-6 p-8">
                    <div className="text-6xl md:text-8xl font-bold text-[#FC8019] drop-shadow-lg">
                      100%
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl md:text-3xl font-bold text-white">Homemade</div>
                      <div className="text-white font-semibold" style={{ fontSize: "22px" }}>
                        <span className="text-[#FC8019]">घर का खाना</span> खाये, <span className="text-[#FC8019]">घर के स्वाद</span> में खायें |
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-3xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 md:h-32 bg-gradient-to-t from-background to-transparent z-5" />
    </section>
  );
}
