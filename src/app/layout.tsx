import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Zikriyon AI",
  description: "Zikriyon AI — built by ZEAIPC",
  icons: { icon: "/logo-hex.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a12] text-white min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
