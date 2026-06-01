import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 

const ProfileRecentActivity = ({ activities = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('uk-UA', { day: 'numeric', month: 'short' });
  };

  const previewActivities = activities.slice(0, 3);

  const renderActivityItem = (activity, index) => (
    <Link 
      to={`/myth/${activity.mythId}`} 
      key={index} 
      className="flex items-center gap-3 p-3 border border-brand-blue/10 rounded-2xl bg-white hover:border-brand-blue/40 hover:shadow-sm transition-all cursor-pointer group"
    >
      <div className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center border bg-emerald-50 border-emerald-100 text-emerald-500 group-hover:bg-emerald-100 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <p className="text-xs font-bold text-brand-dark line-clamp-2 leading-tight mb-1 group-hover:text-brand-blue transition-colors">
          {activity.title}
        </p>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-brand-dark/60">
            Розвінчано • <span className="text-emerald-600 font-bold">+{activity.xp} XP</span>
          </span>
          {activity.date && <span className="text-[10px] font-bold text-brand-dark/40 uppercase shrink-0">{formatDate(activity.date)}</span>}
        </div>
      </div>
      <svg className="w-4 h-4 shrink-0 text-brand-dark/20 group-hover:text-brand-blue mr-1 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );

  return (
    <>
      <div className="bg-white border border-brand-blue/30 rounded-[32px] p-6 shadow-sm flex flex-col h-full">
        <h3 className="text-lg font-bold text-brand-blue mb-4">Останні дії</h3>
        
        <div className="flex flex-col gap-3 flex-1">
          {activities.length > 0 ? (
            previewActivities.map((activity, index) => renderActivityItem(activity, index))
          ) : (
            <p className="text-brand-dark/50 text-sm font-medium mt-4 text-center">
              У вас ще немає недавньої активності.
            </p>
          )}
        </div>

        {activities.length > 3 && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-sm font-bold text-brand-blue hover:underline mt-4 text-center cursor-pointer"
          >
            Переглянути всю активність ({activities.length}) →
          </button>
        )}
      </div>

      {/* МОДАЛЬНЕ ВІКНО З АНІМАЦІЄЮ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-brand-dark/70 backdrop-blur-sm cursor-pointer animate-fade-in" 
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[80vh] animate-fade-in-up">
            
            <div className="flex items-center justify-between p-6 border-b border-brand-blue/10 bg-brand-blue/5">
              <h3 className="text-xl font-bold text-brand-dark flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                Історія активності
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-brand-dark/50 hover:text-brand-dark bg-white rounded-xl transition-colors cursor-pointer">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex flex-col gap-3 custom-scrollbar">
              {activities.map((activity, index) => renderActivityItem(activity, index))}
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default ProfileRecentActivity;