import authors from "@config/authors.json";
import AuthorSingle from "@layouts/AuthorSingle";
import { buildPageMetadata } from "@lib/seo";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { single } = await params;
  const author = authors[single];
  if (!author || single === "admin") return {};
  return buildPageMetadata({
    title: author.name,
    description: author.bio || `Posts by ${author.name}`,
    path: `/author/${single}`,
  });
}

const AuthorDetail = async ({ params }) => {
  const { single } = await params;
  const author = authors[single];
  if (!author || single === "admin") return notFound();

  return <AuthorSingle authorKey={single} />;
};

export default AuthorDetail;

export const generateStaticParams = () =>
  Object.keys(authors)
    .filter((key) => key !== "admin")
    .map((single) => ({ single }));
