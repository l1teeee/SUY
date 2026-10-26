import type { Metadata } from "next";
import { Courier_Prime, Fraunces } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-courier-prime",
});

export const metadata: Metadata = {
  title: "pa",
  description: "Bienvenidos a la mesa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${fraunces.variable} ${courierPrime.variable}`}>
      <body>{children}</body>
    </html>
  );
}
