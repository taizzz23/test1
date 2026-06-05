import React, { useState, useEffect } from 'react';
import { Smartphone, ShoppingBag, Search, Menu } from 'lucide-react';

export default function Navbar({ activeSection, setActiveSection, cartCount, onCartClick }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, sectionId) => {
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
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#" className="logo" onClick={(e) => handleLinkClick(e, 'home')}>
          <Smartphone size={28} className="gradient-text" />
          <span>GigaTech Outlet</span>
        </a>

        <ul className="nav-links">
          <li>
            <a 
              href="#home" 
              className={activeSection === 'home' ? 'active' : ''}
              onClick={(e) => handleLinkClick(e, 'home')}
            >
              Trang Chủ
            </a>
          </li>
          <li>
            <a 
              href="#products" 
              className={activeSection === 'products' ? 'active' : ''}
              onClick={(e) => handleLinkClick(e, 'products')}
            >
              Sản Phẩm
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              className={activeSection === 'about' ? 'active' : ''}
              onClick={(e) => handleLinkClick(e, 'about')}
            >
              Giới Thiệu
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              className={activeSection === 'contact' ? 'active' : ''}
              onClick={(e) => handleLinkClick(e, 'contact')}
            >
              Liên Hệ
            </a>
          </li>
        </ul>

        <div className="nav-actions">
          <div className="search-bar-wrapper" style={{ position: 'relative', display: 'none' }}>
            <input 
              type="text" 
              placeholder="Tìm kiếm điện thoại..." 
              className="search-input"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-color)',
                borderRadius: '20px',
                padding: '6px 16px 6px 36px',
                color: '#fff',
                fontSize: '13px',
                outline: 'none',
                width: '180px'
              }}
            />
            <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          </div>

          <button className="icon-btn" onClick={onCartClick}>
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
          </button>

          <button className="icon-btn mobile-menu-btn" style={{ display: 'none' }}>
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}
