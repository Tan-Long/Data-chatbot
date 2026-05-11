import { AdminConsole } from "@/components/admin-console";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Admin CRUD dashboard",
  description:
    "Admin co login, JWT auth va CRUD cho products, customers, orders tren DB that.",
  path: "/admin"
});

export default function AdminPage() {
  return (
    <div className="container section stack">
      <AdminConsole />
    </div>
  );
}
