import React, { useState } from 'react';
import { X, CreditCard, Truck, Wallet, CheckCircle2, QrCode } from 'lucide-react';

export default function CheckoutModal({ cart, onClose, onOrderSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    paymentMethod: 'cod' // 'cod', 'qr', 'momo'
  });
  
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const formatPrice = (value) => {
    return value.toLocaleString('vi-VN') + ' đ';
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ tên';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Số điện thoại phải gồm đúng 10 số';
    }
    if (!formData.address.trim()) newErrors.address = 'Vui lòng nhập địa chỉ giao hàng';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Generate random order ID
    const randomId = 'GT' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);
    setIsSuccess(true);
  };

  const handleComplete = () => {
    onOrderSuccess(); // Clears cart and closes modal
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel modal-content"
        style={{ maxWidth: '600px', padding: '28px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {!isSuccess && (
          <button 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close checkout"
          >
            <X size={18} />
          </button>
        )}

        {!isSuccess ? (
          /* Step 1: Checkout Form */
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '24px' }}>
              Thông Tin Thanh Toán
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="checkout-form-group">
                <label htmlFor="fullName">Họ và tên người nhận</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Ví dụ: Nguyễn Văn A"
                  className="checkout-input"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  style={{ borderColor: errors.fullName ? '#ef4444' : '' }}
                />
                {errors.fullName && <span style={{ color: '#ef4444', fontSize: '11px', textAlign: 'left' }}>{errors.fullName}</span>}
              </div>

              <div className="checkout-form-group">
                <label htmlFor="phone">Số điện thoại liên hệ</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Ví dụ: 0987654321"
                  className="checkout-input"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={{ borderColor: errors.phone ? '#ef4444' : '' }}
                />
                {errors.phone && <span style={{ color: '#ef4444', fontSize: '11px', textAlign: 'left' }}>{errors.phone}</span>}
              </div>

              <div className="checkout-form-group">
                <label htmlFor="address">Địa chỉ nhận hàng</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Số nhà, tên đường, phường, quận/huyện, thành phố"
                  className="checkout-input"
                  value={formData.address}
                  onChange={handleInputChange}
                  style={{ borderColor: errors.address ? '#ef4444' : '' }}
                />
                {errors.address && <span style={{ color: '#ef4444', fontSize: '11px', textAlign: 'left' }}>{errors.address}</span>}
              </div>

              {/* Payment Methods */}
              <div className="checkout-form-group" style={{ marginTop: '20px' }}>
                <label>Phương thức thanh toán</label>
                <div className="payment-methods-grid">
                  <div 
                    className={`payment-method-card ${formData.paymentMethod === 'cod' ? 'active' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cod' }))}
                  >
                    <Truck size={20} />
                    <span className="payment-method-title">COD (Nhận hàng)</span>
                  </div>

                  <div 
                    className={`payment-method-card ${formData.paymentMethod === 'qr' ? 'active' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'qr' }))}
                  >
                    <CreditCard size={20} />
                    <span className="payment-method-title">Chuyển khoản QR</span>
                  </div>

                  <div 
                    className={`payment-method-card ${formData.paymentMethod === 'momo' ? 'active' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'momo' }))}
                  >
                    <Wallet size={20} />
                    <span className="payment-method-title">Ví MoMo</span>
                  </div>
                </div>
              </div>

              {/* QR Bank Transfer Section */}
              {formData.paymentMethod === 'qr' && (
                <div className="animate-fade-in" style={{ marginTop: '16px' }}>
                  <div className="qr-code-box">
                    <div className="qr-code-placeholder">
                      <QrCode size={48} style={{ marginBottom: '8px', color: '#111' }} />
                      <span>GIGATECH QR PAY</span>
                    </div>
                    <span style={{ fontSize: '10px', color: '#666', marginTop: '6px', fontWeight: 'bold' }}>Quét để thanh toán nhanh</span>
                  </div>

                  <div className="transfer-info-box">
                    <div className="transfer-info-row">
                      <span>Ngân hàng:</span>
                      <span>Vietcombank</span>
                    </div>
                    <div className="transfer-info-row">
                      <span>Số tài khoản:</span>
                      <span>1023456789</span>
                    </div>
                    <div className="transfer-info-row">
                      <span>Chủ tài khoản:</span>
                      <span>CONG TY GIGATECH SMARTPHONE</span>
                    </div>
                    <div className="transfer-info-row">
                      <span>Số tiền:</span>
                      <span style={{ color: 'var(--accent-cyan)' }}>{formatPrice(calculateTotal())}</span>
                    </div>
                    <div className="transfer-info-row">
                      <span>Nội dung chuyển khoản:</span>
                      <span>GIGATECH PAY</span>
                    </div>
                  </div>
                </div>
              )}

              {/* MoMo Info Section */}
              {formData.paymentMethod === 'momo' && (
                <div className="transfer-info-box animate-fade-in" style={{ marginTop: '16px' }}>
                  <p style={{ textAlign: 'center', margin: '4px 0', fontSize: '13px' }}>
                    Sau khi đặt hàng, vui lòng chuyển khoản Ví Momo đến số điện thoại sau:
                  </p>
                  <div className="transfer-info-row" style={{ marginTop: '6px' }}>
                    <span>Số ví MoMo:</span>
                    <span>0961 234 567</span>
                  </div>
                  <div className="transfer-info-row">
                    <span>Người thụ hưởng:</span>
                    <span>NGUYỄN VĂN QUẢN LÝ</span>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={onClose}>
                  Hủy bỏ
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1.5 }}>
                  Xác Nhận Đặt Hàng
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Step 2: Invoice / Success State */
          <div style={{ textAlign: 'center' }} className="animate-fade-in">
            <CheckCircle2 size={56} style={{ color: '#22c55e', margin: '0 auto 16px' }} />
            <h2 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '8px' }}>
              Đặt Hàng Thành Công!
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
              Cảm ơn bạn đã lựa chọn GigaTech Store. Đơn hàng của bạn đang được xử lý.
            </p>

            <div className="receipt-box">
              <div className="receipt-header">
                <span className="receipt-title">HÓA ĐƠN ĐẶT HÀNG</span>
                <div className="receipt-subtitle">Mã đơn hàng: #{orderId}</div>
              </div>

              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {cart.map((item, index) => (
                  <div className="receipt-row" key={index}>
                    <span>{item.name} ({item.storage}) x{item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="receipt-divider" />

              {/* Buyer Info */}
              <div className="receipt-row">
                <span>Khách hàng:</span>
                <span style={{ color: '#fff', fontWeight: '600' }}>{formData.fullName}</span>
              </div>
              <div className="receipt-row">
                <span>Số điện thoại:</span>
                <span style={{ color: '#fff', fontWeight: '600' }}>{formData.phone}</span>
              </div>
              <div className="receipt-row">
                <span>Địa chỉ giao hàng:</span>
                <span style={{ color: '#fff', fontWeight: '600', maxWidth: '70%', textAlign: 'right', display: 'inline-block' }}>{formData.address}</span>
              </div>
              <div className="receipt-row">
                <span>Thanh toán qua:</span>
                <span style={{ color: '#fff', fontWeight: '600', textTransform: 'uppercase' }}>
                  {formData.paymentMethod === 'cod' ? 'COD (Tiền mặt)' : formData.paymentMethod === 'qr' ? 'Chuyển khoản QR' : 'Ví MoMo'}
                </span>
              </div>

              <div className="receipt-divider" />

              <div className="receipt-total-row">
                <span>Tổng thanh toán:</span>
                <span style={{ color: 'var(--accent-cyan)' }}>{formatPrice(calculateTotal())}</span>
              </div>
            </div>

            {formData.paymentMethod !== 'cod' ? (
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', fontStyle: 'italic', marginBottom: '24px', lineHeight: '1.5' }}>
                * Vui lòng chuyển khoản đúng số tiền thanh toán. Nhân viên hỗ trợ sẽ liên hệ xác nhận đơn hàng ngay khi nhận được giao dịch.
              </p>
            ) : (
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', fontStyle: 'italic', marginBottom: '24px', lineHeight: '1.5' }}>
                * Nhân viên giao hàng sẽ gọi điện xác nhận trước khi giao. Quý khách vui lòng thanh toán tiền mặt khi nhận hàng.
              </p>
            )}

            <button className="btn btn-primary" style={{ width: '100%', padding: '14px' }} onClick={handleComplete}>
              Hoàn Tất
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
