'use client';
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  { name: "Rahul Singh", review: "Dashboard bohot fast hai!" },
  { name: "Anita Devi", review: "Best family environment." },
  { name: "Vikram Kumar", review: "Electricity tracking is great." },
  { name: "Priya Sharma", review: "Automated logs are amazing." },
  { name: "Amit Raj", review: "No hidden costs, very transparent." },
  { name: "Suresh P.", review: "Professional hub, loved it." }
];

export default function Home() {
  const heroImages = [
  "/images/hero1.jpg",
  "/images/hero2.jpg",
  "/images/hero3.jpg",
  "/images/hero4.jpg",
];

const [currentImage, setCurrentImage] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  }, 7000);
  return () => clearInterval(interval);
}, []);
const nextSlide = () => {
  setCurrentImage((prev) => (prev + 1) % heroImages.length);
};

const prevSlide = () => {
  setCurrentImage(
    (prev) => (prev - 1 + heroImages.length) % heroImages.length
  );
};

  return (

    <main className="min-h-screen bg-[#F4F1F6] text-gray-900 font-sans antialiased">

{/* ================= HERO SECTION ================= */}

<section
  className="relative h-screen w-full overflow-hidden"
>

  {/* Background */}

  <div className="absolute inset-0">

  {heroImages.map((image, index) => (
    <motion.div
      key={index}
      className="absolute inset-0"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      animate={{
        opacity: currentImage === index ? 1 : 0,
        scale: currentImage === index ? 1.08 : 1.03,
      }}
      transition={{
        opacity: {
          duration: 2,
          ease: "easeInOut",
        },
        scale: {
          duration: 7,
          ease: "linear",
        },
      }}
    />
  ))}

</div>

  {/* Dark Overlay */}

  <div className="absolute inset-0 bg-black/50"></div>

  {/* Hero Content */}

  <div className="relative z-20 flex items-center justify-center h-full -mt-15 md:mt-0">

    <div className="text-center px-6 pt-28 md:pt-8">

      <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest bg-white/10 backdrop-blur-md text-white px-5 py-3 rounded-full border border-white/20">

        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>

         <span className="sm:hidden">
    SinghNiwas
  </span>

  <span className="hidden sm:inline">
    SinghNiwas Smart Rental Network
  </span>

      </div>

      <motion.div
  initial={{ opacity: 0, y: 80 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
>

  <h1 className="mt-6 text-white text-2xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-tight">

    Discover Your

    <br />

    <span className="text-yellow-300">

      Perfect Stay

    </span>

  </h1>

</motion.div>

      <p className="mt-5 text-base md:text-xl text-gray-200 max-w-2xl mx-auto px-4">

        Smart Rental Management System

        <br />

        Manage tenants, electricity and payments
        through one modern dashboard.

      </p>

      <div className="mt-10 flex justify-center gap-5 flex-wrap">

  <button
  onClick={() => {
    document.getElementById("gallery")?.scrollIntoView({
      behavior: "smooth",
    });
  }}
  className="px-8 py-4 rounded-full bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition-all duration-300 hover:scale-105 shadow-xl"
>
  Explore Rooms
</button>

  <Link
    href="/contact"
    className="px-8 py-4 rounded-full border border-white text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
  >
    Contact Us
  </Link>

</div>

      <motion.div
  className="mt-6 flex flex-col items-center text-white"
  animate={{ y: [0, 10, 0] }}
  transition={{
    repeat: Infinity,
    duration: 2,
  }}
>
  <span className="text-sm tracking-[4px] uppercase mb-8">
    Explore More
  </span>

  <span className="text-4xl">
    ↓
  </span>
</motion.div>

    </div>

  </div>
  
<button
  onClick={prevSlide}
  className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 z-30 ..."
>
  <ChevronLeft className="text-white w-8 h-8" />
</button>

<button
  onClick={nextSlide}
  className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 z-30 ..."
>
  <ChevronRight className="text-white w-8 h-8" />
</button>

  {/* Slider Indicators */}

<div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">

  {heroImages.map((_, index) => (

    <button
      key={index}
      onClick={() => setCurrentImage(index)}
      className={`transition-all duration-500 rounded-full
      ${
        currentImage === index
          ? "w-10 h-3 bg-yellow-400"
          : "w-3 h-3 bg-white/60 hover:bg-white"
      }`}
    />

  ))}

</div>
{/* Scroll Down Animation */}

<div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">

  <motion.div
    animate={{ y: [0, 12, 0] }}
    transition={{
      repeat: Infinity,
      duration: 1.8,
    }}
    className="w-7 h-12 border-2 border-white/70 rounded-full flex justify-center"
  >
    <div className="w-1.5 h-3 bg-white rounded-full mt-2"></div>
  </motion.div>

</div>

</section>

<div className="max-w-7xl w-full mx-auto space-y-7 px-4 py-7">

        {/* ================= METRIC DATA ================= */}
        <div className="relative overflow-hidden bg-white/90 border border-white backdrop-blur-md rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center shadow-2xl">
        <div className="absolute inset-0 rounded-[24px] bg-gradient-to-r from-purple-100/20 via-transparent to-yellow-100/20 pointer-events-none"></div>
          {[
            { value: '50+', label: 'Premium Units Registered' },
            { value: '100%', label: 'Absolute Ledger Clarity' },
            { value: '2 Sec', label: 'Instant Settlement Loop' },
            { value: '24/7', label: 'Direct Helpdesk Sync' },
            
          ].map((stat, i) => (
            <div
  key={i}
  className="relative z-10 space-y-1 hover:scale-105 transition-all duration-300 cursor-pointer group"
>

  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-1 bg-yellow-500 rounded-full group-hover:w-12 transition-all duration-500"></div>
              <motion.h3
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="text-3xl font-black text-purple-950"
>
  {stat.value}
</motion.h3>
              <p className="text-xs text-gray-500 font-medium tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>

{/* ================= WHY CHOOSE US ================= */}

<section className="py-2">

  <div className="text-center mb-7">

    <p className="text-yellow-500 uppercase tracking-[4px] font-semibold">
      Why Choose Us
    </p>

    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3">
      Premium Living Experience
    </h2>

  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

    <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 text-center">

      <div className="text-5xl mb-5">🏠</div>

      <h3 className="text-2xl font-bold">
        Premium Rooms
      </h3>

      <p className="text-gray-500 mt-3">
        Spacious and comfortable rooms designed for modern living.
      </p>

    </div>

    <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 text-center">

      <div className="text-5xl mb-5">🔒</div>

      <h3 className="text-2xl font-bold">
        Safe & Secure
      </h3>

      <p className="text-gray-500 mt-3">
        Secure environment with complete peace of mind.
      </p>

    </div>

    <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 text-center">

      <div className="text-5xl mb-5">⚡</div>

      <h3 className="text-2xl font-bold">
        Smart Billing
      </h3>

      <p className="text-gray-500 mt-3">
        Transparent electricity and payment management system.
      </p>

    </div>

  </div>

</section>

        {/* ================= GALLERY SECTION ================= */}

<section id="gallery" className="pt-8 pb-8 -mt-6">

  <div className="text-center mb-12">

    <p className="text-yellow-500 font-semibold tracking-[4px] uppercase">
      SinghNiwas
    </p>

    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3">
      Experience Premium Living
      <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full mt-4"></div>
    </h2>

    <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
      Comfortable rooms, modern facilities and a secure environment
      designed for families and professionals.
    </p>

  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    <div className="relative overflow-hidden rounded-3xl shadow-xl group cursor-pointer">

  <img
    src="/images/gallery1.jpg" 
    alt="Gallery"
    className="w-full h-[320px] object-cover group-hover:scale-110 transition-all duration-700 ease-out"
  />

  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition duration-700"></div>

</div>

    <div className="relative overflow-hidden rounded-3xl shadow-xl group cursor-pointer">

  <img
    src="/images/gallery2.jpg"
    alt="Gallery"
    className="w-full h-[320px] object-cover group-hover:scale-110 transition-all duration-700 ease-out"
  />

  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition duration-700"></div>

</div>

    <div className="relative overflow-hidden rounded-3xl shadow-xl group cursor-pointer">

  <img
    src="/images/gallery3.jpg"
    alt="Gallery"
    className="w-full h-[320px] object-cover group-hover:scale-110 transition-all duration-700 ease-out"
  />

  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition duration-700"></div>

</div>

    <div className="relative overflow-hidden rounded-3xl shadow-xl group cursor-pointer">

  <img
    src="/images/gallery4.jpg"
    alt="Gallery"
    className="w-full h-[320px] object-cover group-hover:scale-110 transition-all duration-700 ease-out"
  />

  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition duration-700"></div>

</div>

  </div>

</section>

        {/* ================= CORE INFRASTRUCTURE ================= */}
        <div className="space-y-5 -mt-9">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-purple-950 tracking-tight">System Core Infrastructure</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '💎', title: 'Property Management', desc: 'Complete structural unit control, room logging, status updates, and vacancy tracking metrics.' },
              { icon: '🧬', title: 'Tenant Tracking', desc: 'Keep direct real-time information logs of active, incoming, and historical occupant archive records.' },
              { icon: '🔮', title: 'Electricity Billing', desc: 'Dynamic monthly per-unit metric calculation based on individual sub-meters displayed instantly.' },
              { icon: '📡', title: 'Online Payments', desc: 'Secure instantaneous checkout via integrated digital scanning parameters without manual receipts.' }
            ].map((item, index) => (
              <div
  key={index}
  className="group relative overflow-hidden p-6 bg-white rounded-[32px] border border-white/50 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
>
  {/* Top Gradient Line */}
  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500"></div>

  {/* Background Glow */}
  <div className="absolute -right-10 -top-10 w-28 h-28 bg-purple-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

  <div className="relative z-10">
    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center text-2xl shadow-lg mb-5">
      {item.icon}
    </div>

    <h4 className="font-bold text-lg text-purple-950">
      {item.title}
    </h4>

    <p className="text-sm text-gray-500 mt-3 leading-6">
      {item.desc}
    </p>
  </div>
</div>
            ))}
          </div>
        </div>

        {/* ================= ONBOARDING REGISTRY (WITH TESTIMONIALS) ================= */}
        <section className="pt-1 pb-2 overflow-hidden">
          <div className="max-w-7xl w-full mx-auto space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-black text-purple-950">Onboarding Operations Registry</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="hidden lg:block lg:col-span-3 h-[400px] overflow-hidden relative">
                <motion.div animate={{ y: [0, -600] }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="space-y-4">
                  {[...testimonials, ...testimonials].map((t, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-xs italic">"{t.review}" <span className="font-bold text-purple-600 block mt-4">— {t.name}</span></div>
                  ))}
                </motion.div>
              </div>
              <div className="col-span-1 lg:col-span-6 space-y-4">
                {[
                  { q: 'How do I log in?', a: 'Go to Tenant Login. Enter Room ID and mobile number.' },
                  { q: 'Auto-expiry for receipts?', a: 'No, every receipt stays in your history forever.' },
                  { q: 'Bill generation?', a: 'Owner logs updated metrics on the 1st of every month.' },
                ].map((faq, idx) => (
                  <div
  key={idx}
  className="group bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-500"
>
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
      ?
    </div>

    <h4 className="font-bold text-purple-950 group-hover:text-purple-700 transition">
      {faq.q}
    </h4>
  </div>

  <p className="text-sm text-gray-500 mt-4 leading-6">
    {faq.a}
  </p>
</div>
                ))}
              </div>
              <div className="hidden lg:block lg:col-span-3 h-[400px] overflow-hidden relative">
                <motion.div animate={{ y: [-600, 0] }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="space-y-4">
                  {[...testimonials, ...testimonials].map((t, i) => (
                    <div key={i} className="bg-white/95 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-purple-100 text-sm italic hover:shadow-2xl transition-all duration-500">"{t.review}" <span className="font-bold text-indigo-600 block mt-2">— {t.name}</span></div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

      </div>
    <footer className="bg-gradient-to-b from-[#081226] to-[#0F172A] text-white mt-0.1 border-t border-white/10">

  <div className="max-w-7xl mx-auto px-4 py-2">

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">

      {/* Left */}

     <div className="flex flex-col items-center text-center -mt-2">
  <img
    src="/logo.png"
    alt="SinghNiwas Logo"
    className="h-14 md:h-20 w-auto object-contain -mb-7"
  />

  <h2 className="text-xl md:text-2xl font-bold leading-tight">
    SinghNiwas
  </h2>

  <p className="text-gray-400 text-sm">
    Smart Rental Management System
  </p>
</div>

      {/* Center */}

      <div>

        <h3 className="text-xl font-bold mb-1 text-center">
  Quick Links
</h3>

        <div className="flex flex-col gap-1 text-gray-300 items-center">
          <Link href="/" className="hover:text-yellow-400 transition">
            Home
          </Link>

          <Link href="/about" className="hover:text-yellow-400 transition">
            About Us
          </Link>

          <Link href="/contact" className="hover:text-yellow-400 transition">
            Contact Us
          </Link>

        </div>

      </div>

      {/* Right */}

      <div>

        <h3 className="text-xl font-bold mb-1 text-center">
  Contact
</h3>

        <div className="space-y-1 text-gray-300 text-center">

          <p>📍 Isuapur, Bihar</p>

          <p>📞 +91 7091678886</p>

          <p>✉️ support@singhniwas.com</p>

        </div>

      </div>

    </div>

    <div className="border-t border-white/20 mt-3 pt-1 text-center text-sm text-gray-500">

      © 2026 SinghNiwas. All Rights Reserved.

    </div>

  </div>

</footer>

<Link
  href="/contact"
  className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl shadow-2xl hover:scale-110 transition-all duration-300"
>
  💬
</Link>

    </main>
  );
}