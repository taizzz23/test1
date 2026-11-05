"""Nghiệp vụ tính giảm giá và kiểm tra thông tin đặt hàng."""
def calculate_discount(subtotal, coupon):
    if not coupon or subtotal < coupon["min_total"]: return 0
    raw = int(subtotal * coupon["value"] / 100) if coupon["kind"] == "percent" else coupon["value"]
    return min(subtotal, raw)
def validate_checkout(name, phone, address, payment):
    errors = {}
    if len(name) < 2: errors["fullName"] = "Vui lòng nhập họ tên."
    if not (phone.isdigit() and len(phone) == 10): errors["phone"] = "Số điện thoại phải gồm đúng 10 số."
    if len(address) < 8: errors["address"] = "Vui lòng nhập địa chỉ đầy đủ."
    if payment not in {"cod", "qr", "momo"}: errors["paymentMethod"] = "Phương thức thanh toán không hợp lệ."
    return errors
