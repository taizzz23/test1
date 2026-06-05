import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import ProductCatalog from './components/ProductCatalog';
import ProductDetailModal from './components/ProductDetailModal';
import Footer from './components/Footer';
import { products } from './data/products';
import { Check } from 'lucide-react';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [cart, setCart] = useState([]);
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

  const handleAddToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
    triggerToast(`Đã thêm ${item.name} (${item.storage}) vào giỏ hàng!`);
  };

  const handleCartClick = () => {
    if (cart.length === 0) {
      triggerToast("Giỏ hàng của bạn đang trống!");
      return;
    }
    const cartSummary = cart.map(item => `- ${item.name} (${item.storage} - ${item.color})`).join('\n');
    alert(`Giỏ hàng của bạn có ${cart.length} sản phẩm:\n\n${cartSummary}\n\nĐây là trang web demo.`);
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

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header Navigation */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        cartCount={cart.length}
        onCartClick={handleCartClick}
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
