import React from 'react';

interface AppDownloadBannerProps {
  onNotifyInstall: (platform: string) => void;
  lang: 'bn' | 'en';
}

export const AppDownloadBanner: React.FC<AppDownloadBannerProps> = ({
  onNotifyInstall,
  lang,
}) => {
  const isBn = lang === 'bn';

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-6 w-full">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#00288e] to-[#1e40af] p-6 md:p-10 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Ambient light effect */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#fd651e]/20 blur-3xl pointer-events-none"></div>

        <div className="max-w-xl space-y-3 z-10 text-center md:text-left">
          <span className="bg-[#fd651e] text-white px-3 py-1 rounded-full text-xs font-bold inline-block shadow-xs">
            {isBn ? 'মোবাইল অ্যাপ এক্সক্লুসিভ' : 'Mobile App Exclusive'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight text-white">
            {isBn ? (
              <>
                স্মার্টশপ অ্যাপ ডাউনলোড করুন! ১ম অর্ডারে <span className="text-[#ffdbce]">৳২০০ ডিসকাউন্ট</span>
              </>
            ) : (
              <>
                Download SmartShop App! Get <span className="text-[#ffdbce]">৳200 Off</span> on 1st Order
              </>
            )}
          </h2>
          <p className="text-xs sm:text-sm text-white/90 max-w-md leading-relaxed">
            {isBn
              ? 'সহজ নোটিফিকেশন, ট্র্যাক অর্ডার লাইভ আপডেট এবং এক্সক্লুসিভ ফ্ল্যাশ সেল অফার সরাসরি হাতের মুঠোয় পেতে ইন্সটল করুন।'
              : 'Install the app to get instant order notifications, real-time tracking, and app-only flash deals.'}
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4">
            {/* Google Play */}
            <button
              type="button"
              onClick={() => onNotifyInstall('Google Play')}
              className="bg-white text-[#131b2e] px-4 py-2.5 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-[#eaedff] transition-all shadow-sm active:scale-98"
            >
              <span className="material-symbols-outlined text-3xl text-[#00288e]">shop</span>
              <div className="text-left">
                <div className="text-[9px] uppercase tracking-wider text-[#757684] font-bold">GET IT ON</div>
                <div className="text-xs sm:text-sm font-bold leading-tight">Google Play</div>
              </div>
            </button>

            {/* App Store */}
            <button
              type="button"
              onClick={() => onNotifyInstall('App Store')}
              className="bg-white text-[#131b2e] px-4 py-2.5 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-[#eaedff] transition-all shadow-sm active:scale-98"
            >
              <span className="material-symbols-outlined text-3xl text-[#00288e]">phone_iphone</span>
              <div className="text-left">
                <div className="text-[9px] uppercase tracking-wider text-[#757684] font-bold">Download on</div>
                <div className="text-xs sm:text-sm font-bold leading-tight">App Store</div>
              </div>
            </button>
          </div>
        </div>

        {/* Mockup QR Box */}
        <div className="z-10 bg-white text-[#131b2e] p-5 rounded-2xl shadow-xl flex items-center gap-4 shrink-0 border border-[#c4c5d5]/20">
          <div className="w-24 h-24 bg-[#f2f3ff] rounded-xl p-2 flex items-center justify-center shrink-0 border border-[#c4c5d5]/30">
            {/* QR Code Vector */}
            <svg className="w-full h-full text-[#131b2e]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14-2h4v2h-4v-2zm-4 0h2v4h-2v-4zm2 4h2v4h-2v-4zm2 2h4v2h-4v-2zm0-4h2v2h-2v-2zm-6 2h2v2h-2v-2zm0 2h2v2h-2v-2z"></path>
            </svg>
          </div>
          <div>
            <span className="text-[11px] bg-[#ffdbce] text-[#a73a00] px-2 py-0.5 rounded-full font-bold">
              {isBn ? 'স্ক্যান করুন' : 'Scan QR'}
            </span>
            <h4 className="text-sm font-bold text-[#131b2e] mt-1">
              {isBn ? 'ক্যামেরা দিয়ে স্ক্যান করুন' : 'Scan with Camera'}
            </h4>
            <p className="text-xs text-[#757684]">
              {isBn ? 'সরাসরি অ্যাপ ইন্সটল লিংক' : 'Direct app download link'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
