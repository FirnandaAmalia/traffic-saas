import {
  AlertTriangle,
  Search,
  BarChart3,
} from "lucide-react";

const problems = [
  {
    icon: Search,
    title: "Data SEO tersebar",
    description:
      "Google Search Console dan Analytics memberikan banyak data, tetapi sulit mengetahui apa yang harus dilakukan.",
  },
  {
    icon: BarChart3,
    title: "Sulit menemukan peluang",
    description:
      "Traffic naik turun tanpa insight yang jelas mengenai halaman atau keyword yang harus diperbaiki.",
  },
  {
    icon: AlertTriangle,
    title: "Keputusan masih manual",
    description:
      "Tim SEO menghabiskan waktu berjam-jam menganalisis laporan.",
  },
];

export default function Problem() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">

        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold">
            SEO bukan kekurangan data.
          </h2>

          <p className="mt-4 text-muted-foreground">
            Masalah terbesar adalah mengubah data menjadi keputusan yang tepat.
          </p>
        </div>


        <div className="mt-12 grid gap-6 md:grid-cols-3">

          {problems.map((item)=>(
            <div
              key={item.title}
              className="
              rounded-2xl
              border
              bg-background
              p-6
              "
            >

              <item.icon className="h-8 w-8"/>

              <h3 className="mt-5 font-semibold text-lg">
                {item.title}
              </h3>

              <p className="mt-3 text-sm text-muted-foreground">
                {item.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}