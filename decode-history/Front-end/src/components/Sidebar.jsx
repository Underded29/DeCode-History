import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Додано useNavigate
import { fetchUserProfile } from '../services/userService'; // Виправлено Services на services

const pages = {
  'Каталог міфів': '/catalog',
  'Особистий кабінет': '/profile',
  'Про нас': '/about',
  'Контакти': '/contacts'
};

const Sidebar = ({ isOpen, onClose }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Ініціалізуємо навігацію для виходу

  useEffect(() => {
    const checkAuth = async () => {
      // 1. Швидка перевірка наявності токена
      const token = localStorage.getItem('token');
      
      if (!token) {
        // Якщо токена немає, одразу показуємо меню для гостя
        setUser(null);
        setIsLoading(false);
        return;
      }

      // 2. Якщо токен є, завантажуємо дані з бекенду
      try {
        const data = await fetchUserProfile();
        setUser(data);
      } catch (error) {
        console.error("Помилка авторизації в Sidebar:", error);
        // Якщо сервер повернув помилку (наприклад, токен прострочений), видаляємо його
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Перевіряємо авторизацію щоразу, коли сайдбар відкривається
    if (isOpen) {
      checkAuth();
    }
  }, [isOpen]); // Додано залежність isOpen

  // ПОВНОЦІННИЙ ВИХІД З АКАУНТА
  const handleLogout = () => {
    // 1. Очищаємо сховище
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // 2. Оновлюємо локальний стейт
    setUser(null); 
    
    // 3. Закриваємо сайдбар
    onClose();
    
    // 4. Перекидаємо на сторінку логіну
    navigate('/login');
  };

  return (
    <>
      {/* Затемнення фону (Backdrop) */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Сама панель меню */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* ================= 1. ШАПКА САЙДБАРА ================= */}
        {isLoading ? (
          <div className="p-6 border-b border-brand-blue/10 flex items-center gap-4 bg-brand-blue/5">
            <div className="flex items-center gap-4 w-full animate-pulse">
              <div className="w-12 h-12 bg-brand-blue/20 rounded-full shrink-0"></div>
              <div className="flex flex-col gap-2 w-full">
                <div className="h-4 bg-brand-blue/20 rounded w-24"></div>
                <div className="h-3 bg-brand-blue/10 rounded w-16"></div>
              </div>
            </div>
          </div>
        ) : user ? (
          <Link 
            to="/profile"
            onClick={onClose}
            className="p-6 border-b border-brand-blue/10 flex items-center gap-4 bg-brand-blue/5 hover:bg-brand-blue/10 transition-colors cursor-pointer group block"
          >
            <div className="flex items-center gap-4">
              <div className="relative shrink-0 w-12 h-12 rounded-full border-2 border-brand-blue/40 group-hover:border-brand-blue transition-colors overflow-hidden bg-white flex items-center justify-center">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt="Аватар" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xl">👦🏻</span>
                )}
              </div>
              <div className="flex flex-col overflow-hidden">
                <h3 className="font-bold text-brand-dark truncate group-hover:text-brand-blue transition-colors">{user.name}</h3>
                <p className="text-xs font-bold text-brand-blue">Рівень {user.level}</p>
              </div>
            </div>
          </Link>
        ) : (
          <div className="p-6 border-b border-brand-blue/10 flex items-center gap-4 bg-brand-blue/5">
            <div className="w-12 h-12 rounded-full border-2 border-brand-dark/20 bg-white flex items-center justify-center shrink-0 text-brand-dark/40">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-brand-dark">Гість</h3>
              <p className="text-xs font-medium text-brand-dark/60">Увійдіть для збереження прогресу</p>
            </div>
          </div>
        )}

        {/* ================= 2. НАВІГАЦІЯ ================= */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {Object.entries(pages).map(([label, href], index) => {
            // Приховуємо "Особистий кабінет" для гостей
            if (!user && label === 'Особистий кабінет') return null;

            return (
              <Link 
                key={index}
                to={href} 
                onClick={onClose} 
                className="flex items-center gap-4 px-4 py-3.5 text-brand-dark rounded-xl hover:bg-brand-blue/5 hover:text-brand-blue transition-colors font-bold group"
              >
                <div className="w-8 h-8 bg-brand-blue/5 rounded-lg flex items-center justify-center text-brand-blue group-hover:bg-white group-hover:shadow-sm transition-all shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div> 
                {label}
              </Link>
            );
          })}
        </nav>

        {/* ================= 3. НИЖНІЙ БЛОК (Кнопки дій) ================= */}
        <div className="p-6 border-t border-brand-blue/10 flex flex-col gap-3">
          {isLoading ? (
            <div className="h-10 bg-brand-blue/10 animate-pulse rounded-xl w-full"></div>
          ) : user ? (
            <button 
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 bg-red-50 text-red-500 hover:bg-red-100 font-bold w-full px-4 py-3 rounded-xl cursor-pointer transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Вийти з акаунта
            </button>
          ) : (
            <>
              <Link 
                to="/login"
                onClick={onClose}
                className="flex items-center justify-center bg-brand-blue text-white hover:bg-brand-blue/90 font-bold w-full px-4 py-3.5 rounded-xl cursor-pointer transition-colors shadow-sm"
              >
                Увійти
              </Link>
              <Link 
                to="/register"
                onClick={onClose}
                className="flex items-center justify-center border-2 border-brand-blue/30 text-brand-blue hover:bg-brand-blue/5 font-bold w-full px-4 py-3 rounded-xl cursor-pointer transition-colors"
              >
                Зареєструватися
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;