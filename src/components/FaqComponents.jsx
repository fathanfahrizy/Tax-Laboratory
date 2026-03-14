// =========================================
// ICONS (PURE SVG STATIS)
// =========================================
export const ChevronIcon = ({ className }) => (
  <svg className={`w-6 h-6 shrink-0 transition-transform duration-300 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
  </svg>
);

export const ChatBubbleIcon = () => (
  <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
  </svg>
);

// =========================================
// KOMPONEN ITEM FAQ
// =========================================
export const FaqItem = ({ f, index, active, toggleFaq }) => {
  const isActive = active === index;
  
  return (
    <article 
      className={`bg-white rounded-[1.5rem] border transition-all duration-300 shadow-sm
        ${isActive 
          ? 'border-purple-400 ring-4 ring-purple-50 shadow-md' 
          : 'border-slate-200 hover:border-orange-300 hover:shadow-md hover:-translate-y-0.5'
        }
      `}
    >
      {/* QUESTION BUTTON */}
      <button 
        onClick={() => toggleFaq(index)} 
        aria-expanded={isActive}
        className="w-full px-6 py-6 text-left flex justify-between items-center gap-6 focus:outline-none"
      >
        <h3 className={`text-lg font-bold transition-colors duration-300 pr-4 leading-snug
          ${isActive ? 'text-purple-900' : 'text-slate-800'}
        `}>
          {f.q}
        </h3>
        
        {/* ICON WRAPPER: Berubah warna dan muter kalau aktif */}
        <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 shrink-0
          ${isActive ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-500'}
        `}>
          <ChevronIcon className={isActive ? 'rotate-180' : 'rotate-0'} />
        </div>
      </button>
      
      {/* ANSWER CONTENT (ANIMASI SLIDE DOWN CSS GRID) */}
      <div 
        className={`grid transition-all duration-300 ease-in-out
          ${isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
        `}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 text-slate-600 font-medium leading-relaxed border-t border-slate-50 pt-4 mt-2">
            {f.a}
          </p>
        </div>
      </div>
    </article>
  );
};