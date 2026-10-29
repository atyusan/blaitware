import Author from "@layouts/Author";
import { buildPageMetadata } from "@lib/seo";

export const generateMetadata = () =>
  buildPageMetadata({
    title: "Authors",
    description: "Meet the people behind our product and delivery insights.",
    path: "/author",
  });

const AuthorPage = () => <Author />;

export default AuthorPage;
