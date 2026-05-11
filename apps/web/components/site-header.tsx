import Link from "next/link";

const navItems = [
  { href: "/", label: "Trang chu" },
  { href: "/categories/detox-juice", label: "Danh muc" },
  { href: "/membership", label: "Membership" },
  { href: "/quiz", label: "Quiz" },
  { href: "/cart", label: "Cart" },
  { href: "/blog", label: "Blog" },
  { href: "/admin", label: "Admin" }
];

export function SiteHeader() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link className="brand" href="/">
          <span className="brand-mark" />
          <span>Wellness Commerce</span>
        </Link>
        <nav className="nav" aria-label="Dieu huong chinh">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
