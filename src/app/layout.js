import { Suspense } from "react";
import Loading from "./loading";
import "../index.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { I18nProvider } from "./i18n/i18n-context";
import { detectLanguage } from "./i18n/server";
import LanguageProvider from "@/Context/LanguageContext/LanguageProvider";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
export async function generateMetadata() {
  // fetch data with error handling
  try {
    const themeOption = await fetch(`${process.env.API_PROD_URL}/themeOptions`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    }).then((res) => {
      if (!res.ok) throw new Error('Failed to fetch theme options');
      return res.json();
    });

    const frontendUrl = 'https://thehardwarebox.com';
    return {
      metadataBase: new URL(frontendUrl),
      title: themeOption?.options?.seo?.meta_title || themeOption?.options?.seo?.meta_tags || 'Hardware Store',
      description: themeOption?.options?.seo?.meta_description || 'Your trusted hardware store',
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      alternates: {
        canonical: './',
      },
      icons: {
        icon: themeOption?.options?.logo?.favicon_icon?.original_url || '/favicon.svg',
        link: {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Yellowtail&display=swap",
        },
      },
      openGraph: {
        title: themeOption?.options?.seo?.og_title || 'Hardware Store',
        description: themeOption?.options?.seo?.og_description || 'Your trusted hardware store',
        images: [themeOption?.options?.seo?.og_image?.original_url || '/default-og-image.jpg'],
        url: frontendUrl,
        siteName: 'Hardware Box',
        locale: 'en_US',
        type: 'website',
      },
    };
  } catch (err) {
    console.error("Error fetching theme options:", err.message);
    // Return fallback metadata
    return {
      title: 'Hardware Store',
      description: 'Your trusted hardware store',
      metadataBase: new URL('https://thehardwarebox.com'),
      robots: { index: true, follow: true },
      icons: {
        icon: '/favicon.svg',
      },
    };
  }
}

import Script from "next/script";

export default async function RootLayout({ children }) {
  const lng = await detectLanguage();
  return (
    <html lang={lng}>
      <head>
        {/* Preconnect to Google Fonts for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="google" content="notranslate" />

        {/* Combined Google Fonts - Single request for better performance */}
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Yellowtail&family=Cormorant:wght@400;500;600;700&family=Recursive:wght@400;500;600;700;800;900&family=Dancing+Script:wght@700&family=Courgette&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Fraunces:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />


        {/* Local CSS */}
        <link rel="stylesheet" href="/assets/css/style.css" />

        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-C52RSE232C"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-C52RSE232C');
          `}
        </Script>
      </head>
      <body suppressHydrationWarning={true}>
        <Suspense fallback={<Loading />}>
          <LayoutProviders>
            {children}
          </LayoutProviders>
        </Suspense>
      </body>
    </html>
  );
}

async function LayoutProviders({ children }) {
  let settings = null;
  try {
    settings = await fetch(`${process.env.API_PROD_URL}/settings`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    }).then((res) => {
      if (!res.ok) throw new Error('Failed to fetch settings');
      return res.json();
    });
  } catch (err) {
    console.error("Error fetching settings:", err.message);
    settings = null;
  }

  const lng = await detectLanguage();

  return (
    <I18nProvider language={lng}>
      <LanguageProvider initialLanguage={lng}>
        {children}
      </LanguageProvider>
    </I18nProvider>
  );
}
