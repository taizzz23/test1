import React, { useState } from 'react';
import { Smartphone, Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function Footer({ onLinkClick }) {
  const [email, setEmail] = useState('');

  const handleSubscribeSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    alert(`Đăng ký nhận tin thành công với email: ${email}!`);
    setEmail('');
  };

  return (
    <footer id="about" className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: About Us / Intro */}
          <div className="footer-brand">
            <a href="#" className="logo" style={{ marginBottom: '16px', display: 'inline-flex' }}>
              <Smartphone size={24} className="gradient-text" />
              <span>GigaTech</span>
            </a>
            <p>
              GigaTech Store là hệ thống bán lẻ điện thoại di động chính hãng cao cấp hàng đầu Việt Nam. Chúng tôi cam kết mang lại sản phẩm chất lượng vượt trội, dịch vụ hậu mãi uy tín, và trải nghiệm mua sắm tuyệt vời nhất cho mọi khách hàng.
            </p>
            <div className="social-links">
              <a href="#" className="social-btn" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="social-btn" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="social-btn" aria-label="Youtube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><path d="m10 15 5-3-5-3z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="footer-section-title">Khám Phá</h4>
            <ul className="footer-links">
              <li><a href="#home" onClick={(e) => onLinkClick(e, 'home')}>Trang Chủ</a></li>
              <li><a href="#products" onClick={(e) => onLinkClick(e, 'products')}>Danh Mục Sản Phẩm</a></li>
              <li><a href="#about" onClick={(e) => onLinkClick(e, 'about')}>Giới Thiệu GigaTech</a></li>
              <li><a href="#contact" onClick={(e) => onLinkClick(e, 'contact')}>Liên Hệ Hỗ Trợ</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div id="contact">
            <h4 className="footer-section-title">Thông Tin Liên Hệ</h4>
            <ul className="contact-info-list">
              <li className="contact-info-item">
                <MapPin size={18} />
                <div>
                  <strong>Địa chỉ cửa hàng:</strong>
                  <span>123 Đường Ba Tháng Hai, Phường 11, Quận 10, TP. Hồ Chí Minh</span>
                </div>
              </li>
              <li className="contact-info-item">
                <Phone size={18} />
                <div>
                  <strong>Hotline hỗ trợ:</strong>
                  <span>1900 6789 (Bán hàng) - 1900 9999 (Bảo hành)</span>
                </div>
              </li>
              <li className="contact-info-item">
                <Mail size={18} />
                <div>
                  <strong>Email:</strong>
                  <span>support@gigatech.vn</span>
                </div>
              </li>
              <li className="contact-info-item">
                <Clock size={18} />
                <div>
                  <strong>Thời gian mở cửa:</strong>
                  <span>08:00 - 22:00 (Kể cả CN & Ngày Lễ)</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="footer-section-title">Nhận Khuyến Mãi</h4>
            <div className="footer-newsletter">
              <p>
                Đăng ký email của bạn để nhận ngay các thông tin ưu đãi đặc quyền và mã giảm giá mua sắm lên đến 1,000,000đ tại hệ thống GigaTech.
              </p>
              <form className="newsletter-form" onSubmit={handleSubscribeSubmit}>
                <input
                  type="email"
                  placeholder="Nhập email của bạn..."
                  className="newsletter-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary" aria-label="Subscribe">
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Bottom copyright */}
        <div className="footer-bottom">
          <p>© 2026 GigaTech Store. Tất cả quyền được bảo lưu.</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Chính sách bảo mật</a>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Điều khoản dịch vụ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
