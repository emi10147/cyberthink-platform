import type { Metadata } from "next";
import { Inter, Space_Grotesk, Fira_Code, Outfit, Manrope } from "next/font/google";
import "./globals.css";

// Modern, clean sans-serif for body text
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Futuristic, tech-focused font for headings
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Premium monospace for metrics and code
const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Elegant, rounded font for UI elements
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Sophisticated sans-serif for descriptions
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CyberThink Platform - Enterprise Risk Management",
  description: "Professional risk assessment and management platform with real-time monitoring and analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${firaCode.variable} ${outfit.variable} ${manrope.variable} antialiased font-inter`}
      >
        {children}
      </body>
    </html>
  );
}
