import React, { useState } from 'react';
import { formatPrice, toBengaliNumber } from '../data/mockData';
import { OrderInfo, Product } from '../types';

interface AdminPanelProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  orders: OrderInfo[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderInfo['status']) => void;
  onLogout: () => void;
  onBackToStore: () => void;
  lang: 'bn' | 'en';
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  orders,
  onUpdateOrderStatus,
  onLogout,
  onBackToStore,
  lang,
}) => {
  const isBn = lang === 'bn';
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'coupons'>('overview');
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [orderSearch, setOrderSearch] = useState<string>('');
  const [productSearch, setProductSearch] = useState<string>('');

  // Add Product modal state
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductNameEn, setNewProductNameEn] = useState('');
  const [newBrand, setNewBrand] = useState('');
  const [newPrice, setNewPrice] = useState<number>(1000);
  const [newOriginalPrice, setNewOriginalPrice] = useState<number>(1200);
  const [newCategory, setNewCategory] = useState('mobile-gadgets');
  const [newImage, setNewImage] = useState('https://lh3.googleusercontent.com/aida-public/AB6AXuDGRuJNGwevSYQtDkWYxJu7W1wyZTJwilHd_sl5bwM4L7IKmwbEJn187CfrGDGsZ-tAmx7ZXDB4Auy1m9zJYTHCak8r11RGAamb7IJqMA5WKe_8csyIZ3Vv9wpd-Q6CWcfzSll1fnzVEiRhSyInZv6-gmVY4vEZYYc-bJsr5apoWt2xsukqN3ltpvAhPvOYsEDMuIVQpimTy1tTodLtRI-QTdk0lS9GsnsM7hjm8m6zO5ZlNGRAhmfjdA');
  const [newDescription, setNewDescription] = useState('');

  // Selected Order for Invoice view
  const [invoiceOrder, setInvoiceOrder] = useState<OrderInfo | null>(null);

  // Coupons state
  const [coupons, setCoupons] = useState([
    { code: 'SMART2025', discount: 10, minSpend: 1000, active: true },
    { code: 'EID2025', discount: 15, minSpend: 2000, active: true },
    { code: 'FREESHIP', discount: 5, minSpend: 500, active: false },
  ]);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState<number>(10);

  // Calculated metrics
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0) + 342500;
  const totalOrdersCount = orders.length + 124;
  const pendingOrders = orders.filter((o) => o.status === 'confirmed' || o.status === 'packaging').length;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const discount = Math.round(((newOriginalPrice - newPrice) / newOriginalPrice) * 100);
    const created: Product = {
      id: `prod-${Date.now()}`,
      name: newProductName,
      nameEn: newProductNameEn || newProductName,
      brand: newBrand || 'SmartShop Official',
      price: newPrice,
      originalPrice: newOriginalPrice,
      discountPercent: Math.max(0, discount),
      rating: 5.0,
      reviewsCount: 1,
      image: newImage,
      category: newCategory,
      inStock: true,
      stockStatusText: 'স্টকে আছে',
      stockTextEn: 'In Stock',
      soldPercent: 10,
      description: newDescription || 'প্রিমিয়াম কোয়ালিটি অফিসিয়াল পণ্য।',
      specs: ['1 Year Warranty', 'Official Packaging', 'Brand Genuine'],
      colors: ['Black', 'Silver'],
    };
    onAddProduct(created);
    setIsAddProductModalOpen(false);
    // Reset
    setNewProductName('');
    setNewProductNameEn('');
    setNewBrand('');
    setNewDescription('');
  };

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    setCoupons((prev) => [
      ...prev,
      {
        code: newCouponCode.trim().toUpperCase(),
        discount: newCouponDiscount,
        minSpend: 1000,
        active: true,
      },
    ]);
    setNewCouponCode('');
  };

  const filteredOrders = orders.filter((o) => {
    const matchesFilter = orderFilter === 'all' || o.status === orderFilter;
    const matchesSearch =
      !orderSearch.trim() ||
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.phone.includes(orderSearch);
    return matchesFilter && matchesSearch;
  });

  const filteredProducts = products.filter((p) => {
    return (
      !productSearch.trim() ||
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.nameEn.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.brand.toLowerCase().includes(productSearch.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-[#f2f3ff] text-[#131b2e] flex flex-col antialiased">
      {/* Top Admin Navbar */}
      <header className="bg-white border-b border-[#c4c5d5]/30 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-[#00288e] text-white flex items-center justify-center font-bold shadow-xs">
                <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
              </span>
              <div className="flex flex-col leading-none">
                <span className="text-base font-bold text-[#00288e]">CS Admin Hub</span>
                <span className="text-[10px] text-[#fd651e] font-bold uppercase tracking-wider">
                  {isBn ? 'সিস্টেম অ্যাডমিনিস্ট্রেটর' : 'System Administrator'}
                </span>
              </div>
            </div>
            <span className="hidden md:inline text-xs bg-[#85f8c4]/40 text-[#003d28] font-bold px-2 py-0.5 rounded-full">
              {isBn ? 'লাইভ সেশন' : 'Live Session'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToStore}
              className="bg-[#eaedff] hover:bg-[#dde1ff] text-[#00288e] px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">storefront</span>
              <span>{isBn ? 'স্টোরফ্রন্ট দেখুন' : 'View Storefront'}</span>
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

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 w-full flex-1">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#c4c5d5]/30 pb-4 mb-6 overflow-x-auto whitespace-nowrap">
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
            <span>{isBn ? 'ড্যাশবোর্ড ওভারভিউ' : 'Overview'}</span>
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
            <span className="material-symbols-outlined text-lg">shopping_cart</span>
            <span>{isBn ? 'অর্ডার তালিকা' : 'Orders'}</span>
            {pendingOrders > 0 && (
              <span className="bg-[#fd651e] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {pendingOrders}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'bg-[#00288e] text-white shadow-xs'
                : 'bg-white text-[#444653] hover:bg-[#eaedff]'
            }`}
          >
            <span className="material-symbols-outlined text-lg">inventory_2</span>
            <span>{isBn ? 'পণ্য ব্যবস্থাপনা' : 'Products'}</span>
            <span className="text-[11px] bg-[#eaedff] text-[#00288e] px-1.5 py-0.2 rounded-full font-bold">
              {products.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('coupons')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'coupons'
                ? 'bg-[#00288e] text-white shadow-xs'
                : 'bg-white text-[#444653] hover:bg-[#eaedff]'
            }`}
          >
            <span className="material-symbols-outlined text-lg">confirmation_number</span>
            <span>{isBn ? 'কুপন ও অফার' : 'Coupons & Promos'}</span>
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#c4c5d5]/30">
                <div className="flex items-center justify-between text-[#757684]">
                  <span className="text-xs font-semibold">{isBn ? 'মোট বিক্রয় রাজস্ব' : 'Total Revenue'}</span>
                  <span className="material-symbols-outlined text-xl text-[#00563a]">monetization_on</span>
                </div>
                <div className="text-2xl font-bold text-[#131b2e] mt-2">
                  {formatPrice(totalRevenue, isBn)}
                </div>
                <div className="text-[11px] text-[#00563a] font-semibold mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  <span>+১৪.২% গত মাসের তুলনায়</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#c4c5d5]/30">
                <div className="flex items-center justify-between text-[#757684]">
                  <span className="text-xs font-semibold">{isBn ? 'সর্বমোট অর্ডার' : 'Total Orders'}</span>
                  <span className="material-symbols-outlined text-xl text-[#00288e]">receipt_long</span>
                </div>
                <div className="text-2xl font-bold text-[#131b2e] mt-2">
                  {isBn ? toBengaliNumber(totalOrdersCount) : totalOrdersCount}
                </div>
                <div className="text-[11px] text-[#fd651e] font-semibold mt-1">
                  {isBn ? `${toBengaliNumber(pendingOrders)}টি অর্ডার প্রসেসিংয়ে` : `${pendingOrders} orders processing`}
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#c4c5d5]/30">
                <div className="flex items-center justify-between text-[#757684]">
                  <span className="text-xs font-semibold">{isBn ? 'অ্যাক্টিভ প্রোডাক্ট' : 'Active Products'}</span>
                  <span className="material-symbols-outlined text-xl text-[#fd651e]">devices</span>
                </div>
                <div className="text-2xl font-bold text-[#131b2e] mt-2">
                  {isBn ? toBengaliNumber(products.length) : products.length} {isBn ? 'টি' : 'items'}
                </div>
                <div className="text-[11px] text-[#00563a] font-semibold mt-1">
                  {isBn ? 'সবগুলো পণ্য স্টকে আছে' : 'All items in stock'}
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#c4c5d5]/30">
                <div className="flex items-center justify-between text-[#757684]">
                  <span className="text-xs font-semibold">{isBn ? 'নিবন্ধিত কাস্টমার' : 'Registered Users'}</span>
                  <span className="material-symbols-outlined text-xl text-[#a73a00]">group</span>
                </div>
                <div className="text-2xl font-bold text-[#131b2e] mt-2">
                  {isBn ? toBengaliNumber(1420) : '1,420'} {isBn ? 'জন' : 'users'}
                </div>
                <div className="text-[11px] text-[#00288e] font-semibold mt-1">
                  {isBn ? '৯৮% ইতিবাচক রেটিং' : '98% Positive Rating'}
                </div>
              </div>
            </div>

            {/* Recent Orders table snippet */}
            <div className="bg-white rounded-2xl shadow-xs border border-[#c4c5d5]/30 p-5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-bold text-[#131b2e]">
                  {isBn ? 'সাম্প্রতিক কাস্টমার অর্ডার' : 'Recent Customer Orders'}
                </h4>
                <button
                  type="button"
                  onClick={() => setActiveTab('orders')}
                  className="text-xs text-[#00288e] font-bold hover:underline cursor-pointer"
                >
                  {isBn ? 'সব অর্ডার দেখুন' : 'View All Orders'} →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#444653]">
                  <thead className="bg-[#f2f3ff] text-[#131b2e] uppercase font-bold text-[11px]">
                    <tr>
                      <th className="py-3 px-3 rounded-l-lg">{isBn ? 'অর্ডার আইডি' : 'Order ID'}</th>
                      <th className="py-3 px-3">{isBn ? 'গ্রাহক' : 'Customer'}</th>
                      <th className="py-3 px-3">{isBn ? 'আইটেম' : 'Items'}</th>
                      <th className="py-3 px-3">{isBn ? 'পেমেন্ট' : 'Payment'}</th>
                      <th className="py-3 px-3">{isBn ? 'মূল্য' : 'Amount'}</th>
                      <th className="py-3 px-3">{isBn ? 'স্ট্যাটাস' : 'Status'}</th>
                      <th className="py-3 px-3 rounded-r-lg text-right">{isBn ? 'অ্যাকশন' : 'Action'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#c4c5d5]/20">
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="hover:bg-[#f2f3ff]/50 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-[#00288e]">{order.id}</td>
                        <td className="py-3 px-3">
                          <div className="font-bold text-[#131b2e]">{order.customerName}</div>
                          <div className="text-[10px] text-[#757684]">{order.phone}</div>
                        </td>
                        <td className="py-3 px-3">
                          {order.items.length} {isBn ? 'টি পণ্য' : 'items'}
                        </td>
                        <td className="py-3 px-3 uppercase font-bold text-[10px]">{order.paymentMethod}</td>
                        <td className="py-3 px-3 font-bold text-[#a73a00]">
                          {formatPrice(order.total, isBn)}
                        </td>
                        <td className="py-3 px-3">
                          <select
                            value={order.status}
                            onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as OrderInfo['status'])}
                            className="bg-[#eaedff] text-[#00288e] font-bold text-[11px] px-2 py-1 rounded-md border border-[#c4c5d5]/30 focus:outline-none cursor-pointer"
                          >
                            <option value="confirmed">{isBn ? 'অর্ডার নিশ্চিত' : 'Confirmed'}</option>
                            <option value="packaging">{isBn ? 'প্যাকেজিং চলছে' : 'Packaging'}</option>
                            <option value="shipped">{isBn ? 'ডেলিভারিতে আছে' : 'Shipped'}</option>
                            <option value="delivered">{isBn ? 'ডেলিভারি সফল' : 'Delivered'}</option>
                          </select>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            type="button"
                            onClick={() => setInvoiceOrder(order)}
                            className="text-[#00288e] hover:underline font-bold text-xs cursor-pointer"
                          >
                            {isBn ? 'ইনভয়েস' : 'Invoice'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Orders Management */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl shadow-xs border border-[#c4c5d5]/30 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#c4c5d5]/20">
              <h4 className="text-base font-bold text-[#131b2e]">
                {isBn ? `সকল কাস্টমার অর্ডার (${orders.length})` : `All Customer Orders (${orders.length})`}
              </h4>

              <div className="flex items-center gap-2 flex-wrap">
                <input
                  type="text"
                  placeholder={isBn ? "আইডি বা নাম দিয়ে খুঁজুন..." : "Search orders..."}
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="bg-[#f2f3ff] px-3 py-1.5 rounded-xl border border-[#c4c5d5]/40 text-xs focus:outline-none"
                />

                <select
                  value={orderFilter}
                  onChange={(e) => setOrderFilter(e.target.value)}
                  className="bg-[#f2f3ff] px-3 py-1.5 rounded-xl border border-[#c4c5d5]/40 text-xs font-semibold text-[#444653] focus:outline-none cursor-pointer"
                >
                  <option value="all">{isBn ? 'সব স্ট্যাটাস' : 'All Status'}</option>
                  <option value="confirmed">{isBn ? 'কনফার্মড' : 'Confirmed'}</option>
                  <option value="packaging">{isBn ? 'প্যাকেজিং' : 'Packaging'}</option>
                  <option value="shipped">{isBn ? 'শিপড' : 'Shipped'}</option>
                  <option value="delivered">{isBn ? 'ডেলিভার্ড' : 'Delivered'}</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#444653]">
                <thead className="bg-[#f2f3ff] text-[#131b2e] uppercase font-bold text-[11px]">
                  <tr>
                    <th className="py-3 px-3 rounded-l-lg">{isBn ? 'অর্ডার আইডি' : 'Order ID'}</th>
                    <th className="py-3 px-3">{isBn ? 'গ্রাহক ও ফোন' : 'Customer'}</th>
                    <th className="py-3 px-3">{isBn ? 'ঠিকানা' : 'Address'}</th>
                    <th className="py-3 px-3">{isBn ? 'পণ্য সমূহ' : 'Ordered Items'}</th>
                    <th className="py-3 px-3">{isBn ? 'পেমেন্ট' : 'Payment'}</th>
                    <th className="py-3 px-3">{isBn ? 'মূল্য' : 'Amount'}</th>
                    <th className="py-3 px-3">{isBn ? 'স্ট্যাটাস আপডেট' : 'Update Status'}</th>
                    <th className="py-3 px-3 rounded-r-lg text-right">{isBn ? 'অ্যাকশন' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c4c5d5]/20">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-8 text-sm text-[#757684]">
                        {isBn ? 'কোনো অর্ডার পাওয়া যায়নি।' : 'No matching orders found.'}
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-[#f2f3ff]/50 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-[#00288e]">{order.id}</td>
                        <td className="py-3 px-3">
                          <div className="font-bold text-[#131b2e]">{order.customerName}</div>
                          <div className="text-[10px] text-[#757684]">{order.phone}</div>
                        </td>
                        <td className="py-3 px-3 max-w-[160px] truncate" title={order.address}>
                          {order.address} ({order.city === 'dhaka' ? 'ঢাকা' : 'ঢাকার বাইরে'})
                        </td>
                        <td className="py-3 px-3">
                          {order.items.map((it, idx) => (
                            <div key={idx} className="truncate max-w-[150px]">
                              {it.quantity}x {it.product.name}
                            </div>
                          ))}
                        </td>
                        <td className="py-3 px-3 uppercase font-bold text-[10px]">{order.paymentMethod}</td>
                        <td className="py-3 px-3 font-bold text-[#a73a00]">
                          {formatPrice(order.total, isBn)}
                        </td>
                        <td className="py-3 px-3">
                          <select
                            value={order.status}
                            onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as OrderInfo['status'])}
                            className="bg-[#eaedff] text-[#00288e] font-bold text-[11px] px-2 py-1 rounded-md border border-[#c4c5d5]/30 focus:outline-none cursor-pointer"
                          >
                            <option value="confirmed">{isBn ? 'অর্ডার নিশ্চিত' : 'Confirmed'}</option>
                            <option value="packaging">{isBn ? 'প্যাকেজিং চলছে' : 'Packaging'}</option>
                            <option value="shipped">{isBn ? 'ডেলিভারিতে আছে' : 'Shipped'}</option>
                            <option value="delivered">{isBn ? 'ডেলিভারি সফল' : 'Delivered'}</option>
                          </select>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            type="button"
                            onClick={() => setInvoiceOrder(order)}
                            className="bg-[#00288e] text-white px-2.5 py-1 rounded-md font-bold text-[11px] hover:bg-[#1e40af] cursor-pointer"
                          >
                            {isBn ? 'ইনভয়েস' : 'Invoice'}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Products Management */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-2xl shadow-xs border border-[#c4c5d5]/30 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#c4c5d5]/20">
              <h4 className="text-base font-bold text-[#131b2e]">
                {isBn ? `পণ্য ক্যাটালগ (${products.length})` : `Products Catalog (${products.length})`}
              </h4>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder={isBn ? "পণ্য বা ব্র্যান্ড খুঁজুন..." : "Search products..."}
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="bg-[#f2f3ff] px-3 py-1.5 rounded-xl border border-[#c4c5d5]/40 text-xs focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() => setIsAddProductModalOpen(true)}
                  className="bg-[#fd651e] hover:bg-[#a73a00] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">add</span>
                  <span>{isBn ? 'নতুন পণ্য যোগ করুন' : 'Add Product'}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="p-3 rounded-xl border border-[#c4c5d5]/30 bg-[#f2f3ff]/40 flex gap-3 items-center justify-between group hover:border-[#00288e]/40 transition-all"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-16 h-16 object-cover rounded-lg bg-white p-1 border border-[#c4c5d5]/20 shrink-0"
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
                      onClick={() => {
                        const newP = prompt(isBn ? 'নতুন মূল্য লিখুন (টাকা):' : 'Enter new price (BDT):', String(p.price));
                        if (newP && !isNaN(Number(newP))) {
                          onUpdateProduct({ ...p, price: Number(newP) });
                        }
                      }}
                      className="text-[#00288e] bg-white p-1 rounded-md border border-[#c4c5d5]/30 hover:bg-[#eaedff] text-xs"
                      title={isBn ? "মূল্য পরিবর্তন" : "Edit Price"}
                    >
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(isBn ? `"${p.name}" পণ্যটি ডিলিট করতে চান?` : `Delete "${p.name}"?`)) {
                          onDeleteProduct(p.id);
                        }
                      }}
                      className="text-[#ba1a1a] bg-white p-1 rounded-md border border-[#c4c5d5]/30 hover:bg-[#ffdad6] text-xs"
                      title={isBn ? "মুছে ফেলুন" : "Delete"}
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Coupons Management */}
        {activeTab === 'coupons' && (
          <div className="bg-white rounded-2xl shadow-xs border border-[#c4c5d5]/30 p-5 space-y-6">
            <div>
              <h4 className="text-base font-bold text-[#131b2e] mb-1">
                {isBn ? 'কুপন ভাউচার ও ক্যাম্পেইন কনফিগারেশন' : 'Voucher & Promotion Setup'}
              </h4>
              <p className="text-xs text-[#757684]">
                {isBn ? 'স্টোরফ্রন্টে ডিসকাউন্ট কুপন যুক্ত ও নিয়ন্ত্রণ করুন।' : 'Create and toggle store discount codes.'}
              </p>
            </div>

            <form onSubmit={handleAddCoupon} className="flex gap-2 max-w-md">
              <input
                type="text"
                placeholder={isBn ? "নতুন কুপন কোড (যেমন EID50)" : "Coupon Code"}
                value={newCouponCode}
                onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                className="flex-1 bg-[#f2f3ff] px-3.5 py-2 rounded-xl border border-[#c4c5d5]/40 text-xs font-bold uppercase focus:outline-none"
              />
              <input
                type="number"
                placeholder="%"
                value={newCouponDiscount}
                onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                className="w-20 bg-[#f2f3ff] px-3 py-2 rounded-xl border border-[#c4c5d5]/40 text-xs font-bold text-center focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#00288e] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#1e40af] cursor-pointer"
              >
                {isBn ? 'তৈরি করুন' : 'Create'}
              </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {coupons.map((c) => (
                <div
                  key={c.code}
                  className="bg-[#f2f3ff] p-4 rounded-xl border border-[#c4c5d5]/30 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm text-[#00288e]">{c.code}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${c.active ? 'bg-[#85f8c4] text-[#003d28]' : 'bg-[#c4c5d5] text-white'}`}>
                      {c.active ? (isBn ? 'সক্রিয়' : 'Active') : (isBn ? 'বন্ধ' : 'Inactive')}
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className="text-2xl font-bold text-[#fd651e]">{c.discount}%</span>
                    <span className="text-xs text-[#757684] ml-1">{isBn ? 'ডিসকাউন্ট' : 'Off'}</span>
                  </div>
                  <div className="mt-2 text-[11px] text-[#444653]">
                    {isBn ? `ন্যূনতম অর্ডার: ৳${c.minSpend}` : `Min order: ৳${c.minSpend}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-[#c4c5d5]/40 max-w-xl w-full p-6 relative animate-in fade-in zoom-in-95 my-8">
            <button
              type="button"
              onClick={() => setIsAddProductModalOpen(false)}
              className="absolute top-4 right-4 text-[#757684] hover:text-[#131b2e] p-1.5 rounded-xl hover:bg-[#f2f3ff]"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            <h3 className="text-lg font-bold text-[#131b2e] mb-4">
              {isBn ? 'নতুন পণ্য ক্যাটালগে যুক্ত করুন' : 'Add New Product'}
            </h3>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#444653] mb-1">
                  {isBn ? 'পণ্যের নাম (বাংলা)' : 'Product Name (Bengali)'} *
                </label>
                <input
                  type="text"
                  required
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  placeholder="যেমন: ওয়্যারলেস ব্লুটুথ হেডফোন"
                  className="w-full bg-[#f2f3ff] px-3 py-2 rounded-xl border border-[#c4c5d5]/40 text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#444653] mb-1">
                    {isBn ? 'ব্র্যান্ড' : 'Brand'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    placeholder="Xiaomi / Realme / SoundPEATS"
                    className="w-full bg-[#f2f3ff] px-3 py-2 rounded-xl border border-[#c4c5d5]/40 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#444653] mb-1">
                    {isBn ? 'ক্যাটাগরি' : 'Category'}
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-[#f2f3ff] px-3 py-2 rounded-xl border border-[#c4c5d5]/40 text-xs focus:outline-none"
                  >
                    <option value="mobile-gadgets">মোবাইল ও গ্যাজেট</option>
                    <option value="computers-laptops">কম্পিউটার ও ল্যাপটপ</option>
                    <option value="electronics">ইলেকট্রনিক্স</option>
                    <option value="men-fashion">পুরুষ ও নারী ফ্যাশন</option>
                    <option value="shoes-bags">জুতা ও ব্যাগ</option>
                    <option value="smartwatch-watches">স্মার্টওয়াচ ও ঘড়ি</option>
                    <option value="beauty-care">বিউটি ও কেয়ার</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#444653] mb-1">
                    {isBn ? 'বিক্রয় মূল্য (টাকা)' : 'Selling Price (BDT)'} *
                  </label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full bg-[#f2f3ff] px-3 py-2 rounded-xl border border-[#c4c5d5]/40 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#444653] mb-1">
                    {isBn ? 'আসল মূল্য (স্ট্রাইক থ্রু)' : 'Original Price (BDT)'}
                  </label>
                  <input
                    type="number"
                    value={newOriginalPrice}
                    onChange={(e) => setNewOriginalPrice(Number(e.target.value))}
                    className="w-full bg-[#f2f3ff] px-3 py-2 rounded-xl border border-[#c4c5d5]/40 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#444653] mb-1">
                  {isBn ? 'ছবির লিংক (URL)' : 'Image URL'}
                </label>
                <input
                  type="text"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full bg-[#f2f3ff] px-3 py-2 rounded-xl border border-[#c4c5d5]/40 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#444653] mb-1">
                  {isBn ? 'বিবরণ' : 'Description'}
                </label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="পণ্য সম্পর্কে সংক্ষেপে লিখুন..."
                  className="w-full bg-[#f2f3ff] px-3 py-2 rounded-xl border border-[#c4c5d5]/40 text-xs focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#fd651e] hover:bg-[#a73a00] text-white py-2.5 rounded-xl font-bold text-xs shadow-md transition-colors cursor-pointer mt-2"
              >
                {isBn ? 'ক্যাটালগে সংরক্ষণ করুন' : 'Save to Catalog'}
              </button>
            </form>
          </div>
        </div>
      )}

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
                  <span>{isBn ? 'সর্বমোট মূল্য:' : 'Total Amount:'}</span>
                  <span>{formatPrice(invoiceOrder.total, isBn)}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                window.print();
              }}
              className="w-full bg-[#00288e] hover:bg-[#1e40af] text-white py-2 rounded-xl text-xs font-bold mt-4 transition-colors cursor-pointer"
            >
              {isBn ? 'প্রিন্ট ইনভয়েস' : 'Print Invoice'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
