import React from 'react';

const ProfileRecentActivity = ({ activities }) => {
  return (
    <div className="bg-white border border-brand-blue/30 rounded-[32px] p-6 shadow-sm flex flex-col h-full">
      <h3 className="text-lg font-bold text-brand-blue mb-4">Останні 3 дії</h3>
      <div className="flex flex-col gap-3 flex-1">
        {activities.map(activity => (
          <div key={activity.id} className="flex items-center gap-3 p-3 border border-brand-blue/10 rounded-2xl bg-white hover:border-brand-blue/30 transition-colors">
            <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center border ${activity.bgColor} ${activity.iconColor}`}>
               {activity.type === 'resolved' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
               {activity.type === 'progress' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
               {activity.type === 'saved' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>}
            </div>
            <div className="flex-1 flex items-center justify-between gap-2">
              <p className="text-xs font-bold text-brand-dark line-clamp-2 leading-tight">{activity.title}</p>
              <span className="text-xs font-medium text-brand-dark/50 shrink-0">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
      <button className="text-sm font-bold text-brand-blue hover:underline mt-4 text-center">
        Переглянути всю активність →
      </button>
    </div>
  );
};

export default ProfileRecentActivity;