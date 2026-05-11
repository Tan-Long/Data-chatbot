"use client";

import { startTransition, useEffect, useMemo, useState } from "react";

import { apiRequest } from "@/lib/api";
import { formatCurrency } from "@/lib/sample-data";

type DashboardSummary = {
  product_count: number;
  customer_count: number;
  order_count: number;
  low_stock_watch: number;
};

type Category = {
  id: number;
  slug: string;
  name: string;
  summary: string;
  seo_title: string;
  seo_description: string;
};

type Product = {
  id: number;
  slug: string;
  name: string;
  category_id: number;
  category_slug: string;
  category_name: string;
  short_description: string;
  benefits: string[];
  ingredients: string[];
  usage: string;
  caution: string;
  price_vnd: number;
  membership_eligible: boolean;
  is_published: boolean;
};

type Customer = {
  id: number;
  full_name: string;
  phone: string;
  email: string | null;
  status: string;
  lead_source: string;
  primary_goal: string | null;
  membership_status: string;
  tags: string[];
  notes: string | null;
};

type OrderItem = {
  id: number;
  product_id: number;
  product_slug: string;
  product_name: string;
  quantity: number;
  unit_price_vnd: number;
};

type Order = {
  id: number;
  order_code: string;
  customer_id: number;
  customer_name: string;
  customer_phone: string;
  status: string;
  payment_method: string;
  total_vnd: number;
  source_channel: string;
  shipping_city: string;
  items: OrderItem[];
};

type AdminProfile = {
  username: string;
  role: string;
};

const emptyProductForm = {
  id: 0,
  slug: "",
  name: "",
  category_id: 0,
  short_description: "",
  benefits: "",
  ingredients: "",
  usage: "",
  caution: "",
  price_vnd: "0",
  membership_eligible: false,
  is_published: true
};

const emptyCustomerForm = {
  id: 0,
  full_name: "",
  phone: "",
  email: "",
  status: "lead",
  lead_source: "admin",
  primary_goal: "",
  membership_status: "none",
  tags: "",
  notes: ""
};

const emptyOrderForm = {
  id: 0,
  customer_id: 0,
  payment_method: "cod",
  shipping_city: "Ho Chi Minh",
  source_channel: "admin",
  status: "draft",
  product_id: 0,
  quantity: "1"
};

function joinValues(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function AdminConsole() {
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loginForm, setLoginForm] = useState({ username: "admin", password: "admin123" });
  const [productForm, setProductForm] = useState(emptyProductForm);
  const [customerForm, setCustomerForm] = useState(emptyCustomerForm);
  const [orderForm, setOrderForm] = useState(emptyOrderForm);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const savedToken = window.localStorage.getItem("admin-token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }

    startTransition(() => {
      void loadDashboard(token);
    });
  }, [token]);

  async function loadDashboard(authToken: string) {
    try {
      const [me, dashboard, categoryList, productList, customerList, orderList] =
        await Promise.all([
          apiRequest<AdminProfile>("/api/admin/auth/me", {}, authToken),
          apiRequest<DashboardSummary>("/api/admin/dashboard", {}, authToken),
          apiRequest<Category[]>("/api/admin/categories", {}, authToken),
          apiRequest<Product[]>("/api/admin/products", {}, authToken),
          apiRequest<Customer[]>("/api/admin/customers", {}, authToken),
          apiRequest<Order[]>("/api/admin/orders", {}, authToken)
        ]);
      setProfile(me);
      setSummary(dashboard);
      setCategories(categoryList);
      setProducts(productList);
      setCustomers(customerList);
      setOrders(orderList);
      setError(null);
      if (!productForm.category_id && categoryList[0]) {
        setProductForm((current) => ({ ...current, category_id: categoryList[0].id }));
      }
      if (!orderForm.customer_id && customerList[0] && productList[0]) {
        setOrderForm((current) => ({
          ...current,
          customer_id: customerList[0].id,
          product_id: productList[0].id
        }));
      }
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Khong tai duoc admin data");
    }
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    try {
      const payload = await apiRequest<{ access_token: string }>("/api/admin/auth/login", {
        method: "POST",
        body: JSON.stringify(loginForm)
      });
      window.localStorage.setItem("admin-token", payload.access_token);
      setToken(payload.access_token);
      setError(null);
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Dang nhap that bai");
    } finally {
      setBusy(false);
    }
  }

  function handleLogout() {
    window.localStorage.removeItem("admin-token");
    setToken(null);
    setProfile(null);
  }

  async function saveProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) {
      return;
    }
    setBusy(true);
    const payload = {
      slug: productForm.slug,
      name: productForm.name,
      category_id: Number(productForm.category_id),
      short_description: productForm.short_description,
      benefits: joinValues(productForm.benefits),
      ingredients: joinValues(productForm.ingredients),
      usage: productForm.usage,
      caution: productForm.caution,
      price_vnd: Number(productForm.price_vnd),
      membership_eligible: productForm.membership_eligible,
      is_published: productForm.is_published
    };
    try {
      if (productForm.id) {
        await apiRequest(`/api/admin/products/${productForm.id}`, {
          method: "PUT",
          body: JSON.stringify(payload)
        }, token);
      } else {
        await apiRequest("/api/admin/products", {
          method: "POST",
          body: JSON.stringify(payload)
        }, token);
      }
      setProductForm({
        ...emptyProductForm,
        category_id: categories[0]?.id ?? 0
      });
      await loadDashboard(token);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Khong luu duoc san pham");
    } finally {
      setBusy(false);
    }
  }

  async function saveCustomer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) {
      return;
    }
    setBusy(true);
    const payload = {
      ...customerForm,
      email: customerForm.email || null,
      primary_goal: customerForm.primary_goal || null,
      notes: customerForm.notes || null,
      tags: joinValues(customerForm.tags)
    };
    try {
      if (customerForm.id) {
        await apiRequest(`/api/admin/customers/${customerForm.id}`, {
          method: "PUT",
          body: JSON.stringify(payload)
        }, token);
      } else {
        await apiRequest("/api/admin/customers", {
          method: "POST",
          body: JSON.stringify(payload)
        }, token);
      }
      setCustomerForm(emptyCustomerForm);
      await loadDashboard(token);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Khong luu duoc khach hang");
    } finally {
      setBusy(false);
    }
  }

  async function saveOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) {
      return;
    }
    setBusy(true);
    const payload = {
      customer_id: Number(orderForm.customer_id),
      payment_method: orderForm.payment_method,
      shipping_city: orderForm.shipping_city,
      source_channel: orderForm.source_channel,
      status: orderForm.status,
      items: [
        {
          product_id: Number(orderForm.product_id),
          quantity: Number(orderForm.quantity)
        }
      ]
    };
    try {
      if (orderForm.id) {
        await apiRequest(`/api/admin/orders/${orderForm.id}`, {
          method: "PUT",
          body: JSON.stringify(payload)
        }, token);
      } else {
        await apiRequest("/api/admin/orders", {
          method: "POST",
          body: JSON.stringify(payload)
        }, token);
      }
      setOrderForm({
        ...emptyOrderForm,
        customer_id: customers[0]?.id ?? 0,
        product_id: products[0]?.id ?? 0
      });
      await loadDashboard(token);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Khong luu duoc don hang");
    } finally {
      setBusy(false);
    }
  }

  async function removeEntity(path: string) {
    if (!token) {
      return;
    }
    setBusy(true);
    try {
      await apiRequest(path, { method: "DELETE" }, token);
      await loadDashboard(token);
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Khong xoa duoc ban ghi");
    } finally {
      setBusy(false);
    }
  }

  const productOptions = useMemo(
    () => products.map((product) => ({ value: product.id, label: product.name })),
    [products]
  );

  if (!token) {
    return (
      <section className="card page-intro stack">
        <span className="eyebrow">Admin login</span>
        <h1 className="title-md">Dang nhap admin de thao tac CRUD.</h1>
        <form className="admin-form" onSubmit={handleLogin}>
          <label className="field">
            <span>Username</span>
            <input
              value={loginForm.username}
              onChange={(event) =>
                setLoginForm((current) => ({ ...current, username: event.target.value }))
              }
            />
          </label>
          <label className="field">
            <span>Password</span>
            <input
              type="password"
              value={loginForm.password}
              onChange={(event) =>
                setLoginForm((current) => ({ ...current, password: event.target.value }))
              }
            />
          </label>
          <div className="actions">
            <button className="button button-primary" disabled={busy} type="submit">
              {busy ? "Dang dang nhap..." : "Dang nhap"}
            </button>
            <span className="mini-label">Seed admin: `admin / admin123`</span>
          </div>
          {error ? <p className="admin-error">{error}</p> : null}
        </form>
      </section>
    );
  }

  return (
    <div className="stack">
      <section className="card page-intro stack">
        <div className="admin-toolbar">
          <div>
            <span className="eyebrow">Authenticated admin</span>
            <h1 className="title-md">DB + auth + CRUD da duoc bat.</h1>
            <p className="lead">
              Admin hien dang chay voi token JWT, doc ghi du lieu that tu backend SQLAlchemy.
            </p>
          </div>
          <div className="stack" style={{ gap: 8, alignItems: "flex-end" }}>
            <span className="chip">
              {profile?.username} | {profile?.role}
            </span>
            <button className="button button-secondary" onClick={handleLogout} type="button">
              Dang xuat
            </button>
          </div>
        </div>
        {summary ? (
          <div className="grid admin-grid">
            <article className="card stack">
              <span className="mini-label">Products</span>
              <strong>{summary.product_count}</strong>
            </article>
            <article className="card stack">
              <span className="mini-label">Customers</span>
              <strong>{summary.customer_count}</strong>
            </article>
            <article className="card stack">
              <span className="mini-label">Orders</span>
              <strong>{summary.order_count}</strong>
            </article>
          </div>
        ) : null}
        {error ? <p className="admin-error">{error}</p> : null}
      </section>

      <section className="grid admin-shell">
        <article className="card page-intro stack">
          <span className="eyebrow">Product CRUD</span>
          <form className="admin-form" onSubmit={saveProduct}>
            <div className="form-grid">
              <label className="field">
                <span>Ten san pham</span>
                <input
                  value={productForm.name}
                  onChange={(event) =>
                    setProductForm((current) => ({ ...current, name: event.target.value }))
                  }
                />
              </label>
              <label className="field">
                <span>Slug</span>
                <input
                  value={productForm.slug}
                  onChange={(event) =>
                    setProductForm((current) => ({ ...current, slug: event.target.value }))
                  }
                />
              </label>
              <label className="field">
                <span>Category</span>
                <select
                  value={productForm.category_id}
                  onChange={(event) =>
                    setProductForm((current) => ({
                      ...current,
                      category_id: Number(event.target.value)
                    }))
                  }
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Gia VND</span>
                <input
                  value={productForm.price_vnd}
                  onChange={(event) =>
                    setProductForm((current) => ({ ...current, price_vnd: event.target.value }))
                  }
                />
              </label>
            </div>
            <label className="field">
              <span>Mo ta ngan</span>
              <textarea
                value={productForm.short_description}
                onChange={(event) =>
                  setProductForm((current) => ({
                    ...current,
                    short_description: event.target.value
                  }))
                }
              />
            </label>
            <div className="form-grid">
              <label className="field">
                <span>Benefits, cach nhau boi dau phay</span>
                <input
                  value={productForm.benefits}
                  onChange={(event) =>
                    setProductForm((current) => ({ ...current, benefits: event.target.value }))
                  }
                />
              </label>
              <label className="field">
                <span>Ingredients, cach nhau boi dau phay</span>
                <input
                  value={productForm.ingredients}
                  onChange={(event) =>
                    setProductForm((current) => ({ ...current, ingredients: event.target.value }))
                  }
                />
              </label>
            </div>
            <label className="field">
              <span>Usage</span>
              <input
                value={productForm.usage}
                onChange={(event) =>
                  setProductForm((current) => ({ ...current, usage: event.target.value }))
                }
              />
            </label>
            <label className="field">
              <span>Caution</span>
              <input
                value={productForm.caution}
                onChange={(event) =>
                  setProductForm((current) => ({ ...current, caution: event.target.value }))
                }
              />
            </label>
            <div className="actions">
              <button className="button button-primary" disabled={busy} type="submit">
                {productForm.id ? "Cap nhat product" : "Tao product"}
              </button>
              <button
                className="button button-secondary"
                onClick={() =>
                  setProductForm({
                    ...emptyProductForm,
                    category_id: categories[0]?.id ?? 0
                  })
                }
                type="button"
              >
                Reset
              </button>
            </div>
          </form>
          <div className="admin-list">
            {products.map((product) => (
              <div className="admin-row" key={product.id}>
                <div>
                  <strong>{product.name}</strong>
                  <p className="lead" style={{ margin: "6px 0 0" }}>
                    {product.category_name} | {formatCurrency(product.price_vnd)}
                  </p>
                </div>
                <div className="actions">
                  <button
                    className="button button-secondary"
                    onClick={() =>
                      setProductForm({
                        id: product.id,
                        slug: product.slug,
                        name: product.name,
                        category_id: product.category_id,
                        short_description: product.short_description,
                        benefits: product.benefits.join(", "),
                        ingredients: product.ingredients.join(", "),
                        usage: product.usage,
                        caution: product.caution,
                        price_vnd: String(product.price_vnd),
                        membership_eligible: product.membership_eligible,
                        is_published: product.is_published
                      })
                    }
                    type="button"
                  >
                    Sua
                  </button>
                  <button
                    className="button button-secondary"
                    onClick={() => void removeEntity(`/api/admin/products/${product.id}`)}
                    type="button"
                  >
                    Xoa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="card page-intro stack">
          <span className="eyebrow">Customer CRUD</span>
          <form className="admin-form" onSubmit={saveCustomer}>
            <div className="form-grid">
              <label className="field">
                <span>Ho ten</span>
                <input
                  value={customerForm.full_name}
                  onChange={(event) =>
                    setCustomerForm((current) => ({ ...current, full_name: event.target.value }))
                  }
                />
              </label>
              <label className="field">
                <span>Phone</span>
                <input
                  value={customerForm.phone}
                  onChange={(event) =>
                    setCustomerForm((current) => ({ ...current, phone: event.target.value }))
                  }
                />
              </label>
              <label className="field">
                <span>Email</span>
                <input
                  value={customerForm.email}
                  onChange={(event) =>
                    setCustomerForm((current) => ({ ...current, email: event.target.value }))
                  }
                />
              </label>
              <label className="field">
                <span>Status</span>
                <select
                  value={customerForm.status}
                  onChange={(event) =>
                    setCustomerForm((current) => ({ ...current, status: event.target.value }))
                  }
                >
                  <option value="lead">lead</option>
                  <option value="active">active</option>
                  <option value="vip">vip</option>
                </select>
              </label>
            </div>
            <div className="form-grid">
              <label className="field">
                <span>Lead source</span>
                <input
                  value={customerForm.lead_source}
                  onChange={(event) =>
                    setCustomerForm((current) => ({
                      ...current,
                      lead_source: event.target.value
                    }))
                  }
                />
              </label>
              <label className="field">
                <span>Primary goal</span>
                <input
                  value={customerForm.primary_goal}
                  onChange={(event) =>
                    setCustomerForm((current) => ({
                      ...current,
                      primary_goal: event.target.value
                    }))
                  }
                />
              </label>
              <label className="field">
                <span>Membership</span>
                <select
                  value={customerForm.membership_status}
                  onChange={(event) =>
                    setCustomerForm((current) => ({
                      ...current,
                      membership_status: event.target.value
                    }))
                  }
                >
                  <option value="none">none</option>
                  <option value="pending">pending</option>
                  <option value="active">active</option>
                  <option value="expired">expired</option>
                </select>
              </label>
              <label className="field">
                <span>Tags</span>
                <input
                  value={customerForm.tags}
                  onChange={(event) =>
                    setCustomerForm((current) => ({ ...current, tags: event.target.value }))
                  }
                />
              </label>
            </div>
            <label className="field">
              <span>Notes</span>
              <textarea
                value={customerForm.notes}
                onChange={(event) =>
                  setCustomerForm((current) => ({ ...current, notes: event.target.value }))
                }
              />
            </label>
            <div className="actions">
              <button className="button button-primary" disabled={busy} type="submit">
                {customerForm.id ? "Cap nhat customer" : "Tao customer"}
              </button>
              <button
                className="button button-secondary"
                onClick={() => setCustomerForm(emptyCustomerForm)}
                type="button"
              >
                Reset
              </button>
            </div>
          </form>
          <div className="admin-list">
            {customers.map((customer) => (
              <div className="admin-row" key={customer.id}>
                <div>
                  <strong>{customer.full_name}</strong>
                  <p className="lead" style={{ margin: "6px 0 0" }}>
                    {customer.phone} | {customer.membership_status}
                  </p>
                </div>
                <div className="actions">
                  <button
                    className="button button-secondary"
                    onClick={() =>
                      setCustomerForm({
                        id: customer.id,
                        full_name: customer.full_name,
                        phone: customer.phone,
                        email: customer.email ?? "",
                        status: customer.status,
                        lead_source: customer.lead_source,
                        primary_goal: customer.primary_goal ?? "",
                        membership_status: customer.membership_status,
                        tags: customer.tags.join(", "),
                        notes: customer.notes ?? ""
                      })
                    }
                    type="button"
                  >
                    Sua
                  </button>
                  <button
                    className="button button-secondary"
                    onClick={() => void removeEntity(`/api/admin/customers/${customer.id}`)}
                    type="button"
                  >
                    Xoa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="card page-intro stack">
          <span className="eyebrow">Order CRUD</span>
          <form className="admin-form" onSubmit={saveOrder}>
            <div className="form-grid">
              <label className="field">
                <span>Customer</span>
                <select
                  value={orderForm.customer_id}
                  onChange={(event) =>
                    setOrderForm((current) => ({
                      ...current,
                      customer_id: Number(event.target.value)
                    }))
                  }
                >
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.full_name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Product</span>
                <select
                  value={orderForm.product_id}
                  onChange={(event) =>
                    setOrderForm((current) => ({
                      ...current,
                      product_id: Number(event.target.value)
                    }))
                  }
                >
                  {productOptions.map((product) => (
                    <option key={product.value} value={product.value}>
                      {product.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Quantity</span>
                <input
                  value={orderForm.quantity}
                  onChange={(event) =>
                    setOrderForm((current) => ({ ...current, quantity: event.target.value }))
                  }
                />
              </label>
              <label className="field">
                <span>Payment</span>
                <select
                  value={orderForm.payment_method}
                  onChange={(event) =>
                    setOrderForm((current) => ({
                      ...current,
                      payment_method: event.target.value
                    }))
                  }
                >
                  <option value="cod">cod</option>
                  <option value="online">online</option>
                </select>
              </label>
            </div>
            <div className="form-grid">
              <label className="field">
                <span>Shipping city</span>
                <input
                  value={orderForm.shipping_city}
                  onChange={(event) =>
                    setOrderForm((current) => ({
                      ...current,
                      shipping_city: event.target.value
                    }))
                  }
                />
              </label>
              <label className="field">
                <span>Source channel</span>
                <input
                  value={orderForm.source_channel}
                  onChange={(event) =>
                    setOrderForm((current) => ({
                      ...current,
                      source_channel: event.target.value
                    }))
                  }
                />
              </label>
              <label className="field">
                <span>Status</span>
                <select
                  value={orderForm.status}
                  onChange={(event) =>
                    setOrderForm((current) => ({ ...current, status: event.target.value }))
                  }
                >
                  <option value="draft">draft</option>
                  <option value="pending_payment">pending_payment</option>
                  <option value="confirmed">confirmed</option>
                  <option value="packing">packing</option>
                  <option value="shipping">shipping</option>
                  <option value="completed">completed</option>
                  <option value="cancelled">cancelled</option>
                  <option value="refunded">refunded</option>
                </select>
              </label>
            </div>
            <div className="actions">
              <button className="button button-primary" disabled={busy} type="submit">
                {orderForm.id ? "Cap nhat order" : "Tao order"}
              </button>
              <button
                className="button button-secondary"
                onClick={() =>
                  setOrderForm({
                    ...emptyOrderForm,
                    customer_id: customers[0]?.id ?? 0,
                    product_id: products[0]?.id ?? 0
                  })
                }
                type="button"
              >
                Reset
              </button>
            </div>
          </form>
          <div className="admin-list">
            {orders.map((order) => (
              <div className="admin-row" key={order.id}>
                <div>
                  <strong>{order.order_code}</strong>
                  <p className="lead" style={{ margin: "6px 0 0" }}>
                    {order.customer_name} | {order.status} | {formatCurrency(order.total_vnd)}
                  </p>
                </div>
                <div className="actions">
                  <button
                    className="button button-secondary"
                    onClick={() =>
                      setOrderForm({
                        id: order.id,
                        customer_id: order.customer_id,
                        payment_method: order.payment_method,
                        shipping_city: order.shipping_city,
                        source_channel: order.source_channel,
                        status: order.status,
                        product_id: order.items[0]?.product_id ?? products[0]?.id ?? 0,
                        quantity: String(order.items[0]?.quantity ?? 1)
                      })
                    }
                    type="button"
                  >
                    Sua
                  </button>
                  <button
                    className="button button-secondary"
                    onClick={() => void removeEntity(`/api/admin/orders/${order.id}`)}
                    type="button"
                  >
                    Xoa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

