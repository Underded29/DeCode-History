import React from 'react';

const AboutSupport = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="w-full border border-brand-blue/40 rounded-2xl md:rounded-[32px] p-6 md:p-8 bg-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
        
        {/* ЛІВА ЧАСТИНА: Банка з сердечками (Doodle SVG) */}
        <div className="relative shrink-0 flex items-center justify-center">
          {/* Декоративні сердечка навколо банки */}
          <div className="absolute -top-4 -right-4 text-brand-orange/60 scale-75">
             <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </div>
          <div className="absolute top-2 -left-6 text-brand-orange/40 scale-50 rotate-12">
             <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </div>

          {/* Сама банка (SVG Doodle) */}
          <svg 
            viewBox="0 0 100 120" 
            className="w-20 h-24 md:w-24 md:h-28 text-brand-blue" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            {/* Кришка банки */}
            <rect x="35" y="10" width="30" height="8" rx="2" />
            <path d="M38 18 Q50 22 62 18" />
            {/* Тіло банки */}
            <path d="M35 18 C30 18, 25 25, 25 35 V95 C25 105, 35 110, 50 110 C65 110, 75 105, 75 95 V35 C75 25, 70 18, 65 18" />
            {/* Штрихування скла */}
            <path d="M30 40 Q35 38 40 40" className="opacity-40" />
            <path d="M60 85 Q65 87 70 85" className="opacity-40" />
            {/* Серце всередині */}
            <path d="M50 75 C50 65, 40 60, 40 70 C40 80, 50 90, 50 90 C50 90, 60 80, 60 70 C60 60, 50 65, 50 75" />
          </svg>
        </div>

        {/* ЦЕНТРАЛЬНА ЧАСТИНА: Текст */}
        <div className="flex-1 text-center md:text-left space-y-2">
          <h3 className="text-2xl md:text-3xl font-bold text-brand-dark">
            Підтримай наш проєкт
          </h3>
          <p className="text-base md:text-lg text-brand-dark/70 font-medium leading-relaxed max-w-lg">
            Твій внесок допоможе нам створювати більше корисних матеріалів для сильного суспільства.
          </p>
        </div>

        {/* ПРАВА ЧАСТИНА: Кнопка (Brand Orange) */}
        <button 
          className="shrink-0 bg-brand-orange hover:bg-brand-orange/90 text-white font-bold py-3.5 px-10 rounded-2xl md:rounded-xl shadow-lg shadow-brand-orange/20 transition-all flex items-center gap-3 cursor-pointer group transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <span className="text-lg">Підтримати</span>
          <svg 
            className="w-5 h-5 transition-transform group-hover:scale-125" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>

      </div>
    </section>
  );
};

export default AboutSupport;