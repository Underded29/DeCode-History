import React from 'react';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Затемнення фону (Backdrop). Клік по ньому теж закриває меню */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Сама панель меню */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Шапка профілю в меню */}
        <div className="p-6 border-b border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-blue-600 p-0.5">
            {/* Тимчасова заглушка для аватарки */}
            <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center">
              👤
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">@oleksandr_</h3>
            <p className="text-sm text-gray-500">Рівень 5</p>
          </div>
        </div>

        {/* Навігація */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {['Каталог міфів', 'Особистий кабінет', 'Про нас', 'Контакти'].map((item, index) => (
            <a 
              key={index}
              href="#" 
              className="flex items-center gap-4 px-4 py-3 text-gray-700 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium"
            >
              <div className="w-5 h-5 bg-gray-200 rounded" /> {/* Місце під іконку */}
              {item}
            </a>
          ))}
        </nav>

        {/* Кнопка виходу */}
        <div className="p-6 border-t border-gray-100">
          <button className="flex items-center gap-3 text-red-500 hover:text-red-600 font-medium w-full px-4 py-2 cursor-pointer transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Вийти з акаунта
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;