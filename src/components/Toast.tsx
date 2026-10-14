import React from 'react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'info';
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success' }) => {
  if (!message) return null;

  return (
    <div className="fixed top-20 right-6 z-50 flex items-center gap-2.5 bg-[#00288e] text-white px-4 py-3 rounded-xl shadow-xl text-xs sm:text-sm font-semibold animate-in fade-in slide-in-from-top-3 border border-white/20">
      <span className="material-symbols-outlined text-[#85f8c4] text-lg">
        {type === 'success' ? 'check_circle' : 'info'}
      </span>
      <span>{message}</span>
    </div>
  );
};
