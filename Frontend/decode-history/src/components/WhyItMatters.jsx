import React from 'react';
import logoImg from '../assets/ukraineMap.png';

const reasons = [
  'Російська пропаганда діє, щоб посіяти страх, ненависть і розбрат.',
  'Брехня змінює сприйняття реальності та впливає на рішення людей.',
  'Критичне мислення та перевірка фактів — наш захист і наша свобода.',
  'Знання правди допомагає будувати сильну та незалежну Україну.'
];

const WhyItMatters = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 my-16">
      <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-10 text-center md:text-left">
        Чому це важливо?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Ліва колонка: Список аргументів */}
        <div className="space-y-2">
          {reasons.map((reason, index) => (
            <div key={index} className="flex items-start gap-4">
              {/* Іконка галочки */}
              <div className="shrink-0 mt-1 w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              {/* Текст */}
              <p className="text-brand-dark font-medium leading-relaxed">
                {reason}
              </p>
            </div>
          ))}
        </div>

        {/* Права колонка: Карта України */}
        <div className="flex justify-center items-center p-4">
          <img src={logoImg} alt="Карта України" className="w-full max-w-md object-contain opacity-80" />
        </div>

      </div>
    </div>
  );
};

export default WhyItMatters;