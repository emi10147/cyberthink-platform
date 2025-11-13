import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Orbitron, Exo_2, Rajdhani } from "next/font/google";
import "./globals.css";

// Clean, highly readable sans-serif for body text
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Futuristic, sci-fi inspired font for main headings and brand
const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Premium tech monospace for metrics and data
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

// Modern, tech-focused font for UI elements
const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Strong, technical font for descriptions and secondary text
const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
        className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable} ${exo2.variable} ${rajdhani.variable} antialiased font-inter`}
      >
        {children}
      </body>
    </html>
  );
}
