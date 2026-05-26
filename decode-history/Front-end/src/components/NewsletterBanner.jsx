import React from 'react';

const NewsletterBanner = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 my-8 mb-20">
      <div className="bg-white border border-brand-blue/20 rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm">
        
        {/* Ліва частина: Іконка + Текст */}
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

        {/* Права частина: Форма (Input + Button) */}
        <form className="flex flex-col sm:flex-row gap-3 w-full lg:w-1/2 justify-end" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Введіть ваш email" 
            required
            className="flex-1 w-full max-w-sm px-5 py-3 border border-brand-dark/20 rounded-xl focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-brand-dark placeholder-brand-dark/40 transition-all"
          />
          <button 
            type="submit"
            className="bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-md shadow-brand-blue/20 cursor-pointer whitespace-nowrap"
          >
            Підписатись →
          </button>
        </form>

      </div>
    </div>
  );
};

export default NewsletterBanner;