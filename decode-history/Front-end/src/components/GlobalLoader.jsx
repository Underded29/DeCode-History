import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GlobalLoader = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    // 1. Як тільки змінився URL (користувач перейшов на іншу сторінку), показуємо лоадер
    setIsLoading(true);
    setShowOverlay(true);

    // 2. Встановлюємо мікрозатримку (наприклад, 600 мілісекунд)
    const timer = setTimeout(() => {
      setIsLoading(false); // Запускаємо анімацію зникнення (opacity-0)
      
      // 3. Чекаємо 300мс (поки пройде CSS-транзиція opacity), і повністю видаляємо div з DOM
      setTimeout(() => setShowOverlay(false), 300);
    }, 300); // <-- ТУТ МОЖНА РЕГУЛЮВАТИ ЧАС ЗАТРИМКИ

    // Очищаємо таймер, якщо користувач дуже швидко клацає туди-сюди
    return () => clearTimeout(timer);
  }, [location.pathname]); // Спрацьовує при кожній зміні шляху

  if (!showOverlay) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center transition-opacity duration-300 ${
        isLoading ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Анімований спінер (використовуємо твої фірмові кольори) */}
      <div className="relative flex items-center justify-center">
        {/* Зовнішнє кільце */}
        <div className="w-16 h-16 border-4 border-brand-blue/10 rounded-full"></div>
        {/* Внутрішнє кільце, що крутиться */}
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-brand-blue rounded-full border-t-transparent animate-spin"></div>
      </div>
      
      {/* Текст (пульсує) */}
      <p className="mt-6 text-brand-dark/50 font-bold tracking-widest uppercase text-xs animate-pulse">
        Завантаження...
      </p>
    </div>
  );
};

export default GlobalLoader;