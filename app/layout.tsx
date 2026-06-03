import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pearup",
  description: "The easiest way to collab, get paid, and grow.",
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
