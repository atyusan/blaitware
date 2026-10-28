import shortcodes from "@layouts/shortcodes/all";
import "highlight.js/styles/atom-one-dark.css";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const MDXContent = ({ content }) => {
  const mdxOptions = {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeHighlight],
  };

  return (
    <>
      {/* @ts-ignore */}
      <MDXRemote
        source={content}
        components={shortcodes}
        options={{ mdxOptions }}
      />
    </>
  );
};

export default MDXContent;
