import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/app/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { ensureSupabaseUser } from "@/lib/supabase/auth-helpers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CrossBar | Zero-Text Coordination",
  description: "テキスト入力ゼロで、組織の壁と孤独を越える。",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ログイン済みの場合、Supabaseのusersテーブルと同期
  try {
    await ensureSupabaseUser();
  } catch (e) {
    // 未ログイン時はnullが返るだけなので無視してOK
  }

  return (
    <ClerkProvider>
      <html lang="ja" className="dark">
        <body className={cn(inter.className, "antialiased")}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

