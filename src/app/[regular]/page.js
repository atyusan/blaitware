import NotFound from "@layouts/404";
import About from "@layouts/About";
import Contact from "@layouts/Contact";
import Default from "@layouts/Default";
import Faq from "@layouts/Faq";
import GetDemo from "@layouts/GetDemo";
import HowItWorks from "@layouts/HowItWorks";
import Pricing from "@layouts/Pricing";
import SeoMeta from "@layouts/SeoMeta";
import Team from "@layouts/Team";
import { getRegularPage, getSinglePage } from "@lib/contentParser";

const RegularPages = async ({ params }) => {
  const { regular } = await params;
  const regularPageData = await getRegularPage(regular);
  const { title, meta_title, description, image, noindex, canonical, layout } =
    regularPageData.frontmatter;
  const { content } = regularPageData;

  return (
    <>
      <SeoMeta
        title={title}
        description={description ? description : content.slice(0, 120)}
        meta_title={meta_title}
        image={image}
        noindex={noindex}
        canonical={canonical}
      />
      {layout === "404" ? (
        <NotFound data={regularPageData} />
      ) : layout === "contact" ? (
        <Contact data={regularPageData} />
      ) : layout === "pricing" ? (
        <Pricing data={regularPageData} />
      ) : layout === "faq" ? (
        <Faq data={regularPageData} />
      ) : layout === "about" ? (
        <About data={regularPageData} />
      ) : layout === "team" ? (
        <Team data={regularPageData} />
      ) : layout === "how-it-works" ? (
        <HowItWorks data={regularPageData} />
      ) : layout === "get-demo" ? (
        <GetDemo data={regularPageData} />
      ) : (
        <Default data={regularPageData} />
      )}
    </>
  );
};
export default RegularPages;

export const generateStaticParams = async () => {
  const allslugs = getSinglePage("src/content");
  const slugs = allslugs.map((item) => item.slug);
  const paths = slugs.map((slug) => ({
    regular: slug,
  }));

  return paths;
};
