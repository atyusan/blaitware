import CaseSingle from "@layouts/CaseSingle";
import SeoMeta from "@layouts/SeoMeta";
import { getSinglePage } from "@lib/contentParser";
import { notFound } from "next/navigation";

const CaseDetail = async ({ params }) => {
  const { single } = await params;
  const cases = getSinglePage("src/content/case-studies").sort(
    (a, b) => (a.frontmatter.weight || 99) - (b.frontmatter.weight || 99),
  );
  const currentIndex = cases.findIndex((item) => item.slug === single);
  if (currentIndex < 0) return notFound();

  const item = cases[currentIndex];
  const prevCase = currentIndex > 0 ? cases[currentIndex - 1] : null;
  const nextCase =
    currentIndex < cases.length - 1 ? cases[currentIndex + 1] : null;

  return (
    <>
      <SeoMeta
        title={item.frontmatter.title}
        description={item.frontmatter.description}
      />
      <CaseSingle data={item} prevCase={prevCase} nextCase={nextCase} />
    </>
  );
};

export default CaseDetail;

export const generateStaticParams = () =>
  getSinglePage("src/content/case-studies").map((item) => ({
    single: item.slug,
  }));
