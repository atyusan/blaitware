import authors from "@config/authors.json";
import config from "@config/config.json";
import Image from "next/image";
import Link from "next/link";
import { getSinglePage } from "@lib/contentParser";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const AuthorSingle = ({ authorKey }) => {
  const author = authors[authorKey];
  const { blog_folder } = config.settings;
  const posts = getSinglePage(`src/content/${blog_folder}`).filter(
    (post) => post.frontmatter.author === authorKey,
  );

  if (!author) return null;

  return (
    <section className="section">
      <div className="container">
        <div className="mb-12 text-center">
          {author.avatar && (
            <Image
              src={author.avatar}
              alt={author.name}
              width={140}
              height={140}
              className="mx-auto mb-4 rounded-full"
            />
          )}
          <h1 className="h2 mb-3">{author.name}</h1>
          <div className="mb-4 flex justify-center gap-3 text-primary">
            <a href="#" aria-label="facebook">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="twitter">
              <FaTwitter />
            </a>
            <a href="#" aria-label="linkedin">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
        <div className="row gy-4">
          {posts.map((post) => (
            <div className="col-12 md:col-6 lg:col-4" key={post.slug}>
              <Link href={`/${blog_folder}/${post.slug}`} className="block">
                {post.frontmatter.image && (
                  <Image
                    src={post.frontmatter.image}
                    alt={post.frontmatter.title}
                    width={400}
                    height={220}
                    className="mb-4 rounded-lg"
                  />
                )}
                <h3 className="h5">{post.frontmatter.title}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuthorSingle;
