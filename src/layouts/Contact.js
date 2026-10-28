import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title, info } = frontmatter;
  const { contact_form_action } = config.params;

  return (
    <>
      <section className="section pb-0">
        <div className="container text-center">
          {markdownify(title, "h1", "h2 mb-3")}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row contact-row">
            <div className="col-12 lg:col-6">
              <div className="content contact-info">
                {markdownify(info.title, "h4")}
                {markdownify(info.description, "p")}
                <ul>
                  {info.contacts.map((contact, index) => (
                    <li key={index}>{markdownify(contact, "strong")}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-12 lg:col-6">
              <form
                className="contact-form row"
                method="POST"
                action={contact_form_action}
              >
                <div className="col-12 lg:col-6">
                  <label className="mb-1 block" htmlFor="first_name">
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input
                    id="first_name"
                    className="form-input w-full shadow-none"
                    name="first_name"
                    type="text"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="col-12 lg:col-6">
                  <label className="mb-1 block" htmlFor="last_name">
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input
                    id="last_name"
                    className="form-input w-full shadow-none"
                    name="last_name"
                    type="text"
                    placeholder="Last Name"
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="mb-1 block" htmlFor="email_address">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    id="email_address"
                    className="form-input w-full shadow-none"
                    name="email_address"
                    type="email"
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="mb-1 block" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="form-textarea w-full shadow-none"
                    name="message"
                    rows="4"
                    placeholder="Message"
                  />
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary btn-sm mt-2">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
