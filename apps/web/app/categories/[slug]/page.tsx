import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductCard } from "@/components/product-card";
import { StructuredData } from "@/components/structured-data";
import { buildMetadata } from "@/lib/seo";
import { categories, getCategory, getProductsByCategory } from "@/lib/sample-data";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) {
    return buildMetadata({
      title: "Khong tim thay danh muc",
      description: "Danh muc khong ton tai.",
      path: `/categories/${slug}`
    });
  }

  return buildMetadata({
    title: category.seoTitle,
    description: category.seoDescription,
    path: `/categories/${category.slug}`
  });
}

export default async function CategoryPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) {
    notFound();
  }

  const categoryProducts = getProductsByCategory(category.slug);

  return (
    <div className="container section stack">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: category.name,
          description: category.seoDescription
        }}
      />
      <section className="card page-intro">
        <span className="eyebrow">Category landing</span>
        <h1 className="title-md">{category.name}</h1>
        <p className="lead">{category.summary}</p>
        <p className="lead">
          Trang nay duoc dung nhu mot SEO landing co the dat canh blog, quiz va PDP trong cung mot cum
          chu de.
        </p>
      </section>
      <div className="grid product-grid">
        {categoryProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
