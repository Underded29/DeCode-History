import React, { useState } from 'react';

const ProfileSettings = ({ user, onUpdateProfile, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({ name: user.name, email: user.email });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await onUpdateProfile(formData);
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ name: user.name, email: user.email }); // Відкидаємо зміни
  };

  return (
    <div className="bg-white border border-brand-blue/30 rounded-[32px] p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-brand-blue">Базові налаштування профілю</h3>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-brand-dark/70 pl-1">Ім'я</label>
          <input 
            type="text" 
            name="name"
            disabled={!isEditing}
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full border rounded-xl px-4 py-2.5 text-brand-dark font-medium focus:outline-none transition-colors ${isEditing ? 'bg-white border-brand-blue focus:ring-2 focus:ring-brand-blue/20' : 'bg-brand-blue/5 border-brand-blue/20 cursor-not-allowed'}`} 
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-brand-dark/70 pl-1">Email</label>
          <input 
            type="email" 
            name="email"
            disabled={!isEditing}
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full border rounded-xl px-4 py-2.5 text-brand-dark font-medium focus:outline-none transition-colors ${isEditing ? 'bg-white border-brand-blue focus:ring-2 focus:ring-brand-blue/20' : 'bg-brand-blue/5 border-brand-blue/20 cursor-not-allowed'}`} 
          />
        </div>

        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 text-sm font-bold text-brand-blue hover:opacity-80 self-start mt-1 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            Редагувати
          </button>
        ) : (
          <div className="flex gap-2 mt-2">
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-2 rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? 'Збереження...' : 'Зберегти'}
            </button>
            <button 
              onClick={handleCancel}
              disabled={isSaving}
              className="flex-1 border border-brand-blue/30 text-brand-dark hover:bg-gray-50 font-bold py-2 rounded-xl transition-colors cursor-pointer"
            >
              Скасувати
            </button>
          </div>
        )}
      </div>

      <div className="pt-4 mt-4 border-t border-brand-blue/10">
        <button 
          onClick={onLogout} 
          className="w-full flex items-center justify-center gap-2 border-2 border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 font-bold py-2.5 rounded-xl transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          Вийти з акаунта
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;