import Image from "next/image";
import Link from "next/link";
import PricingAccordion from "@layouts/components/PricingAccordion";

function Pricing({ data }) {
  const {
    frontmatter: {
      title,
      description,
      plans,
      faq_title,
      faq_description,
      faqs,
      call_to_action,
    },
  } = data;

  return (
    <>
      <section className="section pb-0">
        <div className="container text-center">
          <div className="row">
            <div className="col-12 mx-auto lg:col-6">
              <h1 className="h2 mb-3">{title}</h1>
              {description && (
                <p className="mb-0 font-medium">{description}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section my-0 lg:my-12">
        <div className="container">
          <div className="row">
            <div className="col-12 mx-auto lg:col-10">
              <div className="pricing-plans row items-center justify-center">
                {plans.map((plan, index) => (
                  <div
                    className="col-12 px-4 md:col-6 lg:col-4 lg:px-0"
                    key={plan.title + index}
                  >
                    <div
                      className={`card pricing-card text-center ${
                        plan.recommended ? "recommended" : ""
                      }`}
                    >
                      <div className="py-0">
                        <h3 className="h4 mb-4">{plan.title}</h3>
                        <div>
                          <span className="lead">$</span>
                          <span className="h3">{plan.price}</span>{" "}
                          <span>/ {plan.type}</span>
                        </div>
                        <p className="lead mt-4 mb-0">{plan.subtitle}</p>
                        <ul className="mt-8 mb-10 list-none p-0">
                          {plan.features.map((feature, fi) => (
                            <li className="mb-3 leading-5" key={fi}>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <Link
                          className={`btn ${
                            plan.recommended
                              ? "btn-primary"
                              : "btn-outline-primary"
                          }`}
                          href={plan.button.link}
                          title={plan.button.label}
                          rel={plan.button.rel}
                        >
                          {plan.button.label}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {faqs?.length > 0 && (
        <section className="section pt-12">
          <div className="container">
            <div className="row justify-between">
              <div className="col-12 mx-auto mb-12 text-center xl:col-5 lg:col-7">
                <h2 className="section-title h3">
                  {faq_title || "Frequently Asked Questions"}
                </h2>
                {faq_description && (
                  <p className="mb-0">{faq_description}</p>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-12 mx-auto lg:col-10">
                <PricingAccordion faqs={faqs} />
              </div>
            </div>
          </div>
        </section>
      )}

      {call_to_action && (
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
              <div className="col-12 lg:col-6">
                <div className="ps-0 text-center lg:ps-12 lg:text-start">
                  <h2 className="section-title h3">{call_to_action.title}</h2>
                  <p className="mb-4">{call_to_action.content}</p>
                  {call_to_action.button?.enable && (
                    <Link
                      href={call_to_action.button.link}
                      className="btn btn-primary"
                      title={call_to_action.button.label}
                    >
                      {call_to_action.button.label}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Pricing;
