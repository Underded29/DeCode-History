import React from 'react';
import { Link, useParams } from 'react-router-dom'; // 1. Додали useParams
import { mockMyths } from '../../data/myths'; // 2. Імпортуємо нашу базу (перевір шлях!)

import MythFlipCard from './components/MythFlipCard';
import MythQuiz from './components/MythQuiz';
import MythSidebar from './components/MythSidebar';

const MythDetail = () => {
  // Дістаємо ID з URL (наприклад, з /myth/3 отримаємо "3")
  const { id } = useParams();

  // Шукаємо відповідний міф у нашому масиві за цим ID
  const currentMyth = mockMyths.find((myth) => myth.id === id);

  // Обробка помилки: якщо міф з таким ID не знайдено (запобігає падінню сайту)
  if (!currentMyth) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-brand-blue/5 rounded-full flex items-center justify-center text-brand-blue mb-4">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-brand-dark mb-4">Міф не знайдено</h2>
        <p className="text-brand-dark/70 font-medium mb-6">Здається, такої сторінки не існує або її було видалено.</p>
        <Link to="/catalog" className="bg-brand-blue hover:bg-brand-blue/90 text-white px-6 py-3 rounded-xl font-bold transition-colors">
          Повернутися до каталогу
        </Link>
      </div>
    );
  }

  // Форматуємо дані під ту структуру, яку очікує наш компонент MythFlipCard
  const cardData = {
    fakeTitle: currentMyth.title,
    fakeNarrative: currentMyth.fakeNarrative,
    truthTitle: "Спростування міфу", // Якщо в базі колись з'явиться поле truthTitle, можна буде замінити
    truthFact: currentMyth.truthFact
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 py-8 mb-12">
      
      {/* Кнопка "Назад" */}
      <Link 
        to="/catalog" 
        className="inline-flex items-center gap-2 text-brand-blue font-bold hover:opacity-80 transition-opacity mb-6"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Назад до каталогу
      </Link>

      {/* Сітка макета (2 колонки контент, 1 колонка сайдбар) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* ЛІВА ЧАСТИНА (Контент) */}
        <div className="lg:col-span-2 flex flex-col gap-2">
          {/* Картка, що перевертається (передаємо відформатовані динамічні дані) */}
          <MythFlipCard mythData={cardData} />
          
          {/* Блок із тестом */}
          <MythQuiz 
            quizzes={currentMyth.quizzes} 
            currentId={id} 
            totalMyths={mockMyths.length} 
          />    
        </div>

        {/* ПРАВА ЧАСТИНА (Сайдбар) */}
        <div className="lg:col-span-1 sticky top-[120px]">
          <MythSidebar />
        </div>

      </div>
    </div>
  );
};

export default MythDetail;