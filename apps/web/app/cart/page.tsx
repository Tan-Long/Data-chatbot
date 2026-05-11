import Link from "next/link";

import { buildMetadata } from "@/lib/seo";
import { formatCurrency, products } from "@/lib/sample-data";

export const metadata = buildMetadata({
  title: "Cart foundation",
  description:
    "Cart page foundation cho phase 1 ecommerce: order summary, coupon placeholder, va duong dan den checkout.",
  path: "/cart"
});

const cartItems = [
  { slug: "combo-detox-3-ngay", quantity: 1 },
  { slug: "ginger-shot-nghe-mat-ong", quantity: 2 }
];

export default function CartPage() {
  const items = cartItems.map((cartItem) => {
    const product = products.find((item) => item.slug === cartItem.slug);
    if (!product) {
      throw new Error(`Missing sample product: ${cartItem.slug}`);
    }

    return { ...cartItem, product };
  });

  const total = items.reduce((sum, item) => sum + item.product.priceVnd * item.quantity, 0);

  return (
    <div className="container section stack">
      <section className="card page-intro stack">
        <span className="eyebrow">Cart foundation</span>
        <h1 className="title-md">Cart can gon, ro, va nhin thay ly do quay lai membership hay quiz.</h1>
        <p className="lead">
          Foundation nay chua co state management thuc te, nhung da mo ta dung journey va du lieu can cho checkout.
        </p>
      </section>
      <section className="card page-intro stack">
        {items.map((item) => (
          <div key={item.slug} className="card" style={{ padding: 16 }}>
            <strong>{item.product.name}</strong>
            <p className="lead" style={{ marginBottom: 0 }}>
              {item.quantity} x {formatCurrency(item.product.priceVnd)}
            </p>
          </div>
        ))}
        <div className="actions" style={{ justifyContent: "space-between" }}>
          <strong>Tong tam tinh: {formatCurrency(total)}</strong>
          <Link className="button button-primary" href="/checkout">
            Tiep tuc checkout
          </Link>
        </div>
      </section>
    </div>
  );
}

