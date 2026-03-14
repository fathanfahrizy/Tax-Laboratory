import { useState, useRef, useEffect } from 'react';

export const CheckIcon = () => (
  <svg className="w-6 h-6 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
);

export const CloseIcon = () => (
  <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
);

export const ScrollRevealCard = ({ children, className = "" }) => {
  const [isActive, setIsActive] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    let delay;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) delay = setTimeout(() => setIsActive(true), 100); 
        else { clearTimeout(delay); setIsActive(false); }
      },
      { rootMargin: "-20% 0px -20% 0px", threshold: 0 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => { if (delay) clearTimeout(delay); if (cardRef.current) observer.unobserve(cardRef.current); };
  }, []);

  return (
    <div ref={cardRef} className={`${className} transform-gpu will-change-transform transition-all duration-300 ${isActive ? 'max-lg:!border-orange-300 max-lg:!shadow-xl max-lg:-translate-y-2 max-lg:[&_div>svg]:scale-110 max-lg:[&_div>svg]:text-white max-lg:[&>div:first-child]:bg-orange-500 max-lg:[&>span]:text-orange-50' : ''}`}>
      {children}
    </div>
  );
};

export const TimelineRevealItem = ({ isLeft, alur }) => {
  const [isActive, setIsActive] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    let delay;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) delay = setTimeout(() => setIsActive(true), 150);
        else { clearTimeout(delay); setIsActive(false); }
      },
      { rootMargin: "-25% 0px -25% 0px", threshold: 0 }
    );
    if (itemRef.current) observer.observe(itemRef.current);
    return () => { if (delay) clearTimeout(delay); if (itemRef.current) observer.unobserve(itemRef.current); };
  }, []);

  return (
    <div ref={itemRef} className="relative w-full group py-2 md:py-6 transform-gpu will-change-transform">
      <div className={`absolute left-[35px] md:left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 border-[4px] rounded-full flex items-center justify-center text-xl font-black z-20 transition-all duration-300 shadow-sm
        md:bg-white md:border-slate-200 md:text-slate-400 md:group-hover:border-indigo-500 md:group-hover:bg-indigo-500 md:group-hover:text-white
        ${isActive ? 'max-md:border-indigo-500 max-md:bg-indigo-500 max-md:text-white max-md:scale-110' : 'max-md:bg-white max-md:border-slate-200 max-md:text-slate-400'}
      `}>
        {alur.step}
      </div>

      <div className={`w-[calc(100%-80px)] ml-auto md:w-[45%] ${isLeft ? 'md:ml-0 md:mr-auto' : 'md:ml-auto md:mr-0'}`}>
        <div className={`p-6 md:p-8 rounded-[1.5rem] border transition-all duration-300 relative z-10 ${isLeft ? 'md:text-right' : 'md:text-left'}
          md:bg-white md:border-slate-200 md:shadow-sm md:group-hover:shadow-lg md:group-hover:-translate-y-1 md:group-hover:border-indigo-200
          ${isActive ? 'max-md:bg-white max-md:shadow-lg max-md:-translate-y-1 max-md:border-indigo-200' : 'max-md:bg-white max-md:border-slate-200 max-md:shadow-sm max-md:translate-y-0'}
        `}>
          <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rotate-45 border-slate-200 ${isLeft ? '-right-2 border-t border-r' : '-left-2 border-b border-l'}`}></div>
          <div className={`inline-block font-black text-[0.65rem] uppercase tracking-widest py-1.5 px-3 rounded-lg mb-3 border transition-colors
            md:bg-orange-50 md:text-orange-600 md:border-orange-100 md:group-hover:bg-orange-500 md:group-hover:text-white
            ${isActive ? 'max-md:bg-orange-500 max-md:text-white max-md:border-orange-500' : 'max-md:bg-orange-50 max-md:text-orange-600 max-md:border-orange-100'}
          `}>
            {alur.date}
          </div>
          <h4 className={`text-xl font-black mb-2 transition-colors
            md:text-slate-900 md:group-hover:text-indigo-600
            ${isActive ? 'max-md:text-indigo-600' : 'max-md:text-slate-900'}
          `}>
            {alur.title}
          </h4>
          <p className="text-slate-500 text-sm font-medium leading-relaxed">{alur.desc}</p>
        </div>
      </div>
    </div>
  );
};