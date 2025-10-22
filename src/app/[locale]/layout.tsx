import I18nProvider from '@/components/i18nProvicer';
import { notFound } from 'next/navigation';

// サポートするロケールを定義
const locales = ['en', 'ja'];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // ロケールがサポートされていない場合は404を表示
  if (!locales.includes(locale as any)) {
    notFound();
  }

  let messages;
  try {
    // ロケールに応じたメッセージファイルを動的にインポート
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    // ロードに失敗した場合も404を表示
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <I18nProvider locale={locale} messages={messages}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}