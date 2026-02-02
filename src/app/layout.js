
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

    return {
      metadataBase: new URL(process.env.API_PROD_URL),
      title: themeOption?.options?.seo?.meta_tags || 'Hardware Store',
      description: themeOption?.options?.seo?.meta_description || 'Your trusted hardware store',
      icons: {
        icon: themeOption?.options?.logo?.favicon_icon?.original_url || '/favicon.ico',
        link: {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Yellowtail&display=swap",
        },
      },
      openGraph: {
        title: themeOption?.options?.seo?.og_title || 'Hardware Store',
        description: themeOption?.options?.seo?.og_description || 'Your trusted hardware store',
        images: [themeOption?.options?.seo?.og_image?.original_url || '/default-og-image.jpg'],
      },
    };
  } catch (err) {
    console.error("Error fetching theme options:", err.message);
    // Return fallback metadata
    return {
      title: 'Hardware Store',
      description: 'Your trusted hardware store',
      icons: {
        icon: '/favicon.ico',
      },
    };
  }
}

export default async function RootLayout({ children }) {
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
    settings = null; // Use null as fallback
  }
  const lng = await detectLanguage();
  return (
    <I18nProvider language={lng}>
      <LanguageProvider initialLanguage={lng}>
        <html lang="en">
          <head>
            {/* Preconnect to Google Fonts for faster loading */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

            {/* Combined Google Fonts - Single request for better performance */}
            <link
              href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Yellowtail&family=Cormorant:wght@400;500;600;700&family=Recursive:wght@400;500;600;700;800;900&family=Dancing+Script:wght@700&family=Courgette&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Fraunces:wght@400;500;600;700;800;900&display=swap"
              rel="stylesheet"
            />

            {/* Local CSS */}
            <link rel="stylesheet" href="/assets/css/style.css" />
          </head>
          <body suppressHydrationWarning={true}>
            {children}
          </body>
        </html>
      </LanguageProvider>
    </I18nProvider>
  );
}
