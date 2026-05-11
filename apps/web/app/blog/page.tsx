import Link from "next/link";

import { buildMetadata } from "@/lib/seo";
import { articles } from "@/lib/sample-data";

export const metadata = buildMetadata({
  title: "Blog wellness commerce",
  description:
    "Blog va content cluster de keo traffic SEO va dan nguoi dung ve category, quiz va product detail.",
  path: "/blog"
});

export default function BlogIndexPage() {
  return (
    <div className="container section stack">
      <section className="card page-intro stack">
        <span className="eyebrow">Editorial commerce</span>
        <h1 className="title-md">Blog khong chi de co traffic. Blog de dan den y dinh mua va hanh trinh phu hop.</h1>
      </section>
      <div className="grid blog-grid">
        {articles.map((article) => (
          <article className="card stack" key={article.slug}>
            <span className="chip">{article.topic}</span>
            <h2 className="title-sm">{article.title}</h2>
            <p className="lead">{article.excerpt}</p>
            <Link className="button button-secondary" href={`/blog/${article.slug}`}>
              Xem bai viet
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

