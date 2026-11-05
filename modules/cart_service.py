"""Nghiệp vụ giỏ hàng, độc lập với Flask session."""
def add_cart_item(cart, item):
    for current in cart:
        if (current["id"], current["color"], current["storage"]) == (item["id"], item["color"], item["storage"]):
            current["quantity"] = min(10, current["quantity"] + item.get("quantity", 1))
            return
    cart.append(item)
def change_cart_quantity(cart, index, delta):
    cart[index]["quantity"] = min(10, cart[index]["quantity"] + delta)
    if cart[index]["quantity"] <= 0: cart.pop(index)
def remove_cart_item(cart, index): cart.pop(index)
