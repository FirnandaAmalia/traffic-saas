import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <a
        href="/api/auth/signin"
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Login Google
      </a>
    </main>
  );
}
