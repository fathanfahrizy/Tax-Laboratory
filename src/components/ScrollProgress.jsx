import { useEffect, useRef } from 'react';

export default function ScrollProgress({ isScrolled }) {
  const progressBarRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
          
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${progress}%`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden transition-all duration-300 ${isScrolled ? 'rounded-full md:rounded-[2.5rem]' : 'rounded-none'}`}>
      <div 
        ref={progressBarRef}
        className="absolute bottom-0 left-0 h-[4px] bg-gradient-to-r from-purple-800 to-orange-500 transition-none ease-out shadow-[0_0_12px_rgba(249,115,22,0.4)] transform-gpu"
        style={{ width: '0%' }}
      ></div>
    </div>
  );
}