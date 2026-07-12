const faqs = [
  {
    q: "Can I upgrade anytime?",
    a: "Yes. You can upgrade from Free to Pro whenever you need more features.",
  },
  {
    q: "Will I lose my data?",
    a: "No. All connected Google Search Console and Google Analytics data remains safe.",
  },
  {
    q: "Can I cancel my subscription?",
    a: "Yes. You can cancel anytime.",
  },
  {
    q: "Do you support invoices?",
    a: "Yes. Every Pro subscription receives downloadable invoices.",
  },
];

export default function PricingFAQ() {
  return (
    <section className="mx-auto mt-28 max-w-4xl">

      <h2 className="mb-10 text-center text-4xl font-bold">

        Frequently Asked Questions

      </h2>

      <div className="space-y-5">

        {faqs.map((faq) => (
          <div
            key={faq.q}
            className="rounded-2xl border bg-white p-6 shadow-sm"
          >
            <h3 className="font-semibold text-slate-900">

              {faq.q}

            </h3>

            <p className="mt-3 leading-7 text-slate-500">

              {faq.a}

            </p>

          </div>
        ))}

      </div>

    </section>
  );
}