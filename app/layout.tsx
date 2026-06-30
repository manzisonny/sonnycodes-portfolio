import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Sonny Dev | Munyurangabo Manzi Sonny",
  description: "Personal Portfolio of Munyurangabo Manzi Sonny - Full Stack Software Engineer from Kigali, Rwanda. Specialist in Next.js, TypeScript, and Laravel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.variable, spaceGrotesk.variable, "bg-primary text-text-primary")}>
        {children}
      </body>
    </html>
  );
}
