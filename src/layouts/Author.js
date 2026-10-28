import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import authors from "@config/authors.json";

const Author = () => {
  const list = Object.entries(authors).filter(([key]) => key !== "admin");

  return (
    <section className="section">
      <div className="container">
        <div className="mb-12 text-center">
          <h1 className="h2 mb-3">Author</h1>
          <p>Read latest blog posts by Author</p>
        </div>
        <div className="row gy-5 justify-center">
          {list.map(([slug, author]) => (
            <div className="col-12 md:col-6 lg:col-4" key={slug}>
              <div className="rounded-lg border border-border p-6 text-center">
                {author.avatar && (
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    width={120}
                    height={120}
                    className="mx-auto mb-4 rounded-full"
                  />
                )}
                <h3 className="h5 mb-2">{author.name}</h3>
                <p className="mb-4 text-sm">
                  {slug === "awab-husameldin"
                    ? "Hic dolor cumque et amet et. Et et id. Aut aspernatur et quibusdam."
                    : "Facilis architecto voluptatem et et. Quia nihil et et. Autem et et."}
                </p>
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
                <Link href={`/author/${slug}`} className="btn btn-sm btn-primary">
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Author;
