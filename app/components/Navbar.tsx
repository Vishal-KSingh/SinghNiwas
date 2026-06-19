'use client';

import Link from 'next/link';
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/20 bg-transparent">
     <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-start md:items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
  src="/logo.png"
  alt="SinghNiwas Logo"
  width={400}
  height={120}
  priority
  className="h-12 md:h-20 w-auto object-contain"
/>
        </Link>
        <button
  className="
md:hidden
absolute top-4 right-4 z-50
p-2
rounded-xl
bg-black/50
backdrop-blur-md
text-white
shadow-lg
border border-white/20
"
  onClick={() => setMenuOpen(!menuOpen)}
>
  {menuOpen ? <X size={28} /> : <Menu size={28} />}
</button>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12 font-semibold">

  <Link
    href="/"
    className="relative group text-slate-800 hover:text-[#D4AF37] text-xl font-bold transition-all duration-300"
  >
    Home
    <span className="absolute left-0 -bottom-2 w-0 h-[3px] bg-[#D4AF37] rounded-full transition-all duration-300 group-hover:w-full"></span>
  </Link>

  <Link
    href="/about"
    className="relative group text-slate-800 hover:text-[#D4AF37] text-xl font-bold transition-all duration-300"
  >
    About Us
    <span className="absolute left-0 -bottom-2 w-0 h-[3px] bg-[#D4AF37] rounded-full transition-all duration-300 group-hover:w-full"></span>
  </Link>

  <Link
    href="/contact"
    className="relative group text-slate-800 hover:text-[#D4AF37] text-xl font-bold transition-all duration-300"
  >
    Contact Us
    <span className="absolute left-0 -bottom-2 w-0 h-[3px] bg-[#D4AF37] rounded-full transition-all duration-300 group-hover:w-full"></span>
  </Link>

</div>

        {/* Buttons */}
       <div className="hidden md:flex items-center gap-4">
  {/* Tenant Login */}
  <Link
    href="/tenants"
    className="
    group
    relative
    overflow-hidden
   px-3 md:px-5 py-2

    rounded-2xl
    bg-gradient-to-r
    from-emerald-500
    to-teal-500
    text-white
    font-bold
    text-sm md:text-lg
    shadow-xl
    hover:shadow-emerald-500/40
    hover:scale-105
    transition-all
    duration-300"
  >
    <span className="relative z-10 flex items-center gap-2">
      👤 Tenant Login
    </span>

    <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition duration-700"></span>
  </Link>

  {/* Admin Portal */}
  <Link
    href="/admin"
    className="
    group
    relative
    overflow-hidden
    px-3 md:px-5 py-2
    rounded-2xl
    bg-gradient-to-r
    from-amber-400
    to-yellow-500
    text-slate-900
    font-bold
    text-sm md:text-lg
    shadow-xl
    hover:shadow-yellow-500/40
    hover:scale-105
    transition-all
    duration-300"
  >
    <span className="relative z-10 flex items-center gap-2">
      ⚙️ Admin Portal
    </span>

    <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition duration-700"></span>
  </Link>

</div>
     {menuOpen && (
  <div className="absolute top-full left-0 w-full md:hidden bg-black/90 backdrop-blur-xl p-6 flex flex-col gap-5 text-white shadow-2xl">

    <Link href="/" 
    onClick={() => setMenuOpen(false)}
    className="text-lg font-semibold">
  Home
</Link>

<Link href="/about"
onClick={() => setMenuOpen(false)}
className="text-lg font-semibold">
  About Us
</Link>

<Link href="/contact" 
onClick={() => setMenuOpen(false)}
className="text-lg font-semibold">
  Contact Us
</Link>

<Link
  href="/tenants"
  onClick={() => setMenuOpen(false)}
  className="bg-emerald-500 text-white px-4 py-3 rounded-xl text-center font-bold"
>
  👤 Tenant Login
</Link>

<Link
  href="/admin"
  onClick={() => setMenuOpen(false)}
  className="bg-yellow-500 text-black px-4 py-3 rounded-xl text-center font-bold"
>
  ⚙️ Admin Portal
</Link>

  </div>
)}
      </div>
    </nav>
  );
}