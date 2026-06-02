import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pearup",
  description: "The easiest way for brands to find their perfect creator.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
