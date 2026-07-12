import {
  Brain,
  Lightbulb,
  TrendingUp,
  Zap,
} from "lucide-react";

const solutions = [
  {
    icon: Brain,
    title: "AI SEO Analysis",
    description:
      "TrafficSaaS menganalisis data website Anda dan menemukan insight penting secara otomatis.",
  },
  {
    icon: Lightbulb,
    title: "Actionable Recommendations",
    description:
      "Dapatkan rekomendasi yang jelas mengenai halaman, keyword, dan strategi yang harus dilakukan.",
  },
  {
    icon: TrendingUp,
    title: "Growth Tracking",
    description:
      "Pantau perkembangan traffic, performa halaman, dan peluang pertumbuhan dalam satu dashboard.",
  },
  {
    icon: Zap,
    title: "Faster Decisions",
    description:
      "Kurangi waktu analisis manual dan fokus pada strategi yang menghasilkan dampak.",
  },
];

export default function Solution() {
  return (
    <section className="py-24 bg-muted/30">

      <div className="mx-auto max-w-6xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <h2 className="text-4xl font-bold tracking-tight">
            Ubah data SEO menjadi keputusan yang menghasilkan pertumbuhan
          </h2>

          <p className="mt-5 text-muted-foreground">
            TrafficSaaS menggabungkan analytics, SEO intelligence,
            dan AI recommendation untuk membantu Anda memahami
            apa yang harus dilakukan berikutnya.
          </p>

        </div>


        <div className="mt-14 grid gap-6 md:grid-cols-2">

          {solutions.map((item)=>(
            <div
              key={item.title}
              className="
                rounded-2xl
                border
                bg-background
                p-8
                transition
                hover:shadow-lg
              "
            >

              <item.icon
                className="h-9 w-9"
              />

              <h3 className="mt-6 text-xl font-semibold">
                {item.title}
              </h3>

              <p className="mt-3 text-muted-foreground leading-relaxed">
                {item.description}
              </p>

            </div>
          ))}

        </div>


      </div>

    </section>
  );
}