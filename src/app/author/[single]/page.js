import authors from "@config/authors.json";
import AuthorSingle from "@layouts/AuthorSingle";
import SeoMeta from "@layouts/SeoMeta";
import { notFound } from "next/navigation";

const AuthorDetail = async ({ params }) => {
  const { single } = await params;
  const author = authors[single];
  if (!author || single === "admin") return notFound();

  return (
    <>
      <SeoMeta title={author.name} description={`Posts by ${author.name}`} />
      <AuthorSingle authorKey={single} />
    </>
  );
};

export default AuthorDetail;

export const generateStaticParams = () =>
  Object.keys(authors)
    .filter((key) => key !== "admin")
    .map((single) => ({ single }));
