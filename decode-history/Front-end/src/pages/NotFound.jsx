import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      {/* Велика декоративна цифра */}
      <div className="text-[120px] leading-none font-extrabold text-brand-blue/20 mb-2 select-none">
        404
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
        Ой! Цей міф ще не досліджено
      </h1>
      
      <p className="text-lg text-brand-dark/70 max-w-md mb-8">
        Схоже, сторінка загубилася в історичних архівах. Вона могла бути видалена, або в адресі є помилка.
      </p>

      {/* Кнопки навігації */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link 
          to="/" 
          className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold px-8 py-3.5 rounded-xl transition-colors shadow-md flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          На головну
        </Link>
        
        <Link 
          to="/catalog" 
          className="border-2 border-brand-blue/30 text-brand-blue hover:border-brand-blue hover:bg-brand-blue/5 font-bold px-8 py-3 rounded-xl transition-colors flex items-center gap-2"
        >
          Перейти до каталогу
        </Link>
      </div>
    </div>
  );
};

export default NotFound;