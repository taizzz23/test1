"""Nghiệp vụ thống kê dành cho quản trị viên."""
def dashboard_stats(connection):
    return {"orders": connection.execute("SELECT COUNT(*) n FROM orders").fetchone()["n"], "sales": connection.execute("SELECT COALESCE(SUM(total),0) n FROM orders WHERE status!='cancelled'").fetchone()["n"], "customers": connection.execute("SELECT COUNT(*) n FROM users WHERE role='customer'").fetchone()["n"]}
