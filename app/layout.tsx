import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import LenisProvider from '@/components/providers/LenisProvider';
import CustomCursor from '@/components/ui/CustomCursor';
import NoiseOverlay from '@/components/ui/NoiseOverlay';

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rudresh Borle | AI Developer & Full Stack Engineer',
  description: 'Portfolio of Rudresh Borle, an AI Developer and Full Stack Engineer specializing in robust AI pipelines and production-ready applications.',
};

export const viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${inter.variable} antialiased selection:bg-purple/30 selection:text-white overflow-x-hidden w-full`}>
        <LenisProvider>
          <NoiseOverlay />
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
