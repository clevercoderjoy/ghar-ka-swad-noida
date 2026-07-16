import { useRef, useState, useEffect, useCallback, useMemo, memo } from "react";
import { Star, Quote } from "lucide-react";
import "./reviews.css";

const reviews = [
  {
    name: "Joy (Happily Married)",
    rating: 5,
    text: "My permanent lunch box service since 2.5+ years. Khana itna accha rhta tha ki maine owner se shadi hi kr li, ab roz tasty khana khata hu madam ji k personal haatho se! Hygiene: 5/5 | Taste: 5/5 | Quantity: 5/5 | Quality: 5/5"
  },
  {
    name: "Kumar Saurav",
    rating: 5,
    text: "I've been subscribing to Ghar Ka Swad's tiffin service and it's been a game-changer! The food is consistently delicious, fresh, and made with love. Every meal feels like a taste of home. The variety, packaging, and prompt service are all top-notch. Highly recommend!"
  },
  {
    name: "RAVI KUMAR SHARMA",
    rating: 5,
    text: "Ghar Ka Swad truly lives up to its name! The food has that perfect homemade taste — fresh, flavorful, and comforting. I loved their dal tadka and chapati combo. Portion sizes are generous and prices are very reasonable. Highly recommended!"
  },
  {
    name: "Adarsh Tripathi",
    rating: 5,
    text: "Had a very good tiffin in the evening. I am 300 kms away from my hometown and was hoping for good food like we have at home — it was just like that! Thank you so much for the homely food and services."
  },
  {
    name: "Nurul Hoda",
    rating: 5,
    text: "The food is good. As the name suggests, so is the work — we get genuine home-like food here. My experience was very good. Food: 5/5 | Service: 5/5 | Atmosphere: 5/5"
  },
  {
    name: "Everything Abhishek",
    rating: 5,
    text: "Best food services in Darbhanga! The taste, service and overall experience is outstanding. A must try for anyone craving authentic home-cooked meals. Food: 5/5 | Service: 5/5 | Atmosphere: 5/5"
  },
  {
    name: "IBRAR AHMAD",
    rating: 5,
    text: "The food was absolutely delicious and the service was really great. Every aspect of the experience left a great impression. Highly satisfied! Food: 5/5 | Service: 5/5 | Atmosphere: 5/5"
  },
  {
    name: "Google Reviews",
    rating: 5,
    isSpecial: true,
    text: "Read more reviews on google",
    link: "https://share.google/K8St9IBkUToXJlgaD"
  }
];

const ReviewCard = memo(function ReviewCard({ review, className }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  if (review.isSpecial) {
    return (
      <div className={`w-full flex flex-col group transition-all duration-300 ${className || ""}`}>
        <a
          href={review.link}
          target="_blank"
          rel="noopener noreferrer"
          className="reviews-card relative w-full h-[170px] flex flex-col justify-between p-4 rounded-2xl bg-[#FC8019]/10 backdrop-blur-xl border border-[#FC8019]/35 shadow-[0_4px_30px_rgba(252,128,25,0.1),inset_0_1px_1px_rgba(252,128,25,0.15)] hover:shadow-2xl focus:outline-none overflow-hidden text-center cursor-pointer select-none"
        >
          {/* Inner subtle highlight */}
          {isMounted && (
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#FC8019]/15 via-transparent to-transparent pointer-events-none" />
          )}

          {/* Liquid glass hover bubble */}
          {isMounted && (
            <div 
              className="absolute inset-0 rounded-2xl bg-[#FC8019]/25 backdrop-blur-md border border-[#FC8019]/45 scale-[0.85] opacity-0 group-hover:scale-100 group-hover:opacity-100 pointer-events-none" 
              style={{
                transitionProperty: 'all',
                transitionDuration: '500ms',
                transitionTimingFunction: 'cubic-bezier(0.34, 1.15, 0.64, 1)'
              }}
            />
          )}

          {/* Outer glow blur backdrop */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#FC8019]/25 via-accent/25 to-[#FC8019]/25 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-200 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center justify-between h-full w-full">
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs sm:text-sm font-extrabold text-[#FC8019] tracking-wider uppercase">Google Ratings</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 text-[#FC8019] fill-[#FC8019]" />
                ))}
              </div>
            </div>

            <p className="text-xs sm:text-[13px] text-white font-semibold leading-snug px-2">
              {review.text}
            </p>

            <div className="w-full bg-[#FC8019] hover:bg-[#e07016] text-white text-[11px] font-bold py-1.5 px-3 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-1">
              <span>Go to Google Reviews</span>
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M14 3h7v7h-2V6.4l-9.3 9.3-1.4-1.4L17.6 5H14V3zm-2 16H5V7h7V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h-2v7z"/>
              </svg>
            </div>
          </div>
        </a>
      </div>
    );
  }

  return (
    <div className={`w-full flex flex-col group transition-all duration-300 ${className || ""}`}>
      <div className="reviews-card relative w-full h-[170px] flex flex-col justify-between p-4 rounded-2xl bg-primary/5 backdrop-blur-xl border border-primary/15 shadow-[0_4px_30px_rgba(252,128,25,0.06),inset_0_1px_1px_rgba(252,128,25,0.08)] hover:shadow-2xl focus:outline-none overflow-hidden">
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
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-200 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col flex-grow justify-between gap-2 h-full">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <Quote className="w-4 h-4 text-primary/40" />
              <div className="flex gap-0.5">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 text-primary fill-primary" />
                ))}
              </div>
            </div>
            <p className="text-xs sm:text-[13px] lg:text-sm text-white/95 leading-relaxed text-left italic line-clamp-3">
              "{review.text}"
            </p>
          </div>
          
          <div className="border-t border-white/10 pt-2 mt-auto">
            <h4 className="text-sm sm:text-base font-bold text-white text-left">{review.name}</h4>
          </div>
        </div>
        
        {/* Bottom hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl pointer-events-none" />
      </div>
    </div>
  );
});

export function Reviews() {
  // Split 8 reviews into 2 columns of 4 reviews each
  const col1 = useMemo(() => reviews.slice(0, 4), []);
  const col2 = useMemo(() => reviews.slice(4, 8), []);

  return (
    <section
      id="reviews"
      className="pt-16 sm:pt-20 md:pt-24 pb-48 sm:pb-60 md:pb-72 relative overflow-hidden bg-cover bg-center bg-no-repeat min-h-[95vh] flex flex-col justify-start"
    >
      <img
        src="/assets/img19.jpg"
        alt="Reviews Background"
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
        className="absolute inset-0 w-full h-full blur-[1px] opacity-60"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 z-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background pointer-events-none z-0" />

      <div className="w-full max-w-[1536px] px-4 md:px-8 relative z-10 mx-auto">
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#FC8019] drop-shadow-md pb-3">
            The trust we've earned
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-none md:whitespace-nowrap mx-auto px-4">
            Look what we earned over the years serving people who love us.
          </p>
        </div>

        {/* Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch max-w-[1536px] mx-auto w-full">
          {/* Left Side: Stats (Takes 3 cols on large screens, height decreased slightly) */}
          <div className="flex flex-col justify-between text-left lg:col-span-3 bg-white/5 backdrop-blur-md border border-white/10 p-5 sm:p-6 rounded-3xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] lg:sticky lg:top-24 min-h-[500px] sm:min-h-[540px] w-full">
            <div className="flex flex-col gap-2 border-b border-white/10 pb-3 sm:pb-4">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#FC8019] tracking-tight whitespace-nowrap">17,500 +</span>
              <span className="text-sm sm:text-base lg:text-lg text-white/95 font-medium leading-snug whitespace-nowrap">Delicious Meals Delivered</span>
            </div>
            <div className="flex flex-col gap-2 border-b border-white/10 pb-3 sm:pb-4">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#FC8019] tracking-tight whitespace-nowrap">1,000 +</span>
              <span className="text-sm sm:text-base lg:text-lg text-white/95 font-medium leading-snug whitespace-nowrap">Delighted Customers</span>
            </div>
            <div className="flex flex-col gap-2 border-b border-white/10 pb-3 sm:pb-4">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#FC8019] tracking-tight whitespace-nowrap">100 +</span>
              <span className="text-sm sm:text-base lg:text-lg text-white/95 font-medium leading-snug whitespace-nowrap">Currently Active Subscribers</span>
            </div>
            <div className="flex flex-col gap-2 border-b border-white/10 pb-3 sm:pb-4">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#FC8019] tracking-tight whitespace-nowrap">2.5 +</span>
              <span className="text-sm sm:text-base lg:text-lg text-white/95 font-medium leading-snug whitespace-nowrap">Years of Trust Service</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#FC8019] tracking-tight whitespace-nowrap">4.8 ★★★★</span>
              <span className="text-sm sm:text-base lg:text-lg text-white/95 font-medium leading-snug whitespace-nowrap">Google Customer Ratings</span>
            </div>
          </div>

          {/* Right Side: Reviews 2 Columns Grid (Takes 9 cols on large screens, 4 items each) */}
          <div className="lg:col-span-9 grid grid-cols-2 gap-4">
            {/* Column 1 */}
            <div className="flex flex-col gap-4">
              {col1.map((review, index) => (
                <ReviewCard key={`col1-${index}`} review={review} />
              ))}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4">
              {col2.map((review, index) => (
                <ReviewCard key={`col2-${index}`} review={review} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
