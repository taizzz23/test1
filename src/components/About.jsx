import { Calendar, Award, Rocket, ShieldCheck, Building2, CheckCircle2 } from 'lucide-react';

export default function About() {
  const timelineEvents = [
    {
      year: '2018',
      title: 'Khởi đầu hành trình',
      description: 'Thành lập cửa hàng GigaTech đầu tiên tại Quận 10, TP. Hồ Chí Minh. Tập trung mang đến những sản phẩm công nghệ xách tay uy tín và dịch vụ sửa chữa chuyên nghiệp.',
      icon: <Rocket size={20} />
    },
    {
      year: '2021',
      title: 'Đại lý ủy quyền chính thức',
      description: 'Ký kết hợp tác chiến lược, trở thành đại lý bán lẻ ủy quyền chính thức của các thương hiệu hàng đầu như Apple, Samsung, Xiaomi. Mở rộng chuỗi hệ thống lên 5 chi nhánh tại TP.HCM và Hà Nội.',
      icon: <Award size={20} />
    },
    {
      year: '2024',
      title: 'Chuyển đổi số O2O toàn diện',
      description: 'Ra mắt hệ thống mua sắm trực tuyến thông minh kết hợp cửa hàng vật lý (Online-to-Offline), cho phép đặt hàng và nhận máy trong 2 giờ. Thu hút hơn 100.000 khách hàng thân thiết.',
      icon: <Calendar size={20} />
    },
    {
      year: '2026',
      title: 'Kỷ nguyên bán lẻ thông minh',
      description: 'Nâng tầm trải nghiệm mua sắm với công nghệ tư vấn AI và khu trải nghiệm chuẩn Flagship cao cấp. Cam kết 100% sản phẩm chính hãng đi kèm chính sách bảo hành 1 đổi 1 tốt nhất Việt Nam.',
      icon: <ShieldCheck size={20} />
    }
  ];

  return (
    <section id="about" className="catalog-section" style={{ borderTop: '1px solid var(--border-color)', background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-title" style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 className="animate-slide-up" style={{ fontSize: '36px', fontWeight: '800', marginBottom: '12px' }}>
            Giới Thiệu GigaTech
          </h2>
          <p className="animate-slide-up" style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Tìm hiểu về chặng đường phát triển, sứ mệnh và thông tin pháp lý của chúng tôi
          </p>
        </div>

        <div className="modal-grid" style={{ gridTemplateColumns: '1fr 1.2fr', gap: '50px', alignItems: 'start' }}>
          {/* Left Column: Company Profile Box */}
          <div className="glass-panel glow-hover animate-slide-up" style={{ padding: '32px', position: 'sticky', top: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: '10px', borderRadius: '12px', color: 'var(--accent-cyan)' }}>
                <Building2 size={24} />
              </div>
              <div>
                <span style={{ fontSize: '12px', color: 'var(--accent-cyan)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Thông Tin Pháp Lý
                </span>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#fff' }}>Hồ Sơ Doanh Nghiệp</h3>
              </div>
            </div>

            <h4 style={{ fontSize: '18px', color: '#fff', fontWeight: '700', marginBottom: '16px', lineHeight: '1.4' }}>
              CÔNG TY TNHH MỘT THÀNH VIÊN CÔNG NGHỆ GIGATECH
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <span style={{ width: '130px', fontWeight: '600', color: '#fff', flexShrink: 0 }}>Mã số thuế:</span>
                <span>0110486392 (Cấp bởi Sở Kế hoạch và Đầu tư TP. Hồ Chí Minh)</span>
              </div>
              <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <span style={{ width: '130px', fontWeight: '600', color: '#fff', flexShrink: 0 }}>Loại hình:</span>
                <span>Công ty trách nhiệm hữu hạn 1 thành viên (TNHH MTV)</span>
              </div>
              <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <span style={{ width: '130px', fontWeight: '600', color: '#fff', flexShrink: 0 }}>Năm hoạt động:</span>
                <span>Từ năm 2018 (<strong>8 năm</strong> hoạt động và phát triển)</span>
              </div>
              <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <span style={{ width: '130px', fontWeight: '600', color: '#fff', flexShrink: 0 }}>Trụ sở chính:</span>
                <span>123 Đường Ba Tháng Hai, Phường 11, Quận 10, TP. Hồ Chí Minh</span>
              </div>
            </div>

            <div style={{ marginTop: '28px', background: 'rgba(255, 255, 255, 0.02)', padding: '20px', borderRadius: '12px', border: '1px dashed var(--border-color)' }}>
              <h5 style={{ color: '#fff', fontWeight: '600', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--accent-cyan)' }} /> Cam kết của chúng tôi
              </h5>
              <p style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                Là mô hình doanh nghiệp TNHH 1TV hoạt động với trách nhiệm và uy tín cao nhất, GigaTech cam kết mang lại các giá trị minh bạch về giá cả, chất lượng sản phẩm chuẩn quốc tế và chính sách hậu mãi trọn đời cho người tiêu dùng Việt.
              </p>
            </div>
          </div>

          {/* Right Column: Timeline of formation */}
          <div className="animate-slide-up">
            <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '32px', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="gradient-text">Lịch Sử</span> Hình Thành & Phát Triển
            </h3>

            <div style={{ position: 'relative', paddingLeft: '28px', borderLeft: '2px solid rgba(6, 182, 212, 0.2)' }}>
              {timelineEvents.map((event, index) => (
                <div key={index} style={{ position: 'relative', marginBottom: '36px' }}>
                  {/* Timeline point indicator */}
                  <div style={{
                    position: 'absolute',
                    left: '-40px',
                    top: '2px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'var(--bg-secondary)',
                    border: '2px solid var(--accent-cyan)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-cyan)',
                    boxShadow: 'var(--glow-cyan)',
                    zIndex: 2
                  }}>
                    {event.icon}
                  </div>

                  {/* Year Tag */}
                  <div style={{
                    display: 'inline-block',
                    background: 'var(--accent-gradient)',
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: '13px',
                    padding: '2px 10px',
                    borderRadius: '20px',
                    marginBottom: '8px',
                    boxShadow: 'var(--glow-cyan)'
                  }}>
                    Năm {event.year}
                  </div>

                  <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>
                    {event.title}
                  </h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    {event.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
