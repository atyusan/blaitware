import config from "@config/config.json";
import PostSingle from "@layouts/PostSingle";
import { getSinglePage } from "@lib/contentParser";
import { buildPageMetadata } from "@lib/seo";
import { notFound } from "next/navigation";

const { blog_folder } = config.settings;

export async function generateMetadata({ params }) {
  const { single } = await params;
  const post = getSinglePage(`src/content/${blog_folder}`).find(
    (p) => p.slug == single,
  );
  if (!post) return {};
  const { title, description, image, content } = {
    ...post.frontmatter,
    content: post.content,
  };
  return buildPageMetadata({
    title,
    description: description || content?.slice(0, 120),
    image,
    path: `/${blog_folder}/${single}`,
  });
}

const Article = async ({ params }) => {
  const { single } = await params;
  const posts = getSinglePage(`src/content/${blog_folder}`);
  const post = posts.find((p) => p.slug == single);
  if (!post) return notFound();
  const { frontmatter, content } = post;

  return <PostSingle frontmatter={frontmatter} content={content} />;
};

export const generateStaticParams = () => {
  const allSlug = getSinglePage(`src/content/${blog_folder}`);
  return allSlug.map((item) => ({
    single: item.slug,
  }));
};

export default Article;
