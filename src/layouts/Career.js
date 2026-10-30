import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

const Career = ({ data, jobs }) => {
  const { frontmatter } = data;
  const { title, description } = frontmatter;

  return (
    <>
      <section className="section pb-0">
        <div className="container text-center">
          <div className="row">
            <div className="col-12 mx-auto lg:col-6">
              <h1 className="h2 mb-3">{title}</h1>
              <p className="mb-0 font-medium">{description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Premium: row gx-md-5 gy-5 → 3rem gutters (see .career-jobs in style.css) */}
          <div className="career-jobs row">
            {jobs.map((job) => (
              <div className="career-job-col col-12 md:col-6" key={job.slug}>
                <div className="is-hoverable relative h-full rounded-xl border border-border p-6 md:p-12">
                  <h5 className="mb-2">{job.frontmatter.title}</h5>
                  <p className="mb-0">
                    <span>{job.frontmatter.type}</span> |{" "}
                    {job.frontmatter.category}
                  </p>
                  <Link
                    href={`/career/${job.slug}`}
                    className="btn-link mt-2 inline-flex items-center font-medium text-primary after:absolute after:inset-0"
                  >
                    Apply for Position <FaArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Career;
