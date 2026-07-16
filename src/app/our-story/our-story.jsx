import { User, Flame, TrendingUp, MapPin } from "lucide-react";
import { useRef, useState, useCallback, useEffect, useMemo, memo } from "react";

function useCardTilt() {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState("");

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

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  }, []);

  const handleFocus = handleMouseLeave;
  const handleBlur = handleMouseLeave;

  return {
    cardRef,
    transform,
    handleMouseMove,
    handleMouseLeave,
    handleFocus,
    handleBlur,
  };
}

const StoryCard = memo(function StoryCard({ title, text, icon: Icon }) {
  const {
    cardRef,
    transform,
    handleMouseMove,
    handleMouseLeave,
    handleFocus,
    handleBlur,
  } = useCardTilt();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="group transition-all duration-700 ease-out opacity-100 translate-y-0 h-full flex flex-col w-full">
      <div
        ref={cardRef}
        tabIndex={0}
        style={{
          transform: transform,
          transition: "transform 0.1s ease-out",
          willChange: "transform",
        }}
        className="group relative h-full rounded-3xl bg-primary/5 backdrop-blur-xl border border-primary/15 shadow-[0_4px_30px_rgba(252,128,25,0.06),inset_0_1px_1px_rgba(252,128,25,0.08)] hover:shadow-2xl transition-shadow duration-100 overflow-hidden focus:outline-none p-6 sm:p-8 flex flex-col justify-start story-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-label={title}
      >
        {/* Inner subtle highlight */}
        {isMounted && (
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/8 via-transparent to-transparent pointer-events-none" />
        )}

        {/* Liquid glass hover bubble */}
        {isMounted && (
          <div 
            className="absolute inset-0 rounded-3xl bg-primary/15 backdrop-blur-md border border-primary/25 scale-[0.85] opacity-0 group-hover:scale-100 group-hover:opacity-100 pointer-events-none" 
            style={{
              transitionProperty: 'all',
              transitionDuration: '500ms',
              transitionTimingFunction: 'cubic-bezier(0.34, 1.15, 0.64, 1)'
            }}
          />
        )}

        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-200" />

        <div className="relative z-10 space-y-4 flex flex-col items-center text-center h-full justify-start">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center transition-colors duration-300 group-hover:bg-primary/30 backdrop-blur-sm border border-white/30 shadow-inner flex-shrink-0">
            <Icon className="w-6 h-6 text-primary drop-shadow-sm transition-transform duration-200 group-hover:scale-110" />
          </div>
          <h3 className="font-bold text-xl sm:text-2xl tracking-wide text-white group-hover:text-primary transition-colors duration-200">
            {title}
          </h3>
          <div className="text-white/85 text-sm sm:text-base leading-relaxed space-y-2 whitespace-pre-line text-left w-full">
            {text}
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-3xl" />
      </div>
    </div>
  );
});

export function OurStory() {
  const storyCards = useMemo(() => [
    {
      title: "Our First Customer",
      icon: User,
      text: (
        <>
          <span className="text-[#FC8019] font-bold">It all started in January 2024</span> with a simple discussion in our home kitchen.
          <br /><br />
          QUESTIONS, CONFUSION, ANXIETY, FEAR!
          <br /><br />
          Darbhanga's lack of homemade tiffin services market gave us cramps in our hearts, & got us thinking if it would ever work.
          <br /><br />
          With trust in my guts, the support of my family, <span className="text-[#FC8019] font-bold">I started घर का स्वाद |</span>
        </>
      )
    },
    {
      title: "The Hustle",
      icon: Flame,
      text: (
        <>
          <span className="text-[#FC8019] font-bold">Hot Sun, Rain, Storm, Nothing stopped us.</span>
          <br />
          We went, door to door, office to office, pg to pg, hospital to hospital.
          <br /><br />
          Focusing on quality, hygiene, and timely delivery, we built trust and served food that was great.
          <br /><br />
          One to five. Five to ten. Ten to hundreds. Word of mouth & endless hustle kept winning more <span className="text-[#FC8019] font-bold">customers and their trust.</span>
        </>
      )
    },
    {
      title: "How Is It Going",
      icon: TrendingUp,
      text: (
        <>
          <span className="text-[#FC8019] font-bold">Today, घर का स्वाद is 2.5+ years old</span> becoming Darbhanga's most trusted choices for truly homemade tiffin service.
          <br /><br />
          We are proudly serving hospitals, training centers, offices, corporate meetings, PGs, rest houses, and also cater bulk orders for events and parties as well.
          <br /><br />
          We are serving food, filling stomachs, <span className="text-[#FC8019] font-bold">wining hearts, and earning trust.</span>
        </>
      )
    },
    {
      title: "Hello, Noida!",
      icon: MapPin,
      text: (
        <>
          <span className="text-[#FC8019] font-bold">We are coming to Noida!</span>
          <br /><br />
          Not just an expansion—a promise. A promise to every student missing homemade food, every professional craving their husband's / wife's wholesome meal, and every family looking for a truly homemade food.
          <br /><br />
          It's Noida's turn to experience the taste that made Darbhanga fall in love with us. We won Darbhanga. <span className="text-[#FC8019] font-bold">We are coming to win Noida too.</span>
        </>
      )
    }
  ], []);

  const cardsJSX = useMemo(() => {
    return storyCards.map((card) => (
      <div className="flex-1 basis-[calc(25%-1.5rem)] max-w-[420px] min-w-[280px] flex" key={card.title}>
        <StoryCard title={card.title} icon={card.icon} text={card.text} />
      </div>
    ));
  }, [storyCards]);

  return (
    <section
      id="our-story"
      className="py-24 sm:py-32 md:py-48 relative overflow-hidden bg-cover bg-center bg-no-repeat"
    >
      {/* Background Image configured identically to other sections */}
      <img
        src="/assets/img17.jpeg"
        alt="Our Story Background"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          left: "0px",
          top: "0px",
          right: "0px",
          bottom: "0px",
          objectFit: "cover",
          objectPosition: "center center",
          zIndex: 0,
        }}
        className="absolute inset-0 w-full h-full"
        loading="lazy"
        decoding="async"
      />

      {/* Overlays matching the signature liquid glass/dark theme */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 blur-xl opacity-30 animate-pulse" />
      </div>

      <div className="container px-4 relative z-10">
        <div className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16 transition-all duration-700 ease-out opacity-100 translate-y-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#FC8019] drop-shadow-md pb-3">
            Our Story
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto px-4">
            How we started <span className="text-[#FC8019] font-semibold">vs</span> how is it going
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-stretch gap-6 sm:gap-8 max-w-[1800px] mx-auto">
          {cardsJSX}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-10 sm:h-12 md:h-16 bg-gradient-to-t from-background to-transparent z-5" />
    </section>
  );
}
