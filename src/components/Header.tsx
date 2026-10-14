import React, { useState } from 'react';
import { formatPrice, toBengaliNumber } from '../data/mockData';
import { CartItem } from '../types';

interface HeaderProps {
  cartItems: CartItem[];
  wishlistIds: string[];
  lang: 'bn' | 'en';
  setLang: (lang: 'bn' | 'en') => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenTrackOrder: () => void;
  onOpenProfile: () => void;
  onSelectCategory: (categoryId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSearchCategory: string;
  setSelectedSearchCategory: (cat: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onScrollToSection: (sectionId: string) => void;
  isAdminLoggedIn: boolean;
  onOpenAdmin: () => void;
  isCustomerLoggedIn: boolean;
  customerName: string;
  customerAvatar?: string;
  onOpenCustomerPanel: () => void;
  onOpenCustomerAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItems,
  wishlistIds,
  lang,
  setLang,
  onOpenCart,
  onOpenWishlist,
  onOpenTrackOrder,
  onOpenProfile,
  onSelectCategory,
  searchQuery,
  setSearchQuery,
  selectedSearchCategory,
  setSelectedSearchCategory,
  onSearchSubmit,
  onScrollToSection,
  isAdminLoggedIn,
  onOpenAdmin,
  isCustomerLoggedIn,
  customerName,
  customerAvatar,
  onOpenCustomerPanel,
  onOpenCustomerAuth,
}) => {
  const [isCatDropdownOpen, setIsCatDropdownOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const isBn = lang === 'bn';
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const triggerVoiceSearch = () => {
    setIsListening(true);
    // Simulate voice speech recognition prompt
    setTimeout(() => {
      setSearchQuery('Smartwatch');
      setIsListening(false);
    }, 1500);
  };

  return (
    <header className="sticky top-0 w-full z-40 bg-white shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col justify-between">
        {/* Top Info Bar */}
        <div className="bg-[#f2f3ff] border-b border-[#c4c5d5]/30 py-1">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between text-[#444653] text-xs font-semibold">
            <div className="flex items-center gap-5">
              <a 
                href="tel:09612345678"
                className="flex items-center gap-1 hover:text-[#00288e] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base text-[#00288e]">call</span>
                <span>{isBn ? 'হটলাইন: ০৯৬১২-৩৪৫৬৭৮ (২৪/৭ সেবা)' : 'Hotline: 09612-345678 (24/7)'}</span>
              </a>
              <span className="hidden sm:flex items-center gap-1 text-[#757684]">
                <span className="material-symbols-outlined text-base text-[#00563a]">local_shipping</span>
                <span>{isBn ? 'সারাদেশে দ্রুত হোম ডেলিভারি' : 'Express Home Delivery across Bangladesh'}</span>
              </span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={onOpenTrackOrder}
                className="flex items-center gap-1 hover:text-[#00288e] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">inventory_2</span>
                <span>{isBn ? 'ট্র্যাক অর্ডার' : 'Track Order'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (isCustomerLoggedIn) {
                    onOpenCustomerPanel();
                  } else {
                    onOpenCustomerAuth();
                  }
                }}
                className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs transition-all cursor-pointer ${
                  isCustomerLoggedIn
                    ? 'bg-[#eaedff] text-[#00288e] font-bold hover:bg-[#dde1ff] border border-[#c4c5d5]/30'
                    : 'text-[#757684] hover:text-[#00288e]'
                }`}
                title={isBn ? "কাস্টমার প্যানেল" : "Customer Panel"}
              >
                <span className="material-symbols-outlined text-sm">person</span>
                <span>{isCustomerLoggedIn ? (isBn ? 'কাস্টমার প্যানেল' : 'Customer Panel') : (isBn ? 'লগইন' : 'Login')}</span>
              </button>

              <button
                type="button"
                onClick={onOpenAdmin}
                className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs transition-all cursor-pointer ${
                  isAdminLoggedIn
                    ? 'bg-[#00288e] text-white font-bold shadow-xs hover:bg-[#1e40af]'
                    : 'text-[#757684] hover:text-[#00288e]'
                }`}
                title={isAdminLoggedIn ? (isBn ? "অ্যাডমিন প্যানেল" : "Admin Panel") : (isBn ? "অ্যাডমিন লগইন" : "Admin Login")}
              >
                <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
                <span>{isAdminLoggedIn ? (isBn ? 'অ্যাডমিন ড্যাশবোর্ড' : 'Admin') : (isBn ? 'অ্যাডমিন' : 'Admin')}</span>
              </button>

              <div className="flex items-center gap-1 bg-[#eaedff] px-2 py-0.5 rounded-full text-xs">
                <button
                  type="button"
                  onClick={() => setLang('bn')}
                  className={`cursor-pointer transition-colors ${isBn ? 'text-[#00288e] font-bold' : 'text-[#757684] hover:text-[#00288e]'}`}
                >
                  বাংলা
                </button>
                <span className="text-[#757684]">|</span>
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`cursor-pointer transition-colors ${!isBn ? 'text-[#00288e] font-bold' : 'text-[#757684] hover:text-[#00288e]'}`}
                >
                  English
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header Search Bar & Actions */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full flex items-center justify-between gap-4 py-2.5">
          {/* Logo */}
          <div 
            onClick={() => {
              setSearchQuery('');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 shrink-0 cursor-pointer select-none"
          >
            <img
              alt="SmartShop BD Logo"
              className="h-8 md:h-9 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAer5JPDepUBytvHEdfrtcQYPU8HJtc01-fSFkuDafQV1PJJggS0oj5nGJUFovCtBNO4pyW9mKYkNIWTeQBTuQwS72Tv3gaoB0y-pXMJEMDISGHIaO9vNKg4YzTlU5VkcrSatLjc5Jja3R3gp57lGnolvNqxpy4MLb7oxBEirQY10-lWYobbEs6PT-0eqtki7UiDlkzjkwc5mPrehRjiCCWisCuHUIKz-fKUu1e8KewXVjAYEvOb7abwFIwwTwjhShdxdWxc84bDYlrM7Y"
            />
            <div className="flex flex-col leading-none">
              <span className="text-lg md:text-xl font-bold text-[#00288e] tracking-tight">CS Shopping Hub</span>
              <span className="text-[10px] text-[#fd651e] tracking-wider uppercase font-semibold">
                {isBn ? 'স্মার্টশপ বাংলাদেশ' : 'SmartShop Bangladesh'}
              </span>
            </div>
          </div>

          {/* Search Form */}
          <div className="flex-1 max-w-2xl mx-2 md:mx-4">
            <form onSubmit={onSearchSubmit} className="flex items-center bg-[#f2f3ff] rounded-xl p-1 shadow-xs border border-[#c4c5d5]/40 focus-within:ring-2 focus-within:ring-[#00288e]/30 focus-within:border-[#00288e] transition-all">
              <div className="relative hidden md:flex items-center border-r border-[#c4c5d5]/40 pr-2 pl-3">
                <select
                  value={selectedSearchCategory}
                  onChange={(e) => setSelectedSearchCategory(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-[#444653] focus:outline-none cursor-pointer pr-4 appearance-none"
                >
                  <option value="all">{isBn ? 'সব ক্যাটাগরি' : 'All Categories'}</option>
                  <option value="mobile-gadgets">{isBn ? 'স্মার্টফোন ও গ্যাজেট' : 'Mobile & Gadgets'}</option>
                  <option value="computers-laptops">{isBn ? 'কম্পিউটার ও ল্যাপটপ' : 'Computers & Laptops'}</option>
                  <option value="smartwatch-watches">{isBn ? 'স্মার্টওয়াচ ও ঘড়ি' : 'Smartwatches & Watches'}</option>
                  <option value="men-fashion">{isBn ? 'ফ্যাশন ও লাইফস্টাইল' : 'Fashion & Lifestyle'}</option>
                </select>
                <span className="material-symbols-outlined text-xs pointer-events-none -ml-3 text-[#757684]">expand_more</span>
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isBn ? "স্মার্টফোন, গ্যাজেট বা পণ্য খুঁজুন..." : "Search smartphones, gadgets or products..."}
                className="w-full bg-transparent px-3 py-1.5 text-sm text-[#131b2e] placeholder:text-[#757684] focus:outline-none"
              />

              <button
                type="button"
                onClick={triggerVoiceSearch}
                className={`p-1.5 rounded-lg transition-colors ${
                  isListening ? 'text-[#ba1a1a] bg-[#ffdad6] animate-pulse' : 'text-[#757684] hover:text-[#00288e]'
                }`}
                title={isBn ? "ভয়েস সার্চ" : "Voice Search"}
              >
                <span className="material-symbols-outlined text-xl">mic</span>
              </button>

              <button
                type="submit"
                className="bg-[#00288e] text-white text-sm font-semibold px-4 md:px-5 py-2 rounded-lg flex items-center gap-1.5 hover:bg-[#1e40af] transition-all ml-1 shrink-0 cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-lg">search</span>
                <span className="hidden sm:inline">{isBn ? 'অনুসন্ধান' : 'Search'}</span>
              </button>
            </form>
          </div>

          {/* Action icons */}
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            {/* Hot Deals */}
            <button
              type="button"
              onClick={() => onScrollToSection('flash-sale-section')}
              className="flex flex-col items-center relative text-[#444653] hover:text-[#00288e] transition-colors cursor-pointer group"
            >
              <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">local_fire_department</span>
              <span className="text-[11px] font-semibold mt-0.5 hidden md:block">
                {isBn ? 'অফার ও ডিল' : 'Deals'}
              </span>
              <span className="absolute -top-1 -right-2 bg-[#a73a00] text-white text-[9px] px-1.5 py-0.2 rounded-full font-bold">
                {isBn ? 'হট' : 'HOT'}
              </span>
            </button>

            {/* Wishlist */}
            <button
              type="button"
              onClick={onOpenWishlist}
              className="flex flex-col items-center relative text-[#444653] hover:text-[#00288e] transition-colors cursor-pointer group"
            >
              <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">favorite</span>
              <span className="text-[11px] font-semibold mt-0.5 hidden md:block">
                {isBn ? 'পছন্দের তালিকা' : 'Wishlist'}
              </span>
              {wishlistIds.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#00288e] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {isBn ? toBengaliNumber(wishlistIds.length) : wishlistIds.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              type="button"
              onClick={onOpenCart}
              className="flex items-center gap-2 bg-[#eaedff] px-3 py-1.5 rounded-xl hover:bg-[#e2e7ff] transition-colors cursor-pointer shadow-xs border border-[#c4c5d5]/30"
            >
              <div className="relative">
                <span className="material-symbols-outlined text-2xl text-[#a73a00]">shopping_bag</span>
                {totalCartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#fd651e] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-xs">
                    {isBn ? toBengaliNumber(totalCartCount) : totalCartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-[11px] text-[#444653] font-medium">{isBn ? 'কার্ট' : 'Cart'}</span>
                <span className="text-xs font-bold text-[#a73a00]">
                  {formatPrice(cartSubtotal, isBn)}
                </span>
              </div>
            </button>

            {/* Profile Avatar / Customer Panel Entry */}
            <div 
              onClick={() => {
                if (isCustomerLoggedIn) {
                  onOpenCustomerPanel();
                } else {
                  onOpenCustomerAuth();
                }
              }}
              className="flex items-center gap-2 pl-2 border-l border-[#c4c5d5]/40 cursor-pointer group"
              title={isCustomerLoggedIn ? (isBn ? "কাস্টমার ড্যাশবোর্ড" : "Customer Dashboard") : (isBn ? "লগইন করুন" : "Login")}
            >
              {isCustomerLoggedIn ? (
                <img
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-transparent group-hover:ring-[#00288e] transition-all"
                  src={customerAvatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuC8Xj8ivkFUep8KYfBR9sWPY-cx98_lEqvPSl3BC5Qn3PpB4sqX3ltQHp3eB04uQH0zvbMS8FdILhs6LN9IOxP4JZfU8pk7yTAeNS1J7ptdhBaegFlCtyj590xAumGLdlHquOk1AAKGwoN4Wow2ERXQkzQrAk6ExvMB4gOV6jC94lDKlMKi0RFsbih3Fuf2hDEtXaVo_I10SlLgSl0Qqb4ZLJze4eBgAQo19G9OVVP0ntnePLG1yqQZ0S40XU5CWE3IedAtAo7LMYXsDEs"}
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#eaedff] text-[#00288e] flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-lg">person</span>
                </div>
              )}
              <div className="hidden xl:flex flex-col text-left leading-tight">
                <span className="text-xs font-bold text-[#131b2e] truncate max-w-[120px]">
                  {isCustomerLoggedIn ? (customerName || 'solaiman') : (isBn ? 'লগইন করুন' : 'Sign In')}
                </span>
                <span className="text-[11px] text-[#00288e] group-hover:underline">
                  {isCustomerLoggedIn ? (isBn ? 'কাস্টমার প্যানেল' : 'My Account') : (isBn ? 'নতুন অ্যাকাউন্ট' : 'Register')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Navigation Bar */}
        <div className="bg-white border-t border-[#c4c5d5]/20 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between gap-3">
            {/* All Categories Dropdown Button */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setIsCatDropdownOpen(!isCatDropdownOpen)}
                className="bg-[#00288e] text-white text-xs sm:text-sm font-semibold px-4 py-2 flex items-center gap-2 rounded-t-lg hover:bg-[#1e40af] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg sm:text-xl">menu</span>
                <span>{isBn ? 'সকল ক্যাটাগরি ▼' : 'All Categories ▼'}</span>
              </button>

              {/* Mega-menu dropdown */}
              {isCatDropdownOpen && (
                <div 
                  className="absolute top-full left-0 w-64 bg-white rounded-b-xl shadow-xl border border-[#c4c5d5]/40 py-2 z-50 animate-in fade-in slide-in-from-top-1"
                  onMouseLeave={() => setIsCatDropdownOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => { onSelectCategory('mobile-gadgets'); setIsCatDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-[#f2f3ff] hover:text-[#00288e] flex items-center gap-2 transition-colors"
                  >
                    <span className="material-symbols-outlined text-base text-[#00288e]">smartphone</span>
                    <span>{isBn ? 'মোবাইল ও গ্যাজেট' : 'Mobile & Gadgets'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { onSelectCategory('computers-laptops'); setIsCatDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-[#f2f3ff] hover:text-[#00288e] flex items-center gap-2 transition-colors"
                  >
                    <span className="material-symbols-outlined text-base text-[#00288e]">laptop_mac</span>
                    <span>{isBn ? 'কম্পিউটার ও ল্যাপটপ' : 'Computers & Laptops'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { onSelectCategory('electronics'); setIsCatDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-[#f2f3ff] hover:text-[#00288e] flex items-center gap-2 transition-colors"
                  >
                    <span className="material-symbols-outlined text-base text-[#00288e]">headphones</span>
                    <span>{isBn ? 'ইলেকট্রনিক্স অডিও' : 'Electronics Audio'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { onSelectCategory('men-fashion'); setIsCatDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-[#f2f3ff] hover:text-[#00288e] flex items-center gap-2 transition-colors"
                  >
                    <span className="material-symbols-outlined text-base text-[#a73a00]">styler</span>
                    <span>{isBn ? 'পুরুষ ও নারী ফ্যাশন' : "Men & Women Fashion"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { onSelectCategory('shoes-bags'); setIsCatDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-[#f2f3ff] hover:text-[#00288e] flex items-center gap-2 transition-colors"
                  >
                    <span className="material-symbols-outlined text-base text-[#00288e]">shopping_bag</span>
                    <span>{isBn ? 'জুতা ও ব্যাগ' : 'Shoes & Bags'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { onSelectCategory('smartwatch-watches'); setIsCatDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-[#f2f3ff] hover:text-[#00288e] flex items-center gap-2 transition-colors"
                  >
                    <span className="material-symbols-outlined text-base text-[#00288e]">watch</span>
                    <span>{isBn ? 'ঘড়ি ও পরিধানযোগ্য' : 'Watches & Wearables'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Horizontal Nav Links */}
            <nav className="flex-1 flex items-center gap-4 lg:gap-6 overflow-x-auto whitespace-nowrap scrollbar-none py-2 text-[#444653] text-xs sm:text-sm font-semibold">
              <button
                type="button"
                onClick={() => onSelectCategory('mobile-gadgets')}
                className="hover:text-[#00288e] transition-colors cursor-pointer"
              >
                {isBn ? 'মোবাইল ও গ্যাজেট' : 'Mobiles & Gadgets'}
              </button>
              <button
                type="button"
                onClick={() => onSelectCategory('computers-laptops')}
                className="hover:text-[#00288e] transition-colors cursor-pointer"
              >
                {isBn ? 'কম্পিউটার ও ল্যাপটপ' : 'Computers & Laptops'}
              </button>
              <button
                type="button"
                onClick={() => onSelectCategory('electronics')}
                className="hover:text-[#00288e] transition-colors cursor-pointer"
              >
                {isBn ? 'ইলেকট্রনিক্স' : 'Electronics'}
              </button>
              <button
                type="button"
                onClick={() => onSelectCategory('men-fashion')}
                className="hover:text-[#00288e] transition-colors cursor-pointer"
              >
                {isBn ? 'পুরুষ ও নারী ফ্যাশন' : 'Fashion'}
              </button>
              <button
                type="button"
                onClick={() => onSelectCategory('shoes-bags')}
                className="hover:text-[#00288e] transition-colors cursor-pointer"
              >
                {isBn ? 'জুতা ও ব্যাগ' : 'Shoes & Bags'}
              </button>
              <button
                type="button"
                onClick={() => onSelectCategory('smartwatch-watches')}
                className="hover:text-[#00288e] transition-colors cursor-pointer"
              >
                {isBn ? 'স্মার্টওয়াচ ও ঘড়ি' : 'Smartwatches'}
              </button>
              <button
                type="button"
                onClick={() => onSelectCategory('electronics')}
                className="hover:text-[#00288e] transition-colors cursor-pointer"
              >
                {isBn ? 'হোম ও কিচেন' : 'Home & Kitchen'}
              </button>
              <button
                type="button"
                onClick={() => onSelectCategory('beauty-care')}
                className="hover:text-[#00288e] transition-colors cursor-pointer"
              >
                {isBn ? 'বিউটি ও কেয়ার' : 'Beauty & Care'}
              </button>
              <button
                type="button"
                onClick={() => onScrollToSection('flash-sale-section')}
                className="text-[#a73a00] hover:text-[#fd651e] font-bold transition-colors cursor-pointer flex items-center gap-0.5"
              >
                <span>{isBn ? 'ধামাকা অফার' : 'Dhamaka Offers'}</span>
              </button>
              <button
                type="button"
                onClick={() => onScrollToSection('flash-sale-section')}
                className="text-[#fd651e] hover:text-[#a73a00] font-bold transition-colors cursor-pointer"
              >
                {isBn ? 'ফ্ল্যাশ সেল' : 'Flash Sale'}
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
