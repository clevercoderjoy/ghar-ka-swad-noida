import { Sun, Moon } from "lucide-react";
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
    day: "Monday",
    lunch: { name: "Dal, Rice, Seasonal Veggie, Salad, Achar", img: "/assets/img10.png" },
    dinner: { name: "5 Chapatis, Sewai, Seasonal Sabji", img: "/assets/img11.png" },
  },
  {
    day: "Tuesday",
    lunch: { name: "Dal, Rice, Aloo Bhujia, Chutney, Papad/Tarua, Achar, Salad", img: "/assets/img12.png" },
    dinner: { name: "5 Chapatis, Dal Fry", img: "/assets/img13.png" },
  },
  {
    day: "Wednesday",
    lunch: { name: "Dal, Rice, Achar, Seasonal Veggie, Salad", img: "/assets/img10.png" },
    dinner: { name: "5 Chapatis, Seasonal Veggie, Bhujia/Chana Fry", img: "/assets/img13.png" },
  },
  {
    day: "Thursday",
    lunch: { name: "Dal, Rice, Achar, Seasonal Veggie, Salad", img: "/assets/img10.png" },
    dinner: { name: "Poori, Veggie, Kheer", img: "/assets/img14.png" },
  },
  {
    day: "Friday",
    lunch: { name: "Dal Fry/Rajma, Jeera Rice, Bhujia, Salad, Achar", img: "/assets/img15.png" },
    dinner: { name: "5 Chapatis, Seasonal Veggie", img: "/assets/img13.png" },
  },
  {
    day: "Saturday",
    lunch: { name: "Veg-Khichdi, Achar, Chokha, Papad", img: "/assets/img16.png" },
    dinner: { name: "5 Chapatis, Seasonal Veggie", img: "/assets/img13.png" },
  },
  {
    day: "Note",
    note: [
      "Menu may change based on availability of food items.",
      "Special requests can be accommodated with prior notice. (Chargable)",
      "We serve non-veg on special request but we don't cook it in our kitchen.",
      "Festivals are off days.",
      "We eat what we serve to our customers.",
      "Images are for illustration; actual food may vary."
    ]
  },
];

const MealSection = memo(function MealSection({ type, meal, icon: Icon, bgColor, iconColor }) {
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
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          className="object-cover hover:scale-110 transition-transform duration-500"
          loading="lazy"
          decoding="async"
        />
      </div>
      <p className="text-white text-base leading-relaxed px-1">
        {meal.name}
      </p>
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

  if (item.day === "Note" && Array.isArray(item.note)) {
    return (
      <div className="group transition-all duration-700 ease-out opacity-100 translate-y-0 min-w-[350px] h-full flex flex-col">
        <div
          ref={cardRef}
          tabIndex={0}
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
          className="group relative h-full rounded-3xl bg-primary/5 backdrop-blur-xl border border-primary/15 shadow-[0_4px_30px_rgba(252,128,25,0.06),inset_0_1px_1px_rgba(252,128,25,0.08)] hover:shadow-2xl transition-shadow duration-100 overflow-hidden focus:outline-none menu-card"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-label="Note card"
        >
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
          <div className="relative z-10 p-6 space-y-5 flex flex-col items-center justify-center" style={{ transform: "translateZ(40px)" }}>
            <div className="text-center pb-4 border-b border-white/20 w-full">
              <h3 className="font-bold text-2xl tracking-wide text-[#FC8019] drop-shadow-md">
                Note
              </h3>
            </div>
            <ul className="list-disc text-white/90 text-base pl-6 space-y-2 text-left w-full">
              {item.note.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="group transition-all duration-700 ease-out opacity-100 translate-y-0 min-w-[350px] h-full flex flex-col">
      <div
        ref={cardRef}
        tabIndex={0}
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        className="group relative h-full rounded-3xl bg-primary/5 backdrop-blur-xl border border-primary/15 shadow-[0_4px_30px_rgba(252,128,25,0.06),inset_0_1px_1px_rgba(252,128,25,0.08)] hover:shadow-2xl transition-shadow duration-100 overflow-hidden focus:outline-none menu-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-label={item.day + ' menu card'}
      >
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

        <div className="relative z-10 p-6 space-y-5" style={{ transform: "translateZ(40px)" }}>
          <div className="text-center pb-4 border-b border-white/20">
            <h3 className="font-bold text-2xl tracking-wide text-[#FC8019] drop-shadow-md">
              {item.day}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
    return menuItems.map((item) => (
      <div className="flex-1 basis-[calc(33.333%-1.5rem)] max-w-[400px] min-w-[320px] h-[425px] flex" key={item.day}>
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
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 blur-xl opacity-30 animate-pulse" />
      </div>

      <div className="container px-4 relative z-10">
        <div className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16 transition-all duration-700 ease-out opacity-100 translate-y-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#FC8019] drop-shadow-md pb-3">
            Our Veg Menu
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto px-4">
            Fresh, homemade meals prepared daily with love and care
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
