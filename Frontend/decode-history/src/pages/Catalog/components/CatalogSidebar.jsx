import React from 'react';
import { Link } from 'react-router-dom'; // ДОДАНО ЦЕЙ ІМПОРТ
import loupeImage from '../../../assets/notebookAndLoupe.png'; 

const CatalogSidebar = () => {
  // Дані для блоку статистики
  const stats = [
    { 
      label: 'Міфів розвінчано', 
      value: '124', 
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /> 
    },
    { 
      label: 'Тем у каталозі', 
      value: '8', 
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /> 
    },
    { 
      label: 'Активних користувачів', 
      value: '120 000+', 
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /> 
    },
    { 
      label: 'Перевірено фактів', 
      value: '850+', 
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /> 
    },
  ];

  return (
    <aside className="w-full flex flex-col gap-8">
      
      {/* 1. Блок "Про каталог" */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 text-brand-dark mb-1">
          <svg className="w-6 h-6 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h2 className="text-xl font-bold">Про каталог</h2>
        </div>
        <p className="text-sm font-medium text-brand-dark/80 leading-relaxed">
          Зібрали найпоширеніші міфи, якими російська пропаганда намагається впливати на суспільство.
        </p>
        <p className="text-sm font-medium text-brand-dark/80 leading-relaxed">
          Читайте, перевіряйте факти та підвищуйте свій рівень критичного мислення!
        </p>
        
        {/* Декоративна іконка (Планшет з лупою) */}
        <div className="w-full flex flex-col items-center flex-1 justify-center relative">
            <img 
                src={loupeImage}
                alt="Ілюстрація з лупою над книгою" 
                className="h-28 w-auto object-contain relative z-10" 
            />
        </div>
      </div>

      <hr className="border-brand-blue/20" />

      {/* 2. Блок "Статистика" */}
      <div className="flex flex-col gap-5">
        <h3 className="text-lg font-bold text-brand-dark mb-1">Статистика</h3>
        <div className="flex flex-col gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  {stat.icon}
                </svg>
                <span className="text-sm font-medium text-brand-dark/70">{stat.label}</span>
              </div>
              <span className="text-base font-bold text-brand-blue">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Блок "Не знайшов міф?" (Картка із закликом) */}
      <div className="mt-4 border-[1.5px] border-brand-blue/30 bg-brand-blue/5 rounded-2xl p-5 relative overflow-hidden group hover:border-brand-blue/50 transition-colors">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-base font-bold text-brand-dark z-10">Не знайшов міф?</h3>
          <svg className="w-8 h-8 text-brand-blue opacity-80 z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21h6m-3-3v3m-5-8.5C7 9.46 9.46 7 12 7s5 2.46 5 5.5c0 1.95-1.04 3.78-2.66 4.88l-.34.22V19a2 2 0 01-2 2h-4a2 2 0 01-2-2v-1.4l-.34-.22C8.04 16.28 7 14.45 7 12.5z" />
            <path d="M12 4v1M5.5 8.5L4 7m16 0l-1.5 1.5" />
          </svg>
        </div>
        <p className="text-sm font-medium text-brand-dark/70 mb-5 relative z-10">
          Запропонуй тему, яку хочеш перевірити, додамо її в каталог!
        </p>
        
        <Link 
          to="/contacts" 
          state={{ subject: 'myth' }} 
          className="w-full flex items-center justify-center bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold py-2.5 rounded-xl shadow-md transition-colors relative z-10"
        >
          Запропонувати міф
        </Link>
      </div>

    </aside>
  );
};

export default CatalogSidebar;