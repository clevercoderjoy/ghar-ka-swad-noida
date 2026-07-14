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
        <div className="flex flex-col items-center mb-4 mt-2 space-y-1">
          <div className="mb-3 flex items-center justify-center" style={{ width: 140, height: 140 }}>
            <img src="/assets/logo.svg" alt="घर का स्वाद Logo" width={180} height={180} className="rounded-full" decoding="async" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#FC8019] drop-shadow-md mb-2">घर का स्वाद</h1>
          <div className="relative flex justify-center mt-6 mb-6">
            <span className="text-lg font-semibold text-primary px-5 py-2 mb-2 mt-4 rounded-xl glass shadow-md border border-white/20 backdrop-blur-xl bg-white/10">
              घर का खाना खाये, घर के स्वाद में खायें
            </span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 my-3 w-full max-w-2xl">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-primary">1000+</span>
            <span className="text-sm font-medium text-foreground">Happy Customers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-primary">Daily</span>
            <span className="text-sm font-medium text-foreground">Fresh Meals</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-primary">2+</span>
            <span className="text-sm font-medium text-foreground">Years of Service</span>
          </div>
        </div>

        <div className="w-full max-w-2xl my-3 mt-6 bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
          <h2 className="text-2xl font-bold mb-6 text-primary text-center">Our Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="flex flex-col items-center justify-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <UtensilsCrossed className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
              </span>
              <span className="text-sm font-semibold text-center text-foreground">Tiffin Service</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Users className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
              </span>
              <span className="text-sm font-semibold text-center text-foreground">Catering Services</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Clock className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
              </span>
              <span className="text-sm font-semibold text-center text-foreground">3-Time Tiffin</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
              </span>
              <span className="text-sm font-semibold text-center text-foreground">Made with Love</span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-2xl my-3 bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
          <h2 className="text-xl font-bold mb-6 text-primary text-center">Our Veg Menu</h2>
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

        <div className="w-full max-w-2xl my-3 bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
          <h2 className="text-xl font-bold mb-4 text-primary text-center">Note</h2>
          <ul className="list-disc pl-5 space-y-1 text-base text-white">
            {notes.map((note, idx) => (
              <li key={idx}>{note}</li>
            ))}
          </ul>
        </div>

        <div className="w-full max-w-2xl my-3 bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
          <h2 className="text-xl font-bold mb-6 text-primary text-center">Meal Plan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col items-center justify-center gap-2 bg-white/5 rounded-lg p-4">
              <span className="text-lg font-bold text-foreground">1 Day Meal</span>
              <span className="text-base font-semibold text-primary">₹75/- Meal</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 bg-white/5 rounded-lg p-4">
              <span className="text-lg font-bold text-foreground">Monthly Veg</span>
              <span className="text-base font-semibold text-primary">₹3300/-</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 bg-white/5 rounded-lg p-4">
              <span className="text-lg font-bold text-foreground">Event Catering</span>
              <span className="text-base font-semibold text-primary">Custom Quote</span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-2xl my-3 bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-3 text-primary text-center">Get in Touch</h2>

          <img src="/assets/logo.svg" alt="घर का स्वाद Logo" width={100} height={100} className="rounded-full mb-4" loading="lazy" decoding="async" />

          <div className="flex flex-col items-center justify-center mb-5 w-full">
            <div className="flex flex-col items-center justify-center w-full max-w-md px-4">
              <span className="text-2xl font-extrabold text-[#FC8019] drop-shadow-md">घर का स्वाद</span>
              <span className="text-md font-bold text-primary">+91-9266844741</span>
            </div>
          </div>

          <div className="flex items-start justify-center w-full mb-6 px-4 gap-12 flex-wrap">
            <div className="flex flex-col items-center">
              <img src="/assets/whatsapp.svg" alt="WhatsApp QR" width={120} height={120} className="rounded-lg border border-white/20 bg-white" loading="lazy" decoding="async" />
              <span className="mt-2 text-xs text-white">WhatsApp</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/assets/google.svg" alt="Google QR" width={120} height={120} className="rounded-lg border border-white/20 bg-white" loading="lazy" decoding="async" />
              <span className="mt-2 text-xs text-white">Google</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/assets/gharkaswad.svg" alt="Website QR" width={120} height={120} className="rounded-lg border border-white/20 bg-white" loading="lazy" decoding="async" />
              <span className="mt-2 text-xs text-white">Website</span>
            </div>
          </div>

          <div className="text-base text-white text-center mb-3">
            © 2025 <span className="text-primary">घर का स्वाद</span> | All rights reserved.
          </div>
        </div>
      </div>
    </main>
  );
}
export default BroucherPage;
