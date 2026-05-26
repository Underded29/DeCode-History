import React from 'react';
import ContactHero from './components/ContactHero';
import ContactMethods from './components/ContactMethods';
import ContactForm from './components/ContactForm';
import CollaborationForm from './components/CollaborationForm';
import Support from '../../components/Support';

const Contacts = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-8 mb-12">
      
      {/* Верхня частина з текстом та ілюстрацією */}
      <ContactHero />

      {/* Три картки з контактами */}
      <ContactMethods />

      {/* Блок з двома формами */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-6">
        <ContactForm />
        <CollaborationForm />
      </div>

      {/* Інформаційна плашка */}
      <div className="bg-white border border-brand-blue/20 rounded-2xl p-4 flex items-center gap-3 text-sm font-medium text-brand-dark/70 shadow-sm">
        <div className="w-6 h-6 rounded-full border-2 border-brand-blue/40 text-brand-blue/60 flex items-center justify-center shrink-0">
          i
        </div>
        Після надсилання з'явиться повідомлення про успішне надсилання.
      </div>

      {/* Нижній банер із закликом до дії */}
      <Support />

    </div>
  );
};

export default Contacts;