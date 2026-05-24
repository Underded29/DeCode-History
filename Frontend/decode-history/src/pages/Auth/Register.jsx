import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const name = e.target.name;
    
    setFormData({ ...formData, [name]: value });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Ім'я є обов'язковим";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Ім'я має містити мінімум 2 символи";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email є обов'язковим";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Введіть коректний формат email";
    }

    if (!formData.password) {
      newErrors.password = "Введіть пароль";
    } else if (formData.password.length < 8) {
      newErrors.password = "Мінімум 8 символів";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Підтвердіть пароль";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Паролі не збігаються";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "Необхідна згода з правилами";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/profile'); 
    }, 1500);
  };

  const getInputClass = (fieldName) => `
    w-full bg-brand-blue/5 border rounded-xl px-4 py-3 text-brand-dark font-medium focus:outline-none focus:ring-2 transition-all
    ${errors[fieldName] 
      ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50' 
      : 'border-brand-blue/20 focus:border-brand-blue focus:ring-brand-blue/20'}
  `;

  return (
    <div className="w-full min-h-[75vh] flex items-center justify-center px-4 py-12 relative">
      <div className="absolute top-1/4 right-10 w-32 h-32 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="bg-white border border-brand-blue/30 rounded-[32px] p-8 md:p-10 shadow-sm w-full max-w-md relative z-10">
        
        {/* НОВА: Органічна мальована лінія зверху (замість прямого div) */}
        <div className="absolute top-[-2px] left-0 right-0 w-full flex justify-center pointer-events-none overflow-hidden rounded-t-[32px]">
          <svg 
            viewBox="0 0 400 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-[102%] h-auto text-brand-blue opacity-90 transform -translate-y-1"
            preserveAspectRatio="none"
          >
            {/* Основна лінія */}
            <path 
              d="M2 15 C 10 5, 50 2, 100 4 C 150 6, 250 2, 300 4 C 350 6, 390 5, 398 15" 
              stroke="currentColor" 
              strokeWidth="3" 
              strokeLinecap="round" 
              className="opacity-90"
            />
            {/* Текстурні штрихи для ефекту олівця */}
            <path 
              d="M5 14 C 20 6, 60 3, 110 5 C 160 7, 240 3, 290 5 C 340 7, 380 6, 395 14" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              className="opacity-50"
            />
            <path 
              d="M10 13 C 30 7, 70 4, 120 5.5 C 170 7, 230 4, 280 5.5 C 330 7, 370 7, 390 13" 
              stroke="currentColor" 
              strokeWidth="1" 
              strokeLinecap="round" 
              className="opacity-40"
            />
          </svg>
        </div>

        <div className="text-center mb-8 mt-2">
          <div className="w-16 h-16 bg-brand-blue/5 border border-brand-blue/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-brand-blue">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-brand-dark mb-2">Створити акаунт</h1>
          <p className="text-brand-dark/70 font-medium">Приєднуйтесь, щоб зберігати міфи та відстежувати свій прогрес.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          
          <div>
            <label className="block text-xs font-bold text-brand-dark/70 mb-1 pl-1 uppercase tracking-wider">
              Ваше ім'я <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Ім'я або Нікнейм" 
              className={getInputClass('name')}
            />
            {errors.name && <p className="text-red-500 text-xs font-bold mt-1.5 pl-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-dark/70 mb-1 pl-1 uppercase tracking-wider">
              Email <span className="text-red-500">*</span>
            </label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="ваша@пошта.com" 
              className={getInputClass('email')}
            />
            {errors.email && <p className="text-red-500 text-xs font-bold mt-1.5 pl-1">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Поле Пароль */}
            <div>
              <label className="block text-xs font-bold text-brand-dark/70 mb-1 pl-1 uppercase tracking-wider">
                Пароль <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  placeholder="••••••••" 
                  className={`${getInputClass('password')} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-dark/40 hover:text-brand-blue transition-colors focus:outline-none p-1"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs font-bold mt-1.5 pl-1">{errors.password}</p>}
            </div>

            {/* Поле Підтвердження */}
            <div>
              <label className="block text-xs font-bold text-brand-dark/70 mb-1 pl-1 uppercase tracking-wider">
                Підтвердження <span className="text-red-500">*</span>
              </label>
              <input 
                type={showPassword ? "text" : "password"} 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                placeholder="••••••••" 
                className={getInputClass('confirmPassword')}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs font-bold mt-1.5 pl-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          <div className="mt-2">
            <label className="flex items-start gap-2 cursor-pointer group">
              <input 
                type="checkbox" 
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className={`w-4 h-4 mt-0.5 rounded focus:ring-2 cursor-pointer shrink-0 transition-colors ${
                  errors.agreeToTerms 
                    ? 'border-red-400 text-red-500 focus:ring-red-500/20' 
                    : 'border-brand-blue/30 text-brand-blue focus:ring-brand-blue/20'
                }`} 
              />
              <span className="text-sm font-medium text-brand-dark/70 group-hover:text-brand-dark transition-colors leading-tight">
                Я погоджуюсь з <a href="#" className="text-brand-blue font-bold hover:underline">Правилами використання</a> та <a href="#" className="text-brand-blue font-bold hover:underline">Політикою конфіденційності</a>
              </span>
            </label>
            {errors.agreeToTerms && <p className="text-red-500 text-xs font-bold mt-1.5 pl-1">{errors.agreeToTerms}</p>}
          </div>

          <button 
            disabled={isLoading} 
            type="submit" 
            className="w-full mt-4 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : 'Зареєструватися'}
          </button>
        </form>

        <div className="relative flex items-center justify-center mt-6 mb-5">
          <div className="absolute border-t border-brand-blue/10 w-full"></div>
          <span className="bg-white px-3 text-xs font-bold text-brand-dark/40 uppercase tracking-wider relative z-10">
            Або через
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

        <div className="mt-6 text-center">
          <span className="text-sm font-medium text-brand-dark/60">Вже є акаунт? </span>
          <Link to="/login" className="text-sm font-bold text-brand-blue hover:underline hover:text-brand-blue/80">
            Увійти
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Register;