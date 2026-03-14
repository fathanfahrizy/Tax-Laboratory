import { useState, useRef, useEffect } from 'react';

// =========================================
// KOMPONEN: LIST ITEM INTERAKTIF (GPU ACCELERATED)
// =========================================
export const RuleItem = ({ letter, children }) => {
  const [isActive, setIsActive] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      { rootMargin: "-30% 0px -30% 0px", threshold: 0 }
    );
    if (itemRef.current) observer.observe(itemRef.current);
    return () => { if (itemRef.current) observer.unobserve(itemRef.current); };
  }, []);

  return (
    <li 
      ref={itemRef}
      className={`group flex gap-4 sm:gap-5 items-start p-4 rounded-2xl transition-all duration-300 border transform-gpu will-change-transform
        md:border-transparent md:bg-transparent md:translate-y-0
        md:hover:bg-slate-50/80 md:hover:border-slate-100 md:hover:shadow-sm md:hover:-translate-y-0.5
        ${isActive ? 'max-md:bg-slate-50/80 max-md:border-slate-100 max-md:shadow-sm max-md:-translate-y-0.5' : 'max-md:border-transparent max-md:translate-y-0'}
      `}
    >
      <span className={`flex items-center justify-center w-7 h-7 rounded-full font-bold text-xs shrink-0 mt-0.5 transition-colors duration-300 transform-gpu
        md:bg-slate-100 md:text-slate-500 md:group-hover:bg-slate-900 md:group-hover:text-white
        ${isActive ? 'max-md:bg-slate-900 max-md:text-white' : 'max-md:bg-slate-100 max-md:text-slate-500'}
      `}>
        {letter}
      </span>
      <div className="leading-relaxed text-[15px] pt-1 text-slate-900">
        {children}
      </div>
    </li>
  );
};

// =========================================
// KOMPONEN: LIST ITEM KHUSUS WARNA MERAH (RULE G)
// =========================================
export const SpecialRuleItem = ({ letter, children }) => {
  const [isActive, setIsActive] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      { rootMargin: "-30% 0px -30% 0px", threshold: 0 }
    );
    if (itemRef.current) observer.observe(itemRef.current);
    return () => { if (itemRef.current) observer.unobserve(itemRef.current); };
  }, []);

  return (
    <li 
      ref={itemRef}
      className={`group flex gap-4 sm:gap-5 items-start p-4 rounded-2xl border transition-all duration-300 mt-2 transform-gpu will-change-transform
        md:bg-rose-50 md:border-rose-100 md:translate-y-0
        md:hover:border-rose-300 md:hover:bg-rose-100 md:hover:shadow-sm md:hover:-translate-y-0.5
        ${isActive ? 'max-md:border-rose-300 max-md:bg-rose-100 max-md:shadow-sm max-md:-translate-y-0.5' : 'max-md:bg-rose-50 max-md:border-rose-100 max-md:translate-y-0'}
      `}
    >
      <span className={`flex items-center justify-center w-7 h-7 rounded-full font-bold text-xs shrink-0 mt-0.5 transition-colors duration-300 transform-gpu
        md:bg-rose-200 md:text-rose-800 md:group-hover:bg-rose-600 md:group-hover:text-white
        ${isActive ? 'max-md:bg-rose-600 max-md:text-white' : 'max-md:bg-rose-200 max-md:text-rose-800'}
      `}>
        {letter}
      </span>
      <div className="text-rose-800 leading-relaxed text-[15px] pt-1 font-medium">
        {children}
      </div>
    </li>
  );
};

export const WarningIcon = () => (
  <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);