import React from 'react';
import footerLeftImg from '../assets/footerLeftPic.png';
import footerRightImg from '../assets/footerRightPic.png';

// 1. Масив з навігаційними посиланнями
const navLinks = [
  { id: 'about', label: 'Про нас', href: '/about' },
  { id: 'contacts', label: 'Контакти', href: '/contacts' },
  { id: 'profile', label: 'Особистий кабінет', href: '/profile' }
];

// 2. Масив із соціальними мережами (зберігаємо SVG як JSX-елементи)
const socialLinks = [
  {
    id: 'telegram',
    href: 'https://web.telegram.org/',
    ariaLabel: 'Telegram',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.18-.08-.05-.19-.02-.27 0-.12.03-1.96 1.25-5.54 3.67-.52.36-1 .54-1.42.53-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.29-.48.79-.74 3.08-1.34 5.14-2.23 6.17-2.66 2.93-1.22 3.54-1.43 3.94-1.44.09 0 .28.02.41.11.1.07.13.17.15.26.01.07.02.2 0 .31z" />
      </svg>
    )
  },
  {
    id: 'instagram',
    href: 'https://www.instagram.com/',
    ariaLabel: 'Instagram',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    )
  },
  {
    id: 'youtube',
    href: 'https://www.youtube.com/',
    ariaLabel: 'YouTube',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21.582 6.186a2.6 2.6 0 0 0-1.83-1.83C18.14 4 12 4 12 4s-6.14 0-7.752.356a2.6 2.6 0 0 0-1.83 1.83C2 7.805 2 12 2 12s0 4.195.356 5.814a2.6 2.6 0 0 0 1.83 1.83C5.86 20 12 20 12 20s6.14 0 7.752-.356a2.6 2.6 0 0 0 1.83-1.83C22 16.195 22 12 22 12s0-4.195-.418-5.814zM9.8 15.5v-7l6.5 3.5-6.5 3.5z" />
      </svg>
    )
  },
  {
    id: 'facebook',
    href: 'https://www.facebook.com/',
    ariaLabel: 'Facebook',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    )
  }
];

const Footer = () => {
  return (
    <footer className="w-full border-t border-brand-dark/10 bg-brand-light relative overflow-hidden py-10 md:py-12 mt-auto">
      
      {/* Лівий малюнок (Пейзаж) */}
      <div className="hidden lg:block absolute left-0 bottom-0 w-[380px] xl:w-[480px] pointer-events-none opacity-90 text-brand-dark">
        <img 
          src={footerLeftImg} 
          alt="Пейзаж" 
          className="w-full h-auto object-contain object-bottom" 
        />
      </div>

      {/* Центральний блок */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-4 w-full max-w-3xl mx-auto">
        
        {/* Динамічна навігація */}
        <nav className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
          {navLinks.map((link, index) => (
            <React.Fragment key={link.id}>
              <a 
                href={link.href} 
                className="text-brand-dark font-medium hover:text-brand-blue transition-colors"
              >
                {link.label}
              </a>
              
              {/* Додаємо роздільник, якщо це не останній елемент масиву */}
              {index < navLinks.length - 1 && (
                <span className="text-brand-blue font-bold hidden sm:block">|</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Динамічні соціальні мережі */}
        <div className="flex items-center gap-4">
          {socialLinks.map((social) => (
            <a 
              key={social.id}
              href={social.href}
              aria-label={social.ariaLabel}
              className="w-12 h-12 rounded-full border-2 border-brand-dark text-brand-dark flex items-center justify-center hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 transition-all cursor-pointer"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Правий малюнок (Місто) */}
      <div className="hidden lg:block absolute right-0 bottom-0 w-80 xl:w-96 pointer-events-none opacity-90">
        <img 
          src={footerRightImg}
          alt="Місто" 
          className="w-full h-auto object-contain object-bottom" 
        />
      </div>

    </footer>
  );
};

export default Footer;