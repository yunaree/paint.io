import {NextIntlClientProvider} from 'next-intl';
import '../../styles/globals.css';
import AlertProvider from '@/components/providers/provider.client';
 
type Props = {
  children: React.ReactNode;
};
 
export default async function RootLayout({children}: Props) {
  return (
    <html>
      <body>
        <NextIntlClientProvider>
          <AlertProvider>
            {children}
          </AlertProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}