import React from 'react';

const Footer = () => {
  return (
    // mt-auto притискає футер до низу сторінки, якщо контенту мало
    <footer className="w-full border-t border-brand-dark/10 bg-brand-light relative overflow-hidden py-10 md:py-12 mt-auto">
      
      {/* 1. Лівий малюнок (Гори) - прихований на мобілках */}
      {/* 1. Лівий малюнок (Гори) - прихований на мобілках */}
      {/* 1. Лівий малюнок (Деталізовані гори) - прихований на мобілках */}
      {/* 1. Лівий малюнок (Гори) - прихований на мобілках */}
      <div className="hidden lg:block absolute left-0 bottom-0 w-[380px] xl:w-[480px] pointer-events-none opacity-90 text-brand-dark">
        <svg
          viewBox="0 0 520 190"
          xmlns="http://www.w3.org/2000/svg"
          className="block h-auto w-full"
        >
          {/* distant hills */}
          <path
            d="M15 150 C35 135, 55 140, 76 126 C98 112, 118 126, 136 113 C160 95, 184 106, 205 92 C225 79, 245 92, 266 83 C290 72, 315 88, 335 78 C357 68, 380 80, 405 74 C432 68, 456 78, 500 67"
            className="fill-none stroke-current stroke-[1.3] opacity-55"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* main mountains */}
          <path
            d="M0 157 L35 122 L55 137 L86 93 L118 132 L146 105 L172 140 L205 91 L236 139 L268 103 L304 149 L345 116 L385 151 L424 125 L475 158"
            className="fill-none stroke-current stroke-2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* mountain inner strokes */}
          <path
            d="M36 122 L51 146 M86 93 L76 128 M86 93 L101 129 M146 105 L132 136 M205 91 L190 132 M205 91 L219 135 M268 103 L255 138 M345 116 L330 148 M424 125 L407 152"
            className="fill-none stroke-current stroke-[1.3] opacity-75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* foreground hills */}
          <path
            d="M4 166 C30 156, 47 165, 72 157 C98 149, 119 160, 145 153 C175 145, 199 157, 226 149 C253 140, 284 154, 320 145 C355 137, 385 149, 418 141 C445 135, 472 140, 510 132"
            className="fill-none stroke-current stroke-[1.3] opacity-55"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M18 175 C43 168, 63 174, 91 166 M116 172 C139 162, 162 170, 187 162 M224 171 C250 160, 275 168, 302 158 M348 166 C373 157, 400 164, 430 156 M455 164 C475 157, 495 161, 515 154"
            className="fill-none stroke-current stroke-[1.3] opacity-55"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* flag pole */}
          <path
            d="M123 45 L123 124"
            className="fill-none stroke-current stroke-2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* flag */}
          <path
            d="M123 47 C139 39, 151 50, 166 42 L166 72 C151 80, 139 68, 123 76 Z"
            className="fill-none stroke-current stroke-2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M126 61 C140 54, 151 65, 164 58"
            className="fill-none stroke-current stroke-[1.3] opacity-75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* flag base grass */}
          <path
            d="M110 128 C116 119, 128 118, 135 128 M104 136 C116 125, 134 126, 146 137"
            className="fill-none stroke-current stroke-[1.3] opacity-75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* pine tree */}
          <path
            d="M258 82 L258 154"
            className="fill-none stroke-current stroke-2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M258 70 L230 124 L247 120 L222 151 L246 145 L235 166 L258 157 L281 166 L270 145 L294 151 L269 120 L286 124 Z"
            className="fill-none stroke-current stroke-2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M258 88 L245 119 M258 105 L273 132 M258 124 L239 151 M258 134 L276 154"
            className="fill-none stroke-current stroke-[1.3] opacity-75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* small bushes */}
          <path
            d="M70 151 C76 145, 83 146, 88 152 M93 151 C99 145, 106 147, 111 153 M152 151 C158 146, 164 147, 170 153 M300 154 C307 148, 315 149, 321 155"
            className="fill-none stroke-current stroke-[1.3] opacity-55"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* 2. Центральний блок (Посилання та Соцмережі) */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-4 w-full max-w-3xl mx-auto">
        
        {/* Навігація */}
        <nav className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
          <a href="#" className="text-brand-dark font-medium hover:text-brand-blue transition-colors">
            Про нас
          </a>
          
          <span className="text-brand-blue font-bold hidden sm:block">|</span>
          
          <a href="#" className="text-brand-dark font-medium hover:text-brand-blue transition-colors">
            Контакти
          </a>
          
          <span className="text-brand-blue font-bold hidden sm:block">|</span>
          
          <a href="#" className="text-brand-dark font-medium hover:text-brand-blue transition-colors">
            Особистий кабінет
          </a>
        </nav>

        {/* Соціальні мережі */}
        <div className="flex items-center gap-4">
          
          {/* Telegram */}
          <a href="#" className="w-12 h-12 rounded-full border-2 border-brand-dark text-brand-dark flex items-center justify-center hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 transition-all cursor-pointer">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.18-.08-.05-.19-.02-.27 0-.12.03-1.96 1.25-5.54 3.67-.52.36-1 .54-1.42.53-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.29-.48.79-.74 3.08-1.34 5.14-2.23 6.17-2.66 2.93-1.22 3.54-1.43 3.94-1.44.09 0 .28.02.41.11.1.07.13.17.15.26.01.07.02.2 0 .31z" />
            </svg>
          </a>

          {/* Instagram */}
          <a href="#" className="w-12 h-12 rounded-full border-2 border-brand-dark text-brand-dark flex items-center justify-center hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 transition-all cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>

          {/* YouTube */}
          <a href="#" className="w-12 h-12 rounded-full border-2 border-brand-dark text-brand-dark flex items-center justify-center hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 transition-all cursor-pointer">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21.582 6.186a2.6 2.6 0 0 0-1.83-1.83C18.14 4 12 4 12 4s-6.14 0-7.752.356a2.6 2.6 0 0 0-1.83 1.83C2 7.805 2 12 2 12s0 4.195.356 5.814a2.6 2.6 0 0 0 1.83 1.83C5.86 20 12 20 12 20s6.14 0 7.752-.356a2.6 2.6 0 0 0 1.83-1.83C22 16.195 22 12 22 12s0-4.195-.418-5.814zM9.8 15.5v-7l6.5 3.5-6.5 3.5z" />
            </svg>
          </a>

          {/* Facebook */}
          <a href="#" className="w-12 h-12 rounded-full border-2 border-brand-dark text-brand-dark flex items-center justify-center hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 transition-all cursor-pointer">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>

        </div>
      </div>

      {/* 3. Правий малюнок (Місто) - прихований на мобілках */}
      <div className="hidden lg:block absolute right-0 bottom-0 w-80 xl:w-96 pointer-events-none opacity-90">
        {/* ТУТ МАЄ БУТИ ЕКСПОРТОВАНИЙ ФАЙЛ З FIGMA */}
        {/* <img src="/src/assets/footer-right.png" alt="Місто" className="w-full h-auto" /> */}
        
        {/* Тимчасова заглушка */}
        <div className="w-full h-40 border-2 border-dashed border-brand-blue/30 rounded-tl-3xl flex items-center justify-center text-brand-blue/50 text-sm font-bold bg-brand-blue/5">
          Експорт міста з Figma
        </div>
      </div>

    </footer>
  );
};

export default Footer;