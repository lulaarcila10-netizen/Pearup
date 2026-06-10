import type { Metadata } from "next";
import "./globals.css";
import { AuthHandler } from "./components/AuthHandler";

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
      <body>
        <AuthHandler />
        {children}
      </body>
    </html>
  );
}
