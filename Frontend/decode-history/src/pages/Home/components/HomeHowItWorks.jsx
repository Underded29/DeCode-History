import React from 'react';

const steps = [
  {
    id: 1,
    title: 'Обирай міф',
    description: 'Знайди міф у каталозі або обери з популярних тем.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    )
  },
  {
    id: 2,
    title: 'Читай та аналізуй',
    description: 'Ознайомся з міфом та прочитай аргументи й факти.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    )
  },
  {
    id: 3,
    title: 'Перевір себе',
    description: 'Пройди короткий квіз та дізнайся, наскільки добре ти розібрався в темі.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 4,
    title: 'Отримуй XP',
    description: 'Заробляй досвід, відкривай досягнення та піднімайся в рейтингу.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    )
  }
];

const HomeHowItWorks = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 my-20">
      
      {/* Декоративний заголовок */}
      <div className="flex items-center justify-center gap-4 mb-12">
        <div className="h-px bg-brand-blue/30 w-12 md:w-24 relative">
            <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-blue/50"></div>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-brand-dark">Як це працює</h2>
        <div className="h-px bg-brand-blue/30 w-12 md:w-24 relative">
             <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-blue/50"></div>
        </div>
      </div>

      {/* Контейнер для карток і стрілок */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4">
        
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            
            {/* Сама картка */}
            <div className="relative bg-white border border-brand-dark/15 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center w-full max-w-[280px] shadow-lg">
              
              {/* Синій кружечок з цифрою (Абсолютне позиціювання в куті) */}
              <div className="absolute top-4 left-4 w-8 h-8 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                {step.id}
              </div>

              {/* Іконка */}
              <div className="text-brand-dark mt-4 mb-5">
                {step.icon}
              </div>

              {/* Текст */}
              <h3 className="font-bold text-brand-dark text-lg mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-brand-dark/70 leading-relaxed">
                {step.description}
              </p>
              
            </div>

            {/* Стрілочка між картками (Показується тільки на великих екранах) */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block text-brand-dark/30 text-2xl shrink-0">
                →
              </div>
            )}

          </React.Fragment>
        ))}

      </div>
    </section>
  );
};

export default HomeHowItWorks;