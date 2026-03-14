import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MinuteMate AI",
  description: "AI-powered meeting notes analyzer",
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