import React, { useState } from 'react';

const MythFlipCard = ({ mythData }) => {
  const [isFlipped, setIsFlipped] = useState(false); 

  return (
    <div className="w-full flex flex-col gap-4">
      <div 
        className="relative w-full cursor-pointer group"
        style={{ perspective: '1000px' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div 
          className="relative w-full transition-transform duration-700 ease-in-out"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' 
          }}
        >
          {/* ================= ФРОНТАЛЬНА СТОРОНА ================= */}
          <div 
            className="relative w-full min-h-[350px] bg-white border border-brand-blue/30 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 lg:gap-8 shadow-sm group-hover:shadow-md transition-shadow overflow-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="w-full md:w-[45%] lg:w-[40%] flex flex-col justify-center gap-4">
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider border border-red-100 self-start">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Міф
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-dark leading-tight">
                {mythData.fakeTitle}
              </h2>
              <p className="text-brand-dark/70 font-medium text-base md:text-lg leading-relaxed">
                {mythData.fakeNarrative}
              </p>
            </div>
            
            <div className="relative w-full md:w-[55%] lg:w-[60%] min-h-[200px] md:min-h-full rounded-2xl overflow-hidden border-2 border-red-100 flex items-center justify-center bg-red-50">
               {/* Виводимо картинку завжди */}
               <img src={mythData.image} alt={mythData.fakeTitle} className="absolute inset-0 w-full h-full object-cover filter grayscale opacity-80 mix-blend-multiply" />
            </div>
          </div>

          {/* ================= ТИЛЬНА СТОРОНА ================= */}
          <div 
            className="absolute top-0 left-0 w-full h-full bg-white border border-brand-blue/30 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 lg:gap-8 shadow-sm group-hover:shadow-md transition-shadow overflow-hidden"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)' 
            }}
          >
            <div className="w-full md:w-[45%] lg:w-[40%] flex flex-col justify-center gap-4 overflow-y-auto pr-2 custom-scrollbar">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider border border-emerald-100 self-start sticky top-0 z-10">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Правда
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-dark leading-tight">
                {mythData.truthTitle}
              </h2>
              <div 
                className="text-brand-dark/80 font-medium text-base leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: mythData.truthFact }}
              />
            </div>
            
            <div className="relative w-full md:w-[55%] lg:w-[60%] min-h-[200px] md:min-h-full rounded-2xl overflow-hidden border-2 border-emerald-100 flex items-center justify-center bg-emerald-50">
               {/* Виводимо картинку завжди */}
               <img src={mythData.image} alt="Правда" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-brand-blue font-semibold text-sm animate-pulse cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Натисни на картку, щоб перевернути та дізнатись {isFlipped ? 'міф' : 'правду'}
      </div>
    </div>
  );
};

export default MythFlipCard;