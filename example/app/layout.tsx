import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/react"

import "./globals.css"

const jetbrainsMono = JetBrains_Mono({
  weight: ["100", "200", "400"],
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap"
});
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Function LLM Demo",
  description: "Generate embeddings in the browser using OpenAI and Function LLM.",
  openGraph: {
    type: "website",
    title: "Function LLM Demo",
    description: "Fully Local Document Retrieval App in the Browser.",
    images: "https://raw.githubusercontent.com/fxnai/.github/main/logo_wide.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}