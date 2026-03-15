import { Link } from 'react-router-dom';

export default function MobileMenu({ isMobileMenuOpen, toggleDropdown, activeDropdown, isActive, getSubLinkStyle, closeAll }) {
  return (
    <div 
      className={`lg:hidden absolute top-full left-0 w-full transition-[opacity,transform,visibility] duration-300 ease-out transform-gpu origin-top
        ${isMobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}
      `}
    >
      <div className="bg-white shadow-2xl rounded-b-[2rem] border-t border-gray-100 flex flex-col gap-1 p-5 font-bold text-gray-700 text-base max-h-[85vh] overflow-y-auto will-change-scroll">
        <Link to="/" onClick={closeAll} className={`p-4 rounded-xl transition-colors ${isActive('/') ? 'bg-purple-50 text-purple-800' : 'hover:bg-purple-50'}`}>Beranda</Link>
        
        {/* Mobile Profil */}
        <div className="flex flex-col">
          <button onClick={() => toggleDropdown('m-profil')} className={`flex justify-between items-center p-4 rounded-xl transition-colors ${activeDropdown === 'm-profil' ? 'bg-purple-50/50 text-purple-800' : 'hover:bg-purple-50'}`}>
            Profil <svg className={`w-5 h-5 transition-transform duration-300 ${activeDropdown === 'm-profil' ? 'rotate-180 text-orange-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          {/* OPTIMASI: Ganti Grid dengan Max-Height + Spesifik Transition (Anti-Lag) */}
          <div className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out transform-gpu ${activeDropdown === 'm-profil' ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="bg-gray-50 rounded-2xl mx-2 flex flex-col py-2 border border-gray-100 mt-1 mb-2">
              <Link to="/tentang-kami" onClick={closeAll} className={`px-6 py-3 transition-colors ${getSubLinkStyle('/tentang-kami')}`}>Tentang Kami</Link>
              <Link to="/team" onClick={closeAll} className={`px-6 py-3 transition-colors ${getSubLinkStyle('/team')}`}>Team</Link>
              <Link to="/staff" onClick={closeAll} className={`px-6 py-3 transition-colors ${getSubLinkStyle('/staff')}`}>Staff</Link>
            </div>
          </div>
        </div>

        {/* Mobile Layanan */}
        <div className="flex flex-col">
          <button onClick={() => toggleDropdown('m-layanan')} className={`flex justify-between items-center p-4 rounded-xl transition-colors ${activeDropdown === 'm-layanan' ? 'bg-purple-50/50 text-purple-800' : 'hover:bg-purple-50'}`}>
            Layanan <svg className={`w-5 h-5 transition-transform duration-300 ${activeDropdown === 'm-layanan' ? 'rotate-180 text-orange-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          <div className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out transform-gpu ${activeDropdown === 'm-layanan' ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="bg-gray-50 rounded-2xl mx-2 flex flex-col py-2 border border-gray-100 mt-1 mb-2">
              <Link to="/tata-tertib" onClick={closeAll} className={`px-6 py-3 transition-colors ${getSubLinkStyle('/tata-tertib')}`}>Tata Tertib</Link>
              <Link to="/modul" onClick={closeAll} className={`px-6 py-3 transition-colors ${getSubLinkStyle('/modul')}`}>Modul</Link>
              <Link to="/software-pajak" onClick={closeAll} className={`px-6 py-3 transition-colors ${getSubLinkStyle('/software-pajak')}`}>Software Pajak</Link>
              <a href="https://djponline.pajak.go.id/" target="_blank" rel="noreferrer" onClick={closeAll} className="px-6 py-3 transition-colors text-blue-600">Portal DJP</a>
            </div>
          </div>
        </div>

        {/* Mobile Informasi */}
        <div className="flex flex-col">
          <button onClick={() => toggleDropdown('m-informasi')} className={`flex justify-between items-center p-4 rounded-xl transition-colors ${activeDropdown === 'm-informasi' ? 'bg-purple-50/50 text-purple-800' : 'hover:bg-purple-50'}`}>
            Informasi <svg className={`w-5 h-5 transition-transform duration-300 ${activeDropdown === 'm-informasi' ? 'rotate-180 text-orange-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          <div className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out transform-gpu ${activeDropdown === 'm-informasi' ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="bg-gray-50 rounded-2xl mx-2 flex flex-col py-2 border border-gray-100 mt-1 mb-2">
              <Link to="/oprec" onClick={closeAll} className={`px-6 py-3 transition-colors ${isActive('/oprec') ? 'text-orange-600' : 'text-orange-500'}`}>Oprec</Link>
              <Link to="/lokasi" onClick={closeAll} className={`px-6 py-3 transition-colors ${getSubLinkStyle('/lokasi')}`}>Lokasi</Link>
              <Link to="/faq" onClick={closeAll} className={`px-6 py-3 transition-colors ${getSubLinkStyle('/faq')}`}>FAQ</Link>
            </div>
          </div>
        </div>

        <Link to="/kontak" onClick={closeAll} className={`p-4 rounded-xl transition-colors ${isActive('/kontak') ? 'bg-purple-50 text-purple-800' : 'hover:bg-purple-50'}`}>Kontak</Link>
      </div>
    </div>
  );
}