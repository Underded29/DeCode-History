import React, { useState, useEffect } from 'react';

const MythFlipCard = ({ mythData }) => {
  const [isFlipped, setIsFlipped] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  const acf = mythData.acf || {};

  // Шукаємо розширений текст спочатку в acf, потім просто в mythData
  const extendedRefutation = 
    acf.extended_refutation || 
    mythData.extended_refutation || 
    mythData.extendedRefutation || 
    `<p class="mb-4 text-brand-dark/50">Детальне спростування ще не додано.</p>`;

  // ДИНАМІЧНИЙ ЗБІР ДЖЕРЕЛ 
  let sources = [];
  
  if (mythData.sources && Array.isArray(mythData.sources)) {
    // Якщо масив джерел прийшов з локального файлу
    sources = mythData.sources;
  } else {
    // Якщо джерела приходять як окремі поля (з WordPress або локально)
    for (let i = 1; i <= 4; i++) {
      const title = acf[`source_${i}_title`] || mythData[`source_${i}_title`] || mythData[`source${i}Title`];
      const url = acf[`source_${i}_url`] || mythData[`source_${i}_url`] || mythData[`source${i}Url`];
      const text = acf[`source_${i}_text`] || mythData[`source_${i}_text`] || mythData[`source${i}Text`];

      if (title) {
        sources.push({
          id: i,
          title: title,
          url: url || "#",
          text: text || ""
        });
      }
    }
  }

  return (
    <>
      <div className="w-full flex flex-col gap-4 relative z-10">
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
            {/* ================= ФРОНТАЛЬНА СТОРОНА (МІФ) ================= */}
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
              
              <div className="relative w-full md:w-[55%] lg:w-[60%] min-h-[200px] md:min-h-full rounded-2xl overflow-hidden border-2 border-red-100 flex items-center justify-center bg-red-50 shrink-0">
                 <img src={mythData.image} alt={mythData.fakeTitle} className="absolute inset-0 w-full h-full object-cover filter grayscale opacity-80 mix-blend-multiply" />
              </div>
            </div>

            {/* ================= ТИЛЬНА СТОРОНА (ПРАВДА) ================= */}
            <div 
              className="absolute top-0 left-0 w-full h-full bg-white border border-brand-blue/30 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 lg:gap-8 shadow-sm group-hover:shadow-md transition-shadow overflow-hidden"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)' 
              }}
            >
              <div className="w-full md:w-[45%] lg:w-[40%] flex flex-col h-full overflow-hidden">
                
                {/* 1. Статична шапка */}
                <div className="shrink-0 flex flex-col gap-4 mb-4">
                  <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider border border-emerald-100 self-start">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Правда
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-brand-dark leading-tight">
                    {mythData.truthTitle}
                  </h2>
                </div>
                
                {/* 2. Короткий факт */}
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  <div 
                    className="text-brand-dark/80 font-medium text-base leading-relaxed space-y-4"
                    dangerouslySetInnerHTML={{ __html: mythData.truthFact }}
                  />
                </div>

                {/* 3. Кнопка "Детальніше" */}
                <div className="shrink-0 mt-4 pt-4 border-t border-emerald-100">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); 
                      setIsModalOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-blue/90 text-white px-5 py-3.5 rounded-xl font-bold transition-all cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Детальне спростування
                  </button>
                </div>

              </div>
              
              <div className="relative w-full md:w-[55%] lg:w-[60%] min-h-[200px] md:min-h-full rounded-2xl overflow-hidden border-2 border-emerald-100 flex items-center justify-center bg-emerald-50 shrink-0 hidden md:flex">
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

      {/* ================= МОДАЛЬНЕ ВІКНО ДЖЕРЕЛ ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-brand-dark/70 backdrop-blur-sm transition-opacity cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
            
            <div className="flex items-center justify-between p-6 border-b border-brand-blue/10 bg-brand-blue/5">
              <h3 className="text-xl md:text-2xl font-bold text-brand-dark flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white border border-brand-blue/20 flex items-center justify-center text-brand-blue shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                Розширене спростування
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-brand-dark/50 hover:text-brand-dark hover:bg-brand-blue/10 rounded-xl transition-colors cursor-pointer shrink-0"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto max-h-[70vh] flex flex-col gap-8 custom-scrollbar">
              
              <div className="text-brand-dark/90 font-medium text-base md:text-lg leading-relaxed space-y-4">
                <h4 className="text-lg font-bold text-brand-blue mb-2">Історичний контекст</h4>
                <div dangerouslySetInnerHTML={{ __html: extendedRefutation }} />
              </div>
              
              {/* Відображаємо блок з джерелами ТІЛЬКИ якщо вони є */}
              {sources.length > 0 && (
                <>
                  <div className="w-full h-px bg-brand-blue/10"></div>
                  <div>
                    <h4 className="text-lg font-bold text-brand-dark mb-4 flex items-center gap-2">
                      <span className="text-xl">🔗</span> Джерела та матеріали
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sources.map((source, index) => (
                        <div key={source.id || index} className="p-5 border border-brand-blue/20 rounded-2xl bg-white hover:border-brand-blue/50 hover:shadow-sm transition-all group flex flex-col h-full">
                          <h5 className="font-bold text-brand-dark mb-2 group-hover:text-brand-blue transition-colors">
                            {source.title}
                          </h5>
                          <p className="text-sm font-medium text-brand-dark/70 mb-4 leading-relaxed line-clamp-3 flex-1">
                            {source.text}
                          </p>
                          <a 
                            href={source.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-blue hover:underline self-start"
                          >
                            Відкрити посилання
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MythFlipCard;