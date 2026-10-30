import Image from "next/image";
import Link from "next/link";
import {
  FaCloud,
  FaCode,
  FaMobileAlt,
  FaNetworkWired,
  FaServer,
} from "react-icons/fa";

const iconMap = {
  FaCode,
  FaMobileAlt,
  FaCloud,
  FaNetworkWired,
  FaServer,
};

const Services = ({ data }) => {
  const { frontmatter } = data;
  const { title, description, button, offerings, datacenter, cta } =
    frontmatter;

  return (
    <>
      <section className="section bg-light">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="section-title h2 mb-4">{title}</h1>
            <p className="mb-6">{description}</p>
            {button?.enable && (
              <Link href={button.link} className="btn btn-primary">
                {button.label}
              </Link>
            )}
          </div>
        </div>
      </section>

      {offerings?.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="services-offerings row">
              {offerings.map((item, i) => {
                const Icon = iconMap[item.icon] || FaCode;
                return (
                  <div className="col-12 md:col-6" key={i}>
                    <div className="h-full rounded-sm border border-border p-6 lg:p-8">
                      <Icon className="mb-4 text-3xl text-primary" />
                      <h2 className="h4 mb-3">{item.title}</h2>
                      <p className="mb-4">{item.content}</p>
                      {item.points?.length > 0 && (
                        <ul className="mb-0 list-disc ps-5 text-sm">
                          {item.points.map((point, j) => (
                            <li key={j} className="mb-1">
                              {point}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {datacenter && (
        <section className="section bg-light">
          <div className="container">
            <div className="row items-center gap-y-8">
              <div className="col-12 lg:col-6">
                <h2 className="section-title h3 mb-4">{datacenter.title}</h2>
                <p className="mb-4">{datacenter.content}</p>
                {datacenter.points?.map((point, i) => (
                  <p key={i} className="mb-2 text-sm">
                    {point}
                  </p>
                ))}
              </div>
              <div className="col-12 lg:col-6">
                {datacenter.image && (
                  <Image
                    src={datacenter.image}
                    alt={datacenter.title}
                    width={600}
                    height={400}
                    className="h-auto w-full rounded-sm"
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {cta && (
        <section className="section">
          <div className="container text-center">
            <h2 className="section-title h3 mb-4">{cta.title}</h2>
            <p className="mx-auto mb-6 max-w-2xl">{cta.content}</p>
            {cta.button?.enable && (
              <Link href={cta.button.link} className="btn btn-primary">
                {cta.button.label}
              </Link>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Services;
