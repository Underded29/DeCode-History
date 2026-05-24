import React from 'react';

const ProfileStats = ({ stats, currentXP, nextLevelXP }) => {
  return (
    <div className="bg-white border border-brand-blue/30 rounded-[32px] p-6 shadow-sm flex flex-col">
      <h2 className="text-lg font-bold text-brand-blue mb-4">Твій прогрес</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-brand-blue/10">
        
        <div className="flex flex-col items-center justify-center p-2 text-center">
          <svg className="w-8 h-8 text-brand-blue mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          <span className="text-2xl font-bold text-emerald-600">{stats.resolved}</span>
          <span className="text-xs font-medium text-brand-dark/60 uppercase">розвінчано</span>
        </div>
        
        <div className="flex flex-col items-center justify-center p-2 text-center">
          <svg className="w-8 h-8 text-brand-blue mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="text-2xl font-bold text-brand-orange">{stats.inProgress}</span>
          <span className="text-xs font-medium text-brand-dark/60 uppercase">у процесі</span>
        </div>

        <div className="flex flex-col items-center justify-center p-2 text-center">
          <svg className="w-8 h-8 text-brand-blue mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
          <span className="text-2xl font-bold text-brand-blue">{stats.saved}</span>
          <span className="text-xs font-medium text-brand-dark/60 uppercase">збережено</span>
        </div>

        <div className="flex flex-col items-center justify-center p-2 text-center">
          <span className="text-3xl mb-1">🔥</span>
          <span className="text-2xl font-bold text-orange-500">{stats.streakDays}</span>
          <span className="text-xs font-medium text-brand-dark/60 uppercase">днів серії</span>
        </div>

        <div className="flex flex-col items-center justify-center p-2 col-span-2 md:col-span-1 text-center">
          <span className="text-3xl mb-1 text-yellow-400">⭐</span>
          <span className="text-xl font-bold text-brand-dark whitespace-nowrap">{currentXP} / {nextLevelXP} XP</span>
          <span className="text-xs font-medium text-brand-dark/60 uppercase">до наступного рівня</span>
        </div>

      </div>
    </div>
  );
};

export default ProfileStats;