import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useMythsData } from '../../MythContext/MythContext'; 

const HomePopularMyths = () => {
  const scrollContainerRef = useRef(null);
  
  const { myths, loading } = useMythsData();

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const card = scrollContainerRef.current.firstElementChild;
      const scrollAmount = card ? card.offsetWidth + 24 : 304;
      scrollContainerRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  const popularMyths = [...myths]
    .sort((a, b) => b.views - a.views)
    .slice(0, 8);

  return (
    <section className="max-w-[1360px] mx-auto px-4 md:px-12 lg:px-16 my-16">
      <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-8 text-center lg:text-left">
        Популярні міфи
      </h2>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-blue"></div>
          <p className="mt-4 font-medium text-brand-dark/50">Завантажуємо базу міфів...</p>
        </div>
      ) : (
        <div className="relative group">
          
          <button 
            onClick={() => scroll('left')}
            className="absolute -left-2 md:-left-12 lg:-left-14 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white border border-brand-dark/10 shadow-md text-brand-dark hover:text-brand-blue rounded-full flex items-center justify-center transition-all hidden md:flex cursor-pointer"
          >
            <svg className="w-6 h-6 pr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto py-4 items-stretch [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth w-full"
          >
            {popularMyths.map((myth) => (
              <Link 
                to={`/myth/${myth.id}`}
                key={myth.id} 
                className="shrink-0 bg-white border border-brand-dark/15 rounded-2xl p-6 flex flex-col items-center justify-between hover:shadow-md transition-shadow cursor-pointer h-auto w-[260px] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
              >
                <div className="w-24 h-24 mb-6 mt-2 shrink-0 rounded-2xl overflow-hidden border-2 border-brand-blue/10 shadow-sm bg-brand-light">
                  {/* Виводимо картинку завжди */}
                  <img 
                    src={myth.image} 
                    alt={myth.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>

                <h3 className="text-lg font-bold text-brand-dark text-center mb-8 h-14 flex items-center justify-center w-full">
                  <span className="line-clamp-2">{myth.title}</span>
                </h3>

                <div className="w-full flex items-center justify-between mt-auto pt-4 border-t border-brand-dark/5">
                  <span className="text-xs font-bold text-brand-blue bg-brand-light border border-brand-blue/10 px-3 py-1 rounded-md">
                    {myth.category}
                  </span>
                  <span className="text-xs text-brand-dark/50 font-medium whitespace-nowrap">
                    {myth.readTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <button 
            onClick={() => scroll('right')}
            className="absolute -right-2 md:-right-12 lg:-right-14 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white border border-brand-dark/10 shadow-md text-brand-dark hover:text-brand-blue rounded-full flex items-center justify-center transition-all hidden md:flex cursor-pointer"
          >
            <svg className="w-6 h-6 pl-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

        </div>
      )}
    </section>
  );
};

export default HomePopularMyths;