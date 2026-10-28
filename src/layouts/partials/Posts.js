import authors from "@config/authors.json";
import config from "@config/config.json";
import TableOfContents from "@layouts/components/TableOfContents";
import { plainify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt, FaUserCircle } from "react-icons/fa";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const PostMeta = ({ author, date }) => {
  const authorData = authors[author] || { name: author || "Admin", avatar: "" };
  const isNamedAuthor = author && author !== "admin";

  return (
    <div className="mb-4 flex items-center">
      <div className="user-image me-1">
        {authorData.avatar ? (
          isNamedAuthor ? (
            <Link href={`/author/${author}`} title={authorData.name}>
              <Image
                src={authorData.avatar}
                alt={authorData.name}
                width={30}
                height={30}
                className="rounded-full"
              />
            </Link>
          ) : (
            <Image
              src={authorData.avatar}
              alt={authorData.name}
              width={30}
              height={30}
              className="rounded-full"
            />
          )
        ) : (
          <FaUserCircle
            className="relative top-0.5 text-[26px] text-text-dark"
            aria-hidden
          />
        )}
      </div>
      <div className="user-info me-3">
        <p className="mb-0 font-medium">
          <span className="mx-1">by</span>
          {isNamedAuthor ? (
            <Link href={`/author/${author}`} className="text-text-dark">
              {authorData.name}
            </Link>
          ) : (
            <span className="text-text">{authorData.name}</span>
          )}
        </p>
      </div>
      <div className="flex items-center font-medium">
        <FaCalendarAlt className="me-1 text-text-dark" aria-hidden />
        {formatDate(date)}
      </div>
    </div>
  );
};

const Posts = ({ posts }) => {
  const { blog_folder, summary_length } = config.settings;
  const featured = posts[0];
  const rest = posts.slice(1);

  const excerpt = (post) =>
    post.frontmatter.description ||
    plainify(post.content?.slice(0, Number(summary_length)), "div");

  return (
    <div className="blog-posts-grid row pb-0">
      {featured && (
        <div className="col-12 pb-5">
          <div className="row items-center">
            <div className="col-12 mb-4 md:col-6 md:mb-0">
              {featured.frontmatter.image && (
                <Image
                  className="img h-auto w-full rounded-md"
                  src={featured.frontmatter.image}
                  alt={featured.frontmatter.title}
                  width={540}
                  height={270}
                  priority={true}
                />
              )}
            </div>
            <div className="col-12 md:col-6">
              <PostMeta
                author={featured.frontmatter.author}
                date={featured.frontmatter.date}
              />
              <h2 className="h3 mb-3">
                <Link
                  href={`/${blog_folder}/${featured.slug}`}
                  className="inline-block text-text-dark"
                  title={featured.frontmatter.title}
                >
                  {featured.frontmatter.title}
                </Link>
              </h2>
              <TableOfContents content={featured.content} />
              <p className="mb-0 text-text">{excerpt(featured)}</p>
              <Link
                className="btn btn-sm btn-primary mt-4"
                href={`/${blog_folder}/${featured.slug}`}
                title={`Read More - ${featured.frontmatter.title}`}
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      )}

      {rest.map((post, i) => (
        <div key={`key-${i}`} className="col-12 pb-4 sm:col-6 lg:col-4">
          <div className="blog-card">
            {post.frontmatter.image && (
              <Image
                className="img mb-4 rounded-md"
                src={post.frontmatter.image}
                alt={post.frontmatter.title}
                width={445}
                height={230}
              />
            )}
            <div className="p-0">
              <PostMeta
                author={post.frontmatter.author}
                date={post.frontmatter.date}
              />
              <h3 className="h5">
                <Link
                  href={`/${blog_folder}/${post.slug}`}
                  className="inline-block text-text-dark"
                  title={post.frontmatter.title}
                >
                  {post.frontmatter.title}
                </Link>
              </h3>
              <p className="mb-4 text-text">{excerpt(post)}</p>
              <Link
                className="btn btn-sm btn-primary"
                href={`/${blog_folder}/${post.slug}`}
                title={`Read More - ${post.frontmatter.title}`}
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
