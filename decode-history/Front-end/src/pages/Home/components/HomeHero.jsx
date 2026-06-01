import React from 'react';
import { Link } from 'react-router-dom';

const HomeHero = () => {
  return (
    // Використовуємо семантичний тег section. Контейнер відцентрований та має гнучкі відступи (my-12 md:my-20)
    <section className="max-w-3xl mx-auto space-y-6 text-center my-12 md:my-20 px-4">
      
      {/* Заголовок із використанням фірмових кольорів */}
      <h1 className="text-4xl md:text-5xl font-bold text-brand-dark leading-tight">
        Розвінчуємо російські міфи. <br/>
        <span className="text-brand-blue">Пізнаємо правду. Захищаємо Україну.</span>
      </h1>
      
      {/* Опис.*/}
      <p className="text-base md:text-lg text-brand-dark/70 max-w-2xl mx-auto leading-relaxed">
        DeCode — проєкт, який допомагає розпізнавати фейки, маніпуляції та російську пропаганду. 
        Перевірені факти, аргументи та знання — твоя зброя проти брехні.
      </p>

      {/* Головна кнопка. */}
      <Link 
        to="/catalog" 
        className="inline-block bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold py-3.5 px-8 rounded-xl shadow-lg shadow-brand-blue/20 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
      >
        Почати спростування →
      </Link>

      {/* Блок із лічильником користувачів */}
      <div className="pt-4 flex items-center justify-center gap-3 text-sm text-brand-dark/60 font-medium">
        <div className="flex -space-x-2">
          <div className="w-8 h-8 rounded-full bg-brand-dark/10 border-2 border-brand-light"></div>
          <div className="w-8 h-8 rounded-full bg-brand-dark/20 border-2 border-brand-light"></div>
          <div className="w-8 h-8 rounded-full bg-brand-dark/30 border-2 border-brand-light"></div>
        </div>
        <span>Приєдналось понад 120 000 свідомих українців</span>
      </div>

    </section>
  );
};

export default HomeHero;