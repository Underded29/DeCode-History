import React from 'react';
import { Link } from 'react-router-dom'; // 1. Додаємо імпорт Link

const ProfileSavedMyths = ({ savedMyths }) => {
  return (
    <div className="bg-white border border-brand-blue/30 rounded-[32px] p-6 shadow-sm flex flex-col h-full">
      <h3 className="text-lg font-bold text-brand-blue mb-4">Збережені міфи</h3>
      
      <div className="flex flex-col gap-3 flex-1">
        {savedMyths.map(myth => (
          // 2. Замінюємо div на Link та додаємо шлях переходу (to)
          <Link 
            to={`/myth/${myth.id}`} 
            key={myth.id} 
            className="flex items-center gap-3 p-2 border border-brand-blue/10 rounded-2xl cursor-pointer hover:border-brand-blue/40 hover:shadow-sm transition-all group"
          >
            {/* Тимчасова заглушка для іконки міфу */}
            <div className="w-16 h-10 shrink-0 bg-brand-blue/5 rounded-lg border border-brand-blue/20 flex items-center justify-center text-xl text-brand-blue/50 overflow-hidden">
               {myth.iconUrl ? <img src={myth.iconUrl} alt="" className="w-full h-full object-cover" /> : '📄'}
            </div>
            
            <p className="flex-1 text-sm font-bold text-brand-dark leading-tight group-hover:text-brand-blue line-clamp-2">
              {myth.title}
            </p>
            
            <svg className="w-5 h-5 shrink-0 text-brand-dark/30 group-hover:text-brand-blue mr-2 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>

      <button className="text-sm font-bold text-brand-blue hover:underline mt-4 text-center">
        Переглянути всі збережені →
      </button>
    </div>
  );
};

export default ProfileSavedMyths;