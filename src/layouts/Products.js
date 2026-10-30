import Link from "next/link";
import {
  FaArrowRight,
  FaBriefcaseMedical,
  FaChartBar,
  FaEnvelopeOpenText,
  FaGraduationCap,
  FaHeadset,
  FaLaptopHouse,
  FaServer,
  FaUsers,
} from "react-icons/fa";

const icons = {
  FaUsers,
  FaHeadset,
  FaLaptopHouse,
  FaEnvelopeOpenText,
  FaChartBar,
  FaServer,
  FaBriefcaseMedical,
  FaGraduationCap,
};

const Products = ({ data, products }) => {
  const { frontmatter } = data;
  const { title, description } = frontmatter;
  const sorted = [...products].sort(
    (a, b) => (a.frontmatter.weight || 0) - (b.frontmatter.weight || 0),
  );

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
          <div className="products-grid row justify-center">
            {sorted.map((product) => {
              const Icon = icons[product.frontmatter.icon] || FaUsers;
              return (
                <div
                  className="col-12 sm:col-6 lg:col-4 xl:col-3"
                  key={product.slug}
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className="products-card is-hoverable block h-full text-inherit no-underline"
                  >
                    <div className="products-card-body">
                      <span className="mb-4 inline-block text-h3 text-primary">
                        <Icon aria-hidden />
                      </span>
                      <h3 className="h5">{product.frontmatter.title}</h3>
                      <p className="mb-4 mt-3">{product.frontmatter.description}</p>
                    </div>
                    <div className="products-card-footer">
                      <span className="inline-flex items-center font-medium text-primary">
                        View Product{" "}
                        <FaArrowRight className="ms-1 text-xs" />
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
