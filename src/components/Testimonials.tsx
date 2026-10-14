import React from 'react';
import { testimonials } from '../data/mockData';

interface TestimonialsProps {
  lang: 'bn' | 'en';
}

export const Testimonials: React.FC<TestimonialsProps> = ({ lang }) => {
  const isBn = lang === 'bn';

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-8 w-full">
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="bg-[#eaedff] text-[#00288e] font-bold px-3 py-1 rounded-full text-xs">
          {isBn ? 'সন্তুষ্ট গ্রাহকের কথা' : 'Customer Reviews'}
        </span>
        <h3 className="text-xl md:text-2xl font-bold text-[#131b2e] mt-2">
          {isBn ? 'বিশ্বস্ততার প্রমাণ আমাদের কাস্টমারদের রিভিউ' : 'Trusted by Thousands of Happy Customers'}
        </h3>
        <p className="text-xs sm:text-sm text-[#444653] mt-1">
          {isBn
            ? 'সারা বাংলাদেশের হাজারো ক্রেতা স্মার্টশপ বিডি বেছে নিয়েছেন নিশ্চিন্ত শপিংয়ের জন্য'
            : 'Thousands of shoppers across Bangladesh rely on SmartShop BD for authentic products.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white p-6 rounded-2xl shadow-xs border border-[#c4c5d5]/30 flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex text-amber-500 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-lg fill-1">
                    star
                  </span>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-[#444653] leading-relaxed">
                {t.quote}
              </p>
            </div>

            <div className="flex items-center gap-3 mt-6 pt-4 bg-[#f2f3ff]/60 -mx-6 -mb-6 px-6 py-4 rounded-b-2xl border-t border-[#c4c5d5]/20">
              <div className="w-10 h-10 rounded-full bg-[#dde1ff] text-[#00288e] flex items-center justify-center font-bold text-sm">
                {t.initials}
              </div>
              <div>
                <div className="text-sm font-bold text-[#131b2e] flex items-center gap-1">
                  <span>{t.author}</span>
                  <span className="material-symbols-outlined text-[#00563a] text-base" title="Verified Customer">
                    check_circle
                  </span>
                </div>
                <div className="text-xs text-[#757684]">{t.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
