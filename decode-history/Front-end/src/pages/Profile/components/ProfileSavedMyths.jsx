import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProfileSavedMyths = ({ savedMyths = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  const previewMyths = savedMyths.slice(0, 3);

  const renderMythItem = (myth, index) => (
    <Link 
      to={`/myth/${myth.id}`} 
      key={myth.id || index} 
      className="flex items-center gap-3 p-2 border border-brand-blue/10 rounded-2xl cursor-pointer hover:border-brand-blue/40 hover:shadow-sm transition-all group bg-white"
    >
      <div className="w-16 h-12 shrink-0 bg-brand-blue/5 rounded-lg border border-brand-blue/20 flex items-center justify-center text-xl text-brand-blue/50 overflow-hidden">
          {myth.image ? <img src={myth.image} alt={myth.title} className="w-full h-full object-cover" /> : '📄'}
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold text-brand-dark leading-tight group-hover:text-brand-blue line-clamp-1 mb-1">
          {myth.title}
        </p>
        <p className="text-xs font-medium text-brand-dark/50 line-clamp-1">
          {myth.category || 'Міф'}
        </p>
      </div>
      <svg className="w-5 h-5 shrink-0 text-brand-dark/30 group-hover:text-brand-blue mr-2 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );

  return (
    <>
      <div className="bg-white border border-brand-blue/30 rounded-[32px] p-6 shadow-sm flex flex-col h-full">
        <h3 className="text-lg font-bold text-brand-blue mb-4">Збережені міфи</h3>
        
        <div className="flex flex-col gap-3 flex-1">
          {savedMyths.length > 0 ? (
            previewMyths.map((myth, index) => renderMythItem(myth, index))
          ) : (
            <p className="text-brand-dark/50 text-sm font-medium mt-4 text-center">
              Ви ще не зберегли жодного міфу.
            </p>
          )}
        </div>

        {savedMyths.length > 3 && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-sm font-bold text-brand-blue hover:underline mt-4 text-center cursor-pointer"
          >
            Переглянути всі збережені ({savedMyths.length}) →
          </button>
        )}
      </div>

      {/* МОДАЛЬНЕ ВІКНО З АНІМАЦІЄЮ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Темний фон - плавна поява */}
          <div 
            className="absolute inset-0 bg-brand-dark/70 backdrop-blur-sm cursor-pointer animate-fade-in" 
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          {/* Картка модалки - виринає знизу */}
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[80vh] animate-fade-in-up">
            
            <div className="flex items-center justify-between p-6 border-b border-brand-blue/10 bg-brand-blue/5">
              <h3 className="text-xl font-bold text-brand-dark flex items-center gap-2">
                <svg className="w-6 h-6 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                Всі збережені міфи
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-brand-dark/50 hover:text-brand-dark bg-white rounded-xl transition-colors cursor-pointer">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex flex-col gap-3 custom-scrollbar">
              {savedMyths.map((myth, index) => renderMythItem(myth, index))}
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default ProfileSavedMyths;