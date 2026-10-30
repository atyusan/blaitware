import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

const HomeBanner = ({ banner }) => {
  return (
    <section className="banner section pb-12.5">
      <div className="container">
        <div className="row">
          <div className="col-12 mx-auto text-center lg:col-10">
            <h1 className="mb-4 pb-2 font-primary font-bold">{banner.title}</h1>
            <p className="mb-4">{markdownify(banner.content)}</p>
            {banner.button?.enable && (
              <div className="mb-5">
                <Link
                  className="btn btn-outline-primary m-2"
                  href={banner.button.link}
                >
                  {banner.button.label}
                </Link>
              </div>
            )}
            <Image
              className="img mx-auto h-auto w-full max-w-[750px]"
              src={banner.image}
              width={750}
              height={390}
              alt="banner image"
              priority
              sizes="(max-width: 768px) 100vw, 750px"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
