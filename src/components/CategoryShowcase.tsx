import React from 'react';
import { categories } from '../data/mockData';

interface CategoryShowcaseProps {
  onSelectCategory: (categoryId: string) => void;
  selectedCategory: string;
  lang: 'bn' | 'en';
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  onSelectCategory,
  selectedCategory,
  lang,
}) => {
  const isBn = lang === 'bn';

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-5 md:py-6 w-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-[#131b2e]">
            {isBn ? 'জনপ্রিয় ক্যাটাগরি' : 'Popular Categories'}
          </h3>
          <p className="text-xs sm:text-sm text-[#444653] mt-0.5">
            {isBn ? 'পছন্দের পণ্যটি সহজে খুঁজে পেতে ব্রাউজ করুন' : 'Browse to easily discover your favourite products'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onSelectCategory('all')}
          className="text-xs sm:text-sm text-[#00288e] font-bold flex items-center gap-1 hover:underline cursor-pointer"
        >
          <span>{isBn ? 'সকল ক্যাটাগরি' : 'All Categories'}</span>
          <span className="material-symbols-outlined text-base">chevron_right</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`bg-white rounded-2xl p-3 flex flex-col items-center text-center shadow-xs border transition-all cursor-pointer group hover:shadow-md hover:-translate-y-1 ${
                isSelected
                  ? 'border-[#00288e] ring-2 ring-[#00288e]/20 bg-[#f2f3ff]'
                  : 'border-[#c4c5d5]/30 hover:border-[#00288e]/40'
              }`}
            >
              <div
                className={`w-20 h-20 rounded-full p-2 mb-2 overflow-hidden flex items-center justify-center transition-all ${
                  isSelected ? 'bg-[#dde1ff]' : 'bg-[#f2f3ff] group-hover:bg-[#dde1ff]'
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-16 h-16 object-contain rounded-full group-hover:scale-105 transition-transform"
                />
              </div>

              <span className="text-xs font-bold text-[#131b2e] group-hover:text-[#00288e] transition-colors line-clamp-1">
                {isBn ? cat.name : cat.nameEn}
              </span>
              <span className="text-[11px] text-[#757684] mt-0.5">
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
