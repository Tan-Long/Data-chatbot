import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StructuredData } from "@/components/structured-data";
import { buildMetadata } from "@/lib/seo";
import { articles, getArticle } from "@/lib/sample-data";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) {
    return buildMetadata({
      title: "Khong tim thay bai viet",
      description: "Bai viet khong ton tai.",
      path: `/blog/${slug}`
    });
  }

  return buildMetadata({
    title: article.seoTitle,
    description: article.seoDescription,
    path: `/blog/${article.slug}`
  });
}

export default async function ArticlePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) {
    notFound();
  }

  return (
    <div className="container section stack">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.excerpt
        }}
      />
      <article className="card page-intro stack">
        <span className="chip">{article.topic}</span>
        <h1 className="title-md">{article.title}</h1>
        <p className="lead">{article.excerpt}</p>
        <p className="lead">
          Noi dung chi tiet cua bai viet se duoc dua vao CMS trong buoc tiep theo. O foundation nay, route, metadata,
          va cluster logic da san sang cho SEO va internal linking.
        </p>
      </article>
    </div>
  );
}
