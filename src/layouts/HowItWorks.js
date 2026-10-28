import Image from "next/image";
import Link from "next/link";
import VideoBlock from "@layouts/partials/VideoBlock";
import { markdownify, plainify } from "@lib/utils/textConverter";

const HowItWorks = ({ data }) => {
  const { frontmatter } = data;
  const { title, description, image, button, video, steps } = frontmatter;

  return (
    <>
      <section className="section bg-light">
        <div className="container">
          <div className="row items-center justify-center">
            <div className="col-12 mb-10 md:col-10 lg:col-6 lg:mb-0">
              <div className="pe-0 text-center lg:pe-12 lg:text-start">
                <h1 className="section-title h2">{title}</h1>
                <p className="mb-5">{description}</p>
                {button?.enable && (
                  <Link href={button.link} className="btn btn-outline-primary">
                    {button.label}
                  </Link>
                )}
              </div>
            </div>
            <div className="col-12 text-center lg:col-6">
              {image && (
                <Image
                  src={image}
                  alt={title}
                  width={550}
                  height={400}
                  className="img mx-auto"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {video && <VideoBlock video={video} />}

      <div className="how-it-works-steps">
        {/* Single continuous center line spanning all steps */}
        <div className="how-it-works-line" aria-hidden="true" />
        {steps?.map((step, index) => {
          const isEven = index % 2 === 0;
          const isFirst = index === 0;
          const isLast = index === steps.length - 1;
          const rightImage = isEven;

          return (
            <section
              key={index}
              className={`section how-it-works overflow-hidden ${
                isEven ? "bg-light" : ""
              } ${isFirst ? "first-element" : ""} ${
                isLast ? "last-element" : ""
              } ${isLast && isEven ? "has-bg-light" : ""}`}
            >
              <div className="container">
                <div
                  className={`hiw-block row items-center gap-y-8 lg:gap-y-0 ${
                    rightImage ? "hiw-block-right-image" : ""
                  }`}
                >
                  <div
                    className={`col-12 lg:col-6 ${
                      rightImage
                        ? "order-2 text-center lg:order-1 lg:text-end"
                        : "order-2 text-center lg:order-2 lg:text-start"
                    }`}
                  >
                    <div className="px-0 lg:px-6">
                      {markdownify(step.title, "h2", "section-title h3")}
                      <p className="mb-4">{step.content}</p>
                    </div>
                  </div>
                  <div
                    className={`col-12 lg:col-6 ${
                      rightImage ? "order-1 lg:order-2" : "order-1 lg:order-1"
                    }`}
                  >
                    <div className="px-0 lg:px-6">
                      <Image
                        src={step.image}
                        alt={plainify(step.title)}
                        width={540}
                        height={400}
                        className="w-full rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
};

export default HowItWorks;
