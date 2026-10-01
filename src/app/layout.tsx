import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PortfolioShell } from "@/components/PortfolioShell";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Irvin Palacio — Portfolio",
  description: "Personal portfolio foundation for Irvin Jay Palacio.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" style={{ "--lightmode-bg": `url("${asset("/images/profile/lightmode-bg.webp")}")`, "--portfolio-header-bg": `url("${asset("/images/hero/honeycomb-cover.webp")}")` } as React.CSSProperties}>
      <body className="min-h-full"><PortfolioShell>{children}</PortfolioShell></body>
    </html>
  );
}
