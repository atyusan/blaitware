import Image from "next/image";
import Link from "next/link";
import VideoBlock from "@layouts/partials/VideoBlock";
import Services from "@layouts/partials/Services";
import { markdownify } from "@lib/utils/textConverter";
import { FaSync, FaTty } from "react-icons/fa";

const highlightIcons = {
  FaTty,
  FaSync,
};

const ProductSingle = ({ data }) => {
  const { frontmatter } = data;
  const {
    title,
    description,
    image,
    button,
    banner,
    intro,
    highlights,
    experiments,
    video,
    services,
    cta,
  } = frontmatter;

  const heroTitle = banner?.title || title;
  const heroDescription = banner?.description || description;
  const heroImage = banner?.image || image;
  const heroLight = banner?.light !== false;

  return (
    <>
      {/* Hero */}
      <section className={`section${heroLight ? " bg-light" : ""}`}>
        <div className="container">
          <div className="row items-center justify-center">
            <div className="col-12 mb-10 md:col-10 lg:col-5 lg:mb-0">
              <div className="pe-0 text-center lg:pe-12 lg:text-start">
                <h1 className="section-title h2">{heroTitle}</h1>
                <p className="mb-5">{heroDescription}</p>
                {button?.enable && (
                  <Link href={button.link} className="btn btn-outline-primary">
                    {button.label}
                  </Link>
                )}
              </div>
            </div>
            <div className="col-12 text-center lg:col-7">
              {heroImage && (
                <Image
                  src={heroImage}
                  alt={heroTitle}
                  width={720}
                  height={450}
                  className="img mx-auto rounded-xl shadow"
                  priority
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Intro + two highlight columns */}
      {(intro || highlights?.length > 0) && (
        <section className="section">
          <div className="container">
            {intro && (
              <div className="row">
                <div className="col-12 mx-auto mb-4 text-center xl:col-7">
                  {markdownify(intro.title, "h2", "section-title h3")}
                  <div className="content mb-5">
                    {markdownify(intro.content)}
                  </div>
                </div>
              </div>
            )}
            {highlights?.length > 0 && (
              <div
                className="row"
                style={{ "--bs-gutter-x": "3rem", "--bs-gutter-y": "3rem" }}
              >
                {highlights.map((item, i) => {
                  const Icon = highlightIcons[item.icon] || FaTty;
                  return (
                    <div className="col-12 lg:col-6" key={i}>
                      <div className="px-0 sm:px-8 lg:px-12">
                        <div className="mb-4 text-[3rem] leading-none text-primary">
                          <Icon />
                        </div>
                        <h2 className="h4 mb-3">{item.title}</h2>
                        <div className="content">
                          {markdownify(item.content, "div")}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Experiments / audience features */}
      {experiments && (
        <section
          className={`section${experiments.light === false ? "" : " bg-light"}`}
        >
          <div className="container">
            <div className="row">
              <div className="col-12 xl:col-6">
                {markdownify(experiments.title, "h2", "section-title h3")}
                <div className="content mb-5">
                  {markdownify(experiments.content)}
                </div>
              </div>
            </div>
            {experiments.blocks?.map((block, bi) => (
              <div
                className={`row items-center ${bi > 0 ? "mt-12" : ""}`}
                key={bi}
              >
                <div className="order-2 col-12 lg:order-1 lg:col-6">
                  <div className="me-0 lg:me-12">
                    {block.features?.map((feat, fi) => (
                      <div key={fi} className={fi > 0 ? "mt-6" : ""}>
                        <h5 className="mb-2">{feat.title}</h5>
                        <p className="mb-0">{feat.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="order-1 col-12 mb-8 lg:order-2 lg:col-5 lg:mb-0">
                  {block.image && (
                    <Image
                      src={block.image}
                      alt=""
                      width={600}
                      height={400}
                      className="rounded-xl shadow"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {video && <VideoBlock video={video} />}

      {/* Alternating image / copy showcase */}
      {services?.length > 0 && <Services services={services} />}

      {/* CTA */}
      {cta && (
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col-12 mx-auto text-center xl:col-7">
                <h2 className="section-title h3">{cta.title}</h2>
                <div className="content mb-5">
                  {markdownify(cta.content)}
                </div>
                {cta.button?.enable && (
                  <Link
                    href={cta.button.link}
                    className="btn btn-outline-primary"
                  >
                    {cta.button.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductSingle;
