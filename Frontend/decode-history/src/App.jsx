// src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Home from './pages/Home/Home';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-light font-sans text-brand-dark overflow-x-hidden">
      
      <Header onOpenMenu={() => setIsMenuOpen(true)} />
      <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main className="relative z-10">
        {/* Поки що виводимо Home, а потім тут буде React Router */}
        <Home />
      </main>
      <Footer />
    </div>
  );
}

export default App;