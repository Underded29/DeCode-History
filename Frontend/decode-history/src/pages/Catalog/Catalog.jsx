// src/pages/Catalog/Catalog.jsx
import React, { useState, useMemo } from 'react';
import CatalogSidebar from './components/CatalogSidebar';
import CatalogFilters from './components/CatalogFilters';
import CatalogMythList from './components/CatalogMythList';
import { mockMyths } from '../../data/myths'; // Імпортуємо наші дані сюди

const Catalog = () => {
  // Стани для фільтрів
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Всі');
  const [sortBy, setSortBy] = useState('newest'); // newest, popular, xp

  // Логіка фільтрації та сортування (автоматично перераховується при зміні станів)
  const filteredMyths = useMemo(() => {
    let result = [...mockMyths];

    // 1. Фільтрація за категорією
    if (selectedCategory !== 'Всі') {
      result = result.filter(myth => myth.category === selectedCategory);
    }

    // 2. Фільтрація за пошуком (шукаємо в заголовку та описі)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(myth => 
        myth.title.toLowerCase().includes(query) ||
        myth.fakeNarrative.toLowerCase().includes(query)
      );
    }

    // 3. Сортування
    switch (sortBy) {
      case 'popular': // За переглядами
        result.sort((a, b) => b.views - a.views);
        break;
      case 'xp': // За винагородою
        result.sort((a, b) => b.xp - a.xp);
        break;
      case 'newest': // За новизною (умовно по ID)
      default:
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 py-8 mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        <div className="lg:col-span-1 sticky top-8">
          <CatalogSidebar />
        </div>

        <div className="lg:col-span-3 flex flex-col gap-6">
          {/* Передаємо стани та функції зміни у фільтри */}
          <CatalogFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          
          {/* Передаємо вже ВІДФІЛЬТРОВАНИЙ масив у список карток */}
          <CatalogMythList myths={filteredMyths} />
        </div>

      </div>
    </div>
  );
};

export default Catalog;