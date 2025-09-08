import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  // fallback, якщо locale undefined або файл відсутній
  const safeLocale = locale ?? "en";

  return {
    locale: safeLocale,
    messages: (await import(`../../messages/${safeLocale}.json`)).default,
  };
});
