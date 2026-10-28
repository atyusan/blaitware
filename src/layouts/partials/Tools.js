import Image from "next/image";

const Tools = ({ tools }) => {
  if (!tools?.items?.length) return null;
  return (
    <section className="section pb-0">
      <div className="container">
        <div className="row">
          <div className="col-12 mx-auto text-center lg:col-6">
            <h2 className="section-title h3 mb-6">{tools.title}</h2>
            <p className="mb-0">{tools.content}</p>
          </div>
          <div className="col-12 mt-12 text-center">
            {tools.items.map((tool, i) => (
              <div
                key={`tool-${i}`}
                className="tool-chip m-4 inline-block rounded-lg bg-white p-6 shadow"
              >
                <Image
                  src={tool}
                  alt="integration tool"
                  width={186}
                  height={45}
                  className="h-[45px] w-auto max-w-[186px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tools;
