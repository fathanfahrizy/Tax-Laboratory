import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const location = useLocation();
  const navRef = useRef(null);

  const isTransparentHero = location.pathname === '/' || location.pathname === '/oprec';
  const useWhiteText = isTransparentHero && !isScrolled;

  // =========================================
  // OPTIMASI: THROTTLE SCROLL EVENT (ANTI-LAG)
  // =========================================
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
          
          setScrollProgress(progress);
          setIsScrolled(window.scrollY > 50);
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    closeAll();
  }, [location.pathname]);

  const toggleDropdown = (menuName) => setActiveDropdown(activeDropdown === menuName ? null : menuName);
  
  const closeAll = () => { 
    setActiveDropdown(null); 
    setIsMobileMenuOpen(false); 
  };

  const isActive = (path) => location.pathname === path;

  const isParentActive = (menuName) => {
    const paths = {
      profil: ['/tentang-kami', '/team', '/staff'],
      layanan: ['/tata-tertib', '/modul', '/software-pajak'],
      informasi: ['/oprec', '/lokasi', '/faq']
    };
    return paths[menuName]?.includes(location.pathname);
  };

  const getLinkStyle = (path) => {
    const active = isActive(path);
    if (useWhiteText) return active ? 'text-white font-extrabold' : 'text-purple-100 hover:text-white';
    return active ? 'text-purple-800 font-extrabold' : 'text-gray-600 hover:text-purple-800';
  };

  const getDropdownStyle = (menuName) => {
    const active = activeDropdown === menuName || isParentActive(menuName);
    if (useWhiteText) return active ? 'text-white font-extrabold' : 'text-purple-100 hover:text-white';
    return active ? 'text-purple-800 font-extrabold' : 'text-gray-600 hover:text-purple-800';
  };

  const getSubLinkStyle = (path) => {
    return isActive(path) 
      ? 'text-purple-800 font-extrabold bg-purple-50/80' 
      : 'text-gray-600 hover:bg-purple-50/80 hover:text-purple-800';
  };

  return (
    <div className={`fixed w-full z-[100] flex justify-center pointer-events-none transition-all duration-300 ease-out ${isScrolled ? 'top-4 px-4 sm:px-6' : 'top-0 px-0'}`}>
      <nav 
        ref={navRef} 
        className={`pointer-events-auto w-full transition-all duration-300 ease-out flex flex-col items-center relative transform-gpu
          ${isScrolled 
            ? 'max-w-[1800px] rounded-full md:rounded-[2.5rem] bg-white/95 shadow-[0_15px_50px_-10px_rgba(0,0,0,0.15)] backdrop-blur-xl py-3 px-6 md:px-8 border border-gray-100' 
            : `max-w-full rounded-none py-3 md:py-4 px-6 md:px-10 border-b ${isTransparentHero ? 'bg-transparent border-transparent' : 'bg-white border-gray-100 shadow-sm'}`
          }`}
      >
        <div className="w-full flex items-center justify-between relative z-20">
          
          {/* === BRAND LOGO (BAGIAN KIRI - FLEX-1 SAAT SCROLL) === */}
          <div className={`flex justify-start transition-all duration-300 ease-out ${isScrolled ? 'flex-1' : 'w-auto'}`}>
            <Link to="/" onClick={closeAll} className="flex items-center gap-3 shrink-0 group">
              <div className={`bg-white rounded-full flex items-center justify-center overflow-hidden border border-slate-100 shadow-sm transition-all duration-300 group-hover:scale-105 shrink-0
                ${isScrolled ? 'w-9 h-9 md:w-11 md:h-11' : 'w-11 h-11 md:w-13 md:h-13'}
              `}>
                <img src="/img-template/LogoTaxLab.webp" alt="Logo TaxLab" className="w-full h-full object-contain" onError={(e) => { e.target.src = "https://api.dicebear.com/8.x/initials/svg?seed=TL&backgroundColor=orange" }} />
              </div>

              <div className="flex flex-col justify-center leading-none">
                <span className={`font-black tracking-tight transition-colors duration-300 
                  ${isScrolled ? 'text-base md:text-lg' : 'text-lg md:text-xl'} 
                  ${useWhiteText ? 'text-white' : 'text-gray-900'}
                `}>
                  Tax<span className={useWhiteText ? 'text-orange-400' : 'text-orange-500'}>Laboratory</span>
                </span>
                <span className={`font-bold tracking-[0.2em] uppercase transition-colors duration-300 
                  ${isScrolled ? 'text-[7px] md:text-[8px] mt-0.5' : 'text-[9px] md:text-[10px] mt-1'} 
                  ${useWhiteText ? 'text-purple-200' : 'text-gray-400'}
                `}>
                  Gunadarma
                </span>
              </div>
            </Link>
          </div>
          
          {/* === DESKTOP NAVIGATION (BAGIAN TENGAH - MENU PERSIS DI TENGAH SAAT SCROLL) === */}
          <div className={`hidden lg:flex gap-8 font-bold text-base items-center transition-all duration-300 ${isScrolled ? 'justify-center shrink-0' : 'flex-1 justify-end'}`}>
            
            <Link to="/" onClick={closeAll} className={`transition-colors relative group ${getLinkStyle('/')}`}>
              Beranda
              <span className={`absolute -bottom-1.5 left-0 w-0 h-0.5 transition-all group-hover:w-full ${useWhiteText ? 'bg-white' : 'bg-orange-500'}`}></span>
            </Link>
            
            <div className="relative group/item">
              <button onClick={() => toggleDropdown('profil')} className={`flex items-center gap-1.5 focus:outline-none transition-colors ${getDropdownStyle('profil')}`}>
                Profil <svg className={`w-4 h-4 transition-transform ${activeDropdown === 'profil' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {activeDropdown === 'profil' && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-7 w-60 bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden py-3 animate-in fade-in slide-in-from-top-4 duration-200">
                  <Link to="/tentang-kami" onClick={closeAll} className={`block px-6 py-3 ${getSubLinkStyle('/tentang-kami')}`}>Tentang Kami</Link>
                  <Link to="/team" onClick={closeAll} className={`block px-6 py-3 ${getSubLinkStyle('/team')}`}>Team</Link>
                  <Link to="/staff" onClick={closeAll} className={`block px-6 py-3 ${getSubLinkStyle('/staff')}`}>Staff</Link>
                </div>
              )}
            </div>

            <div className="relative group/item">
              <button onClick={() => toggleDropdown('layanan')} className={`flex items-center gap-1.5 focus:outline-none transition-colors ${getDropdownStyle('layanan')}`}>
                Layanan <svg className={`w-4 h-4 transition-transform ${activeDropdown === 'layanan' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {activeDropdown === 'layanan' && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-7 w-60 bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden py-3 animate-in fade-in slide-in-from-top-4 duration-200">
                  <Link to="/tata-tertib" onClick={closeAll} className={`block px-6 py-3 ${getSubLinkStyle('/tata-tertib')}`}>Tata Tertib</Link>
                  <Link to="/modul" onClick={closeAll} className={`block px-6 py-3 ${getSubLinkStyle('/modul')}`}>Modul</Link>
                  <Link to="/software-pajak" onClick={closeAll} className={`block px-6 py-3 ${getSubLinkStyle('/software-pajak')}`}>Software Pajak</Link>
                  <a href="https://djponline.pajak.go.id/" target="_blank" rel="noreferrer" onClick={closeAll} className="block px-6 py-3 text-blue-600 hover:bg-blue-50/80">Portal DJP</a>
                </div>
              )}
            </div>

            <div className="relative group/item">
              <button onClick={() => toggleDropdown('informasi')} className={`flex items-center gap-1.5 focus:outline-none transition-colors ${getDropdownStyle('informasi')}`}>
                Informasi <svg className={`w-4 h-4 transition-transform ${activeDropdown === 'informasi' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {activeDropdown === 'informasi' && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-7 w-60 bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden py-3 animate-in fade-in slide-in-from-top-4 duration-200">
                  <Link to="/oprec" onClick={closeAll} className={`block px-6 py-3 ${isActive('/oprec') ? 'text-orange-600 font-extrabold bg-orange-50' : 'text-orange-500 font-bold hover:bg-orange-50'}`}>Oprec</Link>
                  <Link to="/lokasi" onClick={closeAll} className={`block px-6 py-3 ${getSubLinkStyle('/lokasi')}`}>Lokasi</Link>
                  <Link to="/faq" onClick={closeAll} className={`block px-6 py-3 ${getSubLinkStyle('/faq')}`}>FAQ</Link>
                </div>
              )}
            </div>

            <Link to="/kontak" onClick={closeAll} className={`transition-colors relative group ${getLinkStyle('/kontak')}`}>
              Kontak
              <span className={`absolute -bottom-1.5 left-0 w-0 h-0.5 transition-all group-hover:w-full ${useWhiteText ? 'bg-white' : 'bg-orange-500'}`}></span>
            </Link>
          </div>

          {/* === BALANCER KANAN & MOBILE TOGGLE (INI YANG BIKIN MENU PC LU PAS DI TENGAH!) === */}
          {/* Logic Fix: Div pembungkus ini JANGAN dikasih lg:hidden, biar dia bertindak sebagai penyeimbang flex-1 dari logo di sebelah kiri! */}
          <div className={`flex justify-end transition-all duration-300 ease-out ${isScrolled ? 'flex-1' : 'w-auto'}`}>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-full focus:outline-none transition-colors ${useWhiteText ? 'text-white bg-white/10 hover:bg-white/20' : 'text-purple-900 bg-purple-50 hover:bg-purple-100'}`}
            >
              <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6" : "M4 6h16M4 12h16m-7 6h7"} /></svg>
            </button>
          </div>
        </div>

        {/* 📉 SCROLL PROGRESS LINE (RAPIH & PRESISI) */}
        <div className={`absolute inset-0 pointer-events-none overflow-hidden transition-all duration-300 ${isScrolled ? 'rounded-full md:rounded-[2.5rem]' : 'rounded-none'}`}>
          <div 
            className="absolute bottom-0 left-0 h-[4px] bg-gradient-to-r from-purple-800 to-orange-500 transition-all duration-100 ease-out shadow-[0_0_12px_rgba(249,115,22,0.4)] transform-gpu"
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>

        {/* === MOBILE OVERLAY MENU === */}
        <div className={`lg:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-300 bg-white shadow-2xl rounded-b-[2rem] transform-gpu will-change-transform ${isMobileMenuOpen ? 'max-h-[85vh] opacity-100 border-t border-gray-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col gap-1 p-5 font-bold text-gray-700 text-base max-h-[80vh] overflow-y-auto">
            <Link to="/" onClick={closeAll} className={`p-4 rounded-xl transition-colors ${isActive('/') ? 'bg-purple-50 text-purple-800' : 'hover:bg-purple-50'}`}>Beranda</Link>
            
            {/* Mobile Profil */}
            <div className="flex flex-col">
              <button onClick={() => toggleDropdown('m-profil')} className={`flex justify-between items-center p-4 rounded-xl transition-colors ${activeDropdown === 'm-profil' ? 'bg-purple-50/50 text-purple-800' : 'hover:bg-purple-50'}`}>
                PROFIL <svg className={`w-5 h-5 transition-transform ${activeDropdown === 'm-profil' ? 'rotate-180 text-orange-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${activeDropdown === 'm-profil' ? 'max-h-80 mb-2' : 'max-h-0'}`}>
                <div className="bg-gray-50 rounded-2xl mx-2 flex flex-col py-2 border border-gray-100">
                  <Link to="/tentang-kami" onClick={closeAll} className={`px-6 py-3 ${getSubLinkStyle('/tentang-kami')}`}>Tentang Kami</Link>
                  <Link to="/team" onClick={closeAll} className={`px-6 py-3 ${getSubLinkStyle('/team')}`}>Team</Link>
                  <Link to="/staff" onClick={closeAll} className={`px-6 py-3 ${getSubLinkStyle('/staff')}`}>Staff</Link>
                </div>
              </div>
            </div>

            {/* Mobile Layanan */}
            <div className="flex flex-col">
              <button onClick={() => toggleDropdown('m-layanan')} className={`flex justify-between items-center p-4 rounded-xl transition-colors ${activeDropdown === 'm-layanan' ? 'bg-purple-50/50 text-purple-800' : 'hover:bg-purple-50'}`}>
                LAYANAN <svg className={`w-5 h-5 transition-transform ${activeDropdown === 'm-layanan' ? 'rotate-180 text-orange-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${activeDropdown === 'm-layanan' ? 'max-h-80 mb-2' : 'max-h-0'}`}>
                <div className="bg-gray-50 rounded-2xl mx-2 flex flex-col py-2 border border-gray-100">
                  <Link to="/tata-tertib" onClick={closeAll} className={`px-6 py-3 ${getSubLinkStyle('/tata-tertib')}`}>Tata Tertib</Link>
                  <Link to="/modul" onClick={closeAll} className={`px-6 py-3 ${getSubLinkStyle('/modul')}`}>Modul</Link>
                  <Link to="/software-pajak" onClick={closeAll} className={`px-6 py-3 ${getSubLinkStyle('/software-pajak')}`}>Software Pajak</Link>
                  <a href="https://djponline.pajak.go.id/" target="_blank" rel="noreferrer" onClick={closeAll} className="px-6 py-3 text-blue-600">Portal DJP</a>
                </div>
              </div>
            </div>

            {/* Mobile Informasi */}
            <div className="flex flex-col">
              <button onClick={() => toggleDropdown('m-informasi')} className={`flex justify-between items-center p-4 rounded-xl transition-colors ${activeDropdown === 'm-informasi' ? 'bg-purple-50/50 text-purple-800' : 'hover:bg-purple-50'}`}>
                INFORMASI <svg className={`w-5 h-5 transition-transform ${activeDropdown === 'm-informasi' ? 'rotate-180 text-orange-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${activeDropdown === 'm-informasi' ? 'max-h-80 mb-2' : 'max-h-0'}`}>
                <div className="bg-gray-50 rounded-2xl mx-2 flex flex-col py-2 border border-gray-100">
                  <Link to="/oprec" onClick={closeAll} className={`px-6 py-3 ${isActive('/oprec') ? 'text-orange-600' : 'text-orange-500'}`}>Oprec</Link>
                  <Link to="/lokasi" onClick={closeAll} className={`px-6 py-3 ${getSubLinkStyle('/lokasi')}`}>Lokasi</Link>
                  <Link to="/faq" onClick={closeAll} className={`px-6 py-3 ${getSubLinkStyle('/faq')}`}>FAQ</Link>
                </div>
              </div>
            </div>

            <Link to="/kontak" onClick={closeAll} className={`p-4 rounded-xl transition-colors ${isActive('/kontak') ? 'bg-purple-50 text-purple-800' : 'hover:bg-purple-50'}`}>Kontak</Link>
          </div>
        </div>
      </nav>
    </div>
  );
}