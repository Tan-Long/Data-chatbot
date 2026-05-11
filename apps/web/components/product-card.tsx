import Link from "next/link";

import { formatCurrency, type Product } from "@/lib/sample-data";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card stack">
      <span className="chip">{product.categoryName}</span>
      <h3 className="title-sm">{product.name}</h3>
      <p className="lead">{product.shortDescription}</p>
      <div className="stack" style={{ gap: 8 }}>
        <span className="mini-label">Phu hop</span>
        <p style={{ margin: 0 }}>{product.benefits.slice(0, 2).join(" | ")}</p>
      </div>
      <div className="actions" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <strong>{formatCurrency(product.priceVnd)}</strong>
        <Link className="button button-secondary" href={`/products/${product.slug}`}>
          Xem san pham
        </Link>
      </div>
    </article>
  );
}
