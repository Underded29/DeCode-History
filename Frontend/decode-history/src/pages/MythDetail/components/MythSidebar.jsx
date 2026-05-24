import React from 'react';
import loupeImage from '../../../assets/notebookAndLoupe.png'; // Замініть на шлях до вашого зображення

const MythSidebar = () => {
  return (
    <div className="flex flex-col gap-6">
      
        {/* 1. Блок з ілюстрацією та описом */}
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
                {/* Ілюстрація */}
                <img 
                    src={loupeImage}
                    alt="Ілюстрація з лупою над книгою" 
                    className="h-28 w-auto object-contain relative z-10" 
                />
            </div>

        </div>

      {/* 2. Блок "За цей міф ти отримаєш" */}
      <div className="bg-white border border-brand-blue/30 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-3 font-bold text-lg text-brand-dark mb-5">
          <span className="text-2xl">🏆</span> За цей міф ти отримаєш
        </div>
        <div className="flex gap-4 mb-6">
          <div className="flex-1 flex items-center gap-3 border border-brand-blue/20 rounded-2xl p-3 bg-brand-blue/5">
            <div className="w-10 h-10 rounded-full bg-white border border-brand-blue/20 text-brand-blue font-bold flex items-center justify-center text-xs">XP</div>
            <span className="font-bold text-brand-dark">+50 XP</span>
          </div>
          <div className="flex-1 flex items-center gap-3 border border-brand-blue/20 rounded-2xl p-3 bg-brand-orange/5">
            <div className="w-10 h-10 rounded-full bg-white border border-brand-orange/30 text-brand-orange text-xl flex items-center justify-center">⭐</div>
            <span className="font-bold text-brand-dark">+1 до серії</span>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs font-bold text-brand-dark/60 mb-2">
            <span>Ще 30 XP до нового рівня</span>
          </div>
          <div className="w-full h-2 bg-brand-dark/10 rounded-full overflow-hidden">
            <div className="h-full bg-brand-blue w-[85%] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* 3. Блок "Поділись знаннями" */}
      <div className="bg-brand-blue/5 border border-brand-blue/30 rounded-3xl p-6">
        <h3 className="font-bold text-lg text-brand-dark mb-2">Поділись знаннями</h3>
        <p className="text-sm font-medium text-brand-dark/70 mb-4">
          Допоможи іншим розвінчувати міфи. Поділись цією карткою!
        </p>
        <div className="flex gap-3">
          {/* Іконки соцмереж (заглушки) */}
          <button className="w-10 h-10 rounded-full bg-white border border-brand-blue/20 flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-colors cursor-pointer text-lg">Telegram</button>
          <button className="w-10 h-10 rounded-full bg-white border border-brand-blue/20 flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-colors cursor-pointer text-lg">FB</button>
          <button className="w-10 h-10 rounded-full bg-white border border-brand-blue/20 flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-colors cursor-pointer text-lg">X</button>
        </div>
      </div>

    </div>
  );
};

export default MythSidebar;