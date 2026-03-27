import { useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import { Helmet } from 'react-helmet-async';

// IMPORT DATA & KOMPONEN EKSTERNAL (PERFORMANCE BOOST)
import { STAFF_DATA } from '../data/staffData';
import StaffCard from '../components/StaffCard';

export default function Staff() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <Helmet>
        <title>Staff & Pimpinan Laboratorium Pajak - Universitas Gunadarma</title>
        <meta name="description" content="Profil staff, tenaga pendidik, dan pimpinan Laboratorium Akuntansi Lanjut B (TaxLaboratory) Universitas Gunadarma yang memiliki kepakaran di bidang perpajakan." />
        <link rel="canonical" href="https://www.taxlaboratory.my.id/staff" />
      </Helmet>
    {/* Menggunakan tag <main> untuk menaikkan skor SEO Semantic */}
    <main className="min-h-screen font-sans text-slate-800 pb-32 relative bg-[#fafafa]">
      
      {/* === BACKGROUND KLASIK === */}
      {/* Background polos dengan pattern halus yang tidak mengganggu */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* =========================================
          1. HEADER STAFF (FORMAL & ELEGANT)
      ========================================= */}
      <section className="pt-36 md:pt-48 pb-16 relative px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6">
          Pimpinan <span className="text-purple-900">Laboratorium Pajak</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
          Dibimbing oleh tenaga pendidik profesional dengan kepakaran di bidang perpajakan untuk memastikan kualitas kurikulum dan pelayanan <strong>Laboratorium Akuntansi Lanjut B</strong> selalu berstandar tinggi.
        </p>
        {/* Garis Pembatas Klasik */}
        <div className="flex justify-center items-center gap-2 mt-10">
          <div className="w-12 h-[2px] bg-slate-300"></div>
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <div className="w-12 h-[2px] bg-slate-300"></div>
        </div>
      </section>

      {/* =========================================
          2. CARDS SECTION (3 KOLOM DI DESKTOP)
      ========================================= */}
      {/* max-w-7xl agar 3 kartu bisa sejajar rapi di PC, dan turun jadi 1 kolom di HP */}
      <section aria-label="Daftar Staff dan Dosen Laboratorium" className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          
          {STAFF_DATA.map((staff, index) => (
            <StaffCard key={`staff-${index}`} staff={staff} />
          ))}

        </div>
      </section>
      
    </main>
    </PageTransition>
  );
}