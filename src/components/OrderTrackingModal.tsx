import React, { useState } from 'react';
import { formatPrice } from '../data/mockData';
import { OrderInfo } from '../types';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentOrder: OrderInfo | null;
  lang: 'bn' | 'en';
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  recentOrder,
  lang,
}) => {
  const isBn = lang === 'bn';
  const [trackingInput, setTrackingInput] = useState(recentOrder?.id || 'SSBD-249018');
  const [searched, setSearched] = useState(true);

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
          <span className="material-symbols-outlined text-[#00288e] text-2xl">local_shipping</span>
          <h3 className="text-xl font-bold text-[#131b2e]">
            {isBn ? 'অর্ডার ট্র্যাকিং সার্ভিস' : 'Order Tracking Service'}
          </h3>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearched(true);
          }}
          className="flex gap-2 mb-6"
        >
          <input
            type="text"
            value={trackingInput}
            onChange={(e) => setTrackingInput(e.target.value.toUpperCase())}
            placeholder={isBn ? "আপনার অর্ডার আইডি লিখুন (যেমন: SSBD-249018)" : "Enter Order ID"}
            className="flex-1 bg-[#f2f3ff] px-3.5 py-2 rounded-xl border border-[#c4c5d5]/40 text-sm focus:outline-none focus:border-[#00288e] font-mono uppercase"
          />
          <button
            type="submit"
            className="bg-[#00288e] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#1e40af] transition-colors cursor-pointer"
          >
            {isBn ? 'খুঁজুন' : 'Track'}
          </button>
        </form>

        {searched && (
          <div className="space-y-4">
            <div className="bg-[#f2f3ff] p-3.5 rounded-xl text-xs flex items-center justify-between border border-[#c4c5d5]/20">
              <div>
                <span className="text-[#757684] block">{isBn ? 'অর্ডার ট্র্যাকিং আইডি:' : 'Tracking ID:'}</span>
                <span className="font-mono font-bold text-[#00288e] text-sm">{trackingInput}</span>
              </div>
              <div className="text-right">
                <span className="text-[#757684] block">{isBn ? 'কুরিয়ার পার্টনার:' : 'Courier Partner:'}</span>
                <span className="font-bold text-[#fd651e]">Steadfast Express</span>
              </div>
            </div>

            {/* Stepper timeline */}
            <div className="py-2 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#85f8c4] text-[#003d28] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-base">check</span>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#131b2e]">
                    {isBn ? 'অর্ডার গ্রহণ ও নিশ্চিতকরণ' : 'Order Placed & Confirmed'}
                  </h5>
                  <p className="text-[11px] text-[#757684]">
                    {isBn ? 'অর্ডার যাচাই সম্পন্ন হয়েছে' : 'Order verification completed'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#dde1ff] text-[#00288e] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-base">inventory</span>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#00288e]">
                    {isBn ? 'ওয়্যারহাউসে প্যাকেজিং ও কোয়ালিটি চেক' : 'Packaging & Quality Check'}
                  </h5>
                  <p className="text-[11px] text-[#757684]">
                    {isBn ? 'পণ্যের অফিসিয়াল ওয়ারেন্টি কার্ড যুক্ত করা হচ্ছে' : 'Attaching official warranty card'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 opacity-60">
                <div className="w-8 h-8 rounded-full bg-[#eaedff] text-[#757684] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-base">local_shipping</span>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#131b2e]">
                    {isBn ? 'ডেলিভারি রাইডারের কাছে হস্তান্তর' : 'Dispatched to Delivery Rider'}
                  </h5>
                  <p className="text-[11px] text-[#757684]">
                    {isBn ? 'খুব শীঘ্রই গন্তব্যে পৌঁছাবে' : 'Out for delivery soon'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 opacity-60">
                <div className="w-8 h-8 rounded-full bg-[#eaedff] text-[#757684] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-base">home</span>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#131b2e]">
                    {isBn ? 'সফল হোম ডেলিভারি' : 'Delivered to Customer'}
                  </h5>
                  <p className="text-[11px] text-[#757684]">
                    {isBn ? 'পণ্য দেখে পেমেন্ট সম্পন্ন' : 'Customer inspection & delivery complete'}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={onClose}
                className="w-full bg-[#eaedff] hover:bg-[#dde1ff] text-[#00288e] py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer"
              >
                {isBn ? 'ঠিক আছে' : 'Close'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
