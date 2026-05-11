from __future__ import annotations

from datetime import UTC, datetime

from sqlalchemy import func, select
from sqlalchemy.orm import Session, joinedload, selectinload

from .models import (
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
from .schemas import (
    CheckoutRequest,
    CustomerCreate,
    CustomerUpdate,
    OrderCreate,
    OrderUpdate,
    ProductCreate,
    ProductUpdate,
)
from .serializers import join_text_list


def list_categories(db: Session) -> list[Category]:
    return list(db.scalars(select(Category).order_by(Category.name)))


def list_products(db: Session, category_slug: str | None = None) -> list[Product]:
    query = select(Product).options(joinedload(Product.category)).order_by(Product.name)
    if category_slug:
        query = query.join(Product.category).where(Category.slug == category_slug)
    return list(db.scalars(query).unique())


def get_product_by_slug(db: Session, slug: str) -> Product | None:
    query = (
        select(Product)
        .options(joinedload(Product.category))
        .where(Product.slug == slug)
    )
    return db.scalar(query)


def list_articles(db: Session) -> list[Article]:
    return list(db.scalars(select(Article).order_by(Article.created_at.desc())))


def get_article_by_slug(db: Session, slug: str) -> Article | None:
    return db.scalar(select(Article).where(Article.slug == slug))


def list_customers(db: Session) -> list[Customer]:
    query = select(Customer).options(selectinload(Customer.tags)).order_by(Customer.created_at.desc())
    return list(db.scalars(query).unique())


def get_customer(db: Session, customer_id: int) -> Customer | None:
    query = select(Customer).options(selectinload(Customer.tags)).where(Customer.id == customer_id)
    return db.scalar(query)


def list_orders(db: Session) -> list[Order]:
    query = (
        select(Order)
        .options(
            joinedload(Order.customer),
            selectinload(Order.items).joinedload(OrderItem.product),
        )
        .order_by(Order.created_at.desc())
    )
    return list(db.scalars(query).unique())


def get_order(db: Session, order_id: int) -> Order | None:
    query = (
        select(Order)
        .options(
            joinedload(Order.customer),
            selectinload(Order.items).joinedload(OrderItem.product),
        )
        .where(Order.id == order_id)
    )
    return db.scalar(query)


def dashboard_summary(db: Session) -> dict[str, int]:
    return {
        "product_count": db.scalar(select(func.count(Product.id))) or 0,
        "customer_count": db.scalar(select(func.count(Customer.id))) or 0,
        "order_count": db.scalar(select(func.count(Order.id))) or 0,
        "low_stock_watch": 0,
    }


def create_product(db: Session, payload: ProductCreate) -> Product:
    product = Product(
        slug=payload.slug,
        name=payload.name,
        category_id=payload.category_id,
        short_description=payload.short_description,
        benefits=join_text_list(payload.benefits),
        ingredients=join_text_list(payload.ingredients),
        usage=payload.usage,
        caution=payload.caution,
        price_vnd=payload.price_vnd,
        membership_eligible=payload.membership_eligible,
        is_published=payload.is_published,
    )
    db.add(product)
    db.commit()
    return db.scalar(
        select(Product)
        .options(joinedload(Product.category))
        .where(Product.id == product.id)
    )


def update_product(db: Session, product: Product, payload: ProductUpdate) -> Product:
    product.slug = payload.slug
    product.name = payload.name
    product.category_id = payload.category_id
    product.short_description = payload.short_description
    product.benefits = join_text_list(payload.benefits)
    product.ingredients = join_text_list(payload.ingredients)
    product.usage = payload.usage
    product.caution = payload.caution
    product.price_vnd = payload.price_vnd
    product.membership_eligible = payload.membership_eligible
    product.is_published = payload.is_published
    db.commit()
    return db.scalar(
        select(Product)
        .options(joinedload(Product.category))
        .where(Product.id == product.id)
    )


def delete_product(db: Session, product: Product) -> None:
    db.delete(product)
    db.commit()


def create_customer(db: Session, payload: CustomerCreate) -> Customer:
    customer = Customer(
        full_name=payload.full_name,
        phone=payload.phone,
        email=payload.email,
        status=CustomerStatus(payload.status),
        lead_source=payload.lead_source,
        primary_goal=payload.primary_goal,
        membership_status=MembershipStatus(payload.membership_status),
        notes=payload.notes,
    )
    db.add(customer)
    db.flush()
    for tag in payload.tags:
        db.add(CustomerTag(customer_id=customer.id, tag=tag))
    db.commit()
    return get_customer(db, customer.id)


def update_customer(db: Session, customer: Customer, payload: CustomerUpdate) -> Customer:
    customer.full_name = payload.full_name
    customer.phone = payload.phone
    customer.email = payload.email
    customer.status = CustomerStatus(payload.status)
    customer.lead_source = payload.lead_source
    customer.primary_goal = payload.primary_goal
    customer.membership_status = MembershipStatus(payload.membership_status)
    customer.notes = payload.notes
    customer.tags.clear()
    for tag in payload.tags:
        customer.tags.append(CustomerTag(tag=tag))
    db.commit()
    return get_customer(db, customer.id)


def delete_customer(db: Session, customer: Customer) -> None:
    db.delete(customer)
    db.commit()


def create_order(db: Session, payload: OrderCreate) -> Order:
    order = Order(
        customer_id=payload.customer_id,
        order_code=_generate_order_code(db),
        status=OrderStatus(payload.status),
        payment_method=payload.payment_method,
        shipping_city=payload.shipping_city,
        source_channel=payload.source_channel,
        total_vnd=0,
    )
    db.add(order)
    db.flush()
    order.total_vnd = _replace_order_items(db, order, payload.items)
    db.commit()
    return get_order(db, order.id)


def update_order(db: Session, order: Order, payload: OrderUpdate) -> Order:
    order.customer_id = payload.customer_id
    order.status = OrderStatus(payload.status)
    order.payment_method = payload.payment_method
    order.shipping_city = payload.shipping_city
    order.source_channel = payload.source_channel
    order.total_vnd = _replace_order_items(db, order, payload.items)
    db.commit()
    return get_order(db, order.id)


def delete_order(db: Session, order: Order) -> None:
    db.delete(order)
    db.commit()


def create_checkout_order(db: Session, payload: CheckoutRequest) -> Order:
    customer = db.scalar(select(Customer).where(Customer.phone == payload.phone))
    if customer is None:
        customer = Customer(
            full_name=payload.customer_name,
            phone=payload.phone,
            email=None,
            status=CustomerStatus.LEAD,
            lead_source=payload.source_channel,
            primary_goal=None,
            membership_status=MembershipStatus.NONE,
            notes="Created from checkout",
        )
        db.add(customer)
        db.flush()

    slug_lookup = {product.slug: product for product in db.scalars(select(Product))}
    order = Order(
        customer_id=customer.id,
        order_code=_generate_order_code(db),
        status=OrderStatus.CONFIRMED
        if payload.payment_method == "cod"
        else OrderStatus.PENDING_PAYMENT,
        payment_method=payload.payment_method,
        shipping_city=payload.city,
        source_channel=payload.source_channel,
        total_vnd=0,
    )
    db.add(order)
    db.flush()

    total = 0
    for item in payload.items:
        product = slug_lookup.get(item.product_slug)
        if product is None:
            raise ValueError(f"Product not found: {item.product_slug}")
        total += int(product.price_vnd) * item.quantity
        db.add(
            OrderItem(
                order_id=order.id,
                product_id=product.id,
                quantity=item.quantity,
                unit_price_vnd=product.price_vnd,
            )
        )

    order.total_vnd = total
    db.commit()
    return get_order(db, order.id)


def _replace_order_items(db: Session, order: Order, items) -> int:
    db.query(OrderItem).filter(OrderItem.order_id == order.id).delete()
    total = 0
    product_ids = [item.product_id for item in items]
    products = {
        product.id: product
        for product in db.scalars(select(Product).where(Product.id.in_(product_ids)))
    }
    for item in items:
        product = products[item.product_id]
        total += int(product.price_vnd) * item.quantity
        db.add(
            OrderItem(
                order_id=order.id,
                product_id=product.id,
                quantity=item.quantity,
                unit_price_vnd=product.price_vnd,
            )
        )
    db.flush()
    return total


def _generate_order_code(db: Session) -> str:
    count = (db.scalar(select(func.count(Order.id))) or 0) + 1
    return f"ORD-{datetime.now(UTC):%y%m%d}-{count:03d}"
