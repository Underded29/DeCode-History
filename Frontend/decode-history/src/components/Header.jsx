import React, { useState, useEffect } from 'react';
import logoImg from '../assets/logo.png';
import { fetchUserProfile } from '../Services/userService';

const Header = ({ onOpenMenu }) => {
  // 1. Додаємо стейти для користувача та лоадера
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 2. Виконуємо запит при завантаженні компонента
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchUserProfile();
        setUser(data);
      } catch (error) {
        console.error("Помилка завантаження даних користувача в Header:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // 3. Безпечно вираховуємо прогрес (якщо юзер вже завантажився)
  const progressPercent = user ? (user.currentXP / user.nextLevelXP) * 100 : 0;

  return (
    <header className="fixed top-0 left-0 right-0 w-full flex items-center justify-between p-4 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm z-50">
      
      {/* Логотип */}
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

      {/* Центральний блок прогресу */}
      <a 
        href="/profile"
        className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-4 w-full max-w-md p-2 rounded-xl cursor-pointer hover:bg-brand-dark/5 transition-colors group"
      >
        {/* Показуємо скелетон/заглушку, поки дані вантажаться */}
        {isLoading ? (
          <div className="w-full flex items-center gap-4 animate-pulse opacity-50">
            <div className="h-4 w-16 bg-brand-dark/20 rounded"></div>
            <div className="w-full h-2.5 bg-brand-dark/10 rounded-full"></div>
            <div className="h-4 w-20 bg-brand-dark/20 rounded"></div>
          </div>
        ) : user ? (
          <>
            <span className="text-sm font-medium text-brand-dark whitespace-nowrap group-hover:text-brand-blue transition-colors">
              Рівень {user.level}
            </span>
            
            <div className="w-full h-2.5 bg-brand-dark/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-blue rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            
            <span className="text-sm font-bold text-brand-orange whitespace-nowrap">
              {user.currentXP} / {user.nextLevelXP} XP
            </span>
          </>
        ) : null}
      </a>

      {/* Кнопка меню */}
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