"use client";

import Cta from "@layouts/components/Cta";
import Image from "next/image";
import Link from "next/link";
import {
  FaDice,
  FaDiceD6,
  FaFileSignature,
  FaFighterJet,
  FaHandsHelping,
  FaHeadset,
  FaRegDotCircle,
} from "react-icons/fa";

const icons = {
  FaFighterJet,
  FaRegDotCircle,
  FaDice,
  FaDiceD6,
  FaFileSignature,
  FaHandsHelping,
  FaHeadset,
};

const About = ({ data }) => {
  const { frontmatter } = data;
  const {
    title,
    description,
    image,
    founder,
    who_we_are,
    mission,
    fun_facts,
    values,
    office_culture,
    call_to_action,
  } = frontmatter;

  const mosaic = office_culture?.images || [];

  return (
    <>
      {/* Hero: copy left, image right */}
      <section className="section">
        <div className="container">
          <div className="row items-center justify-between">
            <div className="col-12 mb-10 lg:col-6 lg:mb-0">
              <div className="lg:pe-12">
                <h1 className="section-title h2 mb-6">{title}</h1>
                <p className="mb-0">{description}</p>
              </div>
            </div>
            {image && (
              <div className="col-12 lg:col-6">
                <Image
                  src={image}
                  alt={title}
                  width={591}
                  height={359}
                  className="h-auto w-full rounded-sm"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Founder quote + Who we are / Mission cards */}
      {(founder || who_we_are || mission) && (
        <section className="section bg-light">
          <div className="container">
            <div className="row justify-center">
              {founder && (
                <div className="col-12 mx-auto mb-12 text-center lg:col-8">
                  <p className="lead mb-0 text-text-dark">{founder.content}</p>
                  {founder.avatar && (
                    <Image
                      src={founder.avatar}
                      alt={founder.name}
                      width={100}
                      height={100}
                      className="mx-auto mt-6 rounded-full"
                    />
                  )}
                  <h3 className="section-title h5 mt-6 mb-2">{founder.name}</h3>
                  <p className="mb-0">{founder.designation}</p>
                </div>
              )}
              {who_we_are && (
                <div className="col-12 mb-6 lg:col-6 lg:mb-0 lg:pe-3">
                  <div className="about-card rounded-sm bg-white px-6 py-10 lg:px-12">
                    <h2 className="section-title h3 mb-6">{who_we_are.title}</h2>
                    {who_we_are.content?.map((p, i) => (
                      <p key={i} className={i === who_we_are.content.length - 1 ? "mb-0" : "mb-4"}>
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              )}
              {mission && (
                <div className="col-12 lg:col-6 lg:ps-3">
                  <div className="about-card rounded-sm bg-white px-6 py-10 lg:px-12">
                    <h2 className="section-title h3 mb-6">{mission.title}</h2>
                    {mission.content?.map((p, i) => (
                      <p key={i} className={i === mission.content.length - 1 ? "mb-0" : "mb-4"}>
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Fun facts */}
      {fun_facts?.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="row justify-center text-center">
              <div className="col-12 mb-8 xl:col-7 lg:col-10">
                <h2 className="section-title h3 mb-0">Fun facts about us</h2>
              </div>
              <div className="col-12 lg:col-10">
                <div className="row justify-center gap-y-10">
                  {fun_facts.map((fact, i) => {
                    const Icon = icons[fact.icon] || FaDiceD6;
                    return (
                      <div className="col-6 lg:col-3" key={i}>
                        <div className="block">
                          <span className="inline-flex text-h3 text-primary">
                            <Icon aria-hidden />
                          </span>
                          <h3 className="mt-4 mb-3">
                            <span>{fact.value}</span>
                            {fact.suffix}
                          </h3>
                          <p className="lead mb-0">
                            {fact.label_lines?.map((line, li) => (
                              <span key={li}>
                                {line}
                                {li < fact.label_lines.length - 1 && <br />}
                              </span>
                            )) || fact.label}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Values */}
      {values?.length > 0 && (
        <section className="section bg-light">
          <div className="container">
            <div className="row gap-y-6">
              {values.map((item, i) => {
                const Icon = icons[item.icon] || FaHandsHelping;
                return (
                  <div className="col-12 md:col-6 lg:col-4" key={i}>
                    <div className="feature-card is-hoverable about-value-card rounded-sm bg-white py-10 text-center">
                      <div className="about-value-icon mx-auto mb-8 mt-3 flex h-[65px] w-[65px] items-center justify-center rounded-sm bg-primary text-h5 text-white shadow">
                        <Icon aria-hidden />
                      </div>
                      <h3 className="h5 mb-3">
                        {item.title_lines?.map((line, li) => (
                          <span key={li}>
                            {line}
                            {li < item.title_lines.length - 1 && <br />}
                          </span>
                        )) || item.title}
                      </h3>
                      <p className="mb-3">{item.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Office culture mosaic + join CTA */}
      {office_culture && (
        <section className="section">
          <div className="container">
            <div className="row justify-center gy-4 gap-y-6">
              <div className="col-12 mb-4 self-center xl:col-3 lg:col-6 xl:mb-0">
                <h2 className="section-title h3 mb-4">{office_culture.title}</h2>
                <p className="mb-0">{office_culture.content}</p>
              </div>
              {mosaic[2] && (
                <div className="col-6 xl:col-3 lg:col-4">
                  <Image
                    src={mosaic[2]}
                    alt=""
                    width={500}
                    height={500}
                    className="about-mosaic-img rounded-sm"
                  />
                </div>
              )}
              {mosaic[0] && (
                <div className="col-6 xl:col-6 lg:col-6">
                  <Image
                    src={mosaic[0]}
                    alt=""
                    width={850}
                    height={412}
                    className="about-mosaic-img rounded-sm"
                  />
                </div>
              )}
              {mosaic[1] && (
                <div className="col-6 xl:col-3 lg:col-4">
                  <Image
                    src={mosaic[1]}
                    alt=""
                    width={500}
                    height={500}
                    className="about-mosaic-img rounded-sm"
                  />
                </div>
              )}
              {mosaic[5] && (
                <div className="col-6 xl:col-6 lg:col-6">
                  <Image
                    src={mosaic[5]}
                    alt=""
                    width={850}
                    height={412}
                    className="about-mosaic-img rounded-sm"
                  />
                </div>
              )}
              {mosaic[4] && (
                <div className="col-6 xl:col-3 lg:col-4">
                  <Image
                    src={mosaic[4]}
                    alt=""
                    width={500}
                    height={500}
                    className="about-mosaic-img rounded-sm"
                  />
                </div>
              )}
              {mosaic[3] && (
                <div className="col-6 xl:col-6 lg:col-6">
                  <Image
                    src={mosaic[3]}
                    alt=""
                    width={850}
                    height={412}
                    className="about-mosaic-img rounded-sm"
                  />
                </div>
              )}
              {call_to_action && (
                <div className="col-12 mx-auto self-center xl:col-5 lg:col-10">
                  <div className="mt-8 text-center xl:mt-0 xl:text-start">
                    <h2 className="section-title h3 mb-4">{call_to_action.title}</h2>
                    <p className="mb-6">{call_to_action.content}</p>
                    {call_to_action.button?.enable && (
                      <Link
                        href={call_to_action.button.link}
                        className="btn btn-sm btn-outline-primary"
                        title={call_to_action.button.label}
                      >
                        {call_to_action.button.label}
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Fallback CTA if no office culture section */}
      {!office_culture && call_to_action && <Cta cta={call_to_action} />}
    </>
  );
};

export default About;
