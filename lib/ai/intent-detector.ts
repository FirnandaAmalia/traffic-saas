// lib/ai/intent-detector.ts

export type AIIntent = "TRAFFIC" | "SEO" | "CONTENT" | "CONVERSION" | "GENERAL";

interface IntentRule {
  intent: AIIntent;

  keywords: string[];
}

/*
|--------------------------------------------------------------------------
| Intent Knowledge Base
|--------------------------------------------------------------------------
|
| Local AI classification rules.
| Nantinya bisa digabung dengan LLM classifier.
|
*/

const intentRules: IntentRule[] = [
  {
    intent: "TRAFFIC",

    keywords: [
      "traffic",

      "visitor",

      "pengunjung",

      "user",

      "users",

      "session",

      "sessions",

      "klik",

      "click",

      "organic traffic",

      "turun",

      "naik",

      "growth",
    ],
  },

  {
    intent: "SEO",

    keywords: [
      "seo",

      "google",

      "ranking",

      "rank",

      "position",

      "posisi",

      "keyword",

      "serp",

      "search",

      "index",

      "indexed",

      "crawl",
    ],
  },

  {
    intent: "CONTENT",

    keywords: [
      "content",

      "konten",

      "artikel",

      "blog",

      "page",

      "halaman",

      "copywriting",

      "topic",

      "topik",

      "update artikel",
    ],
  },

  {
    intent: "CONVERSION",

    keywords: [
      "conversion",

      "konversi",

      "jualan",

      "sales",

      "lead",

      "customer",

      "pelanggan",

      "purchase",

      "transaksi",

      "revenue",

      "income",
    ],
  },
];

export function detectAIIntent(question: string): AIIntent {
  const normalized = question.toLowerCase().trim();

  if (!normalized) {
    return "GENERAL";
  }

  let highestScore = 0;

  let detectedIntent: AIIntent = "GENERAL";

  for (const rule of intentRules) {
    let score = 0;

    for (const keyword of rule.keywords) {
      if (normalized.includes(keyword)) {
        score++;
      }
    }

    if (score > highestScore) {
      highestScore = score;

      detectedIntent = rule.intent;
    }
  }

  return detectedIntent;
}
