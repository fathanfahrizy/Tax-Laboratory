import { useState, useEffect } from 'react';
import PageTransition from '../components/PageTransition';

// IMPORT DATA & KOMPONEN EXTERNAL 
import { FAQS_DATA } from '../data/faqData';
import { FaqItem } from '../components/FaqComponents';

export default function Faq() {
  // active di-set ke index yang sedang dibuka. null = tutup semua.
  const [active, setActive] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index) => {
    // Kalau yang diklik adalah yang lagi kebuka, tutup (set null). Kalau bukan, buka index baru.
    setActive(active === index ? null : index);
  };

  return (
    <PageTransition>
    {/* SEMANTIC HTML: Menggunakan <main> untuk performa SEO */}
    <main className="pt-32 pb-32 min-h-screen bg-[#fafafa] font-sans text-slate-800 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-800/5 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        
        {/* HEADER SECTION (SEO OPTIMIZED) */}
        <header className="text-center mb-16 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            FAQ <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Laboratorium Pajak</span>
          </h1>
          <p className="text-slate-500 mt-2 text-lg font-medium leading-relaxed">
            Temukan jawaban cepat untuk pertanyaan umum seputar kegiatan praktikum di <strong>Laboratorium Akuntansi Lanjut B</strong> (TaxLaboratorium).
          </p>
        </header>

        {/* FAQ LIST CONTAINER */}
        <section aria-label="Daftar Pertanyaan yang Sering Diajukan" className="space-y-4">
          {FAQS_DATA.map((f, i) => (
            <FaqItem 
              key={`faq-${i}`} 
              f={f} 
              index={i} 
              active={active} 
              toggleFaq={toggleFaq} 
            />
          ))}
        </section>
        
        {/* FOOTER TEXT INFO */}
        <footer className="mt-16 text-center">
          <p className="text-slate-500 font-medium">
            Tidak menemukan jawaban yang Anda cari? <br className="md:hidden" />
            <a href="/kontak" className="text-orange-500 font-bold hover:text-orange-600 underline decoration-2 underline-offset-4 transition-colors ml-1">
              Hubungi Staff Laboratorium
            </a>
          </p>
        </footer>

      </div>
    </main>
    </PageTransition>
  );
}