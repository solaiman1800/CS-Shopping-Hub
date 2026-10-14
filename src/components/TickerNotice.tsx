import React, { useEffect, useState } from 'react';
import { toBengaliNumber } from '../data/mockData';

interface TickerNoticeProps {
  onCopyVoucher: (code: string) => void;
  lang: 'bn' | 'en';
}

export const TickerNotice: React.FC<TickerNoticeProps> = ({ onCopyVoucher, lang }) => {
  const isBn = lang === 'bn';
  const [seconds, setSeconds] = useState(42);
  const [minutes, setMinutes] = useState(22);
  const [hours, setHours] = useState(4);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSec) => {
        if (prevSec > 0) return prevSec - 1;
        setMinutes((prevMin) => {
          if (prevMin > 0) return prevMin - 1;
          setHours((prevHr) => (prevHr > 0 ? prevHr - 1 : 12));
          return 59;
        });
        return 59;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimerDigits = (num: number) => {
    const str = num < 10 ? `0${num}` : `${num}`;
    return isBn ? toBengaliNumber(str) : str;
  };

  const handleCopy = () => {
    onCopyVoucher('SMART2025');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#00288e] text-white py-2 px-4 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-xs md:text-sm font-semibold">
        <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
          <span className="bg-[#fd651e] text-white px-2 py-0.5 rounded-full text-[11px] uppercase tracking-wide font-bold animate-pulse shadow-xs">
            {isBn ? 'মেগা অফার' : 'MEGA OFFER'}
          </span>
          <span className="truncate">
            🎉 {isBn ? 'ভাউচার কোড ব্যবহার করুন: ' : 'Use voucher code: '}
            <button
              type="button"
              onClick={handleCopy}
              className="font-bold underline decoration-[#fd651e] decoration-2 underline-offset-2 hover:text-[#ffdbce] cursor-pointer transition-colors"
              title={isBn ? "ক্লিক করে কপি করুন" : "Click to copy"}
            >
              SMART2025
            </button>
            {copied ? (
              <span className="ml-1 text-[#85f8c4] font-bold text-xs">
                ✓ {isBn ? 'কপি হয়েছে!' : 'Copied!'}
              </span>
            ) : (
              <span> {isBn ? 'এবং পান অতিরিক্ত ১০% ডিসকাউন্ট!' : 'and get extra 10% discount!'}</span>
            )}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium">
          <span className="flex items-center gap-1 opacity-95">
            <span className="material-symbols-outlined text-sm">alarm</span>
            <span>{isBn ? 'অফার শেষ হতে বাকি: ' : 'Time remaining: '}</span>
            <strong className="tracking-wider font-mono text-white">
              {formatTimerDigits(hours)}:{formatTimerDigits(minutes)}:{formatTimerDigits(seconds)}
            </strong>
          </span>
          <span className="hidden lg:inline opacity-60">|</span>
          <span className="hidden lg:flex items-center gap-1 text-[#85f8c4]">
            <span className="material-symbols-outlined text-sm">verified</span>
            <span>{isBn ? 'ডেলিভারি সাপোর্ট: সারা বাংলাদেশ' : 'Delivery: All over Bangladesh'}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
