import type { Metadata } from "next";
import { Orbitron, Roboto } from "next/font/google";
import "./globals.css";
import { Auth0Provider } from './components/Auth0Provider';
import { UserProvider } from './contexts/UserContext';
import ClientLayout from './ClientLayout';

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
  description: "Discover and apply to the latest remote job opportunities with Noctura.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${roboto.variable} h-full`}>
      <Auth0Provider>
        <UserProvider>
          <ClientLayout>{children}</ClientLayout>
        </UserProvider>
      </Auth0Provider>
    </html>
  );
}
