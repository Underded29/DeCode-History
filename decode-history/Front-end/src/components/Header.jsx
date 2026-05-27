import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // 1. Додаємо useLocation
import logoImg from '../assets/logo.png';
import { fetchUserProfile } from '../services/userService'; 

const Header = ({ onOpenMenu }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // 2. Отримуємо поточний шлях
  const location = useLocation();

  useEffect(() => {
    const loadData = async () => {
      const token = localStorage.getItem('token');
      
      // Якщо токена немає, переконуємося, що стейт очищено (важливо для виходу з акаунта)
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const data = await fetchUserProfile();
        setUser(data);
      } catch (error) {
        console.error("Помилка завантаження даних користувача в Header:", error);
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [location.pathname]); // 3. Додаємо location.pathname в залежності. Тепер хедер оновлюється при кожному переході!

  const progressPercent = user ? (user.currentXP / user.nextLevelXP) * 100 : 0;

  return (
    <header className="fixed top-0 left-0 right-0 w-full flex items-center justify-between p-4 bg-white/95 backdrop-blur-sm border-b border-brand-dark/10 shadow-sm z-50">
      
      {/* Логотип */}
      <Link 
        to="/" 
        className="flex items-center gap-4 md:gap-6 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <img 
            src={logoImg} 
            alt="DeCode Іконка" 
            className="w-12 h-12 md:w-16 md:h-16 object-contain" 
        />
        <span className="text-xl md:text-2xl font-semibold text-brand-dark tracking-tight hidden sm:block">
          DeCode: History
        </span>
      </Link>

      {/* Центральний блок: Прогрес АБО Фраза */}
      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center w-full max-w-md">
        
        {isLoading ? (
          // Скелетон завантаження
          <div className="w-full flex items-center gap-4 animate-pulse opacity-50 p-2">
            <div className="h-4 w-16 bg-brand-dark/20 rounded"></div>
            <div className="w-full h-2.5 bg-brand-dark/10 rounded-full"></div>
            <div className="h-4 w-20 bg-brand-dark/20 rounded"></div>
          </div>
        ) : user ? (
          // Блок прогресу для авторизованого користувача
          <Link 
            to="/profile"
            className="flex items-center gap-4 w-full p-2 rounded-xl cursor-pointer hover:bg-brand-dark/5 transition-colors group"
          >
            <span className="text-sm font-medium text-brand-dark whitespace-nowrap group-hover:text-brand-blue transition-colors">
              Рівень {user.level}
            </span>
            
            <div className="w-full h-2.5 bg-brand-dark/10 rounded-full overflow-hidden border border-brand-blue/10">
              <div 
                className="h-full bg-brand-blue rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            
            <span className="text-sm font-bold text-brand-orange whitespace-nowrap">
              {user.currentXP} / {user.nextLevelXP} XP
            </span>
          </Link>
        ) : (
          // Фраза для неавторизованого гостя
          <Link 
            to="/login" 
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-brand-dark/60 hover:text-brand-blue hover:bg-brand-blue/5 transition-all cursor-pointer group"
          >
            <svg className="w-5 h-5 opacity-70 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Авторизуйтесь для відображення прогресу
          </Link>
        )}

      </div>

      {/* Кнопка бокового меню */}
      <button 
        onClick={onOpenMenu}
        className="p-2 text-brand-dark hover:text-brand-blue hover:bg-brand-blue/10 rounded-xl transition-colors cursor-pointer"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

    </header>
  );
};

export default Header;