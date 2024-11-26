import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Oneko } from "@/components/Oneko";
import { TerminalProvider } from "@/components/TerminalProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Personal Website",
  description: "Designer and developer portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <TerminalProvider>
          <Providers>
            <ThemeToggle />
            {children}
          </Providers>
        </TerminalProvider>
      </body>
    </html>
  );
}