import authors from "@config/authors.json";
import TableOfContents from "@layouts/components/TableOfContents";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaClock,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import SeoMeta from "./SeoMeta";
import MDXContent from "@/app/helper/MDXContent";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const readingTime = (content = "") => {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

const PostSingle = ({ frontmatter, content }) => {
  let { description, title, image, author, date } = frontmatter;
  description = description ? description : content.slice(0, 120);
  const authorKey = author;
  const authorData = authors[author] || {
    name: author || "Admin",
    avatar: "",
    bio: "",
  };
  const isNamedAuthor = authorKey && authorKey !== "admin";
  const minutes = readingTime(content);

  return (
    <>
      <SeoMeta title={title} description={description} />
      <section className="section">
        <div className="container">
          <div className="row">
            <article className="post-single col-12 mx-auto lg:col-8">
              {image && (
                <Image
                  src={image}
                  height={500}
                  width={1000}
                  alt={title}
                  priority={true}
                  className="post-single-image img w-full rounded-md"
                />
              )}

              <div className="post-single-meta mb-3">
                <div className="me-3 inline-flex items-center">
                  <div className="user-image me-1">
                    {authorData.avatar ? (
                      isNamedAuthor ? (
                        <Link
                          href={`/author/${authorKey}`}
                          title={authorData.name}
                        >
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
                    ) : null}
                  </div>
                  <div className="user-info">
                    <p className="mb-0 font-medium">
                      <span className="mx-1">by</span>
                      {isNamedAuthor ? (
                        <Link
                          href={`/author/${authorKey}`}
                          className="text-text-dark"
                        >
                          {authorData.name}
                        </Link>
                      ) : (
                        <span className="text-text">{authorData.name}</span>
                      )}
                    </p>
                  </div>
                </div>

                {date && (
                  <span className="post-single-date font-medium">
                    <FaCalendarAlt
                      className="me-1 inline text-text-dark"
                      aria-hidden
                    />
                    {formatDate(date)}
                    <span className="mx-1 font-medium text-text-dark/50">|</span>
                    <FaClock
                      className="me-1 inline text-text-dark"
                      aria-hidden
                    />
                    {minutes} min Read
                  </span>
                )}
              </div>

              {markdownify(title, "h2", "h3 post-single-title")}

              <div className="content post-single-content">
                <TableOfContents content={content} />
                <MDXContent content={content} />
              </div>

              {isNamedAuthor && (
                <div className="author-box mt-[3rem] block rounded-md border border-border p-[3rem] pb-[1.5rem] sm:flex">
                  {authorData.avatar && (
                    <div className="mb-3 min-w-[110px]">
                      <Image
                        src={authorData.avatar}
                        alt={authorData.name}
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="title h5 mb-1">
                      <Link
                        href={`/author/${authorKey}`}
                        className="text-text-dark"
                      >
                        {authorData.name}
                      </Link>
                    </h3>
                    {authorData.bio && (
                      <div className="content">
                        <p>{authorData.bio}</p>
                      </div>
                    )}
                    <ul className="social-icons mt-3 mb-0 justify-start">
                      <li>
                        <a href="#!" aria-label="facebook">
                          <FaFacebookF />
                        </a>
                      </li>
                      <li>
                        <a href="#!" aria-label="linkedin">
                          <FaLinkedinIn />
                        </a>
                      </li>
                      <li>
                        <a href="#!" aria-label="twitter">
                          <FaTwitter />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostSingle;
