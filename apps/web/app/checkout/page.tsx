import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Checkout foundation",
  description:
    "Checkout phase 1 cho wellness commerce: shipping, payment method, va order confirmation foundation.",
  path: "/checkout"
});

export default function CheckoutPage() {
  return (
    <div className="container section stack">
      <section className="card page-intro stack">
        <span className="eyebrow">Checkout foundation</span>
        <h1 className="title-md">Checkout du cho phase 1 van phai phan tach ro shipping, payment va context khach.</h1>
        <p className="lead">
          Backend da co endpoint tao payload checkout cho `COD` va `online`. Frontend nay la shell de noi form, validation
          va gateway o buoc tiep theo.
        </p>
      </section>
      <section className="grid snapshot-grid">
        <article className="card page-intro stack">
          <span className="mini-label">Shipping</span>
          <strong>Ho ten, so dien thoai, thanh pho, dia chi chi tiet</strong>
          <p className="lead">Phone la khoa merge customer profile cho thi truong Viet Nam.</p>
        </article>
        <article className="card page-intro stack">
          <span className="mini-label">Payment</span>
          <strong>COD va online payment la 2 lua chon phase 1</strong>
          <p className="lead">Trang thai don duoc sinh khac nhau cho `confirmed` va `pending_payment`.</p>
        </article>
      </section>
    </div>
  );
}
