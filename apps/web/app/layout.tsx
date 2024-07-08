import { TopBar } from './components/UI/TopBar/TopBar';
import './globals.css';
import { TrpcProvider } from './providers';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TrpcProvider>
          <TopBar />
          {children}
        </TrpcProvider>
      </body>
    </html>
  );
}
