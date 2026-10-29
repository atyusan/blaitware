import CaseSingle from "@layouts/CaseSingle";
import { getSinglePage } from "@lib/contentParser";
import { buildPageMetadata } from "@lib/seo";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { single } = await params;
  const item = getSinglePage("src/content/case-studies").find(
    (c) => c.slug === single,
  );
  if (!item) return {};
  return buildPageMetadata({
    title: item.frontmatter.title,
    description: item.frontmatter.description,
    image: item.frontmatter.image,
    path: `/case-studies/${single}`,
  });
}

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

  return <CaseSingle data={item} prevCase={prevCase} nextCase={nextCase} />;
};

export default CaseDetail;

export const generateStaticParams = () =>
  getSinglePage("src/content/case-studies").map((item) => ({
    single: item.slug,
  }));
