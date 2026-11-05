import json
import os
import secrets
import sqlite3
from functools import wraps
from pathlib import Path

from flask import Flask, abort, flash, g, redirect, render_template, request, session, url_for
from werkzeug.security import check_password_hash, generate_password_hash

ROOT = Path(__file__).resolve().parent
DB_PATH = ROOT / "data" / "store.db"
with (ROOT / "data" / "products.json").open(encoding="utf-8") as f:
    PRODUCTS = json.load(f)
BY_ID = {int(p["id"]): p for p in PRODUCTS}

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY") or "dev-only-change-this-secret-key"


def db():
    if "db" not in g:
        g.db = sqlite3.connect(DB_PATH)
        g.db.row_factory = sqlite3.Row
        g.db.execute("PRAGMA foreign_keys = ON")
    return g.db


@app.teardown_appcontext
def close_db(_error=None):
    conn = g.pop("db", None)
    if conn is not None:
        conn.close()


def init_db():
    DB_PATH.parent.mkdir(exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.executescript("""
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'customer', created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT, code TEXT NOT NULL UNIQUE,
      user_id INTEGER, customer_name TEXT NOT NULL, phone TEXT NOT NULL,
      address TEXT NOT NULL, payment TEXT NOT NULL, subtotal INTEGER NOT NULL,
      discount INTEGER NOT NULL DEFAULT 0, total INTEGER NOT NULL,
      coupon TEXT, status TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT, order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL, name TEXT NOT NULL, image TEXT,
      color TEXT, storage TEXT, price INTEGER NOT NULL, quantity INTEGER NOT NULL,
      FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS wishlist (
      user_id INTEGER NOT NULL, product_id INTEGER NOT NULL,
      PRIMARY KEY(user_id, product_id),
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL, rating INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5),
      content TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, product_id),
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS coupons (
      code TEXT PRIMARY KEY, kind TEXT NOT NULL, value INTEGER NOT NULL,
      min_total INTEGER NOT NULL DEFAULT 0, active INTEGER NOT NULL DEFAULT 1
    );
    INSERT OR IGNORE INTO coupons(code,kind,value,min_total) VALUES
      ('GIGATECH5','percent',5,1000000),
      ('GIAM100K','fixed',100000,2000000),
      ('NEWCUSTOMER','percent',10,5000000);
    """)
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@gigatech.local").lower()
    admin_password = os.environ.get("ADMIN_PASSWORD", "Admin@12345")
    exists = conn.execute("SELECT id FROM users WHERE email=?", (admin_email,)).fetchone()
    if not exists:
        conn.execute("INSERT INTO users(name,email,password_hash,role) VALUES(?,?,?,?)",
                     ("Administrator", admin_email, generate_password_hash(admin_password), "admin"))
    conn.commit()
    conn.close()


init_db()


def money(value):
    return f"{int(value):,}".replace(",", ".") + " đ"


app.jinja_env.filters["money"] = money


@app.before_request
def csrf_protect():
    if request.method == "POST":
        sent = request.form.get("_csrf", "")
        expected = session.get("_csrf", "")
        if not expected or not secrets.compare_digest(sent, expected):
            abort(400, "Phiên làm việc hết hạn hoặc mã bảo mật không hợp lệ. Hãy tải lại trang.")


@app.context_processor
def common_values():
    if "_csrf" not in session:
        session["_csrf"] = secrets.token_urlsafe(32)
    return {
        "cart_count": sum(x["quantity"] for x in session.get("cart", [])),
        "cart_total": sum(x["price"] * x["quantity"] for x in session.get("cart", [])),
        "current_user": db().execute("SELECT id,name,email,role FROM users WHERE id=?",
                                     (session.get("user_id"),)).fetchone() if session.get("user_id") else None,
        "csrf_token": session["_csrf"],
    }


def login_required(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        if not session.get("user_id"):
            flash("Vui lòng đăng nhập để tiếp tục.")
            return redirect(url_for("login", next=request.path))
        return view(*args, **kwargs)
    return wrapped


def admin_required(view):
    @wraps(view)
    @login_required
    def wrapped(*args, **kwargs):
        user = db().execute("SELECT role FROM users WHERE id=?", (session["user_id"],)).fetchone()
        if not user or user["role"] != "admin":
            abort(403)
        return view(*args, **kwargs)
    return wrapped


def cart_items():
    return session.setdefault("cart", [])


def product_or_404(pid):
    p = BY_ID.get(pid)
    if p is None:
        abort(404)
    return p


@app.get("/")
def index():
    brand = request.args.get("brand", "All")
    query = request.args.get("q", "").strip().lower()
    pid = request.args.get("product", type=int)
    selected = product_or_404(pid) if pid else None
    products = PRODUCTS
    if brand in {"Apple", "Samsung", "Xiaomi"}:
        products = [p for p in products if p["brand"] == brand]
    elif brand == "Khác":
        products = [p for p in products if p["brand"] not in {"Apple", "Samsung", "Xiaomi"}]
    if query:
        products = [p for p in products if query in p["name"].lower() or query in p["brand"].lower()]
    brands = [("All","Tất cả"),("Apple","Apple (iPhone)"),("Samsung","Samsung"),("Xiaomi","Xiaomi"),("Khác","Thương hiệu khác")]
    tab = request.args.get("tab", "specs")
    wishlist_ids = set()
    if session.get("user_id"):
        wishlist_ids = {r["product_id"] for r in db().execute("SELECT product_id FROM wishlist WHERE user_id=?", (session["user_id"],))}
    reviews = db().execute("""SELECT r.rating,r.content,r.created_at,u.name FROM reviews r
        JOIN users u ON u.id=r.user_id WHERE r.product_id=? ORDER BY r.created_at DESC LIMIT 10""",
        (pid,)).fetchall() if pid else []
    return render_template("index.html", products=products, brand=brand, brands=brands,
        selected_product=selected, tab=tab if tab in {"specs","highlights","reviews"} else "specs",
        wishlist_ids=wishlist_ids, reviews=reviews, search_query=request.args.get("q",""))


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        name = request.form.get("name", "").strip()
        email = request.form.get("email", "").strip().lower()
        password = request.form.get("password", "")
        if len(name) < 2 or "@" not in email or len(password) < 8:
            flash("Vui lòng nhập tên hợp lệ, email hợp lệ và mật khẩu ít nhất 8 ký tự.")
        else:
            try:
                cur = db().execute("INSERT INTO users(name,email,password_hash) VALUES(?,?,?)",
                    (name, email, generate_password_hash(password)))
                db().commit()
                session["user_id"] = cur.lastrowid
                session["cart"] = session.get("cart", [])
                flash("Tạo tài khoản thành công.")
                return redirect(url_for("index"))
            except sqlite3.IntegrityError:
                flash("Email này đã được đăng ký.")
    return render_template("auth.html", mode="register")


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form.get("email", "").strip().lower()
        user = db().execute("SELECT * FROM users WHERE email=?", (email,)).fetchone()
        if user and check_password_hash(user["password_hash"], request.form.get("password", "")):
            session.clear()
            session["user_id"] = user["id"]
            flash("Đăng nhập thành công.")
            target = request.args.get("next", "")
            return redirect(target if target.startswith("/") and not target.startswith("//") else url_for("index"))
        flash("Email hoặc mật khẩu không chính xác.")
    return render_template("auth.html", mode="login")


@app.post("/logout")
@login_required
def logout():
    session.clear()
    flash("Bạn đã đăng xuất.")
    return redirect(url_for("index"))


@app.get("/account")
@login_required
def account():
    user = db().execute("SELECT name,email,created_at FROM users WHERE id=?", (session["user_id"],)).fetchone()
    orders = db().execute("SELECT * FROM orders WHERE user_id=? ORDER BY id DESC", (session["user_id"],)).fetchall()
    return render_template("account.html", user=user, orders=orders)


@app.get("/orders/<int:order_id>")
def order_detail(order_id):
    order = db().execute("SELECT * FROM orders WHERE id=?", (order_id,)).fetchone()
    if not order:
        abort(404)
    if order["user_id"] != session.get("user_id") and session.get("user_id"):
        role = db().execute("SELECT role FROM users WHERE id=?", (session["user_id"],)).fetchone()
        if not role or role["role"] != "admin":
            abort(403)
    elif order["user_id"] != session.get("user_id"):
        abort(403)
    items = db().execute("SELECT * FROM order_items WHERE order_id=?", (order_id,)).fetchall()
    return render_template("order_detail.html", order=order, items=items)


@app.post("/wishlist/<int:pid>")
@login_required
def toggle_wishlist(pid):
    product_or_404(pid)
    row = db().execute("SELECT 1 FROM wishlist WHERE user_id=? AND product_id=?", (session["user_id"], pid)).fetchone()
    if row:
        db().execute("DELETE FROM wishlist WHERE user_id=? AND product_id=?", (session["user_id"], pid))
        flash("Đã xóa khỏi danh sách yêu thích.")
    else:
        db().execute("INSERT INTO wishlist(user_id,product_id) VALUES(?,?)", (session["user_id"], pid))
        flash("Đã thêm vào danh sách yêu thích.")
    db().commit()
    return redirect(request.referrer or url_for("index"))


@app.get("/wishlist")
@login_required
def wishlist():
    rows = db().execute("SELECT product_id FROM wishlist WHERE user_id=?", (session["user_id"],)).fetchall()
    products = [BY_ID[r["product_id"]] for r in rows if r["product_id"] in BY_ID]
    return render_template("wishlist.html", products=products)


@app.post("/reviews/<int:pid>")
@login_required
def add_review(pid):
    product_or_404(pid)
    rating = request.form.get("rating", type=int)
    content = request.form.get("content", "").strip()
    if rating not in range(1, 6) or len(content) < 5:
        flash("Đánh giá cần từ 5 ký tự và chọn số sao từ 1 đến 5.")
    else:
        db().execute("""INSERT INTO reviews(user_id,product_id,rating,content) VALUES(?,?,?,?)
            ON CONFLICT(user_id,product_id) DO UPDATE SET rating=excluded.rating,content=excluded.content,created_at=CURRENT_TIMESTAMP""",
            (session["user_id"], pid, rating, content))
        db().commit()
        flash("Cảm ơn bạn đã đánh giá sản phẩm.")
    return redirect(url_for("index", product=pid, tab="reviews") + "#products")


@app.post("/cart/add")
def add_to_cart():
    p = product_or_404(request.form.get("product_id", type=int) or 0)
    ci, si = request.form.get("color_index",0,type=int), request.form.get("storage_index",0,type=int)
    colors, storages = p.get("colors",[]), p.get("storages",[])
    if not (0 <= ci < len(colors) and 0 <= si < len(storages)):
        abort(400)
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
        cart[i]["quantity"] = min(10, cart[i]["quantity"] + delta)
        if cart[i]["quantity"] <= 0:
            cart.pop(i)
        session.modified = True
    return redirect(url_for("cart"))


@app.post("/cart/remove")
def remove_cart():
    i = request.form.get("index",type=int)
    cart = cart_items()
    if i is not None and 0 <= i < len(cart):
        cart.pop(i)
        session.modified = True
    return redirect(url_for("cart"))


@app.post("/coupon")
def apply_coupon():
    code = request.form.get("coupon", "").strip().upper()
    subtotal = sum(x["price"] * x["quantity"] for x in cart_items())
    coupon = db().execute("SELECT * FROM coupons WHERE code=? AND active=1", (code,)).fetchone()
    if not coupon or subtotal < (coupon["min_total"] if coupon else 0):
        session.pop("coupon", None)
        flash("Mã giảm giá không hợp lệ hoặc chưa đạt giá trị đơn tối thiểu.")
    else:
        session["coupon"] = code
        flash("Đã áp dụng mã " + code + ".")
    return redirect(url_for("cart"))


@app.route("/checkout",methods=["GET","POST"])
def checkout():
    cart = cart_items()
    if not cart:
        flash("Giỏ hàng đang trống.")
        return redirect(url_for("index"))
    subtotal = sum(x["price"] * x["quantity"] for x in cart)
    coupon_code = session.get("coupon")
    coupon = db().execute("SELECT * FROM coupons WHERE code=? AND active=1", (coupon_code,)).fetchone() if coupon_code else None
    discount = 0
    if coupon and subtotal >= coupon["min_total"]:
        discount = min(subtotal, int(subtotal * coupon["value"] / 100) if coupon["kind"] == "percent" else coupon["value"])
    total = subtotal - discount
    if request.method == "POST":
        form = request.form
        errors = {}
        name, phone, address = form.get("fullName","").strip(), form.get("phone","").strip(), form.get("address","").strip()
        payment = form.get("paymentMethod","cod")
        if len(name) < 2: errors["fullName"] = "Vui lòng nhập họ tên."
        if not (phone.isdigit() and len(phone)==10): errors["phone"] = "Số điện thoại phải gồm đúng 10 số."
        if len(address) < 8: errors["address"] = "Vui lòng nhập địa chỉ đầy đủ."
        if payment not in {"cod","qr","momo"}: errors["paymentMethod"] = "Phương thức thanh toán không hợp lệ."
        if errors:
            return render_template("checkout.html",errors=errors,form=form,discount=discount,subtotal=subtotal)
        code = "GT" + secrets.token_hex(4).upper()
        cur = db().execute("""INSERT INTO orders(code,user_id,customer_name,phone,address,payment,subtotal,discount,total,coupon)
            VALUES(?,?,?,?,?,?,?,?,?,?)""",
            (code, session.get("user_id"), name, phone, address, payment, subtotal, discount, total, coupon_code))
        order_id = cur.lastrowid
        for item in cart:
            db().execute("""INSERT INTO order_items(order_id,product_id,name,image,color,storage,price,quantity)
                VALUES(?,?,?,?,?,?,?,?)""",
                (order_id,item["id"],item["name"],item["image"],item["color"],item["storage"],item["price"],item["quantity"]))
        db().commit()
        session["last_order_id"] = order_id
        session.pop("cart", None)
        session.pop("coupon", None)
        return redirect(url_for("success"))
    return render_template("checkout.html",errors={},form={},discount=discount,subtotal=subtotal)


@app.get("/success")
def success():
    order_id = session.get("last_order_id")
    if not order_id:
        return redirect(url_for("index"))
    order = db().execute("SELECT * FROM orders WHERE id=?", (order_id,)).fetchone()
    items = db().execute("SELECT * FROM order_items WHERE order_id=?", (order_id,)).fetchall()
    return render_template("success.html",order=order,items=items)


@app.post("/complete")
def complete():
    session.pop("last_order_id",None)
    flash("Đơn hàng đã được lưu. Bạn có thể theo dõi trong mục Tài khoản.")
    return redirect(url_for("account") if session.get("user_id") else url_for("index"))


@app.get("/admin")
@admin_required
def admin():
    orders = db().execute("SELECT * FROM orders ORDER BY id DESC LIMIT 100").fetchall()
    stats = {
        "orders": db().execute("SELECT COUNT(*) n FROM orders").fetchone()["n"],
        "sales": db().execute("SELECT COALESCE(SUM(total),0) n FROM orders WHERE status!='cancelled'").fetchone()["n"],
        "customers": db().execute("SELECT COUNT(*) n FROM users WHERE role='customer'").fetchone()["n"],
    }
    return render_template("admin.html",orders=orders,stats=stats)


@app.post("/admin/orders/<int:order_id>")
@admin_required
def admin_update_order(order_id):
    status = request.form.get("status")
    if status not in {"pending","confirmed","shipping","completed","cancelled"}:
        abort(400)
    cur = db().execute("UPDATE orders SET status=? WHERE id=?", (status,order_id))
    db().commit()
    if cur.rowcount == 0:
        abort(404)
    flash("Đã cập nhật trạng thái đơn hàng.")
    return redirect(url_for("admin"))


@app.post("/subscribe")
def subscribe():
    email = request.form.get("email","").strip()
    flash("Đăng ký nhận tin thành công!" if "@" in email and "." in email.rsplit("@",1)[-1] else "Email không hợp lệ.")
    return redirect(url_for("index")+"#contact")


if __name__ == "__main__":
    app.run(debug=os.environ.get("FLASK_DEBUG") == "1")
