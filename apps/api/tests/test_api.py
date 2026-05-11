from __future__ import annotations

import os
from pathlib import Path

from fastapi.testclient import TestClient

test_db_path = Path("test_wellness.db")
if test_db_path.exists():
    test_db_path.unlink()

os.environ["WELLNESS_DATABASE_URL"] = "sqlite:///./test_wellness.db"
os.environ["WELLNESS_ADMIN_SEED_USERNAME"] = "admin"
os.environ["WELLNESS_ADMIN_SEED_PASSWORD"] = "admin123"

from app.main import app  # noqa: E402


def test_health_endpoint():
    with TestClient(app) as client:
        response = client.get("/health")

    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_product_detail_endpoint():
    with TestClient(app) as client:
        response = client.get("/api/products/ginger-shot-nghe-mat-ong")

    assert response.status_code == 200
    assert response.json()["slug"] == "ginger-shot-nghe-mat-ong"


def test_quiz_recommendation_returns_products():
    with TestClient(app) as client:
        response = client.post(
            "/api/quiz/recommend",
            json={
                "goal": "tieu hoa",
                "concern": "nhe bung",
                "preferred_format": "shot",
            },
        )

    assert response.status_code == 200
    payload = response.json()
    assert len(payload["recommended_products"]) == 2
    assert payload["recommended_products"][0]["slug"] == "ginger-shot-nghe-mat-ong"


def test_checkout_endpoint_for_cod():
    with TestClient(app) as client:
        response = client.post(
            "/api/orders/checkout",
            json={
                "customer_name": "Le Minh Anh",
                "phone": "0901234567",
                "city": "Ho Chi Minh",
                "payment_method": "cod",
                "items": [
                    {"product_slug": "combo-detox-3-ngay", "quantity": 1},
                    {"product_slug": "ginger-shot-nghe-mat-ong", "quantity": 2},
                ],
            },
        )

    assert response.status_code == 200
    payload = response.json()
    assert payload["status"] == "confirmed"
    assert payload["total_vnd"] == 367000


def test_admin_auth_and_product_crud():
    with TestClient(app) as client:
        unauthorized = client.get("/api/admin/products")
        assert unauthorized.status_code == 401

        login_response = client.post(
            "/api/admin/auth/login",
            json={"username": "admin", "password": "admin123"},
        )
        assert login_response.status_code == 200
        token = login_response.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}

        categories = client.get("/api/admin/categories", headers=headers).json()
        created = client.post(
            "/api/admin/products",
            headers=headers,
            json={
                "slug": "membership-juice-demo",
                "name": "Membership Juice Demo",
                "category_id": categories[0]["id"],
                "short_description": "Ban demo cho admin CRUD.",
                "benefits": ["giu nep", "de upsell"],
                "ingredients": ["tao", "chanh"],
                "usage": "Dung lanh vao buoi sang.",
                "caution": "Thong tin demo.",
                "price_vnd": 99000,
                "membership_eligible": True,
                "is_published": True,
            },
        )
        assert created.status_code == 200
        product = created.json()

        updated = client.put(
            f"/api/admin/products/{product['id']}",
            headers=headers,
            json={
                **product,
                "category_id": product["category_id"],
                "benefits": ["giu nep", "co the goi membership"],
                "ingredients": ["tao", "chanh", "gung"],
                "price_vnd": 109000,
            },
        )
        assert updated.status_code == 200
        assert updated.json()["price_vnd"] == 109000

        deleted = client.delete(
            f"/api/admin/products/{product['id']}",
            headers=headers,
        )
        assert deleted.status_code == 204
