import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { StructuredData } from "@/components/structured-data";
import { buildMetadata } from "@/lib/seo";
import { formatCurrency, getProduct, products } from "@/lib/sample-data";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) {
    return buildMetadata({
      title: "Khong tim thay san pham",
      description: "San pham khong ton tai.",
      path: `/products/${slug}`
    });
  }

  return buildMetadata({
    title: product.name,
    description: product.shortDescription,
    path: `/products/${product.slug}`
  });
}

export default async function ProductPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) {
    notFound();
  }

  return (
    <div className="container section stack">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.shortDescription,
          offers: {
            "@type": "Offer",
            priceCurrency: "VND",
            price: product.priceVnd
          }
        }}
      />
      <section className="detail-grid">
        <div className="card page-intro stack">
          <span className="chip">{product.categoryName}</span>
          <h1 className="title-md">{product.name}</h1>
          <p className="lead">{product.shortDescription}</p>
          <div className="actions">
            <Link className="button button-primary" href="/quiz">
              Tu van truoc khi mua
            </Link>
            <Link className="button button-secondary" href="/membership">
              Xem goi dong hanh
            </Link>
          </div>
        </div>
        <aside className="card page-intro stack">
          <span className="mini-label">Gia ban</span>
          <strong style={{ fontSize: "2rem" }}>{formatCurrency(product.priceVnd)}</strong>
          <p className="lead">
            Membership eligible: {product.membershipEligible ? "Co" : "Chua"}
          </p>
          <p className="lead">
            CTA thuc te o phase sau se noi checkout, COD va thanh toan online. Phase nay giu dung domain boundary cho PDP.
          </p>
        </aside>
      </section>

      <section className="detail-grid">
        <div className="card page-intro stack">
          <span className="eyebrow">Vi sao de xuat</span>
          <ul className="list">
            {product.benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </div>
        <div className="card page-intro stack">
          <span className="eyebrow">Thanh phan va cach dung</span>
          <p className="lead">Thanh phan: {product.ingredients.join(", ")}.</p>
          <p className="lead">Cach dung: {product.usage}</p>
          <p className="lead">Luu y: {product.caution}</p>
        </div>
      </section>
    </div>
  );
}
