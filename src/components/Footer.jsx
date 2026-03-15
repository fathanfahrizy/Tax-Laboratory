import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* === GRID MENU UTAMA === */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-10">
          
          {/* KOLOM 1: BRANDING (Lebih Lebar) */}
          <div className="lg:col-span-2 pr-0 lg:pr-8">
            <div className="flex items-center gap-3 mb-4">
              {/* Bingkai Logo Minimalis */}
              <div className="w-10 h-10 bg-white rounded-lg p-1 border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                <img 
                  src="/img-template/LogoTaxLab.webp" 
                  alt="Logo TaxLab" 
                  loading="lazy"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Tax<span className="text-orange-500">Lab</span>
              </h3>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm mb-4">
              Laboratorium Akuntansi Lanjut B Universitas Gunadarma. Platform terpadu penyedia modul pembelajaran, piranti lunak, dan pusat informasi praktikum.
            </p>
          </div>

          {/* KOLOM 2: AKSES CEPAT */}
          <div>
            <h4 className="text-slate-900 font-bold mb-4 text-base">Akses Cepat</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link to="/modul" className="text-slate-500 hover:text-orange-500 transition-colors">Unduhan Modul</Link>
              </li>
              <li>
                <Link to="/software-pajak" className="text-slate-500 hover:text-orange-500 transition-colors">Software Pajak</Link>
              </li>
              <li>
                <Link to="/tata-tertib" className="text-slate-500 hover:text-orange-500 transition-colors">Tata Tertib Praktikum</Link>
              </li>
              <li>
                <Link to="/oprec" className="text-orange-500 hover:text-orange-600 font-bold transition-colors">Info Recruitment</Link>
              </li>
            </ul>
          </div>

          {/* KOLOM 3: HUBUNGI KAMI (Tanpa Icon) */}
          <div>
            <h4 className="text-slate-900 font-bold mb-4 text-base">Hubungi Kami</h4>
            <ul className="space-y-3 text-sm font-medium text-slate-500">
              <li>
                <Link to="/faq" className="hover:text-purple-800 transition-colors">Tanya Jawab (FAQ)</Link>
              </li>
              <li>
                <Link to="/kontak" className="hover:text-purple-800 transition-colors">Kontak Staff</Link>
              </li>
              <li>
                Email: <a href="mailto:labpajak@gunadarma.ac.id" className="hover:text-purple-800 transition-colors">taxlaboratory@gunadarma.ac.id</a>
              </li>
              <li>
                IG: <a href="https://instagram.com/taxlaboratory" target="_blank" rel="noreferrer" className="hover:text-purple-800 transition-colors">@taxlaboratory</a>
              </li>
            </ul>
          </div>

        </div>

        {/* === BOTTOM COPYRIGHT & EXTRA LINKS === */}
        <div className="border-t border-slate-100 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs font-medium text-center md:text-left">
            &copy; {new Date().getFullYear()} TaxLaboratorium Gunadarma. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-slate-400">
            <Link to="/tentang-kami" className="hover:text-slate-600 transition-colors">Tentang Kami</Link>
            <span className="hidden sm:inline">&bull;</span>
            <Link to="/team" className="hover:text-slate-600 transition-colors">Daftar Asisten</Link>
            <span className="hidden sm:inline">&bull;</span>
            <Link to="/lokasi" className="hover:text-slate-600 transition-colors">Lokasi Lab</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}