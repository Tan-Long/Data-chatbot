import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Membership va coaching journey",
  description:
    "Membership page cho wellness brand: ket hop don hang, check-in, uu dai va hanh trinh dong hanh.",
  path: "/membership"
});

export default function MembershipPage() {
  return (
    <div className="container section stack">
      <section className="card page-intro stack">
        <span className="eyebrow">Membership commerce</span>
        <h1 className="title-md">Membership khong chi la goi uu dai. Day la cach giu khach o lai voi hanh trinh.</h1>
        <p className="lead">
          Phase 1 xu ly membership nhu mot SKU/dich vu co entitlement co ban: uu dai, check-in, coach note va
          customer tag.
        </p>
      </section>
      <section className="grid story-grid">
        <article className="card stack">
          <h2 className="title-sm">Starter Circle</h2>
          <p className="lead">Phu hop khach moi can quiz, combo de bat dau, va lich nhac duy tri nhe.</p>
        </article>
        <article className="card stack">
          <h2 className="title-sm">Routine Circle</h2>
          <p className="lead">Them check-in dinh ky, uu dai bundle, va note tu CSKH/coaching team.</p>
        </article>
        <article className="card stack">
          <h2 className="title-sm">Care Circle</h2>
          <p className="lead">Danh cho nhom can support sau mua, feedback loop va chinh sach uu tien.</p>
        </article>
      </section>
    </div>
  );
}

