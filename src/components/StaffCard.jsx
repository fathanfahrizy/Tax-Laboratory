export default function StaffCard({ staff }) {
  return (
    <article className="group bg-white rounded-[2rem] border border-slate-200/60 p-2 sm:p-3 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col transform-gpu will-change-transform">
      {/* Container Foto - Rasio Portrait Formal */}
      <div className="relative w-full aspect-[4/5] bg-gradient-to-b from-slate-50 to-slate-100 rounded-[1.5rem] overflow-hidden mb-6 flex items-end justify-center transform-gpu">
        
        {/* Efek Siluet Halus (GPU Accelerated) */}
        <img 
          src={staff.img} 
          alt="" 
          loading="lazy"
          decoding="async"
          className="absolute w-[85%] h-[85%] object-cover sm:object-contain object-bottom -translate-x-1 opacity-10 grayscale contrast-200 transition-transform duration-700 group-hover:scale-105 group-hover:-translate-x-2 z-0 transform-gpu" 
        />

        {/* Foto Utama Pimpinan SEO Optimized */}
        <img 
          src={staff.img} 
          alt={`Foto ${staff.role} TaxLaboratorium - ${staff.name}`} 
          loading="lazy"
          decoding="async"
          onError={(e) => { e.target.src = "https://api.dicebear.com/8.x/initials/svg?seed=Dosen&backgroundColor=f1f5f9&fontFamily=Arial&fontWeight=600" }}
          className="w-[85%] h-[85%] object-cover sm:object-contain object-bottom drop-shadow-xl transition-transform duration-700 group-hover:scale-105 relative z-10 transform-gpu" 
        />
      </div>

      {/* Detail Konten - Tipografi Bersih */}
      <div className="px-6 pb-8 flex flex-col flex-grow text-center">
        <span className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
          {staff.role}
        </span>
        <h3 className="text-2xl font-bold text-slate-900 mb-2 leading-snug">
          {staff.name}
        </h3>
        <p className="text-slate-500 text-sm mb-6 flex-grow">
          {staff.expertise}
        </p>

        {/* Tombol Kontak Formal */}
        <a 
          href={`mailto:${staff.email}`}
          aria-label={`Kirim email ke ${staff.name}`}
          className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 bg-slate-50 hover:bg-slate-900 text-slate-700 hover:text-white text-sm font-semibold rounded-xl border border-slate-200 transition-colors duration-300"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Hubungi via Email
        </a>
      </div>
    </article>
  );
}