import React from 'react';

interface CashbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'bn' | 'en';
}

export const CashbackModal: React.FC<CashbackModalProps> = ({ isOpen, onClose, lang }) => {
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
          <span className="material-symbols-outlined text-[#a73a00] text-2xl">account_balance_wallet</span>
          <h3 className="text-xl font-bold text-[#131b2e]">
            {isBn ? 'বিকাশ ও নগদ ২০% ক্যাশব্যাক অফার' : 'bKash & Nagad 20% Cashback Offer'}
          </h3>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#444653]">
          <div className="flex items-center gap-3 p-3 bg-[#f2f3ff] rounded-xl border border-[#c4c5d5]/30">
            <span className="bg-white px-2 py-1 rounded text-[#E2136E] font-black text-sm shadow-xs border border-[#c4c5d5]/20">
              bKash
            </span>
            <span className="bg-white px-2 py-1 rounded text-[#F7941D] font-black text-sm shadow-xs border border-[#c4c5d5]/20">
              Nagad
            </span>
            <span className="font-bold text-[#a73a00]">
              {isBn ? 'সর্বোচ্চ ৫০০৳ পর্যন্ত তাৎক্ষণিক ক্যাশব্যাক!' : 'Instant cashback up to ৳500!'}
            </span>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-[#131b2e]">
              {isBn ? 'অফারের শর্তাবলী ও নিয়মাবলী:' : 'Terms & Conditions:'}
            </h5>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-[#444653]">
              <li>{isBn ? 'যেকোনো প্রিপেইড অর্ডারে বিকাশ বা নগদ পেমেন্ট গেটওয়ে নির্বাচন করুন।' : 'Select bKash or Nagad payment gateway at checkout.'}</li>
              <li>{isBn ? 'ন্যূনতম ১,০০০ টাকার অর্ডারে ২০% (সর্বোচ্চ ৫০০ টাকা) ক্যাশব্যাক স্বয়ংক্রিয়ভাবে ওয়ালেটে যুক্ত হবে।' : 'Minimum order ৳1,000 to get 20% cashback (up to ৳500).'}</li>
              <li>{isBn ? 'ক্যাম্পেইন চলাকালীন একজন গ্রাহক সর্বোচ্চ ২ বার ক্যাশব্যাক উপভোগ করতে পারবেন।' : 'Offer valid twice per customer during promotional period.'}</li>
              <li>{isBn ? 'কুপন কোড SMART2025 এর সাথেও ক্যাশব্যাক অফার প্রযোজ্য!' : 'Cashback stacks with SMART2025 discount voucher!'}</li>
            </ul>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full bg-[#fd651e] hover:bg-[#a73a00] text-white py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors cursor-pointer mt-2"
          >
            {isBn ? 'বুঝেছি, শপিং শুরু করুন' : 'Got it, Start Shopping'}
          </button>
        </div>
      </div>
    </div>
  );
};
