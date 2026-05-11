from __future__ import annotations

from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from sqlalchemy.orm import Session

from . import crud
from .config import settings
from .db import Base, engine, get_db
from .models import AdminUser, Category, Customer, Order, Product
from .schemas import (
    AdminProfileOut,
    CategoryCreate,
    CategoryOut,
    CategoryUpdate,
    CheckoutRequest,
    CheckoutResponse,
    CustomerCreate,
    CustomerOut,
    CustomerUpdate,
    DashboardSummaryOut,
    HandoffRequest,
    HandoffResponse,
    LoginRequest,
    OrderCreate,
    OrderOut,
    OrderUpdate,
    ProductCreate,
    ProductOut,
    ProductUpdate,
    QuizRecommendationRequest,
    QuizRecommendationResponse,
    TokenResponse,
)
from .seed import seed_database
from .security import create_access_token, get_current_admin, verify_password
from .serializers import (
    article_to_out,
    category_to_out,
    customer_to_out,
    order_to_out,
    product_to_out,
)


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.create_all(bind=engine)
    with Session(engine) as db:
        seed_database(db)
    yield


app = FastAPI(
    title=settings.app_name,
    version="0.2.0",
    summary="API with database persistence, admin auth, and CRUD for wellness commerce.",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "environment": settings.app_env}


@app.get("/api/categories", response_model=list[CategoryOut])
def list_categories(db: Session = Depends(get_db)):
    return [category_to_out(category) for category in crud.list_categories(db)]


@app.get("/api/products", response_model=list[ProductOut])
def list_products(category: str | None = None, db: Session = Depends(get_db)):
    return [product_to_out(product) for product in crud.list_products(db, category)]


@app.get("/api/products/{slug}", response_model=ProductOut)
def get_product(slug: str, db: Session = Depends(get_db)):
    product = crud.get_product_by_slug(db, slug)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product_to_out(product)


@app.get("/api/articles")
def list_articles(db: Session = Depends(get_db)):
    return [article_to_out(article) for article in crud.list_articles(db)]


@app.get("/api/articles/{slug}")
def get_article(slug: str, db: Session = Depends(get_db)):
    article = crud.get_article_by_slug(db, slug)
    if article is None:
        raise HTTPException(status_code=404, detail="Article not found")
    return article_to_out(article)


@app.get("/api/customers", response_model=list[CustomerOut])
def list_customers(db: Session = Depends(get_db)):
    return [customer_to_out(customer) for customer in crud.list_customers(db)]


@app.get("/api/orders", response_model=list[OrderOut])
def list_orders(db: Session = Depends(get_db)):
    return [order_to_out(order) for order in crud.list_orders(db)]


@app.post("/api/orders/checkout", response_model=CheckoutResponse)
def create_checkout(payload: CheckoutRequest, db: Session = Depends(get_db)):
    try:
        order = crud.create_checkout_order(db, payload)
    except ValueError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc

    redirect_url = None
    if payload.payment_method == "online":
        redirect_url = f"https://payments.local/checkout/{order.order_code}"

    return CheckoutResponse(
        order_code=order.order_code,
        status=order.status.value,
        total_vnd=int(order.total_vnd),
        payment_method=order.payment_method,
        payment_redirect_url=redirect_url,
    )


@app.post("/api/quiz/recommend", response_model=QuizRecommendationResponse)
def recommend_products(payload: QuizRecommendationRequest, db: Session = Depends(get_db)):
    preferred = payload.preferred_format.lower()
    goal = payload.goal.lower()

    ranked = []
    for product in crud.list_products(db):
        score = 0
        if preferred in product.name.lower() or preferred in product.category.slug.lower():
            score += 2
        if goal in product.benefits.lower():
            score += 2
        if payload.concern.lower() in product.short_description.lower():
            score += 1
        ranked.append((score, product))

    ranked.sort(key=lambda item: item[0], reverse=True)
    recommendations = [product_to_out(item[1]) for item in ranked[:2]]

    return QuizRecommendationResponse(
        summary=(
            "De xuat dua tren muc tieu, moi quan tam va dinh dang san pham ban uu tien. "
            "Ket qua nay chi mang tinh huong dan chon san pham."
        ),
        recommended_products=recommendations,
        next_step="Xem chi tiet san pham hoac chuyen sang CSKH neu ban can tinh huong dac thu.",
    )


@app.post("/api/chat/handoff", response_model=HandoffResponse)
def build_handoff(payload: HandoffRequest):
    if payload.sensitive:
        return HandoffResponse(
            safe_reply=(
                "Minh co the ho tro ban o goc do thong tin san pham, "
                "nhung truong hop nay nen duoc CSKH hoac chuyen gia phu trach tiep nhan."
            ),
            handoff_required=True,
            conversation_summary=f"{payload.customer_name} can ho tro ve van de nhay cam: {payload.question}",
            next_step="Chuyen yeu cau sang CSKH va giu nguyen context de tranh hoi lai tu dau.",
        )

    return HandoffResponse(
        safe_reply="Chatbot co the tiep tuc huong dan chon san pham trong pham vi thong tin da duyet.",
        handoff_required=False,
        conversation_summary=f"{payload.customer_name} dang hoi: {payload.question}",
        next_step="Tra ve san pham, combo hoac FAQ phu hop.",
    )


@app.post("/api/admin/auth/login", response_model=TokenResponse)
def admin_login(payload: LoginRequest, db: Session = Depends(get_db)):
    admin = db.scalar(select(AdminUser).where(AdminUser.username == payload.username))
    if admin is None or not verify_password(payload.password, admin.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin credentials",
        )
    return TokenResponse(access_token=create_access_token(admin.username))


@app.get("/api/admin/auth/me", response_model=AdminProfileOut)
def admin_me(admin: AdminUser = Depends(get_current_admin)):
    return AdminProfileOut(username=admin.username, role=admin.role.value)


@app.get("/api/admin/dashboard", response_model=DashboardSummaryOut)
def admin_dashboard(
    _: AdminUser = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    return DashboardSummaryOut(**crud.dashboard_summary(db))


@app.get("/api/admin/categories", response_model=list[CategoryOut])
def admin_categories(
    _: AdminUser = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    return [category_to_out(category) for category in crud.list_categories(db)]


@app.post("/api/admin/categories", response_model=CategoryOut)
def create_category(
    payload: CategoryCreate,
    _: AdminUser = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    category = Category(**payload.model_dump())
    db.add(category)
    db.commit()
    db.refresh(category)
    return category_to_out(category)


@app.put("/api/admin/categories/{category_id}", response_model=CategoryOut)
def update_category(
    category_id: int,
    payload: CategoryUpdate,
    _: AdminUser = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    category = db.get(Category, category_id)
    if category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    for key, value in payload.model_dump().items():
        setattr(category, key, value)
    db.commit()
    db.refresh(category)
    return category_to_out(category)


@app.delete("/api/admin/categories/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_category(
    category_id: int,
    _: AdminUser = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    category = db.get(Category, category_id)
    if category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    db.delete(category)
    db.commit()


@app.get("/api/admin/products", response_model=list[ProductOut])
def admin_products(
    _: AdminUser = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    return [product_to_out(product) for product in crud.list_products(db)]


@app.post("/api/admin/products", response_model=ProductOut)
def create_product(
    payload: ProductCreate,
    _: AdminUser = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    return product_to_out(crud.create_product(db, payload))


@app.put("/api/admin/products/{product_id}", response_model=ProductOut)
def update_product(
    product_id: int,
    payload: ProductUpdate,
    _: AdminUser = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    product = db.get(Product, product_id)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product_to_out(crud.update_product(db, product, payload))


@app.delete("/api/admin/products/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(
    product_id: int,
    _: AdminUser = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    product = db.get(Product, product_id)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    crud.delete_product(db, product)


@app.get("/api/admin/customers", response_model=list[CustomerOut])
def admin_customers(
    _: AdminUser = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    return [customer_to_out(customer) for customer in crud.list_customers(db)]


@app.post("/api/admin/customers", response_model=CustomerOut)
def create_customer(
    payload: CustomerCreate,
    _: AdminUser = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    return customer_to_out(crud.create_customer(db, payload))


@app.put("/api/admin/customers/{customer_id}", response_model=CustomerOut)
def update_customer(
    customer_id: int,
    payload: CustomerUpdate,
    _: AdminUser = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    customer = crud.get_customer(db, customer_id)
    if customer is None:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer_to_out(crud.update_customer(db, customer, payload))


@app.delete("/api/admin/customers/{customer_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_customer(
    customer_id: int,
    _: AdminUser = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    customer = crud.get_customer(db, customer_id)
    if customer is None:
        raise HTTPException(status_code=404, detail="Customer not found")
    crud.delete_customer(db, customer)


@app.get("/api/admin/orders", response_model=list[OrderOut])
def admin_orders(
    _: AdminUser = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    return [order_to_out(order) for order in crud.list_orders(db)]


@app.post("/api/admin/orders", response_model=OrderOut)
def create_order(
    payload: OrderCreate,
    _: AdminUser = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    return order_to_out(crud.create_order(db, payload))


@app.put("/api/admin/orders/{order_id}", response_model=OrderOut)
def update_order(
    order_id: int,
    payload: OrderUpdate,
    _: AdminUser = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    order = db.get(Order, order_id)
    if order is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return order_to_out(crud.update_order(db, order, payload))


@app.delete("/api/admin/orders/{order_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_order(
    order_id: int,
    _: AdminUser = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    order = db.get(Order, order_id)
    if order is None:
        raise HTTPException(status_code=404, detail="Order not found")
    crud.delete_order(db, order)
