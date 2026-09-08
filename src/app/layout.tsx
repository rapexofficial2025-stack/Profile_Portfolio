import type { Metadata } from "next";
import "./globals.css";
import { PortfolioShell } from "@/components/PortfolioShell";

export const metadata: Metadata = {
  title: "Irvin Palacio — Portfolio",
  description: "Personal portfolio foundation for Irvin Jay Palacio.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full"><PortfolioShell>{children}</PortfolioShell></body>
    </html>
  );
}
