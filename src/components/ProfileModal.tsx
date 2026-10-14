import React from 'react';
import { formatPrice } from '../data/mockData';
import { OrderInfo } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderInfo[];
  onTrackOrder: (orderId: string) => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
  lang: 'bn' | 'en';
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  orders,
  onTrackOrder,
  onOpenAdmin,
  isAdminLoggedIn,
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

        {/* User Card */}
        <div className="flex items-center gap-4 pb-4 border-b border-[#c4c5d5]/30">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8Xj8ivkFUep8KYfBR9sWPY-cx98_lEqvPSl3BC5Qn3PpB4sqX3ltQHp3eB04uQH0zvbMS8FdILhs6LN9IOxP4JZfU8pk7yTAeNS1J7ptdhBaegFlCtyj590xAumGLdlHquOk1AAKGwoN4Wow2ERXQkzQrAk6ExvMB4gOV6jC94lDKlMKi0RFsbih3Fuf2hDEtXaVo_I10SlLgSl0Qqb4ZLJze4eBgAQo19G9OVVP0ntnePLG1yqQZ0S40XU5CWE3IedAtAo7LMYXsDEs"
            alt="Solaiman"
            className="w-16 h-16 rounded-full object-cover ring-2 ring-[#00288e]"
          />
          <div>
            <h4 className="text-base font-bold text-[#131b2e]">solaiman (সোলায়মান আহমেদ)</h4>
            <span className="text-xs text-[#757684]">aicreation696969@gmail.com</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] bg-[#85f8c4]/40 text-[#00563a] font-bold px-2 py-0.5 rounded-full">
                {isBn ? 'প্রিমিয়াম মেম্বার' : 'Premium Member'}
              </span>
              <span className="text-[11px] text-[#757684]">
                {isBn ? 'সদস্য: ২০২৩ থেকে' : 'Member since 2023'}
              </span>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="py-4">
          <h5 className="text-xs font-bold text-[#131b2e] uppercase tracking-wider mb-2">
            {isBn ? 'সাম্প্রতিক অর্ডারসমূহ' : 'Recent Orders'}
          </h5>

          {orders.length === 0 ? (
            <div className="bg-[#f2f3ff] p-4 rounded-xl text-center text-xs text-[#757684]">
              {isBn ? 'কোনো পূর্ববর্তী অর্ডার নেই।' : 'No orders found yet.'}
            </div>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-[#f2f3ff] p-3 rounded-xl flex items-center justify-between text-xs border border-[#c4c5d5]/30"
                >
                  <div>
                    <div className="font-mono font-bold text-[#00288e]">{order.id}</div>
                    <div className="text-[11px] text-[#757684]">
                      {order.items.length} {isBn ? 'টি আইটেম' : 'items'} • {order.createdAt}
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <span className="font-bold text-[#a73a00]">{formatPrice(order.total, isBn)}</span>
                    <button
                      type="button"
                      onClick={() => {
                        onTrackOrder(order.id);
                        onClose();
                      }}
                      className="bg-white hover:bg-[#eaedff] text-[#00288e] px-2.5 py-1 rounded-lg font-bold border border-[#c4c5d5]/30"
                    >
                      {isBn ? 'ট্র্যাক' : 'Track'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Addresses and Shortcuts */}
        <div className="bg-[#f2f3ff] p-3.5 rounded-xl text-xs space-y-1 border border-[#c4c5d5]/30">
          <span className="font-bold text-[#131b2e] block">
            {isBn ? 'ডিফল্ট ডেলিভারি ঠিকানা:' : 'Default Shipping Address:'}
          </span>
          <p className="text-[#444653]">ধানমন্ডি, রোড ৫, বাড়ি ১২, ঢাকা-১২০৫</p>
          <p className="text-[#757684]">ফোন: ০১৭১২-৩৪৫৬৭৮</p>
        </div>

        {/* Admin Dashboard shortcut */}
        <div className="mt-4 pt-3 border-t border-[#c4c5d5]/30">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenAdmin();
            }}
            className="w-full bg-[#eaedff] hover:bg-[#00288e] text-[#00288e] hover:text-white py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-base">admin_panel_settings</span>
            <span>
              {isAdminLoggedIn
                ? (isBn ? 'অ্যাডমিন ড্যাশবোর্ডে প্রবেশ করুন' : 'Go to Admin Dashboard')
                : (isBn ? 'অ্যাডমিন লগইন প্যানেল' : 'Admin Login Panel')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
