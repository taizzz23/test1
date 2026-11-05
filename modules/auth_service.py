"""Nghiệp vụ xác thực và kiểm tra dữ liệu tài khoản."""
def valid_registration(name, email, password):
    return len(name.strip()) >= 2 and "@" in email and len(password) >= 8
