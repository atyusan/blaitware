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
    <section className="section">
      <div className="container">
        <div className="mb-12 text-center">
          <h1 className="h2 mb-3">{title}</h1>
          <p className="mx-auto max-w-2xl">{description}</p>
        </div>
        <div className="row gy-4">
          {sorted.map((product) => {
            const Icon = icons[product.frontmatter.icon] || FaUsers;
            return (
              <div className="col-12 sm:col-6 lg:col-3" key={product.slug}>
                <Link
                  href={`/products/${product.slug}`}
                  className="block h-full rounded-lg border border-border p-6 transition hover:shadow"
                >
                  <Icon className="mb-4 text-3xl text-primary" />
                  <h3 className="h5 mb-2">{product.frontmatter.title}</h3>
                  <p className="mb-4 text-sm">{product.frontmatter.description}</p>
                  <span className="inline-flex items-center gap-2 text-primary">
                    View product <FaArrowRight className="text-xs" />
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Products;
