import type { Metadata } from "next";
import { Tajawal, Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { FloatingActions } from "@/components/site/floating-actions";
import { JsonLd } from "@/components/site/json-ld";
import { PromoBanner } from "@/components/site/promo-banner";
import { CallbackWidget } from "@/components/site/callback-widget";
import { ChatbotWidget } from "@/components/site/chatbot-widget";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://riyadh-shades.sa"),
  title: {
    default: "مظلات وسواتر الرياض | حدادة ومظلات سيارات وحدائق - شركة الظلال الملكية",
    template: "%s | شركة الظلال الملكية - الرياض",
  },
  description:
    "شركة الظلال الملكية بالرياض - متخصصون في تركيب مظلات السيارات والحدائق والمسابح والسواتر وأعمال الحدادة الفنية. جودة عالية، ضمان 10 سنوات، أسعار تنافسية. اطلب تسعير مجاني الآن.",
  keywords: [
    "مظلات الرياض",
    "سواتر الرياض",
    "مظلات سيارات الرياض",
    "حدادة الرياض",
    "مظلات حدائق",
    "مظلات مسابح",
    "سواتر منزلية",
    "مظلات مداخل",
    "أعمال حدادة",
    "حدادة فنية",
    "تركيب مظلات",
    "شركة مظلات بالرياض",
    "أفضل شركة مظلات الرياض",
    "مظلات وسواتر",
    "مظلات المملكة",
  ],
  authors: [{ name: "شركة الظلال الملكية" }],
  creator: "شركة الظلال الملكية",
  publisher: "شركة الظلال الملكية",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: { "ar-SA": "/" },
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "https://riyadh-shades.sa",
    siteName: "شركة الظلال الملكية - مظلات وسواتر الرياض",
    title: "مظلات وسواتر الرياض | حدادة فنية - شركة الظلال الملكية",
    description:
      "متخصصون في مظلات السيارات والحدائق والمسابح والسواتر وأعمال الحدادة بالرياض. ضمان 10 سنوات، تركيب احترافي، أسعار تنافسية.",
    images: [
      {
        url: "https://sfile.chatglm.cn/images-ppt/304f69241716.jpg",
        width: 1200,
        height: 630,
        alt: "مظلات وسواتر الرياض - شركة الظلال الملكية",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "مظلات وسواتر الرياض | شركة الظلال الملكية",
    description:
      "متخصصون في مظلات السيارات والحدائق والمسابح والسواتر وأعمال الحدادة بالرياض. ضمان 10 سنوات.",
    images: ["https://sfile.chatglm.cn/images-ppt/304f69241716.jpg"],
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  category: "business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <JsonLd />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme-preference');if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${tajawal.variable} ${cairo.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <PromoBanner />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <FloatingActions />
        <CallbackWidget />
        <ChatbotWidget />
        <Toaster />
        <SonnerToaster position="top-center" richColors />
      </body>
    </html>
  );
}
