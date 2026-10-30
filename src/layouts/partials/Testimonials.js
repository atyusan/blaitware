"use client";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const initialsFromName = (name = "") =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

const Testimonials = ({ testimonials }) => {
  if (!testimonials?.items?.length) return null;
  return (
    <section className="section bg-light">
      <div className="container">
        <div className="row mb-8 md:mb-16">
          <div className="col-12 mx-auto lg:col-6">
            <div className="text-center">
              <h2 className="section-title h3 mb-6">{testimonials.title}</h2>
              <p className="mb-0">{testimonials.content}</p>
            </div>
          </div>
        </div>
        <div className="row justify-center">
          <div className="col-12 xl:col-10">
            <Swiper
              modules={[Autoplay, Pagination]}
              slidesPerView={1}
              spaceBetween={30}
              loop
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              breakpoints={{
                991: { slidesPerView: 2, spaceBetween: 70 },
              }}
              className="testimonial-carousel"
            >
              {testimonials.items.map((item, i) => (
                <SwiperSlide key={`testimonial-${i}`}>
                  <div className="px-2 text-center">
                    <p className="mb-12 text-lg leading-relaxed text-text-dark">
                      {item.content}
                    </p>
                    <div
                      className="testimonial-avatar mx-auto mb-4"
                      aria-hidden="true"
                    >
                      {initialsFromName(item.name)}
                    </div>
                    <h5 className="mb-1">{item.name}</h5>
                    <p className="mb-0">{item.designation}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
