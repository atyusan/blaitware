import Image from "next/image";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Team = ({ data }) => {
  const { frontmatter } = data;
  const { title, description, members } = frontmatter;

  return (
    <>
      <section className="section pb-0">
        <div className="container text-center">
          <div className="row">
            <div className="col-12 mx-auto lg:col-6">
              <h1 className="h2 mb-3">{title}</h1>
              <p className="mb-0 font-medium">{description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row gap-y-8 md:gap-y-10">
            {members?.map((member, i) => (
              <div className="col-6 lg:col-4 xl:col-3" key={i}>
                <div className="team-card text-center">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={380}
                    height={420}
                    className="team-card-img mb-0 w-full rounded-lg object-cover"
                  />
                  <div className="pt-4">
                    <h3 className="h5 mb-1">{member.name}</h3>
                    <p className="mb-0">{member.designation}</p>
                    <ul className="social-icons-alt mt-2 mb-0">
                      <li>
                        <a
                          href={member.facebook || "#!"}
                          title="Facebook"
                          aria-label="Facebook"
                        >
                          <FaFacebookF />
                        </a>
                      </li>
                      <li>
                        <a
                          href={member.twitter || "#!"}
                          title="Twitter"
                          aria-label="Twitter"
                        >
                          <FaTwitter />
                        </a>
                      </li>
                      <li>
                        <a
                          href={member.linkedin || "#!"}
                          title="Linkedin"
                          aria-label="Linkedin"
                        >
                          <FaLinkedinIn />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
