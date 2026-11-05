<div align="center">

# 📱 GigaTech Store

### Website bán điện thoại xây dựng bằng Python Flask

**Tìm kiếm · Chọn mua · Quản lý đơn hàng · Quản trị cửa hàng**

![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.x-000000?style=for-the-badge&logo=flask&logoColor=white)
![SQLite](https://img.shields.io/badge/Database-SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![Status](https://img.shields.io/badge/Status-In%20Development-orange?style=for-the-badge)

</div>

---

## ✨ Giới thiệu

**GigaTech Store** là website bán điện thoại trực tuyến với giao diện tiếng Việt. Dự án sử dụng **Python Flask** để xử lý phía máy chủ và **SQLite** để lưu trữ tài khoản, đơn hàng cùng dữ liệu liên quan.

Mục tiêu của dự án là xây dựng một cửa hàng trực tuyến có các chức năng mua sắm cơ bản, đồng thời tổ chức mã nguồn theo từng module nghiệp vụ để dễ phát triển và bảo trì.

## 🚀 Chức năng

| Khu vực | Chức năng |
|---|---|
| 🏠 Trang chủ | Banner giới thiệu, danh sách điện thoại, tìm kiếm và lọc thương hiệu |
| 👤 Tài khoản | Đăng ký, đăng nhập, đăng xuất; mật khẩu được băm trước khi lưu |
| 🛒 Giỏ hàng | Thêm sản phẩm, thay đổi số lượng và xóa sản phẩm |
| 🏷️ Mã giảm giá | Hỗ trợ mã `GIGATECH5`, `GIAM100K`, `NEWCUSTOMER` |
| 💳 Đặt hàng | Kiểm tra thông tin nhận hàng và tạo đơn hàng |
| 📦 Đơn hàng | Xem lịch sử mua hàng, chi tiết và trạng thái đơn |
| ❤️ Yêu thích | Lưu sản phẩm yêu thích theo tài khoản |
| ⭐ Đánh giá | Khách hàng đăng nhập có thể gửi hoặc cập nhật đánh giá |
| 🛠️ Quản trị | Xem thống kê đơn hàng, doanh thu, khách hàng và cập nhật trạng thái đơn |

## 🧰 Công nghệ sử dụng

- **Backend:** Python, Flask
- **Database:** SQLite
- **Frontend:** HTML, CSS, Jinja2
- **Authentication:** Werkzeug password hashing
- **Production server:** Gunicorn
- **Deployment:** Render

## 📁 Cấu trúc dự án

```text
GigaTech-Store/
├── app.py                    # Khởi tạo Flask và khai báo routes
├── modules/                  # Các module xử lý nghiệp vụ
│   ├── __init__.py
│   ├── auth_service.py        # Kiểm tra dữ liệu tài khoản
│   ├── catalog_service.py     # Tìm kiếm và lọc sản phẩm
│   ├── cart_service.py        # Xử lý giỏ hàng
│   ├── order_service.py       # Giảm giá và kiểm tra đặt hàng
│   └── admin_service.py       # Thống kê quản trị
├── data/
│   ├── products.json         # Dữ liệu sản phẩm
│   └── store.db              # SQLite (tự tạo khi chạy)
├── templates/                 # Giao diện Jinja2
│   ├── index.html
│   ├── auth.html
│   ├── cart.html
│   ├── checkout.html
│   ├── account.html
│   ├── wishlist.html
│   ├── order_detail.html
│   ├── success.html
│   └── admin.html
├── static/
│   ├── style.css
│   ├── banner.png
│   └── products/              # Hình minh họa sản phẩm
├── requirements.txt
├── render.yaml
└── README.md
```

> Các file trong `modules/` hiện là lớp xử lý nghiệp vụ (service). Các route Flask vẫn được khai báo trong `app.py`.

## 💻 Cài đặt và chạy trên Windows

### 1. Yêu cầu

- Python 3.10 trở lên
- Git (nếu clone dự án từ GitHub)

### 2. Tải mã nguồn

```powershell
git clone https://github.com/taizzz23/test1.git
cd test1
```

### 3. Tạo môi trường ảo

```powershell
py -m venv .venv
.venv\Scripts\Activate.ps1
```

Nếu PowerShell chặn chạy script, mở PowerShell và chạy lệnh sau cho phiên hiện tại:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.venv\Scripts\Activate.ps1
```

### 4. Cài thư viện

```powershell
pip install -r requirements.txt
```

### 5. Khởi chạy website

```powershell
python app.py
```

Mở trình duyệt tại:

**http://127.0.0.1:5000**

## 🔐 Tài khoản quản trị phát triển

Trong môi trường phát triển, dự án có thông tin đăng nhập quản trị mặc định:

| Thông tin | Giá trị |
|---|---|
| Email | `admin@gigatech.local` |
| Mật khẩu | `Admin@12345` |

Sau khi đăng nhập, mở mục **Quản trị** hoặc truy cập `/admin`.

**Quan trọng:** Đây là tài khoản mặc định để thử nghiệm local. Không sử dụng mật khẩu này trên website công khai. Hãy cấu hình `ADMIN_EMAIL`, `ADMIN_PASSWORD` và `SECRET_KEY` riêng, đủ mạnh trước khi triển khai. Tài khoản admin mặc định chỉ được tạo khi khởi tạo database lần đầu.

## 🌐 Triển khai trên Render

Dự án có file `render.yaml` để cấu hình dịch vụ. Khi tạo dịch vụ mới trên Render, hãy chọn **Web Service** (không chọn Static Site), kết nối repository này và dùng:

| Thiết lập | Giá trị |
|---|---|
| Runtime | Python |
| Build Command | `pip install -r requirements.txt` |
| Start Command | `gunicorn app:app --bind 0.0.0.0:$PORT` |

Đặt các biến môi trường bí mật như `SECRET_KEY`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` trong phần Environment của Render.

> **Lưu ý dữ liệu:** SQLite lưu trong file `data/store.db`. Với môi trường hosting không có ổ đĩa bền vững, dữ liệu có thể mất khi dịch vụ được tạo lại hoặc triển khai. Cần cấu hình persistent disk hoặc chuyển sang cơ sở dữ liệu được quản lý để lưu dữ liệu lâu dài.

## ⚠️ Giới hạn hiện tại

- Thanh toán COD ghi nhận đơn hàng; QR/MoMo hiện chỉ là giao diện demo, chưa kết nối cổng thanh toán thật.
- Chưa tích hợp hãng vận chuyển, email/SMS thông báo.
- Chưa có chức năng CRUD sản phẩm hoàn chỉnh trong trang quản trị.
- Quản lý tồn kho thực tế chưa được triển khai đầy đủ.
- Cần kiểm thử bảo mật, CSRF, phân quyền và quy trình thanh toán trước khi sử dụng trong môi trường thương mại thực tế.

## 🗺️ Hướng phát triển

- [ ] Hoàn thiện module quản lý sản phẩm và danh mục.
- [ ] Tách route Flask thành Blueprint theo từng module.
- [ ] Hoàn thiện quản lý người dùng và phân quyền quản trị.
- [ ] Tích hợp cổng thanh toán thật.
- [ ] Tích hợp vận chuyển và thông báo đơn hàng.
- [ ] Bổ sung kiểm thử tự động.

## 📄 Giấy phép

Dự án phục vụ mục đích học tập và phát triển website bán hàng. Hãy bổ sung thông tin giấy phép nếu muốn phân phối hoặc sử dụng lại mã nguồn.

---

<div align="center">

**GigaTech Store** · Built with Python Flask 💜

</div>
