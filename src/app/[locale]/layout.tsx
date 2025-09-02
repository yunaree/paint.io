import {NextIntlClientProvider} from 'next-intl';
import '../../styles/globals.css';
import AlertProvider from '@/components/providers/provider.client';
import { CommentsProvider } from '@/context/comments-context';
 
type Props = {
  children: React.ReactNode;
};
 
export default async function RootLayout({children}: Props) {
  return (
    <html>
      <body>
        <NextIntlClientProvider>
          <AlertProvider>
            <CommentsProvider>
              {children}
            </CommentsProvider>
          </AlertProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}