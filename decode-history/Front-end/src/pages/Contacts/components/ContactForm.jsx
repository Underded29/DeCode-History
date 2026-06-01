import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ContactForm = () => {
  const location = useLocation(); 
  const initialSubject = location.state?.subject || '';

  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    subject: initialSubject, 
    message: '' 
  });
  
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState(''); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    
    // ВАЛІДАЦІЯ EMAIL
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Будь ласка, введіть коректний email (наприклад, name@example.com)');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
      return; 
    }

    const payload = {
      access_key: "bf6c12a4-90f1-4b17-9152-4c54e20d9a12",
      from_name: "DeCode Форма Контакту",
      subject: `Нове повідомлення: ${formData.subject}`,
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' }); 
        setTimeout(() => setStatus('idle'), 4000); 
      } else {
        setErrorMessage('Щось пішло не так на сервері. Спробуйте ще раз.');
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Помилка підключення. Перевірте інтернет та спробуйте ще раз.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="bg-white border border-brand-blue/30 rounded-[32px] p-6 md:p-8 shadow-sm flex flex-col h-full relative overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-brand-blue">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-brand-dark">Форма контакту</h3>
          <p className="text-sm text-brand-dark/60 font-medium">Надішліть нам повідомлення — ми відповімо якнайшвидше.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
        <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Ваше ім'я" className="w-full bg-transparent border border-brand-blue/20 rounded-xl px-4 py-3 text-brand-dark focus:outline-none focus:border-brand-blue transition-colors" />
        <input required type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full bg-transparent border border-brand-blue/20 rounded-xl px-4 py-3 text-brand-dark focus:outline-none focus:border-brand-blue transition-colors" />
        
        <select required name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-transparent border border-brand-blue/20 rounded-xl px-4 py-3 text-brand-dark focus:outline-none focus:border-brand-blue transition-colors appearance-none cursor-pointer">
          <option value="" disabled>Тема</option>
          <option value="general">Загальне питання</option>
          <option value="bug">Помилка на сайті</option>
          <option value="content">Пропозиція щодо контенту</option>
          <option value="myth">Запропонувати міф</option>
        </select>

        <textarea required name="message" value={formData.message} onChange={handleChange} placeholder="Повідомлення" rows="4" className="w-full bg-transparent border border-brand-blue/20 rounded-xl px-4 py-3 text-brand-dark focus:outline-none focus:border-brand-blue transition-colors resize-none flex-1"></textarea>

        <button disabled={status === 'submitting'} type="submit" className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70 mt-auto">
          {status === 'submitting' ? 'Надсилання...' : 'Надіслати'}
          {status !== 'submitting' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>}
        </button>
      </form>

      {status === 'success' && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 z-10 animate-fade-in">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h4 className="text-xl font-bold text-brand-dark mb-2">Успішно надіслано!</h4>
          <p className="text-brand-dark/70 font-medium">Ми отримали ваше повідомлення і скоро з вами зв'яжемося.</p>
        </div>
      )}

      {status === 'error' && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 z-10 animate-fade-in">
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </div>
          <h4 className="text-xl font-bold text-brand-dark mb-2">Помилка</h4>
          <p className="text-brand-dark/70 font-medium">{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default ContactForm;