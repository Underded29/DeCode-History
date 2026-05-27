import React from 'react';
import loupeImage from '../../../assets/notebookAndLoupe.png'; 

const MythSidebar = ({ mythXp, user, isSaved, onToggleSave }) => {
  
  const progressPercent = user ? (user.currentXP / user.nextLevelXP) * 100 : 0;
  const xpLeft = user ? user.nextLevelXP - user.currentXP : 0;

  return (
    <div className="flex flex-col gap-6">
      
        <div className="bg-white border border-brand-blue/30 rounded-3xl p-6 shadow-sm flex flex-col">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-lg mb-3">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Правда чекає
            </div>
            <p className="text-sm font-medium text-brand-dark/70 mb-5 leading-relaxed">
                Перевір свої знання, щоб розвінчати міфи та наблизити перемогу правди.
            </p>
            <div className="w-full flex flex-col items-center flex-1 justify-center relative">
                <img 
                    src={loupeImage}
                    alt="Ілюстрація з лупою над книгою" 
                    className="h-28 w-auto object-contain relative z-10" 
                />
            </div>

            {/* МИТТЄВА КНОПКА ЗБЕРЕЖЕННЯ */}
            <button 
              type="button" 
              onClick={onToggleSave}
              className={`mt-6 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold transition-all ${
                isSaved 
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100' 
                  : 'bg-white text-brand-blue border-2 border-brand-blue/30 hover:border-brand-blue hover:bg-brand-blue/5'
              }`}
            >
              {isSaved ? (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  Збережено в профілі
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  Зберегти міф
                </>
              )}
            </button>
        </div>

      <div className="bg-white border border-brand-blue/30 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-3 font-bold text-lg text-brand-dark mb-5">
          <span className="text-2xl">🏆</span> За цей міф ти отримаєш
        </div>
        
        <div className="flex gap-4 mb-6">
          <div className="flex-1 flex items-center gap-3 border border-brand-blue/20 rounded-2xl p-3 bg-brand-blue/5">
            <div className="w-10 h-10 rounded-full bg-white border border-brand-blue/20 text-brand-blue font-bold flex items-center justify-center text-xs">XP</div>
            <span className="font-bold text-brand-dark">до +{mythXp || 50} XP</span>
          </div>
          <div className="flex-1 flex items-center justify-center gap-2 border border-brand-orange/20 rounded-2xl p-3 bg-brand-orange/5">
            <span className="text-xl">🔥</span>
            <span className="font-bold text-brand-dark">Серія</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-brand-dark/60 mb-2">
            {user ? (
              <span>Ще {xpLeft} XP до рівня {user.level + 1}</span>
            ) : (
              <span>Увійдіть, щоб зберігати прогрес</span>
            )}
          </div>
          <div className="w-full h-2 bg-brand-dark/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-blue rounded-full transition-all duration-700 ease-out" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="bg-brand-blue/5 border border-brand-blue/30 rounded-3xl p-6">
        <h3 className="font-bold text-lg text-brand-dark mb-2">Поділись знаннями</h3>
        <p className="text-sm font-medium text-brand-dark/70 mb-4">
          Допоможи іншим розвінчувати міфи. Поділись цією карткою!
        </p>
        <div className="flex gap-3">
          <button className="w-10 h-10 rounded-full bg-white border border-brand-blue/20 flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-colors cursor-pointer text-sm font-bold">TG</button>
          <button className="w-10 h-10 rounded-full bg-white border border-brand-blue/20 flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-colors cursor-pointer text-sm font-bold">FB</button>
          <button className="w-10 h-10 rounded-full bg-white border border-brand-blue/20 flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-colors cursor-pointer text-sm font-bold">X</button>
        </div>
      </div>

    </div>
  );
};

export default MythSidebar;