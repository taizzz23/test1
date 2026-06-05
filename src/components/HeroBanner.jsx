import React from 'react';
import { ShieldCheck, Truck, Headphones, Flame } from 'lucide-react';

export default function HeroBanner() {
  const handleExploreClick = (e) => {
    e.preventDefault();
    const element = document.getElementById('products');
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
    <section id="home" className="hero container animate-fade-in">
      <div className="hero-grid">
        <div className="hero-content">
          <div 
            className="promo-tag" 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '20px',
              padding: '6px 16px',
              fontSize: '13px',
              fontWeight: '600',
              color: '#ef4444',
              marginBottom: '20px'
            }}
          >
            <Flame size={14} fill="currentColor" />
            Thanh lý & Xả kho thu hồi vốn: Giảm giá tới 52%
          </div>
          <h1>
            Thanh Lý <br />
            <span className="gradient-text">Flagship Giá Gốc</span> <br />
            Chính Hãng Likenew
          </h1>
          <p>
            Chào mừng bạn đến với GigaTech Outlet. Hệ thống thanh lý điện thoại cao cấp trưng bày showroom, máy trôi bảo hành và Like New 99% lớn nhất Việt Nam. Tất cả thiết bị đã qua kiểm định chất lượng nghiêm ngặt 30 bước, cam kết zin áp suất nguyên bản.
          </p>
          <div className="hero-buttons">
            <a href="#products" className="btn btn-primary" onClick={handleExploreClick}>
              Xem Máy Thanh Lý
            </a>
            <a href="#about" className="btn btn-secondary" onClick={(e) => {
              e.preventDefault();
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Xem Giới Thiệu
            </a>
          </div>

          <div className="feature-tags">
            <div className="feature-tag">
              <Truck size={18} />
              <span>Giao Toàn Quốc</span>
            </div>
            <div className="feature-tag">
              <ShieldCheck size={18} />
              <span>Bảo Hành 6 Tháng</span>
            </div>
            <div className="feature-tag">
              <Headphones size={18} />
              <span>Bao Test Áp Suất</span>
            </div>
          </div>
        </div>

        <div className="hero-image-container animate-float">
          <div className="hero-image-wrapper">
            <img 
              src="/banner.png" 
              alt="GigaTech Phone Store Banner" 
              className="hero-image"
            />
            <div className="glass-panel floating-badge" style={{ display: 'none' }}>
              <div 
                style={{ 
                  width: '12px', 
                  height: '12px', 
                  borderRadius: '50%', 
                  backgroundColor: '#22c55e',
                  boxShadow: '0 0 10px #22c55e'
                }} 
              />
              <span style={{ fontSize: '13px', fontWeight: '600' }}>Hơn 10,000+ Khách hàng tin dùng</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
