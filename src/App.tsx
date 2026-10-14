import React, { useState } from 'react';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminPanel } from './components/AdminPanel';
import { AppDownloadBanner } from './components/AppDownloadBanner';
import { CartDrawer } from './components/CartDrawer';
import { CashbackModal } from './components/CashbackModal';
import { CategoryShowcase } from './components/CategoryShowcase';
import { CheckoutModal } from './components/CheckoutModal';
import { CustomerAuthModal } from './components/CustomerAuthModal';
import { CustomerPanel, CustomerProfile } from './components/CustomerPanel';
import { ExchangeModal } from './components/ExchangeModal';
import { FeaturedProducts } from './components/FeaturedProducts';
import { FlashSale } from './components/FlashSale';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ProfileModal } from './components/ProfileModal';
import { Testimonials } from './components/Testimonials';
import { TickerNotice } from './components/TickerNotice';
import { Toast } from './components/Toast';
import { ValueStrip } from './components/ValueStrip';
import { WishlistModal } from './components/WishlistModal';
import {
  allProducts,
  defaultCartItems,
} from './data/mockData';
import { CartItem, OrderInfo, Product } from './types';

export default function App() {
  const [lang, setLang] = useState<'bn' | 'en'>('bn');
  const isBn = lang === 'bn';

  // Products state (can be updated by Admin)
  const [productsList, setProductsList] = useState<Product[]>(allProducts);

  // Admin Auth & View state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  // Customer Auth & Panel state
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(true);
  const [isCustomerPanelView, setIsCustomerPanelView] = useState(false);
  const [isCustomerAuthModalOpen, setIsCustomerAuthModalOpen] = useState(false);
  const [customerUser, setCustomerUser] = useState<CustomerProfile>({
    name: 'সোলাইমান আহমেদ',
    nameEn: 'Solaiman Ahmed',
    phone: '০১৭১২-৩৪৫৬৭৮',
    email: 'solaiman@smartshopbd.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8Xj8ivkFUep8KYfBR9sWPY-cx98_lEqvPSl3BC5Qn3PpB4sqX3ltQHp3eB04uQH0zvbMS8FdILhs6LN9IOxP4JZfU8pk7yTAeNS1J7ptdhBaegFlCtyj590xAumGLdlHquOk1AAKGwoN4Wow2ERXQkzQrAk6ExvMB4gOV6jC94lDKlMKi0RFsbih3Fuf2hDEtXaVo_I10SlLgSl0Qqb4ZLJze4eBgAQo19G9OVVP0ntnePLG1yqQZ0S40XU5CWE3IedAtAo7LMYXsDEs',
    memberTier: 'গোল্ড মেম্বার',
    points: 450,
    walletBalance: 200,
  });

  // Cart & Wishlist state
  const [cartItems, setCartItems] = useState<CartItem[]>(defaultCartItems);
  const [wishlistIds, setWishlistIds] = useState<string[]>([
    'feat-1',
    'feat-2',
    'flash-3',
  ]);
  const [isCartOpen, setIsCartOpen] = useState(true);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
  const [isCashbackModalOpen, setIsCashbackModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSearchCategory, setSelectedSearchCategory] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [voucherCode, setVoucherCode] = useState('');
  const [isVoucherApplied, setIsVoucherApplied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [orders, setOrders] = useState<OrderInfo[]>([
    {
      id: 'SSBD-249018',
      customerName: 'সোলাইমান আহমেদ',
      phone: '০১৭১২-৩৪৫৬৭৮',
      address: 'ধানমন্ডি, রোড ৫, বাড়ি ১২, ঢাকা-১২০৫',
      city: 'dhaka',
      paymentMethod: 'cod',
      items: defaultCartItems,
      subtotal: 3040,
      discount: 0,
      deliveryFee: 60,
      total: 3100,
      status: 'packaging',
      createdAt: 'আজ, দুপুর ১২:৩০',
    },
    {
      id: 'SSBD-184920',
      customerName: 'আহমেদ হাসান',
      phone: '০১৭৩৩-৯৮৭৬৫৪',
      address: 'মিরপুর-১০, রোড ২, বাসা ১৫, ঢাকা',
      city: 'dhaka',
      paymentMethod: 'bkash',
      items: [{ product: productsList[0], quantity: 1 }],
      subtotal: 15990,
      discount: 1599,
      deliveryFee: 60,
      total: 14451,
      status: 'shipped',
      createdAt: 'গতকাল, বিকেল ৪:১৫',
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Customer Auth Handlers
  const handleCustomerLoginSuccess = (data: { name: string; phone: string; email: string }) => {
    setCustomerUser((prev) => ({
      ...prev,
      name: data.name,
      phone: data.phone,
      email: data.email,
    }));
    setIsCustomerLoggedIn(true);
    setIsCustomerPanelView(true);
    showToast(isBn ? `স্বাগতম ${data.name}! কাস্টমার ড্যাশবোর্ডে প্রবেশ করেছেন।` : `Welcome back ${data.name}!`);
  };

  const handleCustomerLogout = () => {
    setIsCustomerLoggedIn(false);
    setIsCustomerPanelView(false);
    showToast(isBn ? 'সফলভাবে কাস্টমার অ্যাকাউন্ট থেকে লগআউট করা হয়েছে।' : 'Customer logged out successfully.');
  };

  const handleUpdateCustomer = (updated: Partial<CustomerProfile>) => {
    setCustomerUser((prev) => ({ ...prev, ...updated }));
    showToast(isBn ? 'প্রোফাইল তথ্য সফলভাবে আপডেট হয়েছে!' : 'Profile updated successfully!');
  };

  const handleCancelOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    showToast(isBn ? `অর্ডার #${orderId} সফলভাবে বাতিল করা হয়েছে` : `Order #${orderId} cancelled`);
  };

  const handleReOrder = (items: CartItem[]) => {
    items.forEach((item) => {
      handleAddToCart(item.product, item.quantity, item.selectedColor);
    });
    setIsCustomerPanelView(false);
    setIsCartOpen(true);
    showToast(isBn ? 'পুনরায় কার্টে পণ্য যুক্ত করা হয়েছে' : 'Items added to cart for reorder');
  };

  // Admin Actions
  const handleOpenAdmin = () => {
    if (isAdminLoggedIn) {
      setIsAdminView(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setIsAdminView(true);
    showToast(isBn ? 'স্বাগতম! সফলভাবে অ্যাডমিন প্যানেলে লগইন হয়েছে।' : 'Welcome! Successfully logged into Admin Panel.');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setIsAdminView(false);
    showToast(isBn ? 'অ্যাডমিন অ্যাকাউন্ট থেকে সফলভাবে লগআউট করা হয়েছে।' : 'Admin logged out successfully.');
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderInfo['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(isBn ? `অর্ডার #${orderId} এর স্ট্যাটাস আপডেট করা হয়েছে` : `Order #${orderId} status updated`);
  };

  const handleAddProduct = (newProd: Product) => {
    setProductsList((prev) => [newProd, ...prev]);
    showToast(isBn ? `"${newProd.name}" নতুন পণ্য ক্যাটালগে যুক্ত হয়েছে!` : `Product added to catalog!`);
  };

  const handleUpdateProduct = (updated: Product) => {
    setProductsList((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    showToast(isBn ? `পণ্য তথ্য আপডেট হয়েছে` : `Product updated`);
  };

  const handleDeleteProduct = (productId: string) => {
    setProductsList((prev) => prev.filter((p) => p.id !== productId));
    showToast(isBn ? `পণ্যটি ক্যাটালগ থেকে মুছে ফেলা হয়েছে` : `Product removed from catalog`);
  };

  // Cart operations
  const handleAddToCart = (
    product: Product,
    quantity: number = 1,
    selectedColor?: string
  ) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedColor: selectedColor || product.colors?.[0] }];
    });
    setIsCartOpen(true);
    showToast(
      isBn
        ? `"${product.name.slice(0, 20)}..." কার্টে যোগ করা হয়েছে`
        : `Added to cart successfully`
    );
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast(isBn ? 'কার্ট থেকে মুছে ফেলা হয়েছে' : 'Removed from cart');
  };

  const handleApplyVoucher = (code: string) => {
    if (code.trim().toUpperCase() === 'SMART2025') {
      setIsVoucherApplied(true);
      setVoucherCode('SMART2025');
      showToast(isBn ? '🎉 SMART2025 কুপনে ১০% ছাড় যোগ হয়েছে!' : '10% discount coupon applied!');
    } else {
      showToast(isBn ? '❌ সঠিক কুপন কোড লিখুন (SMART2025)' : 'Invalid coupon code (Use SMART2025)');
    }
  };

  const handleCopyVoucher = (code: string) => {
    navigator.clipboard?.writeText(code);
    handleApplyVoucher(code);
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast(isBn ? 'পছন্দের তালিকা থেকে সরানো হয়েছে' : 'Removed from wishlist');
        return prev.filter((id) => id !== productId);
      }
      showToast(isBn ? 'পছন্দের তালিকায় যুক্ত হয়েছে' : 'Added to wishlist');
      return [...prev, productId];
    });
  };

  const handleBuyNow = (
    product: Product,
    quantity: number = 1,
    selectedColor?: string
  ) => {
    handleAddToCart(product, quantity, selectedColor);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderPlaced = (order: OrderInfo) => {
    setOrders((prev) => [order, ...prev]);
    setCartItems([]);
    showToast(isBn ? '🎉 অভিনন্দন! অর্ডার সম্পন্ন হয়েছে' : 'Order placed successfully!');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const el = document.getElementById('featured-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    showToast(
      isBn ? `"${searchQuery}" এর জন্য পণ্য দেখানো হচ্ছে` : `Showing results for "${searchQuery}"`
    );
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Filter products for storefront
  const flashSaleItems = productsList.filter((p) => p.isFlashDeal);
  const regularItems = productsList.filter((p) => !p.isFlashDeal);

  const filteredStoreProducts = regularItems.filter((p) => {
    const matchesSearch =
      !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSearchCat =
      selectedSearchCategory === 'all' || p.category === selectedSearchCategory;

    return matchesSearch && matchesSearchCat;
  });

  const wishlistProducts = productsList.filter((p) => wishlistIds.includes(p.id));

  // 1. If Admin View is active, render Admin Dashboard
  if (isAdminView) {
    return (
      <div className="min-h-screen bg-[#f2f3ff] text-[#131b2e] flex flex-col antialiased">
        <Toast message={toastMessage} />
        <AdminPanel
          products={productsList}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          orders={orders}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onLogout={handleAdminLogout}
          onBackToStore={() => setIsAdminView(false)}
          lang={lang}
        />
      </div>
    );
  }

  // 2. If Customer Panel View is active, render dedicated Customer Portal!
  if (isCustomerPanelView) {
    return (
      <div className="min-h-screen bg-[#f2f3ff] text-[#131b2e] flex flex-col antialiased">
        <Toast message={toastMessage} />
        <CustomerPanel
          customer={customerUser}
          onUpdateCustomer={handleUpdateCustomer}
          orders={orders}
          onCancelOrder={handleCancelOrder}
          onTrackOrder={(orderId) => {
            setIsCustomerPanelView(false);
            setIsOrderTrackingOpen(true);
          }}
          onReOrder={handleReOrder}
          wishlistProducts={wishlistProducts}
          onRemoveWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onBackToStore={() => setIsCustomerPanelView(false)}
          onLogout={handleCustomerLogout}
          lang={lang}
        />
      </div>
    );
  }

  // 3. Storefront Main View
  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col antialiased">
      {/* Toast Alert */}
      <Toast message={toastMessage} />

      {/* Main Header */}
      <Header
        cartItems={cartItems}
        wishlistIds={wishlistIds}
        lang={lang}
        setLang={setLang}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenTrackOrder={() => setIsOrderTrackingOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          scrollToSection('featured-section');
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedSearchCategory={selectedSearchCategory}
        setSelectedSearchCategory={setSelectedSearchCategory}
        onSearchSubmit={handleSearchSubmit}
        onScrollToSection={scrollToSection}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdmin={handleOpenAdmin}
        isCustomerLoggedIn={isCustomerLoggedIn}
        customerName={customerUser.name}
        customerAvatar={customerUser.avatar}
        onOpenCustomerPanel={() => setIsCustomerPanelView(true)}
        onOpenCustomerAuth={() => setIsCustomerAuthModalOpen(true)}
      />

      <main className="flex-1 w-full flex flex-col">
        {/* Ticker Notice Bar */}
        <TickerNotice onCopyVoucher={handleCopyVoucher} lang={lang} />

        {/* Section 1: Hero Container */}
        <HeroSection
          onSelectCategory={(catId) => {
            setSelectedCategory(catId);
            scrollToSection('featured-section');
          }}
          onExploreOffers={() => scrollToSection('flash-sale-section')}
          onOpenExchangeModal={() => setIsExchangeModalOpen(true)}
          onOpenCashbackModal={() => setIsCashbackModalOpen(true)}
          onCopyVoucher={handleCopyVoucher}
          lang={lang}
        />

        {/* Section 2: Trust & Value Strip */}
        <ValueStrip lang={lang} />

        {/* Section 3: Flash Sale Deals */}
        <FlashSale
          products={flashSaleItems.length > 0 ? flashSaleItems : productsList.slice(0, 5)}
          onAddToCart={handleAddToCart}
          onQuickView={(p) => setQuickViewProduct(p)}
          lang={lang}
        />

        {/* Section 4: Popular Categories Showcase */}
        <CategoryShowcase
          onSelectCategory={(catId) => {
            setSelectedCategory(catId);
            scrollToSection('featured-section');
          }}
          selectedCategory={selectedCategory}
          lang={lang}
        />

        {/* Section 5: Featured & Popular Products */}
        <FeaturedProducts
          products={searchQuery ? filteredStoreProducts : regularItems}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onQuickView={(p) => setQuickViewProduct(p)}
          selectedCategory={selectedCategory}
          lang={lang}
        />

        {/* Section 6: App Download Banner */}
        <AppDownloadBanner
          onNotifyInstall={(platform) =>
            showToast(
              isBn
                ? `${platform} থেকে স্মার্টশপ অ্যাপ ডাউনলোড শুরু হচ্ছে...`
                : `Downloading SmartShop App from ${platform}...`
            )
          }
          lang={lang}
        />

        {/* Section 7: Customer Testimonials */}
        <Testimonials lang={lang} />
      </main>

      {/* Footer */}
      <Footer
        onNotifyInstall={(platform) =>
          showToast(
            isBn
              ? `${platform} অ্যাপ ডাউনলোড লিংক প্রস্তুত`
              : `${platform} app download link ready`
          )
        }
        lang={lang}
      />

      {/* Floating Cart Drawer (Bottom Right) */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        voucherCode={voucherCode}
        setVoucherCode={setVoucherCode}
        isVoucherApplied={isVoucherApplied}
        onApplyVoucher={handleApplyVoucher}
        lang={lang}
      />

      {/* Re-open Cart floating trigger button when drawer is closed */}
      {!isCartOpen && (
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="fixed right-6 bottom-6 z-40 bg-[#fd651e] hover:bg-[#a73a00] text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95"
          title={isBn ? "কার্ট খুলুন" : "Open Cart"}
        >
          <span className="material-symbols-outlined text-2xl">shopping_bag</span>
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#00288e] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white">
              {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          )}
        </button>
      )}

      {/* Customer Auth Modal (Login / Register) */}
      <CustomerAuthModal
        isOpen={isCustomerAuthModalOpen}
        onClose={() => setIsCustomerAuthModalOpen(false)}
        onLoginSuccess={handleCustomerLoginSuccess}
        lang={lang}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
        lang={lang}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        isVoucherApplied={isVoucherApplied}
        onOrderPlaced={handleOrderPlaced}
        lang={lang}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isOrderTrackingOpen}
        onClose={() => setIsOrderTrackingOpen(false)}
        recentOrder={orders[0] || null}
        lang={lang}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        lang={lang}
      />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        orders={orders}
        onTrackOrder={() => {
          setIsProfileOpen(false);
          setIsOrderTrackingOpen(true);
        }}
        onOpenAdmin={handleOpenAdmin}
        isAdminLoggedIn={isAdminLoggedIn}
        lang={lang}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        lang={lang}
      />

      {/* Exchange Modal */}
      <ExchangeModal
        isOpen={isExchangeModalOpen}
        onClose={() => setIsExchangeModalOpen(false)}
        lang={lang}
      />

      {/* Cashback Modal */}
      <CashbackModal
        isOpen={isCashbackModalOpen}
        onClose={() => setIsCashbackModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
