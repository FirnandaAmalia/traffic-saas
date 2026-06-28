import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/layout/sidebar";
import Topbar from "@/components/layout/topbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrafficSaaS",
  description: "SEO Analytics Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-slate-50 text-slate-900">

  <div className="flex h-screen">

    <Sidebar />

    <div className="flex flex-1 flex-col">

      <Topbar />

      <main className="flex-1 overflow-y-auto">

        <div className="mx-auto w-full max-w-[1600px] px-8 py-8">
          {children}
          </div>

      </main>

    </div>

  </div>

</body>
    </html>
  );
}