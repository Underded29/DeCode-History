// src/pages/Catalog/Catalog.jsx
import React, { useState, useMemo } from 'react';
import CatalogSidebar from './components/CatalogSidebar';
import CatalogFilters from './components/CatalogFilters';
import CatalogMythList from './components/CatalogMythList';
import { useMythsData } from '../MythContext/MythContext'; 

const Catalog = () => {
  // Дістаємо готові міфи, категорії та стан завантаження з глобального контексту
  const { myths, categories, loading } = useMythsData();

  // Стани для фільтрів 
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Всі');
  const [sortBy, setSortBy] = useState('newest'); 

  // Логіка фільтрації та сортування
  const filteredMyths = useMemo(() => {
    let result = [...myths];

    // 1. Фільтрація за категорією
    if (selectedCategory !== 'Всі') {
      result = result.filter(myth => myth.category === selectedCategory);
    }

    // 2. Фільтрація за пошуком
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(myth => 
        myth.title.toLowerCase().includes(query) ||
        myth.fakeNarrative.toLowerCase().includes(query)
      );
    }

    // 3. Сортування
    switch (sortBy) {
      case 'popular': 
        result.sort((a, b) => b.views - a.views);
        break;
      case 'xp': 
        result.sort((a, b) => b.xp - a.xp);
        break;
      case 'newest': 
      default:
        // Сортуємо за ID (від найновіших до найстаріших)
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
    }

    return result;
  }, [myths, searchQuery, selectedCategory, sortBy]);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 py-8 mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        <div className="lg:col-span-1 sticky top-8">
          <CatalogSidebar />
        </div>

        <div className="lg:col-span-3 flex flex-col gap-6">
          <CatalogFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            categories={categories}
          />
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-brand-blue">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-current"></div>
              <p className="mt-4 font-medium text-gray-400">Завантаження міфів з історичної бази...</p>
            </div>
          ) : (
            <CatalogMythList myths={filteredMyths} />
          )}
        </div>

      </div>
    </div>
  );
};

export default Catalog;