import {NextIntlClientProvider} from 'next-intl';
import '../../styles/globals.css';
import AlertProvider from '@/components/providers/provider.client';
import { CommentsProvider } from '@/context/comments-context';
import Header from '@/components/shared/header';
import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
 
export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  let messages;
  
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound(); // якщо нема такої мови — 404
  }
  
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AlertProvider>
            <CommentsProvider>
              <Header />
              {children}
            </CommentsProvider>
          </AlertProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}