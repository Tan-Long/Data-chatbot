from __future__ import annotations

from enum import StrEnum

from sqlalchemy import Boolean, Enum, ForeignKey, Integer, Numeric, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .db import Base, TimestampMixin


class CustomerStatus(StrEnum):
    LEAD = "lead"
    ACTIVE = "active"
    VIP = "vip"


class OrderStatus(StrEnum):
    DRAFT = "draft"
    PENDING_PAYMENT = "pending_payment"
    CONFIRMED = "confirmed"
    PACKING = "packing"
    SHIPPING = "shipping"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    REFUNDED = "refunded"


class MembershipStatus(StrEnum):
    NONE = "none"
    PENDING = "pending"
    ACTIVE = "active"
    EXPIRED = "expired"


class AdminRole(StrEnum):
    ADMIN = "admin"


class Category(Base, TimestampMixin):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(primary_key=True)
    slug: Mapped[str] = mapped_column(String(120), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(200))
    summary: Mapped[str] = mapped_column(Text())
    seo_title: Mapped[str] = mapped_column(String(200))
    seo_description: Mapped[str] = mapped_column(String(320))

    products: Mapped[list["Product"]] = relationship(
        back_populates="category", cascade="all, delete-orphan"
    )


class Product(Base, TimestampMixin):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(primary_key=True)
    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id"))
    slug: Mapped[str] = mapped_column(String(120), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(200))
    short_description: Mapped[str] = mapped_column(Text())
    benefits: Mapped[str] = mapped_column(Text())
    ingredients: Mapped[str] = mapped_column(Text())
    usage: Mapped[str] = mapped_column(Text())
    caution: Mapped[str] = mapped_column(Text())
    price_vnd: Mapped[float] = mapped_column(Numeric(12, 2))
    membership_eligible: Mapped[bool] = mapped_column(Boolean(), default=False)
    is_published: Mapped[bool] = mapped_column(Boolean(), default=True)

    category: Mapped["Category"] = relationship(back_populates="products")
    order_items: Mapped[list["OrderItem"]] = relationship(back_populates="product")


class Article(Base, TimestampMixin):
    __tablename__ = "articles"

    id: Mapped[int] = mapped_column(primary_key=True)
    slug: Mapped[str] = mapped_column(String(120), unique=True, index=True)
    title: Mapped[str] = mapped_column(String(200))
    excerpt: Mapped[str] = mapped_column(Text())
    body: Mapped[str] = mapped_column(Text())
    seo_title: Mapped[str] = mapped_column(String(200))
    seo_description: Mapped[str] = mapped_column(String(320))
    topic: Mapped[str] = mapped_column(String(80))
    is_published: Mapped[bool] = mapped_column(Boolean(), default=True)


class Customer(Base, TimestampMixin):
    __tablename__ = "customers"

    id: Mapped[int] = mapped_column(primary_key=True)
    full_name: Mapped[str] = mapped_column(String(160))
    phone: Mapped[str] = mapped_column(String(30), unique=True, index=True)
    email: Mapped[str | None] = mapped_column(String(160), nullable=True)
    status: Mapped[CustomerStatus] = mapped_column(Enum(CustomerStatus))
    lead_source: Mapped[str] = mapped_column(String(80))
    primary_goal: Mapped[str | None] = mapped_column(String(120), nullable=True)
    membership_status: Mapped[MembershipStatus] = mapped_column(Enum(MembershipStatus))
    notes: Mapped[str | None] = mapped_column(Text(), nullable=True)

    tags: Mapped[list["CustomerTag"]] = relationship(
        back_populates="customer", cascade="all, delete-orphan"
    )
    orders: Mapped[list["Order"]] = relationship(
        back_populates="customer", cascade="all, delete-orphan"
    )
    quizzes: Mapped[list["QuizSubmission"]] = relationship(
        back_populates="customer", cascade="all, delete-orphan"
    )
    chats: Mapped[list["ChatSession"]] = relationship(
        back_populates="customer", cascade="all, delete-orphan"
    )


class CustomerTag(Base):
    __tablename__ = "customer_tags"

    id: Mapped[int] = mapped_column(primary_key=True)
    customer_id: Mapped[int] = mapped_column(ForeignKey("customers.id"))
    tag: Mapped[str] = mapped_column(String(64), index=True)

    customer: Mapped["Customer"] = relationship(back_populates="tags")


class Order(Base, TimestampMixin):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(primary_key=True)
    customer_id: Mapped[int] = mapped_column(ForeignKey("customers.id"))
    order_code: Mapped[str] = mapped_column(String(40), unique=True, index=True)
    status: Mapped[OrderStatus] = mapped_column(Enum(OrderStatus))
    payment_method: Mapped[str] = mapped_column(String(40))
    total_vnd: Mapped[float] = mapped_column(Numeric(12, 2))
    shipping_city: Mapped[str] = mapped_column(String(80))
    source_channel: Mapped[str] = mapped_column(String(80))

    customer: Mapped["Customer"] = relationship(back_populates="orders")
    items: Mapped[list["OrderItem"]] = relationship(
        back_populates="order", cascade="all, delete-orphan"
    )


class OrderItem(Base):
    __tablename__ = "order_items"

    id: Mapped[int] = mapped_column(primary_key=True)
    order_id: Mapped[int] = mapped_column(ForeignKey("orders.id"))
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id"))
    quantity: Mapped[int] = mapped_column(Integer())
    unit_price_vnd: Mapped[float] = mapped_column(Numeric(12, 2))

    order: Mapped["Order"] = relationship(back_populates="items")
    product: Mapped["Product"] = relationship(back_populates="order_items")


class MembershipEnrollment(Base, TimestampMixin):
    __tablename__ = "membership_enrollments"

    id: Mapped[int] = mapped_column(primary_key=True)
    customer_id: Mapped[int] = mapped_column(ForeignKey("customers.id"))
    tier_name: Mapped[str] = mapped_column(String(100))
    status: Mapped[MembershipStatus] = mapped_column(Enum(MembershipStatus))
    entitlement_summary: Mapped[str] = mapped_column(Text())


class QuizSubmission(Base, TimestampMixin):
    __tablename__ = "quiz_submissions"

    id: Mapped[int] = mapped_column(primary_key=True)
    customer_id: Mapped[int | None] = mapped_column(
        ForeignKey("customers.id"), nullable=True
    )
    goal: Mapped[str] = mapped_column(String(120))
    concern: Mapped[str] = mapped_column(String(120))
    preferred_format: Mapped[str] = mapped_column(String(80))

    customer: Mapped["Customer"] = relationship(back_populates="quizzes")


class ChatSession(Base, TimestampMixin):
    __tablename__ = "chat_sessions"

    id: Mapped[int] = mapped_column(primary_key=True)
    customer_id: Mapped[int | None] = mapped_column(
        ForeignKey("customers.id"), nullable=True
    )
    channel: Mapped[str] = mapped_column(String(50))
    summary: Mapped[str] = mapped_column(Text())
    requires_handoff: Mapped[bool] = mapped_column(Boolean(), default=False)
    sentiment: Mapped[str] = mapped_column(String(40), default="neutral")

    customer: Mapped["Customer"] = relationship(back_populates="chats")


class AdminUser(Base, TimestampMixin):
    __tablename__ = "admin_users"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(80), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    role: Mapped[AdminRole] = mapped_column(Enum(AdminRole), default=AdminRole.ADMIN)
    is_active: Mapped[bool] = mapped_column(Boolean(), default=True)
