import type { Metadata } from "next";
import { Orbitron, Roboto } from "next/font/google";
import "./globals.css";
import { Auth0Provider } from './components/Auth0Provider';
import { UserProvider } from './contexts/UserContext';
import ClientLayout from './ClientLayout';
import GoogleAnalytics from './components/GoogleAnalytics';

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Noctura",
  description: "Discover and apply to the latest remote job opportunities with Noctura. Find your next remote role in tech, marketing, design, and more.",
  metadataBase: new URL('https://noctura.io'),
  openGraph: {
    title: 'Noctura',
    description: 'Discover and apply to the latest remote job opportunities with Noctura. Find your next remote role in tech, marketing, design, and more.',
    url: 'https://noctura.io',
    siteName: 'Noctura',
    images: [
      {
        url: 'https://i.imgur.com/FKI9hQj.png',
        width: 1200,
        height: 630,
        alt: 'Noctura Remote Job Board',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Noctura | Remote Job Board',
    description: 'Discover and apply to the latest remote job opportunities with Noctura. Find your next remote role in tech, marketing, design, and more.',
    images: ['https://imgur.com/FKI9hQj'],
    creator: '@noctura',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/favicon.png',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${roboto.variable} h-full`}>
      <body className="overflow-x-hidden">
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        <Auth0Provider>
          <UserProvider>
            <ClientLayout>{children}</ClientLayout>
          </UserProvider>
        </Auth0Provider>
      </body>
    </html>
  );
}
