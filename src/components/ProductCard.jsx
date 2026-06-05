import React from 'react';
import { Star, Eye } from 'lucide-react';

export default function ProductCard({ product, onViewDetails }) {
  // Format price in VND
  const formatPrice = (value) => {
    return value.toLocaleString('vi-VN') + ' đ';
  };

  // Determine badge styling based on product brand or badge text
  const getBadgeClass = (badge) => {
    if (!badge) return '';
    const text = badge.toLowerCase();
    if (text.includes('sale') || text.includes('seller')) return 'badge-sale';
    if (text.includes('ai')) return 'badge-ai';
    if (text.includes('leica') || text.includes('camera') || text.includes('creator')) return 'badge-camera';
    return 'badge-tech';
  };

  // Get active color hex (first color by default)
  const mainColorHex = product.colors[0]?.hex || '#333';

  return (
    <div className="glass-panel product-card glow-hover">
      {product.badge && (
        <span className={`card-badge ${getBadgeClass(product.badge)}`}>
          {product.badge}
        </span>
      )}

      <div className="product-image-area">
        {/* CSS Mockup representing the phone visually */}
        <div 
          className="phone-mockup"
          style={{ 
            backgroundColor: '#0c0d12', 
            borderColor: mainColorHex,
            boxShadow: `0 10px 25px rgba(0,0,0,0.5), 0 0 15px ${mainColorHex}30`
          }}
        >
          <div className="phone-screen" style={{ border: `1px solid ${mainColorHex}20` }}>
            <div className="phone-camera-notch"></div>
            <div className="phone-screen-logo" style={{ color: mainColorHex }}>
              {product.brand}
            </div>
            <div className="phone-screen-spec">
              {product.specs.ram} RAM
            </div>
            <div 
              style={{
                width: '100%',
                height: '4px',
                background: `linear-gradient(90deg, transparent, ${mainColorHex}, transparent)`,
                position: 'absolute',
                bottom: '30px',
                left: 0,
                opacity: 0.7
              }}
            />
          </div>
        </div>
      </div>

      <div className="card-rating">
        <Star size={14} fill="currentColor" />
        <span style={{ fontWeight: '600', color: '#fff' }}>{product.rating}</span>
        <span style={{ color: 'var(--text-muted)' }}>({product.reviewCount})</span>
      </div>

      <h3>{product.name}</h3>
      <div className="product-brand">{product.brand}</div>

      <div className="product-card-bottom">
        <div className="price-box">
          <span className="price-current">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="price-original">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        <button 
          className="card-action-btn"
          onClick={() => onViewDetails(product)}
          title="Xem chi tiết"
          aria-label="View product details"
        >
          <Eye size={18} />
        </button>
      </div>
    </div>
  );
}
