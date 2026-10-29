import config from "@config/config.json";

const DEFAULT_ORIGIN = "https://blaitware.org";

/** Production site origin without trailing slash. */
export function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const fromConfig = config.site.base_url?.trim();
  const raw =
    fromEnv ||
    (fromConfig && fromConfig !== "/" ? fromConfig : "") ||
    DEFAULT_ORIGIN;
  return raw.replace(/\/$/, "");
}

/** Join origin + path into an absolute URL. */
export function absoluteUrl(path = "/") {
  const origin = getSiteUrl();
  if (!path || path === "/") return origin;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${normalized}`;
}

/**
 * Build a Next.js Metadata object for a page.
 * @param {{ title?: string, description?: string, image?: string, path?: string, canonical?: string, noindex?: boolean }} opts
 */
export function buildPageMetadata({
  title,
  description,
  image,
  path = "/",
  canonical,
  noindex = false,
} = {}) {
  const { meta_image, meta_author, meta_description } = config.metadata;
  const pageTitle = title || config.site.title;
  const pageDescription = description || meta_description;
  const ogImage = absoluteUrl(image || meta_image);
  const canonicalUrl = canonical || absoluteUrl(path);
  // Avoid duplicated site title when page title matches brand title
  const titleValue =
    pageTitle === config.site.title
      ? { absolute: pageTitle }
      : pageTitle;

  /** @type {import("next").Metadata} */
  const metadata = {
    title: titleValue,
    description: pageDescription,
    authors: meta_author ? [{ name: meta_author }] : undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      type: "website",
      images: [{ url: ogImage }],
      siteName: config.site.title,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [ogImage],
    },
  };

  if (noindex) {
    metadata.robots = { index: false, follow: false };
  }

  return metadata;
}
