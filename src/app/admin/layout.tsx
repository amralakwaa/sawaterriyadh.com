import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-secondary/30">
      <AdminSidebar />
      <div className="mr-64">
        <div className="p-4 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
