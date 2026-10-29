import CaseStudies from "@layouts/CaseStudies";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { buildPageMetadata } from "@lib/seo";

export async function generateMetadata() {
  const index = await getListPage("src/content/case-studies/_index.md");
  return buildPageMetadata({
    title: index.frontmatter.title,
    description: index.frontmatter.description,
    path: "/case-studies",
  });
}

const CaseStudiesPage = async () => {
  const index = await getListPage("src/content/case-studies/_index.md");
  const cases = getSinglePage("src/content/case-studies").sort(
    (a, b) => (a.frontmatter.weight || 99) - (b.frontmatter.weight || 99),
  );

  return <CaseStudies data={index} cases={cases} />;
};

export default CaseStudiesPage;
