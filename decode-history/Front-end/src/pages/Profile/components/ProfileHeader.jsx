import React, { useRef, useState } from 'react';

const ProfileHeader = ({ user, onAvatarChange }) => {
  // Створюємо референс для прихованого інпуту
  const fileInputRef = useRef(null);
  
  // Стейт для тимчасового прев'ю зображення, якщо воно було завантажене
  const [tempAvatarPreview, setTempAvatarPreview] = useState(null);

  const progressPercent = (user.currentXP / user.nextLevelXP) * 100;

  // Функція-тригер: при кліку на олівець, ми "клікаємо" по прихованому інпуту
  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  // Функція-обробник: викликається, коли користувач обрав файл у вікні браузера
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Отримуємо перший вибраний файл
    
    if (file) {
      // 1. Створюємо тимчасовий URL для прев'ю (Data URL)
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempAvatarPreview(reader.result); // Записуємо Data URL в локальний стейт прев'ю
      };
      reader.readAsDataURL(file);

      // 2. Передаємо сам об'єкт файлу батьківському компоненту (Profile.jsx)
      if (onAvatarChange) {
        onAvatarChange(file);
      }
    }
  };

  return (
    <div className="bg-white border border-brand-blue/30 rounded-[32px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between shadow-sm relative overflow-hidden">
      
      {/* ПРИХОВАНИЙ ІНПУТ ДЛЯ ФАЙЛІВ */}
      <input 
        type="file" 
        ref={fileInputRef} // Прив'язуємо референс
        onChange={handleFileChange} // Обробник зміни
        accept="image/*" // Приймаємо тільки зображення
        className="hidden" // Ховаємо з екрана
      />

      {/* Інформація користувача */}
      <div className="flex items-center gap-6 z-10 w-full md:w-auto">
        {/* Аватарка з кнопкою редагування */}
        <div className="relative shrink-0">
          <div className="w-24 h-24 rounded-full border-2 border-brand-blue/20 overflow-hidden bg-brand-blue/5 flex items-center justify-center">
             
             {/* ЛОГІКА ВІДОБРАЖЕННЯ АВАТАРА */}
             {tempAvatarPreview ? (
               // 1. Показуємо тимчасове прев'ю, якщо воно є
               <img src={tempAvatarPreview} alt="Прев'ю аватара" className="w-full h-full object-cover" />
             ) : user.avatarUrl ? (
               // 2. Інакше показуємо аватар з бази, якщо він є
               <img 
                 src={user.avatarUrl.startsWith('http') ? user.avatarUrl : `https://api.history.science.kh.ua${user.avatarUrl}`} 
                 alt={user.name} 
                 className="w-full h-full object-cover" 
               />
             ) : (
               // 3. Якщо нічого немає - дефолтний емодзі
               <span className="text-4xl">👦🏻</span>
             )}

          </div>
          
          {/* КНОПКА РЕДАГУВАННЯ */}
          <button 
            onClick={handleEditClick} 
            className="absolute bottom-0 right-0 w-8 h-8 bg-white border border-brand-blue/20 rounded-full flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-colors shadow-sm cursor-pointer z-20"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
          </button>
        </div>

        {/* Ім'я та рівень */}
        <div className="flex flex-col gap-2 flex-1">
          <h1 className="text-3xl font-bold text-brand-dark">{user.name}</h1>
          <div className="inline-flex items-center self-start border border-brand-blue/30 text-brand-blue px-3 py-1 rounded-xl text-sm font-bold bg-brand-blue/5">
            Рівень {user.level}
          </div>
          
          {/* Прогрес бар XP */}
          <div className="w-full max-w-xs mt-1">
            <div className="flex justify-between text-xs font-bold text-brand-dark/60 mb-1">
              <span>{user.currentXP} / {user.nextLevelXP} XP</span>
            </div>
            <div className="w-full h-2.5 bg-brand-dark/10 rounded-full overflow-hidden border border-brand-blue/10">
              <div className="h-full bg-brand-blue rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Декоративна ілюстрація (Гори) */}
      <div className="hidden md:block absolute right-0 bottom-0 opacity-80 pointer-events-none">
         <div className="w-64 h-32 flex items-end justify-end pr-4 pb-4 text-brand-blue/20">
            <span className="text-6xl">⛰️</span>
         </div>
      </div>
    </div>
  );
};

export default ProfileHeader;