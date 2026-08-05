import { getRequestConfig } from "next-intl/server";

const locales = ["id", "en"] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  if (!locale || !locales.includes(locale as typeof locales[number])) {
    return {
      locale: "id",
      messages: (
        await import("./messages/id.json")
      ).default,
    };
  }

  return {
    locale,
    messages: (
      await import(`./messages/${locale}.json`)
    ).default,
  };
});