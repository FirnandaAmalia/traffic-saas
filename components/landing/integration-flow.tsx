import {
  BarChart3,
  Brain,
  CheckCircle2,
  Search,
  Sparkles,
} from "lucide-react";


const steps = [
  {
    icon: Search,
    title: "Connect Your Data",
    description:
      "Hubungkan Google Search Console dan Google Analytics 4 untuk mengambil data performa website.",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description:
      "TrafficSaaS menganalisis traffic, keyword, halaman, dan menemukan peluang pertumbuhan.",
  },
  {
    icon: Sparkles,
    title: "Smart Recommendations",
    description:
      "Dapatkan insight dan rekomendasi SEO yang mudah dipahami dan langsung dapat diterapkan.",
  },
  {
    icon: CheckCircle2,
    title: "Grow Your Traffic",
    description:
      "Ambil keputusan berdasarkan data dan tingkatkan performa website secara konsisten.",
  },
];


export default function IntegrationFlow() {
  return (
    <section className="py-24">

      <div className="mx-auto max-w-6xl px-6">


        <div className="text-center max-w-3xl mx-auto">

          <h2 className="text-4xl font-bold tracking-tight">
            Dari data mentah menjadi strategi SEO yang jelas
          </h2>

          <p className="mt-5 text-muted-foreground">
            TrafficSaaS menghubungkan seluruh data penting website
            dan mengubahnya menjadi keputusan yang bisa langsung dilakukan.
          </p>

        </div>



        <div className="mt-16 grid gap-8 md:grid-cols-4">


          {steps.map((step, index)=>(
            <div
              key={step.title}
              className="relative"
            >

              <div
                className="
                rounded-2xl
                border
                bg-background
                p-6
                h-full
                "
              >

                <div
                  className="
                  flex
                  items-center
                  justify-center
                  h-12
                  w-12
                  rounded-xl
                  bg-primary/10
                  "
                >
                  <step.icon
                    className="
                    h-6
                    w-6
                    text-primary
                    "
                  />
                </div>


                <div className="mt-5">

                  <span className="text-sm text-muted-foreground">
                    Step {index + 1}
                  </span>


                  <h3 className="mt-2 font-semibold text-lg">
                    {step.title}
                  </h3>


                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>


                </div>

              </div>


            </div>
          ))}


        </div>


      </div>


    </section>
  );
}