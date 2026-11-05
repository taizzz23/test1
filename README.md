# GigaTech Store - Python Flask

Website bán điện thoại xây dựng bằng Python Flask và SQLite. Không cần Node.js, npm, React hoặc JavaScript.

## Chạy trên Windows

1. Cài Python 3.10 trở lên.
2. Mở PowerShell tại thư mục dự án.
3. Tạo môi trường ảo: `py -m venv .venv`
4. Kích hoạt: `.venv\\Scripts\\Activate.ps1`
5. Cài thư viện: `pip install -r requirements.txt`
6. Chạy: `python app.py`
7. Mở http://127.0.0.1:5000

## Tài khoản quản trị lần đầu

Mặc định môi trường phát triển:
- Email: `admin@gigatech.local`
- Mật khẩu: `Admin@12345`
- Đăng nhập rồi mở mục **Quản trị** hoặc truy cập `/admin`.

Trước khi triển khai, hãy đặt biến môi trường `ADMIN_EMAIL`, `ADMIN_PASSWORD` và `SECRET_KEY` bằng giá trị riêng, mạnh và bí mật. Tài khoản admin chỉ được tạo tự động khi khởi tạo database lần đầu.

## Các module hiện có

- **Danh mục sản phẩm:** 10 điện thoại, tìm kiếm theo tên/thương hiệu, lọc thương hiệu, xem thông tin và biến thể.
- **Tài khoản:** đăng ký, đăng nhập, đăng xuất; mật khẩu được băm trước khi lưu.
- **Giỏ hàng:** thêm sản phẩm, tăng/giảm số lượng, xóa sản phẩm.
- **Mã giảm giá:** `GIGATECH5`, `GIAM100K`, `NEWCUSTOMER` với điều kiện đơn tối thiểu.
- **Đặt hàng:** kiểm tra thông tin, lưu đơn hàng và từng sản phẩm vào SQLite.
- **Theo dõi đơn:** lịch sử mua hàng, chi tiết đơn và trạng thái giao hàng.
- **Yêu thích:** lưu danh sách sản phẩm theo tài khoản.
- **Đánh giá:** khách hàng đăng nhập có thể gửi/cập nhật đánh giá sản phẩm.
- **Quản trị:** thống kê đơn hàng/doanh thu/khách hàng và cập nhật trạng thái đơn.

## Dữ liệu

Database SQLite tự tạo tại `data/store.db` khi chạy lần đầu. Không xóa file này nếu muốn giữ tài khoản, đơn hàng, đánh giá và danh sách yêu thích. Danh mục sản phẩm hiện vẫn được đọc từ `data/products.json`.

## Lưu ý trước khi dùng thực tế

- COD hoạt động ở mức ghi nhận đơn; QR/MoMo vẫn là giao diện demo, chưa kết nối cổng thanh toán.
- Chưa có tích hợp hãng vận chuyển, email/SMS thông báo, quản lý tồn kho thực tế hoặc CRUD sản phẩm trong trang admin.
- Đổi mật khẩu admin mặc định và cấu hình `SECRET_KEY` trước khi public website.
- Khi deploy, tắt debug, dùng HTTPS, backup database và triển khai kiểm thử bảo mật/CSRF đầy đủ.
