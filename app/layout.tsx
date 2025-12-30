import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito } from "next/font/google";
import { UserProvider } from "./context/LanguageContext";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DoctorLib",
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
        className={` ${nunito.variable} antialiased`}
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
