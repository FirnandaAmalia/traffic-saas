import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import Providers from "@/components/providers";

import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets:["latin"],
});


const geistMono = Geist_Mono({
  variable:"--font-geist-mono",
  subsets:["latin"],
});



export const metadata: Metadata = {

  title:{
    default:"TrafficSaaS",
    template:"%s | TrafficSaaS",
  },


  description:
  "Connect Google Search Console and Google Analytics 4 in one AI-powered SEO intelligence platform.",

};




export default function RootLayout({

  children,

}:Readonly<{

  children:React.ReactNode;

}>) {


return (

<html

lang="en"

className={`
${geistSans.variable}
${geistMono.variable}
`}

>


<body

className="
min-h-screen
bg-background
text-foreground
antialiased
"

>

<Providers>

<Providers>

{children}

</Providers>

</Providers>


<Toaster

richColors

position="top-right"

/>

</body>


</html>

);


}