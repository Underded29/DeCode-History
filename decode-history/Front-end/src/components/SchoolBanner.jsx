import React from 'react';
import { Link } from 'react-router-dom'; // 1. Імпортуємо Link

const SchoolBanner = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 my-8">
      <div className="bg-white border border-brand-blue/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        
        {/* Ліва частина: Іконка + Текст */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
          {/* Іконка школи */}
          <div className="text-brand-blue shrink-0">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1v1H9V7zm5 0h1v1h-1V7zm-5 4h1v1H9v-1zm5 0h1v1h-1v-1zm-3 4H2v5h20v-5h-9z" />
            </svg>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-brand-dark mb-2">
              Для шкіл та освітніх закладів
            </h3>
            <p className="text-sm text-brand-dark/70 leading-relaxed max-w-xl">
              Ми створюємо безпечне інформаційне середовище для молоді. Інтерактивні матеріали, лекції та співпраця для формування критичного мислення нового покоління.
            </p>
          </div>
        </div>

        {/* Права частина: Кнопка-посилання */}
        {/* 2. Замінюємо button на Link та вказуємо шлях */}
        <Link 
          to="/contacts" 
          className="shrink-0 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-md shadow-brand-blue/20 cursor-pointer w-full md:w-auto flex items-center justify-center"
        >
          Співпрацювати →
        </Link>

      </div>
    </div>
  );
};

export default SchoolBanner;