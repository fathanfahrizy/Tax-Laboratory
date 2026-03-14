import { useEffect, useState, useMemo } from 'react';
import modulData from '../data/modulData.json';
import PageTransition from '../components/PageTransition';

// IMPORT KOMPONEN DARI LUAR (Meringankan Render)
import ModulCard from '../components/ModulCard';
import { FolderIcon, FilterIcon } from '../components/ModulIcons';

export default function Modul() {
  const [activeFilter, setActiveFilter] = useState("Semua Kelas");

  // OPTIMASI: useMemo mencegah kalkulasi ulang kategori setiap kali filter ditekan
  const filterCategories = useMemo(() => {
    return ["Semua Kelas", ...new Set(modulData.map(item => item.classCode))];
  }, []);

  // OPTIMASI: Filtering array hanya diproses jika activeFilter berubah
  const filteredModuls = useMemo(() => {
    return activeFilter === "Semua Kelas" 
      ? modulData 
      : modulData.filter(modul => modul.classCode === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
    {/* SEMANTIC HTML: <main> untuk meningkatkan skor SEO */}
    <main className="pt-32 pb-32 min-h-screen bg-[#fafafa] font-sans text-slate-800">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* HEADER (SEO OPTIMIZED) */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6 bg-white border border-slate-200 px-5 py-2 rounded-full shadow-sm">
            <div className="text-orange-500"><FolderIcon /></div>
            <span className="text-slate-600 font-bold uppercase tracking-widest text-xs">Pusat Unduhan</span>
          </div>
          {/* Inject Keyword Utama di H1 */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Modul Praktikum <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Laboratorium Pajak</span>
          </h1>
          {/* Inject Keyword Turunan di Deskripsi */}
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Pilih kelas Anda pada filter di bawah untuk menemukan modul pembelajaran resmi dari <strong>Laboratorium Akuntansi Lanjut B</strong> (TaxLaboratorium) yang sesuai dengan kurikulum Anda.
          </p>
        </header>

        {/* SECTION FILTER */}
        <section aria-label="Filter Kategori Modul" className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-2 mb-4 text-slate-400">
            <FilterIcon />
            <span className="text-sm font-bold uppercase tracking-widest">Filter Berdasarkan Kelas</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {filterCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                aria-pressed={activeFilter === category}
                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 border shadow-sm ${
                  activeFilter === category
                    ? "bg-orange-500 text-white border-orange-600 shadow-orange-500/20 translate-y-[-1px]"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-purple-900"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* SECTION KARTU MODUL */}
        <section aria-label="Daftar Modul Praktikum" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredModuls.length > 0 ? (
            filteredModuls.map((modul) => (
              <ModulCard key={modul.id} modul={modul} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-500 text-lg">Modul untuk kelas ini belum tersedia.</p>
            </div>
          )}
        </section>

      </div>
    </main>
    </PageTransition>
  );
}