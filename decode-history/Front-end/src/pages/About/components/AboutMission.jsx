import React from 'react';

const AboutMission = () => {
  const missionPoints = [
    'Пояснювати складне просто',
    'Розвивати критичне мислення',
    'Допомагати захищатися від дезінформації'
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      
      {/* Заголовок секції */}
      <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark mb-4">
        Наша місія
      </h2>

      {/* Головний контейнер */}
      <div className="w-full border border-brand-blue/60 rounded-2xl p-6 md:p-8 bg-white flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 shadow-sm">
        
        {/* ЛІВА ЧАСТИНА: Ілюстрація + Текст */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 flex-1">
          
          {/* Ілюстрація (Зменшена до w-20 h-20) */}
          <div className="flex-shrink-0 text-brand-blue w-20 h-20">
            <svg 
              viewBox="0 0 100 100" 
              className="w-full h-full"
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              {/* Серце */}
              <path d="M50 45 C50 30, 30 25, 30 40 C30 55, 50 70, 50 70 C50 70, 70 55, 70 40 C70 25, 50 30, 50 45 Z" />
              {/* Декоративні промені біля серця */}
              <path d="M25 30 L20 25" />
              <path d="M75 30 L80 25" />
              <path d="M15 45 L20 45" />
              <path d="M85 45 L80 45" />
              
              {/* Люди (Центральна) */}
              <circle cx="50" cy="78" r="6" />
              <path d="M38 95 C38 85, 62 85, 62 95" />
              
              {/* Люди (Ліва) */}
              <circle cx="28" cy="82" r="5" />
              <path d="M18 95 C18 88, 38 88, 38 95" />
              
              {/* Люди (Права) */}
              <circle cx="72" cy="82" r="5" />
              <path d="M62 95 C62 88, 82 88, 82 95" />
            </svg>
          </div>

          {/* Текст місії */}
          <p className="text-base md:text-lg text-brand-dark font-medium leading-relaxed pt-1">
            Ми створюємо корисні матеріали, <br className="hidden lg:block" />
            щоб кожен міг мислити критично <br className="hidden lg:block" />
            та впевнено відрізняти правду від брехні.
          </p>
        </div>

        {/* ПРАВА ЧАСТИНА: Чек-ліст */}
        <div className="flex-1 w-full space-y-4">
          {missionPoints.map((point, index) => (
            <div key={index} className="flex items-center gap-4 group cursor-default">
              {/* Галочка (Зменшена до w-6 h-6) */}
              <div className="shrink-0 w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center transition-transform group-hover:scale-110">
                <svg 
                  className="w-4 h-4 text-white" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth="3.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              {/* Текст пункту */}
              <span className="text-base md:text-lg text-brand-dark font-medium">
                {point}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutMission;