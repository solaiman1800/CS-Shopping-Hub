import React from 'react';

interface FooterProps {
  onNotifyInstall: (platform: string) => void;
  lang: 'bn' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ onNotifyInstall, lang }) => {
  const isBn = lang === 'bn';

  return (
    <footer className="w-full bg-white mt-12 border-t border-[#c4c5d5]/30">
      {/* 4 Trust Badges Strip */}
      <div className="bg-[#f2f3ff] border-b border-[#c4c5d5]/30 py-5">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#dde1ff] flex items-center justify-center text-[#00288e] shrink-0">
              <span className="material-symbols-outlined text-2xl">verified</span>
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-[#131b2e]">
                {isBn ? '১০০% অরিজিনাল পণ্য' : '100% Original Products'}
              </div>
              <div className="text-[11px] text-[#444653]">
                {isBn ? 'সরাসরি ব্র্যান্ড থেকে সংগৃহীত' : 'Sourced directly from brands'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ffdbce] flex items-center justify-center text-[#a73a00] shrink-0">
              <span className="material-symbols-outlined text-2xl">sync</span>
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-[#131b2e]">
                {isBn ? '৭ দিনের রিটার্ন পলিসি' : '7 Days Return Policy'}
              </div>
              <div className="text-[11px] text-[#444653]">
                {isBn ? 'সহজ ও ঝামেলামুক্ত ফেরত' : 'Easy hassle-free returns'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#85f8c4] flex items-center justify-center text-[#003d28] shrink-0">
              <span className="material-symbols-outlined text-2xl">lock</span>
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-[#131b2e]">
                {isBn ? 'নিরাপদ পেমেন্ট গেটওয়ে' : 'Secure Payment Gateway'}
              </div>
              <div className="text-[11px] text-[#444653]">
                {isBn ? 'বিকাশ, নগদ, কার্ড ও ক্যাশ অন ডেলিভারি' : 'bKash, Nagad, Card & COD'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#dde1ff] flex items-center justify-center text-[#00288e] shrink-0">
              <span className="material-symbols-outlined text-2xl">electric_bolt</span>
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-[#131b2e]">
                {isBn ? 'দ্রুততম হোম ডেলিভারি' : 'Fastest Home Delivery'}
              </div>
              <div className="text-[11px] text-[#444653]">
                {isBn ? 'সারা বাংলাদেশে বিশ্বস্ত সার্ভিস' : 'Reliable service across BD'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Columns Footer Body */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Col 1 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <img
              alt="SmartShop BD Logo"
              className="h-7 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1W9MwSN9kobi1DGatDRW2epRTGzHgQuGJJizGtkctUTk_7GV9l6qtbb3WLbAJxc03UysdREwcOMifxcnfoHlc7ElmCF9vJGIcARFO3DkOkfvsI38kiOHrxia1TvquuBCkzaEouezNFh-j1noajJqE4-xQnL5El6rPw4Jt4VdUtagduVUaxkV17rVKz19gHHsOfyD-f73gLQgo2Lsfij6j3fFHVQ6lvKJEiIpWRiLMxwUGNYZYCRFE_Alb4"
            />
            <span className="text-lg font-bold text-[#00288e]">
              {isBn ? 'স্মার্টশপ বিডি' : 'SmartShop BD'}
            </span>
          </div>
          <p className="text-xs text-[#444653] leading-relaxed">
            {isBn
              ? 'বাংলাদেশের শীর্ষস্থানীয় বিশ্বস্ত অনলাইন শপিং প্ল্যাটফর্ম। সর্বাধুনিক গ্যাজেট, লাইফস্টাইল পণ্য এবং নির্ভরযোগ্য গ্রাহক সেবা নিয়ে আমরা সর্বদা আপনার পাশে।'
              : 'Leading and trusted online shopping platform in Bangladesh offering latest gadgets, lifestyle products, and authentic customer support.'}
          </p>
          <div className="text-xs text-[#444653] space-y-1.5 pt-2">
            <p className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-[#00288e]">badge</span>
              <span>{isBn ? 'ট্রেড লাইসেন্স নং: TRAD/DSCC/012984/2023' : 'Trade License: TRAD/DSCC/012984/2023'}</span>
            </p>
            <p className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-[#00288e]">location_on</span>
              <span>{isBn ? 'ঠিকানা: গুলশান-১, ঢাকা-১২১২, বাংলাদেশ' : 'Address: Gulshan-1, Dhaka-1212, Bangladesh'}</span>
            </p>
            <p className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-[#00288e]">mail</span>
              <span>support@smartshopbd.com</span>
            </p>
          </div>
        </div>

        {/* Col 2: Customer Service */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-[#131b2e] uppercase tracking-wide">
            {isBn ? 'গ্রাহক সেবা' : 'Customer Service'}
          </h4>
          <ul className="space-y-2 text-xs text-[#444653]">
            <li><a href="#how-to-order" className="hover:text-[#00288e] transition-colors">{isBn ? 'কীভাবে অর্ডার করবেন' : 'How to Order'}</a></li>
            <li><a href="#return-policy" className="hover:text-[#00288e] transition-colors">{isBn ? 'রিটার্ন ও রিফান্ড নীতি' : 'Return & Refund Policy'}</a></li>
            <li><a href="#warranty-policy" className="hover:text-[#00288e] transition-colors">{isBn ? 'ওয়ারেন্টি পলিসি' : 'Warranty Policy'}</a></li>
            <li><a href="#terms" className="hover:text-[#00288e] transition-colors">{isBn ? 'শর্তাবলী ও গোপনীয়তা নীতি' : 'Terms & Privacy Policy'}</a></li>
            <li><a href="#faq" className="hover:text-[#00288e] transition-colors">{isBn ? 'সাধারণ জিজ্ঞাসা (FAQ)' : 'FAQ & Help'}</a></li>
          </ul>
        </div>

        {/* Col 3: Quick Links */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-[#131b2e] uppercase tracking-wide">
            {isBn ? 'দ্রুত লিংক' : 'Quick Links'}
          </h4>
          <ul className="space-y-2 text-xs text-[#444653]">
            <li><a href="#about" className="hover:text-[#00288e] transition-colors">{isBn ? 'আমাদের সম্পর্কে' : 'About Us'}</a></li>
            <li><a href="#cashback" className="hover:text-[#00288e] transition-colors">{isBn ? 'বিকাশ ক্যাশব্যাক অফার' : 'bKash Cashback Offer'}</a></li>
            <li><a href="#careers" className="hover:text-[#00288e] transition-colors">{isBn ? 'ক্যারিয়ার ও সুযোগ' : 'Careers & Hiring'}</a></li>
            <li><a href="#seller" className="hover:text-[#00288e] transition-colors">{isBn ? 'বিক্রয় প্রতিনিধি হন (মার্চেন্ট)' : 'Become a Merchant'}</a></li>
            <li><a href="#coupons" className="hover:text-[#00288e] transition-colors">{isBn ? 'কুপন ও ভাউচার' : 'Coupons & Vouchers'}</a></li>
          </ul>
        </div>

        {/* Col 4: Payment Partners & App */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-[#131b2e] uppercase tracking-wide">
            {isBn ? 'পেমেন্ট পার্টনার্স' : 'Payment Partners'}
          </h4>
          <div className="flex flex-wrap gap-2">
            <span className="bg-[#eaedff] px-2.5 py-1 rounded-md text-xs font-semibold text-[#E2136E]">bKash</span>
            <span className="bg-[#eaedff] px-2.5 py-1 rounded-md text-xs font-semibold text-[#F7941D]">Nagad</span>
            <span className="bg-[#eaedff] px-2.5 py-1 rounded-md text-xs font-semibold text-[#8C3494]">Rocket</span>
            <span className="bg-[#eaedff] px-2.5 py-1 rounded-md text-xs font-semibold text-[#00288e]">Visa</span>
            <span className="bg-[#eaedff] px-2.5 py-1 rounded-md text-xs font-semibold text-[#fd651e]">Mastercard</span>
            <span className="bg-[#eaedff] px-2.5 py-1 rounded-md text-xs font-semibold text-[#00563a]">Cash on Delivery</span>
          </div>

          <div className="pt-2">
            <h5 className="text-xs font-semibold text-[#131b2e] mb-2">
              {isBn ? 'স্মার্টশপ অ্যাপ ডাউনলোড করুন' : 'Download SmartShop App'}
            </h5>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onNotifyInstall('Google Play')}
                className="bg-[#283044] text-white px-3 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-black transition-colors"
              >
                <span className="material-symbols-outlined text-xl">shop</span>
                <div className="text-left leading-none">
                  <div className="text-[9px] uppercase">GET IT ON</div>
                  <div className="text-xs font-bold mt-0.5">Google Play</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onNotifyInstall('App Store')}
                className="bg-[#283044] text-white px-3 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-black transition-colors"
              >
                <span className="material-symbols-outlined text-xl">phone_iphone</span>
                <div className="text-left leading-none">
                  <div className="text-[9px] uppercase">Download on</div>
                  <div className="text-xs font-bold mt-0.5">App Store</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-[#c4c5d5]/30 bg-[#f2f3ff] py-4">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#444653]">
          <div>
            {isBn
              ? 'স্বত্ব © ২০২৫ স্মার্টশপ বিডি লিমিটেড। সর্বস্বত্ব সংরক্ষিত।'
              : 'Copyright © 2025 SmartShop BD Ltd. All rights reserved.'}
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <a href="#terms" className="hover:text-[#00288e] transition-colors">
              {isBn ? 'শর্তাবলী' : 'Terms'}
            </a>
            <a href="#privacy" className="hover:text-[#00288e] transition-colors">
              {isBn ? 'প্রাইভেসি' : 'Privacy'}
            </a>
            <a href="#support" className="hover:text-[#00288e] transition-colors">
              {isBn ? 'সহায়তা কেন্দ্র' : 'Help Center'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
