import type { Metadata } from "next";
import { Figtree, Fraunces } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const sans = Figtree({ subsets: ["latin"], variable: "--font-sans" });
const display = Fraunces({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: {
    default: "Texcels Schools | Raising the very best",
    template: "%s | Texcels Schools",
  },
  description:
    "Texcels Schools offers Crèche, Pre-school, Primary and College education on the Lekki-Epe Expressway, Lagos.",
  icons: { icon: "/assets/icons/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${display.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
