import React from 'react';

interface ValueStripProps {
  lang: 'bn' | 'en';
}

export const ValueStrip: React.FC<ValueStripProps> = ({ lang }) => {
  const isBn = lang === 'bn';

  const values = [
    {
      icon: 'local_shipping',
      iconBg: 'bg-[#dde1ff]',
      iconColor: 'text-[#00288e]',
      title: isBn ? 'দ্রুততম হোম ডেলিভারি' : 'Fast Home Delivery',
      subtitle: isBn ? 'ঢাকা মাত্র ৬০৳, ঢাকার বাইরে ১২০৳' : 'Dhaka ৳60, Outside Dhaka ৳120',
    },
    {
      icon: 'verified_user',
      iconBg: 'bg-[#85f8c4]',
      iconColor: 'text-[#003d28]',
      title: isBn ? '১০০% আসল পণ্য গ্যারান্টি' : '100% Genuine Products',
      subtitle: isBn ? 'অফিসিয়াল ব্র্যান্ড ওয়ারেন্টি যুক্ত' : 'Official brand warranty included',
    },
    {
      icon: 'published_with_changes',
      iconBg: 'bg-[#ffdbce]',
      iconColor: 'text-[#a73a00]',
      title: isBn ? '৭ দিনের ফ্রি রিটার্ন' : '7 Days Free Return',
      subtitle: isBn ? 'ঝামেলাহীন ও দ্রুত রিফান্ড সুবিধা' : 'Hassle-free easy return policy',
    },
    {
      icon: 'payments',
      iconBg: 'bg-[#b8c4ff]',
      iconColor: 'text-[#1e40af]',
      title: isBn ? 'ক্যাশ অন ডেলিভারি' : 'Cash on Delivery',
      subtitle: isBn ? 'পণ্য দেখে মূল্য পরিশোধের নিশ্চয়তা' : 'Inspect product and pay at doorstep',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-2 md:py-3 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {values.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-2xl shadow-xs border border-[#c4c5d5]/30 flex items-center gap-3.5 hover:shadow-md transition-shadow"
          >
            <div
              className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center ${item.iconColor} shrink-0`}
            >
              <span className="material-symbols-outlined text-2xl">{item.icon}</span>
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-bold text-[#131b2e] truncate">{item.title}</h4>
              <p className="text-xs text-[#444653] truncate mt-0.5">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
