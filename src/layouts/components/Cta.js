import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";

function Cta({ cta }) {
  if (!cta) return null;
  return (
    <section className="section">
      <div className="container">
        <div className="row">
          <div className="col-12 mx-auto text-center lg:col-8">
            <h2 className="section-title h3">{cta.title}</h2>
            <p className="mt-4">{markdownify(cta.content)}</p>
            {cta.button?.enable && (
              <Link className="btn btn-primary mt-6" href={cta.button.link}>
                {cta.button.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cta;
