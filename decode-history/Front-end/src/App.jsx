import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Глобальні компоненти
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import GlobalLoader from './components/GlobalLoader'; 

// Сторінки
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Catalog from './pages/Catalog/Catalog';
import MythDetail from './pages/MythDetail/MythDetail';
import Profile from './pages/Profile/Profile';
import Contacts from './pages/Contacts/Contacts';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import NotFound from './pages/NotFound';


function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    // Головний контейнер на всю висоту екрана
    <div className="min-h-screen flex flex-col bg-brand-light font-sans text-brand-dark overflow-x-hidden">

      <GlobalLoader />
      
      {/* Фіксований хедер */}
      <Header onOpenMenu={() => setIsMenuOpen(true)} />
      
      {/* Бокове меню (мобільне) */}
      <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* main займає весь вільний простір (flex-1).
        pt-24 компенсує висоту хедера, щоб сторінки не "заїжджали" під нього.
      */}
      <main className="flex-1 w-full flex flex-col pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/myth/:id" element={<MythDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      {/* Футер завжди притиснутий донизу */}
      <Footer />
      
    </div>
  );
}

export default App;