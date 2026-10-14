import React from 'react';

interface HeroSectionProps {
  onSelectCategory: (categoryId: string) => void;
  onExploreOffers: () => void;
  onOpenExchangeModal: () => void;
  onOpenCashbackModal: () => void;
  onCopyVoucher: (code: string) => void;
  lang: 'bn' | 'en';
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectCategory,
  onExploreOffers,
  onOpenExchangeModal,
  onOpenCashbackModal,
  onCopyVoucher,
  lang,
}) => {
  const isBn = lang === 'bn';

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-5 md:py-6 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 items-stretch">
        {/* Left Sidebar: Category Accordion Tree */}
        <aside className="hidden lg:flex lg:col-span-3 bg-white rounded-2xl shadow-xs border border-[#c4c5d5]/30 p-3.5 flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 px-2 border-b border-[#c4c5d5]/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00288e] text-xl">category</span>
                <span className="text-base font-bold text-[#131b2e]">
                  {isBn ? 'ক্যাটাগরি সমূহ' : 'Categories'}
                </span>
              </div>
              <span className="text-xs bg-[#eaedff] text-[#00288e] font-bold px-2 py-0.5 rounded-full">
                {isBn ? '৮টি প্রধান' : '8 Main'}
              </span>
            </div>

            <nav className="flex flex-col space-y-1 mt-2">
              <button
                type="button"
                onClick={() => onSelectCategory('mobile-gadgets')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#f2f3ff] transition-all group cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#00288e] group-hover:bg-[#00288e] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-lg">smartphone</span>
                  </span>
                  <span className="text-sm font-semibold text-[#131b2e] group-hover:text-[#00288e] transition-colors">
                    {isBn ? 'মোবাইল ও গ্যাজেট' : 'Mobile & Gadgets'}
                  </span>
                </div>
                <span className="material-symbols-outlined text-base text-[#c4c5d5] group-hover:text-[#00288e] group-hover:translate-x-0.5 transition-all">
                  chevron_right
                </span>
              </button>

              <button
                type="button"
                onClick={() => onSelectCategory('computers-laptops')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#f2f3ff] transition-all group cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#00288e] group-hover:bg-[#00288e] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-lg">laptop_mac</span>
                  </span>
                  <span className="text-sm font-semibold text-[#131b2e] group-hover:text-[#00288e] transition-colors">
                    {isBn ? 'কম্পিউটার ও ল্যাপটপ' : 'Computers & Laptops'}
                  </span>
                </div>
                <span className="material-symbols-outlined text-base text-[#c4c5d5] group-hover:text-[#00288e] group-hover:translate-x-0.5 transition-all">
                  chevron_right
                </span>
              </button>

              <button
                type="button"
                onClick={() => onSelectCategory('electronics')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#f2f3ff] transition-all group cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#00288e] group-hover:bg-[#00288e] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-lg">headphones</span>
                  </span>
                  <span className="text-sm font-semibold text-[#131b2e] group-hover:text-[#00288e] transition-colors">
                    {isBn ? 'ইলেকট্রনিক্স অডিও' : 'Electronics Audio'}
                  </span>
                </div>
                <span className="material-symbols-outlined text-base text-[#c4c5d5] group-hover:text-[#00288e] group-hover:translate-x-0.5 transition-all">
                  chevron_right
                </span>
              </button>

              <button
                type="button"
                onClick={() => onSelectCategory('men-fashion')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#f2f3ff] transition-all group cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#a73a00] group-hover:bg-[#a73a00] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-lg">styler</span>
                  </span>
                  <span className="text-sm font-semibold text-[#131b2e] group-hover:text-[#a73a00] transition-colors">
                    {isBn ? 'পোশাক ও ফ্যাশন' : 'Clothing & Fashion'}
                  </span>
                </div>
                <span className="text-[11px] bg-[#ffdbce] text-[#a73a00] px-2 py-0.5 rounded-full font-bold">
                  {isBn ? 'নতুন' : 'New'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => onSelectCategory('shoes-bags')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#f2f3ff] transition-all group cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#00288e] group-hover:bg-[#00288e] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-lg">shopping_bag</span>
                  </span>
                  <span className="text-sm font-semibold text-[#131b2e] group-hover:text-[#00288e] transition-colors">
                    {isBn ? 'জুতা ও ব্যাগ' : 'Shoes & Bags'}
                  </span>
                </div>
                <span className="material-symbols-outlined text-base text-[#c4c5d5] group-hover:text-[#00288e] group-hover:translate-x-0.5 transition-all">
                  chevron_right
                </span>
              </button>

              <button
                type="button"
                onClick={() => onSelectCategory('smartwatch-watches')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#f2f3ff] transition-all group cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#00288e] group-hover:bg-[#00288e] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-lg">watch</span>
                  </span>
                  <span className="text-sm font-semibold text-[#131b2e] group-hover:text-[#00288e] transition-colors">
                    {isBn ? 'ঘড়ি ও পরিধানযোগ্য' : 'Watches & Wearables'}
                  </span>
                </div>
                <span className="material-symbols-outlined text-base text-[#c4c5d5] group-hover:text-[#00288e] group-hover:translate-x-0.5 transition-all">
                  chevron_right
                </span>
              </button>

              <button
                type="button"
                onClick={() => onSelectCategory('electronics')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#f2f3ff] transition-all group cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#00288e] group-hover:bg-[#00288e] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-lg">soup_kitchen</span>
                  </span>
                  <span className="text-sm font-semibold text-[#131b2e] group-hover:text-[#00288e] transition-colors">
                    {isBn ? 'হোম ও কিচেন' : 'Home & Kitchen'}
                  </span>
                </div>
                <span className="material-symbols-outlined text-base text-[#c4c5d5] group-hover:text-[#00288e] group-hover:translate-x-0.5 transition-all">
                  chevron_right
                </span>
              </button>

              <button
                type="button"
                onClick={() => onSelectCategory('beauty-care')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#f2f3ff] transition-all group cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#00288e] group-hover:bg-[#00288e] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-lg">spa</span>
                  </span>
                  <span className="text-sm font-semibold text-[#131b2e] group-hover:text-[#00288e] transition-colors">
                    {isBn ? 'রূপচর্চা ও বিউটি' : 'Beauty & Care'}
                  </span>
                </div>
                <span className="material-symbols-outlined text-base text-[#c4c5d5] group-hover:text-[#00288e] group-hover:translate-x-0.5 transition-all">
                  chevron_right
                </span>
              </button>
            </nav>
          </div>

          <button
            type="button"
            onClick={onExploreOffers}
            className="mt-4 p-3 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] flex items-center justify-between transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#fd651e] group-hover:scale-110 transition-transform">bolt</span>
              <span className="text-sm font-bold text-[#131b2e]">
                {isBn ? 'ধামাকা ডিল দেখুন' : 'Explore Flash Deals'}
              </span>
            </div>
            <span className="material-symbols-outlined text-base text-[#fd651e] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </aside>

        {/* Center Hero Banner Carousel */}
        <div className="lg:col-span-6 relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#00288e] via-[#1e40af] to-[#3755c3] shadow-md flex flex-col justify-between p-6 md:p-8 min-h-[380px]">
          {/* Ambient Light Orbs */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#fd651e]/25 blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-12 w-64 h-64 rounded-full bg-[#dde1ff]/20 blur-2xl pointer-events-none"></div>

          {/* Top badges */}
          <div className="relative z-10 flex items-start justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#fd651e] text-white px-3 py-1 rounded-full text-xs font-bold shadow-xs flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">local_fire_department</span>
                <span>{isBn ? 'মেগা ঈদ ধামাকা ২০২৫' : 'Mega Dhamaka 2025'}</span>
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold">
                {isBn ? 'লিমিটেড টাইম ক্যাম্পেইন' : 'Limited Time Campaign'}
              </span>
            </div>
            <span className="text-white/80 text-xs tracking-wider uppercase font-semibold">
              Official Store BD
            </span>
          </div>

          {/* Main Hero Copy */}
          <div className="relative z-10 my-4 md:my-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight max-w-md drop-shadow-xs">
              {isBn ? (
                <>
                  সেরা গ্যাজেটে <span className="text-[#ffdbce]">৬০% পর্যন্ত ছাড়!</span>
                </>
              ) : (
                <>
                  Up to <span className="text-[#ffdbce]">60% Off</span> on Top Gadgets!
                </>
              )}
            </h1>
            <p className="text-xs sm:text-sm text-white/90 mt-2.5 max-w-sm leading-relaxed">
              {isBn
                ? 'স্মার্টফোন, প্রিমিয়াম ওয়্যারলেস ইয়ারবাড এবং লাইফস্টাইল অ্যাক্সেসরিজে উপভোগ করুন অবিশ্বাস্য ক্যাশব্যাক ও ফ্রি ডেলিভারি।'
                : 'Experience incredible cashback and free delivery on flagship smartphones, ANC earbuds, and lifestyle tech.'}
            </p>

            {/* Voucher snippet */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onCopyVoucher('SMART2025')}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                title={isBn ? "ক্লিক করে কুপন কপি করুন" : "Click to copy code"}
              >
                <span className="material-symbols-outlined text-[#ffdbce] text-base">confirmation_number</span>
                <span className="text-xs text-white">
                  {isBn ? 'কুপন: ' : 'Coupon: '}
                  <strong className="text-[#ffdbce] font-bold tracking-widest">SMART2025</strong>
                </span>
              </button>
              <span className="text-xs text-white/80">
                {isBn ? '৳১০০০ অর্ডারে প্রযোজ্য' : 'Valid on orders over ৳1,000'}
              </span>
            </div>
          </div>

          {/* Hero CTAs */}
          <div className="relative z-10 flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onExploreOffers}
              className="bg-[#fd651e] text-white hover:bg-[#a73a00] transition-all text-sm font-bold px-6 py-2.5 sm:py-3 rounded-xl shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <span>{isBn ? 'এখনই কিনুন' : 'Shop Now'}</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
            <button
              type="button"
              onClick={onExploreOffers}
              className="bg-white/10 hover:bg-white/20 backdrop-blur text-white transition-colors text-sm font-medium px-4 py-2.5 sm:py-3 rounded-xl flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">storefront</span>
              <span>{isBn ? 'সকল অফার ব্রাউজ' : 'Browse All Offers'}</span>
            </button>
          </div>

          {/* Hero Floating Gadget Graphic */}
          <div className="absolute right-0 bottom-0 top-16 w-1/2 hidden md:flex items-center justify-center pointer-events-none opacity-90">
            <img
              className="object-contain h-full max-h-72 drop-shadow-2xl hover:scale-105 transition-transform"
              alt="High tech modern flagship smartphone floating with wireless ANC earbuds and sleek smartwatch"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAPDajyfJZMAAg18947gLM_fRuvTgVBcOC_yqCIfZ_QZvu7iJR4E1gYSr9RI6XtRrYLy-oaR9U2tSpmnWrHYWZUtew-xzXketZHMwIgahvKLkvPDF8iB5p7wAw0DBhBwOyOARH9OE_j6AmCVo9SRtzR26Xuq4ApdDZ0t95E23iW_XgmMqCeJjOL2hDDlPDK8FNBxtE38eW-SFBy6urzdrtjO3CLY-vYh0sNQcAt4n2tzX-JAfVRJWvoQ"
            />
          </div>
        </div>

        {/* Right Side: Dual Mini Promo Banners */}
        <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-4">
          {/* Mini Banner 1: Exchange Offer */}
          <div 
            onClick={onOpenExchangeModal}
            className="flex-1 bg-white rounded-2xl shadow-xs border border-[#c4c5d5]/30 p-4 relative overflow-hidden flex flex-col justify-between group cursor-pointer hover:shadow-md transition-all"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <span className="bg-[#dde1ff] text-[#173bab] text-xs px-2.5 py-0.5 rounded-full font-bold">
                  {isBn ? 'লঞ্চিং অফার' : 'Launching Offer'}
                </span>
                <span className="material-symbols-outlined text-[#fd651e] text-xl">electric_bolt</span>
              </div>
              <h3 className="text-base font-bold text-[#131b2e] mt-2 group-hover:text-[#00288e] transition-colors">
                {isBn ? 'স্মার্টফোন এক্সচেঞ্জ উৎসব' : 'Smartphone Exchange Fest'}
              </h3>
              <p className="text-xs text-[#444653] mt-1">
                {isBn
                  ? 'পুরোনো ফোন বদলে পান অতিরিক্ত ৳৩,০০০ পর্যন্ত বোনাস!'
                  : 'Upgrade your old phone and get up to ৳3,000 extra trade-in bonus!'}
              </p>
            </div>

            <div className="relative z-10 mt-3 flex items-center justify-between">
              <span className="text-xs font-bold text-[#00288e] flex items-center gap-1 group-hover:underline">
                <span>{isBn ? 'এক্সচেঞ্জ করুন' : 'Exchange Now'}</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
              <div className="w-16 h-16 rounded-xl bg-[#f2f3ff] p-1 overflow-hidden shrink-0 border border-[#c4c5d5]/20">
                <img
                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
                  alt="Modern smartphone camera module"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4tqmztEqJvznLK1zQEeYI18MQ7EEVeMMK_hupSurm7URE04znsxkZK3X1Qz7U9PaoCOluLkCRl2yMyjEqx6zSZMhHRZa-WwE6PebkJgHu1KIKaDUiK78iVchgxEYIC8BIr8J4t6Y1hCTCMhOzaX85bYDEBgwJC813LNEFmMh-Ov8QY99sEl8-fmSzJBwjMd3-vae4bB8rLovm0sY7KeZu_1R79LDQ1dohCwWc-8PrDH5eekbfpbbN5w"
                />
              </div>
            </div>
          </div>

          {/* Mini Banner 2: bKash & Nagad Cashback */}
          <div 
            onClick={onOpenCashbackModal}
            className="flex-1 bg-gradient-to-br from-[#ffdbce]/40 via-white to-[#f2f3ff] rounded-2xl shadow-xs border border-[#c4c5d5]/30 p-4 relative overflow-hidden flex flex-col justify-between group cursor-pointer hover:shadow-md transition-all"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <span className="bg-[#a73a00] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {isBn ? 'ক্যাশব্যাক ডিল' : 'Cashback Deal'}
                </span>
                <span className="text-xs font-bold text-[#a73a00]">
                  {isBn ? '২০% ক্যাশব্যাক' : '20% Cashback'}
                </span>
              </div>
              <h3 className="text-base font-bold text-[#131b2e] mt-2 group-hover:text-[#a73a00] transition-colors">
                {isBn ? 'বিকাশ ও নগদ স্পেশাল' : 'bKash & Nagad Special'}
              </h3>
              <p className="text-xs text-[#444653] mt-1">
                {isBn
                  ? 'যেকোনো পেমেন্টে ২০% তাৎক্ষণিক ক্যাশব্যাক আপনার ওয়ালেটে।'
                  : 'Enjoy instant 20% cashback directly credited to your wallet.'}
              </p>
            </div>

            <div className="relative z-10 mt-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <span className="bg-white px-2 py-0.5 rounded text-[#E2136E] shadow-2xs border border-[#c4c5d5]/20">
                  বিকাশ
                </span>
                <span className="bg-white px-2 py-0.5 rounded text-[#F7941D] shadow-2xs border border-[#c4c5d5]/20">
                  নগদ
                </span>
              </div>
              <div className="bg-[#fd651e] group-hover:bg-[#a73a00] text-white p-2 rounded-lg flex items-center justify-center transition-colors shadow-xs">
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
