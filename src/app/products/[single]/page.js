import ProductSingle from "@layouts/ProductSingle";
import SeoMeta from "@layouts/SeoMeta";
import { getSinglePage } from "@lib/contentParser";
import { notFound } from "next/navigation";

const ProductDetail = async ({ params }) => {
  const { single } = await params;
  const products = getSinglePage("src/content/products");
  const product = products.find((item) => item.slug === single);
  if (!product) return notFound();

  return (
    <>
      <SeoMeta
        title={product.frontmatter.title}
        description={product.frontmatter.description}
      />
      <ProductSingle data={product} />
    </>
  );
};

export default ProductDetail;

export const generateStaticParams = () => {
  return getSinglePage("src/content/products").map((product) => ({
    single: product.slug,
  }));
};
