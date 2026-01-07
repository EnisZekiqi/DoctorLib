import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito } from "next/font/google";
import { UserProvider } from "./context/LanguageContext";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import localFont from 'next/font/local'
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const satoshi = localFont({
  src: [
    {
      path: '../public/fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-satoshi',
})

export const metadata: Metadata = {
  title: "MyDoc",
  description: "Find and book appointments with verified doctors easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${satoshi.variable} antialiased`}
      >
        <UserProvider>
          <Navbar />
          {children}
          <Footer />
        </UserProvider>
        
      </body>
    </html>
  );
}
