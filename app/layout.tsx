import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { FavoritesProvider } from "@/lib/favorites-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TubeShelf - 動画キュレーション",
  description: "YouTubeの動画をカテゴリ別に整理。週刊で話題の動画を発見しよう。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} antialiased`}>
      <body className="min-h-screen flex flex-col font-sans">
        <FavoritesProvider>
          <Header />
          <main className="flex-1">{children}</main>
        </FavoritesProvider>
      </body>
    </html>
  );
}
