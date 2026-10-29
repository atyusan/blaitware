import CareerSingle from "@layouts/CareerSingle";
import { getSinglePage } from "@lib/contentParser";
import { buildPageMetadata } from "@lib/seo";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { single } = await params;
  const job = getSinglePage("src/content/career").find(
    (item) => item.slug === single,
  );
  if (!job) return {};
  return buildPageMetadata({
    title: job.frontmatter.title,
    description: job.frontmatter.description,
    path: `/career/${single}`,
  });
}

const CareerDetail = async ({ params }) => {
  const { single } = await params;
  const jobs = getSinglePage("src/content/career");
  const job = jobs.find((item) => item.slug === single);
  if (!job) return notFound();
  const otherJobs = jobs.filter((item) => item.slug !== single).slice(0, 5);

  return <CareerSingle data={job} otherJobs={otherJobs} />;
};

export default CareerDetail;

export const generateStaticParams = () =>
  getSinglePage("src/content/career").map((job) => ({ single: job.slug }));
