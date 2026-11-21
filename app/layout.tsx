import "./globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";

import { ThemeProvider } from "@/components/common/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ModalProvider } from "@/providers/modal-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.authorName}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.authorName,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.username,
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  icons: {
    icon: siteConfig.iconIco,
    shortcut: siteConfig.logoIcon,
    apple: siteConfig.logoIcon,
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID;

  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased selection:bg-primary/25 selection:text-foreground",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          themes={["light", "dark"]}
        >
          {children}
          <Toaster />
          <ModalProvider />
        </ThemeProvider>
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
