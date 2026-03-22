import { useEffect } from 'react';
import PageTransition from '../components/PageTransition';

// === IMPORT DATA & KOMPONEN DARI LUAR (Meringankan Render File Utama) ===
import softwareData from '../data/softwareData.json';
import SoftwareCard from '../components/SoftwareCard';

export default function SoftwarePajak() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      {/* SEMANTIC HTML: Menggunakan <main> untuk struktur SEO yang kuat */}
      <main className="pt-32 pb-32 min-h-screen bg-[#fafafa] font-sans text-slate-800">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* HEADER SECTION (SEO OPTIMIZED) */}
          <header className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-6 bg-white border border-slate-200 px-5 py-2 rounded-full shadow-sm">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
              <span className="text-slate-600 font-bold uppercase tracking-widest text-xs">Pusat Unduhan Aplikasi</span>
            </div>
            
            {/* Inject Keyword Utama di H1 */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Software <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Laboratorium Pajak</span>
            </h1>
            
            {/* Inject Keyword Turunan di Deskripsi */}
            <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Unduh seluruh perangkat lunak yang dibutuhkan untuk menunjang kegiatan praktikum perpajakan di <strong>Laboratorium Akuntansi Lanjut B</strong> (TaxLaboratorium). Pastikan spesifikasi perangkat Anda memenuhi kriteria sistem aplikasi.
            </p>
          </header>

          {/* GRID KARTU SOFTWARE - Diperbarui menggunakan Flexbox Center */}
          <section aria-label="Daftar Aplikasi Perpajakan" className="flex flex-wrap justify-center gap-8">
            {softwareData.map((app) => (
              <div 
                key={app.id} 
                className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.35rem)] flex [&>article]:h-full [&>article]:w-full"
              >
                <SoftwareCard app={app} />
              </div>
            ))}
          </section>

        </div>
      </main>
    </PageTransition>
  );
}