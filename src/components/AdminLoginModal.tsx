import React, { useState } from 'react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  lang: 'bn' | 'en';
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  lang,
}) => {
  const isBn = lang === 'bn';
  const [email, setEmail] = useState('admin@smartshopbd.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@smartshopbd.com' && password === 'admin123') {
      setError(null);
      onLoginSuccess();
      onClose();
    } else {
      setError(
        isBn
          ? 'ভুল ইমেইল বা পাসওয়ার্ড। ডিফল্ট ক্রেডেনশিয়াল ব্যবহার করুন।'
          : 'Invalid email or password. Use default credentials.'
      );
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@smartshopbd.com');
    setPassword('admin123');
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-[#c4c5d5]/40 max-w-md w-full p-6 relative animate-in fade-in zoom-in-95 my-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#757684] hover:text-[#131b2e] p-1.5 rounded-xl hover:bg-[#f2f3ff] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#00288e] text-white flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#131b2e]">
              {isBn ? 'অ্যাডমিন লগইন' : 'Admin Login'}
            </h3>
            <p className="text-xs text-[#757684]">
              {isBn ? 'স্মার্টশপ বিডি কন্ট্রোল প্যানেল' : 'SmartShop BD Control Panel'}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-[#ffdad6] text-[#ba1a1a] p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-base">error</span>
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#444653] mb-1">
              {isBn ? 'অ্যাডমিন ইমেইল' : 'Admin Email'}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#f2f3ff] px-3.5 py-2.5 rounded-xl border border-[#c4c5d5]/40 text-sm focus:outline-none focus:border-[#00288e]"
              placeholder="admin@smartshopbd.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#444653] mb-1">
              {isBn ? 'পাসওয়ার্ড' : 'Password'}
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#f2f3ff] px-3.5 py-2.5 rounded-xl border border-[#c4c5d5]/40 text-sm focus:outline-none focus:border-[#00288e]"
              placeholder="••••••••"
            />
          </div>

          {/* Quick Demo Credentials Info */}
          <div className="bg-[#eaedff] p-3 rounded-xl text-xs text-[#00288e] flex items-center justify-between border border-[#c4c5d5]/30">
            <div>
              <span className="font-bold block">{isBn ? 'ডেমো অ্যাডমিন তথ্য:' : 'Demo Credentials:'}</span>
              <span className="text-[11px] text-[#444653]">admin@smartshopbd.com / admin123</span>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="bg-white px-2.5 py-1 rounded-lg text-xs font-bold hover:bg-[#dde1ff] transition-colors cursor-pointer shadow-2xs"
            >
              {isBn ? 'পূরণ করুন' : 'Auto Fill'}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#00288e] hover:bg-[#1e40af] text-white py-2.5 rounded-xl font-bold text-sm shadow-md transition-colors cursor-pointer flex items-center justify-center gap-1.5 active:scale-98"
          >
            <span className="material-symbols-outlined text-lg">login</span>
            <span>{isBn ? 'লগইন করুন' : 'Login'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
