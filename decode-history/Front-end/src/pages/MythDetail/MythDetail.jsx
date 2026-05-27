import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; 

import MythFlipCard from './components/MythFlipCard';
import MythQuiz from './components/MythQuiz';
import MythSidebar from './components/MythSidebar';
import { useMythsData } from '../MythContext/MythContext'; 
import { fetchUserProfile, toggleSaveMythService } from '../../services/userService'; 

const MythDetail = () => {
  const { id } = useParams();
  const { myths, loading } = useMythsData();
  
  const [user, setUser] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const loadUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const data = await fetchUserProfile();
        setUser(data);
        
        if (data.savedMyths && data.savedMyths.map(String).includes(id.toString())) {
          setIsSaved(true);
        } else {
          setIsSaved(false);
        }
      } catch (error) {
        console.error("Помилка завантаження профілю:", error);
      }
    }
  };

  useEffect(() => {
    loadUser();
  }, [id]);

  const currentMyth = myths.find(m => m.id === id);

  // МИТТЄВЕ ЗБЕРЕЖЕННЯ
  const handleToggleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Увійдіть у систему, щоб зберігати міфи!");
      return;
    }
    
    // Запам'ятовуємо старий стан на випадок помилки сервера
    const previousState = isSaved;
    
    // Миттєво перемикаємо колір кнопки
    setIsSaved(!isSaved); 
    
    try {
      // Відправляємо запит
      const response = await toggleSaveMythService(id);
      setIsSaved(response.isSaved); 
    } catch (error) {
      console.error("ПОМИЛКА БЕКЕНДУ ПРИ ЗБЕРЕЖЕННІ:", error.message);
      // Відкочуємо кнопку назад, якщо сервер не зберіг
      setIsSaved(previousState);
      alert("Не вдалося зберегти міф. Перевірте консоль (F12) на наявність помилок.");
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
        <p className="mt-4 font-medium text-brand-dark/60">Завантажуємо матеріали міфу...</p>
      </div>
    );
  }

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

  const cardData = {
    ...currentMyth, 
    fakeTitle: currentMyth.title,
    fakeNarrative: currentMyth.fakeNarrative,
    truthTitle: "Спростування міфу", 
    truthFact: currentMyth.truthFact,
    image: currentMyth.image 
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 py-8 mb-12">
      
      <Link 
        to="/catalog" 
        className="inline-flex items-center gap-2 text-brand-blue font-bold hover:opacity-80 transition-opacity mb-6"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Назад до каталогу
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 flex flex-col gap-2">
          <MythFlipCard mythData={cardData} />
          
          {currentMyth.quizzes && currentMyth.quizzes.length > 0 && (
             <MythQuiz 
               quizzes={currentMyth.quizzes} 
               currentId={id} 
               mythXp={currentMyth.xp || 50} 
               onQuizComplete={loadUser} 
             />  
          )}
        </div>

        <div className="lg:col-span-1 sticky top-[120px]">
          <MythSidebar 
            mythXp={currentMyth.xp} 
            user={user} 
            isSaved={isSaved} 
            onToggleSave={handleToggleSave} 
          />
        </div>
      </div>
    </div>
  );
};

export default MythDetail;