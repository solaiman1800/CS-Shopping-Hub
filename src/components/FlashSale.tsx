import React, { useEffect, useState } from 'react';
import { formatPrice, toBengaliNumber } from '../data/mockData';
import { Product } from '../types';

interface FlashSaleProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  lang: 'bn' | 'en';
}

export const FlashSale: React.FC<FlashSaleProps> = ({
  products,
  onAddToCart,
  onQuickView,
  lang,
}) => {
  const isBn = lang === 'bn';
  const [seconds, setSeconds] = useState(42);
  const [minutes, setMinutes] = useState(22);
  const [hours, setHours] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev > 0) return prev - 1;
        setMinutes((m) => {
          if (m > 0) return m - 1;
          setHours((h) => (h > 0 ? h - 1 : 12));
          return 59;
        });
        return 59;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDigit = (num: number) => {
    const s = num < 10 ? `0${num}` : `${num}`;
    return isBn ? toBengaliNumber(s) : s;
  };

  return (
    <section id="flash-sale-section" className="max-w-7xl mx-auto px-4 lg:px-8 py-6 md:py-8 w-full">
      <div className="bg-white rounded-2xl shadow-xs border border-[#c4c5d5]/30 p-5 md:p-6">
        {/* Flash Sale Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 gap-4 border-b border-[#c4c5d5]/20">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#fd651e] text-2xl animate-bounce">bolt</span>
              <span className="text-xl md:text-2xl font-bold text-[#131b2e]">
                {isBn ? 'ফ্ল্যাশ সেল' : 'Flash Sale'}
              </span>
            </div>
            <span className="hidden sm:inline text-[#c4c5d5] font-bold">|</span>
            <div className="flex items-center gap-1.5 text-[#444653] text-sm">
              <span>{isBn ? 'শেষ হতে বাকি:' : 'Ending In:'}</span>
              <div className="flex items-center gap-1 font-mono font-bold text-[#a73a00] text-sm">
                <span className="bg-[#ffdbce] text-[#a73a00] px-2 py-0.5 rounded-md">
                  {formatDigit(hours)}
                </span>
                <span>:</span>
                <span className="bg-[#ffdbce] text-[#a73a00] px-2 py-0.5 rounded-md">
                  {formatDigit(minutes)}
                </span>
                <span>:</span>
                <span className="bg-[#ffdbce] text-[#a73a00] px-2 py-0.5 rounded-md">
                  {formatDigit(seconds)}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('featured-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-sm text-[#fd651e] hover:text-[#a73a00] font-bold flex items-center gap-1 group cursor-pointer transition-colors"
          >
            <span>{isBn ? 'সবগুলো ডিল দেখুন' : 'View All Deals'}</span>
            <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>

        {/* 5 Flash Deal Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 mt-6">
          {products.map((product) => {
            const soldRate = product.soldPercent || 70;
            const isCritical = soldRate >= 85;
            const progressColor = isCritical ? 'bg-[#ba1a1a]' : soldRate > 60 ? 'bg-[#fd651e]' : 'bg-[#00563a]';
            const statusTextColor = isCritical ? 'text-[#ba1a1a]' : soldRate > 60 ? 'text-[#fd651e]' : 'text-[#00563a]';

            return (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-[#c4c5d5]/30 hover:border-[#00288e]/40 shadow-xs hover:shadow-md transition-all p-3 flex flex-col justify-between group relative"
              >
                {/* Image and Badges */}
                <div 
                  onClick={() => onQuickView(product)}
                  className="relative w-full aspect-square bg-[#f2f3ff] rounded-lg overflow-hidden mb-3 cursor-pointer"
                >
                  <span className="absolute top-2 left-2 z-10 bg-[#fd651e] text-white text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-bold shadow-xs">
                    -{isBn ? toBengaliNumber(product.discountPercent) : product.discountPercent}%
                  </span>
                  {product.badge && (
                    <span className="absolute top-2 right-2 z-10 bg-[#00288e]/85 backdrop-blur text-white text-[10px] px-1.5 py-0.5 rounded font-semibold">
                      {product.badge}
                    </span>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Details */}
                <div>
                  <div className="text-[11px] text-[#757684] uppercase font-semibold tracking-wide">
                    {product.brand}
                  </div>
                  <h5
                    onClick={() => onQuickView(product)}
                    className="text-xs sm:text-sm font-bold text-[#131b2e] line-clamp-2 mt-0.5 group-hover:text-[#00288e] transition-colors cursor-pointer"
                  >
                    {isBn ? product.name : product.nameEn}
                  </h5>

                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-sm sm:text-base font-bold text-[#a73a00]">
                      {formatPrice(product.price, isBn)}
                    </span>
                    <span className="text-xs text-[#757684] line-through">
                      {formatPrice(product.originalPrice, isBn)}
                    </span>
                  </div>

                  {/* Stock Progress Bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-[11px] text-[#444653] font-semibold mb-1">
                      <span>
                        {isBn ? `বিক্রিত: ${toBengaliNumber(soldRate)}%` : `Sold: ${soldRate}%`}
                      </span>
                      <span className={`${statusTextColor} font-bold`}>
                        {isBn ? product.stockStatusText : product.stockTextEn}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#eaedff] rounded-full overflow-hidden">
                      <div
                        className={`${progressColor} h-full rounded-full transition-all duration-500`}
                        style={{ width: `${soldRate}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  type="button"
                  onClick={() => onAddToCart(product)}
                  className="mt-3.5 w-full bg-[#fd651e] hover:bg-[#a73a00] text-white py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-xs active:scale-98"
                >
                  <span className="material-symbols-outlined text-base">shopping_cart</span>
                  <span>{isBn ? 'অর্ডার করুন' : 'Order Now'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
