import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Головний контейнер з синьою рамкою та легким фоном */}
      <div className="w-full border border-brand-blue/40 rounded-2xl md:rounded-[32px] p-8 md:p-10 bg-white flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 shadow-sm hover:shadow-md transition-shadow">
        
        {/* === ЛІВА ЧАСТИНА: Ілюстрація (Книга + Лупа) === */}
        <div className="relative shrink-0 text-brand-blue w-28 h-28 flex items-center justify-center">
          {/* Декоративні промені */}
          {/* Декоративні промені */}
          <svg 
          className="absolute inset-0 w-full h-full animate-[spin_60s_linear_infinite] opacity-60" 
          viewBox="0 0 100 100" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round"
          >
          {/* Прямі промені (ліво, право, верх, низ) */}
          <path d="M10 50 L16 50 M84 50 L90 50 M50 10 L50 16 M50 84 L50 90" />
          {/* Діагональні промені */}
          <path d="M22 22 L27 27 M73 73 L78 78 M22 78 L27 73 M73 27 L78 22" />
          </svg>
          
          {/* Книга з лупою (Doodle Style) */}
          <svg 
            viewBox="0 0 100 100" 
            className="w-20 h-20 text-brand-blue relative z-10" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            {/* Обкладинка та сторінки книги */}
            <path d="M50 80 C50 80, 30 75, 15 80 V25 C30 20, 50 25, 50 25" />
            <path d="M50 80 C50 80, 70 75, 85 80 V25 C70 20, 50 25, 50 25" />
            <path d="M50 25 V80" />
            {/* Лінії тексту на сторінках */}
            <path d="M22 35 H42 M22 45 H42 M22 55 H42 M22 65 H35" strokeWidth="2" className="opacity-60" />
            <path d="M58 35 H78 M58 45 H78 M58 55 H78" strokeWidth="2" className="opacity-60" />
            
            {/* Лупа */}
            <circle cx="65" cy="60" r="16" fill="white" />
            <circle cx="65" cy="60" r="12" className="opacity-30" />
            <path d="M76 71 L90 85" strokeWidth="4" />
            <path d="M86 89 L94 81" strokeWidth="2" />
          </svg>
        </div>

        {/* === ЦЕНТРАЛЬНА ЧАСТИНА: Текст === */}
        <div className="flex-1 text-center md:text-left space-y-3">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark leading-snug">
            Правда важлива. <br className="hidden lg:block" />
            Перевіряй. Аналізуй. Дій.
          </h2>
          <p className="text-base md:text-lg text-brand-dark/70 font-medium">
            Разом робимо інформаційний простір сильнішим.
          </p>
        </div>

        {/* === ПРАВА ЧАСТИНА: Кнопка-посилання === */}
        {/* Використовуємо Link з React Router для миттєвого переходу */}
        <Link 
          to="/catalog" 
          className="shrink-0 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-4 px-8 md:px-10 rounded-xl md:rounded-2xl shadow-lg shadow-brand-blue/20 transition-all flex items-center gap-3 group"
        >
          <span className="text-lg tracking-wide">Почати спростування</span>
          <svg 
            className="w-6 h-6 transform group-hover:translate-x-1.5 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>

      </div>
    </section>
  );
};

export default CTA;