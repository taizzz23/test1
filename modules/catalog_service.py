"""Nghiệp vụ danh mục và tìm kiếm sản phẩm."""
def filter_products(products, brand="All", query=""):
    result = list(products)
    if brand in {"Apple", "Samsung", "Xiaomi"}:
        result = [p for p in result if p["brand"] == brand]
    elif brand == "Khác":
        result = [p for p in result if p["brand"] not in {"Apple", "Samsung", "Xiaomi"}]
    query = (query or "").strip().lower()
    if query:
        result = [p for p in result if query in p["name"].lower() or query in p["brand"].lower()]
    return result
