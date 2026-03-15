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

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    closeAll();
  }, [location.pathname, location.search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <div className={`fixed w-full z-[100] flex justify-center pointer-events-none transition-all duration-500 ease-in-out ${isScrolled ? 'top-4 md:top-5 px-4 sm:px-6' : 'top-0 px-0'}`}>
      <nav 
        ref={navRef} 
        className={`pointer-events-auto w-full transition-all duration-500 ease-in-out flex flex-col items-center relative
          ${isScrolled 
            ? 'max-w-[1800px] rounded-full md:rounded-[2.5rem] bg-white/95 shadow-[0_15px_50px_-10px_rgba(0,0,0,0.15)] backdrop-blur-xl py-3 md:py-3.5 px-6 md:px-8 border border-gray-100' 
            : `max-w-full rounded-none py-3 md:py-4 px-6 md:px-10 lg:px-12 border-b ${isTransparentHero ? 'bg-transparent border-transparent shadow-none' : 'bg-white border-gray-100 shadow-sm'}`
          }`}
      >
        <div className="w-full flex items-center justify-between relative z-20">
          
          {/* === BRAND LOGO === */}
          <div className={`flex justify-start transition-all duration-500 ease-in-out ${isScrolled ? 'flex-1' : 'w-auto'}`}>
            <Link to="/" onClick={closeAll} className="flex items-center gap-3 sm:gap-4 shrink-0 group">
              <div className={`bg-white rounded-full flex items-center justify-center overflow-hidden border border-slate-100 shadow-sm transition-all duration-500 group-hover:scale-105 group-hover:shadow-md shrink-0
                ${isScrolled ? 'w-10 h-10 md:w-11 md:h-11 p-0.5' : 'w-12 h-12 md:w-14 md:h-14 p-1'}
              `}>
                <img 
                  src="/img-template/LogoTaxLab.webp" 
                  alt="Logo TaxLab Gunadarma" 
                  loading="lazy"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>

              <div className="flex flex-col justify-center pt-0.5">
                <span className={`font-black tracking-tight leading-none transition-colors duration-500 
                  ${isScrolled ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'} 
                  ${useWhiteText ? 'text-white' : 'text-gray-900'}
                `}>
                  Tax<span className={useWhiteText ? 'text-orange-400' : 'text-orange-500'}>Laboratory</span>
                </span>
                <span className={`font-bold tracking-[0.25em] uppercase transition-colors duration-500 
                  ${isScrolled ? 'text-[8px] md:text-[9px] mt-0.5' : 'text-[9px] md:text-[11px] mt-1'} 
                  ${useWhiteText ? 'text-purple-200' : 'text-gray-400'}
                `}>
                  Gunadarma
                </span>
              </div>
            </Link>
          </div>
          
          {/* === DESKTOP NAVIGATION === */}
          <div className={`hidden lg:flex gap-10 font-bold text-base lg:text-lg items-center transition-all duration-500 ease-in-out ${isScrolled ? 'justify-center shrink-0' : 'flex-1 justify-end'}`}>
            
            <Link to="/" onClick={closeAll} className={`transition-colors relative group ${getLinkStyle('/')}`}>
              Beranda
              <span className={`absolute -bottom-1.5 left-0 w-0 h-0.5 transition-all group-hover:w-full ${useWhiteText ? 'bg-white' : 'bg-orange-500'}`}></span>
            </Link>
            
            <div className="relative group/item">
              <button onClick={() => toggleDropdown('profil')} className={`flex items-center gap-1.5 focus:outline-none transition-colors ${getDropdownStyle('profil')}`}>
                Profil <svg className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'profil' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {activeDropdown === 'profil' && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-7 w-64 bg-white/95 backdrop-blur-xl border border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] rounded-2xl overflow-hidden py-3 animate-in fade-in slide-in-from-top-4 duration-300 ring-1 ring-black/5">
                  <Link to="/tentang-kami" onClick={closeAll} className={`block px-6 py-3.5 text-base ${getSubLinkStyle('/tentang-kami')}`}>Tentang Kami</Link>
                  <Link to="/team" onClick={closeAll} className={`block px-6 py-3.5 text-base ${getSubLinkStyle('/team')}`}>Team</Link>
                  <Link to="/staff" onClick={closeAll} className={`block px-6 py-3.5 text-base ${getSubLinkStyle('/staff')}`}>Staff</Link>
                </div>
              )}
            </div>

            <div className="relative group/item">
              <button onClick={() => toggleDropdown('layanan')} className={`flex items-center gap-1.5 focus:outline-none transition-colors ${getDropdownStyle('layanan')}`}>
                Layanan <svg className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'layanan' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {activeDropdown === 'layanan' && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-7 w-64 bg-white/95 backdrop-blur-xl border border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] rounded-2xl overflow-hidden py-3 animate-in fade-in slide-in-from-top-4 duration-300 ring-1 ring-black/5">
                  <Link to="/tata-tertib" onClick={closeAll} className={`block px-6 py-3.5 text-base ${getSubLinkStyle('/tata-tertib')}`}>Tata Tertib</Link>
                  <Link to="/modul" onClick={closeAll} className={`block px-6 py-3.5 text-base ${getSubLinkStyle('/modul')}`}>Modul</Link>
                  <Link to="/software-pajak" onClick={closeAll} className={`block px-6 py-3.5 text-base ${getSubLinkStyle('/software-pajak')}`}>Software Pajak</Link>
                  <a href="https://pajak.go.id/" target="_blank" rel="noreferrer" onClick={closeAll} className="block px-6 py-3.5 text-base text-blue-600 hover:bg-blue-50/80">Portal DJP</a>
                </div>
              )}
            </div>

            <div className="relative group/item">
              <button onClick={() => toggleDropdown('informasi')} className={`flex items-center gap-1.5 focus:outline-none transition-colors ${getDropdownStyle('informasi')}`}>
                Informasi <svg className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'informasi' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {activeDropdown === 'informasi' && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-7 w-64 bg-white/95 backdrop-blur-xl border border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] rounded-2xl overflow-hidden py-3 animate-in fade-in slide-in-from-top-4 duration-300 ring-1 ring-black/5">
                  <Link to="/oprec" onClick={closeAll} className={`block px-6 py-3.5 text-base ${isActive('/oprec') ? 'text-orange-600 font-extrabold bg-orange-50' : 'text-orange-500 font-bold hover:bg-orange-50/80'}`}>Oprec</Link>
                  <Link to="/lokasi" onClick={closeAll} className={`block px-6 py-3.5 text-base ${getSubLinkStyle('/lokasi')}`}>Lokasi</Link>
                  <Link to="/faq" onClick={closeAll} className={`block px-6 py-3.5 text-base ${getSubLinkStyle('/faq')}`}>FAQ</Link>
                </div>
              )}
            </div>

            <Link to="/kontak" onClick={closeAll} className={`transition-colors relative group ${getLinkStyle('/kontak')}`}>
              Kontak
              <span className={`absolute -bottom-1.5 left-0 w-0 h-0.5 transition-all group-hover:w-full ${useWhiteText ? 'bg-white' : 'bg-orange-500'}`}></span>
            </Link>
          </div>

          {/* === BALANCER / KANAN (TOMBOL MOBILE) === */}
          <div className={`flex justify-end transition-all duration-500 ease-in-out ${isScrolled ? 'flex-1' : 'w-auto'}`}>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-1.5 sm:p-2 md:p-2.5 rounded-full focus:outline-none transition-colors ${useWhiteText ? 'text-white bg-white/20 hover:bg-white/30' : 'text-purple-900 bg-purple-50 hover:bg-purple-100'}`}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} /></svg>
            </button>
          </div>

        </div>

        {/* 📉 SCROLL PROGRESS LINE */}
        <div className={`absolute inset-0 pointer-events-none overflow-hidden transition-all duration-500 ${isScrolled ? 'rounded-full md:rounded-[2.5rem]' : 'rounded-none'}`}>
          <div 
            className="absolute bottom-0 left-0 h-[4px] bg-gradient-to-r from-purple-800 to-orange-500 transition-all duration-150 ease-out shadow-[0_0_12px_rgba(249,115,22,0.4)]"
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>

        {/* === MOBILE OVERLAY MENU === */}
        <div className={`lg:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-300 ease-in-out bg-white/95 backdrop-blur-xl shadow-2xl rounded-b-[2.5rem] ${isMobileMenuOpen ? 'max-h-[85vh] opacity-100 border-t border-gray-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col gap-2 pb-8 font-bold text-gray-700 overflow-y-auto px-5 pt-5 text-lg md:text-xl">
            <Link to="/" onClick={closeAll} className={`py-4 px-5 rounded-xl transition-colors ${isActive('/') ? 'bg-purple-50 text-purple-800' : 'hover:bg-purple-50'}`}>Beranda</Link>
            
            <div className="flex flex-col">
              <button onClick={() => toggleDropdown('m-profil')} className={`flex justify-between items-center py-4 px-5 rounded-xl transition-colors ${activeDropdown === 'm-profil' || isParentActive('profil') ? 'bg-purple-50/50 text-purple-800' : 'hover:bg-purple-50'}`}>
                Profil <svg className={`w-5 h-5 transition-transform duration-300 ${activeDropdown === 'm-profil' ? 'rotate-180 text-orange-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${activeDropdown === 'm-profil' ? 'max-h-80 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                <div className="bg-gray-50 rounded-2xl mx-2 flex flex-col py-3">
                  <Link to="/tentang-kami" onClick={closeAll} className={`px-6 py-3.5 text-base md:text-lg ${getSubLinkStyle('/tentang-kami')}`}>Tentang Kami</Link>
                  <Link to="/team" onClick={closeAll} className={`px-6 py-3.5 text-base md:text-lg ${getSubLinkStyle('/team')}`}>Team</Link>
                  <Link to="/staff" onClick={closeAll} className={`px-6 py-3.5 text-base md:text-lg ${getSubLinkStyle('/staff')}`}>Staff</Link>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <button onClick={() => toggleDropdown('m-layanan')} className={`flex justify-between items-center py-4 px-5 rounded-xl transition-colors ${activeDropdown === 'm-layanan' || isParentActive('layanan') ? 'bg-purple-50/50 text-purple-800' : 'hover:bg-purple-50'}`}>
                Layanan <svg className={`w-5 h-5 transition-transform duration-300 ${activeDropdown === 'm-layanan' ? 'rotate-180 text-orange-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${activeDropdown === 'm-layanan' ? 'max-h-80 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                <div className="bg-gray-50 rounded-2xl mx-2 flex flex-col py-3">
                  <Link to="/tata-tertib" onClick={closeAll} className={`px-6 py-3.5 text-base md:text-lg ${getSubLinkStyle('/tata-tertib')}`}>Tata Tertib</Link>
                  <Link to="/modul" onClick={closeAll} className={`px-6 py-3.5 text-base md:text-lg ${getSubLinkStyle('/modul')}`}>Modul</Link>
                  <Link to="/software-pajak" onClick={closeAll} className={`px-6 py-3.5 text-base md:text-lg ${getSubLinkStyle('/software-pajak')}`}>Software Pajak</Link>
                  {/* INI LINK PORTAL DJP DI MOBILE */}
                  <a href="https://pajak.go.id/" target="_blank" rel="noreferrer" onClick={closeAll} className="px-6 py-3.5 text-base md:text-lg text-blue-600 hover:bg-blue-50/80">Portal DJP</a>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <button onClick={() => toggleDropdown('m-informasi')} className={`flex justify-between items-center py-4 px-5 rounded-xl transition-colors ${activeDropdown === 'm-informasi' || isParentActive('informasi') ? 'bg-purple-50/50 text-purple-800' : 'hover:bg-purple-50'}`}>
                Informasi <svg className={`w-5 h-5 transition-transform duration-300 ${activeDropdown === 'm-informasi' ? 'rotate-180 text-orange-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${activeDropdown === 'm-informasi' ? 'max-h-80 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                <div className="bg-gray-50 rounded-2xl mx-2 flex flex-col py-3">
                  <Link to="/oprec" onClick={closeAll} className={`px-6 py-3.5 text-base md:text-lg ${isActive('/oprec') ? 'text-orange-600 font-extrabold bg-orange-50' : 'text-orange-500 hover:bg-orange-50/80'}`}>Oprec</Link>
                  <Link to="/lokasi" onClick={closeAll} className={`px-6 py-3.5 text-base md:text-lg ${getSubLinkStyle('/lokasi')}`}>Lokasi</Link>
                  <Link to="/faq" onClick={closeAll} className={`px-6 py-3.5 text-base md:text-lg ${getSubLinkStyle('/faq')}`}>FAQ</Link>
                </div>
              </div>
            </div>

            <Link to="/kontak" onClick={closeAll} className={`py-4 px-5 rounded-xl transition-colors ${isActive('/kontak') ? 'bg-purple-50 text-purple-800' : 'hover:bg-purple-50'}`}>Kontak</Link>
          </div>
        </div>
      </nav>
    </div>
  );
}