import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import {
  FaBullhorn,
  FaFileSignature,
  FaSignature,
} from "react-icons/fa";

const resourceIcons = {
  FaFileSignature,
  FaSignature,
  FaBullhorn,
};

const GetDemo = ({ data }) => {
  const { frontmatter } = data;
  const { title, description, logos, resources, organizations_title } =
    frontmatter;
  const { contact_form_action } = config.params;

  return (
    <>
      <section className="section pb-0">
        <div className="container text-center">
          <div className="row">
            <div className="col-12 mx-auto lg:col-6">
              {markdownify(title, "h1", "h2 mb-4")}
              <p className="mb-0">{description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row get-demo-row">
            <div className="col-12 lg:col-7">
              <form
                method="POST"
                className="contact-form get-demo-form row"
                action={contact_form_action}
              >
                <div className="col-12">
                  <label
                    className="mb-2 block text-text-dark"
                    htmlFor="email_address"
                  >
                    Email Address
                  </label>
                  <input
                    id="email_address"
                    className="form-input w-full shadow-none"
                    type="email"
                    name="email_address"
                    required
                  />
                </div>
                <div className="col-12 lg:col-6">
                  <label
                    className="mb-2 block text-text-dark"
                    htmlFor="first_name"
                  >
                    First Name
                  </label>
                  <input
                    id="first_name"
                    className="form-input w-full shadow-none"
                    type="text"
                    name="first_name"
                    required
                  />
                </div>
                <div className="col-12 lg:col-6">
                  <label
                    className="mb-2 block text-text-dark"
                    htmlFor="last_name"
                  >
                    Last Name
                  </label>
                  <input
                    id="last_name"
                    className="form-input w-full shadow-none"
                    type="text"
                    name="last_name"
                    required
                  />
                </div>
                <div className="col-12">
                  <label
                    className="mb-2 block text-text-dark"
                    htmlFor="organization_size"
                  >
                    Organization Size (Employees)*
                  </label>
                  <select
                    id="organization_size"
                    className="form-select w-full shadow-none"
                    name="organization_size"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Please Select
                    </option>
                    <option value="1">1-10</option>
                    <option value="2">11-50</option>
                    <option value="3">51-250</option>
                    <option value="4">251-1K</option>
                  </select>
                </div>
                <div className="col-12">
                  <label
                    className="mb-2 block text-text-dark"
                    htmlFor="region"
                  >
                    Region*
                  </label>
                  <select
                    id="region"
                    className="form-select w-full shadow-none"
                    name="region"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Please Select
                    </option>
                    <option value="1">Africa</option>
                    <option value="2">Asia Pacific</option>
                    <option value="3">Europe</option>
                    <option value="4">Middle East</option>
                    <option value="5">North America</option>
                    <option value="6">South America</option>
                  </select>
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm mt-2"
                  >
                    Get a Demo
                  </button>
                </div>
              </form>
            </div>

            <div className="col-12 lg:col-5">
              <div className="mt-4">
                <h3 className="h4 mb-4">
                  {organizations_title || "Successful organizations with us:"}
                </h3>
                {logos?.map((logo, i) => (
                  <div
                    key={i}
                    className="is-hoverable mb-3 me-2 inline-block rounded-sm border border-border bg-white p-3"
                  >
                    <Image
                      src={logo}
                      alt="brand logo"
                      width={186}
                      height={45}
                      className="img h-[45px] w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {resources?.length > 0 && (
        <section className="section pt-0">
          <div className="container">
            <div className="row gy-4">
              {resources.map((resource, i) => {
                const Icon =
                  resourceIcons[resource.icon] ||
                  [FaFileSignature, FaSignature, FaBullhorn][i] ||
                  FaFileSignature;
                return (
                  <div className="col-12 md:col-6 lg:col-4" key={i}>
                    <div className="feature-card rounded-sm bg-light py-12 text-center">
                      <div className="mx-auto mb-8 mt-3 flex h-[65px] w-[65px] items-center justify-center rounded-sm bg-primary text-h5 text-white shadow">
                        <Icon aria-hidden />
                      </div>
                      <h3 className="h5 mb-3">{resource.title}</h3>
                      <p className="mb-3">{resource.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default GetDemo;
