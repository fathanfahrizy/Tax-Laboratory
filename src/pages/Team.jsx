import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import teamData from '../data/teamData.json';
import PageTransition from '../components/PageTransition';

// IMPORT KOMPONEN KARTU
import MemberCard from '../components/MemberCard';

export default function Team() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Baca parameter dari URL, contoh: /team?angkatan=2023
  // Default ke 2022 kalau nggak ada parameter
  const searchParams = new URLSearchParams(location.search);
  const queryAngkatan = searchParams.get('angkatan') || '2022';
  
  // State untuk menyimpan angkatan yang lagi aktif
  const [activeYear, setActiveYear] = useState(queryAngkatan);

  // Sync state kalau user pindah tab via Navbar
  useEffect(() => {
    const year = searchParams.get('angkatan') || '2022';
    setActiveYear(year);
    // Scroll ke atas dengan mulus saat ganti angkatan
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.search]);

  // Fungsi untuk ganti tab langsung dari halaman (tanpa lewat Navbar)
  const handleTabChange = (year) => {
    setActiveYear(year);
    // Update URL biar kalau di-refresh/share tetep di angkatan yang bener
    navigate(`/team?angkatan=${year}`, { replace: true });
  };

  // MENGURANGI BEBAN RENDER 50%: 
  // Kita cuma meload data untuk tahun yang lagi aktif
  const currentData = activeYear === '2023' ? teamData.angkatan2023 : teamData.angkatan2022;

  return (
    <PageTransition>
    <main className="bg-[#fafafa] min-h-screen font-sans text-gray-800 scroll-smooth pb-32">
      
      {/* Background */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-[#fafafa] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none"></div>

      {/* =========================================
          HEADER TEAM 
      ========================================= */}
      <section className="pt-36 md:pt-48 pb-12 relative px-6 max-w-7xl mx-auto text-center mb-10">
        <h1 className="text-5xl md:text-7xl font-black text-purple-900 leading-[1.05] tracking-tighter mb-6">
          Meet The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">Team.</span>
        </h1>
        <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
          Dibalik operasional <strong>TaxLaboratorium</strong> yang unggul, terdapat tim profesional <strong>Lab Akuntansi Pajak</strong> yang berdedikasi tinggi untuk memberikan pelayanan akademik terbaik.
        </p>
      </section>

      <article className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* =========================================
            TAB SWITCHER (Tombol Pintas di Halaman)
        ========================================= */}
        <div className="flex justify-center mb-16">
          <div className="bg-white p-2 rounded-full border border-gray-200 shadow-sm flex gap-2">
            <button 
              onClick={() => handleTabChange('2022')}
              className={`px-8 py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 ${
                activeYear === '2022' 
                ? 'bg-purple-900 text-white shadow-md scale-100' 
                : 'text-gray-500 hover:bg-purple-50 hover:text-purple-900'
              }`}
            >
              Angkatan 2022
            </button>
            <button 
              onClick={() => handleTabChange('2023')}
              className={`px-8 py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 ${
                activeYear === '2023' 
                ? 'bg-purple-900 text-white shadow-md scale-100' 
                : 'text-gray-500 hover:bg-purple-50 hover:text-purple-900'
              }`}
            >
              Angkatan 2023
            </button>
          </div>
        </div>

        {/* =========================================
            KONTEN YANG DI-RENDER (Dinamis Berdasarkan Tab)
        ========================================= */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700" key={activeYear}>
          
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">Angkatan {activeYear}</h2>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-purple-200 to-transparent"></div>
          </div>

          {/* ASISTEN SECTION */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-purple-900 mb-8 border-l-[6px] border-orange-500 pl-4"> 
              Asisten <span className="text-sm text-gray-500 ml-2">({currentData.asisten.length} Anggota)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {currentData.asisten.map((member, index) => (
                <MemberCard key={`${activeYear}-asisten-${index}`} member={member} />
              ))}
            </div>
          </div>

          {/* IT SUPPORT SECTION */}
          <div>
            <h3 className="text-2xl font-bold text-purple-900 mb-8 border-l-[6px] border-orange-500 pl-4"> 
              IT Support <span className="text-sm text-gray-500 ml-2">({currentData.itSupport.length} Anggota)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {currentData.itSupport.map((member, index) => (
                <MemberCard key={`${activeYear}-it-${index}`} member={member} />
              ))}
            </div>
          </div>

        </div>

      </article>
    </main>
    </PageTransition>
  );
}