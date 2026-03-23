import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hacking Cancer Care — AIDH Mini Hackathon | MD Anderson",
  description:
    "Join MD Anderson's inaugural AI and Digital Health hackathon on May 2, 2026. One day. Real problems. Build tools that improve cancer care.",
  openGraph: {
    title: "Hacking Cancer Care — AIDH Mini Hackathon",
    description:
      "One day. Real problems. Build tools that improve cancer care at MD Anderson Cancer Center.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
