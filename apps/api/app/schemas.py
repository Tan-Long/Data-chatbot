from __future__ import annotations

from pydantic import BaseModel, Field


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class LoginRequest(BaseModel):
    username: str
    password: str


class AdminProfileOut(BaseModel):
    username: str
    role: str


class CategoryBase(BaseModel):
    slug: str
    name: str
    summary: str
    seo_title: str
    seo_description: str


class CategoryCreate(CategoryBase):
    pass


class CategoryUpdate(CategoryBase):
    pass


class CategoryOut(CategoryBase):
    id: int


class ProductBase(BaseModel):
    slug: str
    name: str
    category_id: int
    short_description: str
    benefits: list[str]
    ingredients: list[str]
    usage: str
    caution: str
    price_vnd: int
    membership_eligible: bool
    is_published: bool = True


class ProductCreate(ProductBase):
    pass


class ProductUpdate(ProductBase):
    pass


class ProductOut(ProductBase):
    id: int
    category_slug: str
    category_name: str


class ArticleOut(BaseModel):
    id: int
    slug: str
    title: str
    excerpt: str
    body: str
    topic: str
    seo_title: str
    seo_description: str
    is_published: bool


class OrderItemOut(BaseModel):
    id: int
    product_id: int
    product_slug: str
    product_name: str
    quantity: int
    unit_price_vnd: int


class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int


class OrderOut(BaseModel):
    id: int
    order_code: str
    customer_id: int
    customer_name: str
    customer_phone: str
    status: str
    payment_method: str
    total_vnd: int
    source_channel: str
    shipping_city: str
    items: list[OrderItemOut]


class OrderBase(BaseModel):
    customer_id: int
    payment_method: str
    shipping_city: str
    source_channel: str
    items: list[OrderItemCreate]


class OrderCreate(OrderBase):
    status: str = "draft"


class OrderUpdate(OrderBase):
    status: str


class CheckoutItemIn(BaseModel):
    product_slug: str
    quantity: int


class CheckoutRequest(BaseModel):
    customer_name: str
    phone: str
    city: str
    payment_method: str = Field(..., examples=["cod", "online"])
    source_channel: str = Field(default="website")
    items: list[CheckoutItemIn]


class CheckoutResponse(BaseModel):
    order_code: str
    status: str
    total_vnd: int
    payment_method: str
    payment_redirect_url: str | None = None


class CustomerBase(BaseModel):
    full_name: str
    phone: str
    email: str | None = None
    status: str
    lead_source: str
    primary_goal: str | None = None
    membership_status: str
    tags: list[str] = []
    notes: str | None = None


class CustomerCreate(CustomerBase):
    pass


class CustomerUpdate(CustomerBase):
    pass


class CustomerOut(CustomerBase):
    id: int


class DashboardSummaryOut(BaseModel):
    product_count: int
    customer_count: int
    order_count: int
    low_stock_watch: int


class QuizRecommendationRequest(BaseModel):
    goal: str = Field(..., examples=["giam can"])
    concern: str = Field(..., examples=["day bung"])
    preferred_format: str = Field(..., examples=["shot"])


class QuizRecommendationResponse(BaseModel):
    summary: str
    recommended_products: list[ProductOut]
    next_step: str


class HandoffRequest(BaseModel):
    customer_name: str
    question: str
    sensitive: bool = False


class HandoffResponse(BaseModel):
    safe_reply: str
    handoff_required: bool
    conversation_summary: str
    next_step: str
