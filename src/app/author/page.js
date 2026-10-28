import Author from "@layouts/Author";
import SeoMeta from "@layouts/SeoMeta";

const AuthorPage = () => (
  <>
    <SeoMeta title="Author" description="Read latest blog posts by Author" />
    <Author />
  </>
);

export default AuthorPage;
