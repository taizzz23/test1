import React, { useState, useEffect } from 'react';
import { X, Star, CheckCircle, ShoppingCart, CreditCard } from 'lucide-react';

export default function ProductDetailModal({ product, onClose, onAddToCart, onBuyNow }) {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' or 'highlights'

  // Initialize selections when product changes
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedStorage(product.storages[0]);
      setActiveTab('specs');
    }
  }, [product]);

  if (!product || !selectedColor || !selectedStorage) return null;

  // Calculate dynamic price based on storage offset
  const finalPrice = product.price + selectedStorage.priceOffset;
  const originalFinalPrice = product.originalPrice 
    ? product.originalPrice + selectedStorage.priceOffset 
    : null;

  const formatPrice = (value) => {
    return value.toLocaleString('vi-VN') + ' đ';
  };

  const handleAddToCartClick = () => {
    onAddToCart({
      id: product.id,
      name: product.name,
      price: finalPrice,
      color: selectedColor.name,
      storage: selectedStorage.size,
      colorHex: selectedColor.hex,
      image: product.image
    });
  };

  const handleBuyNowClick = () => {
    onBuyNow({
      id: product.id,
      name: product.name,
      price: finalPrice,
      color: selectedColor.name,
      storage: selectedStorage.size,
      colorHex: selectedColor.hex,
      image: product.image
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel modal-content" 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close details"
        >
          <X size={20} />
        </button>

        <div className="modal-grid">
          {/* Visual Side */}
          <div className="modal-visual-side">
            <div className="modal-visual-preview">
              {/* Backglow ring matching selected color */}
              <div 
                style={{
                  position: 'absolute',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${selectedColor.hex}50 0%, transparent 70%)`,
                  filter: 'blur(15px)',
                  opacity: 0.8,
                  zIndex: 1
                }}
              />
              
              {/* Real device image */}
              <img 
                src={product.image} 
                alt={product.name} 
                className="product-image animate-float"
                style={{
                  height: '280px',
                  objectFit: 'contain',
                  zIndex: 2,
                  filter: 'drop-shadow(0 20px 25px rgba(0,0,0,0.5))'
                }}
              />
            </div>

            {/* Color selection */}
            <div className="modal-colors-selection">
              <div className="selection-title">Màu sắc: <span style={{ color: '#fff', fontWeight: '600' }}>{selectedColor.name}</span></div>
              <div className="color-dots-wrapper">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    className={`color-dot-btn ${selectedColor.name === color.name ? 'active' : ''}`}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select color ${color.name}`}
                  >
                    <div 
                      className="color-dot-inner" 
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="color-dot-tooltip">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Info Side */}
          <div className="modal-info-side">
            <span className="modal-brand">{product.brand}</span>
            <h2 className="modal-title">{product.name}</h2>

            <div className="modal-rating-row">
              <div className="stars-list">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                  />
                ))}
              </div>
              <span>{product.rating} / 5 ({product.reviewCount} đánh giá)</span>
            </div>

            <div className="modal-price-row">
              <span className="modal-price-current">{formatPrice(finalPrice)}</span>
              {originalFinalPrice && (
                <>
                  <span className="modal-price-original">{formatPrice(originalFinalPrice)}</span>
                  <span className="modal-price-discount">-{product.discount}%</span>
                </>
              )}
            </div>

            {/* Storage Selection */}
            <div className="modal-storages-selection">
              <div className="selection-title">Dung lượng bộ nhớ:</div>
              <div className="storage-options-grid">
                {product.storages.map((storage, index) => (
                  <button
                    key={index}
                    className={`storage-option-btn ${selectedStorage.size === storage.size ? 'active' : ''}`}
                    onClick={() => setSelectedStorage(storage)}
                  >
                    {storage.size}
                  </button>
                ))}
              </div>
            </div>
            <p className="modal-description">{product.description}</p>

            {/* Tabs details */}
            <div className="modal-tabs">
              <button
                className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
                onClick={() => setActiveTab('specs')}
              >
                Thông số kỹ thuật
              </button>
              <button
                className={`tab-btn ${activeTab === 'highlights' ? 'active' : ''}`}
                onClick={() => setActiveTab('highlights')}
              >
                Đặc điểm nổi bật
              </button>
            </div>

            <div className="tab-pane">
              {activeTab === 'specs' ? (
                <table className="specs-table">
                  <tbody>
                    <tr>
                      <td className="specs-label">Màn hình</td>
                      <td className="specs-val">{product.specs.screen}</td>
                    </tr>
                    <tr>
                      <td className="specs-label">Vi xử lý (CPU)</td>
                      <td className="specs-val">{product.specs.cpu}</td>
                    </tr>
                    <tr>
                      <td className="specs-label">Bộ nhớ RAM</td>
                      <td className="specs-val">{product.specs.ram}</td>
                    </tr>
                    <tr>
                      <td className="specs-label">Dung lượng pin</td>
                      <td className="specs-val">{product.specs.battery}</td>
                    </tr>
                    <tr>
                      <td className="specs-label">Hệ thống Camera</td>
                      <td className="specs-val">{product.specs.camera}</td>
                    </tr>
                    <tr>
                      <td className="specs-label">Hệ điều hành</td>
                      <td className="specs-val">{product.specs.os}</td>
                    </tr>
                    <tr>
                      <td className="specs-label">Trọng lượng</td>
                      <td className="specs-val">{product.specs.weight}</td>
                    </tr>
                    <tr>
                      <td className="specs-label">Chất liệu</td>
                      <td className="specs-val">{product.specs.material}</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <ul className="highlights-list">
                  {product.highlights.map((highlight, index) => (
                    <li key={index}>
                      <CheckCircle size={16} />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Actions */}
            <div className="modal-actions">
              <button 
                className="btn btn-secondary"
                onClick={handleAddToCartClick}
              >
                <ShoppingCart size={18} />
                Thêm Vào Giỏ Hàng
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleBuyNowClick}
              >
                <CreditCard size={18} />
                Mua Ngay
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
