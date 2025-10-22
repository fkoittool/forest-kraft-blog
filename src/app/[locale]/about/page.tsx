import AboutPage from "@/components/aboutPage";
import I18nProvider from "@/components/i18nProvicer";
import { getMessages, locales } from "@/lib/i18n";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
    return locales.map((locale) => ({locale: locale}))
}

export default async function LocalizedAbout() {
  return (
     <AboutPage/>
  );
}