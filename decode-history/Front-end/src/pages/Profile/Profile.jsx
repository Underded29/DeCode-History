import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { fetchUserProfile, updateUserProfile, uploadAvatarService } from '../../services/userService';
import { useMythsData } from '../MythContext/MythContext'; 

import ProfileHeader from './components/ProfileHeader';
import ProfileStats from './components/ProfileStats';
import ProfileRecentActivity from './components/ProfileRecentActivity';
import ProfileSavedMyths from './components/ProfileSavedMyths';
import ProfileSettings from './components/ProfileSettings';

const Profile = () => {
  const navigate = useNavigate(); 
  const { myths, loading: isMythsLoading } = useMythsData(); 
  
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchUserProfile();
        setUser(data);
      } catch (error) {
        console.error("Помилка завантаження профілю:", error);
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [navigate]);

  const handleUpdateProfile = async (updatedData) => {
    try {
      const updatedUser = await updateUserProfile(updatedData);
      setUser(updatedUser);
    } catch (error) {
      console.error("Помилка оновлення:", error);
      alert(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleAvatarChange = async (fileObject) => {
    setIsAvatarUploading(true);
    try {
      const newAvatarUrl = await uploadAvatarService(fileObject);
      setUser(prev => ({ ...prev, avatarUrl: newAvatarUrl }));
    } catch (error) {
      console.error("Помилка завантаження аватара:", error);
    } finally {
      setIsAvatarUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin"></div>
        <p className="mt-4 text-brand-dark/60 font-bold">Завантаження профілю...</p>
      </div>
    );
  }

  if (!user) return <div className="text-center py-12">Дані не знайдено.</div>;

  const enrichedRecentActivity = user.recentActivity?.map(activity => {
    const mythDetails = myths.find(m => String(m.id) === String(activity.mythId));
    return {
      ...activity, 
      title: mythDetails?.title || 'Невідомий міф',
      slug: mythDetails?.slug || mythDetails?.id || activity.mythId
    };
  }) || [];

  const enrichedSavedMyths = user.savedMyths?.map(savedId => {
    return myths.find(m => String(m.id) === String(savedId));
  }).filter(Boolean) || []; 

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-8 flex flex-col gap-6 mb-12 relative">
      
      {isAvatarUploading && (
        <div className="fixed inset-0 bg-black/40 z-[100] flex flex-col items-center justify-center backdrop-blur-sm">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          <p className="mt-4 text-white font-bold text-lg shadow-sm">Оновлення фотографії...</p>
        </div>
      )}

      <ProfileHeader user={user} onAvatarChange={handleAvatarChange} />

      <ProfileStats 
        stats={user.stats} 
        currentXP={user.currentXP} 
        nextLevelXP={user.nextLevelXP} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Якщо WordPress ще вантажиться — показуємо локальний лоадер замість карток */}
        {isMythsLoading ? (
          <div className="lg:col-span-2 flex flex-col items-center justify-center bg-white border border-brand-blue/20 rounded-[32px] p-8 min-h-[300px] shadow-sm">
            <div className="w-10 h-10 border-4 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin mb-4"></div>
            <p className="text-brand-dark/50 font-medium">Завантажуємо матеріали міфів...</p>
          </div>
        ) : (
          <>
            <ProfileRecentActivity activities={enrichedRecentActivity} />
            <ProfileSavedMyths savedMyths={enrichedSavedMyths} />
          </>
        )}
        
        {/* Налаштування з'являються миттєво */}
        <ProfileSettings user={user} onUpdateProfile={handleUpdateProfile} onLogout={handleLogout} />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
        <Link to="/catalog" className="w-full sm:w-auto bg-brand-blue hover:bg-brand-blue/90 text-white font-bold px-8 py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          Продовжити навчання
        </Link>
        <Link to="/catalog" className="w-full sm:w-auto border-2 border-brand-blue/30 text-brand-blue hover:border-brand-blue hover:bg-brand-blue/5 font-bold px-8 py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
          Перейти до каталогу
        </Link>
      </div>

    </div>
  );
};

export default Profile;