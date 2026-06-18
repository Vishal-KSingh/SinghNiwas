export default function ContactPage() {
  return (
    // Background color yahan update kiya hai: #f6f8f2 (Soft Warm Tone)
    <div className="min-h-screen bg-[#F2F4F8] text-slate-900 font-sans">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-[#FFF1F2] via-[#FCE7F3] to-[#F5F3FF] text-slate-900 py-30 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <span className="bg-pink-100 text-pink-700 border border-pink-200 px-4 py-2 rounded-full text-sm font-semibold">
  📞 CONTACT SINGHNIWAS
</span>

          <h1 className="text-5xl font-black mt-4 text-slate-900">
  Get In Touch With Us
</h1>

          <p className="mt-2 text-slate-600 max-w-2xl mx-auto">
  Have questions about rooms, rent, electricity billing or tenant
  services? Our team is always ready to help.
</p>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="max-w-6xl mx-auto px-6 -mt-25">
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-3xl p-5 shadow-xl border border-slate-100">
            <div className="text-4xl">📍</div>
            <h3 className="font-bold text-xl mt-4 text-slate-900">Address</h3>
            <p className="text-gray-600 mt-3">
              SinghNiwas
              <br />
              Isuapur,Market,Near Delhi General Store
              <br />
              Bihar, India
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
            <div className="text-4xl">📞</div>
            <h3 className="font-bold text-xl mt-4 text-slate-900">Call Us</h3>
            <p className="text-gray-600 mt-3">
              +91 7091678886
            </p>

            <a
              href="tel:+917091678886"
              className="inline-block mt-4 bg-green-600 text-white px-5 py-2 rounded-xl"
            >
              Call Now
            </a>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
            <div className="text-4xl">✉️</div>
            <h3 className="font-bold text-xl mt-4 text-slate-900">Email Support</h3>
            <p className="text-gray-600 mt-3">
              support@singhniwas.com
            </p>

            <a
              href="mailto:support@singhniwas.com"
              className="inline-block mt-4 bg-blue-600 text-white px-5 py-2 rounded-xl"
            >
              Send Email
            </a>
          </div>

        </div>
      </section>

      {/* BUSINESS HOURS */}
      <section className="max-w-6xl mx-auto px-8 py-10">
        <div className="bg-white rounded-[40px] shadow-xl p-10 border border-slate-100">
          
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Business Hours
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Office Timing Card */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
              <h3 className="font-bold text-xl text-slate-900 mb-6 flex items-center gap-2">
                🕒 Office Timing
              </h3>

              <div className="space-y-4 text-slate-700">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
  <span>Monday - Friday</span>
  <span className="font-semibold">
    9:00 AM - 8:00 PM
  </span>
</div>

<div className="flex flex-col sm:flex-row sm:justify-between gap-1">
  <span>Saturday</span>
  <span className="font-semibold">
    10:00 AM - 6:00 PM
  </span>
</div>

<div className="flex flex-col sm:flex-row sm:justify-between gap-1">
  <span>Sunday</span>
  <span className="font-semibold text-red-500">
    Emergency Support
  </span>
</div>
              </div>
            </div>

            {/* Support Services Card */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
              <h3 className="font-bold text-xl text-slate-900 mb-6 flex items-center gap-2">
                ⚡ Support Services
              </h3>

              <div className="space-y-4 text-slate-700">
                <div className="flex items-center gap-3">
                  <span>✅</span>
                  <span>Rent Related Queries</span>
                </div>

                <div className="flex items-center gap-3">
                  <span>✅</span>
                  <span>Electricity Billing Support</span>
                </div>

                <div className="flex items-center gap-3">
                  <span>✅</span>
                  <span>Tenant Assistance</span>
                </div>

                <div className="flex items-center gap-3">
                  <span>✅</span>
                  <span>Maintenance Requests</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WHATSAPP SECTION */}
      <section className="max-w-6xl mx-auto px-6 pb-7">
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-[40px] text-white p-7 text-center shadow-xl">

          <h2 className="text-3xl font-bold">
            Need Instant Help?
          </h2>

          <p className="mt-4 text-green-100">
            Chat directly with SinghNiwas support team on WhatsApp.
          </p>

          <a
            href="https://wa.me/917091678886"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 bg-white text-green-700 font-bold px-8 py-3 rounded-xl"
          >
            💬 Chat on WhatsApp
          </a>

        </div>
      </section>

      {/* LOCATION MAP */}
<section className="max-w-6xl mx-auto px-6 pb-4">

  <div className="bg-white rounded-[40px] shadow-xl border border-slate-100 overflow-hidden">

    {/* Premium Header */}
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 p-3 text-center">

      <div className="absolute top-0 left-0 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-52 h-52 bg-blue-400/10 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-yellow-400 text-sm font-semibold">
          📍 Our Location
        </span>

        <h2 className="text-4xl font-black text-white mt-3">
          Visit SinghNiwas
        </h2>

        <p className="text-slate-300 mt-2">
          Singh Niwas, Ishauvpur, Bihar 841411
        </p>
      </div>

    </div>

    {/* Map */}
    <div className="h-[420px] w-full overflow-hidden">
      <iframe
        src="https://maps.google.com/maps?q=26.0315932,84.7983331&z=17&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>

    {/* Button */}
    <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 text-center">
      <a
        href="https://www.google.com/maps/place/Singh+Niwas/@26.0315932,84.7983331,17z"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C19A2B] text-slate-900 font-bold px-10 py-2 rounded-2xl"
      >
        📍 Open in Google Maps
      </a>
    </div>

  </div>

</section>

      {/* FAQ SECTION */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-bold text-center mb-6 text-slate-900">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">

          <div className="bg-white p-6 rounded-2xl shadow border border-slate-100">
            <h3 className="font-bold text-slate-900">
              How can I pay my rent?
            </h3>
            <p className="text-slate-700 mt-2">
              Rent can be paid online through the SinghNiwas tenant portal.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow border border-slate-100">
            <h3 className="font-bold">
              How is electricity calculated?
            </h3>
            <p className="text-gray-600 mt-2">
              Electricity is calculated based on actual meter unit consumption.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow border border-slate-100">
            <h3 className="font-bold">
              Can I view my payment history?
            </h3>
            <p className="text-gray-600 mt-2">
              Yes, all rent and electricity payment records are available in the tenant dashboard.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}