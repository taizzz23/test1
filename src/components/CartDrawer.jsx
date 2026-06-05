import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cart, onQuantityChange, onRemoveItem, onCheckout }) {
  const formatPrice = (value) => {
    return value.toLocaleString('vi-VN') + ' đ';
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <>
      {/* Dark Blur Overlay */}
      <div 
        className={`cart-drawer-overlay ${isOpen ? 'open' : ''}`} 
        onClick={onClose} 
      />

      {/* Slide-out Drawer Panel */}
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} className="gradient-text" />
            <h3>Giỏ Hàng ({cart.length})</h3>
          </div>
          <button 
            className="cart-close-btn" 
            onClick={onClose}
            aria-label="Close cart drawer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="cart-items-list">
          {cart.length === 0 ? (
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '70%',
                color: 'var(--text-secondary)',
                gap: '16px',
                textAlign: 'center'
              }}
            >
              <ShoppingBag size={48} style={{ opacity: 0.3 }} />
              <p>Giỏ hàng của bạn đang trống.</p>
              <button className="btn btn-secondary" onClick={onClose} style={{ fontSize: '13px', padding: '8px 16px' }}>
                Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            cart.map((item, index) => (
              <div className="cart-item animate-fade-in" key={index}>
                {/* Visual tiny device casing matching selection color */}
                <div 
                  className="cart-item-image-wrapper"
                  style={{ 
                    width: '55px', 
                    height: '95px', 
                    borderRadius: '8px', 
                    border: `1px solid ${item.colorHex || 'var(--border-color)'}`,
                    background: 'rgba(255, 255, 255, 0.02)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '6px',
                    flexShrink: 0
                  }}
                >
                  <img 
                    src={item.image} 
                    alt={item.name}
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))'
                    }}
                  />
                </div>

                <div className="cart-item-details">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-variant">{item.storage} | {item.color}</span>
                  
                  <div className="cart-item-row">
                    <div className="cart-qty-control">
                      <button 
                        className="cart-qty-btn"
                        onClick={() => onQuantityChange(index, -1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="cart-qty-val">{item.quantity}</span>
                      <button 
                        className="cart-qty-btn"
                        onClick={() => onQuantityChange(index, 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="cart-item-price">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                </div>

                <button 
                  className="cart-item-remove"
                  onClick={() => onRemoveItem(index)}
                  title="Xóa sản phẩm"
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary-row">
              <span className="cart-total-label">Tổng cộng:</span>
              <span className="cart-total-val">{formatPrice(calculateTotal())}</span>
            </div>
            <button 
              className="btn btn-primary"
              onClick={onCheckout}
            >
              Tiến Hành Thanh Toán
            </button>
          </div>
        )}
      </div>
    </>
  );
}
