import React from 'react';

const homeFeaturesData = [
  {
    id: 1,
    title: 'Протидія пропаганді',
    description: 'Знешкоджуємо фейки, які ворог використовує як зброю.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Освіта та знання',
    description: 'Доступно пояснюємо складні речі на основі перевірених джерел.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Сила спільноти',
    description: 'Ми — тисячі людей, об\'єднаних правдою та спільною метою.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Гейміфікація',
    description: 'Навчайся, проходь тести, заробляй XP та досягнення і піднімайся в рейтингу!',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
];

const HomeFeatures = () => {
  return (
    // Контейнер, який обмежує ширину і центрує блок на сторінці
    <section className="w-full max-w-6xl mx-auto px-4 my-16 ">
      
      {/* Білий блок з обведенням */}
      <div className="bg-white border border-brand-dark/15 rounded-3xl p-6 lg:p-8 shadow-lg">
        
        {/* Сітка. На мобільних - 1 колонка. На планшетах - 2. На ПК - 4 колонки.
            Клас divide-x малює вертикальні лінії між колонками */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-8 divide-y md:divide-y-0 md:divide-x divide-brand-dark/15">
          
          {homeFeaturesData.map((feature) => (
            <div 
              key={feature.id} 
              className="flex flex-col items-center text-center px-4 lg:px-6 pt-6 md:pt-0"
            >
              {/* Іконка */}
              <div className="text-brand-blue mb-4">
                {feature.icon}
              </div>
              
              {/* Заголовок */}
              <h3 className="text-lg font-bold text-brand-dark mb-3">
                {feature.title}
              </h3>
              
              {/* Опис */}
              <p className="text-sm text-brand-dark/70 leading-relaxed max-w-[250px]">
                {feature.description}
              </p>
            </div>
          ))}

        </div>
      </div>
      
    </section>
  );
};

export default HomeFeatures;