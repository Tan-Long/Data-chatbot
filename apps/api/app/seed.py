from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.orm import Session

from .config import settings
from .models import (
    AdminUser,
    Article,
    Category,
    Customer,
    CustomerStatus,
    CustomerTag,
    MembershipStatus,
    Order,
    OrderItem,
    OrderStatus,
    Product,
)
from .sample_data import articles, categories, customers, orders, products
from .security import get_password_hash
from .serializers import join_text_list


def seed_database(db: Session) -> None:
    if db.scalar(select(Category.id).limit(1)) is not None:
        _ensure_admin_user(db)
        return

    category_map: dict[str, Category] = {}
    for item in categories:
        category = Category(
            slug=item.slug,
            name=item.name,
            summary=item.summary,
            seo_title=item.seo_title,
            seo_description=item.seo_description,
        )
        db.add(category)
        db.flush()
        category_map[item.slug] = category

    product_map: dict[str, Product] = {}
    for item in products:
        product = Product(
            category_id=category_map[item.category_slug].id,
            slug=item.slug,
            name=item.name,
            short_description=item.short_description,
            benefits=join_text_list(item.benefits),
            ingredients=join_text_list(item.ingredients),
            usage=item.usage,
            caution=item.caution,
            price_vnd=item.price_vnd,
            membership_eligible=item.membership_eligible,
            is_published=True,
        )
        db.add(product)
        db.flush()
        product_map[item.slug] = product

    for item in articles:
        db.add(
            Article(
                slug=item.slug,
                title=item.title,
                excerpt=item.excerpt,
                body=item.body,
                seo_title=item.seo_title,
                seo_description=item.seo_description,
                topic=item.topic,
                is_published=True,
            )
        )

    customer_map: dict[str, Customer] = {}
    for item in customers:
        customer = Customer(
            full_name=item.full_name,
            phone=item.phone,
            email=item.email,
            status=CustomerStatus(item.status),
            lead_source=item.lead_source,
            primary_goal=item.primary_goal,
            membership_status=MembershipStatus(item.membership_status),
            notes=item.notes,
        )
        db.add(customer)
        db.flush()
        for tag in item.tags:
            db.add(CustomerTag(customer_id=customer.id, tag=tag))
        customer_map[item.phone] = customer

    for item in orders:
        order = Order(
            customer_id=customer_map[item.customer_phone].id,
            order_code=item.order_code,
            status=OrderStatus(item.status),
            payment_method=item.payment_method,
            total_vnd=item.total_vnd,
            shipping_city=item.shipping_city,
            source_channel=item.source_channel,
        )
        db.add(order)
        db.flush()
        for order_item in item.items:
            db.add(
                OrderItem(
                    order_id=order.id,
                    product_id=product_map[order_item.product_slug].id,
                    quantity=order_item.quantity,
                    unit_price_vnd=order_item.unit_price_vnd,
                )
            )

    _ensure_admin_user(db)
    db.commit()


def _ensure_admin_user(db: Session) -> None:
    admin = db.scalar(
        select(AdminUser).where(AdminUser.username == settings.admin_seed_username)
    )
    if admin is not None:
        return

    db.add(
        AdminUser(
            username=settings.admin_seed_username,
            password_hash=get_password_hash(settings.admin_seed_password),
            is_active=True,
        )
    )
    db.commit()
