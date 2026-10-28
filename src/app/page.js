import config from "@config/config.json";
import Cta from "@layouts/components/Cta";
import SeoMeta from "@layouts/SeoMeta";
import Brands from "@layouts/partials/Brands";
import HomeBanner from "@layouts/partials/HomeBanner";
import HomeFeatures from "@layouts/partials/HomeFeatures";
import Services from "@layouts/partials/Services";
import Testimonials from "@layouts/partials/Testimonials";
import Tools from "@layouts/partials/Tools";
import VideoBlock from "@layouts/partials/VideoBlock";
import Workflow from "@layouts/partials/Workflow";
import { getListPage } from "../lib/contentParser";

const Home = async () => {
  const homePage = await getListPage("src/content/_index.md");
  const { frontmatter } = homePage;
  const {
    banner,
    brands,
    feature,
    video,
    services,
    testimonials,
    tools,
    workflow,
    call_to_action,
  } = frontmatter;
  const { title } = config.site;

  return (
    <>
      <SeoMeta title={title} />
      <HomeBanner banner={banner} />
      <Brands brands={brands} />
      <HomeFeatures feature={feature} />
      <VideoBlock video={video} />
      <Services services={services} />
      <Testimonials testimonials={testimonials} />
      <Tools tools={tools} />
      <Workflow workflow={workflow} />
      <Cta cta={call_to_action} />
    </>
  );
};

export default Home;
