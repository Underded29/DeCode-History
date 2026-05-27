import React, { useState } from 'react';

const NewsletterBanner = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    
    // ВАЛІДАЦІЯ EMAIL: Має бути формат name@domain.com
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Будь ласка, введіть коректний email (наприклад, name@example.com)');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
      return; // Перериваємо виконання, запит не відправляється
    }

    try {
      const response = await fetch("http://localhost:5001/api/users/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setErrorMessage(data.error || 'Щось пішло не так. Спробуйте ще раз.');
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch (error) {
      console.error("Помилка підписки:", error);
      setErrorMessage('Не вдалося зʼєднатися з сервером. Перевірте підключення.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 my-8 mb-20">
      <div className="bg-white border border-brand-blue/20 rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm relative overflow-hidden">
        
        {status === 'success' && (
          <div className="absolute inset-0 bg-emerald-500 flex items-center justify-center z-10 animate-fade-in">
            <p className="text-white font-bold text-lg flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Дякуємо! Ви успішно підписані на розсилку DeCode.
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="absolute inset-0 bg-red-500 flex items-center justify-center z-10 animate-fade-in px-4 text-center">
            <p className="text-white font-bold text-lg flex items-center justify-center gap-2">
              <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              {errorMessage}
            </p>
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left w-full lg:w-1/2">
          <div className="text-brand-dark shrink-0">
            <svg className="w-16 h-16 stroke-[1.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-brand-dark mb-2">
              Будь у курсі нових міфів та спростувань
            </h3>
            <p className="text-sm text-brand-dark/70 leading-relaxed">
              Підпишись на розсилку, щоб отримувати перевірені найважливіші матеріали та новини проєкту.
            </p>
          </div>
        </div>

        <form className="flex flex-col sm:flex-row gap-3 w-full lg:w-1/2 justify-end" onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введіть ваш email" 
            required
            disabled={status === 'submitting'}
            className="flex-1 w-full max-w-sm px-5 py-3 border border-brand-dark/20 rounded-xl focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-brand-dark placeholder-brand-dark/40 transition-all disabled:opacity-50"
          />
          <button 
            type="submit"
            disabled={status === 'submitting'}
            className="bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-md shadow-brand-blue/20 cursor-pointer whitespace-nowrap disabled:opacity-70 flex items-center justify-center min-w-[140px]"
          >
            {status === 'submitting' ? (
               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Підписатись →'
            )}
          </button>
        </form>

      </div>
    </div>
  );
};

export default NewsletterBanner;