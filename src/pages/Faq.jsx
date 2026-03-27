import { useState, useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import { Helmet } from 'react-helmet-async'; // <-- IMPORT HELMET DITAMBAHKAN DI SINI

// IMPORT DATA & KOMPONEN EXTERNAL 
import { FAQS_DATA } from '../data/faqData';
import { FaqItem } from '../components/FaqComponents';
import { Link } from 'react-router-dom';

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
    {/* --- INJEKSI SEO & FAQ SCHEMA MARKUP --- */}
    <Helmet>
      <title>FAQ Praktikum - Laboratorium Pajak Gunadarma</title>
      <meta name="description" content="Temukan jawaban cepat untuk pertanyaan umum seputar kegiatan praktikum dan aturan di Laboratorium Akuntansi Lanjut B (TaxLaboratorium) Universitas Gunadarma." />
      <link rel="canonical" href="https://www.taxlaboratory.my.id/faq" />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": FAQS_DATA.map((faq) => ({
            "@type": "Question",
            // NOTE: Pastikan 'faq.question' dan 'faq.answer' sesuai dengan nama properti di file faqData kamu.
            // Kalau di file kamu namanya 'q' dan 'a', maka otomatis terbaca berkat operator || di bawah ini.
            "name": faq.question || faq.q || "Pertanyaan Praktikum", 
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer || faq.a || "Jawaban dari TaxLaboratory"
            }
          }))
        })}
      </script>
    </Helmet>

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
            <Link to="/kontak" className="text-orange-500 font-bold hover:text-orange-600 underline decoration-2 underline-offset-4 transition-colors ml-1">
              Hubungi Staff Laboratorium
            </Link>
          </p>
        </footer>

      </div>
    </main>
    </PageTransition>
  );
}