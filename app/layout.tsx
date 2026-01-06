import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/app/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CrossBar | Zero-Text Coordination",
  description: "テキスト入力ゼロで、組織の壁と孤独を越える。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="dark">
      <body className={cn(inter.className, "antialiased")}>
        {children}
      </body>
    </html>
  );
}

