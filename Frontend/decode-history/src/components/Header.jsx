import React from 'react';
import logoImg from '../assets/logo.png';

var level = 5;
var xp = 2500;
var xpForNextLevel = 4000;
var progressPercent = (xp / xpForNextLevel) * 100;

const Header = ({ onOpenMenu }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm relative z-30">
      
      {/* Логотип (Клікабельний, веде на головну) */}
      <a 
        href="/" 
        className="flex items-center gap-6 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <img 
            src={logoImg} 
            alt="DeCode Іконка" 
            className="w-16 h-16 object-contain" 
        />
        <span className="text-2xl font-semibold text-gray-900 tracking-tight">
          DeCode: History
        </span>
      </a>

      {/* Центральний блок прогресу (Рівень та XP) — Тепер клікабельна кнопка */}
      <button 
        onClick={() => console.log('Тут буде перехід до особистого кабінету')}
        className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-4 w-full max-w-md p-2 rounded-xl cursor-pointer hover:bg-brand-dark/5 transition-colors group"
      >
        <span className="text-sm font-medium text-brand-dark whitespace-nowrap group-hover:text-brand-blue transition-colors">
          Рівень {level}
        </span>
        
        <div className="w-full h-2.5 bg-brand-dark/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-brand-blue rounded-full transition-all duration-500" 
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        
        <span className="text-sm font-bold text-brand-orange whitespace-nowrap">
          {xp} / {xpForNextLevel} XP
        </span>
      </button>

      {/* Кнопка меню (Гамбургер) */}
      <button 
        onClick={onOpenMenu}
        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

    </header>
  );
};

export default Header;