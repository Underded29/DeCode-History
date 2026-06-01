import React from 'react';
import contactIllustrationImg from '../../../assets/contactsHero.png'; 

const ContactHero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
      <div className="flex-1 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-dark">Зв'яжіться з нами</h1>
        <p className="text-lg text-brand-dark/70 font-medium">
          Ми відкриті до співпраці, запитань і нових ідей.
        </p>
      </div>
  
      <div className="w-full md:w-1/2 flex items-center justify-center relative">
        <img 
          src={contactIllustrationImg} 
          alt="Ілюстрація: Команда DeCode History (чоловік і жінка) працює разом за ноутбуком, обговорюючи ідеї співпраці та трансформуючи історичні артефакти в дані." 
          className="max-w-full h-auto object-contain z-10" 
        />
      </div>
    </div>
  );
};

export default ContactHero;