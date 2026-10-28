"use client";

import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Brands = ({ brands }) => {
  if (!brands?.logos?.length) return null;
  return (
    <section className="section overflow-hidden pt-0">
      <div className="container">
        <div className="row">
          <div className="col-12 mb-8 text-center">
            <h2 className="h6">{brands.title}</h2>
          </div>
          <div className="col-12">
            <Swiper
              className="brand-carousel"
              modules={[Autoplay]}
              slidesPerView={2}
              spaceBetween={12}
              loop
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 3, spaceBetween: 16 },
                767: { slidesPerView: 4, spaceBetween: 16 },
                991: { slidesPerView: 6, spaceBetween: 20 },
              }}
            >
              {[...brands.logos, ...brands.logos].map((logo, i) => (
                <SwiperSlide key={`brand-${i}`} className="overflow-hidden px-2.5 text-center">
                  <Image
                    src={logo}
                    alt="Brands logo"
                    width={160}
                    height={35}
                    className="img mx-auto h-[35px] w-auto max-w-full object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;
