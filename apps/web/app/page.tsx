import Link from "next/link";

import { ProductCard } from "@/components/product-card";
import { StructuredData } from "@/components/structured-data";
import { articles, categories, customers, orders, products } from "@/lib/sample-data";

export default function HomePage() {
  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Wellness Commerce",
          description:
            "D2C wellness commerce brand voi storefront SEO-first, membership, va tu van san pham co ngu canh."
        }}
      />
      <section className="hero">
        <div className="container hero-grid">
          <div className="card hero-panel stack">
            <span className="eyebrow">SEO-first storefront for wellness commerce</span>
            <h1 className="title-lg">Ban khong chi ban san pham. Ban ca mot hanh trinh khoe hon.</h1>
            <p className="lead">
              Foundation nay dua website ban hang ve dung ban chat: gom content co kha nang xep
              hang, PDP ro ly do mua, quiz tu van, membership, va admin du manh de theo doi don hang
              cung khach hang.
            </p>
            <div className="actions">
              <Link className="button button-primary" href="/quiz">
                Bat dau quiz tu van
              </Link>
              <Link className="button button-secondary" href="/membership">
                Xem membership
              </Link>
            </div>
          </div>
          <div className="stack">
            <div className="card hero-panel">
              <span className="chip">Community + coach commerce</span>
              <h2 className="title-sm" style={{ marginTop: 16 }}>
                Storefront sinh dong hon mot catalog thong thuong
              </h2>
              <p className="lead">
                Ket hop storytelling, blog, check-in mindset, va san pham de giup khach hang hieu
                minh nen bat dau tu dau.
              </p>
            </div>
            <div className="grid metrics">
              <div className="card">
                <p className="mini-label">SEO cluster</p>
                <strong>Blog + Landing + PDP</strong>
              </div>
              <div className="card">
                <p className="mini-label">Operations</p>
                <strong>Orders + Customers</strong>
              </div>
              <div className="card">
                <p className="mini-label">AI</p>
                <strong>Quiz + Handoff</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container stack">
          <div>
            <span className="eyebrow">Category direction</span>
            <h2 className="title-md">Trang ban hang duoc to chuc theo muc tieu va routine, khong chi theo SKU.</h2>
          </div>
          <div className="grid story-grid">
            {categories.map((category) => (
              <article className="card stack" key={category.slug}>
                <span className="chip">{category.name}</span>
                <h3 className="title-sm">{category.summary}</h3>
                <p className="lead">{category.seoDescription}</p>
                <Link className="button button-secondary" href={`/categories/${category.slug}`}>
                  Kham pha danh muc
                </Link>
              </article>
            ))}
            <article className="card stack">
              <span className="chip">Membership</span>
              <h3 className="title-sm">Khach mua lai va check-in duoc dan sang hanh trinh dai hon.</h3>
              <p className="lead">
                Membership khong bi tach roi khoi commerce. No gan voi don hang, routine va note cua CSKH.
              </p>
              <Link className="button button-secondary" href="/membership">
                Xem goi dong hanh
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container stack">
          <div>
            <span className="eyebrow">Best starting products</span>
            <h2 className="title-md">PDP can tra loi 3 cau hoi: phu hop voi ai, vi sao, va dung the nao.</h2>
          </div>
          <div className="grid product-grid">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid snapshot-grid">
          <div className="card">
            <span className="eyebrow">Admin snapshot</span>
            <h2 className="title-sm" style={{ marginTop: 12 }}>
              Don hang va khach hang khong dung o muc CRM nang.
            </h2>
            <p className="lead">
              Phase 1 chi can admin SME: tim don, doi trang thai, nhin lich su mua, tags, membership va chat context.
            </p>
            <div className="grid" style={{ gap: 10 }}>
              {orders.map((order) => (
                <div className="card" key={order.orderCode}>
                  <strong>{order.orderCode}</strong>
                  <p className="lead" style={{ marginBottom: 0 }}>
                    {order.status} | {order.sourceChannel}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <span className="eyebrow">Customer context</span>
            <h2 className="title-sm" style={{ marginTop: 12 }}>
              Quiz, chat, va order history phai hoi tu ve mot customer profile.
            </h2>
            <div className="grid" style={{ gap: 10 }}>
              {customers.map((customer) => (
                <div className="card" key={customer.phone}>
                  <strong>{customer.fullName}</strong>
                  <p className="lead" style={{ margin: "8px 0" }}>
                    {customer.primaryGoal} | {customer.membershipStatus}
                  </p>
                  <p style={{ margin: 0 }}>{customer.tags.join(" | ")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container stack">
          <div>
            <span className="eyebrow">Editorial commerce</span>
            <h2 className="title-md">SEO duoc xay bang content de mua hang tot hon, khong phai content cho du page.</h2>
          </div>
          <div className="grid blog-grid">
            {articles.map((article) => (
              <article className="card stack" key={article.slug}>
                <span className="chip">{article.topic}</span>
                <h3 className="title-sm">{article.title}</h3>
                <p className="lead">{article.excerpt}</p>
                <Link className="button button-secondary" href={`/blog/${article.slug}`}>
                  Doc bai viet
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
