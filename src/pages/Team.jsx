import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import teamData from '../data/teamData.json';
import PageTransition from '../components/PageTransition';
import { Helmet } from 'react-helmet-async';

// IMPORT KOMPONEN KARTU
import MemberCard from '../components/MemberCard';

export default function Team() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const searchParams = new URLSearchParams(location.search);
  const queryAngkatan = searchParams.get('angkatan') || '2022';
  
  const [activeYear, setActiveYear] = useState(queryAngkatan);

  useEffect(() => {
    const year = searchParams.get('angkatan') || '2022';
    setActiveYear(year);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.search]);

  const handleTabChange = (year) => {
    setActiveYear(year);
    navigate(`/team?angkatan=${year}`, { replace: true });
  };

  const currentData = activeYear === '2023' ? teamData.angkatan2023 : teamData.angkatan2022;

  return (
    <PageTransition>
      <Helmet>
        <title>Tim Asisten & IT Support - TaxLaboratory Gunadarma</title>
        <meta name="description" content="Kenali profil anggota Asisten Praktikum dan tim IT Support yang berdedikasi di Laboratorium Akuntansi Lanjut B (TaxLaboratory) Universitas Gunadarma." />
        <link rel="canonical" href="https://www.taxlaboratory.my.id/team" />
      </Helmet>
    <main className="bg-[#fafafa] min-h-screen font-sans text-gray-800 scroll-smooth pb-32">
      
      <div className="fixed inset-0 -z-10 h-full w-full bg-[#fafafa] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none"></div>

      <section className="pt-36 md:pt-48 pb-12 relative px-4 sm:px-6 max-w-7xl mx-auto text-center mb-6 sm:mb-10">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-purple-900 leading-[1.05] tracking-tighter mb-4 sm:mb-6">
          Meet The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">Team.</span>
        </h1>
        <p className="text-gray-500 text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto">
          Dibalik operasional <strong>TaxLaboratorium</strong> yang unggul, terdapat tim profesional <strong>Lab Akuntansi Pajak</strong> yang berdedikasi tinggi untuk memberikan pelayanan akademik terbaik.
        </p>
      </section>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="flex justify-center mb-12 sm:mb-16">
          <div className="bg-white p-1.5 sm:p-2 rounded-full border border-gray-200 shadow-sm flex gap-1 sm:gap-2">
            <button 
              onClick={() => handleTabChange('2022')}
              className={`px-5 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm md:text-base transition-all duration-300 ${
                activeYear === '2022' 
                ? 'bg-purple-900 text-white shadow-md scale-100' 
                : 'text-gray-500 hover:bg-purple-50 hover:text-purple-900'
              }`}
            >
              Angkatan 2022
            </button>
            <button 
              onClick={() => handleTabChange('2023')}
              className={`px-5 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm md:text-base transition-all duration-300 ${
                activeYear === '2023' 
                ? 'bg-purple-900 text-white shadow-md scale-100' 
                : 'text-gray-500 hover:bg-purple-50 hover:text-purple-900'
              }`}
            >
              Angkatan 2023
            </button>
          </div>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700" key={activeYear}>
          
          <div className="flex items-center gap-3 sm:gap-4 mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900">Angkatan {activeYear}</h2>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-purple-200 to-transparent"></div>
          </div>

          {/* ASISTEN SECTION */}
          <div className="mb-12 sm:mb-16">
            <h3 className="text-xl sm:text-2xl font-bold text-purple-900 mb-6 sm:mb-8 border-l-[4px] sm:border-l-[6px] border-orange-500 pl-3 sm:pl-4"> 
              Asisten <span className="text-xs sm:text-sm text-gray-500 ml-1 sm:ml-2">({currentData.asisten.length} Anggota)</span>
            </h3>
            {/* INI KUNCI UTAMANYA: grid-cols-2 untuk HP, gap diperkecil (gap-3) */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
              {currentData.asisten.map((member, index) => (
                <MemberCard key={`${activeYear}-asisten-${index}`} member={member} />
              ))}
            </div>
          </div>

          {/* IT SUPPORT SECTION */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-purple-900 mb-6 sm:mb-8 border-l-[4px] sm:border-l-[6px] border-orange-500 pl-3 sm:pl-4"> 
              IT Support <span className="text-xs sm:text-sm text-gray-500 ml-1 sm:ml-2">({currentData.itSupport.length} Anggota)</span>
            </h3>
            {/* INI KUNCI UTAMANYA: grid-cols-2 untuk HP, gap diperkecil (gap-3) */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
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