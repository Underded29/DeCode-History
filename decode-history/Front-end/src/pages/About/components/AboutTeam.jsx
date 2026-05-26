import React from 'react';

const AboutTeam = () => {
  const teamRoles = [
    {
      id: 1,
      role: 'історики-ресьорчери',
      description: 'досліджуємо факти та джерела',
    },
    {
      id: 2,
      role: 'розробники',
      description: 'створюємо зручний та надійний продукт',
    },
    {
      id: 3,
      role: 'дизайнери',
      description: 'робимо візуал зрозумілим і дружнім',
    },
    {
      id: 4,
      role: 'SMM',
      description: 'поширюємо знання та будуємо спільноту',
    }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      
      {/* Шапка секції */}
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark mb-2">
          Команда
        </h2>
        <p className="text-base md:text-lg text-brand-dark/70 font-medium">
          Ми різні за досвідом, але об'єднані спільною метою — боротися з дезінформацією.
        </p>
      </div>

      {/* Сітка карток (1 колонка - мобілки, 2 - планшети, 4 - ПК) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        
        {teamRoles.map((member) => (
          <div 
            key={member.id} 
            className="border border-brand-blue/30 rounded-2xl p-4 flex items-center gap-4 bg-white shadow-sm hover:shadow-md transition-all cursor-default group"
          >
            {/* Аватар (Стандартна універсальна іконка) */}
            <div className="w-14 h-14 shrink-0 bg-brand-light border border-brand-blue/20 rounded-full flex items-center justify-center text-brand-blue/60 group-hover:bg-brand-blue/5 transition-colors">
              <svg 
                className="w-6 h-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="1.8"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
            
            {/* Текст картки */}
            <div className="flex flex-col">
              <span className="font-bold text-brand-dark text-base leading-tight">
                {member.role}
              </span>
              <span className="text-xs md:text-sm text-brand-dark/70 font-medium leading-snug mt-1">
                {member.description}
              </span>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default AboutTeam;