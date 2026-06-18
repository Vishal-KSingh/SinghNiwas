'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/20 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="SinghNiwas Logo"
            className="h-20 w-auto"
          />
        </Link>

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
        <div className="flex items-center gap-4">

  {/* Tenant Login */}
  <Link
    href="/tenants"
    className="
    group
    relative
    overflow-hidden
    px-5 py-2
    rounded-2xl
    bg-gradient-to-r
    from-emerald-500
    to-teal-500
    text-white
    font-bold
    text-lg
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
    px-5 py-2
    rounded-2xl
    bg-gradient-to-r
    from-amber-400
    to-yellow-500
    text-slate-900
    font-bold
    text-lg
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

      </div>
    </nav>
  );
}