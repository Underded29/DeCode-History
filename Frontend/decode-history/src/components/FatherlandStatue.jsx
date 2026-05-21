import React from 'react';

const FatherlandStatue = () => {
  return (
    <svg 
      viewBox="0 0 400 650" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto text-brand-blue" // Автоматично підлаштує колір, якщо потрібно, через text-
    >
      <g stroke="#2933d6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        
        {/* === ГІРСЬКИЙ ПЕЙЗАЖ & ПЕРЕДНІЙ ПЛАН (ДУЖЕ ЩІЛЬНЕ ШТРИХУВАННЯ ДЛЯ ТЕКСТУРИ СКЕЛЬ) === */}
        <path d="M 0 620 Q 60 580 120 600 T 240 620 T 360 640 T 400 650 L 400 620 L 0 620 Z" class="fill-none" />
        <g class="hatching mountains-forest">
          {/* Створення тисяч ліній для гір та лісу */}
          {[...Array(300)].map((_, i) => (
            <React.Fragment key={`mountain-hatch-${i}`}>
              <path d={`M ${10 + i * 1.3} 615 L ${20 + i * 1.3} 605`} className="opacity-70" />
              <path d={`M ${15 + i * 1.3} 610 L ${25 + i * 1.3} 600`} className="opacity-70" />
              <path d={`M ${20 + i * 1.3} 618 L ${30 + i * 1.3} 608`} className="opacity-70" />
            </React.Fragment>
          ))}
          {/* Додаткове щільне перехресне штрихування для тіней на передньому плані */}
          {[...Array(200)].map((_, i) => (
            <React.Fragment key={`forest-cross-${i}`}>
              <path d={`M ${5 + i * 2} 620 L ${15 + i * 2} 610`} className="opacity-60" />
              <path d={`M ${15 + i * 2} 620 L ${5 + i * 2} 610`} className="opacity-60" />
            </React.Fragment>
          ))}
        </g>

        {/* === П'ЄДЕСТАЛ (МАКСИМАЛЬНО ЩІЛЬНЕ ПЕРЕХРЕСНЕ ШТРИХУВАННЯ ДЛЯ ОБ'ЄМУ) === */}
        <path d="M 100 580 L 130 450 Q 200 420 270 450 L 300 580 Z" class="fill-none" strokeWidth="1.6" />
        <g class="hatching pedestal">
          {/* Дуже щільне перехресне штрихування (тисячі ліній) */}
          {[...Array(400)].map((_, i) => (
            <React.Fragment key={`pedestal-hatch-${i}`}>
              <path d={`M ${105 + i * 0.4} 570 L ${120 + i * 0.4} 550`} className="opacity-80" />
              <path d={`M ${110 + i * 0.4} 570 L ${125 + i * 0.4} 550`} className="opacity-80" />
              <path d={`M ${115 + i * 0.4} 575 L ${130 + i * 0.4} 555`} className="opacity-80" />
              
              <path d={`M ${120 + i * 0.4} 570 L ${105 + i * 0.4} 550`} className="opacity-80" />
              <path d={`M ${125 + i * 0.4} 570 L ${110 + i * 0.4} 550`} className="opacity-80" />
              <path d={`M ${130 + i * 0.4} 575 L ${115 + i * 0.4} 555`} className="opacity-80" />
            </React.Fragment>
          ))}
        </g>

        {/* === СТАТУЯ (ОСНОВНИЙ КОНТУР, ДЕТАЛІЗОВАНИЙ) === */}
        <path d="M 160 450 L 240 450 L 230 220 Q 200 200 170 220 L 160 450 Z" class="fill-none" strokeWidth="1.6" />

        {/* === СУКНЯ & ТІНІ (МАКСИМАЛЬНО ЩІЛЬНЕ ШТРИХУВАННЯ ТА ДРАПІРУВАННЯ) === */}
        <g class="hatching dress-shadows">
          {/* Створення щільного драпірування та тіней під сукнею (тисячі ліній) */}
          {[...Array(600)].map((_, i) => (
            <React.Fragment key={`dress-hatch-${i}`}>
              <path d={`M ${165 + i * 0.12} 440 L ${170 + i * 0.12} 435`} className="opacity-70" />
              <path d={`M ${170 + i * 0.12} 440 L ${175 + i * 0.12} 435`} className="opacity-70" />
              <path d={`M ${175 + i * 0.12} 445 L ${180 + i * 0.12} 440`} className="opacity-70" />
              
              <path d={`M ${180 + i * 0.12} 440 L ${185 + i * 0.12} 435`} className="opacity-70" />
              <path d={`M ${185 + i * 0.12} 440 L ${190 + i * 0.12} 435`} className="opacity-70" />
              <path d={`M ${190 + i * 0.12} 445 L ${195 + i * 0.12} 440`} className="opacity-70" />
            </React.Fragment>
          ))}
          {/* Глобальне перехресне штрихування для тіней по всій статуї */}
          {[...Array(300)].map((_, i) => (
            <React.Fragment key={`global-cross-${i}`}>
              <path d={`M ${165 + i * 0.25} 445 L ${170 + i * 0.25} 440`} className="opacity-60" />
              <path d={`M ${170 + i * 0.25} 445 L ${165 + i * 0.25} 440`} className="opacity-60" />
            </React.Fragment>
          ))}
        </g>

        {/* === РУКА З МЕЧЕМ (ДЕТАЛЬНО, ТЕКСТУРА) === */}
        <path d="M 230 220 L 260 120 L 300 80 ... " /> {/* Меч (спрощений контур для коду) */}
        <path d="M 260 120 L 240 150 Q 235 160 240 170 ... " /> {/* Рука (спрощений контур) */}
        <g class="hatching sword-details">
          {[...Array(100)].map((_, i) => (
            <path key={`sword-hatch-${i}`} d={`M ${265 + i * 0.3} 110 L ${275 + i * 0.3} 105`} className="opacity-70" />
          ))}
          {[...Array(50)].map((_, i) => (
            <path key={`arm-hatch-sword-${i}`} d={`M ${245 + i * 0.5} 140 L ${250 + i * 0.5} 135`} className="opacity-70" />
          ))}
        </g>

        {/* === РУКА З ЩИТОМ (ДУЖЕ ДЕТАЛЬНИЙ ТРИЗУБ, ШТРИХУВАННЯ) === */}
        <path d="M 170 220 L 140 120 L 100 80 ... " /> {/* Щит (спрощений контур) */}
        <path d="M 140 120 L 160 150 Q 165 160 160 170 ... " /> {/* Рука (спрощений контур) */}
        
        {/* Тризуб (дуже детальний, заштрихований) */}
        <g class="trident-details">
          <path d="M 115 90 L 125 100 ... " /> {/* Контур Тризуба (спрощений) */}
          {[...Array(150)].map((_, i) => (
            <path key={`trident-hatch-${i}`} d={`M ${115 + i * 0.2} 90 L ${125 + i * 0.2} 100`} className="opacity-80" />
          ))}
        </g>
        <g class="hatching shield-shadows">
          {[...Array(80)].map((_, i) => (
            <path key={`shield-edge-${i}`} d={`M ${110 + i * 0.5} 110 L ${120 + i * 0.5} 105`} className="opacity-70" />
          ))}
          {[...Array(50)].map((_, i) => (
            <path key={`arm-hatch-shield-${i}`} d={`M ${155 + i * 0.5} 140 L ${150 + i * 0.5} 135`} className="opacity-70" />
          ))}
        </g>

        {/* === ГОЛОВА & КОРОНА (ДЕТАЛЬНО, ТІНІ) === */}
        <path d="M 195 190 Q 205 170 195 160 L 185 170 Q 175 180 185 190 Z" class="fill-none" strokeWidth="1.6" />
        <path d="M 190 175 Q 180 185 190 195" /> {/* Necklines */}
        
        <g class="crown-details">
          {[...Array(120)].map((_, i) => (
            <path key={`crown-hatch-${i}`} d={`M ${198 + i * 0.15} 165 L ${202 + i * 0.15} 170`} className="opacity-80" />
          ))}
        </g>
        <g class="hatching face-shadows">
          {[...Array(60)].map((_, i) => (
            <path key={`face-shadow-${i}`} d={`M ${198 + i * 0.25} 175 L ${202 + i * 0.25} 180`} className="opacity-70" />
          ))}
        </g>
        
        {/* === ХМАРИНКИ & ПТАШКИ (ДЕТАЛЬНО) === */}
        <path d="M 320 80 Q 330 60 350 70 T 380 80 Q 360 95 340 90 Z" />
        <path d="M 50 120 Q 60 100 80 110 T 110 120 Q 90 135 70 130 Z" />
        <path d="M 280 150 Q 290 130 310 140 T 340 150 Q 320 165 300 160 Z" />
        <path d="M 300 100 L 295 102 M 300 100 L 305 98" />
        <path d="M 250 150 L 245 152 M 250 150 L 255 148" />

      </g>
    </svg>
  );
};

export default FatherlandStatue;