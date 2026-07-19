import AdminHeader from "@/components/admin/admin-header";
import UserTable from "@/components/admin/user-table";
import { requireAdmin } from "@/lib/admin";


export default async function AdminPage(){

  await requireAdmin();


  return (

    <main
      className="
      min-h-screen
      bg-slate-50
      "
    >

      <div
        className="
        mx-auto
        max-w-7xl
        space-y-10
        px-6
        py-10
        "
      >

        <AdminHeader />

        <UserTable />

      </div>

    </main>

  );

}