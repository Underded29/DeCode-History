import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.PROD 
  ? 'https://api.history.science.kh.ua/api/auth'
  : 'http://localhost:5001/api/auth';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  
  // Стан для відображення помилок від сервера
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Очищаємо помилку при введенні нових даних
    if (serverError) setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setServerError('');
    
    try {
      // Відправляємо запит на наш бекенд
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Успішний вхід: зберігаємо токен і дані користувача
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Перекидаємо користувача в особистий кабінет
        navigate('/profile'); 
      } else {
        // Виводимо помилку від сервера (наприклад, "Невірний пароль")
        setServerError(data.error || 'Помилка авторизації');
      }
    } catch (error) {
      console.error('Помилка мережі:', error);
      setServerError('Не вдалося з\'єднатися з сервером. Перевірте підключення.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[75vh] flex items-center justify-center px-4 py-12 relative">
      
      {/* Декоративні елементи на фоні (опціонально) */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Картка авторизації */}
      <div className="bg-white border border-brand-blue/30 rounded-[32px] p-8 md:p-10 shadow-sm w-full max-w-md relative z-10">
        
        {/* Верхня кольорова лінія */}
        <div className="absolute top-0 left-0 w-full h-2 bg-brand-blue"></div>

        <div className="text-center mb-8 mt-2">
          <div className="w-16 h-16 bg-brand-blue/5 border border-brand-blue/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-brand-blue">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-brand-dark mb-2">З поверненням!</h1>
          <p className="text-brand-dark/70 font-medium">Увійдіть, щоб продовжити навчання та перевірку фактів.</p>
        </div>

        {/* Блок виведення серверної помилки */}
        {serverError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium text-center animate-fade-in-up">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Поле Email */}
          <div>
            <label className="block text-xs font-bold text-brand-dark/70 mb-1.5 pl-1 uppercase tracking-wider">
              Email
            </label>
            <input 
              required 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="ваша@пошта.com" 
              className="w-full bg-brand-blue/5 border border-brand-blue/20 rounded-xl px-4 py-3.5 text-brand-dark font-medium focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all"
            />
          </div>

          {/* Поле Пароль */}
          <div>
            <label className="block text-xs font-bold text-brand-dark/70 mb-1.5 pl-1 uppercase tracking-wider">
              Пароль
            </label>
            <input 
              required 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              placeholder="••••••••" 
              className="w-full bg-brand-blue/5 border border-brand-blue/20 rounded-xl px-4 py-3.5 text-brand-dark font-medium focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all"
            />
          </div>

          {/* Чекбокс та Забули пароль */}
          <div className="flex items-center justify-between mt-[-4px]">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-brand-blue/30 text-brand-blue focus:ring-brand-blue cursor-pointer" />
              <span className="text-sm font-medium text-brand-dark/70 group-hover:text-brand-dark transition-colors">Запам'ятати мене</span>
            </label>
            <a href="#" className="text-sm font-bold text-brand-blue hover:underline hover:text-brand-blue/80">
              Забули пароль?
            </a>
          </div>

          {/* Кнопка Увійти */}
          <button 
            disabled={isLoading} 
            type="submit" 
            className="w-full mt-2 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : 'Увійти в акаунт'}
          </button>
        </form>

        {/* Альтернативний вхід (Google) */}
        <div className="relative flex items-center justify-center mt-8 mb-6">
          <div className="absolute border-t border-brand-blue/10 w-full"></div>
          <span className="bg-white px-3 text-xs font-bold text-brand-dark/40 uppercase tracking-wider relative z-10">
            Або увійдіть через
          </span>
        </div>

        <button type="button" className="w-full flex items-center justify-center gap-3 bg-white border border-brand-blue/20 hover:border-brand-blue/50 hover:bg-brand-blue/5 text-brand-dark font-bold py-3.5 rounded-xl transition-colors shadow-sm cursor-pointer">
          <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </button>

        {/* Перехід на реєстрацію */}
        <div className="mt-8 text-center">
          <span className="text-sm font-medium text-brand-dark/60">Немає акаунта? </span>
          <Link to="/register" className="text-sm font-bold text-brand-blue hover:underline hover:text-brand-blue/80">
            Зареєструватися
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;