import React, { useRef } from 'react';
// Імпортуємо нашу нову спільну базу даних з 10 міфів
import { mockMyths } from '../../../data/myths'; 

// Ось цей самий хелпер, який перетворює текстову назву іконки на реальний SVG
const getMythIcon = (iconName) => {
  const baseClass = "w-16 h-16 stroke-[1.2]";
  
  switch (iconName) {
    case 'syringe':
      return (
        <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m18 2 4 4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m17 7 3-3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m9 11 4 4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m5 19-3 3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m14 4 6 6" />
        </svg>
      );
    case 'mask':
      return (
        <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case 'globe':
      return (
        <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      );
    case 'wifi':
      return (
        <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15c-1.046-1.045-1.688-2.49-1.688-4.085s.642-3.04 1.688-4.085m11.552 0c1.046 1.045 1.688 2.49 1.688 4.085s-.642 3.04-1.688 4.085m-9.144-2.894c-.39-.389-.629-.928-.629-1.523s.239-1.134.629-1.523m6.896 0c.39.389.629.928.629 1.523s-.239 1.134-.629 1.523m-3.448-1.523V21m0-11.5v-1.5" />
        </svg>
      );
    case 'book':
      return (
        <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    case 'shield':
      return (
        <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case 'archive':
      return (
        <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      );
    default:
      return (
        <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
        </svg>
      );
  }
};

const HomePopularMyths = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 my-16">
      <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-8 text-center md:text-left">
        Популярні міфи
      </h2>

      <div className="relative group">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 bg-white border border-brand-dark/15 shadow-lg text-brand-dark hover:text-brand-blue rounded-full p-2.5 transition-all hidden md:block cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory py-4 px-2 -mx-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
        >
          {/* Проходимося по масиву mockMyths, імпортованому з файлу */}
          {mockMyths.map((myth) => (
            <div 
              key={myth.id} 
              className="min-w-[260px] md:min-w-[280px] snap-start bg-white border border-brand-dark/15 rounded-2xl p-6 flex flex-col items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
            >
              
              {/* Тут ми викликаємо хелпер і передаємо йому текстове поле iconName */}
              <div className="text-brand-blue mb-6">
                {getMythIcon(myth.iconName)}
              </div>

              <h3 className="text-lg font-bold text-brand-dark text-center mb-8 h-12 flex items-center justify-center">
                {myth.title}
              </h3>

              <div className="w-full flex items-center justify-between mt-auto">
                <span className="text-xs font-bold text-brand-blue bg-brand-light border border-brand-blue/10 px-3 py-1 rounded-md">
                  {myth.category}
                </span>
                <span className="text-xs text-brand-dark/50 font-medium">
                  {myth.readTime}
                </span>
              </div>

            </div>
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 bg-white border border-brand-dark/15 shadow-lg text-brand-dark hover:text-brand-blue rounded-full p-2.5 transition-all hidden md:block cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

      </div>
    </section>
  );
};

export default HomePopularMyths;