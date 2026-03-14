import { useEffect, useState, useRef } from 'react';
import { PdfIcon, ViewIcon } from './ModulIcons';

// =========================================
// KOMPONEN KARTU MODUL (GPU ACCELERATED)
// =========================================
export default function ModulCard({ modul }) {
  const [fileSize, setFileSize] = useState("Loading...");
  const [fileExt, setFileExt] = useState("FILE");
  
  const [isActive, setIsActive] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    let delay;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          delay = setTimeout(() => setIsActive(true), 150);
        } else {
          clearTimeout(delay);
          setIsActive(false);
        }
      },
      { rootMargin: "-25% 0px -25% 0px", threshold: 0 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => {
      if (delay) clearTimeout(delay);
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  // Fetch Ukuran File secara Asynchronous (Tidak nge-block halaman)
  useEffect(() => {
    let isMounted = true;
    const extension = modul.link.split('.').pop().toUpperCase();
    setFileExt(extension);

    const fetchFileSize = async () => {
      try {
        const response = await fetch(modul.link, { method: 'HEAD' });
        if (response.ok && isMounted) {
          const bytes = response.headers.get('content-length');
          if (bytes) {
            const mbSize = (bytes / (1024 * 1024)).toFixed(2);
            setFileSize(`${mbSize} MB`);
          } else {
            setFileSize("Unknown Size");
          }
        } else if (isMounted) {
          setFileSize("File Not Found");
        }
      } catch (error) {
        if (isMounted) setFileSize("Failed to load");
      }
    };

    fetchFileSize();
    return () => { isMounted = false; } // Cleanup API call kalau komponen di-unmount
  }, [modul.link]);

  return (
    <article 
      ref={cardRef}
      className={`group bg-white rounded-[2rem] p-8 border transition-all duration-300 flex flex-col justify-between transform-gpu will-change-transform
        md:border-slate-200 md:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] md:hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] md:hover:-translate-y-1
        ${isActive ? 'max-md:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] max-md:-translate-y-1 max-md:border-purple-200' : 'max-md:border-slate-200 max-md:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] max-md:translate-y-0'}
      `}
    >
      <div>
        <div className="flex justify-between items-start mb-6">
          <div className={`p-4 rounded-2xl border transition-colors duration-300 text-rose-500 transform-gpu
            md:bg-rose-50 md:border-rose-100 md:group-hover:bg-rose-100
            ${isActive ? 'max-md:bg-rose-100 max-md:border-rose-200' : 'max-md:bg-rose-50 max-md:border-rose-100'}
          `}>
            <PdfIcon />
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <span className="bg-slate-100 text-slate-500 font-bold px-3 py-1 rounded-full text-[11px] tracking-wider border border-slate-200">
              {fileExt} DOCUMENT
            </span>
          </div>
        </div>

        <h2 className={`text-2xl font-bold mb-3 transition-colors duration-300
          md:text-slate-900 md:group-hover:text-purple-900
          ${isActive ? 'max-md:text-purple-900' : 'max-md:text-slate-900'}
        `}>
          {modul.title}
        </h2>
        <p className="text-slate-500 text-[15px] leading-relaxed mb-8 line-clamp-3">
          {modul.description}
        </p>
      </div>

      <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex flex-wrap gap-3">
          <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-2">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Size:</span>
            <span className="text-slate-700 text-sm font-bold">{fileSize}</span>
          </div>
          <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-2">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Pages:</span>
            <span className="text-slate-700 text-sm font-bold">{modul.pages}</span>
          </div>
        </div>

        <a 
          href={modul.link} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label={`Baca Modul: ${modul.title}`}
          className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-purple-900 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-300 shadow-sm"
        >
          <ViewIcon />
          <span>Baca Modul</span>
        </a>
      </div>
    </article>
  );
}