import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "./component/Footer/page";
import NavBar from "./component/NavBar/page";
import CartProvider from "./cartProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Comforty - Premium Chairs for Every Space",
  description: "Discover the perfect chairs for your home or office at Comforty. Stylish, comfortable, and durable options designed to suit your needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        <CartProvider>
          <NavBar />
          {children}
        </CartProvider>
          <Footer />
      </body>
    </html>
  );
}
