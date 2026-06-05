import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import ProductCatalog from './components/ProductCatalog';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import Footer from './components/Footer';
import { products } from './data/products';
import { Check } from 'lucide-react';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Monitor scroll to update active navbar section highlight
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      const homeSection = document.getElementById('home');
      const productsSection = document.getElementById('products');
      const aboutSection = document.getElementById('about');

      if (aboutSection && scrollPosition >= aboutSection.offsetTop) {
        setActiveSection('about');
      } else if (productsSection && scrollPosition >= productsSection.offsetTop) {
        setActiveSection('products');
      } else if (homeSection) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Display floating toast message
  const triggerToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (newItem) => {
    setCart((prevCart) => {
      // Check if item already exists in cart with same id, storage, and color
      const existingItemIndex = prevCart.findIndex(
        (item) => 
          item.id === newItem.id && 
          item.storage === newItem.storage && 
          item.color === newItem.color
      );

      if (existingItemIndex > -1) {
        // Increment quantity of existing item
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        // Add new item with quantity of 1
        return [...prevCart, { ...newItem, quantity: 1 }];
      }
    });

    triggerToast(`Đã thêm ${newItem.name} vào giỏ hàng!`);
  };

  const handleQuantityChange = (index, change) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const targetItem = updatedCart[index];
      const newQty = targetItem.quantity + change;

      if (newQty < 1) {
        // Remove item if quantity falls below 1
        return prevCart.filter((_, i) => i !== index);
      } else {
        // Adjust quantity
        updatedCart[index] = { ...targetItem, quantity: newQty };
        return updatedCart;
      }
    });
  };

  const handleRemoveItem = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    triggerToast("Đã xóa sản phẩm khỏi giỏ hàng!");
  };

  const handleCheckoutTrigger = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = () => {
    setCart([]);
    setIsCheckoutOpen(false);
    triggerToast("Đặt hàng thành công! Đang xử lý đơn hàng...");
  };

  const handleBuyNow = (newItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => 
          item.id === newItem.id && 
          item.storage === newItem.storage && 
          item.color === newItem.color
      );

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, { ...newItem, quantity: 1 }];
      }
    });

    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleFooterLinkClick = (e, sectionId) => {
    e.preventDefault();
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Calculate total number of items in the cart
  const cartTotalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header Navigation */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        cartCount={cartTotalItems}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Main Pages Content */}
      <main style={{ flex: '1' }}>
        {/* Banner Promotion Hero */}
        <HeroBanner />

        {/* Product Catalog Display (10 items) */}
        <ProductCatalog
          products={products}
          onViewDetails={setSelectedProduct}
        />
      </main>

      {/* Footer Info & Introduction */}
      <Footer onLinkClick={handleFooterLinkClick} />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />
      )}

      {/* Sliding Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onQuantityChange={handleQuantityChange}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckoutTrigger}
      />

      {/* Checkout Screen Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          cart={cart}
          onClose={() => setIsCheckoutOpen(false)}
          onOrderSuccess={handleOrderSuccess}
        />
      )}

      {/* Success Notification Alert */}
      {toastMessage && (
        <div className="toast">
          <Check size={16} />
          <span className="toast-message">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
