import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const CaseStudies = ({ data, cases }) => {
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
          <div className="case-studies-grid row justify-center">
            {cases.map((item) => (
              <div
                className="case-study-col col-12 sm:col-6 lg:col-4 xl:col-3"
                key={item.slug}
              >
                <Link
                  href={`/case-studies/${item.slug}`}
                  className="block h-full text-inherit"
                >
                  <div className="is-hoverable flex h-full flex-col overflow-hidden rounded-md border-0 bg-transparent shadow">
                    <div
                      className="bg-[#f9f9f9]"
                      style={{ background: "#f9f9f9" }}
                    >
                      {item.frontmatter.image && (
                        <Image
                          src={item.frontmatter.image}
                          alt={item.frontmatter.title}
                          width={374}
                          height={220}
                          className="img mx-auto h-auto w-full object-contain"
                        />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-12 pb-0">
                      <h3 className="h5">{item.frontmatter.title}</h3>
                      <div className="content mt-3 mb-4">
                        <h5>Client</h5>
                        <p>
                          {item.frontmatter.description ||
                            "We are looking for a personal financial planning pro (Certified …"}
                        </p>
                      </div>
                    </div>
                    <div className="p-12 pt-0">
                      <span className="inline-flex items-center font-medium text-primary">
                        Read the full case study
                        <FaArrowRight className="ml-1 text-xs" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseStudies;
