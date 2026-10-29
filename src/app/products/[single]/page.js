import ProductSingle from "@layouts/ProductSingle";
import { getSinglePage } from "@lib/contentParser";
import { buildPageMetadata } from "@lib/seo";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { single } = await params;
  const product = getSinglePage("src/content/products").find(
    (item) => item.slug === single,
  );
  if (!product) return {};
  return buildPageMetadata({
    title: product.frontmatter.title,
    description: product.frontmatter.description,
    image: product.frontmatter.image,
    path: `/products/${single}`,
  });
}

const ProductDetail = async ({ params }) => {
  const { single } = await params;
  const products = getSinglePage("src/content/products");
  const product = products.find((item) => item.slug === single);
  if (!product) return notFound();

  return <ProductSingle data={product} />;
};

export default ProductDetail;

export const generateStaticParams = () => {
  return getSinglePage("src/content/products").map((product) => ({
    single: product.slug,
  }));
};
