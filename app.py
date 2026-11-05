import json, os, secrets
from pathlib import Path
from flask import Flask, abort, flash, redirect, render_template, request, session, url_for

ROOT = Path(__file__).resolve().parent
with (ROOT / "data" / "products.json").open(encoding="utf-8") as f:
    PRODUCTS = json.load(f)
BY_ID = {int(p["id"]): p for p in PRODUCTS}
app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "change-this-secret-key-before-deploying")

def money(value):
    return f"{int(value):,}".replace(",", ".") + " đ"
app.jinja_env.filters["money"] = money

def cart_items():
    return session.setdefault("cart", [])
def cart_total():
    return sum(x["price"] * x["quantity"] for x in cart_items())
def cart_count():
    return sum(x["quantity"] for x in cart_items())
def product_or_404(pid):
    p = BY_ID.get(pid)
    if p is None: abort(404)
    return p

@app.context_processor
def common_values():
    return {"cart_count": cart_count(), "cart_total": cart_total()}

@app.get("/")
def index():
    brand = request.args.get("brand", "All")
    pid = request.args.get("product", type=int)
    selected = product_or_404(pid) if pid else None
    products = PRODUCTS
    if brand in {"Apple", "Samsung", "Xiaomi"}:
        products = [p for p in PRODUCTS if p["brand"] == brand]
    elif brand == "Khác":
        products = [p for p in PRODUCTS if p["brand"] not in {"Apple", "Samsung", "Xiaomi"}]
    brands = [("All","Tất cả"),("Apple","Apple (iPhone)"),("Samsung","Samsung"),("Xiaomi","Xiaomi"),("Khác","Thương hiệu khác")]
    tab = request.args.get("tab", "specs")
    return render_template("index.html", products=products, brand=brand, brands=brands,
        selected_product=selected, tab=tab if tab in {"specs","highlights"} else "specs")

@app.post("/cart/add")
def add_to_cart():
    p = product_or_404(request.form.get("product_id", type=int) or 0)
    ci, si = request.form.get("color_index",0,type=int), request.form.get("storage_index",0,type=int)
    colors, storages = p.get("colors",[]), p.get("storages",[])
    if not (0 <= ci < len(colors) and 0 <= si < len(storages)): abort(400)
    c, s = colors[ci], storages[si]
    item = {"id":p["id"],"name":p["name"],"brand":p["brand"],"image":p["image"],
        "price":p["price"]+s["priceOffset"],"color":c["name"],"color_hex":c["hex"],
        "storage":s["size"],"quantity":1}
    cart = cart_items()
    for old in cart:
        if (old["id"],old["color"],old["storage"]) == (item["id"],item["color"],item["storage"]):
            old["quantity"] += 1
            break
    else:
        cart.append(item)
    session.modified = True
    flash("Đã thêm " + p["name"] + " vào giỏ hàng.")
    return redirect(url_for("checkout") if request.form.get("intent") == "buy" else url_for("index",product=p["id"]))

@app.get("/cart")
def cart():
    return render_template("cart.html", cart=cart_items())

@app.post("/cart/update")
def update_cart():
    i, delta = request.form.get("index",type=int), request.form.get("change",type=int)
    cart = cart_items()
    if i is not None and 0 <= i < len(cart) and delta in (-1,1):
        cart[i]["quantity"] += delta
        if cart[i]["quantity"] <= 0: cart.pop(i)
        session.modified = True
    return redirect(url_for("cart"))

@app.post("/cart/remove")
def remove_cart():
    i = request.form.get("index",type=int)
    cart = cart_items()
    if i is not None and 0 <= i < len(cart):
        cart.pop(i); session.modified = True
    return redirect(url_for("cart"))

@app.route("/checkout",methods=["GET","POST"])
def checkout():
    cart = cart_items()
    if not cart:
        flash("Giỏ hàng đang trống.")
        return redirect(url_for("index"))
    if request.method == "POST":
        form = request.form
        errors = {}
        name, phone, address = form.get("fullName","").strip(), form.get("phone","").strip(), form.get("address","").strip()
        payment = form.get("paymentMethod","cod")
        if not name: errors["fullName"] = "Vui lòng nhập họ tên."
        if not phone: errors["phone"] = "Vui lòng nhập số điện thoại."
        elif not (phone.isdigit() and len(phone)==10): errors["phone"] = "Số điện thoại phải gồm đúng 10 số."
        if not address: errors["address"] = "Vui lòng nhập địa chỉ giao hàng."
        if payment not in {"cod","qr","momo"}: errors["paymentMethod"] = "Phương thức thanh toán không hợp lệ."
        if errors: return render_template("checkout.html",errors=errors,form=form)
        session["order"] = {"id":"GT"+str(secrets.randbelow(900000)+100000),"name":name,
            "phone":phone,"address":address,"payment":payment,"items":[dict(x) for x in cart],"total":cart_total()}
        return redirect(url_for("success"))
    return render_template("checkout.html",errors={},form={})

@app.get("/success")
def success():
    order = session.get("order")
    if not order: return redirect(url_for("index"))
    return render_template("success.html",order=order)

@app.post("/complete")
def complete():
    session.pop("cart",None); session.pop("order",None)
    flash("Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại GigaTech.")
    return redirect(url_for("index"))

@app.post("/subscribe")
def subscribe():
    email = request.form.get("email","").strip()
    flash("Đăng ký nhận tin thành công!" if "@" in email and "." in email.rsplit("@",1)[-1] else "Email không hợp lệ.")
    return redirect(url_for("index")+"#contact")

if __name__ == "__main__":
    app.run(debug=True)
