import Image from "next/image";
import Link from "next/link";
import MDXContent from "@/app/helper/MDXContent";

const CaseNavCard = ({ item, label, align = "end" }) => {
  if (!item) return <div className="col-6" />;
  return (
    <div
      className={`col-6 text-center ${
        align === "start" ? "md:text-start" : "md:text-end"
      }`}
    >
      <Link
        href={`/case-studies/${item.slug}`}
        className="is-hoverable inline-block text-inherit shadow-none"
      >
        <div className="overflow-hidden rounded-md bg-[#f9f9f9]">
          {item.frontmatter.image && (
            <Image
              src={item.frontmatter.image}
              alt={item.frontmatter.title}
              width={170}
              height={100}
              className="img mx-auto"
            />
          )}
        </div>
        <p className="mt-2 mb-0 text-center">{label}</p>
        <p className="h5 mb-0 text-center">{item.frontmatter.title}</p>
      </Link>
    </div>
  );
};

const CaseSingle = ({ data, prevCase, nextCase }) => {
  const { frontmatter, content } = data;
  const { title } = frontmatter;

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="row justify-center">
            <div className="col-12 md:col-10 lg:col-8">
              <p className="h6 mb-1 opacity-50">Lets Meet</p>
              <h1 className="h2 mb-0 text-primary">{title}</h1>

              <div className="content mt-12 border-t border-border pt-12">
                <MDXContent content={content} />
              </div>

              <hr className="my-12" />

              <div className="row">
                <CaseNavCard
                  item={prevCase}
                  label="Previous Case"
                  align="start"
                />
                <CaseNavCard item={nextCase} label="Next Case" align="end" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container">
          <div className="row items-center justify-center">
            <div className="col-12 mb-8 text-center md:col-5 md:mb-0 lg:col-4">
              <Image
                src="/images/vector.svg"
                alt="call to action image"
                width={400}
                height={320}
                className="img mx-auto w-full"
              />
            </div>
            <div className="col-12 lg:col-4">
              <div className="ps-0 text-center lg:ps-12 lg:text-start">
                <h2 className="section-title h3">Let’s work together.</h2>
                <p className="mb-4">
                  Ready for a similar outcome? Talk with us about
                  products, custom delivery, or hosting on Bytstack.
                </p>
                <Link href="/contact" className="btn btn-primary" title="Contact Us">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseSingle;
