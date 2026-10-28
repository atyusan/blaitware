import Image from "next/image";

const GetDemo = ({ data }) => {
  const { frontmatter } = data;
  const { title, description, logos, resources } = frontmatter;

  return (
    <section className="section">
      <div className="container">
        <div className="row gy-5 items-start">
          <div className="col-12 lg:col-6">
            <h1 className="h2 mb-3">{title}</h1>
            <p className="mb-8">{description}</p>
            <form className="row gy-4">
              <div className="col-12">
                <input
                  type="email"
                  className="form-input w-full"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="col-12 md:col-6">
                <input
                  type="text"
                  className="form-input w-full"
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="col-12 md:col-6">
                <input
                  type="text"
                  className="form-input w-full"
                  placeholder="Last Name"
                  required
                />
              </div>
              <div className="col-12">
                <select className="form-select w-full" required defaultValue="">
                  <option value="" disabled>
                    Organization Size *
                  </option>
                  <option>1-10</option>
                  <option>11-50</option>
                  <option>51-250</option>
                  <option>251-1K</option>
                </select>
              </div>
              <div className="col-12">
                <select className="form-select w-full" required defaultValue="">
                  <option value="" disabled>
                    Region *
                  </option>
                  <option>Africa</option>
                  <option>Asia Pacific</option>
                  <option>Europe</option>
                  <option>Middle East</option>
                  <option>North America</option>
                  <option>South America</option>
                </select>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  Get a Demo
                </button>
              </div>
            </form>
          </div>
          <div className="col-12 lg:col-5 lg:ms-auto">
            <h3 className="h5 mb-4">Successful organizations with us:</h3>
            <div className="mb-8 flex flex-wrap gap-3">
              {logos?.map((logo, i) => (
                <div
                  key={i}
                  className="rounded-lg bg-white p-3 shadow"
                >
                  <Image
                    src={logo}
                    alt="customer logo"
                    width={120}
                    height={40}
                    className="h-8 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {resources?.map((resource, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-border p-4"
                >
                  <h4 className="h6 mb-2">{resource.title}</h4>
                  <p className="mb-0 text-sm">{resource.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetDemo;
