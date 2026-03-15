import { useEffect, useState, useRef } from 'react';
import { DownloadIcon, GuideIcon } from './SoftwareIcons'; // AppIcon udah dihapus

// =========================================
// KOMPONEN KARTU SOFTWARE (GPU ACCELERATED)
// =========================================
export default function SoftwareCard({ app }) {
  const [isActive, setIsActive] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    let delay;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          delay = setTimeout(() => setIsActive(true), 100);
        } else {
          clearTimeout(delay);
          setIsActive(false);
        }
      },
      // Sensor aktif pas kartu ada di area tengah layar HP
      { rootMargin: "-20% 0px -20% 0px", threshold: 0 } 
    );
    
    if (cardRef.current) observer.observe(cardRef.current);
    return () => {
      if (delay) clearTimeout(delay);
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  return (
    <article 
      ref={cardRef}
      className={`group bg-white rounded-[2.5rem] p-8 border transition-all duration-500 flex flex-col justify-between transform-gpu will-change-transform
        /* EFEK PC */
        md:border-slate-200 md:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] md:hover:shadow-xl md:hover:-translate-y-2 md:hover:border-purple-300
        
        /* EFEK HP */
        ${isActive 
          ? 'max-md:shadow-xl max-md:-translate-y-2 max-md:border-purple-300' 
          : 'max-md:border-slate-200 max-md:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] max-md:translate-y-0'}
      `}
    >
      <div>
        {/* Header Kartu: Logo Berbeda-beda & Versi */}
        <div className="flex justify-between items-start mb-8">
          
          <div className={`${app.theme.bg} ${app.theme.border} border p-4 rounded-2xl transition-transform duration-500 transform-gpu flex items-center justify-center
            md:group-hover:scale-110
            ${isActive ? 'max-md:scale-110' : 'max-md:scale-100'}
          `}>
            {/* GAMBAR LOGO SOFTWARE DARI JSON LU */}
            <img 
              src={app.icon} 
              alt={`Logo ${app.name}`} 
              loading="lazy"
              className="w-10 h-10 object-contain drop-shadow-sm"
              onError={(e) => { e.target.src = "https://placehold.co/100x100/e2e8f0/475569?text=APP" }}
            />
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <span className="bg-slate-100 text-slate-600 font-extrabold px-3 py-1 rounded-full text-[10px] tracking-widest border border-slate-200">
              {app.version}
            </span>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
              {app.os}
            </span>
          </div>
        </div>

        {/* Deskripsi Aplikasi */}
        <h3 className={`text-2xl font-bold mb-3 transition-colors duration-500
          md:text-slate-900 md:group-hover:text-purple-800
          ${isActive ? 'max-md:text-slate-900' : 'max-md:text-slate-900'}
        `}>
          {app.name}
        </h3>
        <p className="text-slate-500 text-[14px] leading-relaxed mb-8">
          {app.desc}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 mt-auto">
        {app.guideLink && (
          <a 
            href={app.guideLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold rounded-xl transition-colors border border-orange-200"
          >
            <GuideIcon />
            <span>Panduan Instalasi</span>
          </a>
        )}
        
        <a 
          href={app.linkDrive}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 w-full py-3.5 px-4 font-bold rounded-xl transition-all duration-500 shadow-md transform-gpu
            md:bg-slate-900 md:text-white md:hover:bg-purple-900 md:hover:scale-[1.02]
            ${isActive ? 'max-md:bg-slate-900 max-md:text-white max-md:scale-[1.02]' : 'max-md:bg-slate-900 max-md:text-white max-md:scale-100'}
          `}
        >
          <DownloadIcon />
          <span>Download via Drive</span>
        </a>
      </div>

    </article>
  );
}