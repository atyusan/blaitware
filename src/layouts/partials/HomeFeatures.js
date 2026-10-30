import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import {
  FaHeadphonesAlt,
  FaMixcloud,
  FaRegDotCircle,
  FaRegThumbsUp,
} from "react-icons/fa";

const icons = {
  FaMixcloud,
  FaRegDotCircle,
  FaHeadphonesAlt,
  FaRegThumbsUp,
};

const HomeFeatures = ({ feature }) => {
  if (!feature) return null;
  return (
    <section className="section bg-light">
      <div className="container">
        <div className="row">
          <div className="col-12 mb-[3rem] xl:col-4 xl:mb-0">
            <div className="xl:pe-3">
              <h2 className="section-title h3 mb-4">{feature.title}</h2>
              <div className="content mb-4">{markdownify(feature.content)}</div>
              {feature.button?.enable && (
                <Link
                  href={feature.button.link}
                  className="btn btn-outline-primary"
                >
                  {feature.button.label}
                </Link>
              )}
            </div>
          </div>
          <div className="col-12 xl:col-8">
            <div className="home-features-grid row">
              {feature.features.map((item, i) => {
                const Icon = icons[item.icon] || FaRegDotCircle;
                return (
                  <div className="col-12 md:col-6" key={`feature-${i}`}>
                    <div className="feature-card is-hoverable flex flex-col rounded-sm bg-white sm:flex-row sm:items-start">
                      <Icon className="icon mb-4 shrink-0 text-[28px] text-primary sm:mb-0 sm:me-4 sm:mt-1" />
                      <div>
                        <h4 className="h5 mb-3">{item.name}</h4>
                        <p className="mb-0">{item.content}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;
