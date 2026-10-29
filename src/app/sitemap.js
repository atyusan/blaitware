import config from "@config/config.json";
import { getSinglePage } from "@lib/contentParser";
import { absoluteUrl } from "@lib/seo";

const { blog_folder, pagination } = config.settings;

/** English-only sitemap (locale prefixes deferred). */
export default function sitemap() {
  const now = new Date();

  const regularPages = getSinglePage("src/content")
    .filter((page) => page.frontmatter.layout !== "404")
    .map((page) => ({
      url: absoluteUrl(`/${page.slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const products = getSinglePage("src/content/products").map((page) => ({
    url: absoluteUrl(`/products/${page.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const cases = getSinglePage("src/content/case-studies").map((page) => ({
    url: absoluteUrl(`/case-studies/${page.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const careers = getSinglePage("src/content/career").map((page) => ({
    url: absoluteUrl(`/career/${page.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const posts = getSinglePage(`src/content/${blog_folder}`);
  const blogPosts = posts.map((page) => ({
    url: absoluteUrl(`/${blog_folder}/${page.slug}`),
    lastModified: page.frontmatter.date
      ? new Date(page.frontmatter.date)
      : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const totalBlogPages = Math.max(1, Math.ceil(posts.length / pagination));
  const blogPages = [];
  for (let i = 1; i <= totalBlogPages; i++) {
    blogPages.push({
      url:
        i === 1
          ? absoluteUrl(`/${blog_folder}`)
          : absoluteUrl(`/${blog_folder}/page/${i}`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: i === 1 ? 0.7 : 0.4,
    });
  }

  return [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/products"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/case-studies"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/career"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/author"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    ...regularPages,
    ...products,
    ...cases,
    ...careers,
    ...blogPages,
    ...blogPosts,
  ];
}
