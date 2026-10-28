import MDXContent from "@/app/helper/MDXContent";
import { markdownify } from "@lib/utils/textConverter";

const Default = ({ data }) => {
  const { frontmatter, content } = data;
  const { title } = frontmatter;

  return (
    <>
      <section className="section pb-0">
        <div className="container text-center">
          {markdownify(title, "h1", "h2 mb-3")}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-12 lg:col-10 mx-auto">
              <div className="content">
                <MDXContent content={content} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Default;
