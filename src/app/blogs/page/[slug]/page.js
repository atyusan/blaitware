import Pagination from "@components/Pagination";
import config from "@config/config.json";
import SeoMeta from "@layouts/SeoMeta";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { markdownify } from "@lib/utils/textConverter";
import Posts from "@partials/Posts";
const { blog_folder } = config.settings;

// blog pagination
const BlogPagination = async ({ params }) => {
  const { slug } = await params;
  const currentPage = parseInt(slug || 1);
  const { pagination } = config.settings;
  const posts = getSinglePage(`src/content/${blog_folder}`).sort((post1, post2) => {
    const weight1 = post1.frontmatter.weight ?? Number.MAX_SAFE_INTEGER;
    const weight2 = post2.frontmatter.weight ?? Number.MAX_SAFE_INTEGER;
    if (weight1 !== weight2) return weight1 - weight2;
    return new Date(post2.frontmatter.date) - new Date(post1.frontmatter.date);
  });
  const postIndex = await getListPage(`src/content/${blog_folder}/_index.md`);
  const indexOfLastPost = currentPage * pagination;
  const indexOfFirstPost = indexOfLastPost - pagination;
  const totalPages = Math.ceil(posts.length / pagination);
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const { frontmatter } = postIndex;
  const { title, description } = frontmatter;

  return (
    <>
      <SeoMeta title={title} description={description} />
      <section className="section pb-0">
        <div className="container text-center">
          <div className="row">
            <div className="col-12 mx-auto lg:col-6">
              {markdownify(title, "h1", "h2 mb-3")}
              {description && (
                <p className="mb-0 font-medium">{description}</p>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="section mt-4">
        <div className="container">
          <div className="row">
            <Posts posts={currentPosts} />
            <Pagination
              section={blog_folder}
              totalPages={totalPages}
              currentPage={currentPage}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPagination;

export async function generateStaticParams() {
  const getAllSlug = getSinglePage(`src/content/${blog_folder}`);
  const allSlug = getAllSlug.map((item) => item.slug);
  const { pagination } = config.settings;
  const totalPages = Math.ceil(allSlug.length / pagination);
  let paths = [];

  for (let i = 1; i < totalPages; i++) {
    paths.push({
      slug: (i + 1).toString(),
    });
  }

  return paths;
}
