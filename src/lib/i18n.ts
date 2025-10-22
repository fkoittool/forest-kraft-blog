
export const locales = ["en", "ja"]

export const defaultLocale = "en"

export async function getMessages(locale: string) {
  return (await import(`@/messages/${locale}.json`)).default;
}

export function getLocaleFromPath(path: string): string {
  // パスからロケールを抽出 (例: "/en/about" => "en")
  const segments = path.split('/').filter(Boolean);
  const possibleLocale = segments[0];
  
  if (locales.includes(possibleLocale) && possibleLocale !== defaultLocale) {
    return possibleLocale;
  }
  
  return defaultLocale;
}