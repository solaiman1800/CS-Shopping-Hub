import React, { useState } from 'react';
import { formatPrice } from '../data/mockData';

interface ExchangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'bn' | 'en';
}

export const ExchangeModal: React.FC<ExchangeModalProps> = ({ isOpen, onClose, lang }) => {
  const isBn = lang === 'bn';
  const [phoneBrand, setPhoneBrand] = useState('Xiaomi');
  const [condition, setCondition] = useState('good');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const estimatedBonus = condition === 'flawless' ? 3000 : condition === 'good' ? 2200 : 1500;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-[#c4c5d5]/40 max-w-lg w-full p-6 relative animate-in fade-in zoom-in-95 my-8">
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            onClose();
          }}
          className="absolute top-4 right-4 text-[#757684] hover:text-[#131b2e] p-1.5 rounded-xl hover:bg-[#f2f3ff] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-[#fd651e] text-2xl">electric_bolt</span>
          <h3 className="text-xl font-bold text-[#131b2e]">
            {isBn ? 'স্মার্টফোন এক্সচেঞ্জ উৎসব ২০২৫' : 'Smartphone Exchange Fest 2025'}
          </h3>
        </div>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#85f8c4]/40 text-[#00563a] flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-3xl">done_all</span>
            </div>
            <h4 className="text-lg font-bold text-[#131b2e]">
              {isBn ? 'আপনার এক্সচেঞ্জ রিকোয়েস্ট গৃহীত হয়েছে!' : 'Exchange Request Submitted!'}
            </h4>
            <p className="text-xs text-[#444653] mt-2">
              {isBn
                ? 'আমাদের টেকনিক্যাল এক্সপার্ট ২৪ ঘণ্টার মধ্যে কল করে ডিভাইস ভ্যালুয়েশন নিশ্চিত করবেন।'
                : 'Our exchange specialist will contact you within 24 hours to finalize device appraisal.'}
            </p>
            <div className="bg-[#f2f3ff] p-3 rounded-xl my-4 text-xs">
              <span className="text-[#757684] block">{isBn ? 'আনুমানিক এক্সচেঞ্জ বোনাস:' : 'Estimated Bonus:'}</span>
              <strong className="text-base text-[#00288e]">{formatPrice(estimatedBonus, isBn)}</strong>
            </div>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="bg-[#00288e] text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-[#1e40af]"
            >
              {isBn ? 'ঠিক আছে' : 'Close'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-[#444653] leading-relaxed">
              {isBn
                ? 'আপনার যেকোনো সচল স্মার্টফোন বদলে নতুন যেকোনো ফ্ল্যাগশিপ স্মার্টফোনে পান অতিরিক্ত সর্বোচ্চ ৩,০০০ টাকা পর্যন্ত ক্যাশ বোনাস ও হোম পিকআপ সুবিধা!'
                : 'Trade in your used smartphone for any new flagship model with up to ৳3,000 bonus appraisal!'}
            </p>

            <div>
              <label className="block text-xs font-semibold text-[#444653] mb-1">
                {isBn ? 'পুরোনো ফোনের ব্র্যান্ড' : 'Old Phone Brand'}
              </label>
              <select
                value={phoneBrand}
                onChange={(e) => setPhoneBrand(e.target.value)}
                className="w-full bg-[#f2f3ff] px-3 py-2 rounded-xl border border-[#c4c5d5]/40 text-xs text-[#131b2e] focus:outline-none"
              >
                <option value="Xiaomi">Xiaomi / Redmi</option>
                <option value="Samsung">Samsung Galaxy</option>
                <option value="Realme">Realme</option>
                <option value="Apple">Apple iPhone</option>
                <option value="Vivo">Vivo / Oppo</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#444653] mb-1">
                {isBn ? 'ফোনের বর্তমান কন্ডিশন' : 'Phone Condition'}
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setCondition('flawless')}
                  className={`p-2 rounded-xl border text-center cursor-pointer transition-colors ${
                    condition === 'flawless'
                      ? 'border-[#00288e] bg-[#eaedff] text-[#00288e] font-bold'
                      : 'border-[#c4c5d5]/40 text-[#444653]'
                  }`}
                >
                  {isBn ? 'একদম নতুনের মতো' : 'Flawless'}
                </button>
                <button
                  type="button"
                  onClick={() => setCondition('good')}
                  className={`p-2 rounded-xl border text-center cursor-pointer transition-colors ${
                    condition === 'good'
                      ? 'border-[#00288e] bg-[#eaedff] text-[#00288e] font-bold'
                      : 'border-[#c4c5d5]/40 text-[#444653]'
                  }`}
                >
                  {isBn ? 'ভালো / মাইনর স্ক্র্যাচ' : 'Good Condition'}
                </button>
                <button
                  type="button"
                  onClick={() => setCondition('fair')}
                  className={`p-2 rounded-xl border text-center cursor-pointer transition-colors ${
                    condition === 'fair'
                      ? 'border-[#00288e] bg-[#eaedff] text-[#00288e] font-bold'
                      : 'border-[#c4c5d5]/40 text-[#444653]'
                  }`}
                >
                  {isBn ? 'ব্যবহারযোগ্য' : 'Fair / Used'}
                </button>
              </div>
            </div>

            <div className="bg-[#f2f3ff] p-3 rounded-xl border border-[#c4c5d5]/30 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#757684] block">{isBn ? 'আপনার অতিরিক্ত এক্সচেঞ্জ বোনাস:' : 'Your Extra Bonus:'}</span>
                <span className="text-base font-bold text-[#fd651e]">{formatPrice(estimatedBonus, isBn)}</span>
              </div>
              <span className="text-xs bg-[#85f8c4]/40 text-[#00563a] font-bold px-2 py-1 rounded-md">
                + ফ্রি হোম পিকআপ
              </span>
            </div>

            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="w-full bg-[#00288e] hover:bg-[#1e40af] text-white py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer"
            >
              {isBn ? 'এক্সচেঞ্জ রিকোয়েস্ট পাঠান' : 'Submit Exchange Request'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
