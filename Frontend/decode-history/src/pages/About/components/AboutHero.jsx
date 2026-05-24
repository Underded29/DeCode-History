// src/components/About/AboutHero.jsx
import React from 'react';
import heroAbout from '../../../assets/heroAbout.png'; 
// ІМПОРТИ ТВОЇХ ЗОБРАЖЕНЬ (експортуй їх з Figma без фону)
// Якщо ти створиш окремі файли для заголовка та Тризуба, розкоментуй ці лінії:
// import proNasHeaderImg from '../../assets/about/pro-nas-header.png'; 
// import tryzubShieldImg from '../../assets/about/tryzub-shield.png'; 
// import uaFlagImg from '../../assets/about/ua-flag.png'; // Прапор окремо

const AboutHero = () => {
  return (
    // Глобальний контейнер секції (така ж ширина, як на решті сайту)
    <section className="w-full max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-12">
      
      {/* === ЛІВА ЧАСТИНА: ТЕКСТ === */}
      <div className="w-full md:w-1/2 flex flex-col gap-6 text-brand-dark">
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-brand-dark tracking-tight">
          Про нас
        </h1>

        {/* Підзаголовок */}
        <h2 className="text-3xl font-semibold text-brand-blue tracking-tight">
          Що таке DeCode: History
        </h2>
        
        {/* Основний текст (Звичайний текст) */}
        <div className="space-y-4 text-brand-dark text-lg leading-relaxed font-medium">
          <p>
            DeCode: History — це освітній проєкт, що допомагає розпізнавати фейки, маніпуляції та російські міфи.
          </p>
          <p>
            Ми пояснюємо складне простою мовою на фактах і прикладах.
          </p>
          <p>
            Наша мета — сильне суспільство, яке не ведеться на дезінформацію.
          </p>
        </div>
      </div>

      {/* === ПРАВА ЧАСТИНА: ІЛЮСТРАЦІЯ === */}
      <div className="w-full md:w-1/2 flex justify-center items-center relative">
        
        {/* === РОЗКОМЕНТУЙ ЦЕЙ БЛОК, КОЛИ ЕКСПОРТУЄШ КАРТИНКУ (Тризуб + прапор разом) === */}
        <img 
          src={heroAbout} 
          alt="DeCode: Щит з Тризубом та прапор" 
          className="w-full h-auto object-contain drop-shadow-md"
        />

      </div>

    </section>
  );
};

export default AboutHero;