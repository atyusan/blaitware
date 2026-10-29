import Products from "@layouts/Products";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { buildPageMetadata } from "@lib/seo";

export async function generateMetadata() {
  const productsIndex = await getListPage("src/content/products/_index.md");
  return buildPageMetadata({
    title: productsIndex.frontmatter.title,
    description: productsIndex.frontmatter.description,
    path: "/products",
  });
}

const ProductsPage = async () => {
  const productsIndex = await getListPage("src/content/products/_index.md");
  const products = getSinglePage("src/content/products").sort(
    (a, b) => (a.frontmatter.weight || 99) - (b.frontmatter.weight || 99),
  );

  return <Products data={productsIndex} products={products} />;
};

export default ProductsPage;
