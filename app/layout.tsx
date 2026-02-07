import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";

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
      <body className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
        <div className="flex-1 flex flex-col items-stretch">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
