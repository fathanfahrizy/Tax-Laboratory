import { useEffect } from 'react';
import PageTransition from '../components/PageTransition';

// IMPORT DATA & KOMPONEN EKSTERNAL (PERFORMANCE BOOST)
import { STAFF_DATA } from '../data/staffData';
import StaffCard from '../components/StaffCard';

export default function Staff() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
    {/* Menggunakan tag <main> untuk menaikkan skor SEO Semantic */}
    <main className="min-h-screen font-sans text-slate-800 pb-32 relative">
      
      {/* === BACKGROUND DOTS === */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-[#fafafa] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none"></div>

      {/* =========================================
          1. HEADER STAFF (SEO OPTIMIZED)
      ========================================= */}
      <section className="pt-36 md:pt-48 pb-16 relative px-6 max-w-4xl mx-auto text-center">
        {/* SEO H1 dengan penempatan Keyword target */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
          Pimpinan <span className="text-slate-500 font-light">Laboratorium Pajak</span>
        </h1>
        {/* Paragraf semantik dengan keyword turunan */}
        <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
          Dibimbing oleh tenaga pendidik profesional dengan kepakaran di bidang perpajakan untuk memastikan kualitas kurikulum dan pelayanan <strong>Laboratorium Akuntansi Lanjut B</strong> (TaxLaboratorium) selalu berstandar tinggi.
        </p>
        <div className="w-20 h-1 bg-slate-300 mx-auto mt-10 rounded-full"></div>
      </section>

      {/* =========================================
          2. CARDS SECTION (LOOPING DARI DATA EXTERNAL)
      ========================================= */}
      <section aria-label="Daftar Staff dan Dosen Laboratorium" className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          
          {/* Mapping komponen kartu untuk memisahkan beban rendering */}
          {STAFF_DATA.map((staff, index) => (
            <StaffCard key={`staff-${index}`} staff={staff} />
          ))}

        </div>
      </section>
      
    </main>
    </PageTransition>
  );
}