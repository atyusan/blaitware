import Link from "next/link";
import MDXContent from "@/app/helper/MDXContent";
import { FaEnvelope, FaFacebookF, FaTwitter } from "react-icons/fa";

const CareerSingle = ({ data, otherJobs }) => {
  const { frontmatter, content, slug } = data;
  const { title } = frontmatter;
  const jobPath = `/career/${slug}`;
  const shareUrl = encodeURIComponent(jobPath);
  const shareTitle = encodeURIComponent(title);

  return (
    <>
      <section className="section pb-0">
        <div className="container text-center">
          <div className="row">
            <div className="col-12 mx-auto">
              <h1 className="h2 mb-3">{title}</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row justify-center lg:gx-6">
            <div className="col-12 md:col-10 lg:col-8">
              <div className="pe-0 lg:pe-12">
                <div className="content">
                  <MDXContent content={content} />
                </div>
                <a href="#career_form" className="btn btn-primary mt-12">
                  Apply Now
                </a>
              </div>
            </div>

            <div className="col-12 mt-12 md:col-10 lg:col-4 lg:mt-0">
              <div
                id="career_form"
                className="sidebar-widget mb-8 rounded-xl bg-white"
              >
                <form name="career_form" method="POST" encType="multipart/form-data">
                  <div className="mb-3">
                    <label className="mb-1 block" htmlFor="first-name">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="form-input w-full shadow-none"
                      name="first-name"
                      id="first-name"
                      type="text"
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="mb-1 block" htmlFor="last-name">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="form-input w-full shadow-none"
                      name="last-name"
                      id="last-name"
                      type="text"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="mb-1 block" htmlFor="email">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="form-input w-full shadow-none"
                      name="email"
                      id="email"
                      type="email"
                      placeholder="Email Address"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="mb-1 block" htmlFor="cv">
                      Upload CV <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="my-1 w-full"
                      type="file"
                      name="cv"
                      id="cv"
                      accept=".doc,.docx,.pdf"
                      required
                    />
                    <small className="block text-sm">
                      only doc, pdf file allowed &amp; file size will be less
                      than 2MB
                    </small>
                  </div>
                  <input type="hidden" name="role" value={title} />
                  <button
                    className="btn btn-sm btn-primary w-full"
                    type="submit"
                    aria-label="Apply Now"
                  >
                    Apply Now
                  </button>
                </form>

                <div className="share-this-post mt-4 flex flex-wrap items-center rounded-xl">
                  <span className="m-1 me-2 mt-0 font-medium text-text-dark">
                    Share this job:
                  </span>
                  <ul className="m-1 mt-0 inline-flex list-none gap-1 p-0">
                    <li>
                      <a
                        className="p-1 text-text-dark"
                        href={`https://facebook.com/sharer/sharer.php?u=${shareUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on Facebook"
                      >
                        <FaFacebookF />
                      </a>
                    </li>
                    <li>
                      <a
                        className="p-1 text-text-dark"
                        href={`https://twitter.com/intent/tweet/?text=${shareTitle}&url=${shareUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on Twitter"
                      >
                        <FaTwitter />
                      </a>
                    </li>
                    <li>
                      <a
                        className="p-1 text-text-dark"
                        href={`mailto:?subject=${shareTitle}&body=${shareUrl}`}
                        aria-label="Share by email"
                      >
                        <FaEnvelope />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="sidebar-widget rounded-xl bg-white">
                <h4 className="h5 mb-3">Other Jobs</h4>
                {otherJobs.slice(0, 4).map((job) => (
                  <Link
                    key={job.slug}
                    href={`/career/${job.slug}`}
                    className="is-hoverable mb-3 block rounded-xl border border-border p-4 text-inherit"
                  >
                    <p className="mb-1 font-bold text-text-dark">
                      {job.frontmatter.title}
                    </p>
                    <p className="mb-0">
                      <span>{job.frontmatter.type}</span> |{" "}
                      {job.frontmatter.category}
                    </p>
                  </Link>
                ))}
                <div className="mt-4 text-center">
                  <Link href="/career" className="btn btn-sm btn-outline-primary">
                    View All Positions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CareerSingle;
