import config from "@config/config.json";
import CookieConsent from "@layouts/components/CookieConsent";
import OrganizationJsonLd from "@layouts/components/OrganizationJsonLd";
import Preloader from "@layouts/components/Preloader";
import TwSizeIndicator from "@layouts/components/TwSizeIndicator";
import Footer from "@layouts/partials/Footer";
import Header from "@layouts/partials/Header";
import Providers from "@layouts/partials/Providers";
import { absoluteUrl, getSiteUrl } from "@lib/seo";
import { GoogleTagManager } from "@next/third-parties/google";
import { Poppins, Urbanist } from "next/font/google";
import "../styles/style.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-urbanist",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-poppins",
  display: "swap",
});

const siteUrl = getSiteUrl();
const defaultDescription = config.metadata.meta_description;
const defaultImage = absoluteUrl(config.metadata.meta_image);

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: config.site.title,
    template: `%s | ${config.site.title}`,
  },
  description: defaultDescription,
  authors: [{ name: config.metadata.meta_author }],
  icons: {
    icon: config.site.favicon,
    shortcut: config.site.favicon,
  },
  openGraph: {
    type: "website",
    siteName: config.site.title,
    title: config.site.title,
    description: defaultDescription,
    url: siteUrl,
    images: [{ url: defaultImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: config.site.title,
    description: defaultDescription,
    images: [defaultImage],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${urbanist.variable} ${poppins.variable}`}
    >
      {config.google_tag_manager.enable && (
        <GoogleTagManager gtmId={config.google_tag_manager.gtm_id} />
      )}
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#fff"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#000"
        />
        <OrganizationJsonLd />
      </head>
      <body suppressHydrationWarning>
        <TwSizeIndicator />
        <Preloader />
        <Header />
        <Providers>{children}</Providers>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
