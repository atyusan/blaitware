import CareerSingle from "@layouts/CareerSingle";
import SeoMeta from "@layouts/SeoMeta";
import { getSinglePage } from "@lib/contentParser";
import { notFound } from "next/navigation";

const CareerDetail = async ({ params }) => {
  const { single } = await params;
  const jobs = getSinglePage("src/content/career");
  const job = jobs.find((item) => item.slug === single);
  if (!job) return notFound();
  const otherJobs = jobs.filter((item) => item.slug !== single).slice(0, 5);

  return (
    <>
      <SeoMeta
        title={job.frontmatter.title}
        description={job.frontmatter.description}
      />
      <CareerSingle data={job} otherJobs={otherJobs} />
    </>
  );
};

export default CareerDetail;

export const generateStaticParams = () =>
  getSinglePage("src/content/career").map((job) => ({ single: job.slug }));
