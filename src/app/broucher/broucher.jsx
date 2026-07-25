import { UtensilsCrossed, Users, Clock, Heart } from "lucide-react";
import "./broucher.css";

const vegMenu = [
  { day: "Monday", lunch: "दाल, चावल, सीज़नल सब्ज़ी, सलाद, अचार", dinner: "5 रोटी, सेवई, सीज़नल सब्ज़ी" },
  { day: "Tuesday", lunch: "दाल, चावल, आलू भुजिया, अचार, चटनी, पापड़/तरुआ, सलाद", dinner: "5 रोटी, दाल फ्राई" },
  { day: "Wednesday", lunch: "दाल, चावल, अचार, सीज़नल सब्ज़ी, सलाद", dinner: "5 रोटी, सीज़नल सब्ज़ी, भुजिया/चना फ्राई" },
  { day: "Thursday", lunch: "दाल, चावल, अचार, सीज़नल सब्ज़ी, सलाद", dinner: "5 रोटी, सीज़नल सब्ज़ी" },
  { day: "Friday", lunch: "दाल फ्राई/राजमा, जीरा राइस, भुजिया, सलाद, अचार", dinner: "5 रोटी, सीज़नल सब्ज़ी" },
  { day: "Saturday", lunch: "वेज खिचड़ी, अचार, चोखा, पापड़", dinner: "5 रोटी, सीज़नल सब्ज़ी" },
  { day: "Sunday", lunch: "फ्राइड राइस, दाल, सीज़नल सब्ज़ी, अचार, सलाद/रायता", dinner: "8 पूरी, पनीर सब्ज़ी" },
];

const notes = [
  "एडवांस पेमेंट |",
  "खाने-पीने के सामान की उपलब्धता के अनुसार मेनू में बदलाव हो सकता है ।",
  "स्पेशल रिक्वेस्ट के लिए पहले से बताना पड़ेगा । (Chargable).",
  "स्पेशल रिक्वेस्ट पे नॉन-वेज भी सर्व करते हैं, पर वो हम अपने किचन में नहीं बनाते हैं ।",
  "त्योहारों के दिन हमारी सेवाएं बंद रहती हैं ।",
  "जो ग्राहक को खिलाते हैं वही भोजन हम भी खाते हैं ।",
];

export function BroucherPage() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start py-4 px-1 bg-background text-foreground overflow-x-hidden">
      <img
        src="/assets/img.png"
        alt="Hero Background"
        style={{ objectFit: "cover", objectPosition: "center center", zIndex: 0, width: "100%", height: "100%" }}
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        fetchpriority="high"
        decoding="async"
      />
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 blur-xl opacity-30" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">

        {/* Logo and Brand */}
        <div className="flex flex-col items-center mb-4 mt-2 gap-3">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-none">
            <span className="text-white drop-shadow-lg">Ghar ka Swad</span>
          </h2>
          <div className="flex items-center justify-center" style={{ width: 140, height: 140 }}>
            <img src="/logo.svg.svg" alt="घर का स्वाद Logo" width={140} height={140} className="rounded-full" decoding="async" />
          </div>
          <p className="text-base font-bold italic text-white drop-shadow-md leading-none">
            by
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-none uppercase -mt-2">
            <span className="text-[#FC8019] drop-shadow-md">Sanskriti Raj</span>
          </h1>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 my-3 w-full px-4">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-primary">1000+</span>
            <span className="text-sm font-medium text-foreground">Happy Stomachs</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-primary">Daily</span>
            <span className="text-sm font-medium text-foreground">Fresh Meals</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-primary">2.5+</span>
            <span className="text-sm font-medium text-foreground">Years of Service</span>
          </div>
        </div>

        {/* Bento Grid — 4 columns */}
        <div className="grid grid-cols-4 gap-3 w-full my-3 px-4">

          {/* ROW 1: 4 equal columns */}

          {/* Why घर का स्वाद */}
          <div className="col-span-1 bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20 flex flex-col">
            <h2 className="text-lg font-bold mb-3 text-white text-center">Why <span className="text-primary">Ghar ka Swad</span>?</h2>
            <ul className="space-y-2 flex-1">
              {[
                "Freshly prepared daily with premium ingredients",
                "Home-cooked taste that reminds you of your घर का खाना",
                "Hygienic preparation in a clean home kitchen",
                "Premium meals affordable packages",
                "Customizable meals for preferred meal combination",
                "On-time delivery, every single day at your door step",
                "Authentic local and traditional recipes",
                "No preservatives or artificial additives",
              ].map((point, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-base text-white">
                  <span className="text-primary mt-0.5 shrink-0">✦</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Meal Plan */}
          <div className="col-span-1 bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20 flex flex-col">
            <h2 className="text-lg font-bold mb-4 text-primary text-center">Meal Plan</h2>
            <div className="flex flex-col gap-3 flex-1 justify-center">
              <div className="flex flex-col items-center justify-center gap-1 bg-white/5 rounded-lg p-3">
                <span className="text-sm font-bold text-foreground">1 Day Meal</span>
                <span className="text-sm font-semibold text-primary">₹75/- Meal</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 bg-white/5 rounded-lg p-3">
                <span className="text-sm font-bold text-foreground">Monthly Veg</span>
                <span className="text-sm font-semibold text-primary">₹3300/-</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 bg-white/5 rounded-lg p-3">
                <span className="text-sm font-bold text-foreground">Event Catering</span>
                <span className="text-sm font-semibold text-primary">Custom Quote</span>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="col-span-1 bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <h2 className="text-lg font-bold mb-3 text-primary text-center">Note</h2>
            <ul className="list-disc pl-4 space-y-1 text-xs text-white">
              {notes.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          </div>

          {/* Get in Touch */}
          <div className="col-span-1 bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20 flex flex-col items-center">
            <h2 className="text-lg font-bold mb-3 text-primary text-center">Get in Touch</h2>
            <img src="/logo.svg.svg" alt="घर का स्वाद Logo" width={60} height={60} className="rounded-full mb-2" loading="lazy" decoding="async" />
            <span className="text-sm font-extrabold text-[#FC8019] drop-shadow-md">घर का स्वाद</span>
            <span className="text-xs font-bold text-primary mb-3">+91-9266844741</span>
            <div className="flex items-center justify-center w-full gap-2 flex-wrap">
              <div className="flex flex-col items-center">
                <img src="/assets/whatsapp.svg" alt="WhatsApp QR" width={65} height={65} className="rounded-lg border border-white/20 bg-white" loading="lazy" decoding="async" />
                <span className="mt-1 text-xs text-white">WhatsApp</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="/assets/google.svg" alt="Google QR" width={65} height={65} className="rounded-lg border border-white/20 bg-white" loading="lazy" decoding="async" />
                <span className="mt-1 text-xs text-white">Google</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="/assets/gharkaswad.svg" alt="Website QR" width={65} height={65} className="rounded-lg border border-white/20 bg-white" loading="lazy" decoding="async" />
                <span className="mt-1 text-xs text-white">Website</span>
              </div>
            </div>
          </div>

          {/* ROW 2: Veg Menu full width */}
          <div className="col-span-4 bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <h2 className="text-xl font-bold mb-4 text-primary text-center">Our Veg Menu</h2>
            <table className="w-full border border-white/20 rounded-lg overflow-hidden text-sm bg-white/5">
              <thead className="bg-primary/10">
                <tr>
                  <th className="p-2 border-b border-white/20 text-foreground">Day</th>
                  <th className="p-2 border-b border-white/20 text-foreground">Lunch</th>
                  <th className="p-2 border-b border-white/20 text-foreground">Dinner</th>
                </tr>
              </thead>
              <tbody>
                {vegMenu.map((item) => (
                  <tr key={item.day} className="even:bg-white/5">
                    <td className="p-2 border-b text-base border-white/20 font-semibold text-primary">{item.day}</td>
                    <td className="p-2 border-b text-base border-white/20 text-white">{item.lunch}</td>
                    <td className="p-2 border-b text-base border-white/20 text-white">{item.dinner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        <div className="text-base text-white text-center mb-3 mt-2">
          © 2025 <span className="text-primary">घर का स्वाद</span> | All rights reserved.
        </div>
      </div>
    </main>
  );
}
export default BroucherPage;
