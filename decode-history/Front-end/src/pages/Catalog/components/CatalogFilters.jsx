import React from 'react';

const CatalogFilters = ({ 
  searchQuery, setSearchQuery, 
  selectedCategory, setSelectedCategory, 
  sortBy, setSortBy, categories
}) => {
  
  return (
    <div className="w-full flex flex-col gap-5 bg-white p-5 md:p-6 rounded-3xl border border-brand-blue/20 shadow-sm">
      
      {/* ВЕРХНІЙ РЯДОК: Пошук та Сортування */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        
        {/* Пошук */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Пошук міфів, фактів, статей..." 
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-brand-dark font-medium placeholder:text-gray-400 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors shadow-inner"
          />
        </div>
        
        {/* Сортування (Селект) */}
        <div className="relative shrink-0">
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none w-full md:w-auto pr-10 pl-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-brand-dark font-medium hover:bg-gray-100 focus:outline-none focus:border-brand-blue transition-colors cursor-pointer"
          >
            <option value="newest">Новіші</option>
            <option value="popular">Найпопулярніші</option>
            <option value="xp">Найбільше XP</option>
          </select>
          {/* Іконка стрілочки для селекту */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* НИЖНІЙ РЯДОК: Категорії */}
      <div className="flex flex-wrap gap-2 items-center pt-1">
        <span className="text-sm font-bold text-brand-dark/70 mr-2 uppercase tracking-wide">Категорії:</span>
        {categories.map((cat, idx) => (
          <button 
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              selectedCategory === cat 
                ? 'bg-brand-orange text-white shadow-md shadow-brand-orange/20' 
                : 'bg-brand-blue/5 text-brand-dark/70 hover:bg-brand-blue/15 hover:text-brand-dark'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      
    </div>
  );
};

export default CatalogFilters;