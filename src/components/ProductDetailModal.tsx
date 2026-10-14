import React, { useState } from 'react';
import { formatPrice, toBengaliNumber } from '../data/mockData';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, selectedColor?: string) => void;
  onBuyNow: (product: Product, quantity: number, selectedColor?: string) => void;
  lang: 'bn' | 'en';
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  lang,
}) => {
  const isBn = lang === 'bn';
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors?.[0] || '');

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-[#c4c5d5]/40 max-w-3xl w-full p-5 sm:p-7 relative animate-in fade-in zoom-in-95 my-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#757684] hover:text-[#131b2e] p-1.5 rounded-xl hover:bg-[#f2f3ff] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Image */}
          <div className="bg-[#f2f3ff] rounded-2xl p-4 flex items-center justify-center border border-[#c4c5d5]/30">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-72 w-auto object-contain rounded-xl"
            />
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#00288e] uppercase tracking-wider">
                {product.brand}
              </span>
              <span className="text-xs text-[#00563a] bg-[#85f8c4]/30 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">verified</span>
                {isBn ? '১০০% আসল' : '100% Genuine'}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-[#131b2e] mt-2 leading-snug">
              {isBn ? product.name : product.nameEn}
            </h3>

            {/* Ratings */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-base fill-1">
                    star
                  </span>
                ))}
              </div>
              <span className="text-xs font-semibold text-[#444653]">
                {isBn ? toBengaliNumber(product.rating) : product.rating} ({isBn ? toBengaliNumber(product.reviewsCount) : product.reviewsCount} {isBn ? 'রিভিউ' : 'reviews'})
              </span>
            </div>

            {/* Pricing */}
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-2xl font-extrabold text-[#a73a00]">
                {formatPrice(product.price, isBn)}
              </span>
              <span className="text-sm text-[#757684] line-through">
                {formatPrice(product.originalPrice, isBn)}
              </span>
              <span className="text-xs bg-[#fd651e] text-white px-2 py-0.5 rounded-full font-bold">
                -{isBn ? toBengaliNumber(product.discountPercent) : product.discountPercent}% {isBn ? 'ছাড়' : 'Off'}
              </span>
            </div>

            <p className="text-xs text-[#444653] mt-3 leading-relaxed">
              {product.description}
            </p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-3">
                <span className="text-xs font-semibold text-[#131b2e] block mb-1">
                  {isBn ? 'কালার / ভ্যারিয়েন্ট:' : 'Color / Variant:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`px-2.5 py-1 text-xs rounded-lg border transition-all cursor-pointer ${
                        selectedColor === color
                          ? 'border-[#00288e] bg-[#eaedff] text-[#00288e] font-bold'
                          : 'border-[#c4c5d5]/40 text-[#444653] hover:border-[#00288e]'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Specs Bullet points */}
            <div className="mt-3 bg-[#f2f3ff] p-3 rounded-xl border border-[#c4c5d5]/30">
              <span className="text-xs font-bold text-[#131b2e] block mb-1">
                {isBn ? 'প্রধান স্পেসিফিকেশন:' : 'Key Specifications:'}
              </span>
              <ul className="text-[11px] text-[#444653] space-y-1 list-disc list-inside">
                {product.specs.slice(0, 3).map((spec, i) => (
                  <li key={i}>{spec}</li>
                ))}
              </ul>
            </div>

            {/* Quantity Selector & CTAs */}
            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center bg-[#f2f3ff] rounded-xl border border-[#c4c5d5]/40">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 hover:bg-[#eaedff] text-sm font-bold text-[#444653]"
                >
                  -
                </button>
                <span className="px-3 text-sm font-bold text-[#131b2e]">
                  {isBn ? toBengaliNumber(quantity) : quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 hover:bg-[#eaedff] text-sm font-bold text-[#444653]"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  onAddToCart(product, quantity, selectedColor);
                  onClose();
                }}
                className="flex-1 bg-[#eaedff] hover:bg-[#00288e] text-[#00288e] hover:text-white py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-base">shopping_bag</span>
                <span>{isBn ? 'কার্টে যোগ করুন' : 'Add to Cart'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onBuyNow(product, quantity, selectedColor);
                  onClose();
                }}
                className="flex-1 bg-[#fd651e] hover:bg-[#a73a00] text-white py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>{isBn ? 'এখনই কিনুন' : 'Buy Now'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
