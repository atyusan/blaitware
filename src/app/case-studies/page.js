import CaseStudies from "@layouts/CaseStudies";
import SeoMeta from "@layouts/SeoMeta";
import { getListPage, getSinglePage } from "@lib/contentParser";

const CaseStudiesPage = async () => {
  const index = await getListPage("src/content/case-studies/_index.md");
  const cases = getSinglePage("src/content/case-studies").sort(
    (a, b) => (a.frontmatter.weight || 99) - (b.frontmatter.weight || 99),
  );

  return (
    <>
      <SeoMeta
        title={index.frontmatter.title}
        description={index.frontmatter.description}
      />
      <CaseStudies data={index} cases={cases} />
    </>
  );
};

export default CaseStudiesPage;
