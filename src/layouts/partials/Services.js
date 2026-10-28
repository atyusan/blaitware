"use client";

import Image from "next/image";
import Link from "next/link";
import "swiper/css/bundle";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Services = ({ services }) => {
  return services.map((service, index) => {
    // Premium: even indexes get bg-light; image on the right
    const isEven = index % 2 === 0;
    return (
      <section
        key={`service-${index}`}
        className={`section${isEven ? " bg-light" : ""}`}
      >
        <div className="container">
          <div className="row items-center">
            {/* Carousel / image */}
            <div
              className={`service-carousel col-12 mb-8 lg:col-6 lg:mb-0 ${
                isEven ? "lg:order-2" : "lg:order-1"
              }`}
            >
              <Swiper
                modules={[Autoplay, Pagination]}
                pagination={
                  service.images?.length > 1 ? { clickable: true } : false
                }
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
              >
                {service?.images?.map((slide, slideIndex) => (
                  <SwiperSlide key={slideIndex}>
                    <Image
                      src={slide}
                      alt={service?.title || ""}
                      width={600}
                      height={500}
                      className="img"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Content */}
            <div
              className={`service-content col-12 lg:col-6 ${
                isEven ? "lg:order-1" : "lg:order-2"
              }`}
            >
              <div className={isEven ? "me-0 lg:me-12" : "ms-0 lg:ms-12"}>
                <h2 className="section-title h3">{service?.title}</h2>
                <p className="mb-4">{service?.content}</p>
                {service.button?.enable && (
                  <Link
                    href={service?.button.link}
                    className="cta-link inline-flex items-center text-primary"
                  >
                    {service?.button.label}
                    <Image
                      className="ml-1"
                      src="/images/arrow-right.svg"
                      width={18}
                      height={14}
                      alt="arrow"
                    />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  });
};

export default Services;
