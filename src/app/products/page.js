import Products from "@layouts/Products";
import SeoMeta from "@layouts/SeoMeta";
import { getListPage, getSinglePage } from "@lib/contentParser";

const ProductsPage = async () => {
  const productsIndex = await getListPage("src/content/products/_index.md");
  const products = getSinglePage("src/content/products").sort(
    (a, b) => (a.frontmatter.weight || 99) - (b.frontmatter.weight || 99),
  );

  return (
    <>
      <SeoMeta
        title={productsIndex.frontmatter.title}
        description={productsIndex.frontmatter.description}
      />
      <Products data={productsIndex} products={products} />
    </>
  );
};

export default ProductsPage;
