import { Sun, Moon, Sparkles, Check } from "lucide-react";
import { useRef, useState, useCallback, useMemo, memo } from "react";
import "./menu.css";

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

const menuItems = [
  {
    day: "Monday to Saturday",
    thaliType: "Premium Meal",
    lunch: { 
      name: [
        "Dal of the Day",
        "Steamed Rice",
        "4 Chapaties",
        "Fresh Salad",
        "Seasonal Curry",
        "Seasonal Veggie"
      ], 
      img: "/assets/img22.svg" 
    },
    dinner: { 
      name: [
        "Dal of the Day",
        "Steamed Rice",
        "4 Chapaties",
        "Fresh Salad",
        "Seasonal Curry",
        "Seasonal Veggie"
      ], 
      img: "/assets/img22.svg" 
    },
  },
  {
    day: "Monday to Saturday",
    thaliType: "Budget Meal",
    lunch: { 
      name: [
        "Dal of the Day + Steamed Rice or 4 Chapaties",
        "Seasonal Curry or Seasonal Veggie",
        "Fresh Salad"
      ], 
      img: "/assets/img21.svg" 
    },
    dinner: { 
      name: [
        "Dal of the Day + Steamed Rice or 4 Chapaties",
        "Seasonal Curry or Seasonal Veggie",
        "Fresh Salad"
      ], 
      img: "/assets/img21.svg" 
    },
  },
  {
    day: "Monday Night Blues",
    thaliType: "Special",
    lunch: { 
      name: [
        "Rajma Chawal",
        "Chole Chawal",
        "Kadhi Chawal",
        "Paneer Curry",
        "Veg Biryani",
        "Dessert"
      ], 
      img: "/assets/img20.svg" 
    },
    dinner: { 
      name: [
        "Rajma Chawal",
        "Chole Chawal",
        "Kadhi Chawal",
        "Paneer Curry",
        "Veg Biryani",
        "Dessert"
      ], 
      img: "/assets/img20.svg" 
    },
  },
  {
    day: "Non Serviceable Days",
    isOff: true,
  },
  {
    day: "Food Standards",
    isStandards: true,
    standards: [
      "Clean & hygienic kitchen & utensils",
      "Fresh ingredients, washed before cooking",
      "RO water for cooking",
      "Minimal & fresh cooking oil used",
      "No reheating or use of leftover food",
      "Healthy meals for good health",
      "Leak-proof, food-grade containers used",
      "We eat what we serve our customers",
    ]
  },
  {
    day: "Note",
    note: [
      "Proudly serving Darbhanga, now open to Noida.",
      "Menu may change based on availability of food items.",
      "Advance payment is required for all subscription plans.",
      "Special requests can be accommodated with prior notice. (Chargable)",
      "Food cancellation after it goes out for delivery is fully chargable.",
      "Extra chapaties ₹8/Piece"
    ]
  },
];

const MealSection = memo(function MealSection({ type, meal, icon: Icon, bgColor, iconColor }) {
  const imgScaleClass = "scale-[1.20]";
  const imgHoverClass = "hover:scale-[1.30]";

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className={`${bgColor} backdrop-blur-sm p-2 rounded-lg border border-white/10`}>
          <Icon className={`w-5 h-5 ${iconColor} transition-transform duration-200 group-hover:scale-110`} />
        </div>
        <span className="font-semibold text-white text-base">{type}</span>
      </div>
      <div className="relative w-full h-36 rounded-xl overflow-hidden border border-white/20 shadow-lg">
        <img
          src={meal.img}
          alt={type}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          className={`object-cover object-center ${imgScaleClass} ${imgHoverClass} transition-transform duration-200`}
          loading="lazy"
          decoding="async"
        />
      </div>
      {Array.isArray(meal.name) ? (
        <ul className="list-disc pl-5 text-white text-[15px] space-y-1.5 text-left mt-2 w-full">
          {meal.name.map((item, idx) => (
            <li key={idx} className="leading-tight">{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-white text-[17px] leading-relaxed px-1 whitespace-pre-line">
          {meal.name}
        </p>
      )}
    </div>
  );
});

const MenuCard = memo(function MenuCard({ item }) {
  const {
    cardRef,
    handleMouseMove,
    handleMouseLeave,
    handleFocus,
    handleBlur,
  } = useCardTilt();

  if (item.day === "Monday to Saturday" || item.day === "Special" || item.day === "Monday Night Blues") {
    return (
      <div className="group transition-all duration-700 ease-out opacity-100 translate-y-0 min-w-[350px] h-full flex flex-col">
        <div
          ref={cardRef}
          tabIndex={0}
          className="group relative h-full rounded-3xl bg-black/35 backdrop-blur-md border border-white/20 hover:border-primary/40 shadow-[0_4px_30px_rgba(252,128,25,0.06),inset_0_1px_1px_rgba(252,128,25,0.08)] hover:shadow-2xl transition-all duration-200 overflow-hidden focus:outline-none menu-card"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-label="Monday to Saturday menu card"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/8 via-transparent to-transparent pointer-events-none" />
          <div 
            className="absolute inset-0 rounded-3xl bg-primary/15 border border-primary/25 scale-[0.85] opacity-0 group-hover:scale-100 group-hover:opacity-100 pointer-events-none" 
            style={{
              transitionProperty: 'all',
              transitionDuration: '500ms',
              transitionTimingFunction: 'cubic-bezier(0.34, 1.15, 0.64, 1)'
            }}
          />
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-200" />
          
          <div className="relative z-10 pt-3 px-5 sm:px-6 pb-6 space-y-3 flex flex-col h-full justify-between items-center">
            <div className="text-center pb-2 border-b border-white/20 w-full">
              <h3 className="font-bold text-2xl tracking-wide text-[#FC8019] drop-shadow-md">
                {item.day}
              </h3>
            </div>
            
            <div className="flex items-center gap-2 mt-1">
              <div className="bg-orange-500/20 backdrop-blur-sm p-1.5 rounded-lg border border-white/10">
                <Sparkles className="w-5 h-5 text-orange-400" />
              </div>
              <span className="font-semibold text-white text-base">{item.thaliType || "Premium Meal"}</span>
            </div>

            <div className="relative w-full h-[205px] sm:h-[220px] flex-shrink-0 rounded-xl overflow-hidden border border-white/20 shadow-lg mt-2 mx-auto bg-[#FFEBD2]">
              <img
                src={item.lunch.img}
                alt={item.thaliType || "Premium Meal"}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                className={`object-cover object-center ${item.day === "Special" || item.day === "Monday Night Blues" ? "scale-[1.08] translate-y-[3px] hover:scale-[1.18]" : "scale-[1.11] translate-y-[3px] hover:scale-[1.21]"} transition-transform duration-200`}
                loading="lazy"
                decoding="async"
              />
            </div>

            <ul className={`list-disc pl-5 text-white font-medium ${item.thaliType === "Budget Meal" ? "flex flex-col space-y-2 text-[14px] sm:text-[15.5px]" : "grid grid-cols-2 gap-x-2.5 gap-y-2 text-[14px] sm:text-[15.5px]"} text-left mt-3 mb-1 w-full`}>
              {item.lunch.name.map((food, idx) => (
                <li key={idx} className="leading-snug whitespace-normal break-words">{food}</li>
              ))}
            </ul>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-3xl" />
        </div>
      </div>
    );
  }  if (item.isStandards || item.day === "Food Standards") {
    return (
      <div className="group transition-all duration-700 ease-out opacity-100 translate-y-0 min-w-[350px] w-[350px] h-[375px] flex flex-col">
        <div
          ref={cardRef}
          tabIndex={0}
          className="group relative h-[375px] rounded-3xl bg-black/35 backdrop-blur-md border border-white/20 hover:border-primary/40 shadow-[0_4px_30px_rgba(252,128,25,0.06),inset_0_1px_1px_rgba(252,128,25,0.08)] hover:shadow-2xl transition-all duration-200 overflow-hidden focus:outline-none menu-card"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-label="Food Standards card"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/8 via-transparent to-transparent pointer-events-none" />
          <div 
            className="absolute inset-0 rounded-3xl bg-primary/15 border border-primary/25 scale-[0.85] opacity-0 group-hover:scale-100 group-hover:opacity-100 pointer-events-none" 
            style={{
              transitionProperty: 'all',
              transitionDuration: '500ms',
              transitionTimingFunction: 'cubic-bezier(0.34, 1.15, 0.64, 1)'
            }}
          />

          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-200" />
          <div className="relative z-10 pt-1.5 px-5 pb-5 flex flex-col justify-between h-[375px]">
            <div>
              <div className="text-center pb-1 border-b border-white/20 w-full">
                <h3 className="font-bold text-2xl tracking-wide text-[#FC8019] drop-shadow-md">
                  Food Standards
                </h3>
              </div>
              <ul className="space-y-2.5 text-left w-full pt-3.5">
                {item.standards.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <div className="mt-0.5 w-4.5 h-4.5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className={`text-[14.5px] ${point === "We eat what we serve our customers" || point.startsWith("We eat") ? "text-primary font-bold" : "text-white/90 font-medium"}`}>
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-3xl" />
        </div>
      </div>
    );
  }

  if (item.day === "Note" && Array.isArray(item.note)) {
    return (
      <div className="group transition-all duration-700 ease-out opacity-100 translate-y-0 min-w-[350px] w-[350px] h-[375px] flex flex-col">
        <div
          ref={cardRef}
          tabIndex={0}
          className="group relative h-[375px] rounded-3xl bg-black/35 backdrop-blur-md border border-white/20 hover:border-primary/40 shadow-[0_4px_30px_rgba(252,128,25,0.06),inset_0_1px_1px_rgba(252,128,25,0.08)] hover:shadow-2xl transition-all duration-200 overflow-hidden focus:outline-none menu-card"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-label="Note card"
        >
          {/* Inner subtle highlight */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/8 via-transparent to-transparent pointer-events-none" />
          
          {/* Liquid glass hover bubble */}
          <div 
            className="absolute inset-0 rounded-3xl bg-primary/15 border border-primary/25 scale-[0.85] opacity-0 group-hover:scale-100 group-hover:opacity-100 pointer-events-none" 
            style={{
              transitionProperty: 'all',
              transitionDuration: '500ms',
              transitionTimingFunction: 'cubic-bezier(0.34, 1.15, 0.64, 1)'
            }}
          />

          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-200" />
          <div className="relative z-10 pt-0.5 px-6 pb-6 flex flex-col justify-between h-[375px]">
            <div>
              <div className="text-center pb-1 border-b border-white/20 w-full">
                <h3 className="font-bold text-2xl tracking-wide text-[#FC8019] drop-shadow-md">
                  Note
                </h3>
              </div>
              <ul className="text-white/90 text-[13.5px] sm:text-[14px] space-y-1.5 text-left w-full pt-3.5">
                {item.note.map((point, idx) => (
                  <li key={idx} className={`flex items-start gap-1.5 ${point.includes("Extra chapaties") ? "text-primary font-bold" : ""}`}>
                    <span className="text-primary mt-1.5 shrink-0 text-xs">✦</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-3xl" />
        </div>
      </div>
    );
  }



  if (item.isOff) {
    return (
      <div className="group transition-all duration-700 ease-out opacity-100 translate-y-0 min-w-[350px] w-[350px] h-[375px] flex flex-col">
        <div
          ref={cardRef}
          tabIndex={0}
          className="group relative h-[375px] rounded-3xl bg-black/35 backdrop-blur-md border border-white/20 hover:border-primary/40 shadow-[0_4px_30px_rgba(252,128,25,0.06),inset_0_1px_1px_rgba(252,128,25,0.08)] hover:shadow-2xl transition-all duration-200 overflow-hidden focus:outline-none menu-card"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-label="Sunday off card"
        >
          {/* Inner subtle highlight */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/8 via-transparent to-transparent pointer-events-none" />
          
          {/* Liquid glass hover bubble */}
          <div 
            className="absolute inset-0 rounded-3xl bg-primary/15 border border-primary/25 scale-[0.85] opacity-0 group-hover:scale-100 group-hover:opacity-100 pointer-events-none" 
            style={{
              transitionProperty: 'all',
              transitionDuration: '500ms',
              transitionTimingFunction: 'cubic-bezier(0.34, 1.15, 0.64, 1)'
            }}
          />

          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-200" />
          
          <div className="relative z-10 pt-1.5 px-5 pb-5 flex flex-col h-[375px]">
            <div className="text-center pb-1 border-b border-white/20 w-full flex-shrink-0">
              <h3 className="font-bold text-2xl tracking-wide text-[#FC8019] drop-shadow-md">
                {item.day}
              </h3>
            </div>

            <ul className="space-y-2 text-white/90 text-[14.5px] sm:text-[15.5px] text-left w-full pt-3">
              {[
                "Cheat day for you, Rest day for us",
                "Sundays off",
                "Major Festive Days are off",
                "Monthly subscription pricing already excludes Sundays & major festive holidays.",
                "No deliveries are made on this day"
              ].map((point, idx) => (
                <li key={idx} className="flex items-start gap-1.5 leading-snug">
                  <span className="text-primary mt-1 shrink-0 text-xs">✦</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="group transition-all duration-700 ease-out opacity-100 translate-y-0 min-w-[350px] w-[350px] h-[450px] flex flex-col">
      <div
        ref={cardRef}
        tabIndex={0}
        className="group relative h-[450px] rounded-3xl bg-black/35 backdrop-blur-md border border-white/20 hover:border-primary/40 shadow-[0_4px_30px_rgba(252,128,25,0.06),inset_0_1px_1px_rgba(252,128,25,0.08)] hover:shadow-2xl transition-all duration-200 overflow-hidden focus:outline-none menu-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-label={item.day + ' menu card'}
      >
        {/* Inner subtle highlight */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/8 via-transparent to-transparent pointer-events-none" />
        
        {/* Liquid glass hover bubble */}
        <div 
          className="absolute inset-0 rounded-3xl bg-primary/15 border border-primary/25 scale-[0.85] opacity-0 group-hover:scale-100 group-hover:opacity-100 pointer-events-none" 
          style={{
            transitionProperty: 'all',
            transitionDuration: '500ms',
            transitionTimingFunction: 'cubic-bezier(0.34, 1.15, 0.64, 1)'
          }}
        />

        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-200" />

        <div className="relative z-10 pt-2 px-6 pb-6 flex flex-col justify-between h-[450px]">
          <div className="text-center pb-1 border-b border-white/20">
            <h3 className="font-bold text-2xl tracking-wide text-[#FC8019] drop-shadow-md">
              {item.day}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-1">
            {item.lunch && (
              <MealSection
                type="Lunch"
                meal={item.lunch}
                icon={Sun}
                bgColor="bg-orange-500/20"
                iconColor="text-orange-400"
              />
            )}

            {item.dinner && (
              <MealSection
                type="Dinner"
                meal={item.dinner}
                icon={Moon}
                bgColor="bg-orange-500/20"
                iconColor="text-orange-400"
              />
            )}
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-3xl" />
      </div>
    </div>
  );
});

export function Menu() {
  const menuCardsJSX = useMemo(() => {
    return menuItems.map((item, idx) => (
      <div className="w-[350px] max-w-full h-auto flex flex-col" key={idx}>
        <MenuCard item={item} />
      </div>
    ));
  }, []);

  return (
    <section id="menu" className="py-28 sm:py-36 md:py-56 relative overflow-hidden bg-cover bg-center bg-no-repeat">
      <img
        src="/assets/img.png"
        alt="Menu Background"
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

      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 blur-xl opacity-30 animate-pulse" />
      </div>

      <div className="container px-4 relative z-10">
        <div className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16 transition-all duration-700 ease-out opacity-100 translate-y-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#FC8019] drop-shadow-md pb-3">
            Our Veg Menu
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-none md:whitespace-nowrap mx-auto px-4">
            Truly homemade meals freshly prepared with love, care and less oil
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-stretch gap-6 sm:gap-8 max-w-[1600px] mx-auto">
          {menuCardsJSX}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-10 sm:h-12 md:h-16 bg-gradient-to-t from-background to-transparent z-5" />
    </section>
  );
}
