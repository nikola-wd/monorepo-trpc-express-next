import { Poppins } from 'next/font/google';
import { TopBar } from './components/UI/TopBar/TopBar';
import Providers from './providers/Providers';
// import { getSession } from '@/lib/session/get-session';
import './globals.css';

// If loading a variable font, you don't need to specify the font weight
const fontFamily = Poppins({
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['300', '400', '500', '600', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // TODO: Copy getSession from other project
  // const { user } = await getSession();
  // console.log('Session from layout: ', { user });

  return (
    <html lang="en" className={fontFamily.className}>
      <body className="text-[#303042]">
        <Providers>
          <TopBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
