import type { Metadata } from "next";
import localFont from "next/font/local";
// import "./globals.css";
import Header from "@/_components/Header/page";
import Footer from "@/_components/Footer/page";
import TanstackProvider from "@/providers/TanstackProvider";
import SideMenu from "./_components/sideMenu/page";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "College Admin",
  description: "College Admin of CEMS",
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
          <Header />
          <div className="grid grid-cols-[17rem,1fr] h-full">
            <SideMenu />
            {children}
          </div>
          {/* <Footer /> */}
        </TanstackProvider>
      </body>
    </html>
  );
}
