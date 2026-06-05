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
              background: 'rgba(6, 182, 212, 0.1)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              borderRadius: '20px',
              padding: '6px 16px',
              fontSize: '13px',
              fontWeight: '600',
              color: 'var(--accent-cyan)',
              marginBottom: '20px'
            }}
          >
            <Flame size={14} fill="currentColor" />
            Khuyến mãi lớn nhất mùa hè: Giảm giá tới 22%
          </div>
          <h1>
            Kỷ Nguyên <br />
            <span className="gradient-text">Smartphone AI</span> <br />
            Tối Tân Nhất
          </h1>
          <p>
            Chào mừng bạn đến với GigaTech. Trải nghiệm các sản phẩm flagship cao cấp hàng đầu thế giới từ Apple, Samsung, Xiaomi với các tính năng vượt trội, hỗ trợ trả góp 0% và bảo hành 1 đổi 1 trong 30 ngày.
          </p>
          <div className="hero-buttons">
            <a href="#products" className="btn btn-primary" onClick={handleExploreClick}>
              Mua Ngay
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
              <span>Giao Hàng Miễn Phí</span>
            </div>
            <div className="feature-tag">
              <ShieldCheck size={18} />
              <span>Bảo Hành 12 Tháng</span>
            </div>
            <div className="feature-tag">
              <Headphones size={18} />
              <span>Hỗ Trợ 24/7</span>
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
