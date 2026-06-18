// app/about/page.tsx
'use client';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8F6F2] text-gray-800 antialiased">
      
      {/* 1. HERO HEADER SECTION */}

     <div className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-blue-50 pt-30 pb-7 px-6 text-center">

  <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>

  <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>

  <div className="relative z-10"></div>
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100/60 text-blue-700 text-xs font-bold tracking-wider uppercase rounded-full">
            ✨ About Our Property
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">SinghNiwas</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Redefining modern accommodation with absolute integrity, smart digital utility tracking, and premium tenant care.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-0 pb-24 space-y-7">

        {/* 2. OUR STORY & DIGITAL PORTAL VISION */}
       <div className="
bg-white/80
backdrop-blur-xl
p-8 md:p-12
rounded-[36px]
border border-white
shadow-[0_20px_60px_rgba(0,0,0,0.08)]
hover:shadow-[0_25px_80px_rgba(59,130,246,0.15)]
transition-all
duration-500
grid grid-cols-1 md:grid-cols-12 gap-8 items-center
">
          <div className="md:col-span-7 space-y-5">
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Our Story</h2>
              <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
            </div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              SinghNiwas ek premium residential accommodation hai jahan hum tenants ko sirf ek kamra nahi, balki ek safe, clean aur modern living environment dete hain.
            </p>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed font-medium bg-blue-50/50 border-l-4 border-blue-500 p-3.5 rounded-r-xl">
              📢 <span className="text-blue-900">Transparency Initiative:</span> Tenants aur owner ke beech billing aur rent ko lekar transparency (safai) rahe, isiliye humne yeh smart digital management system shuru kiya.
            </p>
          </div>
          <div className="
md:col-span-5
bg-gradient-to-br
from-[#0F172A]
via-[#172554]
to-[#312E81]
h-64
rounded-[32px]
flex
flex-col
items-center
justify-center
text-white
shadow-2xl
relative
overflow-hidden
group
p-6
text-center
hover:scale-105
transition-all
duration-500
">
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
            <span className="text-4xl mb-3 transform group-hover:scale-110 transition duration-300">🏢</span>
            <h4 className="font-bold text-lg">SinghNiwas Campus</h4>
            <p className="text-xs text-gray-400 mt-1">Smart Rental & Tenant Management</p>
          </div>
        </div>

        {/* 3. MISSION & VISION SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[#1E3A8A] via-[#312E81] to-[#581C87] text-white p-8 md:p-10 rounded-[32px] shadow-md space-y-4 relative overflow-hidden">
            <span className="text-3xl">🎯</span>
            <h3 className="text-xl font-bold">Our Mission</h3>
            <p className="text-blue-100 text-sm md:text-base leading-relaxed">
              Kirayedaaron ko bina kisi pareshani (hassle-free) ke rehne ki suvidha dena, jahan electricity bill unit wise transparent ho aur payment online ek click me ho jaye.
            </p>
          </div>

          <div className="bg-white/90
backdrop-blur-lg
border border-slate-100
shadow-xl
hover:-translate-y-2
hover:shadow-2xl
transition-all
duration-500 p-8 md:p-10 rounded-[32px] shadow-sm border border-gray-100 space-y-4">
            <span className="text-3xl">🚀</span>
            <h3 className="text-xl font-bold text-gray-900">Our Vision</h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Traditional room renting ke puraane tariko (manual diary logs) ko poori tarah se hata kar pure landlord-tenant interaction management ko 100% digital, reliable aur modern banana.
            </p>
          </div>
        </div>

        {/* 4. KEY AMENITIES & FACILITIES GRID */}
        <div className="space-y-5">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">Key Amenities & Facilities</h3>
            <p className="text-xs md:text-sm text-gray-400">Everything you need for a comfortable stay</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '⚡', title: 'Smart Electricity', desc: 'Har room ka apna alag meter jiska live calculation digital portal par dikhta hai.' },
              { icon: '🔒', title: '24/7 Security', desc: 'Continuous CCTV surveillance aur safe peaceful environment family aur students dono ke liye.' },
              { icon: '💧', title: 'Water & Power', desc: 'Continuous 24-hour supply control ensuring essential core daily utilities.' },
              { icon: '🧹', title: 'Maintained Premises', desc: 'Regular cleanliness routines aur quick proactive room maintenance support assistance.' }
            ].map((facility, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:-translate-y-2
hover:shadow-2xl
transition-all
duration-500 transition flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-2xl shadow-sm border border-blue-100">
                    {facility.icon}
                  </div>
                  <h4 className="font-bold text-gray-800 mt-4 text-sm md:text-base">{facility.title}</h4>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">{facility.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. WHY CHOOSE SINGHNIWAS BENEFITS */}
        <div className="bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#1E293B] text-white rounded-[28px] md:rounded-[40px] p-11 md:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-2xl space-y-2 mb-8">
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">Why Choose SinghNiwas?</h3>
            <p className="text-xs md:text-sm text-slate-400">Strategic software benefits built specifically for modern living</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { num: '01', title: 'No Hidden Charges', desc: 'Jo dikhega screen par, wahi pay karna hai. No surprising handling or hidden utility fees.' },
              { num: '02', title: 'Instant Receipts', desc: 'UPI, Card, ya Net Banking se pay karte hi payment automatic system ledger me instantly record ho jati hai.' },
              { num: '03', title: 'History Tracking', desc: 'Purane kis mahine ka kitna rent aur unit electricity diya, sab kuch tenant dashboard par hamesha save rehta hai.' }
            ].map((benefit, i) => (
              <div key={i}className="
space-y-3
border
border-slate-700
rounded-3xl
p-6
bg-white/5
backdrop-blur-sm
hover:bg-white/10
transition-all
duration-500
">
                <span className="text-xs font-mono font-bold text-blue-400 tracking-wider block">{benefit.num} // VALUE</span>
                <h4 className="font-bold text-lg text-slate-100">{benefit.title}</h4>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. MESSAGE FROM THE OWNER SIGNATURE */}
        <div className="bg-white/90
backdrop-blur-xl
border border-white
shadow-2xl p-8 md:p-4 rounded-[32px] text-center max-w-3xl mx-auto space-y-4 shadow-xl">
          <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-lg mx-auto border border-blue-100">
            💬
          </div>
          <p className="text-base md:text-lg italic font-medium text-slate-700 leading-relaxed max-w-2xl mx-auto">
            "Humara maksad hai ki SinghNiwas me rehne wale har ek member ko ghar jaisa safe aur suvidhajanak mahool mile. Kisi bhi query ke liye humara support hamesha available hai."
          </p>
          <div className="pt-2">
            <h4 className="font-black text-gray-900 tracking-wide text-sm uppercase">Vishal Kumar Singh</h4>
            <p className="text-xs text-blue-600 font-bold mt-0.5 tracking-wider uppercase">Property Founder & Owner</p>
          </div>
        </div>

      </div>
    </div>
  );
}