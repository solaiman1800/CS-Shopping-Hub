import React, { useState } from 'react';
import { formatPrice, toBengaliNumber } from '../data/mockData';
import { CartItem, OrderInfo } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  isVoucherApplied: boolean;
  onOrderPlaced: (order: OrderInfo) => void;
  lang: 'bn' | 'en';
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  isVoucherApplied,
  onOrderPlaced,
  lang,
}) => {
  const isBn = lang === 'bn';

  const [customerName, setCustomerName] = useState('সোলাইমান আহমেদ');
  const [phone, setPhone] = useState('০১৭১২-৩৪৫৬৭৮');
  const [address, setAddress] = useState('বাড়ি ১২, রোড ৫, ধানমন্ডি, ঢাকা');
  const [city, setCity] = useState<'dhaka' | 'outside'>('dhaka');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad' | 'card'>('cod');
  const [placedOrder, setPlacedOrder] = useState<OrderInfo | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = isVoucherApplied ? Math.round(subtotal * 0.1) : 0;
  const deliveryFee = city === 'dhaka' ? 60 : 120;
  const grandTotal = subtotal - discount + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder: OrderInfo = {
      id: `SSBD-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName,
      phone,
      address,
      city,
      paymentMethod,
      items: [...cartItems],
      subtotal,
      discount,
      deliveryFee,
      total: grandTotal,
      status: 'confirmed',
      createdAt: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
    };
    setPlacedOrder(newOrder);
    onOrderPlaced(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-[#c4c5d5]/40 max-w-2xl w-full p-6 relative animate-in fade-in zoom-in-95 my-8">
        <button
          type="button"
          onClick={() => {
            setPlacedOrder(null);
            onClose();
          }}
          className="absolute top-4 right-4 text-[#757684] hover:text-[#131b2e] p-1.5 rounded-xl hover:bg-[#f2f3ff] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {placedOrder ? (
          /* Order Confirmed Screen */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#85f8c4]/40 text-[#00563a] flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl">check_circle</span>
            </div>
            <h3 className="text-2xl font-bold text-[#131b2e]">
              {isBn ? 'আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে!' : 'Order Placed Successfully!'}
            </h3>
            <p className="text-sm text-[#444653] mt-2">
              {isBn
                ? 'ধন্যবাদ! আমাদের কাস্টমার প্রতিনিধি শীঘ্রই ফোন করে অর্ডার নিশ্চিত করবেন।'
                : 'Thank you! Our representative will call you shortly to confirm the shipment.'}
            </p>

            <div className="bg-[#f2f3ff] p-4 rounded-xl my-6 max-w-md mx-auto text-left text-sm border border-[#c4c5d5]/30">
              <div className="flex justify-between py-1 border-b border-[#c4c5d5]/20">
                <span className="text-[#757684]">{isBn ? 'ট্র্যাকিং কোড:' : 'Tracking ID:'}</span>
                <span className="font-mono font-bold text-[#00288e]">{placedOrder.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#c4c5d5]/20">
                <span className="text-[#757684]">{isBn ? 'মোট পরিশোধযোগ্য:' : 'Total Payable:'}</span>
                <span className="font-bold text-[#a73a00]">{formatPrice(placedOrder.total, isBn)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#c4c5d5]/20">
                <span className="text-[#757684]">{isBn ? 'পেমেন্ট মাধ্যম:' : 'Payment Method:'}</span>
                <span className="font-semibold uppercase text-[#131b2e]">{placedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#757684]">{isBn ? 'ডেলিভারি ঠিকানা:' : 'Delivery Address:'}</span>
                <span className="font-medium text-[#131b2e] text-right truncate max-w-[200px]">{placedOrder.address}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setPlacedOrder(null);
                onClose();
              }}
              className="bg-[#00288e] text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-[#1e40af] transition-colors cursor-pointer"
            >
              {isBn ? 'শপিং চালিয়ে যান' : 'Continue Shopping'}
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-[#00288e] text-2xl">local_shipping</span>
              <h3 className="text-xl font-bold text-[#131b2e]">
                {isBn ? 'চেকআউট ও ডেলিভারি বিবরণী' : 'Checkout & Delivery Details'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#444653] mb-1">
                    {isBn ? 'আপনার নাম' : 'Full Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-[#f2f3ff] px-3.5 py-2.5 rounded-xl border border-[#c4c5d5]/40 text-sm focus:outline-none focus:border-[#00288e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#444653] mb-1">
                    {isBn ? 'মোবাইল নম্বর' : 'Phone Number'} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#f2f3ff] px-3.5 py-2.5 rounded-xl border border-[#c4c5d5]/40 text-sm focus:outline-none focus:border-[#00288e]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#444653] mb-1">
                  {isBn ? 'ডেলিভারি এরিয়া' : 'Delivery Area'} *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCity('dhaka')}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all ${
                      city === 'dhaka'
                        ? 'border-[#00288e] bg-[#eaedff] text-[#00288e] font-bold'
                        : 'border-[#c4c5d5]/40 bg-white text-[#444653]'
                    }`}
                  >
                    <span className="text-sm">{isBn ? 'ঢাকার ভেতরে' : 'Inside Dhaka'}</span>
                    <span className="text-xs font-bold text-[#fd651e]">৳৬০</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCity('outside')}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all ${
                      city === 'outside'
                        ? 'border-[#00288e] bg-[#eaedff] text-[#00288e] font-bold'
                        : 'border-[#c4c5d5]/40 bg-white text-[#444653]'
                    }`}
                  >
                    <span className="text-sm">{isBn ? 'ঢাকার বাইরে' : 'Outside Dhaka'}</span>
                    <span className="text-xs font-bold text-[#fd651e]">৳১২০</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#444653] mb-1">
                  {isBn ? 'সম্পূর্ণ ঠিকানা (রোড, বাড়ি, থানা, জেলা)' : 'Full Delivery Address'} *
                </label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#f2f3ff] px-3.5 py-2 rounded-xl border border-[#c4c5d5]/40 text-sm focus:outline-none focus:border-[#00288e]"
                />
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-semibold text-[#444653] mb-1.5">
                  {isBn ? 'পেমেন্ট মাধ্যম বেছে নিন' : 'Select Payment Method'} *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-[#00288e] bg-[#eaedff] text-[#00288e]'
                        : 'border-[#c4c5d5]/40 bg-white text-[#444653]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-xl">payments</span>
                    <span>{isBn ? 'ক্যাশ অন ডেলিভারি' : 'Cash on Delivery'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bkash')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'bkash'
                        ? 'border-[#E2136E] bg-[#E2136E]/10 text-[#E2136E]'
                        : 'border-[#c4c5d5]/40 bg-white text-[#444653]'
                    }`}
                  >
                    <span className="font-black text-base text-[#E2136E]">bKash</span>
                    <span>{isBn ? 'বিকাশ পেমেন্ট' : 'bKash Wallet'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('nagad')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'nagad'
                        ? 'border-[#F7941D] bg-[#F7941D]/10 text-[#F7941D]'
                        : 'border-[#c4c5d5]/40 bg-white text-[#444653]'
                    }`}
                  >
                    <span className="font-black text-base text-[#F7941D]">Nagad</span>
                    <span>{isBn ? 'নগদ পেমেন্ট' : 'Nagad Pay'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-[#00288e] bg-[#eaedff] text-[#00288e]'
                        : 'border-[#c4c5d5]/40 bg-white text-[#444653]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-xl">credit_card</span>
                    <span>{isBn ? 'কার্ড পেমেন্ট' : 'Debit/Credit'}</span>
                  </button>
                </div>
              </div>

              {/* Cost Summary */}
              <div className="bg-[#f2f3ff] p-3.5 rounded-xl text-xs space-y-1.5 border border-[#c4c5d5]/30">
                <div className="flex justify-between text-[#444653]">
                  <span>{isBn ? 'পণ্য মূল্য (সাবটোটাল):' : 'Item Subtotal:'}</span>
                  <span>{formatPrice(subtotal, isBn)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#00563a] font-semibold">
                    <span>{isBn ? 'কুপন ডিসকাউন্ট (১০%):' : 'Coupon Discount (10%):'}</span>
                    <span>-{formatPrice(discount, isBn)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#444653]">
                  <span>{isBn ? 'ডেলিভারি চার্জ:' : 'Delivery Fee:'}</span>
                  <span>{formatPrice(deliveryFee, isBn)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#a73a00] pt-1 border-t border-[#c4c5d5]/30">
                  <span>{isBn ? 'সর্বমোট পরিশোধযোগ্য:' : 'Total Payable:'}</span>
                  <span>{formatPrice(grandTotal, isBn)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full bg-[#fd651e] hover:bg-[#a73a00] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer active:scale-98"
              >
                <span>{isBn ? 'অর্ডার কনফার্ম করুন' : 'Confirm Order Now'}</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
