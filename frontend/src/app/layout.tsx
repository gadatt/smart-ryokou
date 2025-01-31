import './globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import type { Metadata } from 'next';
import Navbar from '@/components/common/Navbar';
import ThemeRegistry from '@/components/theme/ThemeRegistry';
import GoogleAnalytics from '@/components/common/GoogleAnalytics';
import createTranslation from 'next-translate/useTranslation';

export const metadata: Metadata = {
  title: 'Smart旅行',
  description: 'Generated by create next app',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { lang } = createTranslation('common');

  return (
    <html lang={lang}>
      <head>
        <GoogleAnalytics />
        <link href="https://fonts.googleapis.com/css?family=Sawarabi+Gothic" rel="stylesheet" />
      </head>
      <UserProvider>
        <body>
          <ThemeRegistry options={{ key: 'mui' }}>
            <div>
              <Navbar />
              {children}
            </div>
          </ThemeRegistry>
        </body>
      </UserProvider>
    </html>
  );
};

export default RootLayout;
