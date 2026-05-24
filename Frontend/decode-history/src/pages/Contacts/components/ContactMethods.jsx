import React from 'react';

const ContactMethods = () => {
  const methods = [
    {
      id: 1,
      title: "Email",
      value: "hello@decodehistory.ua",
      desc: "Напишіть нам на пошту",
      icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
    },
    {
      id: 2,
      title: "Telegram",
      value: "@decode_history",
      desc: "Зв'яжіться через Telegram",
      icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
    },
    {
      id: 3,
      title: "Instagram",
      value: "@decode.history",
      desc: "Слідкуйте за нами в Instagram",
      icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><rect width="14" height="14" x="5" y="5" rx="4"/><circle cx="12" cy="12" r="3"/><path d="M16.5 7.5h.01"/></svg>
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {methods.map((item) => (
        <div key={item.id} className="bg-white border border-brand-blue/30 rounded-3xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="w-16 h-16 rounded-2xl bg-brand-blue/5 border border-brand-blue/20 flex items-center justify-center text-brand-blue mb-4">
            {item.icon}
          </div>
          <h3 className="text-lg font-bold text-brand-dark mb-1">{item.title}</h3>
          <a href="#" className="text-brand-blue font-bold hover:underline mb-1">{item.value}</a>
          <p className="text-sm text-brand-dark/60 font-medium">{item.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default ContactMethods;