from __future__ import annotations

from decimal import Decimal

from .models import Article, Category, Customer, Order, OrderItem, Product
from .schemas import (
    ArticleOut,
    CategoryOut,
    CustomerOut,
    OrderItemOut,
    OrderOut,
    ProductOut,
)


def split_text_list(value: str) -> list[str]:
    return [item.strip() for item in value.split("|") if item.strip()]


def join_text_list(values: list[str]) -> str:
    return " | ".join(item.strip() for item in values if item.strip())


def decimal_to_int(value: Decimal | float | int) -> int:
    return int(value)


def category_to_out(category: Category) -> CategoryOut:
    return CategoryOut(
        id=category.id,
        slug=category.slug,
        name=category.name,
        summary=category.summary,
        seo_title=category.seo_title,
        seo_description=category.seo_description,
    )


def product_to_out(product: Product) -> ProductOut:
    return ProductOut(
        id=product.id,
        slug=product.slug,
        name=product.name,
        category_id=product.category_id,
        category_slug=product.category.slug,
        category_name=product.category.name,
        short_description=product.short_description,
        benefits=split_text_list(product.benefits),
        ingredients=split_text_list(product.ingredients),
        usage=product.usage,
        caution=product.caution,
        price_vnd=decimal_to_int(product.price_vnd),
        membership_eligible=product.membership_eligible,
        is_published=product.is_published,
    )


def article_to_out(article: Article) -> ArticleOut:
    return ArticleOut(
        id=article.id,
        slug=article.slug,
        title=article.title,
        excerpt=article.excerpt,
        body=article.body,
        topic=article.topic,
        seo_title=article.seo_title,
        seo_description=article.seo_description,
        is_published=article.is_published,
    )


def customer_to_out(customer: Customer) -> CustomerOut:
    return CustomerOut(
        id=customer.id,
        full_name=customer.full_name,
        phone=customer.phone,
        email=customer.email,
        status=customer.status.value,
        lead_source=customer.lead_source,
        primary_goal=customer.primary_goal,
        membership_status=customer.membership_status.value,
        tags=[tag.tag for tag in customer.tags],
        notes=customer.notes,
    )


def order_item_to_out(item: OrderItem) -> OrderItemOut:
    return OrderItemOut(
        id=item.id,
        product_id=item.product_id,
        product_slug=item.product.slug,
        product_name=item.product.name,
        quantity=item.quantity,
        unit_price_vnd=decimal_to_int(item.unit_price_vnd),
    )


def order_to_out(order: Order) -> OrderOut:
    return OrderOut(
        id=order.id,
        order_code=order.order_code,
        customer_id=order.customer_id,
        customer_name=order.customer.full_name,
        customer_phone=order.customer.phone,
        status=order.status.value,
        payment_method=order.payment_method,
        total_vnd=decimal_to_int(order.total_vnd),
        source_channel=order.source_channel,
        shipping_city=order.shipping_city,
        items=[order_item_to_out(item) for item in order.items],
    )
