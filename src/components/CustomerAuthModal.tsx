import React, { useState } from 'react';

interface CustomerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (customer: { name: string; phone: string; email: string }) => void;
  lang: 'bn' | 'en';
}

export const CustomerAuthModal: React.FC<CustomerAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  lang,
}) => {
  const isBn = lang === 'bn';
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [identifier, setIdentifier] = useState('solaiman@smartshopbd.com');
  const [password, setPassword] = useState('customer123');
  const [name, setName] = useState('সোলাইমান আহমেদ');
  const [phone, setPhone] = useState('০১৭১২-৩৪৫৬৭৮');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'login') {
      if (
        (identifier === 'solaiman@smartshopbd.com' || identifier === '01712345678' || identifier === '০১৭১২-৩৪৫৬৭৮') &&
        password === 'customer123'
      ) {
        setError(null);
        onLoginSuccess({
          name: 'সোলাইমান আহমেদ',
          phone: '০১৭১২-৩৪৫৬৭৮',
          email: 'solaiman@smartshopbd.com',
        });
        onClose();
      } else {
        // Allow general custom login as well
        onLoginSuccess({
          name: identifier.split('@')[0] || 'সম্মানিত ক্রেতা',
          phone: phone,
          email: identifier.includes('@') ? identifier : `${identifier}@customer.smartshopbd.com`,
        });
        onClose();
      }
    } else {
      if (!name.trim() || !phone.trim() || !password.trim()) {
        setError(isBn ? 'সবগুলো তথ্য সঠিকভাবে পূরণ করুন।' : 'Please fill all fields.');
        return;
      }
      onLoginSuccess({
        name,
        phone,
        email: identifier.includes('@') ? identifier : `${phone}@customer.smartshopbd.com`,
      });
      onClose();
    }
  };

  const handleFillDemo = () => {
    setIdentifier('solaiman@smartshopbd.com');
    setPassword('customer123');
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

        {/* Brand Lockup */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#00288e] text-white flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-2xl">person</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#131b2e]">
              {tab === 'login'
                ? (isBn ? 'গ্রাহক লগইন' : 'Customer Sign In')
                : (isBn ? 'নতুন অ্যাকাউন্ট খুলুন' : 'Create New Account')}
            </h3>
            <p className="text-xs text-[#757684]">
              {isBn ? 'স্মার্টশপ বিডি মেম্বারশিপ পোর্টাল' : 'SmartShop BD Customer Portal'}
            </p>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="grid grid-cols-2 gap-2 bg-[#f2f3ff] p-1 rounded-xl mb-4 border border-[#c4c5d5]/30">
          <button
            type="button"
            onClick={() => {
              setTab('login');
              setError(null);
            }}
            className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              tab === 'login'
                ? 'bg-white text-[#00288e] shadow-xs'
                : 'text-[#444653] hover:text-[#00288e]'
            }`}
          >
            {isBn ? 'লগইন' : 'Sign In'}
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('register');
              setError(null);
            }}
            className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              tab === 'register'
                ? 'bg-white text-[#00288e] shadow-xs'
                : 'text-[#444653] hover:text-[#00288e]'
            }`}
          >
            {isBn ? 'রেজিস্ট্রেশন' : 'Register'}
          </button>
        </div>

        {error && (
          <div className="bg-[#ffdad6] text-[#ba1a1a] p-3 rounded-xl text-xs font-semibold flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-base">error</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {tab === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-[#444653] mb-1">
                {isBn ? 'আপনার পূর্ণ নাম' : 'Full Name'} *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="যেমন: সোলাইমান আহমেদ"
                className="w-full bg-[#f2f3ff] px-3.5 py-2.5 rounded-xl border border-[#c4c5d5]/40 text-xs focus:outline-none focus:border-[#00288e]"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#444653] mb-1">
              {isBn ? 'মোবাইল নম্বর অথবা ইমেইল' : 'Mobile Number or Email'} *
            </label>
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="017xxxxxxxx বা name@email.com"
              className="w-full bg-[#f2f3ff] px-3.5 py-2.5 rounded-xl border border-[#c4c5d5]/40 text-xs focus:outline-none focus:border-[#00288e]"
            />
          </div>

          {tab === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-[#444653] mb-1">
                {isBn ? 'মোবাইল নম্বর (যোগাযোগের জন্য)' : 'Phone Number'} *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01712345678"
                className="w-full bg-[#f2f3ff] px-3.5 py-2.5 rounded-xl border border-[#c4c5d5]/40 text-xs focus:outline-none focus:border-[#00288e]"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#444653] mb-1">
              {isBn ? 'পাসওয়ার্ড' : 'Password'} *
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#f2f3ff] px-3.5 py-2.5 rounded-xl border border-[#c4c5d5]/40 text-xs focus:outline-none focus:border-[#00288e]"
            />
          </div>

          {tab === 'login' && (
            <div className="bg-[#eaedff] p-3 rounded-xl text-xs text-[#00288e] flex items-center justify-between border border-[#c4c5d5]/30">
              <div>
                <span className="font-bold block">{isBn ? 'ডেমো কাস্টমার অ্যাকাউন্ট:' : 'Demo Customer Account:'}</span>
                <span className="text-[11px] text-[#444653]">solaiman@smartshopbd.com / customer123</span>
              </div>
              <button
                type="button"
                onClick={handleFillDemo}
                className="bg-white px-2.5 py-1 rounded-lg text-xs font-bold hover:bg-[#dde1ff] transition-colors cursor-pointer shadow-2xs"
              >
                {isBn ? 'পূরণ করুন' : 'Auto Fill'}
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#fd651e] hover:bg-[#a73a00] text-white py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer flex items-center justify-center gap-1.5 active:scale-98"
          >
            <span className="material-symbols-outlined text-lg">
              {tab === 'login' ? 'login' : 'how_to_reg'}
            </span>
            <span>
              {tab === 'login'
                ? (isBn ? 'লগইন করুন' : 'Sign In Now')
                : (isBn ? 'নিবন্ধন সম্পন্ন করুন' : 'Complete Registration')}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};
