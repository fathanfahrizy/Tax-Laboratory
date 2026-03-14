import { useEffect } from 'react';
import PageTransition from '../components/PageTransition';

// Mengimpor data statis dari luar untuk mencegah re-render & meringankan ukuran file
import { VISI_DATA, MISI_DATA } from '../data/misiData';

export default function TentangKami() {
  
  // Efek scroll to top otomatis setiap pindah halaman
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
    {/* SEMANTIC HTML: Menggunakan <main> sebagai penanda konten utama untuk SEO */}
    <main className="bg-[#fafafa] min-h-screen font-sans text-gray-800 scroll-smooth overflow-hidden pb-32">
      
      {/* === BACKGROUND PATTERN === */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-[#fafafa] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-70"></div>

      {/* =========================================
          1. HERO & TENTANG KAMI (SEO & LCP OPTIMIZED)
      ========================================= */}
      <section className="pt-36 md:pt-48 pb-16 relative px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* KIRI: TEKS DESKRIPSI (SEO KEYWORD INJECTION) */}
          <header className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[3px] bg-orange-500"></div>
              <span className="text-orange-500 font-black uppercase tracking-[0.25em] text-sm">Profil Identitas</span>
            </div>
            
            {/* SEO: H1 mengandung keyword utama */}
            <h1 className="text-5xl md:text-[5.5rem] font-black text-gray-900 leading-[1.05] tracking-tighter mb-8">
              Tentang <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-purple-600">Kami</span>
            </h1>
            
            {/* Teks Singkat dengan Sebaran Keyword Target */}
            <div className="space-y-6 text-gray-600 text-lg md:text-xl leading-relaxed text-justify mb-10">
              <p>
                <strong className="text-purple-900 font-black">Laboratorium Akuntansi Lanjut B</strong> adalah pusat <strong>Laboratorium Pajak</strong> unggulan di Fakultas Ekonomi Universitas Gunadarma. Kami hadir untuk mengubah teori kelas menjadi pengalaman dunia nyata melalui simulasi perpajakan yang interaktif dan aplikatif.
              </p>
              <p>
                Melalui modul praktikum terstruktur dan penggunaan piranti lunak berstandar industri, <strong>Lab Akuntansi Pajak</strong> ini membekali mahasiswa dengan keterampilan teknis mutakhir. Tujuan kami satu: mencetak profesional muda yang kompeten dan siap menghadapi tantangan ekosistem perpajakan digital.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="bg-white border border-purple-100 text-purple-800 text-sm font-bold px-4 py-2 rounded-full shadow-sm">💻 E-Faktur</span>
              <span className="bg-white border border-purple-100 text-purple-800 text-sm font-bold px-4 py-2 rounded-full shadow-sm">📄 E-Form</span>
              <span className="bg-white border border-purple-100 text-purple-800 text-sm font-bold px-4 py-2 rounded-full shadow-sm">📕 Adobe Acrobat</span>
            </div>
          </header>

          {/* KANAN: OVERLAPPING IMAGES (LCP & LAZY LOAD OPTIMIZED) */}
          <figure className="lg:col-span-5 relative h-[400px] md:h-[550px] w-full mt-10 lg:mt-0">
            {/* Dekorasi Blob Belakang */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-orange-300/30 rounded-full blur-[80px] z-0"></div>
            
            {/* Gambar Utama (Miring dikit) - LCP: Prioritas Tinggi */}
            <div className="absolute top-0 right-0 w-[90%] h-[85%] rounded-[2rem] overflow-hidden shadow-2xl z-10 border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-700">
              <div className="absolute inset-0 bg-purple-900/10 mix-blend-multiply z-10 hover:bg-transparent transition-colors duration-500"></div>
              <img 
                src="https://images.unsplash.com/photo-1577415124269-b911cff4074f?w=800&q=80" 
                alt="Fasilitas Modern di Laboratorium Pajak Universitas Gunadarma" 
                fetchpriority="high"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Gambar Kecil (Numpuk di bawah kiri) - Lazy Load */}
            <div className="absolute bottom-4 -left-4 w-[65%] h-[50%] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] z-20 border-4 border-white transform -rotate-3 hover:rotate-0 hover:-translate-y-2 transition-all duration-700 hidden sm:block">
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80" 
                alt="Praktikum Simulasi Coretax di Lab Akuntansi Pajak" 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </figure>

        </div>
      </section>

      {/* =========================================
          2. VISI & MISI (MENGGUNAKAN DATA LOOPING)
      ========================================= */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 relative">
        <article className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* CARD VISI (DARK MODE) */}
          <div className="lg:col-span-5 bg-purple-900 rounded-[2.5rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden flex flex-col justify-center group border border-purple-800">
            <div className="absolute -top-6 -right-2 text-[12rem] font-serif leading-none text-purple-800/60 opacity-50 group-hover:scale-110 transition-transform duration-700 pointer-events-none">"</div>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-yellow-400"></div>

            <h2 className="relative z-10 text-xl font-black text-orange-400 mb-8 uppercase tracking-[0.25em] flex items-center gap-3">
              <span className="w-8 h-[2px] bg-orange-400"></span> Visi
            </h2>
            
            {/* Mengambil data Visi dari file external */}
            <p className="relative z-10 text-2xl md:text-3xl font-bold leading-snug tracking-tight text-purple-50 italic">
              "{VISI_DATA}"
            </p>
          </div>

          {/* CARD MISI (LOOPING MENGGUNAKAN ARRAY) */}
          <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-10 md:p-12 shadow-xl border border-gray-100 flex flex-col justify-center">
            <h2 className="text-xl font-black text-purple-900 mb-8 uppercase tracking-[0.25em] flex items-center gap-3">
              <span className="w-8 h-[2px] bg-purple-900"></span> Misi
            </h2>

            <div className="space-y-6">
              {/* Me-loop data Misi dari array external agar struktur DOM tidak bengkak */}
              {MISI_DATA.map((misi, index) => (
                <div key={index}>
                  <div className="flex items-start gap-4 sm:gap-6 group">
                    <div className="text-4xl md:text-5xl font-black text-gray-200 group-hover:text-orange-500 transition-colors duration-300 leading-none shrink-0 mt-1">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <p className="text-base md:text-lg text-gray-700 font-medium leading-relaxed group-hover:text-gray-900 transition-colors">
                      {misi}
                    </p>
                  </div>
                  {/* Menambahkan garis pemisah kecuali untuk elemen terakhir */}
                  {index !== MISI_DATA.length - 1 && (
                    <div className="w-full h-px bg-gray-100 mt-6"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </article>
      </section>

    </main>
    </PageTransition>
  );
}