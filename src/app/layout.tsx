import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Hacking Cancer Care | AIDH Mini Hackathon",
  description:
    "MD Anderson Cancer Center's inaugural AI/Digital Health hackathon. May 2, 2026. One day. Real problems. Actionable solutions.",
  openGraph: {
    title: "Hacking Cancer Care | AIDH Mini Hackathon",
    description:
      "MD Anderson's inaugural AI/Digital Health hackathon. May 2, 2026.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white">{children}</body>
    </html>
  );
}
