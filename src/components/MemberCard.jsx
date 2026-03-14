import { useRef, useEffect, useState } from 'react';

// =========================================
// KOMPONEN: SPOTLIGHT CARD (ANTI-LAG 60FPS GPU)
// =========================================
export function SpotlightCard({ children, className = "" }) {
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    requestAnimationFrame(() => {
      const rect = divRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      divRef.current.style.setProperty('--mouse-x', `${x}px`);
      divRef.current.style.setProperty('--mouse-y', `${y}px`);
    });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`relative w-full h-full overflow-hidden rounded-[2.5rem] transition-all duration-500 group/card will-change-transform transform-gpu
          /* === GRADIENT & VOLUME 3D TERLUAR === */
          bg-gradient-to-br from-purple-950 via-purple-800 to-orange-400 
          border border-white/20 border-b-black/40 border-r-black/40
          shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),_0_10px_20px_rgba(0,0,0,0.3)] 
          lg:hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),_0_25px_50px_rgba(0,0,0,0.5),_0_0_40px_rgba(249,115,22,0.2)] 
          lg:hover:-translate-y-3 lg:hover:scale-[1.03]
          ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-0 group-hover/card:opacity-100 hidden lg:block transform-gpu"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.15), transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}

// =========================================
// IKON SOSMED (SVG STATIS)
// =========================================
const InIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>;
const IgIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;

// =========================================
// KOMPONEN: MEMBER CARD UTAMA
// =========================================
export default function MemberCard({ member }) {
  const [inView, setInView] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    let delayTimeout;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          delayTimeout = setTimeout(() => {
            setInView(true);
          }, 150); // Delay diturunkan biar lebih responsif pas scroll cepet
        } else {
          clearTimeout(delayTimeout);
          setInView(false);
          setIsTapped(false);
        }
      },
      { 
        rootMargin: "0px 0px -50px 0px", 
        threshold: 0.1 
      } 
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (delayTimeout) clearTimeout(delayTimeout);
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  return (
    <div ref={cardRef} className="h-full w-full relative">
      <SpotlightCard className="p-5 flex flex-col items-center text-center justify-between !bg-none relative">
        
        {/* Background Terluar */}
        <div 
          className="absolute -inset-5 z-[-1] rounded-[2.5rem] bg-cover bg-center bg-no-repeat transform-gpu will-change-transform"
          style={{ backgroundImage: `url('/img-template/template.png')` }}
        >
          <div className="absolute inset-0 bg-black/20 rounded-[2.5rem]"></div>
        </div>

        {/* CONTAINER FOTO */}
        <div 
          className="relative w-full aspect-square rounded-[2rem] overflow-hidden mb-5 group/img cursor-pointer flex items-end justify-center border border-white shadow-[inset_0px_-8px_15px_rgba(0,0,0,0.08),_0_5px_15px_rgba(0,0,0,0.1)] bg-repeat transform-gpu"
          style={{ 
            backgroundImage: "url('/img-template/background.png')", 
            backgroundSize: '100%' 
          }}
          onClick={() => setIsTapped(!isTapped)}
        >
          
          {/* SILUET BAYANGAN (Dipercepat dengan transform-gpu) */}
          <img 
            src={member.img} 
            alt="" 
            loading="lazy"
            decoding="async"
            className={`absolute w-[90%] h-[90%] object-cover sm:object-contain object-bottom transition-all duration-700 z-0 grayscale contrast-200 brightness-50 transform-gpu will-change-transform
              ${inView ? 'opacity-30 scale-110 -translate-x-1.5' : 'opacity-0 scale-100 translate-x-0'}
              lg:opacity-30 lg:scale-100 lg:-translate-x-1
              lg:group-hover/img:scale-110 lg:group-hover/img:-translate-x-1.5
            `} 
          />

          {/* GAMBAR ORANG UTAMA (Dipercepat dengan transform-gpu) */}
          <img 
            src={member.img} 
            alt={`Anggota Lab Akuntansi Pajak - ${member.name}`} 
            loading="lazy"
            decoding="async"
            onError={(e) => { e.target.src = "https://api.dicebear.com/8.x/initials/svg?seed=TL&backgroundColor=f3f4f6&fontFamily=Arial&fontWeight=700" }}
            className={`w-[90%] h-[90%] object-cover sm:object-contain object-bottom transition-all duration-700 relative z-10 transform-gpu will-change-transform
              ${inView ? 'drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)] scale-110' : 'drop-shadow-none scale-100'}
              lg:drop-shadow-none lg:scale-100
              lg:group-hover/img:scale-110 lg:group-hover/img:drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)]
            `} 
          />
          
          {/* LOGIC GADGET: SOSMED */}
          <div className={`absolute inset-x-0 bottom-4 flex justify-center transition-all duration-500 z-20 transform-gpu
              ${isTapped ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
              lg:translate-y-12 lg:opacity-0 
              lg:group-hover/img:translate-y-0 lg:group-hover/img:opacity-100
          `}>
            <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-2xl flex gap-5 shadow-[0_10px_20px_rgba(0,0,0,0.2)] border border-gray-100">
              <a href={member.in} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-purple-900 hover:text-[#0A66C2] hover:-translate-y-1 transition-transform"><InIcon /></a>
              <a href={member.ig} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-purple-900 hover:text-[#E4405F] hover:-translate-y-1 transition-transform"><IgIcon /></a>
            </div>
          </div>
        </div>
        
        {/* Detail Nama & Jabatan */}
        <div className="flex flex-col items-center w-full flex-grow justify-end">
          <h3 className="text-[1.1rem] sm:text-xl font-black text-white mb-3 group-hover/card:text-orange-300 transition-colors drop-shadow-md line-clamp-2 min-h-[3.5rem] flex items-center justify-center">{member.name}</h3>
          <p className="text-white/95 font-bold text-xs uppercase tracking-widest bg-black/30 px-4 py-2 rounded-xl border-t border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] w-full whitespace-nowrap overflow-hidden text-ellipsis">
            {member.role}
          </p>
        </div>
      </SpotlightCard>
    </div>
  );
}