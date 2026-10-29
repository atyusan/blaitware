import Career from "@layouts/Career";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { buildPageMetadata } from "@lib/seo";

export async function generateMetadata() {
  const index = await getListPage("src/content/career/_index.md");
  return buildPageMetadata({
    title: index.frontmatter.title,
    description: index.frontmatter.description,
    path: "/career",
  });
}

const CareerPage = async () => {
  const index = await getListPage("src/content/career/_index.md");
  const jobs = getSinglePage("src/content/career").sort(
    (a, b) => (a.frontmatter.weight || 99) - (b.frontmatter.weight || 99),
  );

  return <Career data={index} jobs={jobs} />;
};

export default CareerPage;
