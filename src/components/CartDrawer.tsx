import React, { useState } from 'react';
import { formatPrice, toBengaliNumber } from '../data/mockData';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedCheckout: () => void;
  voucherCode: string;
  setVoucherCode: (code: string) => void;
  isVoucherApplied: boolean;
  onApplyVoucher: (code: string) => void;
  lang: 'bn' | 'en';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
  voucherCode,
  setVoucherCode,
  isVoucherApplied,
  onApplyVoucher,
  lang,
}) => {
  const isBn = lang === 'bn';
  const [couponInput, setCouponInput] = useState(voucherCode || '');

  if (!isOpen) return null;

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = isVoucherApplied ? Math.round(subtotal * 0.1) : 0;
  const finalTotal = Math.max(0, subtotal - discount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyVoucher(couponInput);
  };

  return (
    <div
      id="cart-drawer"
      className="fixed right-4 sm:right-6 bottom-4 sm:bottom-6 z-50 bg-white rounded-2xl shadow-2xl border border-[#c4c5d5]/40 p-4 w-[380px] max-w-[calc(100vw-2rem)] transition-all animate-in fade-in slide-in-from-bottom-3"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#c4c5d5]/20">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#fd651e] text-2xl">shopping_bag</span>
          <span className="text-base font-bold text-[#131b2e]">
            {isBn
              ? `কার্ট সারাংশ (${toBengaliNumber(totalCount)}টি আইটেম)`
              : `Cart Summary (${totalCount} items)`}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-[#757684] hover:text-[#131b2e] p-1 rounded-lg hover:bg-[#f2f3ff] transition-colors cursor-pointer"
          title={isBn ? "বন্ধ করুন" : "Close"}
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>

      {/* Mini Cart Items List */}
      <div className="space-y-2.5 py-3 max-h-56 overflow-y-auto pr-1">
        {cartItems.length === 0 ? (
          <div className="text-center py-6 text-sm text-[#757684]">
            <span className="material-symbols-outlined text-4xl text-[#c4c5d5] mb-2">shopping_basket</span>
            <p>{isBn ? 'আপনার কার্ট এখন খালি' : 'Your cart is currently empty'}</p>
          </div>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center justify-between gap-3 bg-[#f2f3ff] p-2.5 rounded-xl border border-[#c4c5d5]/20 group"
            >
              <div className="w-12 h-12 rounded-lg bg-white p-1 overflow-hidden shrink-0 border border-[#c4c5d5]/20">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h6 className="text-xs font-bold text-[#131b2e] truncate">
                  {isBn ? item.product.name : item.product.nameEn}
                </h6>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] text-[#757684]">
                    {isBn ? toBengaliNumber(item.quantity) : item.quantity} x {formatPrice(item.product.price, isBn)}
                  </span>
                  {item.selectedColor && (
                    <span className="text-[10px] bg-white text-[#444653] px-1.5 py-0.2 rounded border border-[#c4c5d5]/30">
                      {item.selectedColor}
                    </span>
                  )}
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center bg-white rounded-md border border-[#c4c5d5]/40 text-xs">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                      className="px-2 py-0.5 hover:bg-[#eaedff] text-[#444653] transition-colors"
                    >
                      -
                    </button>
                    <span className="px-2 font-bold text-[#131b2e]">
                      {isBn ? toBengaliNumber(item.quantity) : item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                      className="px-2 py-0.5 hover:bg-[#eaedff] text-[#444653] transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-[11px] text-[#ba1a1a] hover:underline"
                  >
                    {isBn ? 'মুছুন' : 'Remove'}
                  </button>
                </div>
              </div>

              <span className="text-xs sm:text-sm font-bold text-[#a73a00] shrink-0">
                {formatPrice(item.product.price * item.quantity, isBn)}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Coupon form */}
      {cartItems.length > 0 && (
        <form onSubmit={handleApplyCoupon} className="pt-2 border-t border-[#c4c5d5]/20 flex gap-2">
          <input
            type="text"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
            placeholder={isBn ? "কুপন কোড (যেমন SMART2025)" : "Coupon Code"}
            className="flex-1 bg-[#f2f3ff] px-2.5 py-1 text-xs rounded-lg border border-[#c4c5d5]/40 focus:outline-none uppercase font-semibold text-[#131b2e]"
          />
          <button
            type="submit"
            className="bg-[#00288e] text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-[#1e40af] transition-colors shrink-0"
          >
            {isBn ? 'প্রয়োগ' : 'Apply'}
          </button>
        </form>
      )}

      {isVoucherApplied && (
        <div className="mt-2 text-[11px] text-[#00563a] bg-[#85f8c4]/30 px-2 py-1 rounded-md flex items-center justify-between">
          <span>🎉 {isBn ? 'SMART2025 কুপনে ১০% ছাড় প্রযোজ্য!' : '10% discount applied!'}</span>
          <span className="font-bold">-{formatPrice(discount, isBn)}</span>
        </div>
      )}

      {/* Subtotal & Checkout */}
      <div className="pt-3 mt-2 flex items-center justify-between border-t border-[#c4c5d5]/20">
        <span className="text-sm font-semibold text-[#444653]">
          {isBn ? 'সর্বমোট মূল্য:' : 'Subtotal:'}
        </span>
        <span className="text-base sm:text-lg font-bold text-[#a73a00]">
          {formatPrice(finalTotal, isBn)}
        </span>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          disabled={cartItems.length === 0}
          onClick={onProceedCheckout}
          className="w-full bg-[#fd651e] hover:bg-[#a73a00] disabled:bg-[#c4c5d5] text-white py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer active:scale-98"
        >
          <span>{isBn ? 'চেকআউট করুন' : 'Proceed to Checkout'}</span>
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
