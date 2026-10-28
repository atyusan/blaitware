import Career from "@layouts/Career";
import SeoMeta from "@layouts/SeoMeta";
import { getListPage, getSinglePage } from "@lib/contentParser";

const CareerPage = async () => {
  const index = await getListPage("src/content/career/_index.md");
  const jobs = getSinglePage("src/content/career").sort(
    (a, b) => (a.frontmatter.weight || 99) - (b.frontmatter.weight || 99),
  );

  return (
    <>
      <SeoMeta
        title={index.frontmatter.title}
        description={index.frontmatter.description}
      />
      <Career data={index} jobs={jobs} />
    </>
  );
};

export default CareerPage;
