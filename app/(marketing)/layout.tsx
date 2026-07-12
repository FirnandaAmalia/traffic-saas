import Sidebar from "@/components/layout/sidebar";
import Topbar from "@/components/layout/topbar";

interface WorkspaceLayoutProps {
  children: React.ReactNode;
}

export default function WorkspaceLayout({
  children,
}: WorkspaceLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar />

        <main className="min-h-0 flex-1 overflow-y-auto bg-slate-50">
          <div className="w-full px-6 py-6 xl:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}