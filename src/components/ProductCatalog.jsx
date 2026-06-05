import React, { useState } from 'react';
import ProductCard from './ProductCard';

export default function ProductCatalog({ products, onViewDetails }) {
  const [activeBrand, setActiveBrand] = useState('All');

  // Filter products by brand
  const filteredProducts = products.filter(product => {
    if (activeBrand === 'All') return true;
    if (activeBrand === 'Khác') {
      return !['Apple', 'Samsung', 'Xiaomi'].includes(product.brand);
    }
    return product.brand === activeBrand;
  });

  const filterOptions = [
    { label: 'Tất cả', value: 'All' },
    { label: 'Apple (iPhone)', value: 'Apple' },
    { label: 'Samsung', value: 'Samsung' },
    { label: 'Xiaomi', value: 'Xiaomi' },
    { label: 'Thương hiệu khác', value: 'Khác' }
  ];

  return (
    <section id="products" className="catalog-section">
      <div className="container">
        <div className="catalog-header">
          <div className="section-title">
            <h2 className="animate-slide-up">Danh Mục Sản Phẩm</h2>
            <p className="animate-slide-up">Khám phá 10 mẫu điện thoại cao cấp nhất hiện tại</p>
          </div>

          <ul className="brand-filters animate-slide-up">
            {filterOptions.map((option) => (
              <li key={option.value}>
                <button
                  className={`filter-btn ${activeBrand === option.value ? 'active' : ''}`}
                  onClick={() => setActiveBrand(option.value)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {filteredProducts.length === 0 ? (
          <div 
            style={{ 
              textAlign: 'center', 
              padding: '60px 0', 
              color: 'var(--text-secondary)',
              fontSize: '16px' 
            }}
          >
            Không tìm thấy sản phẩm phù hợp.
          </div>
        ) : (
          <div className="products-grid animate-fade-in">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
