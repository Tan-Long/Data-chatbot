import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container section">
      <div className="card page-intro stack">
        <span className="eyebrow">404</span>
        <h1 className="title-md">Trang ban tim khong ton tai.</h1>
        <p className="lead">Thu quay lai home, quiz, hoac danh muc san pham de tiep tuc hanh trinh.</p>
        <Link className="button button-primary" href="/">
          Ve trang chu
        </Link>
      </div>
    </div>
  );
}
