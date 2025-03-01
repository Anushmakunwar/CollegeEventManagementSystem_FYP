import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/_components/Header/page";
import Footer from "@/_components/Footer/page";
import TanstackProvider from "@/providers/TanstackProvider";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "College Event Management System",
  description: "Helps you streamline event management process",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased flex flex-col h-screen`}>
        <TanstackProvider>
          {/* <Header /> */}
          {children}
          {/* <Footer /> */}
        </TanstackProvider>
      </body>
    </html>
  );
}
