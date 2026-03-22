export default function StaffCard({ staff }) {
  return (
    <article className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-300 flex flex-col transform-gpu">
      
      {/* Container Foto - Rasio Portrait Formal */}
      <div className="relative w-full aspect-[4/5] bg-gradient-to-b from-slate-100 to-slate-200 flex items-end justify-center overflow-hidden">
        
        {/* Ornamen Latar Belakang Lingkaran Halus (Sangat Ringan) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 aspect-square bg-white/40 rounded-full blur-2xl pointer-events-none"></div>

        {/* Foto Utama Pimpinan - Satu Gambar Saja (Anti-Lag) */}
        <img 
          src={staff.img} 
          alt={`Foto ${staff.role} TaxLaboratorium - ${staff.name}`} 
          loading="lazy"
          decoding="async"
          onError={(e) => { e.target.src = "https://api.dicebear.com/8.x/initials/svg?seed=Dosen&backgroundColor=e2e8f0&fontFamily=Arial&fontWeight=600" }}
          className="w-[90%] h-[90%] object-cover sm:object-contain object-bottom transition-transform duration-500 group-hover:scale-105 relative z-10 transform-gpu drop-shadow-md" 
        />
      </div>

      {/* Detail Konten - Tipografi Klasik & Elegan */}
      <div className="p-6 md:p-8 flex flex-col flex-grow text-center bg-white">
        
        {/* Jabatan */}
        <span className="text-xs font-bold tracking-[0.15em] uppercase text-purple-800 mb-3">
          {staff.role}
        </span>
        
        {/* Nama */}
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 leading-snug">
          {staff.name}
        </h3>
        
        {/* Garis Aksentuasi Klasik */}
        <div className="w-10 h-1 bg-orange-500 mx-auto mb-4 rounded-full"></div>
        
        {/* Kepakaran */}
        <p className="text-slate-600 text-sm mb-8 flex-grow leading-relaxed">
          {staff.expertise}
        </p>

        {/* Tombol Kontak Formal */}
        <a 
          href={`mailto:${staff.email}`}
          aria-label={`Kirim email ke ${staff.name}`}
          className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 bg-transparent border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-900 hover:border-slate-900 hover:text-white transition-all duration-300 text-sm focus:outline-none focus:ring-4 focus:ring-slate-100"
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