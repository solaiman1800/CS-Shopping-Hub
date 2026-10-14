import React, { useState } from 'react';
import { formatPrice, toBengaliNumber } from '../data/mockData';
import { CartItem, OrderInfo, Product } from '../types';

export interface CustomerProfile {
  name: string;
  nameEn?: string;
  phone: string;
  email: string;
  avatar: string;
  memberTier: string;
  points: number;
  walletBalance: number;
}

export interface CustomerAddress {
  id: string;
  title: string;
  recipientName: string;
  phone: string;
  address: string;
  city: 'dhaka' | 'outside';
  isDefault: boolean;
}

interface CustomerPanelProps {
  customer: CustomerProfile;
  onUpdateCustomer: (updated: Partial<CustomerProfile>) => void;
  orders: OrderInfo[];
  onCancelOrder: (orderId: string) => void;
  onTrackOrder: (orderId: string) => void;
  onReOrder: (items: CartItem[]) => void;
  wishlistProducts: Product[];
  onRemoveWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onBackToStore: () => void;
  onLogout: () => void;
  lang: 'bn' | 'en';
}

export const CustomerPanel: React.FC<CustomerPanelProps> = ({
  customer,
  onUpdateCustomer,
  orders,
  onCancelOrder,
  onTrackOrder,
  onReOrder,
  wishlistProducts,
  onRemoveWishlist,
  onAddToCart,
  onBackToStore,
  onLogout,
  lang,
}) => {
  const isBn = lang === 'bn';
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'addresses' | 'wishlist' | 'wallet' | 'settings'>('overview');
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [invoiceOrder, setInvoiceOrder] = useState<OrderInfo | null>(null);

  // Address state
  const [addresses, setAddresses] = useState<CustomerAddress[]>([
    {
      id: 'addr-1',
      title: 'হোম (বাসা)',
      recipientName: customer.name,
      phone: customer.phone,
      address: 'ধানমন্ডি, রোড ৫, বাড়ি ১২, ঢাকা-১২০৫',
      city: 'dhaka',
      isDefault: true,
    },
    {
      id: 'addr-2',
      title: 'অফিস',
      recipientName: customer.name,
      phone: customer.phone,
      address: 'রূপায়ন সেন্টার, লেভেল ৮, গুলশান-১, ঢাকা',
      city: 'dhaka',
      isDefault: false,
    },
  ]);
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [newAddrTitle, setNewAddrTitle] = useState('বাসা');
  const [newAddrRecipient, setNewAddrRecipient] = useState(customer.name);
  const [newAddrPhone, setNewAddrPhone] = useState(customer.phone);
  const [newAddrText, setNewAddrText] = useState('');
  const [newAddrCity, setNewAddrCity] = useState<'dhaka' | 'outside'>('dhaka');

  // Profile edit state
  const [editName, setEditName] = useState(customer.name);
  const [editPhone, setEditPhone] = useState(customer.phone);
  const [editEmail, setEditEmail] = useState(customer.email);
  const [smsNotification, setSmsNotification] = useState(true);
  const [emailNotification, setEmailNotification] = useState(true);

  // Filter orders
  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'all') return true;
    return o.status === orderFilter;
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCustomer({
      name: editName,
      phone: editPhone,
      email: editEmail,
    });
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrText.trim()) return;
    const newEntry: CustomerAddress = {
      id: `addr-${Date.now()}`,
      title: newAddrTitle,
      recipientName: newAddrRecipient,
      phone: newAddrPhone,
      address: newAddrText,
      city: newAddrCity,
      isDefault: addresses.length === 0,
    };
    setAddresses((prev) => [...prev, newEntry]);
    setIsAddAddressOpen(false);
    setNewAddrText('');
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const pendingCount = orders.filter((o) => o.status === 'confirmed' || o.status === 'packaging').length;
  const deliveredCount = orders.filter((o) => o.status === 'delivered').length;

  return (
    <div className="min-h-screen bg-[#f2f3ff] text-[#131b2e] flex flex-col antialiased">
      {/* Top Navigation Strip */}
      <header className="bg-white border-b border-[#c4c5d5]/30 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToStore}
              className="flex items-center gap-2 cursor-pointer group text-left"
            >
              <img
                alt="SmartShop BD"
                className="h-8 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAer5JPDepUBytvHEdfrtcQYPU8HJtc01-fSFkuDafQV1PJJggS0oj5nGJUFovCtBNO4pyW9mKYkNIWTeQBTuQwS72Tv3gaoB0y-pXMJEMDISGHIaO9vNKg4YzTlU5VkcrSatLjc5Jja3R3gp57lGnolvNqxpy4MLb7oxBEirQY10-lWYobbEs6PT-0eqtki7UiDlkzjkwc5mPrehRjiCCWisCuHUIKz-fKUu1e8KewXVjAYEvOb7abwFIwwTwjhShdxdWxc84bDYlrM7Y"
              />
              <div className="flex flex-col leading-none">
                <span className="text-base font-bold text-[#00288e] group-hover:text-[#1e40af] transition-colors">CS Shopping Hub</span>
                <span className="text-[10px] text-[#fd651e] font-bold uppercase tracking-wider">
                  {isBn ? 'গ্রাহক ড্যাশবোর্ড' : 'Customer Dashboard'}
                </span>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToStore}
              className="bg-[#eaedff] hover:bg-[#dde1ff] text-[#00288e] px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">storefront</span>
              <span>{isBn ? 'শপিংয়ে ফিরে যান' : 'Back to Store'}</span>
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="bg-[#ffdad6] hover:bg-[#ba1a1a] text-[#ba1a1a] hover:text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              <span>{isBn ? 'লগআউট' : 'Logout'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 w-full flex-1 space-y-6">
        {/* Customer Profile Banner Card */}
        <div className="bg-gradient-to-r from-[#00288e] via-[#1e40af] to-[#3755c3] rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-[#fd651e]/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left z-10">
            <img
              src={customer.avatar}
              alt={customer.name}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-white/30 shadow-md shrink-0"
            />
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl sm:text-2xl font-bold">{customer.name}</h2>
                <span className="bg-[#85f8c4] text-[#003d28] text-xs font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                  {customer.memberTier}
                </span>
              </div>
              <div className="text-xs text-white/90 mt-1 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">phone</span>
                  <span>{customer.phone}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">mail</span>
                  <span>{customer.email}</span>
                </span>
              </div>
              <div className="text-[11px] text-[#ffdbce] mt-1.5 font-medium">
                {isBn ? 'সদস্যপদ: ২০২৩ সাল থেকে বিশ্বস্ত গ্রাহক' : 'Member since: 2023'}
              </div>
            </div>
          </div>

          {/* Customer Quick Stats */}
          <div className="flex flex-wrap items-center justify-center gap-3 z-10">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 text-center min-w-[100px]">
              <span className="text-[11px] text-white/80 block uppercase tracking-wider font-semibold">
                {isBn ? 'মোট অর্ডার' : 'Total Orders'}
              </span>
              <strong className="text-xl font-bold text-white">
                {isBn ? toBengaliNumber(orders.length) : orders.length}
              </strong>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 text-center min-w-[100px]">
              <span className="text-[11px] text-white/80 block uppercase tracking-wider font-semibold">
                {isBn ? 'রিওয়ার্ড পয়েন্ট' : 'Points'}
              </span>
              <strong className="text-xl font-bold text-[#85f8c4]">
                {isBn ? toBengaliNumber(customer.points) : customer.points}
              </strong>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 text-center min-w-[100px]">
              <span className="text-[11px] text-white/80 block uppercase tracking-wider font-semibold">
                {isBn ? 'ক্যাশব্যাক ওয়ালেট' : 'Cashback'}
              </span>
              <strong className="text-xl font-bold text-[#ffdbce]">
                {formatPrice(customer.walletBalance, isBn)}
              </strong>
            </div>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="flex items-center gap-2 border-b border-[#c4c5d5]/30 pb-3 overflow-x-auto whitespace-nowrap scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#00288e] text-white shadow-xs'
                : 'bg-white text-[#444653] hover:bg-[#eaedff]'
            }`}
          >
            <span className="material-symbols-outlined text-lg">dashboard</span>
            <span>{isBn ? 'ড্যাশবোর্ড' : 'Overview'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer relative ${
              activeTab === 'orders'
                ? 'bg-[#00288e] text-white shadow-xs'
                : 'bg-white text-[#444653] hover:bg-[#eaedff]'
            }`}
          >
            <span className="material-symbols-outlined text-lg">inventory_2</span>
            <span>{isBn ? 'আমার অর্ডারসমূহ' : 'My Orders'}</span>
            {pendingCount > 0 && (
              <span className="bg-[#fd651e] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('addresses')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'addresses'
                ? 'bg-[#00288e] text-white shadow-xs'
                : 'bg-white text-[#444653] hover:bg-[#eaedff]'
            }`}
          >
            <span className="material-symbols-outlined text-lg">home_pin</span>
            <span>{isBn ? 'ডেলিভারি ঠিকানা' : 'Saved Addresses'}</span>
            <span className="text-[11px] bg-[#eaedff] text-[#00288e] px-1.5 py-0.2 rounded-full font-bold">
              {addresses.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('wishlist')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'wishlist'
                ? 'bg-[#00288e] text-white shadow-xs'
                : 'bg-white text-[#444653] hover:bg-[#eaedff]'
            }`}
          >
            <span className="material-symbols-outlined text-lg">favorite</span>
            <span>{isBn ? 'পছন্দের তালিকা' : 'Wishlist'}</span>
            {wishlistProducts.length > 0 && (
              <span className="text-[11px] bg-[#ffdbce] text-[#a73a00] px-1.5 py-0.2 rounded-full font-bold">
                {wishlistProducts.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('wallet')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'wallet'
                ? 'bg-[#00288e] text-white shadow-xs'
                : 'bg-white text-[#444653] hover:bg-[#eaedff]'
            }`}
          >
            <span className="material-symbols-outlined text-lg">account_balance_wallet</span>
            <span>{isBn ? 'রিওয়ার্ড ও ক্যাশব্যাক' : 'Rewards & Wallet'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-[#00288e] text-white shadow-xs'
                : 'bg-white text-[#444653] hover:bg-[#eaedff]'
            }`}
          >
            <span className="material-symbols-outlined text-lg">manage_accounts</span>
            <span>{isBn ? 'প্রোফাইল সেটিংস' : 'Profile Settings'}</span>
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#c4c5d5]/30">
                <div className="flex items-center justify-between text-[#757684]">
                  <span className="text-xs font-semibold">{isBn ? 'পেন্ডিং / প্রসেসিং অর্ডার' : 'Processing Orders'}</span>
                  <span className="material-symbols-outlined text-xl text-[#fd651e]">local_shipping</span>
                </div>
                <div className="text-2xl font-bold text-[#131b2e] mt-2">
                  {isBn ? toBengaliNumber(pendingCount) : pendingCount} {isBn ? 'টি' : 'orders'}
                </div>
                <div className="text-[11px] text-[#00288e] font-semibold mt-1">
                  {isBn ? 'খুব শীঘ্রই ডেলিভারি সম্পন্ন হবে' : 'In transit / packaging'}
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#c4c5d5]/30">
                <div className="flex items-center justify-between text-[#757684]">
                  <span className="text-xs font-semibold">{isBn ? 'সফল ডেলিভারি' : 'Delivered Orders'}</span>
                  <span className="material-symbols-outlined text-xl text-[#00563a]">verified</span>
                </div>
                <div className="text-2xl font-bold text-[#131b2e] mt-2">
                  {isBn ? toBengaliNumber(deliveredCount) : deliveredCount} {isBn ? 'টি' : 'orders'}
                </div>
                <div className="text-[11px] text-[#00563a] font-semibold mt-1">
                  {isBn ? '১০০% সন্তুষ্টি গ্যারান্টি' : 'Completed successfully'}
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#c4c5d5]/30">
                <div className="flex items-center justify-between text-[#757684]">
                  <span className="text-xs font-semibold">{isBn ? 'পছন্দের পণ্য' : 'Wishlist Items'}</span>
                  <span className="material-symbols-outlined text-xl text-[#ba1a1a]">favorite</span>
                </div>
                <div className="text-2xl font-bold text-[#131b2e] mt-2">
                  {isBn ? toBengaliNumber(wishlistProducts.length) : wishlistProducts.length} {isBn ? 'টি' : 'items'}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('wishlist')}
                  className="text-[11px] text-[#00288e] font-semibold mt-1 hover:underline cursor-pointer block text-left"
                >
                  {isBn ? 'পছন্দের তালিকা দেখুন →' : 'View Wishlist →'}
                </button>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#c4c5d5]/30">
                <div className="flex items-center justify-between text-[#757684]">
                  <span className="text-xs font-semibold">{isBn ? 'ডিফল্ট ঠিকানা' : 'Primary Address'}</span>
                  <span className="material-symbols-outlined text-xl text-[#00288e]">location_on</span>
                </div>
                <div className="text-sm font-bold text-[#131b2e] mt-2 truncate">
                  {addresses.find((a) => a.isDefault)?.address || 'ধানমন্ডি, ঢাকা'}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('addresses')}
                  className="text-[11px] text-[#00288e] font-semibold mt-1 hover:underline cursor-pointer block text-left"
                >
                  {isBn ? 'ঠিকানা ম্যানেজ করুন →' : 'Manage Addresses →'}
                </button>
              </div>
            </div>

            {/* Latest Active Order Banner */}
            {orders.length > 0 && (
              <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#c4c5d5]/30 space-y-3">
                <div className="flex items-center justify-between border-b border-[#c4c5d5]/20 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#00288e] text-xl">package_2</span>
                    <h4 className="text-sm font-bold text-[#131b2e]">
                      {isBn ? 'সর্বশেষ অর্ডার ট্র্যাকিং ও অগ্রগতি' : 'Latest Order Status'}
                    </h4>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#00288e] bg-[#eaedff] px-2.5 py-1 rounded-md">
                    {orders[0].id}
                  </span>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-xs text-[#444653]">
                      <span className="font-semibold text-[#131b2e]">
                        {orders[0].items.map((it) => it.product.name).join(', ')}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#757684]">
                      {isBn ? 'অর্ডার সময়:' : 'Ordered on:'} {orders[0].createdAt} • {isBn ? 'মোট:' : 'Total:'} <strong className="text-[#a73a00]">{formatPrice(orders[0].total, isBn)}</strong> ({orders[0].paymentMethod.toUpperCase()})
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onTrackOrder(orders[0].id)}
                      className="bg-[#00288e] hover:bg-[#1e40af] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <span className="material-symbols-outlined text-base">route</span>
                      <span>{isBn ? 'লাইভ ট্র্যাক করুন' : 'Track Live'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setInvoiceOrder(orders[0])}
                      className="bg-[#eaedff] hover:bg-[#dde1ff] text-[#00288e] px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      {isBn ? 'ইনভয়েস' : 'Invoice'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: My Orders */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl shadow-xs border border-[#c4c5d5]/30 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#c4c5d5]/20">
              <h4 className="text-base font-bold text-[#131b2e]">
                {isBn ? `আমার সব অর্ডার (${orders.length})` : `My Order History (${orders.length})`}
              </h4>

              <div className="flex items-center gap-1.5 bg-[#f2f3ff] p-1 rounded-xl text-xs overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setOrderFilter('all')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    orderFilter === 'all' ? 'bg-white text-[#00288e] shadow-xs' : 'text-[#444653]'
                  }`}
                >
                  {isBn ? 'সব' : 'All'}
                </button>
                <button
                  type="button"
                  onClick={() => setOrderFilter('confirmed')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    orderFilter === 'confirmed' ? 'bg-white text-[#00288e] shadow-xs' : 'text-[#444653]'
                  }`}
                >
                  {isBn ? 'নিশ্চিত' : 'Confirmed'}
                </button>
                <button
                  type="button"
                  onClick={() => setOrderFilter('packaging')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    orderFilter === 'packaging' ? 'bg-white text-[#00288e] shadow-xs' : 'text-[#444653]'
                  }`}
                >
                  {isBn ? 'প্যাকেজিং' : 'Packaging'}
                </button>
                <button
                  type="button"
                  onClick={() => setOrderFilter('shipped')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    orderFilter === 'shipped' ? 'bg-white text-[#00288e] shadow-xs' : 'text-[#444653]'
                  }`}
                >
                  {isBn ? 'ডেলিভারিতে' : 'Shipped'}
                </button>
                <button
                  type="button"
                  onClick={() => setOrderFilter('delivered')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    orderFilter === 'delivered' ? 'bg-white text-[#00288e] shadow-xs' : 'text-[#444653]'
                  }`}
                >
                  {isBn ? 'ডেলিভারি সম্পন্ন' : 'Delivered'}
                </button>
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="text-center py-12 text-[#757684]">
                <span className="material-symbols-outlined text-5xl text-[#c4c5d5] mb-2">shopping_bag</span>
                <p className="text-sm">{isBn ? 'কোনো অর্ডার খুঁজে পাওয়া যায়নি।' : 'No orders in this category.'}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => {
                  const statusMap: Record<OrderInfo['status'], { labelBn: string; labelEn: string; color: string }> = {
                    confirmed: { labelBn: 'অর্ডার নিশ্চিত', labelEn: 'Confirmed', color: 'bg-[#dde1ff] text-[#00288e]' },
                    packaging: { labelBn: 'প্যাকেজিং চলছে', labelEn: 'Packaging', color: 'bg-[#ffdbce] text-[#a73a00]' },
                    shipped: { labelBn: 'ডেলিভারিতে আছে', labelEn: 'Shipped', color: 'bg-[#eaedff] text-[#1e40af]' },
                    delivered: { labelBn: 'ডেলিভারি সম্পন্ন', labelEn: 'Delivered', color: 'bg-[#85f8c4] text-[#003d28]' },
                  };
                  const currentSt = statusMap[order.status];

                  return (
                    <div
                      key={order.id}
                      className="bg-[#f2f3ff]/40 p-4 rounded-2xl border border-[#c4c5d5]/30 space-y-3 hover:border-[#00288e]/30 transition-all"
                    >
                      {/* Order Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-[#c4c5d5]/20 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[#00288e]">{order.id}</span>
                          <span className="text-[#757684]">•</span>
                          <span className="text-[#757684]">{order.createdAt}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${currentSt.color}`}>
                            {isBn ? currentSt.labelBn : currentSt.labelEn}
                          </span>
                        </div>
                      </div>

                      {/* Item Preview */}
                      <div className="space-y-2">
                        {order.items.map((it, idx) => (
                          <div key={idx} className="flex items-center justify-between gap-3 text-xs">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={it.product.image}
                                alt={it.product.name}
                                className="w-11 h-11 object-cover rounded-lg bg-white p-1 border border-[#c4c5d5]/20 shrink-0"
                              />
                              <div className="min-w-0">
                                <h6 className="font-bold text-[#131b2e] truncate max-w-xs">{it.product.name}</h6>
                                <span className="text-[11px] text-[#757684]">
                                  {it.quantity} x {formatPrice(it.product.price, isBn)}
                                </span>
                              </div>
                            </div>
                            <span className="font-bold text-[#a73a00]">
                              {formatPrice(it.product.price * it.quantity, isBn)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Order Footer & Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#c4c5d5]/20 text-xs">
                        <div>
                          <span className="text-[#757684]">{isBn ? 'সর্বমোট মূল্য:' : 'Total Amount:'} </span>
                          <strong className="text-sm font-bold text-[#a73a00]">{formatPrice(order.total, isBn)}</strong>
                          <span className="text-[11px] text-[#757684] ml-2">({order.paymentMethod.toUpperCase()})</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onTrackOrder(order.id)}
                            className="bg-[#00288e] hover:bg-[#1e40af] text-white px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">route</span>
                            <span>{isBn ? 'ট্র্যাক' : 'Track'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setInvoiceOrder(order)}
                            className="bg-white hover:bg-[#eaedff] text-[#00288e] px-3 py-1.5 rounded-lg font-bold border border-[#c4c5d5]/30 cursor-pointer transition-colors"
                          >
                            {isBn ? 'ইনভয়েস' : 'Invoice'}
                          </button>

                          <button
                            type="button"
                            onClick={() => onReOrder(order.items)}
                            className="bg-[#fd651e] hover:bg-[#a73a00] text-white px-3 py-1.5 rounded-lg font-bold cursor-pointer transition-colors shadow-xs"
                          >
                            {isBn ? 'আবার কিনুন' : 'Re-order'}
                          </button>

                          {order.status === 'confirmed' && (
                            <button
                              type="button"
                              onClick={() => onCancelOrder(order.id)}
                              className="text-[#ba1a1a] hover:bg-[#ffdad6] px-2 py-1 rounded-lg font-semibold transition-colors"
                            >
                              {isBn ? 'বাতিল' : 'Cancel'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Saved Addresses */}
        {activeTab === 'addresses' && (
          <div className="bg-white rounded-2xl shadow-xs border border-[#c4c5d5]/30 p-5 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#c4c5d5]/20">
              <div>
                <h4 className="text-base font-bold text-[#131b2e]">
                  {isBn ? 'সংরক্ষিত ডেলিভারি ঠিকানা' : 'Manage Delivery Addresses'}
                </h4>
                <p className="text-xs text-[#757684]">
                  {isBn ? 'অর্ডারের সময় দ্রুত ডেলিভারি নিশ্চিত করতে ঠিকানা আপডেট রাখুন।' : 'Add or select your preferred shipping addresses.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddAddressOpen(true)}
                className="bg-[#fd651e] hover:bg-[#a73a00] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">add</span>
                <span>{isBn ? 'নতুন ঠিকানা যোগ' : 'Add Address'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`p-4 rounded-2xl border transition-all relative ${
                    addr.isDefault
                      ? 'border-[#00288e] bg-[#eaedff]/30 ring-2 ring-[#00288e]/10'
                      : 'border-[#c4c5d5]/30 bg-white hover:border-[#00288e]/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#00288e] uppercase flex items-center gap-1">
                      <span className="material-symbols-outlined text-base">home_pin</span>
                      <span>{addr.title}</span>
                    </span>
                    {addr.isDefault && (
                      <span className="text-[10px] bg-[#00288e] text-white px-2 py-0.5 rounded-full font-bold">
                        {isBn ? 'ডিফল্ট' : 'Default'}
                      </span>
                    )}
                  </div>

                  <div className="text-xs space-y-1 text-[#444653]">
                    <div className="font-bold text-[#131b2e]">{addr.recipientName}</div>
                    <div>{addr.address}</div>
                    <div className="text-[11px] text-[#757684]">ফোন: {addr.phone}</div>
                    <div className="text-[11px] text-[#00563a] font-semibold">
                      {addr.city === 'dhaka' ? (isBn ? 'ঢাকার ভেতরে (৳৬০)' : 'Inside Dhaka (৳60)') : (isBn ? 'ঢাকার বাইরে (৳১২০)' : 'Outside Dhaka (৳120)')}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#c4c5d5]/20">
                    {!addr.isDefault && (
                      <button
                        type="button"
                        onClick={() => handleSetDefaultAddress(addr.id)}
                        className="text-xs text-[#00288e] font-bold hover:underline cursor-pointer"
                      >
                        {isBn ? 'ডিফল্ট করুন' : 'Make Default'}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDeleteAddress(addr.id)}
                      className="text-xs text-[#ba1a1a] hover:underline cursor-pointer ml-auto"
                    >
                      {isBn ? 'মুছে ফেলুন' : 'Delete'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Address Modal Form */}
            {isAddAddressOpen && (
              <div className="p-4 bg-[#f2f3ff] rounded-2xl border border-[#c4c5d5]/40 mt-4 animate-in fade-in">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="text-xs font-bold text-[#131b2e] uppercase">
                    {isBn ? 'নতুন ডেলিভারি ঠিকানা যোগ করুন' : 'Add New Shipping Address'}
                  </h5>
                  <button
                    type="button"
                    onClick={() => setIsAddAddressOpen(false)}
                    className="text-[#757684] hover:text-[#131b2e]"
                  >
                    <span className="material-symbols-outlined text-base">close</span>
                  </button>
                </div>

                <form onSubmit={handleAddAddress} className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-[#444653] mb-1">
                      {isBn ? 'ঠিকানার ধরন (বাসা / অফিস)' : 'Address Label'}
                    </label>
                    <input
                      type="text"
                      required
                      value={newAddrTitle}
                      onChange={(e) => setNewAddrTitle(e.target.value)}
                      className="w-full bg-white px-3 py-2 rounded-xl border border-[#c4c5d5]/40 text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#444653] mb-1">
                      {isBn ? 'প্রাপকের নাম' : 'Recipient Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={newAddrRecipient}
                      onChange={(e) => setNewAddrRecipient(e.target.value)}
                      className="w-full bg-white px-3 py-2 rounded-xl border border-[#c4c5d5]/40 text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#444653] mb-1">
                      {isBn ? 'মোবাইল নম্বর' : 'Phone Number'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={newAddrPhone}
                      onChange={(e) => setNewAddrPhone(e.target.value)}
                      className="w-full bg-white px-3 py-2 rounded-xl border border-[#c4c5d5]/40 text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#444653] mb-1">
                      {isBn ? 'এলাকা / শহর' : 'Delivery Area'}
                    </label>
                    <select
                      value={newAddrCity}
                      onChange={(e) => setNewAddrCity(e.target.value as 'dhaka' | 'outside')}
                      className="w-full bg-white px-3 py-2 rounded-xl border border-[#c4c5d5]/40 text-xs focus:outline-none"
                    >
                      <option value="dhaka">ঢাকা মেট্রো (৬০৳)</option>
                      <option value="outside">ঢাকার বাইরে সারা বাংলাদেশ (১২০৳)</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block font-semibold text-[#444653] mb-1">
                      {isBn ? 'বিস্তারিত ঠিকানা (বাড়ি, রোড, থানা, জেলা)' : 'Full Address'}
                    </label>
                    <input
                      type="text"
                      required
                      value={newAddrText}
                      onChange={(e) => setNewAddrText(e.target.value)}
                      placeholder="যেমন: বাড়ি ১২, রোড ৪, সেক্টর ৭, উত্তরা, ঢাকা"
                      className="w-full bg-white px-3 py-2 rounded-xl border border-[#c4c5d5]/40 text-xs focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2 flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddAddressOpen(false)}
                      className="bg-white px-4 py-2 rounded-xl font-bold text-xs text-[#757684] hover:bg-[#eaedff]"
                    >
                      {isBn ? 'বাতিল' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      className="bg-[#00288e] text-white px-5 py-2 rounded-xl font-bold text-xs hover:bg-[#1e40af]"
                    >
                      {isBn ? 'সংরক্ষণ করুন' : 'Save Address'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Wishlist */}
        {activeTab === 'wishlist' && (
          <div className="bg-white rounded-2xl shadow-xs border border-[#c4c5d5]/30 p-5 space-y-4">
            <h4 className="text-base font-bold text-[#131b2e] pb-3 border-b border-[#c4c5d5]/20">
              {isBn ? `পছন্দের তালিকাভুক্ত পণ্য (${wishlistProducts.length})` : `My Wishlist (${wishlistProducts.length})`}
            </h4>

            {wishlistProducts.length === 0 ? (
              <div className="text-center py-12 text-[#757684]">
                <span className="material-symbols-outlined text-5xl text-[#c4c5d5] mb-2">favorite_border</span>
                <p className="text-sm">{isBn ? 'আপনার পছন্দের তালিকা খালি রয়েছে।' : 'No items in wishlist.'}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlistProducts.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 rounded-2xl border border-[#c4c5d5]/30 bg-[#f2f3ff]/40 flex gap-3 items-center justify-between hover:border-[#00288e]/30 transition-all"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-16 h-16 object-cover rounded-xl bg-white p-1 border border-[#c4c5d5]/20 shrink-0"
                    />

                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] text-[#00288e] font-bold uppercase">{p.brand}</span>
                      <h5 className="text-xs font-bold text-[#131b2e] truncate">{p.name}</h5>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-bold text-[#a73a00]">{formatPrice(p.price, isBn)}</span>
                        <span className="text-[11px] text-[#757684] line-through">{formatPrice(p.originalPrice, isBn)}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => onAddToCart(p)}
                        className="bg-[#00288e] text-white p-2 rounded-lg text-xs hover:bg-[#1e40af] transition-colors shadow-xs"
                        title={isBn ? "কার্টে যোগ করুন" : "Add to Cart"}
                      >
                        <span className="material-symbols-outlined text-base">shopping_cart</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onRemoveWishlist(p.id)}
                        className="text-[#ba1a1a] bg-white p-1.5 rounded-lg border border-[#c4c5d5]/30 hover:bg-[#ffdad6] text-xs transition-colors"
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
        )}

        {/* Tab 5: Rewards & Wallet */}
        {activeTab === 'wallet' && (
          <div className="bg-white rounded-2xl shadow-xs border border-[#c4c5d5]/30 p-5 space-y-6">
            <div>
              <h4 className="text-base font-bold text-[#131b2e] mb-1">
                {isBn ? 'রিওয়ার্ড পয়েন্টস ও ক্যাশব্যাক ওয়ালেট' : 'Rewards & Wallet'}
              </h4>
              <p className="text-xs text-[#757684]">
                {isBn ? 'কেনাকাটা করে পয়েন্ট অর্জন করুন এবং পরবর্তী অর্ডারে ডিসকাউন্ট পান।' : 'Earn points with each order to redeem for future discounts.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-[#dde1ff] to-[#f2f3ff] p-5 rounded-2xl border border-[#c4c5d5]/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#00288e] uppercase">
                    {isBn ? 'লয়্যালটি রিওয়ার্ড পয়েন্টস' : 'Loyalty Reward Points'}
                  </span>
                  <span className="material-symbols-outlined text-2xl text-[#00288e]">stars</span>
                </div>
                <div className="text-3xl font-extrabold text-[#00288e] mt-2">
                  {isBn ? toBengaliNumber(customer.points) : customer.points} <span className="text-sm font-medium">পয়েন্ট</span>
                </div>
                <p className="text-xs text-[#444653] mt-2">
                  {isBn ? `সমমূল্য: ৳${customer.points / 10} টাকা ছাড় হিসেবে ব্যবহারযোগ্য` : `Value: ৳${customer.points / 10} discount`}
                </p>
                <button
                  type="button"
                  onClick={() => alert(isBn ? 'আপনার পয়েন্ট চেকআউটে স্বয়ংক্রিয়ভাবে ব্যবহার করা যাবে।' : 'Points can be applied at checkout.')}
                  className="mt-4 bg-[#00288e] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#1e40af] transition-colors cursor-pointer"
                >
                  {isBn ? 'পয়েন্ট ব্যবহার করুন' : 'Redeem Points'}
                </button>
              </div>

              <div className="bg-gradient-to-br from-[#ffdbce]/40 to-[#f2f3ff] p-5 rounded-2xl border border-[#c4c5d5]/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#a73a00] uppercase">
                    {isBn ? 'ক্যাশব্যাক ওয়ালেট ব্যালেন্স' : 'Cashback Wallet'}
                  </span>
                  <span className="material-symbols-outlined text-2xl text-[#fd651e]">account_balance_wallet</span>
                </div>
                <div className="text-3xl font-extrabold text-[#a73a00] mt-2">
                  {formatPrice(customer.walletBalance, isBn)}
                </div>
                <p className="text-xs text-[#444653] mt-2">
                  {isBn ? 'বিকাশ ও নগদ স্পেশাল অফার থেকে ক্যাশব্যাক ক্রেডিট' : 'Cashback earned from bKash & Nagad promos'}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-[10px] bg-white px-2 py-1 rounded text-[#E2136E] font-bold border border-[#c4c5d5]/20">
                    bKash ৳১০০
                  </span>
                  <span className="text-[10px] bg-white px-2 py-1 rounded text-[#F7941D] font-bold border border-[#c4c5d5]/20">
                    Nagad ৳১০০
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Profile Settings */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl shadow-xs border border-[#c4c5d5]/30 p-5 space-y-5">
            <div>
              <h4 className="text-base font-bold text-[#131b2e] mb-1">
                {isBn ? 'প্রোফাইল তথ্য ও অ্যাকাউন্ট সেটিংস' : 'Profile Settings & Preferences'}
              </h4>
              <p className="text-xs text-[#757684]">
                {isBn ? 'আপনার ব্যক্তিগত তথ্য ও নোটিফিকেশন নিয়ন্ত্রণ করুন।' : 'Update your contact details and notification settings.'}
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 max-w-xl text-xs">
              <div>
                <label className="block font-semibold text-[#444653] mb-1">
                  {isBn ? 'আপনার পূর্ণ নাম' : 'Full Name'} *
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-[#f2f3ff] px-3.5 py-2.5 rounded-xl border border-[#c4c5d5]/40 text-xs focus:outline-none focus:border-[#00288e]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#444653] mb-1">
                    {isBn ? 'মোবাইল নম্বর' : 'Phone Number'} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full bg-[#f2f3ff] px-3.5 py-2.5 rounded-xl border border-[#c4c5d5]/40 text-xs focus:outline-none focus:border-[#00288e]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#444653] mb-1">
                    {isBn ? 'ইমেইল ঠিকানা' : 'Email Address'} *
                  </label>
                  <input
                    type="email"
                    required
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full bg-[#f2f3ff] px-3.5 py-2.5 rounded-xl border border-[#c4c5d5]/40 text-xs focus:outline-none focus:border-[#00288e]"
                  />
                </div>
              </div>

              {/* Notification Toggles */}
              <div className="pt-2 space-y-3">
                <span className="font-bold text-[#131b2e] block">
                  {isBn ? 'নোটিফিকেশন পছন্দসমূহ' : 'Notification Preferences'}
                </span>

                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={smsNotification}
                    onChange={(e) => setSmsNotification(e.target.checked)}
                    className="w-4 h-4 text-[#00288e] rounded"
                  />
                  <span>{isBn ? 'এসএমএস ডেলিভারি আপডেট (লাইভ ট্র্যাকিং মেসেজ)' : 'SMS Delivery Tracking Alerts'}</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailNotification}
                    onChange={(e) => setEmailNotification(e.target.checked)}
                    className="w-4 h-4 text-[#00288e] rounded"
                  />
                  <span>{isBn ? 'ইমেইল অফার ও ডিসকাউন্ট নিউজলেটার' : 'Promotional Discounts & Newsletter'}</span>
                </label>
              </div>

              <button
                type="submit"
                className="bg-[#00288e] hover:bg-[#1e40af] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                {isBn ? 'পরিবর্তন সংরক্ষণ করুন' : 'Save Changes'}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Invoice Viewer Modal */}
      {invoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-[#c4c5d5]/40 max-w-lg w-full p-6 relative animate-in fade-in zoom-in-95 my-8">
            <button
              type="button"
              onClick={() => setInvoiceOrder(null)}
              className="absolute top-4 right-4 text-[#757684] hover:text-[#131b2e] p-1.5 rounded-xl hover:bg-[#f2f3ff]"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            <div className="border-b border-[#c4c5d5]/30 pb-4 mb-4">
              <span className="text-base font-bold text-[#00288e]">CS Shopping Hub - Invoice</span>
              <div className="text-xs text-[#757684] mt-0.5">
                {isBn ? 'অর্ডার আইডি:' : 'Order ID:'} <strong className="text-[#131b2e] font-mono">{invoiceOrder.id}</strong>
              </div>
            </div>

            <div className="space-y-3 text-xs text-[#444653]">
              <div className="bg-[#f2f3ff] p-3 rounded-xl">
                <div><strong>{invoiceOrder.customerName}</strong> ({invoiceOrder.phone})</div>
                <div className="text-[11px] text-[#757684] mt-0.5">{invoiceOrder.address}</div>
              </div>

              <div className="divide-y divide-[#c4c5d5]/20">
                {invoiceOrder.items.map((it, i) => (
                  <div key={i} className="py-2 flex justify-between">
                    <span>{it.quantity}x {it.product.name}</span>
                    <span className="font-bold">{formatPrice(it.product.price * it.quantity, isBn)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#c4c5d5]/30 space-y-1">
                <div className="flex justify-between">
                  <span>{isBn ? 'সাবটোটাল:' : 'Subtotal:'}</span>
                  <span>{formatPrice(invoiceOrder.subtotal, isBn)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{isBn ? 'ডেলিভারি চার্জ:' : 'Delivery Fee:'}</span>
                  <span>{formatPrice(invoiceOrder.deliveryFee, isBn)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#a73a00] pt-1 border-t border-[#c4c5d5]/20">
                  <span>{isBn ? 'সর্বমোট পরিশোধযোগ্য:' : 'Total Payable:'}</span>
                  <span>{formatPrice(invoiceOrder.total, isBn)}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="w-full bg-[#00288e] hover:bg-[#1e40af] text-white py-2.5 rounded-xl text-xs font-bold mt-4 transition-colors cursor-pointer"
            >
              {isBn ? 'প্রিন্ট ইনভয়েস' : 'Print Invoice'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
