# GigaTech Store - Python Flask

Đã chuyển ứng dụng từ React/Vite sang Python Flask. Không cần Node.js, npm, React hoặc JavaScript để chạy website.

## Chạy trên Windows
1. Cài Python 3.10 trở lên.
2. Mở PowerShell tại thư mục dự án.
3. Chạy: `py -m venv .venv`
4. Kích hoạt: `.venv\\Scripts\\Activate.ps1`
5. Cài thư viện: `pip install -r requirements.txt`
6. Chạy: `python app.py`
7. Mở http://127.0.0.1:5000

## Chức năng
- Danh mục 10 điện thoại, lọc theo thương hiệu.
- Xem chi tiết, thông số, điểm nổi bật.
- Chọn màu/dung lượng và tính giá theo dung lượng.
- Giỏ hàng, tăng giảm số lượng, xóa sản phẩm.
- Đặt hàng, xác thực dữ liệu, hóa đơn.
- QR/MoMo chỉ là mô phỏng, chưa kết nối ngân hàng.

Giỏ hàng được lưu bằng session. Dữ liệu đơn hàng demo chưa lưu database. Trước khi triển khai thật, hãy cấu hình SECRET_KEY, database, CSRF protection và cổng thanh toán.
