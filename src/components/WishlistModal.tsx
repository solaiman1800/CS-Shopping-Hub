import React from 'react';
import { formatPrice } from '../data/mockData';
import { Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  lang: 'bn' | 'en';
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveWishlist,
  onAddToCart,
  lang,
}) => {
  const isBn = lang === 'bn';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-[#c4c5d5]/40 max-w-lg w-full p-6 relative animate-in fade-in zoom-in-95 my-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#757684] hover:text-[#131b2e] p-1.5 rounded-xl hover:bg-[#f2f3ff] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-[#00288e] text-2xl">favorite</span>
          <h3 className="text-xl font-bold text-[#131b2e]">
            {isBn ? `পছন্দের তালিকা (${wishlistProducts.length})` : `Wishlist (${wishlistProducts.length})`}
          </h3>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-8 text-[#757684]">
            <span className="material-symbols-outlined text-4xl text-[#c4c5d5] mb-2">favorite_border</span>
            <p className="text-sm">{isBn ? 'আপনার পছন্দের তালিকা খালি রয়েছে' : 'Your wishlist is empty'}</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between gap-3 bg-[#f2f3ff] p-3 rounded-xl border border-[#c4c5d5]/20"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-14 h-14 object-cover rounded-lg bg-white p-1 border border-[#c4c5d5]/20 shrink-0"
                />

                <div className="min-w-0 flex-1">
                  <h5 className="text-xs font-bold text-[#131b2e] truncate">
                    {isBn ? product.name : product.nameEn}
                  </h5>
                  <div className="text-xs font-bold text-[#a73a00] mt-1">
                    {formatPrice(product.price, isBn)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart(product);
                      onRemoveWishlist(product.id);
                    }}
                    className="bg-[#00288e] hover:bg-[#1e40af] text-white p-2 rounded-lg text-xs font-bold transition-colors shadow-xs flex items-center justify-center cursor-pointer"
                    title={isBn ? "কার্টে যোগ করুন" : "Add to Cart"}
                  >
                    <span className="material-symbols-outlined text-base">shopping_cart</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemoveWishlist(product.id)}
                    className="text-[#ba1a1a] p-1.5 hover:bg-[#ffdad6] rounded-lg transition-colors cursor-pointer"
                    title={isBn ? "মুছে ফেলুন" : "Remove"}
                  >
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
