import React from 'react';

const AboutDetails = () => {
  const details = [
    {
      id: 'problem',
      title: 'Проблематика: Історія як зброя',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      content: (
        <>
          Ворог використовує <strong>інформаційні операції</strong> для делегітимізації нашого суверенітету, привласнюючи історичні постаті та поширюючи псевдоісторичні наративи.
          <br /><br />
          Головна мішень — <strong>молодь 13–18 років</strong>. Пропаганда розмиває їхню національну ідентичність. Наш проєкт — це <strong>цифрова відповідь</strong> на цей виклик.
        </>
      )
    },
    {
      id: 'solution',
      title: 'Наше рішення: Мікронавчання та гра',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      content: (
        <>
          Ми відмовилися від нудних лонгрідів і пасивного відео. Інформація подається через інтерактивні картки <strong>"Міф проти Факту"</strong>, адаптовані під кліпове мислення. 
          <br /><br />
          Увесь контент <strong>верифікується фаховими істориками</strong> (на відміну від Вікіпедії). А завдяки системі <strong>XP та досягнень</strong>, навчання перетворюється на захопливу гру.
        </>
      )
    },
    {
      id: 'audience',
      title: 'Для кого ми створюємо DeCode',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      content: (
        <>
          Ядро аудиторії — <strong>українські школярі</strong>, яким потрібен цифровий "імунітет". 
          <br /><br />
          Особливий фокус на <strong>дітях у діаспорі</strong>, для яких платформа стане місточком для збереження ідентичності. А для <strong>вчителів</strong> ми пропонуємо сучасний інструмент гейміфікації уроків та боротьби з дезінформацією.
        </>
      )
    },
    {
      id: 'impact',
      title: 'Соціальний вплив: Новий стандарт',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      content: (
        <>
          DeCode — це цифровий щит <strong>національної безпеки</strong>. Ми формуємо <strong>культуру фактчекінгу</strong>, щоб критичне мислення стало базовою звичкою. 
          <br /><br />
          Наша глобальна візія — інтегрувати платформу в <strong>державну програму освіти</strong> як офіційний цифровий посібник нового покоління.
        </>
      )
    },
    {
      id: 'future',
      title: 'Масштабування та Майбутнє',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      content: (
        <>
          Історія — це лише перший крок. Ми активно розширюємо освітні напрямки: <strong>DeCode: Culture</strong> (культура та архітектурні пам'ятки), <strong>DeCode: Law</strong> (правознавство та громадянська освіта), а також <strong>DeCode: Cyber</strong> (основи OSINT та кібербезпеки).
          <br /><br />
          Паралельно ми працюємо над міжнародним розвитком. Це підтримка діаспори через <strong>локалізацію для ЄС, США та Канади</strong>, та інтеграція із <strong>закордонними українськими школами</strong>. Окремий вектор — <strong>Soft Power</strong>: створення курсів про Україну для іноземців, щоб світ знав правду.
        </>
      )
    }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12">
      
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
          Суть проєкту DeCode
        </h2>
        <p className="text-lg text-brand-dark/70 font-medium max-w-3xl">
          Від ідеї до соціального імпакту: чому ми створюємо цей продукт та як він змінить підхід до вивчення історії та інформаційної гігієни.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {details.map((item, index) => (
          <div 
            key={item.id} 
            className={`border border-brand-blue/30 rounded-3xl p-6 md:p-8 bg-white shadow-sm hover:shadow-md hover:border-brand-blue/50 transition-all group flex flex-col ${
              index === 3 ? 'md:col-span-2 lg:col-span-1' : ''
            } ${index === 4 ? 'md:col-span-2 lg:col-span-2' : ''}`}
          >
            {/* Іконка */}
            <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-5 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            
            {/* Заголовок */}
            <h3 className="text-xl font-bold text-brand-dark mb-4 leading-tight">
              {item.title}
            </h3>
            
            {/* Текст */}
            <p className="text-brand-dark/75 font-medium leading-relaxed [&>strong]:text-brand-dark [&>strong]:font-bold [&>strong]:bg-brand-blue/5 [&>strong]:px-1 [&>strong]:rounded">
              {item.content}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default AboutDetails;