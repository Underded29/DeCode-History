import React, { useState } from 'react';

const MythFlipCard = ({ mythData }) => {
  const [isFlipped, setIsFlipped] = useState(false); // За замовчуванням показуємо "Правду", як на макеті

  return (
    <div className="w-full flex flex-col gap-4">
      {/* 3D Контейнер */}
      <div 
        className="relative w-full aspect-auto md:aspect-[2/1] min-h-[350px] cursor-pointer group"
        style={{ perspective: '1000px' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Внутрішня обгортка, яка обертається */}
        <div 
          className="relative w-full h-full transition-transform duration-700 ease-in-out"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' 
          }}
        >
          {/* ================= ФРОНТАЛЬНА СТОРОНА (МІФ - ЧЕРВОНА) ================= */}
          <div 
            className="absolute inset-0 w-full h-full bg-white border border-brand-blue/30 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 shadow-sm group-hover:shadow-md transition-shadow overflow-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="flex-1 flex flex-col justify-center gap-4">
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider border border-red-100 self-start">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Міф
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-dark leading-tight">
                {mythData.fakeTitle}
              </h2>
              <p className="text-brand-dark/70 font-medium text-base md:text-lg leading-relaxed">
                {mythData.fakeNarrative}
              </p>
            </div>
            {/* Ілюстрація для міфу */}
            <div className="w-full md:w-5/12 h-48 md:h-full bg-red-50/50 rounded-2xl border-2 border-dashed border-red-200 flex items-center justify-center text-red-400">
               Зображення міфу (ТБ / Новини)
            </div>
          </div>

          {/* ================= ТИЛЬНА СТОРОНА (ПРАВДА - ЗЕЛЕНА) ================= */}
          <div 
            className="absolute inset-0 w-full h-full bg-white border border-brand-blue/30 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 shadow-sm group-hover:shadow-md transition-shadow overflow-hidden"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)' 
            }}
          >
            <div className="flex-1 flex flex-col justify-center gap-4">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider border border-emerald-100 self-start">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Правда
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-dark leading-tight">
                {mythData.truthTitle}
              </h2>
              <p className="text-brand-dark/70 font-medium text-base md:text-lg leading-relaxed">
                {mythData.truthFact}
              </p>
            </div>
            {/* Ілюстрація для правди */}
            <div className="w-full md:w-5/12 h-48 md:h-full bg-emerald-50/50 rounded-2xl border-2 border-dashed border-emerald-200 flex items-center justify-center text-emerald-500 text-center p-4">
               Експортуй ілюстрацію з Києвом та людьми сюди
            </div>
          </div>
        </div>
      </div>

      {/* Підказка знизу картки */}
      <div className="flex items-center justify-center gap-2 text-brand-blue font-semibold text-sm animate-pulse cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Натисни на картку, щоб перевернути та дізнатись {isFlipped ? 'міф' : 'правду'}
      </div>
    </div>
  );
};

export default MythFlipCard;