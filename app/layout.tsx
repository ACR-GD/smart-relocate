import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SmartRelocate.ai - Malaysia",
  description: "AI-Powered Immigration Intelligence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-50">
        {children}
      </body>
    </html>
  );
}
