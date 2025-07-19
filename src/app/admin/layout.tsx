// app/admin/layout.tsx
import AdminNavbar from "./components/common/AdminNavbar";
import ReactQueryProvider from "@/utils/reactQueryProvider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <div className="w-full min-h-screen bg-white">
        <AdminNavbar />
        <main>{children}</main>
      </div>
    </ReactQueryProvider>
  );
}