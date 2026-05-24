import React, { useState } from 'react';

const CollaborationForm = () => {
  const [formData, setFormData] = useState({ org: '', contact: '', email: '', type: '', proposal: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setFormData({ org: '', contact: '', email: '', type: '', proposal: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 1500);
  };

  return (
    <div className="bg-white border border-brand-blue/30 rounded-[32px] p-6 md:p-8 shadow-sm flex flex-col h-full relative overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-brand-blue">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" /></svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-brand-dark">Форма співпраці</h3>
          <p className="text-sm text-brand-dark/60 font-medium">Запропонуйте ідею або партнерство.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
        <input required type="text" name="org" value={formData.org} onChange={handleChange} placeholder="Організація" className="w-full bg-transparent border border-brand-blue/20 rounded-xl px-4 py-3 text-brand-dark focus:outline-none focus:border-brand-blue transition-colors" />
        <input required type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="Контактна особа" className="w-full bg-transparent border border-brand-blue/20 rounded-xl px-4 py-3 text-brand-dark focus:outline-none focus:border-brand-blue transition-colors" />
        <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full bg-transparent border border-brand-blue/20 rounded-xl px-4 py-3 text-brand-dark focus:outline-none focus:border-brand-blue transition-colors" />
        
        <select required name="type" value={formData.type} onChange={handleChange} className="w-full bg-transparent border border-brand-blue/20 rounded-xl px-4 py-3 text-brand-dark focus:outline-none focus:border-brand-blue transition-colors appearance-none cursor-pointer">
          <option value="" disabled>Тип співпраці</option>
          <option value="educational">Освітній проєкт</option>
          <option value="media">Інформаційне партнерство</option>
          <option value="technical">Технічна допомога</option>
        </select>

        <textarea required name="proposal" value={formData.proposal} onChange={handleChange} placeholder="Опишіть вашу пропозицію" rows="3" className="w-full bg-transparent border border-brand-blue/20 rounded-xl px-4 py-3 text-brand-dark focus:outline-none focus:border-brand-blue transition-colors resize-none flex-1"></textarea>

        <button disabled={status === 'submitting'} type="submit" className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70 mt-auto">
          {status === 'submitting' ? 'Надсилання...' : 'Надіслати заявку'}
          {status !== 'submitting' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>}
        </button>
      </form>

      {status === 'success' && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 z-10 animate-fade-in">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h4 className="text-xl font-bold text-brand-dark mb-2">Заявку прийнято!</h4>
          <p className="text-brand-dark/70 font-medium">Дякуємо за інтерес. Наша команда зв'яжеться з вами.</p>
        </div>
      )}
    </div>
  );
};

export default CollaborationForm;