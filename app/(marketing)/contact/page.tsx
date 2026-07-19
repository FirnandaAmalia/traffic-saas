"use client";

import Link from "next/link";

import {
  ArrowLeft,
  Mail,
  MessageSquare,
  Sparkles,
  Send,
} from "lucide-react";

import { Button } from "@/components/ui/button";


export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">


      {/* Hero */}

      <section
        className="
          relative
          overflow-hidden
          py-32
        "
      >

        <div
          className="
            absolute
            left-1/2
            top-20
            h-[500px]
            w-[500px]
            -translate-x-1/2
            rounded-full
            bg-violet-500/10
            blur-[160px]
          "
        />


        <div
          className="
            relative
            mx-auto
            max-w-4xl
            px-6
            text-center
          "
        >

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-violet-100
              px-4
              py-2
              text-sm
              font-semibold
              text-violet-700
            "
          >

            <Sparkles className="h-4 w-4" />

            Contact TrafficSaaS

          </div>


          <h1
            className="
              mt-8
              text-5xl
              font-black
              tracking-tight
              text-slate-900
              lg:text-6xl
            "
          >

            Punya pertanyaan?

            <br />

            Mari berdiskusi.

          </h1>


          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-lg
              leading-8
              text-slate-600
            "
          >

            Hubungi tim TrafficSaaS untuk pertanyaan,
            kerja sama, dukungan teknis, atau informasi
            mengenai platform AI SEO Intelligence kami.

          </p>


        </div>


      </section>




      {/* Contact Content */}


      <section className="pb-32">

        <div
          className="
            mx-auto
            grid
            max-w-6xl
            gap-8
            px-6
            lg:grid-cols-2
          "
        >


          {/* Information */}


          <div
            className="
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-10
              shadow-sm
            "
          >

            <h2
              className="
                text-2xl
                font-black
                text-slate-900
              "
            >

              Hubungi Kami

            </h2>


            <p
              className="
                mt-4
                leading-7
                text-slate-600
              "
            >

              Kami siap membantu Anda memahami bagaimana
              TrafficSaaS dapat membantu meningkatkan
              performa SEO dan analisis website.

            </p>



            <div className="mt-8 space-y-5">


              <ContactItem
                icon={Mail}
                title="Email"
                value="hello@trafficsaas.com"
              />


              <ContactItem
                icon={MessageSquare}
                title="Support"
                value="Technical & Product Support"
              />


            </div>


          </div>




          {/* Form */}


          <div
            className="
              rounded-3xl
              border
              border-slate-200
              bg-slate-50
              p-10
            "
          >

            <h2
              className="
                text-2xl
                font-black
                text-slate-900
              "
            >

              Kirim Pesan

            </h2>


            <form className="mt-8 space-y-5">


              <input
                type="text"
                placeholder="Nama"
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  text-sm
                  outline-none
                  focus:border-violet-500
                "
              />


              <input
                type="email"
                placeholder="Email"
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  text-sm
                  outline-none
                  focus:border-violet-500
                "
              />


              <textarea
                placeholder="Pesan Anda"
                rows={5}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  p-4
                  text-sm
                  outline-none
                  focus:border-violet-500
                "
              />


              <Button
                className="
                  h-12
                  w-full
                  rounded-xl
                  bg-gradient-to-r
                  from-violet-600
                  to-sky-500
                "
              >

                Kirim Pesan

                <Send className="ml-2 h-4 w-4"/>

              </Button>


            </form>


          </div>



        </div>


        <div
          className="
            mt-12
            text-center
          "
        >

          <Button
            asChild
            variant="outline"
            className="rounded-full"
          >

            <Link href="/">

              <ArrowLeft className="mr-2 h-4 w-4"/>

              Kembali ke Home

            </Link>

          </Button>


        </div>


      </section>


    </main>
  );
}





function ContactItem({
  icon: Icon,
  title,
  value,
}:{
  icon:any;
  title:string;
  value:string;
}) {

  return (

    <div
      className="
        flex
        items-center
        gap-4
        rounded-2xl
        bg-slate-50
        p-4
      "
    >

      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          bg-gradient-to-br
          from-violet-600
          to-sky-500
        "
      >

        <Icon className="h-5 w-5 text-white"/>

      </div>


      <div>

        <p className="text-sm text-slate-500">
          {title}
        </p>

        <p className="font-semibold text-slate-900">
          {value}
        </p>

      </div>


    </div>

  );
}