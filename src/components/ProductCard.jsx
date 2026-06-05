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
        {/* Glow backdrop matching phone color */}
        <div 
          style={{ 
            position: 'absolute', 
            width: '130px', 
            height: '130px', 
            borderRadius: '50%', 
            background: `radial-gradient(circle, ${mainColorHex}40 0%, transparent 70%)`, 
            filter: 'blur(10px)',
            zIndex: 1 
          }} 
        />
        
        {/* Real phone image */}
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image"
          style={{
            height: '180px',
            objectFit: 'contain',
            zIndex: 2,
            transition: 'var(--transition)',
            filter: 'drop-shadow(0 12px 20px rgba(0,0,0,0.5))'
          }}
        />
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
          className="btn btn-primary"
          onClick={() => onViewDetails(product)}
          style={{ padding: '8px 16px', fontSize: '13px', borderRadius: '8px' }}
        >
          Xem chi tiết
        </button>
      </div>
    </div>
  );
}
