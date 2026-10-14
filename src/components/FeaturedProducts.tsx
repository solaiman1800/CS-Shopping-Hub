import React, { useState } from 'react';
import { formatPrice, toBengaliNumber } from '../data/mockData';
import { Product } from '../types';

interface FeaturedProductsProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  selectedCategory: string;
  lang: 'bn' | 'en';
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
  selectedCategory,
  lang,
}) => {
  const isBn = lang === 'bn';
  const [activeTab, setActiveTab] = useState<'all' | 'trending' | 'best_seller' | 'new'>('all');
  const [showAllItems, setShowAllItems] = useState(false);

  // Filter based on tab and selected category
  const categoryFiltered = selectedCategory === 'all'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  let displayedList = categoryFiltered;
  if (activeTab === 'trending') {
    displayedList = categoryFiltered.filter((p) => p.rating >= 4.8);
  } else if (activeTab === 'best_seller') {
    displayedList = categoryFiltered.filter((p) => (p.soldPercent || 0) > 70 || p.reviewsCount > 100);
  } else if (activeTab === 'new') {
    displayedList = categoryFiltered.filter((p) => p.badge?.includes('নতুন') || p.discountPercent > 20);
  }

  // If there are few items after filter, fallback to all categoryFiltered
  if (displayedList.length === 0) {
    displayedList = categoryFiltered;
  }

  const visibleProducts = showAllItems ? displayedList : displayedList.slice(0, 4);

  return (
    <section id="featured-section" className="max-w-7xl mx-auto px-4 lg:px-8 py-6 md:py-8 w-full">
      {/* Header and Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-4 border-b border-[#c4c5d5]/20">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-[#131b2e]">
            {isBn ? 'জনপ্রিয় ও নির্বাচিত পণ্যসমূহ' : 'Popular & Featured Products'}
          </h3>
          <p className="text-xs sm:text-sm text-[#444653] mt-0.5">
            {isBn ? 'সেরা রেটিং ও গ্রাহকদের সবচেয়ে বিশ্বস্ত পণ্য কালেকশন' : 'Top rated and most trusted customer collections'}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 bg-[#f2f3ff] p-1 rounded-xl overflow-x-auto whitespace-nowrap border border-[#c4c5d5]/30">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-white text-[#00288e] shadow-xs font-bold'
                : 'text-[#444653] hover:text-[#00288e]'
            }`}
          >
            {isBn ? 'সব পণ্য' : 'All Products'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('trending')}
            className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'trending'
                ? 'bg-white text-[#00288e] shadow-xs font-bold'
                : 'text-[#444653] hover:text-[#00288e]'
            }`}
          >
            {isBn ? 'ট্রেন্ডিং' : 'Trending'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('best_seller')}
            className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'best_seller'
                ? 'bg-white text-[#00288e] shadow-xs font-bold'
                : 'text-[#444653] hover:text-[#00288e]'
            }`}
          >
            {isBn ? 'বেস্ট সেলার' : 'Best Seller'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('new')}
            className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'new'
                ? 'bg-white text-[#00288e] shadow-xs font-bold'
                : 'text-[#444653] hover:text-[#00288e]'
            }`}
          >
            {isBn ? 'নতুন কালেকশন' : 'New Collection'}
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
        {visibleProducts.map((product) => {
          const isWishlisted = wishlistIds.includes(product.id);

          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-[#c4c5d5]/30 hover:border-[#00288e]/40 shadow-xs hover:shadow-md transition-all p-3.5 sm:p-4 flex flex-col justify-between group"
            >
              <div>
                {/* Thumbnail & Badges */}
                <div 
                  onClick={() => onQuickView(product)}
                  className="relative w-full aspect-square bg-[#f2f3ff] rounded-xl overflow-hidden mb-3 cursor-pointer"
                >
                  <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
                    {product.discountPercent > 0 && (
                      <span className="bg-[#fd651e] text-white text-[10px] sm:text-xs px-2 py-0.5 rounded-md font-bold shadow-xs">
                        -{isBn ? toBengaliNumber(product.discountPercent) : product.discountPercent}%
                      </span>
                    )}
                    {product.badge && (
                      <span className="bg-[#00563a] text-white text-[10px] px-2 py-0.5 rounded-md font-bold shadow-xs">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full backdrop-blur flex items-center justify-center transition-all shadow-xs cursor-pointer ${
                      isWishlisted
                        ? 'bg-white text-[#ba1a1a] ring-2 ring-[#ba1a1a]/30'
                        : 'bg-white/80 hover:bg-white text-[#757684] hover:text-[#ba1a1a]'
                    }`}
                    title={isWishlisted ? "পছন্দ থেকে মুছুন" : "পছন্দে যোগ করুন"}
                  >
                    <span className={`material-symbols-outlined text-lg ${isWishlisted ? 'fill-1' : ''}`}>
                      favorite
                    </span>
                  </button>

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Metadata */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#00288e] font-bold uppercase tracking-wider">
                    {product.brand}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#00563a] bg-[#eaedff] px-2 py-0.5 rounded-full font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00563a]"></span>
                    <span>{isBn ? product.stockStatusText : product.stockTextEn}</span>
                  </span>
                </div>

                {/* Title */}
                <h4
                  onClick={() => onQuickView(product)}
                  className="text-xs sm:text-sm font-bold text-[#131b2e] line-clamp-2 mt-1.5 group-hover:text-[#00288e] transition-colors cursor-pointer"
                >
                  {isBn ? product.name : product.nameEn}
                </h4>

                {/* Star Ratings */}
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="flex text-amber-500">
                    <span className="material-symbols-outlined text-base fill-1">star</span>
                    <span className="material-symbols-outlined text-base fill-1">star</span>
                    <span className="material-symbols-outlined text-base fill-1">star</span>
                    <span className="material-symbols-outlined text-base fill-1">star</span>
                    <span className="material-symbols-outlined text-base fill-1">star_half</span>
                  </div>
                  <span className="text-[11px] text-[#444653] font-semibold">
                    {isBn ? toBengaliNumber(product.rating) : product.rating} ({isBn ? toBengaliNumber(product.reviewsCount) : product.reviewsCount} {isBn ? 'রিভিউ' : 'reviews'})
                  </span>
                </div>

                {/* Price */}
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-sm sm:text-base font-bold text-[#a73a00]">
                    {formatPrice(product.price, isBn)}
                  </span>
                  <span className="text-xs text-[#757684] line-through">
                    {formatPrice(product.originalPrice, isBn)}
                  </span>
                </div>
              </div>

              {/* Add to Cart CTA */}
              <button
                type="button"
                onClick={() => onAddToCart(product)}
                className="mt-4 w-full bg-[#eaedff] hover:bg-[#00288e] text-[#00288e] hover:text-white py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-98"
              >
                <span className="material-symbols-outlined text-base sm:text-lg">shopping_bag</span>
                <span>{isBn ? 'কার্টে যোগ করুন' : 'Add to Cart'}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* More Products Button */}
      {displayedList.length > 4 && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAllItems(!showAllItems)}
            className="bg-white hover:bg-[#f2f3ff] text-[#00288e] font-bold px-8 py-3 rounded-xl text-sm shadow-xs border border-[#c4c5d5]/30 flex items-center gap-2 transition-colors cursor-pointer hover:shadow-md"
          >
            <span>
              {showAllItems
                ? (isBn ? 'কম পণ্য দেখুন' : 'Show Less')
                : (isBn ? 'আরও পণ্য লোড করুন' : 'Load More Products')}
            </span>
            <span className={`material-symbols-outlined text-lg transition-transform ${showAllItems ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </button>
        </div>
      )}
    </section>
  );
};
