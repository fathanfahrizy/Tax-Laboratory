import { useEffect, useState, useRef } from 'react';

// =========================================
// KOMPONEN: SCROLL REVEAL CARD (GPU ACCELERATED)
// =========================================
export default function ContactCard({ children, className = "", delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => { if (cardRef.current) observer.unobserve(cardRef.current); };
  }, [delay]);

  return (
    <div 
      ref={cardRef}
      className={`${className} transition-all duration-700 transform-gpu will-change-transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}
    >
      {children}
    </div>
  );
}