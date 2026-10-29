import config from "@config/config.json";
import { absoluteUrl, getSiteUrl } from "@lib/seo";

const ORG = {
  email: "hello@blaitware.org",
  phone: "+2347066009943",
  streetAddress: "3 Barr P.I Oyewole Str, News engineering",
  addressLocality: "Abuja",
  addressCountry: "NG",
};

export default function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: config.site.title,
    legalName: "Blaitware",
    url: getSiteUrl(),
    logo: absoluteUrl(config.site.logo),
    email: ORG.email,
    telephone: ORG.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: ORG.streetAddress,
      addressLocality: ORG.addressLocality,
      addressCountry: ORG.addressCountry,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
