import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "10 Day Eco Tourism Tour Turkey",
    template: "%s | 10 Day Eco Tourism Tour Turkey",
  },
  description: "Curated travel experiences that connect you with the world's most remarkable places.",
  icons: {
    icon: "https://travelshopbooking.com/favicon.ico",
  },
  openGraph: {
    siteName: "10 Day Eco Tourism Tour Turkey",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-poppins)]">
        {children}
      </body>
    </html>
  );
}
