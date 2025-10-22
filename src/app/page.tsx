import { getArticlesInfo } from "./[locale]/page";

import HomePage from "@/components/HomePage";
import I18nProvider from "@/components/i18nProvicer";

const defaultLang = "en"

export default async function Home() {
  const articles = await getArticlesInfo(defaultLang);

  const messages = (await import(`../messages/${defaultLang}.json`)).default;

  return (
    <html lang={defaultLang}>
      <body>
        <I18nProvider locale={defaultLang} messages={messages}>
          <HomePage locale={defaultLang} articles={articles}/>
        </I18nProvider>
      </body>
    </html>
  );
};