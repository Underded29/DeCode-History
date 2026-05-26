import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CatalogMythList = ({ myths, itemsPerPage = 6 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // 1. Додаємо стан для анімації переходу
  const [isFading, setIsFading] = useState(false);

  // Скидаємо сторінку на першу з анімацією, якщо масив міфів змінився (наприклад, при фільтрації)
  useEffect(() => {
    setIsFading(true);
    const timer = setTimeout(() => {
      setCurrentPage(1);
      setIsFading(false);
    }, 300); // 300мс = час нашої CSS-анімації

    return () => clearTimeout(timer);
  }, [myths]);

  // Якщо після фільтрації масив порожній
  if (myths.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-16 bg-white border border-brand-blue/20 rounded-[28px] text-center px-4 animate-fade-in">
        <div className="w-20 h-20 bg-brand-blue/5 rounded-full flex items-center justify-center text-brand-blue mb-4">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-brand-dark mb-2">Нічого не знайдено</h3>
        <p className="text-brand-dark/70 font-medium">Спробуй змінити параметри пошуку або обрати іншу категорію.</p>
      </div>
    );
  }

  const indexOfLastMyth = currentPage * itemsPerPage;
  const indexOfFirstMyth = indexOfLastMyth - itemsPerPage;
  const currentMyths = myths.slice(indexOfFirstMyth, indexOfLastMyth);
  const totalPages = Math.ceil(myths.length / itemsPerPage);

  // 2. Оновлена функція зміни сторінки з плавною анімацією
  const paginate = (pageNumber) => {
    // Уникаємо повторного кліку, якщо анімація вже йде
    if (isFading || pageNumber === currentPage) return;

    setIsFading(true);

    // Чекаємо поки картки зникнуть (300ms), потім міняємо дані і плавно показуємо
    setTimeout(() => {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsFading(false);
    }, 300); 
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* 3. Додаємо класи transition-opacity та duration-300 для контейнера */}
      <div 
        className={`grid grid-cols-1 md:grid-cols-2 gap-6 w-full transition-all duration-300 ease-in-out ${
          isFading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        {currentMyths.map((myth) => (
          <Link 
            to={`/myth/${myth.id}`}
            key={myth.id} 
            className="bg-white border border-brand-blue/20 rounded-[28px] p-4 md:p-5 flex flex-col gap-4 shadow-sm hover:shadow-lg hover:border-brand-blue/40 transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-center z-10">
              {myth.status === 'Міф' && (
                <div className="flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border border-red-100 shadow-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /></svg>
                  {myth.status}
                </div>
              )}
              {myth.status === 'Маніпуляція' && (
                <div className="flex items-center gap-1.5 bg-orange-50 text-orange-600 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border border-orange-100 shadow-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  {myth.status}
                </div>
              )}
              {myth.status === 'Фейк' && (
                <div className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border border-gray-200 shadow-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {myth.status}
                </div>
              )}

              <div className="bg-brand-orange/10 text-brand-orange px-3.5 py-1.5 rounded-xl text-sm font-bold shadow-sm">
                + {myth.xp} XP
              </div>
            </div>

            <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 relative">
              <img 
                src={myth.image} 
                alt={myth.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex flex-col flex-1 gap-2.5">
              <h3 className="text-xl font-bold text-brand-dark leading-tight group-hover:text-brand-blue transition-colors">
                {myth.title}
              </h3>
              <p className="text-sm font-medium text-brand-dark/70 line-clamp-2 leading-relaxed">
                {myth.fakeNarrative}
              </p>
            </div>

            <div className="flex justify-between items-center mt-2 pt-4 border-t border-brand-blue/10">
              <div className="text-xs font-bold text-brand-dark/60 bg-brand-blue/5 px-3 py-1.5 rounded-lg border border-brand-blue/10">
                {myth.category}
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-brand-dark/60">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {myth.readTime}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Блок пагінації */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1 || isFading}
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-brand-blue/20 text-brand-dark hover:bg-brand-blue/5 hover:text-brand-blue disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center gap-1.5">
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              const isActive = currentPage === pageNumber;
              
              return (
                <button
                  key={pageNumber}
                  onClick={() => paginate(pageNumber)}
                  disabled={isFading}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm transition-colors cursor-pointer ${
                    isActive 
                      ? 'bg-brand-blue text-white shadow-md' 
                      : 'border border-brand-blue/20 text-brand-dark hover:bg-brand-blue/5 hover:text-brand-blue'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages || isFading}
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-brand-blue/20 text-brand-dark hover:bg-brand-blue/5 hover:text-brand-blue disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default CatalogMythList;