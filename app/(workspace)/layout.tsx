import Sidebar from "@/components/layout/sidebar";
import Topbar from "@/components/layout/topbar";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <div className="
      flex
      h-screen
      overflow-hidden
      bg-slate-50
    ">

      <aside className="
        h-screen
        shrink-0
      ">
        <Sidebar />
      </aside>


      <div className="
        flex
        min-w-0
        flex-1
        flex-col
        overflow-hidden
      ">


        <Topbar />


        <main className="
          flex-1
          overflow-y-auto
          p-6
        ">

          {children}

        </main>


      </div>


    </div>

  );

}